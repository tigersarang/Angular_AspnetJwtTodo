using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoWeb.Models.Datas;

namespace TodoWeb.Services
{
    public interface ITokenRepository
    {
        string CreateToken(TodoCustomer todoCustomer);
    }
}