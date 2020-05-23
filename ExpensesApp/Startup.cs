using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using AutoMapper;
using ExpensesApp.Dto;
using ExpensesApp.Models;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System.IO;

namespace ExpensesApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services
                .AddControllers()
                .AddJsonOptions(options =>
         {
             options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
             options.JsonSerializerOptions.IgnoreNullValues = true;
         })

                 .AddFluentValidation(fv => fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly()));
            services.AddDbContext<ExpensesDbContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("ExpensesDbConnectionString")));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "My expenses API",
                    Description = "A simple example ASP.NET Core Web Expenses API",
                    TermsOfService = new Uri("https://example.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Puscasu Ana-Maria",
                        Email = "paci0156@cs.ubbcluj.ro",
                        Url = new Uri("https://twitter.com/blabla"),
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under LICX",
                        Url = new Uri("https://example.com/license"),
                    }
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My expenses V1");
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
