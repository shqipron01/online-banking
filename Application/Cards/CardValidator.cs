using Domain;
using FluentValidation;

namespace Application.Cards
{
    public class CardValidator: AbstractValidator<Card>
    {
        public CardValidator()
        {
            RuleFor(x => x.AccountNumber).NotEmpty();
            RuleFor(x => x.CardType).NotEmpty();
            RuleFor(x => x.CardNumber).NotEmpty();
            RuleFor(x => x.ExpirationDate).NotEmpty();
        }
    }
}