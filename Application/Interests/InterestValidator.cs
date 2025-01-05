using Domain;
using FluentValidation;

namespace Application.Interests
{
    public class InterestValidator : AbstractValidator<Interest>
    {
       public InterestValidator(){
        RuleFor(x => x.Type).NotEmpty();
        RuleFor(x => x.Amount).NotEmpty();
        RuleFor(x => x.InterestRate).NotEmpty();
        RuleFor(x => x.MonthsNumber).NotEmpty();
       }
    }
}