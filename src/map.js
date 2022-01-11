var map = L.map('map', {
    center: [7.07, -73.13],
    zoom: 12,
    minZoom: 12,
    scrollWheelZoom: false,
});

map.once('focus', function() { map.scrollWheelZoom.enable(); });

L.easyButton('<img src="images/fullscreen.png">', function (btn, map) {
    var cucu = [7.07, -73.13];
    map.setView(cucu, 12);
}).addTo(map);

var esriAerialUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services' +
    '/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var esriAerialAttrib = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, ' +
    'USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the' +
    ' GIS User Community';
var esriAerial = new L.TileLayer(esriAerialUrl,
    {maxZoom: 18, attribution: esriAerialAttrib}).addTo(map);


var opens = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
});


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = (props ?
        'Municipio ' + props.MUNICIPIO + '<br />' +
        'Viviendas ' + props.VIV + '<br />' +
        'Hogares ' + props.HOG + '<br />' +
        'Personas ' + props.Personas + '<br />' +  
        '' + props.POB_VEN_O + '<br />' +  '<br />' + 

        '<b>Vivienda </b>' + '<br />' +
        'Vivienda adecuada: ' + props.VIV_ADE_G.toFixed(0) + ' %' + '<br />' +
        'Espacio vital suficiente: ' + props.ESP_VIT.toFixed(0) + ' %' + '<br />' +
        'Agua mejorada: ' + props.A_ACU.toFixed(0) + ' %' + '<br />' +
        'Saneamiento: ' + props.A_ALC.toFixed(0) + ' %' + '<br />' +
        'Electricidad: ' + props.A_ELEC.toFixed(0) + ' %' + '<br />' +
        'Internet: ' + props.A_INTER.toFixed(0) + ' %' + '<br />' + 
        'Dependencia económica: ' + props.DEP_ECONO.toFixed(2) + '<br />' + 
        'Estrato: ' + props.Estrato.toFixed(0)  + '<br />' +  '<br />' +  

        '<b>Salud</b>' + '<br />' +
        'Proximidad centros de salud: ' + props.DxP_SALUD.toFixed(0) + ' m' + '<br />' +
        'Concentración de Pm10: ' + props.PM10.toFixed(2) + ' µg/m3' +  '<br />' +   
        'Contaminación residuos sólidos: ' + props.CON_SOL.toFixed(0) + ' %' + '<br />' + 
        'Esperanza de vida al nacer: ' + props.E_VIDA.toFixed(0) + ' años' + '<br />' +
        'Brecha género esperanza de vida al nacer: ' + props.B_E_VIDA.toFixed(2) + '<br />' +  '<br />' +   
        
        '<b>Educación, cultura y diversidad </b>' + '<br />' +
        'Proximidad equipamientos culturales: ' + props.DxP_BIBLIO.toFixed(0) + ' m' + '<br />' +
        'Proximidad equipamientos educativos: ' + props.DxP_EDUC.toFixed(0) + ' m' + '<br />' +
        'Diversidad ingresos: ' + props.MIX_EST.toFixed(2) + '/1.79' + '<br />' +
        'Diversidad nivel educativo: ' + props.MIX_EDU.toFixed(2) +'/2.20' +  '<br />' +
        'Diversidad edades: ' + props.MIX_EDAD.toFixed(2) + '/1.79' + '<br />' +
        'Diversidad etnias y razas: ' + props.MIX_ETNIA.toFixed(2) + '/1.61' +'<br />' +
        'Brecha género años promedio educación: ' + props.Brec_Gen_e.toFixed(2) + '<br />' +
        'Años promedio educación: ' + props.A_Edu.toFixed(0) + ' años'+ '<br />' +  '<br />' +  
        
        '<b>Espacios públicos, seguridad y recreación </b>' + '<br />' +
        'Proximidad espacio público: ' + props.DxP_EP.toFixed(0) + ' m' + '<br />' +
        'M² per capita de espacio público: ' + props.M2_ESP_PU.toFixed(2) + '<br />' +
        'Densidad residencial: ' + props.DENS_RESID.toFixed(2) + '<br />' +
        'Tasa de hurtos x 100mil habitantes: ' + props.HURTOS.toFixed(0) + '<br />' +
        'Tasa de homicidios x 100mil habitantes: ' + props.HOMICIDIOS.toFixed(2) + '<br />' +
        'Diversidad usos del suelo: ' + props.MIXTICIDAD.toFixed(2) + '/1.61' +'<br />' + '<br />' +

        '<b>Oportunidades económicas </b>' + '<br />' +
        'Proximidad zonas de interés económico (servicios y comercio): ' + props.DP_COMSER2.toFixed(0) + ' m' + '<br />' +
        'Desempleo: ' + props.T_DESEMP.toFixed(0) + ' %' + '<br />' +
        'Empleo: ' + props.EMPLEO.toFixed(0) + ' %' + '<br />' +
        'Empleo informal estricto: ' + props.EMPLEO_I.toFixed(0) + ' %' + '<br />' +
        'Desempleo juvenil: ' + props.DESEM_JUVE.toFixed(0) + ' %' + '<br />' +
        'Brecha género desempleo: ' + props.BRECHA_D.toFixed(2)  : 'Seleccione una manzana');
};
info.addTo(map);

