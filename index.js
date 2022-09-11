
// =================================================================================
// DOM REFERENCES                                                                 //
// =================================================================================

const sidebarElem = document.getElementById("sidebar");

const estatalesToogle = document.getElementById("cb1");
estatalesToogle.checked = true;

const clinicaToogle = document.getElementById("cb2");
clinicaToogle.checked = false;

const consentimientoToogle = document.getElementById("cb3");
consentimientoToogle.checked = false;

const finvidaToogle = document.getElementById("cb4");
finvidaToogle.checked = false;

const generalToogle = document.getElementById("cb5");
generalToogle.checked = false;

const lgbtiToogle = document.getElementById("cb6");
lgbtiToogle.checked = false;

// =================================================================================
// EVENT LISTENERS                                                                 //
// =================================================================================

// Para la Sidebar
document.getElementById("btn-toggle").addEventListener("click", () => {
  sidebarElem.classList.toggle("toggled");
});

document.getElementById("overlay").addEventListener("click", () => {
  sidebarElem.classList.toggle("toggled");
});

document.getElementById("closebar").addEventListener("click", () => {
  sidebarElem.classList.toggle("toggled");
});

// Para los toogle de filtros

estatalesToogle.addEventListener("change", updateLayer);
clinicaToogle.addEventListener("change", updateLayer);
consentimientoToogle.addEventListener("change", updateLayer);
finvidaToogle.addEventListener("change", updateLayer);
generalToogle.addEventListener("change", updateLayer);
lgbtiToogle.addEventListener("change", updateLayer);

// =================================================================================
// ICONS LAYER                                                                    //
// =================================================================================
// Estatales
var iconoEstatal = L.icon({
  iconUrl: "estatal_icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  shadowAnchor: [4, 20],
  popupAnchor: [-0, -7],
});
// Documentacin clinica
var iconoClinica = L.icon({
  iconUrl: "documentacionclinica_icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  shadowAnchor: [4, 20],
  popupAnchor: [-0, -7],
});

var iconoConsentimiento = L.icon({
  iconUrl: "especifica_icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  shadowAnchor: [4, 20],
  popupAnchor: [-0, -7],
});

var iconoFinVida = L.icon({
  iconUrl: "findelavida_icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  shadowAnchor: [4, 20],
  popupAnchor: [-0, -7],
});

var iconoGeneral = L.icon({
  iconUrl: "general_icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  shadowAnchor: [4, 20],
  popupAnchor: [-0, -7],
});

var iconoLgbti = L.icon({
  iconUrl: "lgbti.png",
  iconSize: [20, 20],
  iconAnchor: [8, 8],
  shadowAnchor: [4, 20],
  popupAnchor: [-0, -7],
});

// =================================================================================
// FUNCTIONS                                                                      //
// =================================================================================

// Esta funcion se llama cuando cambia un boton de filtro
function updateLayer(e) {
  // console.log(this);
  // console.log(estatalesToogle.checked);

  switch (this.id) {
    case "cb1":
      if (estatalesToogle.checked) {
        console.log("mostrar capa");

        crearEstatalLayer();
      } else {
        console.log("ocultar capa");
        if (map.hasLayer(estatalLayer)) map.removeLayer(estatalLayer);
      }
      break;

      case "cb2":
        if (clinicaToogle.checked) {
          console.log("mostrar capa");
  
          crearClinicaLayer();
        } else {
          console.log("ocultar capa");
          if (map.hasLayer(clinicaLayer)) map.removeLayer(clinicaLayer);
        }
        break;

        case "cb3":
        if (consentimientoToogle.checked) {
          console.log("mostrar capa");
  
          crearConsentimientoLayer();
        } else {
          console.log("ocultar capa");
          if (map.hasLayer(consentimientoLayer)) map.removeLayer(consentimientoLayer);
        }
        break;

        case "cb4":
        if (finvidaToogle.checked) {
          console.log("mostrar capa");
  
          crearFinvidaLayer();
        } else {
          console.log("ocultar capa");
          if (map.hasLayer(finvidaLayer)) map.removeLayer(finvidaLayer);
        }
        break;

        case "cb5":
        if (generalToogle.checked) {
          console.log("mostrar capa");
  
          crearGeneralLayer();
        } else {
          console.log("ocultar capa");
          if (map.hasLayer(generalLayer)) map.removeLayer(generalLayer);
        }
        break;

        case "cb6":
        if (lgbtiToogle.checked) {
          console.log("mostrar capa");
  
          crearLgtbiLayer();
        } else {
          console.log("ocultar capa");
          if (map.hasLayer(lgbtiLayer)) map.removeLayer(lgbtiLayer);
        }
        break;

    default:
      break;
  }
}

// =================================================================================
// MAIN                                                                           //
// =================================================================================

// Instanciamos un onjeto map a partir d ela clase L de la libreria leaflet
// y definimos sus coordenadas y zoom
const map = L.map("map").setView([40.138774, -3.2320217], 5);

// Definimos el servidor de teselas a ARGIS - ESRI
L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
    minZoom: 5,
    maxZoom: 7,
  }
).addTo(map);

// Servidor de Teselas de OpenStreetMap

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 6,
//     minZoom:5,
//     attribution: '© OpenStreetMap'
// }).addTo(map);

// Ahora cargamos el mapa de las comunidades ca2.js y le damos estilo
// Las funciones style y onEachFeature se usan en la contruccion

