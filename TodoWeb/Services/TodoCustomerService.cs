using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TodoWeb.Models.Datas;
using TodoWeb.Models.Dtos;

namespace TodoWeb.Services
{
    public class TodoCustomerService(TodoDbContext todoDbContext, ITokenRepository tokenRepository, IMapper mapper) : ITodoCustomerRepository
    {
        public async Task<TodoCustomerDto> LoginUser(TodoCustomerDto todoCustomerDto)
        {
            if (todoCustomerDto == null)
            {
                throw new ArgumentNullException(nameof(todoCustomerDto), "User data cannot be null");
            }

            var customer = await todoDbContext.TodoCustomers
                .FirstOrDefaultAsync(c => c.UserName == todoCustomerDto.UserName);

            if (customer == null)
            {
                return null;
            }

            using var hmac = new HMACSHA512(customer.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(todoCustomerDto.Password));

            if (computedHash.SequenceEqual(customer.PasswordHash))
            {
                TodoCustomerDto returnDto =  mapper.Map<TodoCustomerDto>(customer);
                returnDto.Token = tokenRepository.CreateToken(customer);
                
                return returnDto;
            }

            return null;
        }

        public async Task<TodoCustomer> RegisterUser(TodoCustomer todoCustomer)
        {
            todoDbContext.Entry(todoCustomer).State = EntityState.Added;
            await todoDbContext.SaveChangesAsync();
            return todoCustomer;
        }
    }
}