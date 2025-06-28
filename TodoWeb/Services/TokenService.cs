using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using TodoWeb.Models.Datas;

namespace TodoWeb.Services
{
    public class TokenService(IConfiguration configuration) : ITokenRepository
    {
        public string CreateToken(TodoCustomer todoCustomer)
        {
            var tokenKey = configuration["TokenKey"];
            if (tokenKey.Length < 64) throw new ArgumentException("Token key must be at least 64 characters long.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, todoCustomer.Id.ToString()),
                new Claim(ClaimTypes.Email, todoCustomer.Email),
                new Claim(ClaimTypes.Name, todoCustomer.UserName)
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}