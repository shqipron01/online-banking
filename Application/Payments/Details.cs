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

namespace Application.Payments
{
    public class Details
    {

        public class Query : IRequest<Result<PaymentDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<PaymentDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<PaymentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var payment= await this.context.Payments
                .ProjectTo<PaymentDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

              return Result<PaymentDto>.Success(payment);

            }
        }
    }
}