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

namespace Application.Balances
{
    public class Details
    {
        public class Query : IRequest<Result<BalanceDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BalanceDto>>
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

            public async Task<Result<BalanceDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var balance = await this.context.Balances
                    .ProjectTo<BalanceDto>(this.mapper.ConfigurationProvider, 
                        new {currentUsername = this.userAccessor.GetUsername()})
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<BalanceDto>.Success(balance);
            }
        }
    }
}