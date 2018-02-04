import React, { Component } from 'react';
const ReactHighcharts = require('react-highcharts');

class Chart extends Component {

  render() {

    const {chartData} = this.props
    console.log(chartData);
    let data = [{data: chartData}]
    console.log(data)

    // [{
    //   name: "",
    //   x: 0.1,
    //   y: 0.2
    // }]

    const config = {
      credits: {
        enabled: false
      },
      chart: {
        width: 909,
        height: 500,
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: ''
      },
      xAxis: {
        title: {
          enabled: true,
          text: 'Positivity'
          },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
      },
      yAxis: {
        title: {
          text: 'Energy'
        },
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            allowHTML: true,
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: 'Positivity: {point.x}, Energy: {point.y}'
          }
        }
      },
      series: data
    };

    console.log(config);

    return <ReactHighcharts config={config} neverReflow />
  }
}

export default Chart;