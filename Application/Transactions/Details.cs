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

namespace Application.Transactions
{
    public class Details
    {

        public class Query : IRequest<Result<TransactionDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<TransactionDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<TransactionDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var transaction= await this.context.Transactions
                .ProjectTo<TransactionDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

              return Result<TransactionDto>.Success(transaction);

            }
        }
    }
}