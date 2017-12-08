function checkError(fct) {
  return function(response) {
    if (!response || response.error) {
      console.log("Error ", response.error.code, ": ", response.error.message);
    } else {
      fct(response);
    }
  }
}

<<<<<<< HEAD
=======
function applyToFutureEvents(events, fct) {
  currentDate = new Date();
  events.forEach((event) => {
    eventDate = new Date(event.start_time);
    if (eventDate >= currentDate) {
      fct(event);
    }
  });
}

function printEvent(event) {
  console.log(event.name, ": ", new Date(event.start_time));
  console.log(event.place );
}

function addEventToList(event) {
  let date = new Date(event.start_time);
  date = date.toDateString();
  let li = `<li>${event.name}, ${date}</li>`;
  list_id = "ul-events";
  document.getElementById(list_id).innerHTML += li;

}

>>>>>>> 7f0839e56c43c1e98608120d97f93843819d9f84
function login() {
  FB.login(checkError((response) => {
    console.log("logged in");
    docCookies.setItem("logged", "true");
    document.location.reload();
  }, {scope: 'user_events'}));
}

function logout() {
  FB.logout(checkError((response) => {
    console.log("logged out");
    docCookies.setItem("logged", "false");
    document.location.reload();
  }));
}

<<<<<<< HEAD
function fb(url) {
  return new Promise((resolve, reject) => {
    function call(url) {
      FB.api(url, response => {
        if (!response || response.error) {
          reject();
        } else {
          resolve(response);
        }
      });
    }
    call(url);
  });
}
=======
function processEvent_with_id(id_event) {
  FB.api(`/${id_event}`, checkError(printEvent))
}

function processEvent_url(url){
  var arrayUrl = url.split('/');
  var id = arrayUrl.pop();
  if(id===""){
    id=arrayUrl.pop();
  }
  processEvent_with_id(id);
}

function processEvent(userId, fct) {
  FB.api(`/${userId}/events`, checkError((response) => {
    applyToFutureEvents(response.data, fct);
  }));
>>>>>>> 7f0839e56c43c1e98608120d97f93843819d9f84

function applyToFutureEvents(events, fct) {
  currentDate = new Date();
  events.forEach((event) => {
    eventDate = new Date(event.start_time);
    if (eventDate >= currentDate) {
      fct(event);
    }
  });
}

function printEvent(event) {
  console.log(event.name, ": ", new Date(event.start_time));
  console.log(event.place );
}

function addEventToList(event) {
  let date = new Date(event.start_time);
  date = date.toDateString();
  let li = `<li>${event.name}, ${date}</li>`;
  list_id = "ul-events";
  document.getElementById(list_id).innerHTML += li;
}

document.addEventListener("DOMContentLoaded", () => {
  let logged = docCookies.getItem("logged") === "true";
  let btn = document.getElementById("btn-login");
  if (logged) {
    btn.addEventListener("click", logout);
    btn.innerHTML = "Logout";
  } else {
    btn.addEventListener("click", login);
    btn.innerHTML = "Login";
  }
});

// Main
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
          //applyToEachEvents(addEventToList);
          //applyToEachEvents(addToArray);
          fb("/me").then(response => {
            let id = response.id;
            return fb(`/${id}/events`);
          })
          .then(response => {
            let events = response.data;
            applyToFutureEvents(events, addEventToList);
          })
          .catch(e => {

          })
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
