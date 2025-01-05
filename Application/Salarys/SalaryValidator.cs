using Domain;
using FluentValidation;

namespace Application.Salarys
{
    public class SalaryValidator : AbstractValidator<Salary>
    {
       public SalaryValidator(){
        RuleFor(x => x.AccountNumber).NotEmpty();
        RuleFor(x => x.AnualSalary).NotEmpty();
        RuleFor(x => x.MonthlyPayment).NotEmpty();
       }
    }
}