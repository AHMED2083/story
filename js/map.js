


  // The map


  var map = new ol.Map ({
    target: 'map',
    view: new ol.View({
      center: [3, 32],
      projection: "EPSG:4326",
      maxZoom: 10,
      zoom: 0,
      extent: [-10, 24, 15, 40],
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          attributions: "Copyright:© 2013 ESRI, i-cubed, GeoEye",
          url:
            "https://services.arcgisonline.com/arcgis/rest/services/" +
            "ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}",
          maxZoom: 15,
          projection: "EPSG:4326",
          tileSize: 512, // the tile size supported by the ArcGIS tile service
          maxResolution: 180 / 512, // Esri's tile grid fits 180 degrees on one 512 px tile
          wrapX: true,
        }),
      }),
      new ol.layer.Tile({
        source: new ol.source.Stamen({ layer: 'watercolor' }) ,opacity:0.4
      }),
      new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: "./data/rev.geojson",
        }),
      }),
    ],
  });

  // Add placemark
  var placemark = new ol.Overlay.Placemark();
  map.addOverlay (placemark);

  // The storymap
  var story = new ol.control.Storymap({
    html: document.getElementById('story'),
    //target: document.getElementById('story')
    minibar: true
  });

  // Show image fullscreen on click
	var fullscreen = new ol.control.Overlay ({ hideOnClick: true, className: 'zoom' });
	map.addControl(fullscreen);
  story.on('clickimage', function(e){
    console.log(e)
    fullscreen.showImage(e.img.src, e);
  });

  // Fly to the chapter on the map
  story.on('scrollto', function(e){
    if (e.name==='start') {
      placemark.hide();
    } else {
      placemark.show(e.coordinate);
    }
  });
  map.addControl (story);