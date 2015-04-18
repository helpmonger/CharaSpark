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
    public class wishesController : ApiController
    {
        private charasparkEntities db = new charasparkEntities();

        // GET: api/wishes
        public IQueryable<wish> Getwishes()
        {
            return db.wishes;
        }

        // GET: api/wishes/5
        [ResponseType(typeof(wish))]
        public IHttpActionResult Getwish(int id)
        {
            wish wish = db.wishes.Find(id);
            if (wish == null)
            {
                return NotFound();
            }

            return Ok(wish);
        }

        // PUT: api/wishes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putwish(int id, wish wish)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != wish.wish_id)
            {
                return BadRequest();
            }

            db.Entry(wish).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!wishExists(id))
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

        // POST: api/wishes
        [ResponseType(typeof(wish))]
        public IHttpActionResult Postwish(wish wish)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.wishes.Add(wish);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = wish.wish_id }, wish);
        }

        // DELETE: api/wishes/5
        [ResponseType(typeof(wish))]
        public IHttpActionResult Deletewish(int id)
        {
            wish wish = db.wishes.Find(id);
            if (wish == null)
            {
                return NotFound();
            }

            db.wishes.Remove(wish);
            db.SaveChanges();

            return Ok(wish);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool wishExists(int id)
        {
            return db.wishes.Count(e => e.wish_id == id) > 0;
        }
    }
}