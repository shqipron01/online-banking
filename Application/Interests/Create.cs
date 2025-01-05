using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Interests
{
    public class Create
    {

        public class Command : IRequest<Result<Unit>>
        {
            public Interest Interest { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Interest).SetValidator(new InterestValidator());
            }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context,IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                    var user = await this.context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == this.userAccessor.GetUsername());

              
                
                this.context.Interests.Add(request.Interest);
                var result=await this.context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create interest");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }

}