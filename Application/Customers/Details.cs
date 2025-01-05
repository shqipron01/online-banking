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

namespace Application.Customers
{
    public class Details
    {

        public class Query : IRequest<Result<CustomerDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<CustomerDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<CustomerDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var customer= await this.context.Customers
                .ProjectTo<CustomerDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

              return Result<CustomerDto>.Success(customer);

            }
        }
    }
}