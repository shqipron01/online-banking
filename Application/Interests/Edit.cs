using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Interests
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Interest Interest{ get; set; }
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Interest).SetValidator(new InterestValidator());
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
                var interest = await this.context.Interests.FindAsync(request.Interest.Id);
               
                if(interest == null) return null;
               

               this.mapper.Map(request.Interest, interest);

                var result=await this.context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update interest");
               
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}