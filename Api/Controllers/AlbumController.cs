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
    public class AlbumController : ApiController
    {
        private MusicLibraryEntities db = new MusicLibraryEntities();

        // GET api/Album

        public IQueryable<tblAlbum> GettblAlbums()
        {
            return db.tblAlbums;
        }

        //public HttpResponseMessage getAlbum()
        //{
        //    return Request.CreateResponse(HttpStatusCode.OK, db.tblAlbums, "application/json");
        //}

        // GET api/Album/5
        [ResponseType(typeof(tblAlbum))]
        public IHttpActionResult GettblAlbum(int id)
        {
            tblAlbum tblalbum = db.tblAlbums.Find(id);
            if (tblalbum == null)
            {
                return NotFound();
            }

            return Ok(tblalbum);
        }

        // PUT api/Album/5
        public IHttpActionResult PuttblAlbum(int id, tblAlbum tblalbum)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblalbum.Albm_id)
            {
                return BadRequest();
            }

            db.Entry(tblalbum).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblAlbumExists(id))
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

        // POST api/Album
        [ResponseType(typeof(tblAlbum))]
        public IHttpActionResult PosttblAlbum(tblAlbum tblalbum)
        {
            ModelState.Remove("Albm_id");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblAlbums.Add(tblalbum);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblalbum.Albm_id }, tblalbum);
        }

        // DELETE api/Album/5
        [ResponseType(typeof(tblAlbum))]
        public IHttpActionResult DeletetblAlbum(int id)
        {
            tblAlbum tblalbum = db.tblAlbums.Find(id);
            if (tblalbum == null)
            {
                return NotFound();
            }

            db.tblAlbums.Remove(tblalbum);
            db.SaveChanges();

            return Ok(tblalbum);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblAlbumExists(int id)
        {
            return db.tblAlbums.Count(e => e.Albm_id == id) > 0;
        }
    }
}