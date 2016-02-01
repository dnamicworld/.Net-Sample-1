
my.alertasDataService = new function (my) {

	var serviceBase = '/Alertas/',

		crearAlerta = function (email, comentarios, longitud, latitude, callback) {
			$.ajax({
				url: serviceBase + "CrearAlerta",
				data: { email: email, comentarios: comentarios, longitud: longitud, latitude: latitude },
				async: true,
				cache: false,
				success: function (data) {
					callback(data);
				},
				error: function () {					
				}
			});
		},
	    
        eliminarAlerta = function (id, callback) {
            $.ajax({
                url: serviceBase + "EliminarAlerta",
                data: { id:id },
                async: true,
                cache: false,
                success: function (data) {
                    callback(data);
                },
                error: function () {
                }
            });
        },

         cambiarEstado = function (id, callback) {           

             $.ajax({
                 url: serviceBase + "CambiarEstado",
                 data: { id: id },
                 async: true,
                 cache: false,
                 success: function (data) {
                     callback(data);
                 },
                 error: function () {
                 }
             });
         },

		    listarAlertasAprovadas = function (callback) {
		        $.ajax({
		            url: serviceBase + "ListarAlertasAprovadas",
		            async: true,
		            cache: false,
		            success: function (data) {
		                callback(data);
		            },
		            error: function () {
		            }
		        });
		    },

               listarAlertas = function (callback) {
                   $.ajax({
                       url: serviceBase + "ListarAlertas",
                       async: true,
                       cache: false,
                       success: function (data) {
                           callback(data);
                       },
                       error: function () {
                       }
                   });
               };
	

	// set the public methods for "accountDataService" object
	return {
	    crearAlerta: crearAlerta,
	    listarAlertasAprovadas: listarAlertasAprovadas,
	    eliminarAlerta: eliminarAlerta,
	    cambiarEstado: cambiarEstado,
	    listarAlertas: listarAlertas
	};

}();
