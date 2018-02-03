import React, { Component } from 'react';
const ReactHighcharts = require('react-highcharts');

class TrackChart extends Component {
  render() {
    const {chartData} = this.props;

    const config = {
      chart: {
        width: 1000,
        height: 500,
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: 'Your Playlist'
      },
      xAxis: {
        title: {
          enabled: true,
          text: 'Positivity'
        },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
      },
      yAxis: {
        title: {
          text: 'Energy'
        }
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
            useHTML: true,
            pointFormat: 'Positivity: {point.x}, Energy: {point.y}'
          }
        }
      },
      series: [{
        showInLegend: false,
        colorByPoint: true,
        name: 'American Pie',
        data: [.3, .5]
        }, {
        showInLegend: false,
        colorByPoint: true,
        name: 'Roar',
        data: [.9, .8]
        }]
    };

    return <ReactHighcharts config={config} neverReflow />
  }
}

export default TrackChart;