class Timer {
  // constructor
  constructor(durationInput, startButton, pauseButton, callBacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    // if the callBacks arg exists
    if (callBacks) {
      this.onStart = callBacks.onStart;
      this.onTick = callBacks.onTick;
      this.onComplete = callBacks.onComplete;
    }

    // event listener for the start button
    startButton.addEventListener("click", this.start);

    // event listener for the pause button
    pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }

    // to tick once
    this.tick();

    // to tick once every 1 second
    // interval is the id following timer
    this.interval = setInterval(this.tick, 20);
  };

  // pause method
  pause = () => {
    clearInterval(this.interval);
  };

  // tick method
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;

      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  // get time remaining
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  // set the time remaining
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
