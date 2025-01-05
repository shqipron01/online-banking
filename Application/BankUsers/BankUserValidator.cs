using Domain;
using FluentValidation;

namespace Application.BankUsers
{
    public class BankUserValidator : AbstractValidator<BankUser>
    {
       public BankUserValidator(){
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Surname).NotEmpty();
        RuleFor(x => x.Username).NotEmpty();
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
       }
    }
}