using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Application.Core;


namespace Application.Transactions
{
    public class Delete
    {
     public class Command : IRequest<Result<Unit>>

     
        {

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>


        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }


            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var transaction = await this.context.Transactions.FindAsync(request.Id);

                this.context.Remove(transaction);

                var result = await this.context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the transaction");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }

}