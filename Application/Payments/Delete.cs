using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Application.Core;


namespace Application.Payments
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
                var payment = await this.context.Payments.FindAsync(request.Id);

                this.context.Remove(payment);

                var result = await this.context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the payment");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }

}