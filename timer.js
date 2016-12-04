
function Timer(hours){
  this.hours = hours;
  this.minutes = 0;
  this.seconds = 0;
}

Timer.prototype.countdown = function(){
  let that = this;
  setInterval(function(){
      that.seconds--;
      if (that.seconds < 0) {
        that.seconds = 59;
        that.minutes--;
      }
      if (that.minutes < 0) {
        that.minutes = 59;
        that.hours--;
      }
      that.printTime(that.hours, that.minutes, that.seconds);
    }, 1000);
}

Timer.prototype.printTime = function(hours, minutes, seconds){
  if (seconds < 10){
    seconds = "0" + seconds;
  }
  if (minutes < 10){
    minutes = "0" + minutes;
  }
  if (hours < 10){
    hours = "0" + hours;
  }
  console.log(`${hours}:${minutes}:${seconds}`);
  // document.getElementById("timer").innerHTML = `${hours}:${minutes}`;
  // document.createElement("p").innerHTML = `${hours}:${minutes}`;
}


// 
// let a = new Timer(1);
// a.countdown();


module.exports = Timer;
