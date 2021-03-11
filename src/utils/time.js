class Timer {
  constructor(fn, time) {
    this.time = time;
    this.fn = fn;
    this.timer = null;
    this.reStart = this.reStart.bind(this);
    this.stop = this.stop.bind(this);
  }

  start() {
    this.timer = setTimeout(() => {
      this.fn.apply(this);
    }, this.time);
  }

  reStart() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.start();
    }
  }

  stop() {
    clearTimeout(this.timer);
  }
}
export default Timer;
