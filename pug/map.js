
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/geometry/support/webMercatorUtils",
    "esri/widgets/Home",
    "dojo/domReady!"
  ], function(
    Map, MapView, Graphic, webMercatorUtils, Home,
  ) {
  
    var map = new Map({
      basemap: "hybrid"
    });     
  
    var view = new MapView({
      center: [25.88689, 46.126385],
      container: "viewDiv",
      map: map,
      showLegend: true,
      zoom: 16
    });
  
    var home = new Home({
      view: view
    }, "Home");
    view.ui.add(home);
    // Create a polygon geometry
      //zona pentru inot
       var polygon = {
          type: "polygon", // autocasts as new Polygon()
          rings: [
              [25.889929, 46.12872],
              [25.889714, 46.128898],
              [25.887354, 46.128322],
              [25.889993, 46.127922]
          ]
      };
  
    // Create a symbol for rendering the graphic
    var fillSymbol = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: [227, 139, 79, 0.8],
      outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 1
      }
    };
  
    // Add the geometry and symbol to a new graphic
    var polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: fillSymbol
    });
  
      // First create a point geometry (this is the location of the Titanic)
      var point1 = {
        type: "point", // autocasts as new Point()
        longitude: 25.88899,
        latitude:  46.127185
      };
    
      // Create a symbol for drawing the point
      var markerSymbol1 = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [255, 0, 0],
      };
    // Create a graphic and add the geometry and symbol to it
    var pointGraphic1 = new Graphic({
      geometry: point1,
      symbol: markerSymbol1,
    });
  
    var point0 = {
      type: "point", // autocasts as new Point()
      longitude: 25.88450,
      latitude:  46.125485
    };
  
    // Create a symbol for drawing the point
    var markerSymbol0 = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [0, 0, 255],
    };
  
  // Create an object for storing attributes related to the line
  var lineAtt0 = {
    "Concetratia medie anuala de NO3": "2,174(mg NO3/I",
    "Debitul mediu prelevat": "33mc/zi",
    "Azotati": "5%",
    "Sulfati": "2%",
    "PH-ul": "3,8-4,1",
    "Actualizat": "anul 2010"
  };
    // Create a graphic and add the geometry and symbol to it
    var pointGraphic0 = new Graphic({
      geometry: point0,
      symbol: markerSymbol0,
      attributes: lineAtt0,
      popupTemplate: { // autocasts as new PopupTemplate()
        title: "Tipuri de pesti",
        content: [{
          type: "fields",
          fieldInfos: [{
            fieldName: "Concetratia medie anuala de NO3"
          },{
            fieldName: "Debitul mediu prelevat"
          }, {
            fieldName: "Azotati"
          }, {
            fieldName: "Sulfati"
          }, {
            fieldName: "PH-ul"
          }, {
            fieldName: "Actualizat"
          }]
        }]
      }
    });
  
  
  // First create a point geometry (this is the location of the Titanic)
    var point = {
      type: "point", // autocasts as new Point()
      longitude: 25.88659,
      latitude:  46.125185
    };
  
    // Create a symbol for drawing the point
    var markerSymbol = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [0, 255, 0],
    };
  
  // Create an object for storing attributes related to the line
  var lineAtt = {
    Suprafata: "440 ha",
    Adancime: "6,5m",
    Latitudine: "46.126385N",
    Longitudine: "25.88689E",
    Informatii: "https://ro.wikipedia.org/wiki/Lacul_Sf%C3%A2nta_Ana",
    "Actualizat": "anul 2010"
  };
  
    // Create a graphic and add the geometry and symbol to it
    var pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: lineAtt,
      popupTemplate: { // autocasts as new PopupTemplate()
        title: "Tipuri de pesti",
        content: [{
          type: "fields",
          fieldInfos: [{
            fieldName: "Suprafata"
          },{
            fieldName: "Adancime"
          }, {
            fieldName: "Latitudine"
          }, {
            fieldName: "Longitudine"
          }, {
            fieldName: "Informatii"
          }, {
            fieldName: "Actualizat"
          }]
        }]
      }
    });
  
      // First create a point geometry (this is the location of the Titanic)
      var point2 = {
        type: "point", // autocasts as new Point()
        longitude: 25.88559,
        latitude:  46.124185
      };
    
      // Create a symbol for drawing the point
      var markerSymbol2 = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [255, 128, 0],
      };
    // Create an object for storing attributes related to the line
    var lineAtt2 = {
      Nume: "Bombina variegata",
      Populatie: "2000 aprox",
      Traducere: "buhai de balta cu burta galbena",
      Poza: "https://www.google.ro/imgres?imgurl=https://peterlengyel.files.wordpress.com/2014/11/48.jpg&imgrefurl=https://peterlengyel.wordpress.com/2014/11/02/izvorasul-cu-burta-galbena-bombina-variegata/&h=1830&w=4567&tbnid=9_71gahdjowlrM:&tbnh=142&tbnw=355&usg=__xddbUtb0XaWb2hYBDExc-v_jZ48%3D&vet=10ahUKEwiago-43trYAhWMCywKHY1hCCUQ_B0IigEwDg..i&docid=D9YnQEwInl77wM&itg=1&sa=X&ved=0ahUKEwiago-43trYAhWMCywKHY1hCCUQ_B0IigEwDg",
      "Actualizat": "anul 2010"
    };
  
    var lineAtt3 = {
      Nume: "Triturus cristatus",
      Populatie: "5000 aprox",
      Traducere: "triton cu creastă",
      Poza: "https://www.google.ro/imgres?imgurl=http://www.zooland.ro/data/articles/7/1813/tritonul1-0n.jpg&imgrefurl=http://www.zooland.ro/tritonul-cu-creasta-triturus-cristatus-1813&h=245&w=248&tbnid=rVAegkuHbI2V2M:&tbnh=160&tbnw=162&usg=__M5NlOF7Ys27LFJ5bQCTpcIVgTu0%3D&vet=10ahUKEwjB4Jjo49rYAhUBiywKHYZABlkQ_B0IjQEwDg..i&docid=Z_VL2g5rclRREM&itg=1&sa=X&ved=0ahUKEwjB4Jjo49rYAhUBiywKHYZABlkQ_B0IjQEwDg",
      "Actualizat": "anul 2010"
    };
  
    var lineAtt4 = {
      Nume: "Triturus montandoni",
      Populatie: "1000 aprox",
      Traducere: "triton carpatic",
      Poza: "https://www.google.ro/search?q=(triton+carpatic&tbm=isch&source=iu&ictx=1&fir=XuthjoLSjpkyLM%253A%252CziSzCnAAIg8uIM%252C_&usg=__iUcx87tSZxwnRXLLr0uouNlQ5fQ%3D&sa=X&ved=0ahUKEwjas9-Q5NrYAhVEEywKHbaKBFsQ9QEILzAD#imgrc=XuthjoLSjpkyLM:",
      "Actualizat": "anul 2010"
    };
  
      // Create a graphic and add the geometry and symbol to it
      var pointGraphic2 = new Graphic({
        geometry: point2,
        symbol: markerSymbol2,
        attributes: lineAtt2,
        popupTemplate: { // autocasts as new PopupTemplate()
          title: "buhai de balta cu burta galbena",
          content: [{
            type: "fields",
            fieldInfos: [{
              fieldName: "Nume"
            }, {
              fieldName: "Populatie"
            }, {
              fieldName: "Traducere"
            }, {
              fieldName: "Poza"
            }, {
              fieldName: "Actualizat"
            }]
          }]
        }
      });
    
      var pointGraphic3 = new Graphic({
        geometry: point2,
        symbol: markerSymbol2,
        attributes: lineAtt3,
        popupTemplate: { // autocasts as new PopupTemplate()
          title: "triton cu creastă",
          content: [{
            type: "fields",
            fieldInfos: [{
              fieldName: "Nume"
            }, {
              fieldName: "Populatie"
            }, {
              fieldName: "Traducere"
            }, {
              fieldName: "Poza"
            }, {
              fieldName: "Actualizat"
            }]
          }]
        }
      });
      var pointGraphic4 = new Graphic({
        geometry: point2,
        symbol: markerSymbol2,
        attributes: lineAtt4,
        popupTemplate: { // autocasts as new PopupTemplate()
          title: "triton carpatic",
          content: [{
            type: "fields",
            fieldInfos: [{
              fieldName: "Nume"
            }, {
              fieldName: "Populatie"
            }, {
              fieldName: "Traducere"
            }, {
              fieldName: "Poza"
            }, {
              fieldName: "Actualizat"
            }]
          }]
        }
      });
    // Add the graphics to the view's graphics layer
   // view.graphics.addMany([pointGraphic,polygonGraphic]);
      
    view.graphics.addMany([pointGraphic, polygonGraphic, pointGraphic1, pointGraphic2, pointGraphic3, pointGraphic4, pointGraphic0]);
  
    function replaceContentInContainer(target, source) {
      document.getElementById(target).innerHTML = document.getElementById(source).innerHTML;
    }
  
    view.on("click", showCoordinates);
    var chart;
      function showCoordinates(evt) {
        //the map is in web mercator but display coordinates in geographic (lat, long)
        var pt = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
        if(pt.x.toFixed(5) >= 25.88850 && pt.x.toFixed(5) <= 25.88920 && 
            pt.y.toFixed(6) >= 46.127085 && pt.y.toFixed(6) <= 46.127585)
           {
            chart = AmCharts.makeChart("chartdiv", {
              "type": "serial",
              "theme": "light",
              "marginRight": 70,
              "dataProvider": [{
                "country": "2000",
                "visits": 50,
                "color": "#FF0F00"
              }, {
                "country": "2001",
                "visits": 90,
                "color": "#FF6600"
              }, {
                "country": "2002",
                "visits": 53,
                "color": "#FF9E01"
              }, {
                "country": "2003",
                "visits": 64,
                "color": "#FCD202"
              }, {
                "country": "2004",
                "visits": 43,
                "color": "#F8FF01"
              }, {
                "country": "2005",
                "visits": 80,
                "color": "#B0DE09"
              }, {
                "country": "2006",
                "visits": 54,
                "color": "#04D215"
              }],
              "valueAxes": [{
                "axisAlpha": 0,
                "position": "left",
                "color": "#F8FBEF"
              }],
              "startDuration": 1,
              "graphs": [{
                "balloonText": "<b>[[category]]: [[value]]</b>",
                "fillColorsField": "color",
                "fillAlphas": 2,
                "lineAlpha": 0,
                "type": "column",
                "valueField": "visits"
              }],
              "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
              },
              "categoryField": "country",
              "categoryAxis": {
                "gridPosition": "start",
                "labelRotation": 90,
                "color": "#F8FBEF"
              },
            });
          }
        else
        {
          replaceContentInContainer('chartdiv', 'none');
        }
      };
  });
  