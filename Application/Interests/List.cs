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

namespace Application.Interests
{
    public class List
    {

        public class Query : IRequest<Result<PagedList<InterestDto>>> { 

        public PagingParams Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PagedList<InterestDto>>>
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

            public async Task<Result<PagedList<InterestDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.Interests
                .OrderBy(d => d.Type)
                .ProjectTo<InterestDto>(this.mapper.ConfigurationProvider, new
                {currentUsername = this.userAccessor.GetUsername() })
                    .AsQueryable();

              
               return Result<PagedList<InterestDto>>.Success(

                    await PagedList<InterestDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)

               );
            }
        }
    }

}