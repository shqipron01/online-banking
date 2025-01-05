using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser<int>
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}