using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpensesApp.Models;
using ExpensesApp.Dto;
using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace ExpensesApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly ExpensesDbContext _context;

        public ExpensesController(ExpensesDbContext context)
        {
            _context = context;
        }


        // GET: api/Expenses
        /// <summary>
        /// Return a list of all expenses.
        /// </summary>
        /// <param name="from">Filter expenses added after this date time (inclusive). Leave blank for no filter.</param>
        /// <param name="to">Filter expenses added before this date time (inclusive). Leave blank for no filter.</param>
        /// <param name="type">Filter expenses by type. Leave empty for all.</param>
        /// <returns>A list of Expenses.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDtoGet>>> GetExpenses(
            [FromQuery]DateTime? from = null, 
            [FromQuery]DateTime? to = null,
            [FromQuery]Models.Type? type = null)
        {
            IQueryable<Expense> result = _context.Expenses.Include(e => e.Comments);

            if (type != null)
            {
                result = result.Where(f => f.Type == type);
            }
            if (from != null)
            {
                result = result.Where(f => from <= f.Date);
            
            }
            if (to != null)
            {
                result = result.Where(f => f.Date <= to);
            }

            var resultList = await result.Select(e => ExpenseDtoGet.GetDtoFromExpense(e)).ToListAsync();

            return resultList;
        }

        // GET: api/Expenses/5
        /// <summary>
        /// Return an Expense.
        /// </summary>
        /// <param name="id">The id of the selected expense.</param>
        /// <returns>An Expense.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(long id)
        {   
            var expense =  await _context.Expenses
                .Include(e => e.Comments)
                .Select(e => new ExpenseDtoDetail()
                {
                    Id = e.Id,
                    Description = e.Description,
                    Sum = e.Sum,
                    Location = e.Location,
                    Date = e.Date,
                    Currency = e.Currency,
                    Type = e.Type,
                    Comments = e.Comments.Select(c => new CommentDtoDetail()
                    {
                        Id = c.Id,
                        Important =c.Important,
                        Text = c.Text,
                    })
                }).SingleOrDefaultAsync(e => e.Id == id);

            //.Select(e => ExpenseDtoDetail.GetDtoFromExpense(e))
            //.AsEnumerable()
            //.FirstOrDefault(e => e.Id == id);

            if (expense == null)
            {
                return NotFound();
            }

            return Ok(expense);
        }

        // PUT: api/Expenses/5
        /// <summary>
        /// Update a specific Expense.
        /// </summary>
        /// <param name="id">The id of the selected expense.</param>
        /// <param name="expense">The updated expense.</param>
        /// <returns>No content.</returns>
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense(long id, Expense expense)
        {
            if (id != expense.Id)
            {
                return BadRequest();
            }

            _context.Entry(expense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Expenses
        /// <summary>
        /// Add a new expense.
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// {
        ///     "id": 0,
        ///     "description": "string",
        ///     "sum": 0,
        ///     "location": "string",
        ///     "date": "2020-05-23T21:38:16.201Z",
        ///     "currency": "EUR",
        ///     "type": "food",
        ///     "comments": 
        ///     [
        ///         {
        ///         "id": 0,
        ///         "text": "string",
        ///         "important": true,
        ///         "expenseId": 0
        ///         }
        ///     ]
        /// }
        /// </remarks>
        /// <param name="expense">The expense to be added.</param>
        /// <returns>Added expense.</returns>
        /// <response code="201">Returns the newly created Expense</response>
        /// <response code="400">If the Expense is null</response>  
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Expense>> PostExpense(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpense", new { id = expense.Id }, expense);
        }

        // POST: api/Expenses/5/comment
        /// <summary>
        /// Add a comment for an Expense.
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// {
        ///     "text": "string",
        ///     "important": true,
        /// }
        /// </remarks>
        /// <param name="id">The id of the selected expense.</param>
        /// <param name="comment">The comment to be added.</param>
        /// <returns>A</returns>
        /// <response code="201">Returns the newly created Comment</response>
        /// <response code="400">If the Expense or Comment is null</response>  
        [HttpPost("{id}/comment")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Expense>> PostComment(long id, CommentDtoAdd comment)
        {

            var expense = _context.Expenses
                .Include(e => e.Comments)
                .FirstOrDefault(e => e.Id == id);

            if (expense == null)
            {
                return NotFound();
            }

            //ExpenseDtoAdd expenseDto = ExpenseDtoAdd.GetDtoFromExpense(expense);

            Comment commentToAdd = CommentDtoAdd.GetCommentFromDto(id, comment);

            _context.Comments.Add(commentToAdd);
            await _context.SaveChangesAsync();

            return Ok(expense);
        }


        // DELETE: api/Expenses/5
        /// <summary>
        /// Delete an Expense.
        /// </summary>
        /// <param name="id">The id of the expense wich will be deleted.</param>
        /// <returns>Deleted expense.</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<Expense>> DeleteExpense(long id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return expense;
        }

        private bool ExpenseExists(long id)
        {
            return _context.Expenses.Any(e => e.Id == id);
        }
    }
}
