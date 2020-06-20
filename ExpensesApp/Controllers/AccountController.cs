using ExpensesApp.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
namespace ExpensesApp.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;

        private readonly IConfiguration configuration;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult> Register([FromBody]RegisterModel registerModel)
        {
            IdentityUser identityUser = new IdentityUser() { Email = registerModel.Email, UserName = registerModel.Email };

            IdentityResult result = await userManager.CreateAsync(identityUser, registerModel.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.ToString());
            }

            IdentityUser user = await userManager.FindByEmailAsync(registerModel.Email);

            await LoginUser(user, registerModel.Password, false);

            return Ok(GenerateToken(registerModel.Email, user));
        }

        [HttpPost]
        public async Task<ActionResult> Login([FromBody]LoginModel loginModel)
        {
            IdentityUser user = await userManager.FindByEmailAsync(loginModel.Email);
            Microsoft.AspNetCore.Identity.SignInResult result = await LoginUser(user, loginModel.Password, true);
            if (!result.Succeeded)
            {
                if (result.IsLockedOut)
                {
                    return BadRequest("LockedOut");
                }
                return BadRequest("WrongUserOrPassword");
            }

            return Ok(GenerateToken(loginModel.Email, user));
        }

        private async Task<Microsoft.AspNetCore.Identity.SignInResult> LoginUser(IdentityUser user, string password, bool lockout)
        {
            return await signInManager.CheckPasswordSignInAsync(user, password, lockout);
        }

        private async Task LogoutUser()
        {
            await signInManager.SignOutAsync();
            return;
        }

        private Token GenerateToken(string email, IdentityUser user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration.GetValue<string>("Authentication:Secret")));

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("Authentication:Issuer"),
                audience: configuration.GetValue<string>("Authentication:Issuer"),
                claims: claims,
                expires: DateTime.Now.AddDays(this.configuration.GetValue<int>("Authentication:ExpiryTimeInDays")),
                signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
            );

            return new Token()
            {
                Value = new JwtSecurityTokenHandler().WriteToken(token),
                Expiry = token.ValidTo,
                Email = email
            };
        }

    }
}