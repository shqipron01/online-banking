using Domain;
using FluentValidation;

namespace Application.Customers
{
    public class CustomerValidator : AbstractValidator<Customer>
    {
       public CustomerValidator(){
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Surname).NotEmpty();
        RuleFor(x => x.Address).NotEmpty();
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.Tel).NotEmpty();
        RuleFor(x => x.BirthDate).NotEmpty();
        RuleFor(x => x.Gender).NotEmpty();
        RuleFor(x => x.Bank).NotEmpty();
        RuleFor(x => x.AccNumber).NotEmpty();
       }
    }
}