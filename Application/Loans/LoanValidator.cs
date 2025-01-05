using Domain;
using FluentValidation;

namespace Application.Loans
{
    public class LoanValidator : AbstractValidator<Loan>
    {
       public LoanValidator(){
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Surname).NotEmpty();
        RuleFor(x => x.AccNumber).NotEmpty();
        RuleFor(x => x.Type).NotEmpty();
        RuleFor(x => x.Amount).NotEmpty();
        RuleFor(x => x.Duration).NotEmpty();
        RuleFor(x => x.LoanDate).NotEmpty();
        RuleFor(x => x.Payments).NotEmpty();

       }
    }
}