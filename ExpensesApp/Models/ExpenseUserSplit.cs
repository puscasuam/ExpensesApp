using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensesApp.Models
{
    public class ExpenseUserSplit
    {
        public long Id { get; set; }
       
        public double SplitedAmount { get; set; }

        public long ExpenseId { get; set; }
        public Expense Expense { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }

    }
}
