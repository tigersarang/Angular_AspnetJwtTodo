using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoWeb.Models.Datas
{
    public class TodoItem
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public bool IsCompleted { get; set; }
        public required TodoCustomer TodoCustomer { get; set; }
        public required int TodoCustomerId { get; set; }
    }
}