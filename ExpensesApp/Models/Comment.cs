using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ExpensesApp.Models
{
    public class Comment
    {
        public long Id { get; set; }
        public string Text { get; set; }
        public bool Important { get; set; }

        public long ExpenseId { get; set; }
        
        [JsonIgnore]
        public Expense Expense { get; set; }

        public User AddedBy { get; set; }
    }
}
