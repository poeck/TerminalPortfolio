const notification = document.getElementById("notification");

function continueClick() {
  console.log("test");
  notification.style.display = "none";
}

if (isMobile()) {
  notification.style.display = "flex";
}

function isMobile() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}
