using Domain;
using FluentValidation;
namespace Application.Branches
{
    public class BranchValidator : AbstractValidator<Branch>
    {
       public BranchValidator(){
        RuleFor(x => x.Bank).NotEmpty();
        RuleFor(x => x.BranchNumber).NotEmpty();
        RuleFor(x => x.Country).NotEmpty();
        RuleFor(x => x.City).NotEmpty();
        RuleFor(x => x.Address).NotEmpty();
     
       }
    }
}