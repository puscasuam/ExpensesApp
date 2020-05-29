using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensesApp.Models
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ExpensesDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ExpensesDbContext>>()))
            {
                // Look for any movies.
                if (context.Expenses.Any())
                {
                    return;   // DB table has been seeded
                }

                context.Expenses.AddRange(
                    new Expense
                    {
                        Description = "2020, may, water",
                        Sum = 120,
                        Location = "Cluj",
                        Date = new DateTime(2020,05,15),
                        Currency = Currency.RON , 
                        Type = Type.utilities
                    },

                     new Expense
                     {
                         Description = "2020, may, energy",
                         Sum = 100,
                         Location = "Cluj",
                         Date = new DateTime(2020, 05, 10),
                         Currency = Currency.RON,
                         Type = Type.utilities
                     },

                     new Expense
                     {
                         Description = "2020, may, taxi",
                         Sum = 20,
                         Location = "Cluj",
                         Date = new DateTime(2020, 06, 12),
                         Currency = Currency.RON,
                         Type = Type.transportation
                     },

                      new Expense
                      {
                          Description = "2020, february, shoes",
                          Sum = 400,
                          Location = "Cluj",
                          Date = new DateTime(2020, 02, 15),
                          Currency = Currency.RON,
                          Type = Type.clothes
                      },

                      new Expense
                      {
                          Description = "2020, february, coofee",
                          Sum = 10,
                          Location = "Cluj",
                          Date = new DateTime(2020, 02, 16),
                          Currency = Currency.RON,
                          Type = Type.outing
                      }

                ); ;
                context.SaveChanges();
            }
        }
    }
}