function stylec(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#ffffff',
        fillOpacity: 0,
        dashArray: '3',
    };
}

var loc = L.geoJson(localidad, {
    style: stylec,
    onEachFeature: popupText,
}).addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'black',
        dashArray: '',
        fillColor: false
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var manzanas;

function resetHighlight(e) {
    manzanas.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function style(feature) {
    return {
        weight: 0.6,
        opacity: 0.5,
        color: '#ffffff00',
        fillOpacity: 0,
    };
}


function changeLegend(props) {
    var _legend = document.getElementById('legend'); // create a div with a class "info"
    _legend.innerHTML = (props ?
        `<p style="font-size: 11px"><strong>${props.title}</strong></p>
            <p style="font-size: 10px">${props.subtitle}</p>
            <p id='colors'>
                ${props.elem1}
                ${props.elem2}
                ${props.elem3}
                ${props.elem4}
                ${props.elem5}
                ${props.elem6}
                ${props.elem7}<br>
                <span style='color:#000000'>Fuente: </span>${props.elem8}<br>
            </p>` :
        `<p style="font-size: 12px"><strong>Área urbana</strong></p>
            <p id='colors'>
                <span style='color:#c3bfc2'>▉</span>Manzanas<br>
            </p>`);
}

var legends = {
    A_Edu: {
        title: "Años promedio educación",
        subtitle: "Años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>16 - 18</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>13 - 15</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>11 - 12</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>9 - 10</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 8</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIXTICIDAD: {
        title: "Diversidad usos del suelo",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.06 - 1.54</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.79 - 1.05</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.54 - 0.78</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.30 - 0.53</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.29</div>',
        elem6: '',
        elem7: '',
        elem8: "Mapas de uso del suelo POT municipales 2020",
    },
    A_ACU: {
        title: "Acceso a agua mejorada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>91 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>69 - 90</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>44 - 68</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>18 - 43</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 17</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    A_ALC: {
        title: "Acceso a saneamiento",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>97 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>86 - 96</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>65 - 85</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>30 - 64</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 29</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },  
    DESEM_JUVE: {
        title: "Desempleo juvenil",
        subtitle: "% de Personas entre 15 y 24 años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 4</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>5 - 11</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>12 - 20</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>21 - 38</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>39 - 88</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    A_INTER: {
        title: "Acceso a internet",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>86 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>52 - 85</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>33 - 51</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>14 - 32</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 13</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    T_DESEMP: {
        title: "Tasa de desempleo",
        subtitle: "% de Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 10</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>11 - 20</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>21 - 30</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>31 - 50</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>51 - 88</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    PM10: {
        title: "Concentración Pm10",
        subtitle: "µg/m3",
        elem1: '<div><span  style= "color:#1a9641">▉</span>34 - 38</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>39 - 41</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>42 - 45</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>46 - 49</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>50 - 53</div>',
        elem6: '',
        elem7: '',
        elem8: "Sistema de Monitoreo de Área Metropolitana de Bucaramanga 2020",
    },
    VEN: {
        title: "Población de origen Venezuela",
        subtitle: "Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1 - 5</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>6 - 25</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>26 - 77</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>78 - 100</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>100 - 205</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    Estrato: {
        title: "Estratificación socioeconómica",
        subtitle: "Máximo conteo",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Estrato 6</div>',
        elem2: '<div><span  style= "color:#82E0AA">▉</span>Estrato 5</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>Estrato 4</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>Estrato 3</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>Estrato 2</div>',
        elem6: '<div><span  style= "color:#d7191c">▉</span>Estrato 1</div>',
        elem7: '<div><span  style= "color:#c3bfc2">▉</span>Sin estrato</div>',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_ETNIA: {
        title: "Diversidad etnias y razas",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.25 - 0.43</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.15 - 0.24</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.09 - 0.14</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.03 - 0.08</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.02</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EDU: {
        title: "Diversidad nivel educativo",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.56 - 2.01</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.34 - 1.55</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.08 - 1.33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.47 - 1.07</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.46</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EDAD: {
        title: "Diversidad edades",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.54 - 1.77</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.45 - 1.53</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.34 - 1.44</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1.13 - 1.33</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.35 - 1.12</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EST: {
        title: "Diversidad ingresos",
        subtitle: "Índice de Shannon-Wienner -  Nivel de diversidad por manzana",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.82 - 1.47</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.53 - 0.81</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.26 - 0.52</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.08 - 0.25</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.07</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    DENS_RESID: {
        title: "Densidad residencial",
        subtitle: "Población/ha", 
        elem1: '<div><span  style= "color:#a6d96a">▉</span>0 - 149</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>150 - 200</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>201 - 400</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>401 - 500</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Mayor 501</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    DxP_SALUD: {
        title: "Proximidad centros de salud",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1500</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1501 - 5000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>5001 - 7500</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>7501 - 14835</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "SISPRO 2020",
    },
    VIV_ADE_G: {
        title: "Vivienda Adecuada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>98 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>94 - 97</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>89 - 93</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>71 - 88</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 70</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    ESP_VIT: {
        title: "Espacio vital suficiente",
        subtitle: "% de Hogares",
        elem1: '<div><span  style= "color:#1a9641">▉</span>99 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>94 - 98</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>87 - 93</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>74 - 86</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>33 - 73</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    A_ELEC: {
        title: "Acceso a electricidad",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>99 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>95 - 98</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>86 - 94</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>61 - 85</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>24 - 60</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    DEP_ECONO: {
        title: "Dependencia económica",
        subtitle: "Población/Población ocupada",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.00 - 2.51</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>2.52 - 3.24</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>3.25 - 5.33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>5.34 - 16.00</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>16.01 - 46.00</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    CON_SOL: {
        title: "Contaminación residuos sólidos",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 4</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>5 - 16</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>17 - 33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>34 - 64</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>65 - 100</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    E_VIDA: {
        title: "Esperanza de vida al nacer",
        subtitle: "Años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>76 - 78</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>74 - 75</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>71 - 73</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>66 - 70</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>28 - 65</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    B_E_VIDA: {
        title: "Brecha género esperanza de vida al nacer",
        subtitle: "Relación esperanza de vida al nacer de mujeres y hombres",
        elem1: '<div><span  style= "color:#d7191c">▉</span>0.62 - 0.98</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>0.99 - 1.03</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>1.04 - 1.07</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>1.08 - 1.17</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>1.18 - 5.86</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    DxP_BIBLIO: {
        title: "Proximidad equipamientos culturales",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 3000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3001 - 5000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 18330</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Google Earth 2021",
    },
    DxP_EDUC: {
        title: "Proximidad equipamientos educativos",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 3000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3001 - 5000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 16437</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Ministerio de Educación 2020",
    },
    Brec_Gen_e: {
        title: "Brecha género años promedio educación",
        subtitle: "Relación años promedio educación de mujeres y hombres", 
        elem1: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.90</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>0.91 - 1.04</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>1.05 - 1.26</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>1.27 - 2.27</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>2.28 - 4.50</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    DxP_EP: {
        title: "Proximidad espacio público",
        subtitle: "Distancia en m x Factor inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 3000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3001 - 5000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 15024</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Google Earth 2021",
    },
    M2_ESP_PU: {
        title: "M² per capita de espacio público",
        subtitle: "m²/habitante",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 14.01</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>10.01 - 14.00</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.01 - 10.00</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.06 - 1.00</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.05</div>',
        elem6: '',
        elem7: '',
        elem8: "Google Earth 2021",
    },
    DP_COMSER2: {
        title: "Proximidad zonas de interés económico (servicios y comercio)",
        subtitle: "Distancia en metros con factor de inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 150</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>151 - 500</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>501 - 1500</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1501 - 5000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 -  8176</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    EMPLEO: {
        title: "Empleo",
        subtitle: "% Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>65 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>57 - 64</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>49 - 56</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>37 - 48</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 36</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    BRECHA_D: {
        title: "Brecha de género desempleo",
        subtitle: "Relación desempleo de mujeres y hombres",
        elem1: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.90</div>',
        elem2: '<div><span  style= "color:#1a9641">▉</span>0.91 - 1.01</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>1.02 - 1.62</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>1.63 - 3.14</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>3.15 - 10.40</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    HURTOS: {
        title: "Tasa de hurtos",
        subtitle: "Hurtos x 10mil habitantes",
        elem1: '',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Menor 282</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>282 - 376</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>376 - 390</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>390 - 738</div>',
        elem6: '',
        elem7: '',
        elem8: "Policía Nacional 2020",
    },
    HOMICIDIOS: {
        title: "Tasa de homicidios",
        subtitle: "Homicidios x 10mil habitantes",
        elem1: '',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Menor 11.06</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>11.06 - 13.97</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>13.98 - 14.76</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>14.77 - 17.29</div>',
        elem6: '',
        elem7: '',
        elem8: "Policía Nacional 2020",
    },
    EMPLEO_I: {
        title: "Empleo informal estricto",
        subtitle: "% Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 2</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>3 - 8</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>9 - 20</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>21 - 46</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>47 - 100</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
}

var indi = L.geoJson(Manzana, {
    style: legends.DENS_RESID,
}).addTo(map);

var currentStyle = 'DENS_RESID';

manzanas = L.geoJson(Manzana, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


function setProColor(d) {
    if (currentStyle === 'P_MAT_ADE') {
        return d > 85 ? '#1a9641' :
            d > 65 ? '#a6d96a' :
                d > 35 ? '#f4f466' :
                    d > 15 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'A_ACU') {
        return d > 90 ? '#1a9641' :
            d > 68 ? '#a6d96a' :
                d > 43 ? '#f4f466' :
                    d > 17 ? '#fdae61' :
                        '#d7191c';
    } 
    else if (currentStyle === 'A_ALC') {
        return d > 86 ? '#1a9641' :
            d > 85 ? '#a6d96a' :
                d > 64 ? '#f4f466' :
                    d > 29 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'A_Edu') {
        return d > 15 ? '#1a9641' :
            d > 12 ? '#a6d96a' :
                d > 10 ? '#f4f466' :
                    d > 8 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'MIXTICIDAD') {
        return d > 1.05 ? '#1a9641' :
            d > 0.78 ? '#a6d96a' :
                d > 0.53 ? '#f4f466' :
                    d > 0.29 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'DESEM_JUVE') {
                        return d > 38 ? '#d7191c' :
                        d > 20 ? '#fdae61' :
                            d > 11 ? '#f4f466' :
                                d > 4 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'A_INTER') {
        return d > 85 ? '#1a9641' :
            d > 51 ? '#a6d96a' :
                d > 32 ? '#f4f466' :
                    d > 13 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'T_DESEMP') {
        return d > 50 ? '#d7191c' :
                        d > 30 ? '#fdae61' :
                            d > 20 ? '#f4f466' :
                                d > 10 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'PM10') {
        return d > 49 ? '#d7191c' :
            d > 45 ? '#fdae61' :
                d > 41 ? '#f4f466' :
                    d > 38 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'Estrato') {
        return d > 5 ? '#1a9641':
            d > 4 ? '#82E0AA'  :
            d > 3 ? '#a6d96a'  :
                d > 2 ? '#f4f466' :
                    d > 1 ? '#fdae61' :
                    d > 0 ? '#d7191c':
                    '#c3bfc2';
    }
    else if (currentStyle === 'VEN') {
        return d > 100 ? '#d7191c' :
            d > 77 ? '#fdae61' :
                d > 25 ? '#f4f466' :
                    d > 5 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'MIX_ETNIA') {
        return d > 0.24 ? '#1a9641' :
            d > 0.14 ? '#a6d96a' :
                d > 0.08 ? '#f4f466' :
                    d > 0.02 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDU') {
        return d > 1.55 ? '#1a9641' :
            d > 1.33 ? '#a6d96a' :
                d > 1.07 ? '#f4f466' :
                    d > 0.46 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EST') {
        return d > 0.81 ? '#1a9641' :
            d > 0.52 ? '#a6d96a' :
                d > 0.25 ? '#f4f466' :
                    d > 0.07 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDAD') {
        return d > 1.53 ? '#1a9641' :
            d > 1.44 ? '#a6d96a' :
                d > 1.33 ? '#f4f466' :
                    d > 1.12 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'DENS_RESID') {
        return d > 500 ? '#d7191c' :
        d > 400? '#fdae61' :
            d > 200 ? '#f4f466' :
                d > 149 ? '#1a9641' :
                '#a6d96a';    
    }
    else if (currentStyle === 'DxP_SALUD') {
        return d > 7500 ? '#d7191c' :
            d > 5000 ? '#fdae61' :
                d > 1500 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'VIV_ADE_G') {
        return d > 97 ? '#1a9641' :
            d > 93 ? '#a6d96a' :
                d > 88 ? '#f4f466' :
                    d > 70 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'ESP_VIT') {
        return d > 98 ? '#1a9641' :
            d > 93 ? '#a6d96a' :
                d > 86 ? '#f4f466' :
                    d > 73 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'A_ELEC') {
        return d > 98 ? '#1a9641' :
            d > 94 ? '#a6d96a' :
                d > 85 ? '#f4f466' :
                    d > 60 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'DEP_ECONO') {
        return d > 16 ? '#d7191c' :
            d > 5.33 ? '#fdae61' :
                d > 3.24 ? '#f4f466' :
                    d > 2.51 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'CON_SOL') {
        return d > 64 ? '#d7191c' :
            d > 33 ? '#fdae61' :
                d > 16 ? '#f4f466' :
                    d > 4 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'E_VIDA') {
        return d > 75 ? '#1a9641' :
            d > 73 ? '#a6d96a' :
                d > 70 ? '#f4f466' :
                    d > 65 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'B_E_VIDA') {
        return d > 1.17 ? '#fdae61' :
            d > 1.07 ? '#f4f466' :
                d > 1.03 ? '#a6d96a' :
                    d > 0.98 ? '#1a9641' :
                    '#d7191c';
    }
    else if (currentStyle === 'DxP_BIBLIO') {
        return d > 5000 ? '#d7191c' :
            d > 3000 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'DxP_EDUC') {
        return d > 5000 ? '#d7191c' :
            d > 3000 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'Brec_Gen_e') {
        return d > 2.27 ? '#fdae61' :
            d > 1.26 ? '#f4f466' :
                d > 1.04 ? '#a6d96a' :
                    d > 0.90? '#1a9641' :
                    '#d7191c';
    }
    else if (currentStyle === 'DxP_EP') {
        return d > 5000 ? '#d7191c' :
        d > 3000 ? '#fdae61' :
            d > 1000 ? '#f4f466' :
                d > 500 ? '#a6d96a' :
                '#1a9641';
    }
    else if (currentStyle === 'M2_ESP_PU') {
        return d > 14 ? '#1a9641' :
            d > 10 ? '#a6d96a' :
                d > 1 ? '#f4f466' :
                    d > 0.05 ? '#fdae61':
                    '#d7191c';
    }
    else if (currentStyle === 'DP_COMSER2') {
        return d > 5000 ? '#d7191c' :
            d > 1500 ? '#fdae61' :
                d > 500 ? '#f4f466' :
                    d > 150 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'EMPLEO') {
        return d > 64 ?  '#1a9641' :
            d > 56 ? '#a6d96a' :
                d > 48 ? '#f4f466' :
                    d > 36 ? '#fdae61' :
                   '#d7191c';
    }
    else if (currentStyle === 'BRECHA_D') {
        return d > 3.14 ? '#fdae61' :
            d > 1.62 ? '#f4f466' :
                d > 1.01 ? '#a6d96a' :
                    d > 0.90 ? '#1a9641' :
                    '#d7191c';
    }
    else if (currentStyle === 'EMPLEO_I') {
        return d > 46 ? '#d7191c' :
        d > 20 ? '#fdae61' :
            d > 8 ? '#f4f466' :
                d > 2 ? '#a6d96a':
                '#1a9641';
    }
    else if (currentStyle === 'HURTOS') {
        return d > 390 ? '#d7191c' :
                        d > 376 ? '#fdae61' :
                            d > 282 ? '#f4f466' :
                                '#a6d96a';
    }
    else if (currentStyle === 'HOMICIDIOS') {
        return d > 14.76 ? '#d7191c' :
                        d > 13.97 ? '#fdae61' :
                            d > 11.06 ? '#f4f466' :
                                '#a6d96a';
    }
    else {
        return d > 4 ? '#d7191c' :
            d > 3 ? '#fdae61' :
                d > 2 ? '#f4f466' :
                    d > 1 ? '#a6d96a' :
                        '#1a9641';
    }

}

function fillColor(feature) {
    return {
        fillColor:  setProColor(feature.properties[currentStyle]),
        weight: 0.6,
        opacity: 0.1,
        color: (currentStyle) ? '#ffffff00' : '#c3bfc2', 
        fillOpacity: (currentStyle) ? 0.9 : 0.5,
    };
}

function changeIndi(style) {
    currentStyle = style.value;
    indi.setStyle(fillColor);
    changeLegend((style.value && legends[style.value]) ? legends[style.value] :
        {
            
        });
}

var baseMaps = {
    'Esri Satellite': esriAerial,
    'Open Street Map': opens

};

// Defines the overlay maps. For now this variable is empty, because we haven't created any overlay layers
var overlayMaps = {
    //'Comunas': comu,
    //'Límite fronterizo con Venezuela': lim
};

// Adds a Leaflet layer control, using basemaps and overlay maps defined above
var layersControl = new L.Control.Layers(baseMaps, overlayMaps, {
    collapsed: true,
});
map.addControl(layersControl);
changeIndi({value: 'DENS_RESID'});

function popupText(feature, layer) {
    layer.bindPopup('Municipio ' + feature.properties.MPIO_CNMBR + '<br />')
}
