﻿using ExpensesApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensesApp.Dto
{
    public class CommentDtoDetail
    {
        public long Id { get; set; }
        public Boolean Important { get; set; }
        public string Text { get; set; }
    }
}
