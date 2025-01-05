using Domain;
using FluentValidation;

namespace Application.Payments
{
    public class PaymentValidator : AbstractValidator<Payment>
    {
       public PaymentValidator(){
        RuleFor(x => x.Account).NotEmpty();
        RuleFor(x => x.Amount).NotEmpty();
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Payee).NotEmpty();
       }
    }
}