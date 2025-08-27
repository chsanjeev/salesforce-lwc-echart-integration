import { LightningElement } from "lwc";
import { loadScript } from 'lightning/platformResourceLoader';
import { loadStyle } from 'lightning/platformResourceLoader';
import ECHARTS from "@salesforce/resourceUrl/echarts";
import BOOTSTRAPCSS from "@salesforce/resourceUrl/bootstrapcss";
import TAILWIND from "@salesforce/resourceUrl/tailwind";

export default class HelloWorld extends LightningElement {
  initializeEcharts = false; //Variable to load check if echarts is initialize
  //renderedCallback Use it to perform logic after a component has finished the rendering phase
  renderedCallback() {
    if (this.initializeEcharts) {
      return;
    }

    this.initializeEcharts = true;
    //loadscript loads our echartjs which we add in our resource folder-
    //and return a promise when loaded, once the script is loaded we initialize our echart variable to true
    //and runEcharts function which will load our echarts to the frontend
    Promise.all([
      loadStyle(this, BOOTSTRAPCSS)
    ])
      .then(() => {
        console.log('Custom styles loaded successfully!');
      })
      .catch(error => {
        console.error('Error loading custom styles:', error);
      });

    Promise.all([loadScript(this, ECHARTS)]).then(() => {
      console.log('Echarts loaded successfully');
      this.runEcharts();
    })
    .catch(error => {
        console.error('Error loading scripts:', error);
      });
  }
  runEcharts() {
    var myChart = echarts.init(this.template.querySelector('div.main')); //to select the div to embed the chart

    var option;

var series = [
  {
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar',
    stack: 'a',
    name: 'a'
  },
  {
    data: [10, 46, 64, '-', 0, '-', 0],
    type: 'bar',
    stack: 'a',
    name: 'b'
  },
  {
    data: [30, '-', 0, 20, 10, '-', 0],
    type: 'bar',
    stack: 'a',
    name: 'c'
  },
  {
    data: [30, '-', 0, 20, 10, '-', 0],
    type: 'bar',
    stack: 'b',
    name: 'd'
  },
  {
    data: [10, 20, 150, 0, '-', 50, 10],
    type: 'bar',
    stack: 'b',
    name: 'e'
  }
];
const stackInfo = {};
for (let i = 0; i < series[0].data.length; ++i) {
  for (let j = 0; j < series.length; ++j) {
    const stackName = series[j].stack;
    if (!stackName) {
      continue;
    }
    if (!stackInfo[stackName]) {
      stackInfo[stackName] = {
        stackStart: [],
        stackEnd: []
      };
    }
    const info = stackInfo[stackName];
    const data = series[j].data[i];
    if (data && data !== '-') {
      if (info.stackStart[i] == null) {
        info.stackStart[i] = j;
      }
      info.stackEnd[i] = j;
    }
  }
}
for (let i = 0; i < series.length; ++i) {
  const data = series[i].data;
  const info = stackInfo[series[i].stack];
  for (let j = 0; j < series[i].data.length; ++j) {
    // const isStart = info.stackStart[j] === i;
    const isEnd = info.stackEnd[j] === i;
    const topBorder = isEnd ? 20 : 0;
    const bottomBorder = 0;
    data[j] = {
      value: data[j],
      itemStyle: {
        borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
      }
    };
  }
}
option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: series
};

option && myChart.setOption(option);
  }
}