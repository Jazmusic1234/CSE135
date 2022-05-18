export let timer, seconds = 0;
export let static_perform = {};
export let activity = {};

window.addEventListener("load", function(event) {
  static_perform.userAgent = this.navigator.userAgent;
  static_perform.language = this.navigator.language;
  static_perform.cookies = this.navigator.cookieEnabled;
  static_perform.allowsJS = true;

  if(this.document.getElementsByTagName('img')[0].parent.tagName == 'noscript') {
    static_perform.allowsImgs = false;
  } else {
    static_perform.allowsImgs = true;
  }

  if(this.document.getElementsByTagName('link')[0].parent.tagName == 'noscript') {
    static_perform.allowsCSS = false;
  } else {
    static_perform.allowsCSS = true;
  }
  
  static_perform.screenWidth = this.screen.width;
  static_perform.screenHeight = this.screen.height;
  static_perform.windowWidth = window.innerWidth;
  static_perform.windowHeight = window.innerHeight;
  static_perform.networkConnection = this.navigator.connection.effectiveType;

  static_perform.timingObj = this.performance.timing;
  static_perform.startLoad = this.performance.timing.domContentLoadedEventStart;
  static_perform.endLoad = this.performance.timing.domContentLoadedEventEnd;
  static_perform.totalLoadTime = static_perform.endLoad - static_perform.startLoad;


  fetch('chenjc.site/api/static_perform', {
    method: 'POST',
    body: JSON.stringify(static_perform)
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
