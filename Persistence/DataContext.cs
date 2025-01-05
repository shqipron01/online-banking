using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Account> Accounts{ get; set; }
        public DbSet<Balance> Balances{ get; set; }
        public DbSet<BankUser> BankUsers{ get; set; }
        public DbSet<Branch> Branches{ get; set; }
        public DbSet<Card> Cards{ get; set; }
        public DbSet<Contacts> Contacts{ get; set; }
        public DbSet<Customer> Customers{ get; set; }
        public DbSet<Deposit> Deposits{ get; set; }
        public DbSet<Interest> Interests{ get; set; }
        public DbSet<Loan> Loans{ get; set; }
        public DbSet<Payment> Payments{ get; set; }
        public DbSet<Salary> Salarys{ get; set; }
        public DbSet<Transaction> Transactions{ get; set; }
        public DbSet<Transfer> Transfers{ get; set; }
        public DbSet<Withdraw> Withdraws{ get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

           
    }
    }
    
}