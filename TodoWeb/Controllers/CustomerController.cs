using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TodoWeb.Models.Datas;
using TodoWeb.Models.Dtos;
using TodoWeb.Services;

namespace TodoWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
  public class CustomerController(IMapper mapper, ITodoCustomerRepository todoCustomerService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<TodoCustomerDto>> RegisterUser(TodoCustomerDto todoCustomerDto)
        {
            if (todoCustomerDto == null)
            {
                return BadRequest("Invalid user data.");
            }

            var customer = mapper.Map<TodoCustomer>(todoCustomerDto);

            using var hmac = new HMACSHA512();

            customer.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(todoCustomerDto.Password));
            customer.PasswordSalt = hmac.Key;

            var result = await todoCustomerService.RegisterUser(customer);
            if (result == null)
            {
                return StatusCode(500, "Error registering user.");
            }

            return mapper.Map<TodoCustomerDto>(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<TodoCustomerDto>> LoginUser(TodoCustomerDto todoCustomerDto)
        {
            if (todoCustomerDto == null)
            {
                return BadRequest("Invalid user data.");
            }

            Console.WriteLine("todoCustomerDto : " + todoCustomerDto.UserName);
            Console.WriteLine("todoCustomerDto : " + todoCustomerDto.Password);

            var result = await todoCustomerService.LoginUser(todoCustomerDto);
            if (result == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return mapper.Map<TodoCustomerDto>(result);
        }
    }
}