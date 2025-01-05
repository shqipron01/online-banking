using Domain;
using FluentValidation;

namespace Application.Contact
{
    public class ContactValidator : AbstractValidator<Contacts>
    {
       public ContactValidator(){
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Surname).NotEmpty();
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.PhoneNumber).NotEmpty();
        RuleFor(x => x.Message).NotEmpty();
       }
    }
}