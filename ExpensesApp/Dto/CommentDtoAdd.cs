using ExpensesApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensesApp.Dto
{
    public class CommentDtoAdd
    {
        public string Text { get; set; }
        public bool Important { get; set; }


        public static Comment GetCommentFromDto(long id, CommentDtoAdd comment)
        {
            return new Comment
            {
                Text = comment.Text,
                Important = comment.Important,
                ExpenseId = id,
            };
        }

    }
}
