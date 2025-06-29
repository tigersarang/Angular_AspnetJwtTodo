using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoWeb.Models.Datas;
using TodoWeb.Models.Dtos;

namespace TodoWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TodoController(TodoDbContext todoDbContext, IMapper mapper) : ControllerBase
    {
        [HttpPost("add")]
        public async Task<ActionResult<TodoItemDto>> AddTodoItem(TodoItemDto todoItemDto)
        {
            if (todoItemDto == null)
            {
                return BadRequest("Invalid todo item.");
            }

            var todoItem = mapper.Map<TodoItem>(todoItemDto);

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User not authenticated.");
            }

            Console.WriteLine($"User ID from claims: {userIdClaim.Value}");
            todoItem.TodoCustomerId = int.Parse(userIdClaim.Value);

            todoDbContext.TodoItems.Add(todoItem);
            await todoDbContext.SaveChangesAsync();

            return Ok(mapper.Map<TodoItemDto>(todoItem));
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<TodoItemDto>>> GetAllTodoItems()
        {
            var todoItems = await todoDbContext.TodoItems.ToListAsync();
            return Ok(mapper.Map<IEnumerable<TodoItemDto>>(todoItems));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDto>> GetTodoItemById(int id)
        {
            var todoItem = await todoDbContext.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound("Todo item not found.");
            }
            return Ok(mapper.Map<TodoItemDto>(todoItem));
        }

        [HttpPut("update")]
        public async Task<ActionResult<TodoItemDto>> UpdateTodoItem(TodoItemDto todoItemDto)
        {
            if (todoItemDto == null)
            {
                return BadRequest("Invalid todo item.");
            }
            var todoItem = await todoDbContext.TodoItems.FindAsync(todoItemDto.Id);
            if (todoItem == null)
            {
                return NotFound("Todo item not found.");
            }
            todoItem.Title = todoItemDto.Title;
            todoItem.Description = todoItemDto.Description;
            todoItem.IsCompleted = todoItemDto.IsCompleted;
            todoDbContext.Entry(todoItem).State = EntityState.Modified;
            await todoDbContext.SaveChangesAsync();
            return Ok(mapper.Map<TodoItemDto>(todoItem));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItemAsync(int id)
        {
            var todoItem = await todoDbContext.TodoItems.FindAsync(id);

            if (todoItem == null) return NotFound("Todo item not found");

            todoDbContext.Entry(todoItem).State = EntityState.Deleted;
            await todoDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}