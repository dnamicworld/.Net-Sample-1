using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ecolect.BackEnd.Data;

namespace ecolect.Controllers
{
    public class AlertasController : Controller
    {
        //
        // GET: /Alertas/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ListarAlertas()
        {
            return Json(AlertasExtensions.ListarAlertas(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult CrearAlerta(string email, string comentarios, double longitud, double latitude)
        {
            return Json(AlertasExtensions.CrearAlerta(email, comentarios, longitud, latitude), JsonRequestBehavior.AllowGet);            
        }

        public ActionResult CambiarEstado(int id)
        {
            return Json(AlertasExtensions.CambiarEstado(id), JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListarAlertasAprovadas()
        {
            return Json(AlertasExtensions.ListarAlertasAprovadas(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult EliminarAlerta(int id)
        {
            return Json(AlertasExtensions.EliminarAlertas(id), JsonRequestBehavior.AllowGet);
        }

    }
}
