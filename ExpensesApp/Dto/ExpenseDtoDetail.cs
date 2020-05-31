using ExpensesApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ExpensesApp.Dto
{
    public class ExpenseDtoDetail
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public long Sum { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public Currency Currency { get; set; }
        public Models.Type Type { get; set; }
        public IEnumerable<CommentDtoDetail> Comments { get; set; }


        public static ExpenseDtoDetail GetDtoFromExpense(Expense expense)
        {
            return new ExpenseDtoDetail
            {
                Id = expense.Id,
                Description = expense.Description,
                Sum = expense.Sum,
                Location = expense.Location,
                Date = expense.Date,
                Currency = expense.Currency,
                Type = expense.Type,
                Comments = expense.Comments.Select(c => new CommentDtoDetail()
                {
                    Id = c.Id,
                    Text = c.Text,
                    Important = c.Important
                })

            };
        }

    }
}
