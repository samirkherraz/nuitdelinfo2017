function checkError(func) {
  return function(response) {
    if (!response || response.error) {
      console.log("Error : " + response.error);
    } else {
      func(response);
    }
  }
}

function getId() {
  FB.api('/me?fields=id', getEvents);
}

function getEvents(response) {
  int id = response.id;
  FB.api(`/${id}/events`, (response) => {
    console.log(response);
  });
}
