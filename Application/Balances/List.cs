using System.Linq;
using System.Threading.Tasks;
using MediatR;
using System.Threading;
using Persistence;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;

namespace Application.Balances
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<BalanceDto>>> 
        { 
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<BalanceDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<PagedList<BalanceDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.Balances
                .OrderBy(d => d.Date)
                .ProjectTo<BalanceDto>(this.mapper.ConfigurationProvider,
                    new {currentUsername = this.userAccessor.GetUsername() })
                .AsQueryable();

                return Result<PagedList<BalanceDto>>.Success(
                    await PagedList<BalanceDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)
                );
            }
        }
    }
}