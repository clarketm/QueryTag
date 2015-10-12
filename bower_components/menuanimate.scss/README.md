# MenuAnimate
Enhance your website with **six** stylish transformicons using SCSS and CSS.

### Getting Started

First, initialize your variable settings in the `variables.scss` file.

```sass
$duration: .5s;         // animation duration 
$toggled-size : .75;    // size adjustment factor
$content-bg : #c9302c;  // icon color
```
Next, transpile the `menu-animate.scss` to generate your css file.

Lastly, add the generated `menu-animate.css` file to the `<head>` of your html document.

#### Install with Bower
```shell
$ bower install menuanimate.scss
```

### Usage
Add the following html to your webpage where you would like your icon to appear.

```html
<button class="navicon"></button>
```

Then, add one of the **five** modification classes below to set your icon type. Each icon starts as a three-bars icon and transforms to the icon type of it's respective modification class. 

|   Class  |    Icon     |
| :------: |   :------:  |
| _none_ * |    line     |
|   `.x`   |      x      |
| `.plus`  |     plus    |
| `.larr`  | left arrow  |
| `.rarr`  | right arrow |
| `.uarr`  |   up arrow  |

*&nbsp;_default_ icon &mdash; when no additional modification class is added.

### Live Demo 
A live, interactive demo can be found here:
##### [www.clarketravis.com](http://www.clarketravis.com/tableexport/#transformicons)


