using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager,RoleManager<AppRole> roleManager)
        {

            if (!userManager.Users.Any() )
            {
                   var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
                    new AppUser{DisplayName = "Tom", UserName = "tom", Email = "tom@test.com"},
                   new AppUser{DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"},
                };
                 var roles = new List<AppRole>
            {
                new AppRole{Name = "User"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Manager"},
                
            };
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                     await userManager.AddToRoleAsync(user, "User");
                }
                 var admin = new AppUser
            {
                UserName = "admin",
                 
            };

          
              await userManager.CreateAsync(admin, "Pa$$w0rd");
              await userManager.AddToRolesAsync(admin, new[] {"Admin", "Manager"});
            }

              await context.SaveChangesAsync();
        }
    }
}


