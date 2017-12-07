function checkError(func) {
  return function(response) {
    if (!response || response.error) {
      console.log("Error ", response.error.code, ": ", response.error.message);
    } else {
      func(response);
    }
  }
}

function removePassedEvents(events) {
  currentDate = new Date();
  eventsNotPassed = [];
  events.forEach((event) => {
    eventDate = new Date(event.start_time);
    if (eventDate >= currentDate) {
      eventsNotPassed.push(event);
    }
  });
  return eventsNotPassed;
}

function printEvents(events) {
  events = events.data;
  events = removePassedEvents(events);
  events.forEach((event) => {
    printEvent(event);
  });
}

function printEvent(event) {
  console.log(event.name, ": ", new Date(event.start_time));
}
