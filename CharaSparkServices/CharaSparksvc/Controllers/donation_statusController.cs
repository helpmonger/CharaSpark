using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CharaSparksvc.Models;

namespace CharaSparksvc.Controllers
{
    public class donation_statusController : ApiController
    {
        private charasparkEntities db = new charasparkEntities();

        // GET: api/donation_status
        public IQueryable<donation_status> Getdonation_status()
        {
            return db.donation_status;
        }

        // GET: api/donation_status/5
        [ResponseType(typeof(donation_status))]
        public IHttpActionResult Getdonation_status(int id)
        {
            donation_status donation_status = db.donation_status.Find(id);
            if (donation_status == null)
            {
                return NotFound();
            }

            return Ok(donation_status);
        }

        // PUT: api/donation_status/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putdonation_status(int id, donation_status donation_status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != donation_status.donation_status_id)
            {
                return BadRequest();
            }

            db.Entry(donation_status).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!donation_statusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/donation_status
        [ResponseType(typeof(donation_status))]
        public IHttpActionResult Postdonation_status(donation_status donation_status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.donation_status.Add(donation_status);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = donation_status.donation_status_id }, donation_status);
        }

        // DELETE: api/donation_status/5
        [ResponseType(typeof(donation_status))]
        public IHttpActionResult Deletedonation_status(int id)
        {
            donation_status donation_status = db.donation_status.Find(id);
            if (donation_status == null)
            {
                return NotFound();
            }

            db.donation_status.Remove(donation_status);
            db.SaveChanges();

            return Ok(donation_status);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool donation_statusExists(int id)
        {
            return db.donation_status.Count(e => e.donation_status_id == id) > 0;
        }
    }
}