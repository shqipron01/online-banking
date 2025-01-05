using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;


namespace Application.Contact
{
    public class Edit
    {

        public class Command : IRequest<Result<Unit>>
        {
            public Contacts Contacts{ get; set; }
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Contacts).SetValidator(new ContactValidator());
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
                var contact = await this.context.Contacts.FindAsync(request.Contacts.Id);
               
                if(contact == null) return null;
               
               this.mapper.Map(request.Contacts, contact);

                var result=await this.context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update contact");
               
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}