var zip;
var search;
var map;
var latitude = [];
var long = [];
var initialMapP = 0;


$("#user-search-button").click(function(event) {
  event.preventDefault();
  var zip = $('#user-zip-code').val();
  var search = $('#user-job-title').val();

  jobSearch(zip, search);
});



function jobSearch(myLocation, search) {
  $.ajax({
      cache: false,
      data: $.extend({
        publisher: '4604260559721605',
        v: '2',
        format: 'json',
        q: search,
        l: myLocation,
        radius: 25,
        limit: 10,
        sort: 'date',
        highlight: 1,
        filter: 1,
        latlong: 1,
      }, {
        start: 0,
        end: 10
      }),
      dataType: 'jsonp',
      type: 'GET',
      timeout: 5000,
      url: 'http://api.indeed.com/ads/apisearch'
    })
    .done(function(searchTerm) {
      $.each(searchTerm.results, function(i, item) {
          console.log(item);
          console.log(item.jobtitle);
          console.log(item.company);
          console.log(item.longitude);
          console.log(item.latitude);
          console.log(item.url);
          console.log(item.snippet);
          console.log(item.date);
          console.log(item.formattedRelativeTime);
          console.log(item.expired);
          var templat = parseFloat(item.latitude)
          latitude.push(templat);
          console.log(latitude);
          var templong = parseFloat(item.longitude)
          long.push(templong);
          console.log(long)
          $("#joblist").prepend('<tr><td class="mdl-data-table__cell--non-numeric">'+item.jobtitle+'</td><td class="mdl-data-table__cell--non-numeric">'+item.company+'</td><td class="mdl-data-table__cell--non-numeric">'+item.formattedLocation+'</td><td class="mdl-data-table__cell--non-numeric"><a href='+item.url+'>"View Listing"</td></tr>')
      });
      initMap();
    });
}


jobSearch(zip, search);


  function initMap() {

    if (initialMapP === 0){
      var myLatLng = {lat: 32.7157, lng: -117.1611};
      initialMapP++;
    }
    else {
  
    var myLatLng = {lat: latitude[0], lng: long[0]};
  }
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: myLatLng
      });
    
     for (var i = 0; i < latitude.length; i++) {
      myLatLng = {lat: latitude[i], lng: long[i]};
     var marker = new Marker({
            position: new google.maps.myLatLng,
            map: map,
            icon: {
             path: SQUARE_PIN,
             fillColor: '#00CCBB',
             fillOpacity: 1,
             strokeColor: '',
             strokeWeight: 0
            },
          map_icon_lable: '<span class="map-icon map-icon-square-pin"></span>'
        
   });
   }
}
  function initMap() {

    if (initialMapP === 0){
      var myLatLng = {lat: 32.7157, lng: -117.1611};
      initialMapP++;
    }
    else {
  
    var myLatLng = {lat: latitude[0], lng: long[0]};
  }
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: myLatLng
      });
    
     for (var i = 0; i < latitude.length; i++) {
      myLatLng = {lat: latitude[i], lng: long[i]};
     var marker = new google.maps.Marker({
           position: myLatLng,
           map: map,

          title: 'Hello World!'
 
   });
   }
}

