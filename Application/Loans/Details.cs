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

namespace Application.Loans
{
    public class Details
    {

        public class Query : IRequest<Result<LoanDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<LoanDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<LoanDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var loan = await this.context.Loans
                .ProjectTo<LoanDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

              return Result<LoanDto>.Success(loan);

            }
        }
    }
}