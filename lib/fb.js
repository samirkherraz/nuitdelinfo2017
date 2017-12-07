function checkError(fct) {
  return function(response) {
    if (!response || response.error) {
      console.log("Error ", response.error.code, ": ", response.error.message);
    } else {
      fct(response);
    }
  }
}

function applyToFutureEvents(events, fct) {
  currentDate = new Date();
  events.forEach((event) => {
    eventDate = new Date(event.start_time);
    if (eventDate >= currentDate) {
      fct(event);
    }
  });
}

function printEvents(events) {
  applyToFutureEvents(events.data, printEvent);
}

function printEvent(event) {
  console.log(event.name, ": ", new Date(event.start_time));
  console.log(event.place );
}

function login() {
  FB.login((response) => {
    console.log("logged in");
  }, {scope: 'user_events'});
}

function processEvent(userId) {
  FB.api(`/${userId}/events`, checkError(printEvents));
}

function myidPromise() {
  FB.api
}

function doThingsOnEvents() {
  FB.api("/me", checkError((response) => {
    document.getElementById("id").innerHTML=response.name;
    processEvent(response.id);
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-login").addEventListener("click", login);
});

(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '1655409924521552',
        autoLogAppEvents : true,
        xfbml            : false,
        version          : 'v2.11',
        status           : true,
        cookie           : true
      });

      FB.getLoginStatus((response) => {
        if (response.status === "connected") {
          doThingsOnEvents();
        }
        else{
          console.log("Error: not connected");
        }
      })
    };

    (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/fr_FR/sdk/debug.js";
       fjs.parentNode.insertBefore(js, fjs);
     } (document, 'script', 'facebook-jssdk'));
})();
