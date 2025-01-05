using Domain;
using FluentValidation;

namespace Application.Transfers
{
    public class TransferValidator: AbstractValidator<Transfer>
    {
        public TransferValidator()
        {
            RuleFor(x => x.TransferNumber).NotEmpty();
            RuleFor(x => x.AccountNumber).NotEmpty();
            RuleFor(x => x.Amount).NotEmpty();
            RuleFor(x => x.Payee).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
        }
    }
}