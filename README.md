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

### HTML

### JSON

### CSS

QueryTag.js was designed to blend aesthetically with the [Bootstrap](http://getbootstrap.com/getting-started/#download) CSS framework and comes packaged with a default theme that looks great on **both** Bootstrap and *non*-Bootstrap websites.

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

### Settings

Below are the default settings to support the functionality of the plugin.

```js
/* default jQuery selectors for plugin-related elements */
$.fn.queryTag.selectors = {
        $searchForm: ".searchable",                             // (jQuery selector) search form containing search input
        $menuGroup: ".collapsible",                             // (jQuery selector) container to wrap around elements which are toggled by the ".navicon"
        $buttonGroup: ".sortable",                              // (jQuery selector) button group for sort buttons
        $selectGroup: ".filterable",                            // (jQuery selector) select control for the list of views
        $navIcon: ".navicon",                                   // (jQuery selector) menu button used to toggle ".collapsible" containers
        $alertInfo: "#alert-results",                           // (jQuery selector) alert for results count
        $alertEmpty: "#alert-empty",                            // (jQuery selector) alert for no results message
        $alertError: "#alert-error"                             // (jQuery selector) alert for ajax error
    };

/* default styles for plugin-related elements */
    $.fn.queryTag.styles = {
        category: "general",                                    // (String) default category
        button: "button-default",                               // (String) default button style
        color: "label-default",                                 // (String) default tag style
        reload: "img"                                           // (String) reload image null, "img", "fontawesome", ""
    };

/* relative font sizes for the popularity of keywords(queries) */
$.fn.queryTag.sizes = ["1.5em", "1.375em", "1.25em", "1.125em", "1em", "0.9375em", "0.875em"];

/* path to the JSON category file */
$.fn.queryTag.pathToJSON = "dist/data/categories.json";

/* data to be sent to the server with categories.json request */
$.fn.queryTag.data = null;

/* alert text to display when there are no results for the selected view */
$.fn.queryTag.emptyText = "Sorry, no results found for your search.";

/* alert text to display for ajax errors */
$.fn.queryTag.errorText = "Sorry! We are unable to retrieve the search queries at this time.";

/* reload button to display for ajax errors */
$.fn.queryTag.reloadStyle = {
    img: {
        src: "dist/img/refresh.png",
        element: function () {
            return "refresh";
        }
    },
    fontawesome: {
        size: "fa-2x",
        element: function () {
            return "";
        }
    }
};
```

### Browser Support

|  | Chrome | Firefox | IE *  | Opera | Safari |
| :------: | :------: | :-------: | :---: | :-----: | :------: |
| __Android__ * |    &#10003;   |    &#10003;    | &#10003; |   &#10003;   |  &#10003;   |
| __iOS__ * |    &#10003;   |  &#10003;    | &#10003; |   &#10003;   |   &#10003;    |
| **Mac OSX**|    &#10003;   |    &#10003;    | &#10003; |   &#10003;  |   &#10003;    |
| **Windows** |    &#10003;   |    &#10003;    | &#10003; |   &#10003;   |   &#10003;    |

*requires third-party dependencies

### Live Demo 
A live, interactive demo can be found here:
##### [www.clarketravis.com](http://www.clarketravis.com/querytag/#live-demo)

### License
[QueryTag.js](http://www.clarketravis.com/querytag) is licensed under the terms of the [MIT](http://opensource.org/licenses/mit-license.php) License

### Credits

* [John Resig](https://github.com/jeresig) - jQuery
* [Metafizzy](https://github.com/metafizzy/isotope) - Isotope
