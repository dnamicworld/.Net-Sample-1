$(document).ready(function () {
     

    var map;

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(9.784851, -84.270386),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);


    function point(name, lat, long) {
             
        this.name = name;
        this.lat = ko.observable(lat);
        this.long = ko.observable(long);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            title: name,
            map: map
        });     
       
    }   

    my.alertaPendiente = function (id, email, comentarios,  latitude, longitud, estado) {
        var self = this;
        this.id = ko.observable(id);
        this.email = ko.observable(email);
        this.comentarios = ko.observable(comentarios);
        this.longitud = ko.observable(longitud);
        this.latitude = ko.observable(latitude);
        this.estado = ko.observable(estado);

        self.eliminarAlerta = function () {

            //Utilizo las utilidades de knock out para recoger mi arreglo observable
            var match = ko.utils.arrayFirst(my.alertasAdminVm.listaAlertas(), function (item) {
                return item.id() == self.id();
            });

            //Remuevo el item devuelto
            my.alertasAdminVm.listaAlertas.remove(match);

            //Hasta aquí los cambios son a nivel de usuario no se ha guardado en base de datos

            //Llamo mi función asincrona para ir a guardar a bd
            my.alertasDataService.eliminarAlerta(match.id(), function (data) {

                if (data === false) {
                    my.loadAlertasPendientes();
                }
                else {
                    $('#lblResult').html("Alerta Eliminada.").show().fadeOut(3000);
                }

            });
        }

        self.cambiarEstado = function () {


            //Utilizo las utilidades de knock out para recoger mi arreglo observable
            var match = ko.utils.arrayFirst(my.alertasAdminVm.listaAlertas(), function (item) {
                return item.id() == self.id();
            });

            //Cambio los valores del item del arreglo
            if (match.estado() === 1) {
                match.estado(0);
            }
            else if (match.estado() === 0) {
                match.estado(1);
            }

        

            //Llamo mi función asincrona para ir a guardar a bd
            my.alertasDataService.cambiarEstado(match.id(), function (data) {

                //Si algo malo sucede sincronizo, si no todo sigue igual
                //El usuario no es interrumpido
                if (data === false) {
                    my.alertasAdminVm.listaAlertas();
                }

            });

        }
    };

    // define the ViewModel
    my.alertasAdminVm = function () {

        // observable properties
        id = ko.observable(0),
		email = ko.observable(""),
		comentarios = ko.observable(""),
		longitud = ko.observable(0),
		latitude = ko.observable(0),
		alertsCollection = ko.observableArray([]),
        points = ko.observableArray([]),
        listaAlertas = ko.observableArray([]),
        estado = ko.observable();

         
        // functions
        loadAlertasPendientes = function () {        

            //Llamo mi función asincrona para ir a guardar a bd
            my.alertasDataService.listarAlertas(function (data) {
                              
                    //Vamos a recorrer lo que el Servidor nos devolvió (JSON) con un foreach de JQUERY 
                    $(data).each(function () {

                        points.push(new point(this.Comentarios, this.Latitude, this.Longitud));

                        listaAlertas.push(new my.alertaPendiente(this.Id, this.Email, this.Comentarios, this.Latitude, this.Longitud, this.Estado));
                      
                    });


            });

        };

        // return section
        return {
            // properties
            id: id,
            email: email,
            comentarios: comentarios,
            longitud: longitud,
            latitude: latitude,
            alertsCollection: alertsCollection,
            points: points,
            listaAlertas: listaAlertas,
            estado: estado,

            // functions
            loadAlertasPendientes: loadAlertasPendientes
        };

    }();

    // load the info
    my.alertasAdminVm.loadAlertasPendientes();

    // apply ko bindings
    setTimeout(function () {
        ko.applyBindings(my.alertasAdminVm, $('#adminContainer')[0]);
    }, 500);







});


