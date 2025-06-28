using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoWeb.Models.Datas;
using TodoWeb.Models.Dtos;

namespace TodoWeb.Services
{
    public interface ITodoCustomerRepository
    {
        Task<TodoCustomer> RegisterUser(TodoCustomer todoCustomer);
        Task<TodoCustomerDto> LoginUser(TodoCustomerDto todoCustomerDto);
    }
}