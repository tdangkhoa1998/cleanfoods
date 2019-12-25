using CleanFoods_API.Models;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace CleanFoods_API.Controllers
{
    public class GioHangController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/GioHang
        public System.Object GetGioHangs()
        {

            var result = (from a in db.GioHangs
                          join b in db.SanPhams on a.idSanPham equals b.idSanPham

                          select new
                          {
                              a.idGioHang,
                              a.idDonHang,
                              a.idSanPham,
                              b.TenSanPham,
                              b.HinhAnh,
                              b.NoiDung,
                              b.GiaBan,
                              a.SoLuong,
                              TongTien = a.SoLuong * b.GiaBan
                          }).ToList();

            return result;

        }

        [HttpGet]
        [Route("api/RefreshGetListCart")]
        public IHttpActionResult RefreshGioHang()
        {

            int max = db.DonHangs.Max(p => p.idDonHang);

            foreach (var item in db.GioHangs)
            {
                if (max != 0)
                {

                    if (item.idDonHang == null)
                    {
                        item.idDonHang = max;
                    }

                }
            }

            db.SaveChanges();


            return Ok();
        }


        // GET: api/GioHang/5
        [ResponseType(typeof(GioHang))]
        public IHttpActionResult GetGioHang(int id)
        {
            GioHang gioHang = db.GioHangs.Find(id);
            if (gioHang == null)
            {
                return NotFound();
            }

            return Ok(gioHang);
        }

        [HttpGet]
        [Route("api/GetListCart")]
        public System.Object GetListCart()
        {
            var result = (from a in db.GioHangs
                          join b in db.SanPhams on a.idSanPham equals b.idSanPham
                          where a.idDonHang == null

                          select new
                          {
                              a.idGioHang,
                              a.idDonHang,
                              a.idSanPham,
                              b.TenSanPham,
                              b.HinhAnh,
                              b.NoiDung,
                              b.GiaBan,
                              a.SoLuong,
                              TongTien = a.SoLuong * b.GiaBan
                          }).ToList();

            return result;
        }


        // PUT: api/GioHang/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGioHang(int id, GioHang gioHang)
        {
            db.Entry(gioHang).State = EntityState.Modified;
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/GioHang
        [ResponseType(typeof(GioHang))]
        public IHttpActionResult PostGioHang(GioHang gioHang)
        {

            foreach (var item in db.GioHangs)
            {
                if (item.idSanPham == gioHang.idSanPham && item.idDonHang == null)
                {
                    gioHang.SoLuong += item.SoLuong;
                    db.GioHangs.Remove(item);
                }
            }

            db.GioHangs.Add(gioHang);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = gioHang.idGioHang }, gioHang);
        }

        // DELETE: api/GioHang/5
        [ResponseType(typeof(GioHang))]
        public IHttpActionResult DeleteGioHang(int id)
        {
            GioHang gioHang = db.GioHangs.Find(id);
            if (gioHang == null)
            {
                return NotFound();
            }

            db.GioHangs.Remove(gioHang);
            db.SaveChanges();

            return Ok(gioHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GioHangExists(int id)
        {
            return db.GioHangs.Count(e => e.idGioHang == id) > 0;
        }
    }
}