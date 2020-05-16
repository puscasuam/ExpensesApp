using ExpensesApp.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensesApp.ModelValidators
{
    public class ExpenseValidator : AbstractValidator<Expense>
    {
        public ExpenseValidator()
        {
            RuleFor(x => x.Description).MinimumLength(2);
            RuleFor(x => x.Sum).GreaterThan(0);
            RuleFor(x => x.Date).LessThan(DateTime.Now);
        }
    }
}
