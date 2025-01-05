using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Balances
{
    public class Edit
    {
        
        public class Command : IRequest<Result<Unit>>
        {
            public Balance Balance { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Balance).SetValidator(new BalanceValidator());
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
                var balance  = await this.context.Balances.FindAsync(request.Balance.Id);

                if (balance == null) return null;

                this.mapper.Map(request.Balance, balance);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update balance");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}