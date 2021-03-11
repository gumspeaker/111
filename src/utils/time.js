class Timer {
  constructor(fn, time) {
    this.time = time;
    this.fn = fn;
    this.timer = null;
  }

  start() {
    this.timer = setTimeout(() => {
      this.fn();
    }, this.time);
  }

  // get timer() {
  //   return this.timer;
  // }

  reStart() {
    if (this.timer) {
      console.log(this.timer);
      clearTimeout(this.timer);
      this.start();
    }
  }

  stop() {
    clearTimeout(this.timer);
  }
}
export default Timer;
