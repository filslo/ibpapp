/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
      /*  document.getElementById('encode').addEventListener('click', this.encode, false);*/
        document.getElementById('location').addEventListener('click', this.getGeolocation, false);
       
       document.addEventListener('offline', this.onOffline, false);
       document.addEventListener('online', this.onOnline, false);
     

       
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       // if((navigator.network.connection.type).toUpperCase() != 'NONE' &&
          // (navigator.network.connection.type).toUpperCase() != 'UNKNOWN') {
         //   this.onDeviceOnline();
       // } else {
         //   this.onOffline();
        //}
        app.receivedEvent('deviceready');
      //  app.receivedEvent('offline');
       // app.receivedEvent('online');
    //  var watchID = navigator.geolocation.watchPosition(onGeolocationSuccess, onGeolocationError, { frequency: 3000 });

      
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
    scan: function() {
        console.log('scanning');
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 

            alert("We got a barcode\n" + 
            "Result: " + result.text + "\n" + 
            "Format: " + result.format + "\n" + 
           "Cancelled: " + result.cancelled);  

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            document.getElementById("info").innerHTML = result.text;
            console.log(result);
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    },
    
  onOffline: function() {
    //  app.receivedEvent('offline');
        console.log('offline');
        document.getElementById('network-status').value('offline');
     
        app.receivedEvent('networkstatus');
    },

    onOnline: function() {
      //   app.receivedEvent('online');
        console.log('online');
        document.getElementById('networkstatus').value('online');
         app.receivedEvent('networkstatus');
    },
    
    getGeolocation: function () {
        console.log('getLocation');
        navigator.geolocation.getCurrentPosition(function (position) {
                                                 console.log("geolocation : ", position);
                                                 var element = document.getElementById('geolocation');
                                                 element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                                                 'Longitude: '          + position.coords.longitude             + '<br />' +
                                                 'Altitude: '           + position.coords.altitude              + '<br />' +
                                                 'Accuracy: '           + position.coords.accuracy              + '<br />' +
                                                 'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                                                 'Heading: '            + position.coords.heading               + '<br />' +
                                                 'Speed: '              + position.coords.speed                 + '<br />' +
                                                 'Timestamp: '          + position.timestamp                    + '<br />';
                                                 }, function (error) {
                                                 console.log("geolocation failed: ", error.code    +error.message);
                                                 alert('code: '    + error.code    + '\n' +
                                                       'message: ' + error.message + '\n');
                                                 } ,{ enableHighAccuracy: true, timeout: 30000, maximumAge: 30000 });
       
        //var watchID = navigator.geolocation.watchPosition(onGeolocationSuccess, onGeolocationError, { frequency: 3000 });
    },
   // // onSuccess Geolocation
   // //
  onGeolocationSuccess: function (position) {
         console.log('onGeolocationSuccess');
      /*  var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
        'Longitude: '          + position.coords.longitude             + '<br />' +
        'Altitude: '           + position.coords.altitude              + '<br />' +
        'Accuracy: '           + position.coords.accuracy              + '<br />' +
        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
        'Heading: '            + position.coords.heading               + '<br />' +
        'Speed: '              + position.coords.speed                 + '<br />' +
        'Timestamp: '          + position.timestamp                    + '<br />';*/
    },
    
    // onError Callback receives a PositionError object
    //
   onGeolocationError:  function (error) {
          console.log('onGeolocationError');
          alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

};

//app.initialize();
