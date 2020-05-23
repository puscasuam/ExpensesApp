using ExpensesApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace ExpensesApp.Dto
{
    public class ExpenseDtoGet
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public long Sum { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public Currency Currency { get; set; }
        public Models.Type Type { get; set; }
        public int CommentsNumber { get; set; }
       
        public static ExpenseDtoGet GetDtoFromExpense(Expense expense) 
        {
            return new ExpenseDtoGet
            {
                Id = expense.Id,
                Description = expense.Description,
                Sum = expense.Sum,
                Location = expense.Location,
                Date = expense.Date,
                Currency = expense.Currency, 
                Type = expense.Type,
                CommentsNumber = expense.Comments.Count
            };
        }
    }
}
