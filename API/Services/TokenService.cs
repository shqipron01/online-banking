using Domain;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Linq;

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration config;
         private readonly UserManager<AppUser> userManager;
        public TokenService(IConfiguration config, UserManager<AppUser> userManager){
            this.config = config;
            this.userManager = userManager;
        }
        public string CreateToken(AppUser user) {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                
            };

            var roles =  this.userManager.GetRolesAsync(user);

            //  claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
             
             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config["TokenKey"]));
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