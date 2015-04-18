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
    public class user_typeController : ApiController
    {
        private charasparkEntities db = new charasparkEntities();

        // GET: api/user_type
        public IQueryable<user_type> Getuser_type()
        {
            return db.user_type;
        }

        // GET: api/user_type/5
        [ResponseType(typeof(user_type))]
        public IHttpActionResult Getuser_type(int id)
        {
            user_type user_type = db.user_type.Find(id);
            if (user_type == null)
            {
                return NotFound();
            }

            return Ok(user_type);
        }

        // PUT: api/user_type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putuser_type(int id, user_type user_type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user_type.user_type_id)
            {
                return BadRequest();
            }

            db.Entry(user_type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!user_typeExists(id))
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

        // POST: api/user_type
        [ResponseType(typeof(user_type))]
        public IHttpActionResult Postuser_type(user_type user_type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.user_type.Add(user_type);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user_type.user_type_id }, user_type);
        }

        // DELETE: api/user_type/5
        [ResponseType(typeof(user_type))]
        public IHttpActionResult Deleteuser_type(int id)
        {
            user_type user_type = db.user_type.Find(id);
            if (user_type == null)
            {
                return NotFound();
            }

            db.user_type.Remove(user_type);
            db.SaveChanges();

            return Ok(user_type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool user_typeExists(int id)
        {
            return db.user_type.Count(e => e.user_type_id == id) > 0;
        }
    }
}