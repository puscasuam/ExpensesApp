using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Threading.Tasks; 

namespace ExpensesApp.Models
{
    public enum Currency 
    { 
        EUR,
        RON,
        USD
    }

    public enum Type
    {
        food,
        utilities,
        transportation,
        outing,
        groceries,
        clothes,
        electronics,
        other
    }

    public class Expense
    {
        public long Id { get; set; }

        public string Description { get; set; }

        public long Sum { get; set; }

        public string Location { get; set; }

        public DateTime Date { get; set; }

        public Currency Currency { get; set; }

        public Type Type { get; set; }


    }
}
