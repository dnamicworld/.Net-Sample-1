$(document).ready(function () {
     
    var map;

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(9.784851, -84.270386),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);
    //    zoom: 5,
    //    center: new google.maps.LatLng(55, 11),
    //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //});


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

    // wnaEmployee object
    my.alertaPendiente = function (id, email, comentarios, longitud, latitude) {
        var self = this;
        this.id = ko.observable(id);
        this.email = ko.observable(email);
        this.comentarios = ko.observable(comentarios);
        this.longitud = ko.observable(longitud);
        this.latitude = ko.observable(latitude);
    };

    // define the ViewModel
    my.alertsPendientesVm = function () {

        // observable properties
        id = ko.observable(0),
		email = ko.observable(""),
		comentarios = ko.observable(""),
		longitud = ko.observable(""),
		latitude = ko.observable(""),
		alertsCollection = ko.observableArray([]),
        points = ko.observableArray([]),

         
        // functions
        loadAlertasPendientes = function () {        

            //Llamo mi función asincrona para ir a guardar a bd
            my.alertasDataService.listarAlertasAprovadas(function (data) {
                              
                    //Vamos a recorrer lo que el Servidor nos devolvió (JSON) con un foreach de JQUERY 
                    $(data).each(function () {

                        points.push(new point(this.Comentarios, this.Latitude, this.Longitud));
                      
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

            // functions
            loadAlertasPendientes: loadAlertasPendientes
        };

    }();

    // load the info
    my.alertsPendientesVm.loadAlertasPendientes();

    // apply ko bindings
    setTimeout(function () {
        ko.applyBindings(my.alertsPendientesVm, $('#divListarAlertas')[0]);
    }, 500);







});


