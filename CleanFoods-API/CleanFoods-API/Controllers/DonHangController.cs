using CleanFoods_API.Models;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace CleanFoods_API.Controllers
{
    public class DonHangController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/DonHang
        public System.Object GetDonHangs()
        {
            var result = (from a in db.DonHangs
                          join b in db.KhachHangs on a.idKhachHang equals b.idKhachHang

                          select new
                          {
                              a.idDonHang,
                              a.MaSoDonHang,
                              b.TenKhachHang,
                              a.PhuongThucThanhToan,
                              a.NgayXacNhanDonHang,
                              a.TrangThai,
                              a.TongTien
                          }).ToList();


            return result;
        }

        // GET: api/DonHang/5
        [ResponseType(typeof(DonHang))]
        public IHttpActionResult GetDonHang(int id)
        {

            var donhang = (from a in db.DonHangs
                           where a.idDonHang == id

                           select new
                           {
                               a.idDonHang,
                               a.MaSoDonHang,
                               a.idKhachHang,
                               a.PhuongThucThanhToan,
                               a.TongTien,
                               a.TrangThai,
                               a.NgayXacNhanDonHang,
                               DeletedOrderItemIDs = ""
                           }).FirstOrDefault();

            var khachhang = (from a in db.KhachHangs
                             join b in db.DonHangs on a.idKhachHang equals b.idKhachHang
                             where b.idDonHang == id

                             select new
                             {
                                 a.idKhachHang,
                                 a.TenKhachHang,
                                 a.Email,
                                 a.SoDienThoai,
                                 a.DiaChi,
                                 a.GioiTinh
                             }).FirstOrDefault();

            var giohang = (from a in db.GioHangs
                                  join b in db.SanPhams on a.idSanPham equals b.idSanPham
                                  where a.idDonHang == id

                                  select new
                                  {
                                      a.idGioHang,
                                      a.idDonHang,
                                      a.idSanPham,
                                      SanPhamName = b.TenSanPham,
                                      SanPhamPrice = b.GiaBan,
                                      a.SoLuong,
                                      TongTien = a.SoLuong * b.GiaBan
                                  }).ToList();


            return Ok(new { donhang, khachhang, giohang });
        }

        // PUT: api/DonHang/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDonHang(int id, DonHang donHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != donHang.idDonHang)
            {
                return BadRequest();
            }

            db.Entry(donHang).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonHangExists(id))
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

        // POST: api/DonHang
        [ResponseType(typeof(DonHang))]
        public IHttpActionResult PostDonHang(DonHang donHang)
        {
            DateTime now = DateTime.Today;

            int totalPrice = 0;

            foreach (var item in db.GioHangs)
            {
                if (item.idDonHang == null)
                {
                    totalPrice += int.Parse(item.SanPham.GiaBan.ToString()) * int.Parse(item.SoLuong.ToString());
                }
            }

            if (donHang.PhuongThucThanhToan == "Thanh toán bắng tiền mặt")
            {
                donHang.TrangThai = "Chưa thanh toán";
            }

            donHang.NgayXacNhanDonHang = now;
            donHang.TongTien = totalPrice;
            db.DonHangs.Add(donHang);

            int max = db.KhachHangs.Max(p => p.idKhachHang);

            if (max != 0)
            {
                donHang.idKhachHang = max;
            }




            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = donHang.idDonHang }, donHang);

        }

        [HttpPost]
        [Route("api/PostDonHang")]
        public IHttpActionResult PostDonHangAdmin(DonHang donHang)
        {
            DateTime now = DateTime.Today.Date;
            donHang.NgayXacNhanDonHang = now;

            if (donHang.PhuongThucThanhToan == "Thanh toán bắng tiền mặt")
            {
                donHang.TrangThai = "Chưa thanh toán";
            }

            try
            {
                if (donHang.idDonHang == 0)
                {
                    db.DonHangs.Add(donHang);
                }
                else
                {
                    db.Entry(donHang).State = EntityState.Modified;
                }

                foreach (var item in donHang.GioHangs)
                {
                    if (item.idGioHang == 0)
                    {
                        db.GioHangs.Add(item);
                    }
                    else
                    {
                        db.Entry(item).State = EntityState.Modified;
                    }
                }

                if (donHang.KhachHang.idKhachHang == 0)
                {
                    db.KhachHangs.Add(donHang.KhachHang);
                }
                else
                {
                    db.Entry(donHang.KhachHang).State = EntityState.Modified;
                }

                //Delete For OrderItems
                foreach (var id in donHang.DeletedOrderItemIDs.Split(',').Where(x => x != ""))
                {
                    GioHang x = db.GioHangs.Find(Convert.ToInt64(id));
                    db.GioHangs.Remove(x);
                }

                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        // DELETE: api/DonHang/5
        [ResponseType(typeof(DonHang))]
        public IHttpActionResult DeleteDonHang(int id)
        {
            DonHang donHang = db.DonHangs.Include(y => y.GioHangs).SingleOrDefault(x => x.idDonHang == id);

            foreach (var item in donHang.GioHangs.ToList())
            {
                db.GioHangs.Remove(item);
            }

            db.DonHangs.Remove(donHang);
            db.SaveChanges();

            return Ok(donHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DonHangExists(int id)
        {
            return db.DonHangs.Count(e => e.idDonHang == id) > 0;
        }
    }
}