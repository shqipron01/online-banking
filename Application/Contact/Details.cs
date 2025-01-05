using System;
using System.Threading;
using System.Threading.Tasks;

using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

using Persistence;

namespace Application.Contact
{
    public class Details
    {

        public class Query : IRequest<Result<ContactDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<ContactDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<ContactDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var contacts= await this.context.Contacts
                .ProjectTo<ContactDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

              return Result<ContactDto>.Success(contacts);

            }
        }
    }
}