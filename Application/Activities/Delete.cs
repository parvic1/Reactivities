using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Application.Core;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class Delete
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Guid Id {get ;set;}
        }

        public class Handler : IRequestHandler<Command,Result<Unit>> 
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FirstOrDefaultAsync(a=>a.Id == request.Id);

                //commented for testing. remove comments after testing exception middleware.
               // if (activity == null)
                 //   return null;

                _context.Remove(activity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to delete the activity");


                return Result<Unit>.Success(Unit.Value); // actually returns nothing.
            }
        }

    }
}