function style(feature) {
  return {
    stroke: true,
    fillColor: "#30bfcc",
    weight: 1,
    opacity: 1,
    color: "#000000",
    dashArray: "1",
    fillOpacity: 0.5,
  };
}

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(feature.properties.name);
  }
}

//https://leafletjs.com/reference.html#path-option
L.geoJSON(ca2, {
  onEachFeature: onEachFeature,
  style: style,
}).addTo(map);

crearEstatalLayer();





function crearEstatalLayer() {
  estatalLayer = L.geoJSON(estatal, {
    pointToLayer: function (feature, latlng) {
      return new L.Marker(latlng, {
        icon: iconoEstatal,
        radius: 20,
        fillOpacity: 0.85,
      });
    },

    style: function (feature) {
      return { color: feature.properties.color, icon: iconoEstatal };
    },
    onEachFeature: function (feature, layer) {

      const txtPopup =`${feature.properties.Name}<br><a href="${feature.properties.Url} target="_bln">Ver en BOE</a>`
      layer.bindPopup(txtPopup);
    },
  }).addTo(map);
}


function crearClinicaLayer() {
  clinicaLayer = L.geoJSON(clinica, {
    pointToLayer: function (feature, latlng) {
      return new L.Marker(latlng, {
        icon: iconoClinica,
        radius: 20,
        fillOpacity: 0.85,
      });
    },

    style: function (feature) {
      return { color: feature.properties.color, icon: iconoClinica };
    },
    onEachFeature: function (feature, layer) {
      const txtPopup =`${feature.properties.Name}<br><a href="${feature.properties.Url}">Ver en BOE</a>`
      layer.bindPopup(txtPopup);
    },
  }).addTo(map);
}


function crearConsentimientoLayer() {
  consentimientoLayer = L.geoJSON(consentimiento, {
    pointToLayer: function (feature, latlng) {
      return new L.Marker(latlng, {
        icon: iconoConsentimiento,
        radius: 20,
        fillOpacity: 0.85,
      });
    },

    style: function (feature) {
      return { color: feature.properties.color, icon: iconoConsentimiento };
    },
    onEachFeature: function (feature, layer) {
      const txtPopup =`${feature.properties.Name}<br><a href="${feature.properties.Url}">Ver en BOE</a>`
      layer.bindPopup(txtPopup);
    },
  }).addTo(map);
}

function crearFinvidaLayer() {
  finvidaLayer = L.geoJSON(finvida, {
    pointToLayer: function (feature, latlng) {
      return new L.Marker(latlng, {
        icon: iconoFinVida,
        radius: 20,
        fillOpacity: 0.85,
      });
    },

    style: function (feature) {
      return { color: feature.properties.color, icon: iconoFinVida };
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.Name);
    },
    onEachFeature: function (feature, layer) {
      const txtPopup =`${feature.properties.Name}<br><a href="${feature.properties.Url}">Ver en BOE</a>`
      layer.bindPopup(txtPopup);
    },
  }).addTo(map);
}

function crearGeneralLayer() {
  generalLayer = L.geoJSON(general, {
    pointToLayer: function (feature, latlng) {
      return new L.Marker(latlng, {
        icon: iconoGeneral,
        radius: 20,
        fillOpacity: 0.85,
      });
    },

    style: function (feature) {
      return { color: feature.properties.color, icon: iconoLgbti };
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.Name);
    },
  }).addTo(map);
}

function crearLgtbiLayer() {
  lgbtiLayer = L.geoJSON(lgtbi, {
    pointToLayer: function (feature, latlng) {
      return new L.Marker(latlng, {
        icon: iconoLgbti,
        radius: 80,
        fillOpacity: 0.85,
      });
    },

    style: function (feature) {
      return { color: feature.properties.color, icon: iconoLgbti };
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.Name);
    },
  }).addTo(map);
}

// =================================================================================
// PARA LA SIDEBAR                                                                //
// =================================================================================

function openNav() {
  document.getElementById("sidebar").style.width = "170px";
  document.getElementById("main").style.marginLeft = "170px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";

  document.getElementById("closebtn").style.display = "none";
}

// //  Filtro
// chkBoxL1 = document.getElementById("chkLeyes1")
// chkBoxL1.addEventListener('click', (e)=> {
//     chkBoxL1.classList.toggle('on');
// })

// https://mappinggis.com/2019/11/filtrando-datos-geograficos-en-formato-geojson-con-leaflet/
// https://github.com/deldersveld/topojson/   geojson cA

// https://data.metabolismofcities.org/library/maps/35475/

// https://mappinggis.com/2013/08/como-crear-un-mapa-web-a-partir-de-un-shapefile/

// https://stackoverflow.com/questions/35486387/leaflet-filter-markers-by-name-using-checkbox
// http://jsfiddle.net/RogerHN/31v2afte/2/

// Estooo
// http://bl.ocks.org/zross/47760925fcb1643b4225

// https://gis.stackexchange.com/questions/283070/filter-geojson-by-attribute-in-leaflet-using-a-button

// Leaflet comprensible
// https://juanchiloops.com/mapas-interactivos-con-leaflet/

// He bajado el geojson de aqui
// https://github.com/codeforgermany/click_that_hood/tree/main/public/data

//Proveedor de tiles
// https://leaflet-extras.github.io/leaflet-providers/preview/

//barra verticales
// https://www.cssscript.com/top-10-javascript-css-mobile-navigation/
