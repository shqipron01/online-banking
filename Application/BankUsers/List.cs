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

namespace Application.BankUsers
{
    public class List
    {

        public class Query : IRequest<Result<PagedList<BankUserDto>>> { 

        public PagingParams Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PagedList<BankUserDto>>>
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

            public async Task<Result<PagedList<BankUserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  this.context.BankUsers
                .OrderBy(d => d.Name)
                .ProjectTo<BankUserDto>(this.mapper.ConfigurationProvider, new
                {currentUsername = this.userAccessor.GetUsername() })
                    .AsQueryable();

              
               return Result<PagedList<BankUserDto>>.Success(

                    await PagedList<BankUserDto>.CreateAsync(query, request.Params.PageNumber,
                        request.Params.PageSize)

               );
            }
        }
    }

}