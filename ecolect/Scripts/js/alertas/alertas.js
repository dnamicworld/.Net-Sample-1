$(document).ready(function () {


    // wnaEmployee object
    my.alerta = function (id, email, comentarios, longitud, latitude) {
        var self = this;
        this.id = ko.observable(id);
        this.email = ko.observable(email);
        this.comentarios = ko.observable(comentarios);
        this.longitud = ko.observable(longitud);
        this.latitude = ko.observable(latitude);
    };

    // define the ViewModel
    my.alertsVm = function () {

        // observable properties
        id = ko.observable(0),
		email = ko.observable(""),
		comentarios = ko.observable(""),
		longitud = ko.observable(""),
		latitude = ko.observable(""),
		alertsCollection = ko.observableArray([]),

         mapOne = ko.observable({
             lat: ko.observable(9.784851),
             lng: ko.observable(-84.270386)
         }),

        mapTwo = ko.observable({
            lat: ko.observable(9.784851),
            lng: ko.observable(-84.270386)
        }),


ko.bindingHandlers.map = {

    init: function (element, valueAccessor, allBindingsAccessor) {
        var mapObj = ko.utils.unwrapObservable(valueAccessor());
        var latLng = new google.maps.LatLng(
            ko.utils.unwrapObservable(mapObj.lat),
            ko.utils.unwrapObservable(mapObj.lng));
        var mapOptions = {
            center: latLng,
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        mapObj.googleMap = new google.maps.Map(element, mapOptions);

        mapObj.marker = new google.maps.Marker({
            map: mapObj.googleMap,
            position: latLng,
            title: "You Are Here",
            draggable: true
        });

        mapObj.onChangedCoord = function (newValue) {
            var latLng = new google.maps.LatLng(
                ko.utils.unwrapObservable(mapObj.lat),
                ko.utils.unwrapObservable(mapObj.lng));
            mapObj.googleMap.setCenter(latLng);
        };

        mapObj.onMarkerMoved = function (dragEnd) {
            var latLng = mapObj.marker.getPosition();
            mapObj.lat(latLng.lat());
            mapObj.lng(latLng.lng());
        };

        mapObj.lat.subscribe(mapObj.onChangedCoord);
        mapObj.lng.subscribe(mapObj.onChangedCoord);

        google.maps.event.addListener(mapObj.marker, 'dragend', mapObj.onMarkerMoved);        

        $("#" + element.getAttribute("id")).data("mapObj", mapObj);
    }
},

        // functions
        loadAlerts = function () {

            //Llamo mi función asincrona para ir a guardar a bd
            my.alertasDataService.listarAlertasAprovadas(function (data) {

              
                if (data === false) {
                  
                    //Vamos a recorrer lo que el Servidor nos devolvió (JSON) con un foreach de JQUERY 
                    $(data).each(function () {

                        //Limpiamos la colección de empleados
                        alertsCollection.removeAll();                      
                        var nuevaAlerta = new my.alerta(this.Id, this.Email, this.Comentarios, this.Longitud, this.Latitude);
                        alertsCollection.push(nuevaAlerta);

                        var myLatlng = new google.maps.LatLng(this.Longitud, this.Latitude);

                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: mapTwo,
                            title: 'Hello World!'
                        });

                    });

                }

            });

        },
        crearAlert = function () {

        },
        primerPaso = function () {
            $('#primerPasoAlerta').hide();
            

            //Llamo mi función asincrona para ir a guardar a bd
            my.alertasDataService.crearAlerta(email, comentarios, mapOne().lng, mapOne().lat, function (data) {

                //Si algo malo sucede sincronizo, si no todo sigue igual
                //El usuario no es interrumpido
                if (data === false) {
                    my.companiaVm.listarCompanias();
                }

            });

            
            $('#cuartoPasoAlerta').show();
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
            mapOne: mapOne,
            mapTwo: mapTwo,

            // functions
            loadAlerts: loadAlerts,
            crearAlert: crearAlert,
            primerPaso: primerPaso           

        };

    }();

    // load the info
    //my.alertsVm.loadAlerts();

    // apply ko bindings
    setTimeout(function () {
        ko.applyBindings(my.alertsVm, $('#mainBox')[0]);     

    }, 500);



});


