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


namespace Application.Customers
{
    public class List
    {

        public class Query : IRequest<Result<PagedList<CustomerDto>>> { 

        public PagingParams Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PagedList<CustomerDto>>>
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

            public async Task<Result<PagedList<CustomerDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.Customers
                .OrderBy(d => d.Name)
                .ProjectTo<CustomerDto>(this.mapper.ConfigurationProvider, new
                {currentUsername = this.userAccessor.GetUsername() })
                    .AsQueryable();

              
               return Result<PagedList<CustomerDto>>.Success(

                    await PagedList<CustomerDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)

               );
            }
        }
    }
}

