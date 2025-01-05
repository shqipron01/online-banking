using System.Collections.Generic;

using System.Linq;
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
    public class List
    {

        public class Query : IRequest<Result<PagedList<ContactDto>>> { 

        public PagingParams Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ContactDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context,IMapper mapper,IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<PagedList<ContactDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.Contacts
                .OrderBy(d => d.Name)
                .ProjectTo<ContactDto>(this.mapper.ConfigurationProvider, new
                {currentUsername = this.userAccessor.GetUsername() })
                    .AsQueryable();

              
               return Result<PagedList<ContactDto>>.Success(

                    await PagedList<ContactDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)

               );


            }
        }
    }
}