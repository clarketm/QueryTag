/*! * QueryTag.js v1.0.2 (https://www.travismclarke.com) * Copyright 2018 Travis Clarke * Licensed under the MIT license */;(function (root, factory) {  if (typeof define === 'function' && define.amd) {    // AMD    define(function (require) {      var $;      try {$ = require('jquery');} catch (e) {}      return factory($);    });  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {    // CommonJS    var $;    try {$ = require('jquery');} catch (e) {}    module.exports = factory($);  } else {    // Browser globals    root.QueryTag = factory(root.jQuery);  }}(this, function ($) {  'use strict';  /*--- GLOBALS ---*/  var $gridIsotope;  /*-----------------------------------/   /* QUERYTAGS.JS PLUGIN   /*----------------------------------*/  $.fn.queryTag = function (userid, cseid, options) {    var settings = $.extend([], $.fn.queryTag.defaultViews, options),      selectors = $.fn.queryTag.selectors,      styles = $.fn.queryTag.styles,      url = 'https://cse.google.com/api/' + userid + '/cse/' + cseid + '/queries/js',      classList = ['overall', 'year', 'month', 'week', 'day'],      viewArray = [],      $searchForm = $(selectors.$searchForm),      $menuGroup = $(selectors.$menuGroup),      $buttonGroup = $(selectors.$buttonGroup),      $selectGroup = $(selectors.$selectGroup),      $navIcon = $(selectors.$navIcon),      $alertInfo = $(selectors.$alertInfo),      $alertEmpty = $(selectors.$alertEmpty),      $alertError = $(selectors.$alertError),      button = styles.button,      category = styles.category,      color = styles.color,      reload;    switch (styles.reload) {      case 'img':        reload = $.fn.queryTag.reloadStyle.img.element();        break;      case 'fontawesome':        reload = $.fn.queryTag.reloadStyle.fontawesome.element();        break;      case null:      case false:      case undefined:      case '':        reload = '';        break;      default:        reload = styles.reload;        break;    }    $alertEmpty.html(function (i, val) {      return $.fn.queryTag.emptyText + val;    });    $alertError.html(function (i, val) {      return $.fn.queryTag.errorText + reload + val;    });    return this.each(function () {      var $el = $(this);      $el.hide();      getCategories();      function getCategories () {        $.ajax({          dataType: 'json',          url: $.fn.queryTag.pathToJSON,          data: $.fn.queryTag.data,          success: function (data) {            getQueries(new PopularQueryRenderer($el, data, category, color));          },          error: function (jqXHR, textStatus, errorThrown) {            console.group('There was a %s loading your category data', textStatus);            console.error('Error: ', errorThrown);            console.groupEnd();            reload();          }        });      }      function getQueries (queryRenderer) {        queryRenderer.empty();        /* empty container */        var views = {          overall: $.ajax({            /* overall view */            url: url,            jsonp: 'callback',            dataType: 'jsonp',            data: {view: classList[0]},            success: function (response) {              queryRenderer.render(classList[0], response);            }          }),          year: $.ajax({            /* year view */            url: url,            jsonp: 'callback',            dataType: 'jsonp',            data: {view: 'one_' + classList[1]},            success: function (response) {              queryRenderer.render(classList[1], response);            }          }),          month: $.ajax({            /* month view */            url: url,            jsonp: 'callback',            dataType: 'jsonp',            data: {view: classList[2]},            success: function (response) {              queryRenderer.render(classList[2], response);            }          }),          week: $.ajax({            /* week view */            url: url,            jsonp: 'callback',            dataType: 'jsonp',            data: {view: classList[3]},            success: function (response) {              queryRenderer.render(classList[3], response);            }          }),          day: $.ajax({            /* day view */            url: url,            jsonp: 'callback',            dataType: 'jsonp',            data: {view: classList[4]},            success: function (response) {              queryRenderer.render(classList[4], response);            }          })        };        settings.forEach(          function (key) {            viewArray.push(views[key]);          }        );        $.when.apply($, viewArray)          .then(            function () {              $el.show();              initTags();            },            function (jqXHR, textStatus, errorThrown) {              console.group('There was a %s fetching your query data from Google', textStatus);              console.error('Error: ', errorThrown);              console.groupEnd();              reload(queryRenderer);            });      }      function initTags () {        var $label = $('.label');        $label.each(function () {          var size = $(this).attr('data-number');          $(this).css('font-size', $.fn.queryTag.sizes[size]);        });        initIsotope();      }      function initIsotope () {        $gridIsotope = $el.isotope({          itemSelector: '.label',          filter: '.overall',          layoutMode: 'packery',          getSortData: {            name: '.name',            number: '[data-number]',            category: '[data-category]'          },          vertical: {            horizontalAlignment: 0          }        });        initViewFilter();        initGridSearch();        initTagCountUpdate();        initSorting();        initMenu();        reset();      }      function initViewFilter () {        $selectGroup.on('change', 'select', function () {          var $this = $(this);          var $view = '.' + $this.val().toLowerCase();          $buttonGroup.children('button').removeClass('active');          filter('packery', 'original-order', $view, $this);        });      }      function initGridSearch () {        $el.on('click', '.label', function (e) {          e.preventDefault();          var $this = $(this),            searchQuery = $this.find('.name').text(),            $searchInput = $searchForm.find('#search').length ? $searchForm.find('#search') : $searchForm.find('input[type=\'search\']').first();          var tagEvent = $.Event('query.qt');          tagEvent.tag = searchQuery;          tagEvent.input = $searchInput;          tagEvent.form = $searchForm;          $this.trigger(tagEvent);        });      }      function initTagCountUpdate () {        $gridIsotope.on('layoutComplete', function (event, laidOutItems) {          var visibleItems = laidOutItems.length,            resultText;          $alertInfo.removeClass('alert-success');          $alertInfo.removeClass('alert-warning');          if (visibleItems === 0) {            $buttonGroup.children('button').prop('disabled', true);            $alertInfo.addClass('alert-warning').html('0 results found');            $alertEmpty.slideDown(250);          } else {            $buttonGroup.children('button').prop('disabled', false);            resultText = (visibleItems === 1) ? 'result' : 'results';            $alertInfo.addClass('alert-success').html(visibleItems + ' ' + resultText + ' found');          }        });        $alertInfo.css('display', 'inline-block');      }      function initSorting () {        var sortArray = [];        $buttonGroup.children('button').addClass(button);        $buttonGroup.on('click', 'button', function (e) {          var $this = $(this),            sortValue = $this.attr('data-sort-value');          if (e.ctrlKey || e.metaKey) { /* ctrl-cmd key detection */            $this.toggleClass('active');          } else {            $this.toggleClass('active');            $buttonGroup.children('button').not($this).removeClass('active');            sortArray = [];          }          var $buttonsActive = $buttonGroup.children('.active'),            layoutMode = $buttonsActive.length ? 'vertical' : 'packery';          if ($this.is('.active')) { /* active detection */            sortArray.push(sortValue);          } else {            sortArray.splice(sortArray.indexOf(sortValue), 1);          }          if (sortArray.length === 0) {            sortArray.push('original-order');          }          sort(layoutMode, sortArray, $this);        });      }      function initMenu () {        $navIcon.append('<div class="icon"></div>');        $navIcon.click(function () {          var $this = $(this);          var active = $buttonGroup.children('button').is('.active');          $this.toggleClass('open');          $buttonGroup.children('button').removeClass('active');          sort('packery', ['original-order'], $this, active);          $menuGroup.slideToggle(350, function () {            $this.is('.open') ? $this.trigger('shown.qt') : $this.trigger('hidden.qt');          });        });      }      function reload (renderer) {        $alertError.slideDown();        $('#refresh').on('click', function () {          $alertError.fadeOut(1400);          $(this).children().rotate(720, {            duration: 1400,            easing: 'swing',            complete: function () {              renderer ? getQueries(renderer) : getCategories();            }          });        });      }      /** reset isotope **/      function reset () {        $gridIsotope.isotope();      }      /** re-sort isotope based on selection **/      function sort (layoutMode, sortArray, $this, active) {        $gridIsotope.isotope({layoutMode: layoutMode, sortBy: sortArray});        if ($this.is('.navicon')) {          if (active) {            $this.trigger('unsort.qt');          }          return;        }        $.inArray('original-order', sortArray) ? $this.trigger('sort.qt') : $this.trigger('unsort.qt');      }      /** reset isotope to random layout **/      function filter (layoutMode, sortArray, filterType, $this) {        $alertEmpty.hide();        $gridIsotope.isotope({layoutMode: layoutMode, sortBy: sortArray, filter: filterType});        var filterEvent = $.Event('filter.qt');        filterEvent.view = $this.val();        $this.trigger(filterEvent);      }    });  };  /* Define the plugin default properties. */  $.fn.queryTag.defaultViews =    ['overall', 'year', 'month', 'week', 'day'];  /* (String[]) query views to add to the select group */  $.fn.queryTag.selectors = {    $searchForm: '.searchable', /* (jQuery selector) search form containing search input */    $menuGroup: '.collapsible', /* (jQuery selector) search form containing search input */    $buttonGroup: '.sortable', /* (jQuery selector) button group for sort buttons */    $selectGroup: '.filterable', /* (jQuery selector) view select control */    $navIcon: '.navicon', /* (jQuery selector) menu button */    $alertInfo: '#alert-results', /* (jQuery selector) alert for results count */    $alertEmpty: '#alert-empty', /* (jQuery selector) alert for no results */    $alertError: '#alert-error'                             /* (jQuery selector) alert for ajax error */  };  $.fn.queryTag.styles = {    category: 'general', /* (String) default category */    button: 'button-default', /* (String) default button style */    color: 'label-default', /* (String) default tag style */    reload: 'img'                                           /* (String) reload image null, "img", "fontawesome", "<HTMLelement/>" */  };  /* Define the font sizes based on query popularity. */  $.fn.queryTag.sizes = ['1.5em', '1.375em', '1.25em', '1.125em', '1em', '0.9375em', '0.875em'];  /** px ** $.fn.queryTag.sizes = [24, 22, 20, 18, 16, 15, 14]; */  /* Define the path to the JSON category file. */  $.fn.queryTag.pathToJSON = 'dist/data/categories.json';  /* Data to be sent to the server with categories.json request */  $.fn.queryTag.data = null;  /* Alert text to display when there are no tag results */  $.fn.queryTag.emptyText = 'Sorry, no results found for your search.';  /* Alert text to display for ajax errors */  $.fn.queryTag.errorText = 'Sorry! We are unable to retrieve the search queries at this time.';  /* Reload button to display for ajax errors */  $.fn.queryTag.reloadStyle = {    img: {      src: 'dist/img/refresh.png',      element: function () {        return '<a id=\'refresh\' href=\'#\'><img src=' + this.src + ' alt=\'refresh\'></a>';      }    },    fontawesome: {      size: 'fa-2x',      element: function () {        return '<a id=\'refresh\' title=\'refresh\' href=\'#\'><i class=\'fa fa-refresh ' + this.size + '\'></i></a>';      }    }  };  /*-----------------------------------/   /* ROTATE.JS PLUGIN   /*----------------------------------*/  $.fn.rotate = function (angle, duration, easing, complete) {    var args = $.speed(duration, easing, complete);    var step = args.step;    return this.each(function (i, e) {      args.complete = $.proxy(args.complete, e);      args.step = function (now) {        $.style(e, 'transform', 'rotate(' + now + 'deg)');        if (step) {          return step.apply(e, arguments);        }      };      $({deg: 0}).animate({deg: angle}, args);    });  };  /*-----------------------------------/   /* POPULAR QUERY RENDERER(PQR) PLUGIN   /*----------------------------------*/  var PopularQueryRenderer = function (container, data, defCategory, defClass) {    this.container = container;    this.data = data;    this.category = defCategory;    this.color = defClass;    this.septiles = [];    for (var k = 1; k <= 7; k++) {      this.septiles.push(100 - ((100 / 7) * k));    }  };  /* PQR empty function */  PopularQueryRenderer.prototype.empty = function () {    this.container.empty();  };  /* PQR render function */  PopularQueryRenderer.prototype.render = function (view, queries) {    var numberOfQueries = queries.popularQueries.length;    for (var i = 0; i < numberOfQueries; i++) {      var $el = $('<a href="#" class="label"><span class="name"></span></a>'),        popularity = ((numberOfQueries - (i + 1) + 0.5) / numberOfQueries) * 100,        query = queries.popularQueries[i].query,        defCategory = this.category,        defColor = this.color;      $.each(this.septiles, function (index, value) {        if (popularity > value) {          popularity = index;          return false;        }      });      $.each(this.data, function (key, value) {        if (key == 'general') {          return;        }        if ((value.list.indexOf(query) !== -1)) {          defCategory = key;          defColor = value.color;          return false;        }      });      $el.addClass(defColor);      $el.addClass(view);      $el.find('.name').text(query);      $el.attr('data-number', popularity);      $el.attr('data-category', defCategory);      this.container.append($el);    }  };  var QueryTag = $.fn.queryTag;  QueryTag.QueryTag = QueryTag;  return QueryTag;}));