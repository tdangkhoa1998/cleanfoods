using CleanFoods_API.Models;
using System;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace CleanFoods_API.Controllers
{
    public class SanPhamController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/SanPham
        public System.Object GetSanPhams()
        {

            var result = (from a in db.SanPhams
                          join b in db.NhomHangs on a.idNhomHang equals b.idNhomHang
                          join c in db.ThuongHieux on a.idThuongHieu equals c.idThuongHieu

                          select new
                          {
                              a.idSanPham,
                              a.TenSanPham,
                              a.GiaBan,
                              a.idNhomHang,
                              a.idThuongHieu,
                              a.HinhAnh,
                              a.NoiDung,
                              b.TenNhomHang,
                              c.TenThuongHieu

                          }).ToList();

            return result;
        }
        


        // GET: api/SanPham/5
        [ResponseType(typeof(SanPham))]
        public System.Object GetSanPham(int id)
        {
            var sanPham = (from a in db.SanPhams
                           join c in db.ThuongHieux on a.idThuongHieu equals c.idThuongHieu
                           where a.idSanPham == id
                           select new
                           {
                               a.idSanPham,
                               a.TenSanPham,
                               a.GiaBan,
                               a.idNhomHang,
                               a.idThuongHieu,
                               a.HinhAnh,
                               a.NoiDung,
                               c.TenThuongHieu

                           }).FirstOrDefault();

            return sanPham;
        }
        

        // PUT: api/SanPham/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSanPham(int id, SanPham sanPham)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sanPham.idSanPham)
            {
                return BadRequest();
            }

            db.Entry(sanPham).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanPhamExists(id))
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

        // POST: api/SanPham
        //[ResponseType(typeof(SanPham))]
        //public IHttpActionResult PostSanPham(SanPham sanPham)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.SanPhams.Add(sanPham);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = sanPham.idSanPham }, sanPham);
        //}

        

        [HttpPost]
        [Route("api/PostSanPham/Image")]
        public HttpResponseMessage PostSanPhamWithImage()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["HinhAnh"];
            //Create custom filename
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", ".");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/Image/" + imageName);
            
            postedFile.SaveAs(filePath);

            //Save to DB
            using (DBModel db = new DBModel())
            {
                SanPham sanPham = new SanPham()
                {
                    TenSanPham = httpRequest["TenSanPham"],
                    HinhAnh = imageName,
                    NoiDung = httpRequest["NoiDung"],
                    GiaBan = int.Parse(httpRequest["GiaBan"]),
                    idNhomHang = int.Parse(httpRequest["idNhomHang"]),
                    idThuongHieu = int.Parse(httpRequest["idThuongHieu"])
                };
                db.SanPhams.Add(sanPham);
                db.SaveChanges();
            }

            return Request.CreateResponse(HttpStatusCode.Created);

        }

        // DELETE: api/SanPham/5
        [ResponseType(typeof(SanPham))]
        public IHttpActionResult DeleteSanPham(int id)
        {
            SanPham sanPham = db.SanPhams.Find(id);
            if (sanPham == null)
            {
                return NotFound();
            }

            db.SanPhams.Remove(sanPham);
            db.SaveChanges();

            return Ok(sanPham);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SanPhamExists(int id)
        {
            return db.SanPhams.Count(e => e.idSanPham == id) > 0;
        }
    }
}