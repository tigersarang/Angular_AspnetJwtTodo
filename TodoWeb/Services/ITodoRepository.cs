using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoWeb.Models.Datas;

namespace TodoWeb.Services
{
    public interface ITodoRepository
    {
        Task<IEnumerable<TodoItem>> GetAllTodosAsync();
        Task<TodoItem> GetTodoByIdAsync(int id);
        Task<TodoItem> AddTodoAsync(TodoItem todoItem);
        Task<TodoItem> UpdateTodoAsync(TodoItem todoItem);
        Task<bool> DeleteTodoAsync(int id);
    }
}