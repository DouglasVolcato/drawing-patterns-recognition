class SketchPad {
  constructor(container, onUpdate = null, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
        background-color: white;
        box-shadow: 0px 0px 10px 2px black;
    `;

    container.appendChild(this.canvas);

    const lineBreak = document.createElement("br");
    container.appendChild(lineBreak);

    this.undoButton = document.createElement("button");
    this.undoButton.innerHTML = "UNDO";
    container.appendChild(this.undoButton);

    this.context = this.canvas.getContext("2d");

    this.onUpdate = onUpdate;

    this.reset();

    this.#addEventListeners();
  }

  reset() {
    this.paths = [];
    this.isDrawing = false;
    this.#redraw();
  }

  #addEventListeners() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(evt);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#redraw();
      }
    };

    document.onmouseup = () => {
      this.isDrawing = false;
    };

    this.canvas.ontouchstart = (evt) => {
      const location = evt.touches[0];
      this.canvas.onmousedown(location);
    };

    this.canvas.ontouchmove = (evt) => {
      const location = evt.touches[0];
      this.canvas.onmousedown(location);
    };

    document.ontouchend = (evt) => {
      const location = evt.touches[0];
      this.canvas.onmousedown(location);
    };

    this.undoButton.onclick = () => {
      this.paths.pop();
      this.#redraw();
    };
  }

  #redraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.context, this.paths);

    if (this.paths.length > 0) {
      this.undoButton.disabled = false;
    } else {
      this.undoButton.disabled = true;
    }

    if (this.onUpdate) {
      this.onUpdate(this.paths);
    }
  }

  #getMouse(evt) {
    const rectangle = this.canvas.getBoundingClientRect();

    return [
      Math.round(evt.clientX - rectangle.left),
      Math.round(evt.clientY - rectangle.top),
    ];
  }
}
