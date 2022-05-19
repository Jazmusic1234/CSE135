
let timer, seconds = 0;
let idSP = 0;
let idA = 0;
let static_perform = {};
let activity = {};

window.addEventListener("load", function(event) {
  activity.id = idA++;
  activity.mousemove = 0;
  activity.cursorX = 0;
  activity.cursorY = 0;
  activity.click = 0;
  activity.clickButton = 0;
  activity.scrolling = 0;
  activity.scrollX = 0;
  activity.scrollY = 0;
  activity.keyUp = 0;
  activity.keyDown = 0;
  activity.idleTime = 0;
  activity.breakEnd = 0;
  activity.userEnter = 1;
  activity.page = "";
  activity.userExit = 0;

  static_perform.id = idSP++;
  static_perform.cookie = Math.random().toString(16).substr(2, 8);
  static_perform.userAgent = this.navigator.userAgent;
  static_perform.language = this.navigator.language;
  static_perform.cookiesEn = this.navigator.cookieEnabled;
  static_perform.allowsJS = true;

  if(this.document.getElementsByTagName('img').length > 0 && this.document.getElementsByTagName('img')[0].parent != null && this.document.getElementsByTagName('img')[0].parent.nodeName == 'noscript') {
    static_perform.allowsImgs = false;
  } else {
    static_perform.allowsImgs = true;
  }

  if(this.document.getElementsByTagName('link').length > 0 && this.document.getElementsByTagName('link')[0].parent != null && this.document.getElementsByTagName('link')[0].parent.nodeName == 'noscript') {
    static_perform.allowsCSS = false;
  } else {
    static_perform.allowsCSS = true;
  }
  
  static_perform.screenWidth = this.screen.width;
  static_perform.screenHeight = this.screen.height;
  static_perform.windowWidth = window.innerWidth;
  static_perform.windowHeight = window.innerHeight;
  static_perform.networkConnection = this.navigator.connection.effectiveType;

  // static_perform.timingObj = this.performance.timing;
  static_perform.startLoad = this.performance.timing.domContentLoadedEventStart;
  static_perform.endLoad = this.performance.timing.domContentLoadedEventEnd;
  static_perform.totalLoadTime = static_perform.endLoad - static_perform.startLoad;


  fetch('/api/static_perform/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(static_perform)
  })
  .then(response => response.json())
  .then(data => console.log(data));

  
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

document.addEventListener('visibilitychange', () => {
  if(document.visibilityState == "visible") {
    activity.userEnter = true;
    activity.page = window.document.location.href;
  } else {
    activity.userExit = true;
  }
});

function sendActivity() {
  fetch('/api/activity/posts', {
    method: 'POST',
    headers: {
      'set-cookie': true,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activity)
  })
  .then(response => response.json())
  .then(data => console.log(data));

  activity.id = idA++;
}

setInterval(sendActivity(), 2000);
