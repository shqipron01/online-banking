using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.BankUsers
{
    public class Create
    {

        public class Command : IRequest<Result<Unit>>
        {
            public BankUser BankUser { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.BankUser).SetValidator(new BankUserValidator());
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
                    var bankuser = await this.context.BankUsers.FirstOrDefaultAsync(x => 
                    x.Username == this.userAccessor.GetUsername());

              
                
                this.context.BankUsers.Add(request.BankUser);
                var result=await this.context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create bank user");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }

}