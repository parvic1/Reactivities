using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Domain;
using Persistence;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Activities
{
    public class List
    {
        public class Query: IRequest<Result<List<ActivityDto>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //var value2 = await _context.Activities
                //    .Include(a=>a.Attendees)
                //    .ThenInclude(u=>u.AppUser)
                //    .ToListAsync(cancellationToken);

                var value = await _context.Activities
                        .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                        .ToListAsync(cancellationToken);

                var actToRet = _mapper.Map<List<ActivityDto>>(value);


                return Result<List<ActivityDto>>.Success(actToRet);
            }
        }

    }
}