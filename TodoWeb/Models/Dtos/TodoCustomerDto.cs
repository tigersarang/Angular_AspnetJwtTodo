using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoWeb.Models.Dtos
{
    public class TodoCustomerDto
    {
        public int? Id { get; set; }
        public string UserName { get; set; } = default!;
        public string? Email { get; set; } = default!;
        public string? Password { get; set; }
        public string? Token { get; set; }
        public List<TodoItemDto> TodoItems { get; set; } = new();
    }
}