using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecolect.BackEnd.Data
{
    public class AlertasContext
    {

        public int Id { get; set; }
        public string Email { get; set; }
        public string Comentarios { get; set; }
        public double Longitud { get; set; }
        public double Latitude { get; set; }
        public int Estado { get; set; }
    }
}
