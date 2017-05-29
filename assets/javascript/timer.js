var intervalId;

var clockRunning = false;

var stopwatch = {
  time: 0,
  reset: function() {
    stopwatch.time = 0;
    clockRunning=false;
    $("#display").text("00:00");
  },

  start: function() {
      if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            //console.log(intervalId+ " start;");
            clockRunning=true;
      }
  },
  stop: function() {
//    console.log(intervalId + " stop;");
    clearInterval(intervalId);
    //this.reset();
  },

  count: function() {
    stopwatch.time--;
    //console.log(stopwatch.time);
    var currTime = stopwatch.timeConverter(stopwatch.time)
    $("#display").text(currTime);
  },

  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    return stopwatch.formatNumber(minutes) + ":" + stopwatch.formatNumber(seconds);
  },

  init: function(seconds) {
    stopwatch.time = seconds;
    clockRunning=false;
    $("#display").text(stopwatch.timeConverter(seconds));
  },

  formatNumber: function(num) {
    return (num<10) ? ("0"+num) : num;
  }
};
