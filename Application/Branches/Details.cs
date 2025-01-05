
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

namespace Application.Branches
{
    public class Details
    {
        public class Query : IRequest<Result<BranchDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<BranchDto>>
        {
            private readonly DataContext context;
        private readonly IMapper mapper;
            public Handler(DataContext context,IMapper mapper)
            {
            this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<BranchDto>> Handle(Query request, CancellationToken cancellationToken)
            {
              var branch= await this.context.Branches
                .ProjectTo<BranchDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

              return Result<BranchDto>.Success(branch);
            }
        }
    }
}