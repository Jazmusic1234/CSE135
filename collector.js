export let timer, seconds = 0;
export let staticInfo = {};
export let performance = {};
export let activity = {};

window.addEventListener("load", function(event) {
  staticInfo.userAgent = this.navigator.userAgent;
  staticInfo.language = this.navigator.language;
  staticInfo.cookies = this.navigator.cookieEnabled;
  staticInfo.allowsJS = true;

  if(this.document.getElementsByTagName('img')[0].parent.tagName == 'noscript') {
    staticInfo.allowsImgs = false;
  } else {
    staticInfo.allowsImgs = true;
  }

  if(this.document.getElementsByTagName('link')[0].parent.tagName == 'noscript') {
    staticInfo.allowsCSS = false;
  } else {
    staticInfo.allowsCSS = true;
  }
  
  staticInfo.screenWidth = this.screen.width;
  staticInfo.screenHeight = this.screen.height;
  staticInfo.windowWidth = window.innerWidth;
  staticInfo.windowHeight = window.innerHeight;
  staticInfo.networkConnection = this.navigator.connection.effectiveType;

  performance.timingObj = this.performance.timing;
  performance.startLoad = this.performance.timing.domContentLoadedEventStart;
  performance.endLoad = this.performance.timing.domContentLoadedEventEnd;
  performance.totalLoadTime = performance.endLoad - performance.startLoad;

  print("Static: ");
  print(staticInfo);

  fetch('chenjc.site/api/static', {
    method: 'POST',
    body: JSON.stringify(staticInfo)
  });

  print("Performance: ");
  print(performance);

  fetch('chenjc.site/api/performance', {
    method: 'POST',
    body: JSON.stringify(performance)
  });
});

document.addEventListener('mousemove', (e) => {
  activity.mousemove = true;
  activity.cursorX = e.clientX;
  activity.cursorY = e.clientY;
  resetTimer();
});

document.addEventListener('click', (e) => {
  activity.click = true;
  activity.clickButton = e.button;
  resetTimer();
});
  
document.addEventListener('scroll', (e) => {
  activity.scrolling = true;
  activity.scrollX = window.pageXOffset;
  activity.scrollY = window.pageYOffset;
  resetTimer();
});

document.addEventListener('keyup', function(e) {
  activity.keyUp = true;
  resetTimer();
});
  
document.addEventListener('keydown', function(e) {
  activity.keyDown = true;
  resetTimer();
});

function startIdleTimer() {
  seconds++;
}

function resetTimer() {
  if(seconds > 2) {
    activity.idleTime = seconds*1000;
    let currentDate = new Date();
    activity.breakEnd = currentDate.toLocaleString();
    sendActivity();
  }
  clearInterval(timer);
  seconds = 0;
  timer = setInterval(startIdleTimer, 1000);
  
}

document.addEventListener('visibilitychange', event => {
  if(document.visibilityState == "visible") {
    activity.userEnter = true;
    activity.page = window.document.location.href;
  } else {
    activity.userExit = true;
  }
});

function sendActivity() {
  print("Activity: ");
  print(activity);
  fetch('chenjc.site/api/activity', {
    method: 'POST',
    headers: {
      'set-cookie': true
    },
    body: JSON.stringify(activity)
  });
}

setTimeout(sendActivity(), 2000);
