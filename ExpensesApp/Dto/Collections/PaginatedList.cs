using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpensesApp.Dto.Collections
{
    public class PaginatedList<T>
    {
        public PaginatedList(int currentPage, int totalItems, int itemsPerPage) 
        {
            CurrentPage = currentPage;
            TotalItems = totalItems;
            ItemsPerPage = itemsPerPage;
            TotalPages = (totalItems + itemsPerPage - 1) / itemsPerPage;
            Items = new List<T>();
        }

        public List<T> Items { get; set; }

        public int CurrentPage { get; private set; }
        public int TotalItems { get; private set; }
        public int ItemsPerPage { get; private set; }
        public int TotalPages { get; private set; }


    }
}
