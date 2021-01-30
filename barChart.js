
let numCharts = 0;

function createBarChart(data, element, options = {}) {


  numCharts++;
  let el = element;
  let numBars = data.length;
  let labels = [];
  let values = [];
  let max = 0;
  for (let i = 0; i < data.length; i++) {
    labels.push(data[i][0]);
    values.push(data[i][1]);
    max < data[i][1] ? max = data[i][1] : null;
  }
  const opt = initOptions(options, numBars, max);


  if (!(el instanceof jQuery) && !isDOM(el)) {
    console.log('Please use a valid DOM or jQuery element when you use createBarChart()');
  } else if (isDOM(el)) {
    el = $(el);
  }

  el.attr('id', 'chart-' + numCharts + '-container');
  el.addClass('chart-container');
  $('#chart-' + numCharts + '-container').css({
    width: opt.width,
    height: opt.height
  });
  el.append('<div class="chart-ticks" id="chart-' + numCharts + '-ticks"></div>');
  let ticksEl = $('#chart-' + numCharts + '-ticks');
  ticksEl.css({
    color: opt.borderColor,
    width: Math.floor(opt.width / 8),
    height: Math.floor(opt.height * 5 / 6)
  });


  maxBarHeight = appendTicks(opt, ticksEl);


  el.append('<div class="chart-labels" id="chart-' + numCharts + '-labels"></div>');
  let labelsEl = $('#chart-' + numCharts + '-labels');
  labelsEl.css({
    'font-size': '0.5em',
    width: Math.floor(opt.width * 7 / 8),
    height: Math.floor(opt.height / 12),
    top: Math.floor(opt.height * 9 / 12)
  });


  appendLabels(opt, labels, labelsEl);


  el.append('<div class="chart" id="chart-' + numCharts + '"></div>');
  let chartEl = $('#chart-' + numCharts);
  chartEl.css({
    background: opt.chartBG,
    width: Math.floor(opt.width * 7 / 8),
    height: Math.floor(opt.height * 9 / 12),
    'border-left': opt.axisWidth + 'px solid ' + opt.axisColor,
    'border-bottom': opt.axisWidth + 'px solid ' + opt.axisColor
  });


  appendBars(opt, values, maxBarHeight, chartEl);





  function isDOM(input) {
    if (typeof HTMLElement === "object") {

      return input instanceof HTMLElement;
    } else {

      return input && typeof input === "object" && input !== null && input.nodeType === 1 && typeof input.nodeName === "string";
    }
  };


  function initOptions(options, numBars, max) {
    let opt = {
      width: 320,
      height: 320,
      title: 'Bar Chart',
      titleFontSize: 18,
      titleColor: 'black',
      titleBG: '#f7f7f7',
      chartBG: '#fff',
      barColors: ['grey'],
      valColors: ['black'],
      labelColors: ['black'],
      valPos: 'center',
      axisColor: 'black',
      axisWidth: 3,
      barSpacing: 0.6,
      ticks: 4,
      decimals: 0
    }


    for (let prop in options) {
      if (opt.hasOwnProperty(prop)) {
        opt[prop] = options[prop];
      }
    }


    opt.tickIncrement = Math.ceil(max / 10) * 10 / opt.ticks;


    opt.barWidth = Math.floor(opt.width * 7 / 8 / numBars * opt.barSpacing);

    return opt;
  };




  function appendTicks(options, ticksEl) {
    let tickVal = 0;

    let tickHeight = (ticksEl.height() - Math.floor(options.height / 12)) / (options.ticks + 1);


    let bottom = Math.floor(options.height / 12);

    let tickEl;


    for (let i = 0; i <= options.ticks; i++) {
      ticksEl.append('<div class="chart-tick" id="chart-' + numCharts + '-tick-' + i + '"><span>' + formatNum(tickVal, opt.decimals) + '</span> _</div>');
      tickEl = $('#chart-' + numCharts + '-tick-' + i);
      tickEl.css({
        bottom: bottom,
        'font-size': ticksEl.width() * 0.25
      })
      tickVal += options.tickIncrement;
      bottom += tickHeight;
    }


    return (bottom - Math.floor(options.height / 12) - tickHeight);
  };


  function appendLabels(opt, labels, labelsEl) {
    let space = (labelsEl.width() - opt.barWidth * labels.length) / (labels.length + 1);
    let left = space;
    let labelEl;


    for (let i = 1; i <= labels.length; i++) {

      labelsEl.append('<div class="chart-label" id="chart-' + numCharts + '-label-' + i + '"><div>' + labels[i - 1] + '</div>');
      labelEl = $('#chart-' + numCharts + '-label-' + i);


      if (!opt.labelColors[i - 1]) {
        labelColor = opt.labelColors[0];
      } else {
        labelColor = opt.labelColors[i - 1];
      }


      labelEl.css({
        width: opt.barWidth,
        left: left,
        color: labelColor,
        'font-size': opt.barWidth * 0.2
      });


      left += space + opt.barWidth;
    }
  };


  function appendBars(opt, values, maxBarHeight, chartEl) {


    let space = (chartEl.width() - opt.barWidth * values.length) / (values.length + 1);


    let left = space;
    let barEl;
    let barHeight;
    let barColor;
    let max = 0;


    for (let i = 0; i < values.length; i++) {
      max < values[i] ? max = values[i] : null;
    }

    for (let i = 1; i <= values.length; i++) {
      chartEl.append('<div class="chart-bar" id="chart-' + numCharts + '-bar-' + i + '"></div>');
      barEl = $('#chart-' + numCharts + '-bar-' + i);


      barHeight = values[i - 1] / (Math.ceil(max / 10) * 10) * maxBarHeight;


      if (!opt.barColors[i - 1]) {
        barColor = opt.barColors[0];
      } else {
        barColor = opt.barColors[i - 1];
      }


      barEl.css({
        width: opt.barWidth,
        left: left,
        background: barColor,
        'font-size': opt.barWidth * 0.25
      });


      barEl.animate({ height: barHeight }, 0);
      left += space + opt.barWidth;
      appendBarValue(opt, barEl, values[i - 1], i);

    }
  };



  function appendBarValue(opt, barEl, value, i) {


    barEl.append('<div id="chart-' + numCharts + '-bar-val-' + i + '">' + formatNum(value, opt.decimals) + '</div>');


    valEl = $('#chart-' + numCharts + '-bar-val-' + i);


    if (opt.valPos === 'bottom') {
      valEl.css({
        'align-self': 'flex-end'
      });
    } else if (opt.valPos === 'top') {
      valEl.css({
        'align-self': 'flex-start'
      });
    } else {
      valEl.css({
        'align-self': 'center'
      });
    }


    if (!opt.valColors[i - 1]) {
      valEl.css({
        color: opt.valColors[0]
      });
    } else {
      valEl.css({
        color: opt.valColors[i - 1]
      });
    }
  };


  function formatNum(num, decimals) {
    if (num >= 100000000000000) {
      return (num / 1000000000000).toPrecision(3).toString() + 'T';
    } else if (num >= 1000000000000) {
      return (num / 1000000000000).toPrecision(2).toString() + 'T';
    } else if (num >= 1000000000) {
      return (num / 1000000000).toPrecision(3).toString() + 'B';
    } else if (num >= 1000000000) {
      return (num / 1000000000).toPrecision(2).toString() + 'B';
    } else if (num >= 100000000) {
      return (num / 1000000).toPrecision(3).toString() + 'M';
    } else if (num >= 1000000) {
      return (num / 1000000).toPrecision(2).toString() + 'M';
    } else if (num >= 10000) {
      return (num / 1000).toPrecision(3).toString() + 'K';
    } else if (num >= 1000) {
      return (num / 1000).toPrecision(2).toString() + 'K';
    } else {
      return num.toFixed(decimals);
    }
  };

};