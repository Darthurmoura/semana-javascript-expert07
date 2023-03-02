import { prepareRunChecker } from "../../../../lib/shared/util.js";

const { shouldRun: scrollShouldRun } = prepareRunChecker({ timerDelay: 200 });

export default class HandGestureController {
  #view;
  #videoView;
  #service;
  #camera;
  #lastDirection = {
    direction: '',
    y: 0,
  };
  constructor({ view, videoView, service, camera }) {
    this.#view = view;
    this.#videoView = videoView;
    this.#service = service;
    this.#camera = camera;
  }
  async init() {
    return this.#loop();
  }

  #scrollPage(direction) {
    const pixelsPerScroll = 100;
    if(this.#lastDirection.direction === direction) {
      this.#lastDirection.y = (
        direction === 'scroll-down' ?
          this.#lastDirection.y + pixelsPerScroll :
          this.#lastDirection.y - pixelsPerScroll
      )
    } else {
      this.#lastDirection.direction = direction;
    }

    this.#view.scrollPage(this.#lastDirection.y);
  }

  #togglePlayPause(action) {
    this.#videoView.togglePlayVideo(action);
  }

  async #estimateHands() {
    try {
      const hands = await this.#service.estimateHands(this.#camera.video);
      for await (const { event, x, y } of this.#service.detectGestures(hands)) {
        if (event.includes('scroll')) {
          if (!scrollShouldRun()) continue;
          this.#scrollPage(event);
        }
        if (event.includes('video')) {
          this.#togglePlayPause(event);
        }
        if (event === 'rock-horns') {
          window.alert('ROCK ON!');
        }
      }
    } catch (error) {
      console.log('Deu ruim aqui hein', error);
    }
  }

  async #loop() {
    await this.#service.initializeDetector();
    await this.#estimateHands();
    this.#view.loop(this.#loop.bind(this));
  }

  static async initialize(deps) {
    const controller = new HandGestureController(deps);
    return controller.init();
  }
}