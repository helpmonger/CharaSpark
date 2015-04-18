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
    public class wish_statusController : ApiController
    {
        private charasparkEntities db = new charasparkEntities();

        // GET: api/wish_status
        public IQueryable<wish_status> Getwish_status()
        {
            return db.wish_status;
        }

        // GET: api/wish_status/5
        [ResponseType(typeof(wish_status))]
        public IHttpActionResult Getwish_status(int id)
        {
            wish_status wish_status = db.wish_status.Find(id);
            if (wish_status == null)
            {
                return NotFound();
            }

            return Ok(wish_status);
        }

        // PUT: api/wish_status/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putwish_status(int id, wish_status wish_status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != wish_status.wish_status_id)
            {
                return BadRequest();
            }

            db.Entry(wish_status).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!wish_statusExists(id))
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

        // POST: api/wish_status
        [ResponseType(typeof(wish_status))]
        public IHttpActionResult Postwish_status(wish_status wish_status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.wish_status.Add(wish_status);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = wish_status.wish_status_id }, wish_status);
        }

        // DELETE: api/wish_status/5
        [ResponseType(typeof(wish_status))]
        public IHttpActionResult Deletewish_status(int id)
        {
            wish_status wish_status = db.wish_status.Find(id);
            if (wish_status == null)
            {
                return NotFound();
            }

            db.wish_status.Remove(wish_status);
            db.SaveChanges();

            return Ok(wish_status);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool wish_statusExists(int id)
        {
            return db.wish_status.Count(e => e.wish_status_id == id) > 0;
        }
    }
}