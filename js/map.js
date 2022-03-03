// var map = new ol.Map({
//     target: 'map',
//     layers: [
//       new ol.layer.Tile({
//         source: new ol.source.OSM()
//       })
//     ],
//     view: new ol.View({
//       center: ol.proj.fromLonLat([37.41, 8.82]),
//       zoom: 4
//     })
//   });
// import 'ol/ol.css';
// import Map from 'ol.Map';
// import TileLayer from 'ol.layer.Tile';
// import View from 'ol.View';
// import XYZ from 'ol.source.XYZ';

// layers: [
//   new VectorLayer({
//     source: new VectorSource({
//       format: new GeoJSON(),
//       url: './data/countries.json',
//     }),
//   }),
// ],
// import GeoJSON from 'ol/format/GeoJSON';
// import Map from 'ol/Map';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
// import View from 'ol/View';

// new ol.layer.Vector({
//   title: 'added Layer',
//   source: new ol.source.Vector({
//      url: 'mygeojson.json',
//      format: new ol.format.GeoJSON()
//   })
// })

const map = new ol.Map({
  target: "map",
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
      source: new ol.source.Stamen({ layer: 'watercolor' }) ,opacity:0.6
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: "./data/rev.geojson",
      }),
    }),
  ],
  view: new ol.View({
    center: [3, 32],
    projection: "EPSG:4326",
    maxZoom: 10,
    zoom: 0,
    extent: [-10, 24, 15, 40],
  }),
});
