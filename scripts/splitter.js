(function () {
  var $ = function (id) {return document.getElementById(id);};
  var SPLITTER_DIM = 6;

  var Splitter = function (splitterId, el1, el2, orientation, callback) {
    this.handle = $(splitterId);
    this.proxy = $(splitterId + "-proxy");
    this.callback = callback;
    this.el1 = el1;
    this.el2 = el2;
    this.orientation = orientation;

    this.ratio = 2
    
    this.mousedownListener = this.onHandleMousedown.bind(this);
    this.mouseupListener = this.onDocMouseup.bind(this);
    this.mousemoveListener = this.onDocMousemove.bind(this);
    this.resizeListener = this.onWindowResize.bind(this);

    this.handle.addEventListener("mousedown", this.mousedownListener);
    window.addEventListener("resize", this.resizeListener);

    this.onWindowResize();
  };

  Splitter.prototype.onWindowResize = function () {
    if (this.isVertical()) {
      this.handle.style.top = (this.el1.parentNode.offsetHeight/this.ratio - (SPLITTER_DIM/2)) + "px";
    } else {
      this.handle.style.left = (this.el1.parentNode.offsetWidth/this.ratio - (SPLITTER_DIM/2)) + "px";
    }
    this.resizeContainers();
  };

  Splitter.prototype.updateRatio = function () {
    if (this.isVertical()) {
      this.ratio = this.el1.parentNode.offsetHeight / (this.handle.offsetTop + (SPLITTER_DIM/2));
    } else {
      this.ratio = this.el1.parentNode.offsetWidth / (this.handle.offsetLeft + (SPLITTER_DIM/2));
    }
  };

  Splitter.prototype.onHandleMousedown = function (evt) {
    this.updatePosFromEvent(this.proxy, evt);
    this.proxy.classList.remove("resize-proxy-hidden");

    document.addEventListener("mouseup", this.mouseupListener);
    document.addEventListener("mousemove", this.mousemoveListener);

    evt.preventDefault();
  };

  Splitter.prototype.updateSplitterHandle = function (evt) {
    this.updatePosFromEvent(this.handle, evt)
    this.proxy.classList.add("resize-proxy-hidden");

    document.removeEventListener("mouseup", this.mouseupListener);
    document.removeEventListener("mousemove", this.mousemoveListener);
  };

  Splitter.prototype.updatePosFromEvent = function (el, evt) {
    if (this.isVertical()) {
      var offset = this.handle.getBoundingClientRect().top - this.handle.offsetTop;
      el.style.top = (evt.pageY - offset - (SPLITTER_DIM/2)) + "px";
    } else {
      var offset = this.handle.getBoundingClientRect().left - this.handle.offsetLeft;
      el.style.left = (evt.pageX - offset -(SPLITTER_DIM/2)) + "px";
    }
  };

  Splitter.prototype.isVertical = function () {
    return this.orientation == "vertical";
  };

  Splitter.prototype.onDocMouseup = function (evt) {
    this.updateSplitterHandle(evt);
    this.resizeContainers();
    this.updateRatio();
    evt.preventDefault();
  };

  Splitter.prototype.resizeContainers = function (coordinate) {
    if (this.isVertical()) {
      var splitterTop = this.handle.offsetTop;
      this.el1.style.height = splitterTop + "px";
      this.el2.style.top = (splitterTop + SPLITTER_DIM + 1) + "px";
    } else {
      var splitterLeft = this.handle.offsetLeft;
      this.el1.style.width = splitterLeft + "px";
      this.el2.style.left = (splitterLeft + SPLITTER_DIM + 1) + "px";
    }
    
    this.callback();
  };

  Splitter.prototype.onDocMousemove = function (evt) {
    this.updatePosFromEvent(this.proxy, evt);
    evt.preventDefault();
  };

  window.Splitter = Splitter;
})();
