using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Salarys
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Salary Salary{ get; set; }
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Salary).SetValidator(new SalaryValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var salary = await this.context.Salarys.FindAsync(request.Salary.Id);
               
                if(salary == null) return null;
               

               this.mapper.Map(request.Salary, salary);

                var result=await this.context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update salary");
               
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}