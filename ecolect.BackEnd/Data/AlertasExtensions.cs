using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecolect.BackEnd.Data
{
    public static class AlertasExtensions
    {

        public static bool CrearAlerta(string email, string comentarios, double longitud, double latitude)
        {
            try
            {
                EcolectModelDataContext ecolectEntities = new EcolectModelDataContext();

                Alerta nuevaAlerta = new Alerta
                {
                    email = email,
                    comentarios = comentarios,
                    longitud = longitud,
                    latitud = latitude,        
                    estado = 0     
                };

                ecolectEntities.Alertas.InsertOnSubmit(nuevaAlerta);
                ecolectEntities.SubmitChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static IList<AlertasContext> ListarAlertas()
        {
            try
            {
                EcolectModelDataContext ecolectEntities = new EcolectModelDataContext();

                var alertas = ecolectEntities.Alertas.Where(a => a.estado == 1 || a.estado == 0).Select(
                                                                         al => new AlertasContext
                                                                         {
                                                                             Id = al.idAlerta,
                                                                             Email = al.email,
                                                                             Comentarios = al.comentarios,
                                                                             Longitud = Convert.ToDouble(al.longitud),
                                                                             Latitude = Convert.ToDouble(al.latitud),
                                                                             Estado = Convert.ToInt32(al.estado)
                                                                         }).ToList();

                return alertas;

              
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static IList<AlertasContext> ListarAlertasAprovadas()
        {
            try
            {

                EcolectModelDataContext ecolectEntities = new EcolectModelDataContext();

                var alertas = ecolectEntities.Alertas.Where(a => a.estado == 1).Select(
                                                                         al => new AlertasContext
                                                                         {
                                                                             Id = al.idAlerta,
                                                                             Email = al.email,
                                                                             Comentarios = al.comentarios,
                                                                             Longitud =  Convert.ToDouble(al.longitud),
                                                                             Latitude = Convert.ToDouble(al.latitud),
                                                                             Estado = Convert.ToInt32(al.estado)
                                                                         }).ToList();

                return alertas;

            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public static bool EliminarAlertas(int idAlerta)
        {
            try
            {
                EcolectModelDataContext ecolectEntities = new EcolectModelDataContext();

                var alerta = ecolectEntities.Alertas.Where(cmp => cmp.idAlerta == idAlerta).FirstOrDefault();
                ecolectEntities.Alertas.DeleteOnSubmit(alerta);
                ecolectEntities.SubmitChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public static bool ActualizarAlertas(string email, string comentarios, double longitud, double latitude)
        {
            try
            {
               
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static bool CambiarEstado(int idAlerta)
        {
            try
            {

                EcolectModelDataContext ecolectEntities = new EcolectModelDataContext();

                var alerta = ecolectEntities.Alertas.Where(cmp => cmp.idAlerta == idAlerta).FirstOrDefault();

                if (alerta.estado == 1)
                {
                    alerta.estado = 0;
                }
                else if (alerta.estado == 0)
                {
                    alerta.estado = 1;
                }

                ecolectEntities.SubmitChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }      
    }
}
