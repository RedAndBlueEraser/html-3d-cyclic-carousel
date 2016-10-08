/**
 * @fileoverview Operates on HTML elements to display a 3D cyclic carousel.
 * @author Harry Wong (RedAndBlueEraser)
 * @version 20161007
 */

'use strict';

/**
 * Creates a new CyclicCarousel.
 * @constructor
 * @param {HTMLElement} element The HTML element of the carousel.
 * @param {Object} [options] The options used to create the carousel.
 * @param {number} [options.startIndex=0] The index of the first panel displayed.
 * @param {boolean} [options.arrowKeys=false] Whether keyboard arrow keys can scroll the carousel.
 * @param {boolean} [options.draggable=false] Whether mouse drags can scroll the carousel.
 * @param {number} [options.timeout=0] The time interval, in milliseconds, to automatically scroll the carousel.
 */
function CyclicCarousel(element, options) {
    /**
     * The HTML element of the carousel.
     * @type {HTMLElement}
     * @public
     * @readonly
     */
    this.element = element;

    /**
     * The index of the current panel displayed.
     * @type {number}
     * @default 0
     * @public
     * @readonly
     */
    this.currentIndex = 0;
    if (options && options.startIndex) {
        this.currentIndex = options.startIndex;
    }

    /**
     * The HTML element of the panels container.
     * @type {HTMLElement}
     * @public
     * @readonly
     */
    this.panelsContainer = this.element.getElementsByClassName('panels-container')[0];

    /* Add keydown event listeners to scroll the carousel. */
    if (options && options.arrowKeys) {
        (function (cyclicCarousel) {
            var LEFT = 37, RIGHT = 39;
            document.addEventListener('keydown', function (event) {
                var key = event.which;
                if (key == LEFT) {
                    cyclicCarousel.scrollToPrevious();
                    event.preventDefault();
                } else if (key == RIGHT) {
                    cyclicCarousel.scrollToNext();
                    event.preventDefault();
                }
            });
        })(this);
    }

    /* Add mouse event listeners to scroll the carousel. */
    if (options && options.draggable) {
        (function (cyclicCarousel) {
            var eStyle = element.style;

            /* Prevent selecting text. */
            eStyle.msUserSelect = eStyle.webkitUserSelect = eStyle.MozUserSelect = eStyle.userSelect = 'none';

            /* Set cursor to 'grab' or 'grabbing'. */
            var setCursor = function (cursor) {
                eStyle.cursor = '-webkit-' + cursor;
                eStyle.cursor = '-moz-' + cursor;
                eStyle.cursor = cursor;
            };
            setCursor('grab');

            var pCStyle = cyclicCarousel.panelsContainer.style;
            /* Stop or start transitions. */
            var stopTransition = function () {
                pCStyle.webkitTransition = pCStyle.MozTransition = pCStyle.OTransition = '0s';
            }, startTransition = function () {
                pCStyle.webkitTransition = pCStyle.MozTransition = pCStyle.OTransition = null;
            };

            /* Mouse button pressed on carousel. */
            element.addEventListener('mousedown', function (event) {
                event.preventDefault();
                setCursor('grabbing');
                stopTransition();
                // TODO:.
            });

            /* Mouse moved. */
            addEventListener('mousemove', function (event) {
                // TODO:.
            });

            /* Mouse button released. */
            addEventListener('mouseup', function (event) {
                setCursor('grab');
                startTransition();
                // TODO:.
            });
        })(this);
    }

    /* Set intervals to scroll the carousel periodically. */
    if (options && options.timeout) {
        (function (cyclicCarousel) {
            var isMouseOver = false;

            setInterval(options.timeout, function () {
                if (!document.hidden && !isMouseOver) {
                    cyclicCarousel.scrollToNext();
                }
            });

            /* Mouse entered or left carousel. */
            element.addEventListener('mouseenter', function (event) { isMouseOver = true; });
            element.addEventListener('mouseleave', function (event) { isMouseOver = false; });
        })(this);
    }

    this.orientate();
}

/* Properties. */
/**
 * The HTML elements of the panels in the carousel.
 * @memberof {CyclicCarousel}
 * @type {HTMLCollection}
 * @public
 * @readonly
 */
Object.defineProperty(CyclicCarousel.prototype, 'panels',
    { get: function () { return this.panelsContainer.getElementsByClassName('panel'); } });

/**
 * The total width, in pixels, of the first panel in the carousel.
 * @memberof {CyclicCarousel}
 * @type {number}
 * @public
 * @readonly
 */
