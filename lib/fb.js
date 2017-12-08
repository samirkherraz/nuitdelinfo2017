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

function processEvent(userId, fct) {
  FB.api(`/${userId}/events`, checkError((response) => {
    applyToFutureEvents(response.data, fct);
  }));
}

function applyToEachEvents(fct) {
  FB.api("/me", checkError((response) => {
    document.getElementById("id").innerHTML=response.name;
    processEvent(response.id, fct);
  }));
}

let eventsArray = [];

function addToArray(event) {
  eventsArray.push(event);
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
          applyToEachEvents(addToArray);
        }
        else{
          console.log("Error: not connected");
        }
      })

      setTimeout(() => {
        console.log(eventsArray);
      }, 5000);
    };

    (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/fr_FR/sdk/debug.js";
       fjs.parentNode.insertBefore(js, fjs);
     } (document, 'script', 'facebook-jssdk'));
})();
