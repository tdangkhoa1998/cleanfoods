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
using CleanFoods_API.Models;

namespace CleanFoods_API.Controllers
{
    public class ThuongHieuxController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/ThuongHieux
        public System.Object GetThuongHieux()
        {

            var result = (from a in db.ThuongHieux
                          select new
                          {
                              a.idThuongHieu,
                              a.TenThuongHieu
                          }
                          ).ToList();

            return result;
        }

        // GET: api/ThuongHieux/5
        [ResponseType(typeof(ThuongHieu))]
        public IHttpActionResult GetThuongHieu(int id)
        {
            ThuongHieu thuongHieu = db.ThuongHieux.Find(id);
            if (thuongHieu == null)
            {
                return NotFound();
            }

            return Ok(thuongHieu);
        }

        // PUT: api/ThuongHieux/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutThuongHieu(int id, ThuongHieu thuongHieu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != thuongHieu.idThuongHieu)
            {
                return BadRequest();
            }

            db.Entry(thuongHieu).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThuongHieuExists(id))
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

        // POST: api/ThuongHieux
        [ResponseType(typeof(ThuongHieu))]
        public IHttpActionResult PostThuongHieu(ThuongHieu thuongHieu)
        {
            db.ThuongHieux.Add(thuongHieu);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = thuongHieu.idThuongHieu }, thuongHieu);
        }

        // DELETE: api/ThuongHieux/5
        [ResponseType(typeof(ThuongHieu))]
        public IHttpActionResult DeleteThuongHieu(int id)
        {
            ThuongHieu thuongHieu = db.ThuongHieux.Find(id);
            if (thuongHieu == null)
            {
                return NotFound();
            }

            db.ThuongHieux.Remove(thuongHieu);
            db.SaveChanges();

            return Ok(thuongHieu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ThuongHieuExists(int id)
        {
            return db.ThuongHieux.Count(e => e.idThuongHieu == id) > 0;
        }
    }
}