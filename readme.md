# HTML 3D Cyclic Carousel

An implementation of HTML 3D Cyclic Carousel with CSS and vanilla JavaScript. It displays multiple (at least 3) panels as a 3D cyclic carousel in a HTML document.

## Browser support

The carousel requires a browser that supports CSS 3D transforms (including `transform-style: preserve-3d`) and recommends a browser that supports CSS transitions.

The following desktop browsers were tested and support this carousel.

- Edge 13+ (Internet Explorer is not supported as it does not support `transform-style: preserve-3d`)
- Firefox 10+
- Chrome 12+
- Opera 15+

See http://caniuse.com/#feat=transforms3d for the support of more browsers.

## How to use?

### Setup

Place `cycliccarousel.css` and `cycliccarousel.js` next to your HTML document file.

Add the following to your HTML document's head:

```HTML
<link rel="stylesheet" href="cycliccarousel.css">
<script src="cycliccarousel.js"></script>
```

You can now create cyclic carousels in your HTML document.

### Writing

Use the following code as an example to structure your content for the cyclic carousel:

```HTML
<div id="my-carousel" class="cyclic-carousel">
  <div class="panels-container">
    <div class="panel">1st panel</div>
    <div class="panel">2nd panel</div>
    <div class="panel">3rd panel</div>
    <div class="panel">4th panel</div>
    <div class="panel">5th panel</div>
    <div class="panel">6th panel</div>
  </div>
</div>
<script>
  var myCarousel = new CyclicCarousel(document.getElementById('my-carousel'));
</script>
```

You can add or remove `<div class="panel">...</div>` lines to generate more or less panels in the cyclic carousel. You should have at least one panel. You can nest HTML elements or simply insert text inside each panel.

You must specify a fixed width for the panels; best done through adding a new CSS rule for `#my-carousel .panel`, for example:

```CSS
#my-carousel .panel {
  width: 100px;
}
```

Using the default options, the cyclic carousel doesn't automatically interact in anyway.

You can create buttons to scroll the panels using the `CyclicCarousel.scrollToPrevious()`, `CyclicCarousel.scrollToNext()` and `CyclicCarousel.scrollTo()` methods. For example, the following HTML creates three buttons to scroll to the previous, to the next and to the third panel:

```HTML
<a id="previous" href="#">Previous</a>
<a id="next" href="#">Next</a>
<a id="3rd" href="#">3rd</a>
<script>
  document.getElementById('previous').addEventListener('click', function (event) {
      myCarousel.scrollToPrevious();
      event.preventDefault();
  });

  document.getElementById('next').addEventListener('click', function (event) {
      myCarousel.scrollToNext();
      event.preventDefault();
  });

  document.getElementById('3rd').addEventListener('click', function (event) {
      myCarousel.scrollTo(3);
      event.preventDefault();
  });
</script>
```

### Options

When you can create a new CyclicCarousel object in JavaScript by calling `new CyclicCarousel(document.getElementById('my-carousel'));`, you can add additional features to the cyclic carousel by including options, for example:

```JavaScript
var mC = document.getElementById('my-carousel');
var myCarousel = new CyclicCarousel(mC, { startIndex: 1, arrowKeys: true, draggable: true, timeout: 2000 });
```

The cyclic carousel object would be created with the option `{ startIndex: 1, arrowKeys: true, draggable: true, timeout: 2000 }`.

Valid options are:

- `startIndex` - Accepts a number; defaults to `0`. The panel, as specified by the index, to be displayed first when the cyclic carousel is created.
- `arrowKeys` - Accepts a boolean; defaults to `false`. Whether using the arrow keys will scroll the cyclic carousel to the previous panel or the next panel.
- `draggable` - Accepts a boolean; defaults to `false`. Whether you can click and drag on the cyclic carousel to scroll the carousel.
- `timeout` - Accepts a number; defaults to `0`. The time interval, in milliseconds, to automatically scroll the carousel. The automatic scrolling **pauses when the user hovers the mouse** over the cyclic carousel.

### Properties and methods

#### Properties

Each cyclic carousel object has the following properties which are all **readonly**:

