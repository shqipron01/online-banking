using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Payments
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Payment Payment{ get; set; }
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Payment).SetValidator(new PaymentValidator());
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
                var payment = await this.context.Payments.FindAsync(request.Payment.Id);
               
                if(payment == null) return null;
               

               this.mapper.Map(request.Payment, payment);

                var result=await this.context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update payment");
               
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}