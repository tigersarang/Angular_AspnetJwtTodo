using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoWeb.Models.Datas;

namespace TodoWeb.Services
{
    public class TodoService(TodoDbContext _todoDbContext) : ITodoRepository
    {
        public async Task<IEnumerable<TodoItem>> GetAllTodosAsync()
        {
            return await _todoDbContext.TodoItems.ToListAsync();
        }

        public async Task<TodoItem> GetTodoByIdAsync(int id)
        {
            return await _todoDbContext.TodoItems.FindAsync(id);
        }

        public async Task<TodoItem> AddTodoAsync(TodoItem todoItem)
        {
            _todoDbContext.TodoItems.Add(todoItem);
            await _todoDbContext.SaveChangesAsync();
            return todoItem;
        }

        public async Task<TodoItem> UpdateTodoAsync(TodoItem todoItem)
        {
            _todoDbContext.TodoItems.Update(todoItem);
            await _todoDbContext.SaveChangesAsync();
            return todoItem;
        }

        public async Task<bool> DeleteTodoAsync(int id)
        {
            var todoItem = await _todoDbContext.TodoItems.FindAsync(id);
            if (todoItem == null) return false;

            _todoDbContext.TodoItems.Remove(todoItem);
            await _todoDbContext.SaveChangesAsync();
            return true;
        }
    }
}