- `CyclicCarousel.element` - A `HTMLElement` object. The HTML element of the carousel.
- `CyclicCarousel.currentIndex` - A number. The index of the panel currently displayed.
- `CyclicCarousel.panelsContainer` - A `HTMLElement` object. The HTML element of the carousel's panels container.
- `CyclicCarousel.intervalID` - A number or `null`. The interval ID of the interval used to automatically scroll the carousel. `null` if there is no such interval (or the interval wasn't created with the CyclicCarousel object).
- `CyclicCarousel.panels` - A `HTMLCollection` object. The HTML elements of the panels in the carousel.
- `CyclicCarousel.panelWidth` - A number. The total width, in pixels, of the first panel in the carousel.
- `CyclicCarousel.panelRotateY` - A number. The Y rotation, in degrees, of the second panel in the carousel.
- `CyclicCarousel.panelTranslateZ` - A number. The Z translation, in pixels, of the first panel in the carousel.
- `CyclicCarousel.currentRotateY` - A number. The Y rotation, in degrees, of the carousel's panels container.

#### Methods

Each cyclic carousel object has the following methods which can manipulate the carousel:

##### `CyclicCarousel.addPanel`
`CyclicCarousel.addPanel(panel)` appends the specified panel, as a HTML element, to the end of the carousel.
`CyclicCarousel.addPanel(index, panel)` adds the specified panel, as a HTML element, at the specified position, as a number, in the carousel.

##### `CyclicCarousel.removePanel`
`CyclicCarousel.removePanel()` removes the panel at the end of the carousel.
`CyclicCarousel.removePanel(index)` removes the panel at the specified position, as a number, in the carousel.
`CyclicCarousel.removePanel(panel)` removes the specified panel, as a HTML element, from the carousel.

##### `CyclicCarousel.orientatePanelsContainer`
`CyclicCarousel.orientatePanelsContainer()` orientates and transforms the carousel's panels container.

##### `CyclicCarousel.orientate`
`CyclicCarousel.orientate()` orientates and transforms the carousel's panels and panels container.

##### `CyclicCarousel.scrollToNext`
`CyclicCarousel.scrollToNext()` scrolls the carousel to show the next panel.

##### `CyclicCarousel.scrollToPrevious`
`CyclicCarousel.scrollToPrevious()` scrolls the carousel to show the previous panel.

##### `CyclicCarousel.scrollTo`
`CyclicCarousel.scrollTo(index)` scrolls the carousel to show the panel at the specified position.

##### `CyclicCarousel.setTimeout`
`CyclicCarousel.setTimeout(timeout)` automatically scrolls the carousel at specified time intervals.

##### `CyclicCarousel.clearTimeout`
`CyclicCarousel.clearTimeout()` stops automatically scrolling the carousel.

### Tweaks

You may want to use these CSS rules to tweak the appearance of the cyclic carousel.

#### Perspective

Change the perspective (distance) from where the carousel is viewed. 

```CSS
.cyclic-carousel {
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  perspective: 1000px;
}
```

#### Scroll speed

Change the speed of scrolling the carousel.

```CSS
.cyclic-carousel > .panels-container, .cyclic-carousel > .panels-container > .panel {
    -webkit-transition: 1000ms;
    -moz-transition: 1000ms;
    -o-transition: 1000ms;
    transition: 1000ms;
}
```

#### Space above and below the carousel

Add space before and after the carousel. If you add margins to `.cyclic-carousel` instead, you would find that the panels are still hidden if they overlap the the `.panels-container` boundaries.

```CSS
.panels-container {
  margin-bottom: 16px;
  margin-top: 16px;
}
```

#### Spacing between panels

Add space in between panels.

```CSS
.panel {
  margin-left: 16px;
  margin-right: 16px;
}
```

#### Margin fix

Sometimes the first panel might not have its contents wrapped. In this case, add padding to the panels.

```CSS
.panel {
  padding: 16px;
}
```

## Warnings

- The carousel sets `text-align` of its contents to `center`. You can override this behaviour by specifying further `text-align` CSS rules.
- You must specify a **fixed** width for panels (best through adding a new CSS rule for `.panel`) before calling `new CyclicCarousel()`. You cannot use a relative width (for example, `50%`).

## Author

Harry Wong (RedAndBlueEraser)
