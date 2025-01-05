using Domain;
using FluentValidation;

namespace Application.Deposits
{
    public class DepositValidator : AbstractValidator<Deposit>
    {
       public DepositValidator(){
        RuleFor(x => x.Account).NotEmpty();
        RuleFor(x => x.Amount).NotEmpty();
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Payee).NotEmpty();
       }
    }
}