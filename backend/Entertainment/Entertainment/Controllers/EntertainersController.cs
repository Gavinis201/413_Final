using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Entertainment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entertainment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainersController : ControllerBase
    {
        private readonly EntertainmentAgencyExampleContext _context;

        public EntertainersController(EntertainmentAgencyExampleContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets all entertainers with their booking count and last booked date
        /// </summary>
        /// <returns>List of entertainers</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<EntertainerDto>))]
        public async Task<ActionResult<IEnumerable<EntertainerDto>>> GetEntertainers()
        {
            var entertainers = await _context.Entertainers
                .Select(e => new EntertainerDto
                {
                    EntertainerId = e.EntertainerId,
                    EntStageName = e.EntStageName,
                    BookingCount = _context.Engagements.Count(eng => eng.EntertainerId == e.EntertainerId),
                    LastBookedDate = _context.Engagements
                        .Where(eng => eng.EntertainerId == e.EntertainerId)
                        .OrderByDescending(eng => eng.StartDate)
                        .Select(eng => eng.StartDate)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(entertainers);
        }

        /// <summary>
        /// Gets a specific entertainer by ID
        /// </summary>
        /// <param name="id">The entertainer ID</param>
        /// <returns>The entertainer details</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Entertainer))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Entertainer>> GetEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }
            return Ok(entertainer);
        }

        /// <summary>
        /// Adds a new entertainer
        /// </summary>
        /// <param name="entertainer">The entertainer to add</param>
        /// <returns>The created entertainer</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Entertainer))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Entertainer>> PostEntertainer([FromBody] Entertainer entertainer)
        {
            if (string.IsNullOrWhiteSpace(entertainer.EntStageName))
            {
                return BadRequest("Stage name is required");
            }

            entertainer.DateEntered = DateOnly.FromDateTime(DateTime.Now);
            _context.Entertainers.Add(entertainer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEntertainers), new { id = entertainer.EntertainerId }, entertainer);
        }

        /// <summary>
        /// Updates an existing entertainer
        /// </summary>
        /// <param name="id">The entertainer ID</param>
        /// <param name="entertainer">The updated entertainer data</param>
        /// <returns>No content if successful</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutEntertainer(int id, [FromBody] Entertainer entertainer)
        {
            if (id != entertainer.EntertainerId)
            {
                return BadRequest("ID mismatch");
            }

            if (string.IsNullOrWhiteSpace(entertainer.EntStageName))
            {
                return BadRequest("Stage name is required");
            }

            _context.Entry(entertainer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntertainerExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        /// <summary>
        /// Deletes an entertainer
        /// </summary>
        /// <param name="id">The entertainer ID</param>
        /// <returns>No content if successful</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }

            _context.Entertainers.Remove(entertainer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntertainerExists(int id)
        {
            return _context.Entertainers.Any(e => e.EntertainerId == id);
        }
    }
} 