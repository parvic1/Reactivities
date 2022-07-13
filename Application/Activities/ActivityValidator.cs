﻿using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(a => a.Title).NotEmpty();
            RuleFor(a => a.Description).NotEmpty();
            RuleFor(a => a.Date).NotEmpty();
            RuleFor(a => a.Category).NotEmpty();
            RuleFor(a => a.City).NotEmpty();
            RuleFor(a => a.Venue).NotEmpty();

        }
    }
}
