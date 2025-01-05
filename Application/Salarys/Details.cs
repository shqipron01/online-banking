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

namespace Application.Salarys
{
    public class Details
    {

        public class Query : IRequest<Result<SalaryDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<SalaryDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<SalaryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var salary= await this.context.Salarys
                .ProjectTo<SalaryDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

              return Result<SalaryDto>.Success(salary);

            }
        }
    }
}