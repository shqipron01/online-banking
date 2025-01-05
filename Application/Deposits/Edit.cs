using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Deposits
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Deposit Deposit{ get; set; }
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Deposit).SetValidator(new DepositValidator());
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
                var deposit = await this.context.Deposits.FindAsync(request.Deposit.Id);
               
                if(deposit == null) return null;
               

               this.mapper.Map(request.Deposit, deposit);

                var result=await this.context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update deposit");
               
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}