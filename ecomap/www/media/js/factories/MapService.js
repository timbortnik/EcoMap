app.factory('MapFactory', ['$window', '$http', '$state', function(win, $http, $state) {
  var instance = {};
  instance.lat = 54.468077;
  instance.lng = 30.521018;
  instance.centerMap = new google.maps.LatLng(instance.lat, instance.lng);
  instance.zoom = 6;
  instance.initMap = function(centerMap, zoom) {
    if (centerMap === undefined) {
      centerMap = instance.centerMap;
    }
    if (zoom === undefined) {
      zoom = instance.zoom;
    }
    instance.mapInstance = new google.maps.Map(document.getElementById('map'), {
      center: centerMap,
      zoom: zoom,
      options: {
        panControl: true,
        zoomControl: true,
        scaleControl: true,
        mapTypeControl: true,
      }
    });
    instance.lat = centerMap.lat;
    instance.lng = centerMap.lng;
    instance.zoom = zoom;
    google.maps.event.addListener(instance.mapInstance, 'dragend', function() {
      instance.centerMap = instance.mapInstance.getCenter();
    });
    google.maps.event.addListener(instance.mapInstance, 'zoom_changed', function() {
      instance.zoom = instance.mapInstance.getZoom();
    });
  }
  instance.getInst = function() {
    if (instance.mapInstance) {
      return instance.mapInstance;
    }
    instance.mapInstance = new google.maps.Map(document.getElementById('map'), {
      center: instance.centerMap,
      zoom: instance.zoom,
      options: {
        panControl: true,
        zoomControl: true,
        scaleControl: true,
        mapTypeControl: true,
      }
    });
  }
  instance.turnResizeOn = function() {
    google.maps.event.addListenerOnce(instance.mapInstance, 'idle', function() {
      console.log("Resizing map...");
      google.maps.event.trigger(instance.mapInstance, 'resize');
    });
  }
  instance.loadProblems = function() {
    var markers = [];
    $http({
      method: 'GET',
      url: '/api/problems'
    }).then(function successCallback(response) {
      angular.forEach(response.data, function(marker, key) {
        var pos = new google.maps.LatLng(marker.latitude, marker.longitude);
        var new_marker = new google.maps.Marker({
          position: pos,
          map: instance.getInst(),
          id: marker.problem_id,
          problem_type_Id: marker.problem_type_Id,
          problemStatus: marker.status,
          doCluster: true,
          date: marker.date,
          icon: "/image/markers/" + marker.problem_type_Id + ".png",
        });
        new_marker.addListener('click', function() {
          var problem_id = this['id'];
          $state.go("detailedProblem", {
            'id': problem_id
          });
        });
        markers.push(new_marker);
      }, function errorCallback() {})
    })
    return markers;
  }
  instance.setCenter = function(centerMap, zoom) {
    instance.centerMap = centerMap;
    instance.zoom = zoom;
    var map = instance.getInst();
    map.setZoom(instance.zoom);
    map.setCenter(instance.centerMap);
  };
  return instance;
}]);