Object.defineProperty(CyclicCarousel.prototype, 'panelWidth',
    { get: function () {
            var panel = this.panels[0], panelStyle = getComputedStyle(panel);
            return panel.offsetWidth + parseFloat(panelStyle.marginLeft) +
                parseFloat(panelStyle.marginRight);
        }
    });

/**
 * The Y rotation, in degrees, of the second panel in the carousel.
 * @memberof {CyclicCarousel}
 * @type {number}
 * @public
 * @readonly
 */
Object.defineProperty(CyclicCarousel.prototype, 'panelRotateY',
    { get: function () { return 360 / this.panels.length; } });

/**
 * The Z translation, in pixels, of the first panel in the carousel.
 * @memberof {CyclicCarousel}
 * @type {number}
 * @public
 * @readonly
 */
Object.defineProperty(CyclicCarousel.prototype, 'panelTranslateZ',
    { get: function () { return this.panelWidth / 2 / Math.tan(Math.PI / this.panels.length); } });

/**
 * The Y rotation, in degrees, of the panels container.
 * @memberof {CyclicCarousel}
 * @type {number}
 * @public
 * @readonly
 */
Object.defineProperty(CyclicCarousel.prototype, 'currentRotateY',
    { get: function () { return this.currentIndex * this.panelRotateY; } });

/* Methods. */
/**
 * Appends the specified panel to the end of the carousel.
 * @param {HTMLElement} panel The panel to append.
 *
 * Inserts the specified panel at the specified position in the carousel.
 * @param {number} index The position at which the panel is to be inserted.
 * @param {HTMLElement} panel The panel to insert.
 */
CyclicCarousel.prototype.addPanel = function (panelOrIndex, panel) {
    if (panelOrIndex instanceof HTMLElement) {
        this.currentIndex += Math.floor(this.currentIndex / this.panels.length);
        this.panelsContainer.appendChild(panelOrIndex);
        this.orientate();
    } else if (typeof panelOrIndex === 'number' && panel instanceof HTMLElement) {
        this.currentIndex += Math.floor(this.currentIndex / this.panels.length);
        this.panelsContainer.insertBefore(panel, this.panels[panelOrIndex]);
        this.orientate();
    }
};

/**
 * Removes the panel at the end of the carousel.
 *
 * Removes the panel at the specified position in the carousel. Shifts any subsequent panels to the left (subtracts one from their indices).
 * @param {number} index The position of the panel to be removed.
 *
 * Removes the specified panel from the carousel.
 * @param {HTMLElement} panel The panel to remove.
 */
CyclicCarousel.prototype.removePanel = function (indexOrPanel) {
    if (typeof indexOrPanel === 'undefined') {
        this.currentIndex -= Math.floor(this.currentIndex / this.panels.length);
        this.panelsContainer.removeChild(this.panelsContainer.lastElementChild);
        this.orientate();
    } else if (typeof indexOrPanel === 'number') {
        this.currentIndex -= Math.floor(this.currentIndex / this.panels.length);
        this.panelsContainer.removeChild(this.panels[indexOrPanel]);
        this.orientate();
    } else if (indexOrPanel instanceof HTMLElement) {
        this.currentIndex -= Math.floor(this.currentIndex / this.panels.length);
        this.panelsContainer.removeChild(indexOrPanel);
        this.orientate();
    }
};

// TODO:.
CyclicCarousel.prototype.orientatePanelsContainer = function () {
    var pCStyle = this.panelsContainer.style;
    pCStyle.msTransform = pCStyle.webkitTransform = pCStyle.MozTransform = pCStyle.OTransform = pCStyle.transform =
        "translateZ(" + (-1 * this.panelTranslateZ) + "px) rotateY(" + (-1 * this.currentRotateY) + "deg)";
};

// TODO:.
CyclicCarousel.prototype.orientatePanels = function () {
    for (var i = 0; i < this.panels.length; i++) {
        var pStyle = this.panels[i].style;
        pStyle.msTransform = pStyle.webkitTransform = pStyle.MozTransform = pStyle.OTransform = pStyle.transform =
            "rotateY(" + (i * this.panelRotateY) + "deg) translateZ(" + this.panelTranslateZ + "px)";
    }
};

// TODO:.
CyclicCarousel.prototype.orientate = function () {
    this.orientatePanels();
    this.orientatePanelsContainer();
};

// TODO:.
CyclicCarousel.prototype.scrollToNext = function () {
    this.currentIndex++;
    this.orientatePanelsContainer();
};

// TODO:.
CyclicCarousel.prototype.scrollToPrevious = function () {
    this.currentIndex--;
    this.orientatePanelsContainer();
};

// TODO:.
CyclicCarousel.prototype.scrollTo = function (index) {
    this.currentIndex = index;
    this.orientatePanelsContainer();
};
