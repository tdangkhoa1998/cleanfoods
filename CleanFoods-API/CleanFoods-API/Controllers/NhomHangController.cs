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
    public class NhomHangController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/NhomHang
        public System.Object GetNhomHangs()
        {

            var result = (from a in db.NhomHangs
                          select new
                          {
                              a.idNhomHang,
                              a.TenNhomHang
                          }
                          ).ToList();

            return result;
        }

        // GET: api/NhomHang/5
        [ResponseType(typeof(NhomHang))]
        public IHttpActionResult GetNhomHang(int id)
        {
            NhomHang nhomHang = db.NhomHangs.Find(id);
            if (nhomHang == null)
            {
                return NotFound();
            }

            return Ok(nhomHang);
        }

        // PUT: api/NhomHang/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNhomHang(int id, NhomHang nhomHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nhomHang.idNhomHang)
            {
                return BadRequest();
            }

            db.Entry(nhomHang).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhomHangExists(id))
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

        // POST: api/NhomHang
        [ResponseType(typeof(NhomHang))]
        public IHttpActionResult PostNhomHang(NhomHang nhomHang)
        {
            db.NhomHangs.Add(nhomHang);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = nhomHang.idNhomHang }, nhomHang);
        }

        // DELETE: api/NhomHang/5
        [ResponseType(typeof(NhomHang))]
        public IHttpActionResult DeleteNhomHang(int id)
        {
            NhomHang nhomHang = db.NhomHangs.Find(id);
            if (nhomHang == null)
            {
                return NotFound();
            }

            db.NhomHangs.Remove(nhomHang);
            db.SaveChanges();

            return Ok(nhomHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhomHangExists(int id)
        {
            return db.NhomHangs.Count(e => e.idNhomHang == id) > 0;
        }
    }
}