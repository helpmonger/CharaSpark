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
    public class usersController : ApiController
    {
        private charasparkEntities db = new charasparkEntities();

        // GET: api/users
        public IQueryable<user> Getusers()
        {
            return db.users;
        }

        // GET: api/users/5
        [ResponseType(typeof(user))]
        [Route("api/users/{id}")]
        public IHttpActionResult Getuser(int id)
        {
            user user = db.users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putuser(int id, user user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.user_id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userExists(id))
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

        // POST: api/users
        [ResponseType(typeof(user))]
        public IHttpActionResult Postuser(user user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.user_id }, user);
        }

        // DELETE: api/users/5
        [ResponseType(typeof(user))]
        public IHttpActionResult Deleteuser(int id)
        {
            user user = db.users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool userExists(int id)
        {
            return db.users.Count(e => e.user_id == id) > 0;
        }

        // POST: api/registeruser
        //[ResponseType(typeof(user))]
        //[Route("api/registeruser/{user_name}/{password}/{e_mail}")]
        //public IHttpActionResult Postregisteruser(string user_name, string password, string e_mail)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    user user = new user();
        //    user.user_name = user_name;
        //    user.password = password;
        //    user.e_mail = e_mail;
        //    db.users.Add(user);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = user.user_id }, user);
        //}

        [ResponseType(typeof(user))]
        [Route("api/registeruser/{user_name}")]
        public IHttpActionResult Postregisteruser(string user_name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user user = new user();
            user.user_name = user_name;
            user.password = "test";
            user.e_mail = "test@gmail.com";
            db.users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("registeruser", new { id = user.user_id }, user);
        }
    }
}