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

namespace Application.Deposits
{
    public class Details
    {

        public class Query : IRequest<Result<DepositDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<DepositDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<DepositDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var deposit= await this.context.Deposits
                .ProjectTo<DepositDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

              return Result<DepositDto>.Success(deposit);

            }
        }
    }
}