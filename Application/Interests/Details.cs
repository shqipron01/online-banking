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

namespace Application.Interests
{
    public class Details
    {

        public class Query : IRequest<Result<InterestDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<InterestDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<InterestDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var interest= await this.context.Interests
                .ProjectTo<InterestDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

              return Result<InterestDto>.Success(interest);

            }
        }
    }
}