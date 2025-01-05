using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Withdraws
{
    public class Edit
    {
        
        public class Command : IRequest<Result<Unit>>
        {
            public Withdraw Withdraw { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Withdraw).SetValidator(new WithdrawValidator());
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
                var withdraw  = await this.context.Withdraws.FindAsync(request.Withdraw.Id);

                if (withdraw == null) return null;

                this.mapper.Map(request.Withdraw, withdraw);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update withdraw");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}