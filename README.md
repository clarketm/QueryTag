# QueryTag
The simple, easy-to-implement jQuery plugin that allows you to add popular search queries from a Google Custom Search Engine (CSE) to your website as sortable, filterable, and stylable keyword tags.

## Getting Started

### Download and Setup

To use this plugin, include the [jQuery](http://www.jquery.com), [Isotope](http://isotope.metafizzy.co/), and Isotope [Packery-Mode](http://isotope.metafizzy.co/layout-modes/packery.html) libraries and the QueryTag.js plugin before the closing `<body>` tag of your HTML document:

```html
<script src="jquery.js"></script>
<script src="isotope.pkgd.js"></script>
<script src="packery-mode.pkgd.js"></script>
<script src="querytag.js"></script>
```

### Install with Bower

```shell
$ bower install querytag.js
```

### Dependencies

##### Required:

[jQuery](https://jquery.com) (1.2.1+)
[Isotope](http://isotope.metafizzy.co/) (2.2.2+)
[Isotope-Packery](http://isotope.metafizzy.co/layout-modes/packery.html) (1.1.3+)

##### Optional / Theming:

[Bootstrap](http://getbootstrap.com/getting-started/#download) (3.1.0+)
[QueryTag](http://www.clarketravis.com/querytag) custom theme (included as *querytag-theme.css*)

##### Add-Ons:
Collapsible menu toggling using [MenuAnimate](https://github.com/clarketm/MenuAnimate), which includes **6** stylish navigation transformicons.


## Usage
QueryTag.js was designed to blend aesthetically with the [Bootstrap](http://getbootstrap.com/getting-started/#download) CSS framework and comes packaged with a default theme that looks great on **both** Bootstrap and *non*-Bootstrap websites.

API documentation:
##### [www.clarketravis.com](http://www.clarketravis.com/querytag)

### JavaScript

To use the export plugin, just call:

```js
$("#grid").queryTag("USERID", "CSEID");
```

Each Google Custom Search engine is identified by a unique ID created by combining a user ID `USERID` with a Custom Search engine ID `CSEID`, separated by a colon. You can find your unique search engine ID on the **Basics** tab of the [Custom Search control panel](http://cse.google.com/manage/all). It should look something like this:

```
//       USERID          CSEID
011737558837375720776:mbfrjmyam1g
```

The Google Custom Search API allows you to retrieve popular search queries for **five** distinct time intervals:

> overall, year, month, week, day

By default, QueryTag will generate option controls for **all** five views. You can define which views to render by supplying a `String[]` of `views` as the optional third parameter.

```js
/* Default: all 5 views are rendered */
$("#grid").queryTag("USER-ID", "CSE-ID", ["overall", "year", "month", "week", "day"]);
$("#grid").queryTag("USER-ID", "CSE-ID");    // same as above

/* Only the "overall" and "month" views are rendered */
$("#grid").queryTag("USER-ID", "CSE-ID", ["overall", "month"]);
```                        

### Methods

> .queryTag( USER-ID , CSE-ID [, views ] )

A detailed list of available methods and their usage can be found here:
##### [www.clarketravis.com](http://www.clarketravis.com/querytag/#methods)

### Events

A table of available events and their usage can be found here:
##### [www.clarketravis.com](http://www.clarketravis.com/querytag/#events)

Interactive [demo](http://www.clarketravis.com/querytag/demo5.php) to test the **six** custom events.


### Browser Support

|  | Chrome | Firefox | IE *  | Opera | Safari |
| :------: | :------: | :-------: | :---: | :-----: | :------: |
| __Android__ * |    &#10003;   |    &#10003;    | &#10003; |   &#10003;   |  &#10003;   |
| __iOS__ * |    &#10003;   |  &#10003;    | &#10003; |   &#10003;   |   &#10003;    |
| **Mac OSX**|    &#10003;   |    &#10003;    | &#10003; |   &#10003;  |   &#10003;    |
| **Windows** |    &#10003;   |    &#10003;    | &#10003; |   &#10003;   |   &#10003;    |

*requires third-party dependencies

### Live Demo 
Live, interactive demos:
##### [Demo 1: Unstyled](http://www.clarketravis.com/querytag/demo1.html)
##### [Demo 2: Styled](http://www.clarketravis.com/querytag/demo2.html)
##### [Demo 3: Menu](http://www.clarketravis.com/querytag/demo3.html)
##### [Demo 4: Search](http://www.clarketravis.com/querytag/demo4.php)
##### [Demo 5: Events](http://www.clarketravis.com/querytag/demo5.php)

### License
[QueryTag.js](http://www.clarketravis.com/querytag) is licensed under the terms of the [MIT](http://opensource.org/licenses/mit-license.php) License

### Credits

* [John Resig](https://github.com/jeresig) - jQuery
* [Metafizzy](https://github.com/metafizzy/isotope) - Isotope
