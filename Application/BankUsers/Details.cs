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


namespace Application.BankUsers
{
    public class Details
    {

        public class Query : IRequest<Result<BankUserDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<BankUserDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context,IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<BankUserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bankuser = await this.context.BankUsers
                .ProjectTo<BankUserDto>(this.mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

              return Result<BankUserDto>.Success(bankuser);

            }
        }
    }
}