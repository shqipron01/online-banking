using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;


namespace Application.Loans
{
    public class Edit
    {

        public class Command : IRequest<Result<Unit>>
        {
            public Loan Loan { get; set; }
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Loan).SetValidator(new LoanValidator());
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
                var loan = await this.context.Loans.FindAsync(request.Loan.Id);
               
                if(loan == null) return null;
               
               this.mapper.Map(request.Loan, loan);

                var result=await this.context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update loan");
               
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }

}