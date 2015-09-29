<!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <title>Demo 5: Events</title>    <link rel="stylesheet" href="dist/css/querytag.css">    <link rel="stylesheet" href="dist/css/querytag-theme.css">    <link rel="stylesheet" href="MenuAnimate/scss/menu-animate.css"></head><style>    body {        position: relative;        font-family: "Helvetica Neue", sans-serif;    }    #description {        font-size: 0.9em;        width: 25%;        position: absolute;    }    #description > div > span {        color: red;    }    main {        position: relative;        width: 40%;        margin: 30px auto 0;    }    h2 {        color: #c9302c;        padding: 10px 0;    }    section {        padding-bottom: 25px;    }    section:after {        content: "";        display: block;        clear: both;    }    #alert-results {        float: right;        margin-right: 10%;    }    #alert-results {        font-size: 0.9em;    }    #alert-empty, #alert-error, .sortable, .searchable {        margin: 10px 0;    }    .filterable {        margin-bottom: 10px;    }</style><body><section id="description">    <p><i>Click</i> around and see what events fire!</p>    <hr>    <p>There are <b>six</b> custom events:</p>    <ul>        <li>shown</li>        <li>hidden</li>        <li>sort</li>        <li>unsort</li>        <li>filter</li>        <li>search</li>    </ul>    <div id="event"><b>Event:</b> <span></span></div></section><main>    <h2><u>Demo 5</u> : <small>Events</small></h2>    <form class="searchable">        <label><b>Search: </b><input id="search" type="search" name="q" value="" placeholder="search"></label>    </form>    <button class="navicon x"></button>    <section>        <div class="collapsible">            <div id="alert-results"></div>            <div class="filterable">                <label><b>View by:</b></label>                <select>                    <option>Overall</option>                    <option>Year</option>                    <option>Month</option>                    <option>Week</option>                    <option>Day</option>                </select>            </div>            <div class="sortable">                <label><b>Sort by:</b></label>                <button data-sort-value="name">Name</button>                <button data-sort-value="number">Popularity</button>                <button data-sort-value="category">Category</button>            </div>        </div>    </section>    <div id="alert-no-results"></div>    <div id="alert-error"></div>    <div id="grid"></div></main><script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script><script type="text/javascript" src="bower_components/isotope/dist/isotope.pkgd.min.js"></script><script type="text/javascript" src="bower_components/isotope-packery/packery-mode.pkgd.min.js"></script><script type="text/javascript" src="dist/js/querytags.min.js"></script><script type="text/javascript" src="assets/js/main.min.js"></script></body></html>