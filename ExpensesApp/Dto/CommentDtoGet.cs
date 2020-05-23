using ExpensesApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensesApp.Dto
{
    public class CommentDtoGet
    {
        public string Text { get; set; }
        public bool Important { get; set; }
        public long ExpenseId { get; set; }


        public static CommentDtoGet GetDtoFromComment(Comment comment)
        {
            return new CommentDtoGet
            {
                Text = comment.Text,
                Important = comment.Important,
                ExpenseId = comment.ExpenseId

            };
        }
    }
}
