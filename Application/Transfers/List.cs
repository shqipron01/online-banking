using System.Linq;
using System.Threading.Tasks;
using MediatR;
using System.Threading;
using Persistence;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;

namespace Application.Transfers
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<TransferDto>>> 
        { 
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<TransferDto>>>
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

            public async Task<Result<PagedList<TransferDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.Transfers
                .OrderBy(d => d.Date)
                .ProjectTo<TransferDto>(this.mapper.ConfigurationProvider,
                    new {currentUsername = this.userAccessor.GetUsername() })
                .AsQueryable();

                return Result<PagedList<TransferDto>>.Success(
                    await PagedList<TransferDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)
                );
            }
        }
    }
}