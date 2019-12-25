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
    public class KhuyenMaiController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/KhuyenMai
        public System.Object GetKhuyenMais()
        {

            var result = (from a in db.KhuyenMais
                          select new
                          {
                              a.idKhuyenMai,
                              a.idSanPham,
                              a.NgayBD,
                              a.NgayKT,
                              a.PhanTramKM
                          }).ToList();

            return result;
        }

        // GET: api/KhuyenMai/5
        [ResponseType(typeof(KhuyenMai))]
        public IHttpActionResult GetKhuyenMai(int id)
        {
            KhuyenMai khuyenMai = db.KhuyenMais.Find(id);
            if (khuyenMai == null)
            {
                return NotFound();
            }

            return Ok(khuyenMai);
        }

        // PUT: api/KhuyenMai/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKhuyenMai(int id, KhuyenMai khuyenMai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != khuyenMai.idKhuyenMai)
            {
                return BadRequest();
            }

            db.Entry(khuyenMai).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KhuyenMaiExists(id))
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

        // POST: api/KhuyenMai
        [ResponseType(typeof(KhuyenMai))]
        public IHttpActionResult PostKhuyenMai(KhuyenMai khuyenMai)
        {

            db.KhuyenMais.Add(khuyenMai);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = khuyenMai.idKhuyenMai }, khuyenMai);
        }

        // DELETE: api/KhuyenMai/5
        [ResponseType(typeof(KhuyenMai))]
        public IHttpActionResult DeleteKhuyenMai(int id)
        {
            KhuyenMai khuyenMai = db.KhuyenMais.Find(id);
            if (khuyenMai == null)
            {
                return NotFound();
            }

            db.KhuyenMais.Remove(khuyenMai);
            db.SaveChanges();

            return Ok(khuyenMai);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KhuyenMaiExists(int id)
        {
            return db.KhuyenMais.Count(e => e.idKhuyenMai == id) > 0;
        }
    }
}