using Domain;
using FluentValidation;

namespace Application.Accounts
{
    public class AccountValidator: AbstractValidator<Account>
    {
        public AccountValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Surname).NotEmpty();
            RuleFor(x => x.AccountNumber).NotEmpty();
            RuleFor(x => x.AccountType).NotEmpty();
            RuleFor(x => x.OpenDate).NotEmpty();
            RuleFor(x => x.Balance).NotEmpty();
        }
    }
}