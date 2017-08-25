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
using DataAcess;

namespace Api.Controllers
{
    public class ArtistController : ApiController
    {
        private MusicLibraryEntities db = new MusicLibraryEntities();

        // GET api/Artist
        public IQueryable<tblArtist> GettblArtists()
        {
            return db.tblArtists;
        }

        // GET api/Artist/5
        [ResponseType(typeof(tblArtist))]
        public IHttpActionResult GettblArtist(int id)
        {
            tblArtist tblartist = db.tblArtists.Find(id);
            if (tblartist == null)
            {
                return NotFound();
            }

            return Ok(tblartist);
        }

        // PUT api/Artist/5
        public IHttpActionResult PuttblArtist(int id, tblArtist tblartist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblartist.Artist_id)
            {
                return BadRequest();
            }

            db.Entry(tblartist).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblArtistExists(id))
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

        // POST api/Artist
        [ResponseType(typeof(tblArtist))]
        public IHttpActionResult PosttblArtist(tblArtist tblartist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblArtists.Add(tblartist);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblartist.Artist_id }, tblartist);
        }

        // DELETE api/Artist/5
        [ResponseType(typeof(tblArtist))]
        public IHttpActionResult DeletetblArtist(int id)
        {
            tblArtist tblartist = db.tblArtists.Find(id);
            if (tblartist == null)
            {
                return NotFound();
            }

            db.tblArtists.Remove(tblartist);
            db.SaveChanges();

            return Ok(tblartist);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblArtistExists(int id)
        {
            return db.tblArtists.Count(e => e.Artist_id == id) > 0;
        }
    }
}