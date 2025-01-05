using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Transfers
{
    public class Edit
    {
        
        public class Command : IRequest<Result<Unit>>
        {
            public Transfer Transfer { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Transfer).SetValidator(new TransferValidator());
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
                var transfer  = await this.context.Transfers.FindAsync(request.Transfer.Id);

                if (transfer == null) return null;

                this.mapper.Map(request.Transfer, transfer);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update transfer");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}