function checkError(func) {
  return function(response) {
    if (!response || response.error) {
      console.log("Error ", response.error.code, ": ", response.error.message);
    } else {
      func(response);
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
