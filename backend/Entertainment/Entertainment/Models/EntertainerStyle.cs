﻿using System;
using System.Collections.Generic;

namespace Entertainment.Models;

public partial class EntertainerStyle
{
    public int? EntertainerId { get; set; }

    public int? StyleId { get; set; }

    public int? StyleStrength { get; set; }
}
