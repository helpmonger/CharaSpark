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
    public class error_logController : ApiController
    {
        private charasparkEntities db = new charasparkEntities();

        // GET: api/error_log
        public IQueryable<error_log> Geterror_log()
        {
            return db.error_log;
        }

        // GET: api/error_log/5
        [ResponseType(typeof(error_log))]
        public IHttpActionResult Geterror_log(int id)
        {
            error_log error_log = db.error_log.Find(id);
            if (error_log == null)
            {
                return NotFound();
            }

            return Ok(error_log);
        }

        // PUT: api/error_log/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puterror_log(int id, error_log error_log)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != error_log.error_id)
            {
                return BadRequest();
            }

            db.Entry(error_log).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!error_logExists(id))
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

        // POST: api/error_log
        [ResponseType(typeof(error_log))]
        public IHttpActionResult Posterror_log(error_log error_log)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.error_log.Add(error_log);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = error_log.error_id }, error_log);
        }

        // DELETE: api/error_log/5
        [ResponseType(typeof(error_log))]
        public IHttpActionResult Deleteerror_log(int id)
        {
            error_log error_log = db.error_log.Find(id);
            if (error_log == null)
            {
                return NotFound();
            }

            db.error_log.Remove(error_log);
            db.SaveChanges();

            return Ok(error_log);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool error_logExists(int id)
        {
            return db.error_log.Count(e => e.error_id == id) > 0;
        }
    }
}