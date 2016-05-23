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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("i is camera"+navigator.camera);
        app.setup();
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

    setup: function(){

      var element = document.getElementById('takephoto');
      element.onclick = function() {
        navigator.camera.getPicture(app.cameraSuccess, app.cameraError);
      };

      // replace following with example : http://youmightnotneedjquery.com/
      // then we dont need to use jQuery which is 84KB of bloat to do one task
      jQuery(document).ready(function(){
        jQuery("#submit").click(function(){
          user=$("#user").val();
          pass=$("#password").val();
          jQuery.post("http://192.168.3.114:3000/login",{user: user,password: pass}, function(data){
            if(data==='done'){
              alert("login success");
            }
            console.log(data);
            json_reply = JSON.parse(data);
            if(json_reply.status === true){
              document.getElementById('myImage').setAttribute( 'src', json_reply.image );
            }
          });
        });
      });

    },

    cameraError: function(){
      console.log("You fucked up son");
    },

    cameraSuccess: function(imageData){
      console.log("it worked son"+imageData);
      var image = document.getElementById('myImage');
      image.src = imageData;
    },

    setOptions: function() {
      var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: Camera.sourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
      }
      return options;
    }
};

app.initialize();
