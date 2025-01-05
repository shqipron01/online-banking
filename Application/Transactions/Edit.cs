using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Transactions
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Transaction Transaction{ get; set; }
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Transaction).SetValidator(new TransactionValidator());
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
                var transaction= await this.context.Transactions.FindAsync(request.Transaction.Id);
               
                if(transaction == null) return null;
               

               this.mapper.Map(request.Transaction, transaction);

                var result=await this.context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update transaction");
               
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}