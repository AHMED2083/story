// The map

var map = new ol.Map({
  target: "map",
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
      source: new ol.source.Stamen({ layer: "watercolor" }),
      opacity: 0.4,
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: "./data/rev.geojson",
      }),
    }),
  ],
});

var placemark = new ol.Overlay.Placemark();
map.addOverlay(placemark);

// The storymap
var story = new ol.control.Storymap({
  target: document.getElementById("story"),
  minibar: true,
});

var positions = {
  start: { xy: [3, 32], z: 5 },
  1: { xy: [-0.3076171875, 35.42486791930558], z: 6 },
  2: { xy: [6.6796875, 36.33282808737917], z: 6 },
  3: { xy: [5.5, 34.52466147177172], z: 6 },
};

// Show image fullscreen on click
var fullscreen = new ol.control.Overlay({
  hideOnClick: true,
  className: 'zoom',
});
map.addControl(fullscreen);
story.on("clickimage", function (e) {
  fullscreen.showImage(e.img.src, { title: e.title });
});

// Fly to the chapter on the map
story.on("scrollto", function (e) {
  $("#story .chapter").removeClass("select");
  $(e.element).addClass("select");
  map.getView().cancelAnimations();
  if (e.name === "start") {
    placemark.hide();
    map.getView().animate({
      center: positions[e.name].xy,
      zoom: positions[e.name].z,
    });
  } else {
    placemark.show(positions[e.name].xy);
    // Fly to destination
    var duration = 2000;
    map.getView().animate({
      center: positions[e.name].xy,
      duration: duration,
    });
    map.getView().animate(
      {
        zoom: Math.min(map.getView().getZoom(), positions[e.name].z) - 1,
        duration: duration / 2,
      },
      {
        zoom: positions[e.name].z,
        duration: duration / 2,
      }
    );
  }
});
map.addControl(story);
