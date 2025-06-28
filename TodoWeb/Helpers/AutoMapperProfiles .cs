using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using TodoWeb.Models.Datas;
using TodoWeb.Models.Dtos;

namespace TodoWeb.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TodoItem, TodoItemDto>().ReverseMap();
            CreateMap<TodoCustomer, TodoCustomerDto>().ReverseMap();
        }
    }
}