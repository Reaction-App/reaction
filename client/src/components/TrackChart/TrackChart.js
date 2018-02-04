import React, { Component } from 'react';
const ReactHighcharts = require('react-highcharts');

class Chart extends Component {

  render() {

    let {chartData} = this.props
    let data = [{colorByPoint: true, data: chartData}]

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
        min: 0,
        max: 1,
        // plotBands: [{ 
        //     color: '#b3d1ff',
        //     from: 0,
        //     to: .5
        // }],
      },
      yAxis: {
        title: {
          text: 'Energy'
        },
        min: 0,
        max: 1,
        // plotBands: [{ 
        //     color: '#ffb3b3',
        //     from: 0,
        //     to: .5
        // }],
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