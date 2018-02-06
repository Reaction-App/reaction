import React, { Component } from 'react';
import $ from "jquery";
const ReactHighcharts = require('react-highcharts');

class Chart extends Component {

  render() {

    let {chartData} = this.props
    let data = [{colorByPoint: true, data: chartData}]
    let labelStyle = {
        left: '120px',
        top: '100px',
        width: '200px',
        'font-size': '30px',
        'text-shadow':'1px 1px 5px rgba(92,92,92,0.7)',
        'font-style':'oblique',
        color:'#C4C4C4',
        'letter-spacing': '3pt',
        'font-family':'helvetica, sans-serif'
    }

    const config = {
      credits: {
        enabled: false
      },
      chart: {
        width: 909,
        height: 500,
        type: 'scatter'
        // Option to add color filled quadrants
        // events: {
          // load: function () {

          //     //Calculate the quadrant coordinates; toPixels uses point values
          //     var x0 = this.xAxis[0].toPixels(0, false);
          //     var x1 = this.xAxis[0].toPixels(.50, false);
          //     var x2 = this.xAxis[0].toPixels(1, false);

          //     //The y axis coordinates return values from TOP LEFT origin (opposite order)
          //     var y0 = this.yAxis[0].toPixels(1, false);
          //     var y1 = this.yAxis[0].toPixels(.5, false);
          //     var y2 = this.yAxis[0].toPixels(0, false);

          //     //Draw the quadrants
          //     // Bottom left (Sad)
          //     this.renderer.rect(x0, y1, x1 - x0, y2 - y1, 1).attr({ fill: '#A4A7E5', zIndex: 0 }).add();
          //     // Top left (Angry)
          //     this.renderer.rect(x0, y0, x1 - x0, y1 - y0, 1).attr({ fill: '#F19BB4', zIndex: 0 }).add();
          //     // Top right (Happy)
          //     this.renderer.rect(x1, y0, x2 - x1, y1 - y0, 1).attr({ fill: '#F9ED96', zIndex: 0 }).add();
          //     // Bottom right (Relaxed)
          //     this.renderer.rect(x1, y1, x2 - x1, y2 - y1, 1).attr({ fill: '#DE9FEB', zIndex: 0 }).add();

          //     }
          // },
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
        plotLines: [{
            color: '#C4C4C4',
            width: 2,
            value: .5 
        }]
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
        plotLines: [{
            color: '#C4C4C4',
            width: 2,
            value: .5 
        }]
        // plotBands: [{ 
        //     color: '#ffb3b3',
        //     from: 0,
        //     to: .5
        // }],
      },
      legend: {
        enabled: false
      },
      labels: {
          items: [
            {
              html: "<b>Angry</b>",
              style: labelStyle
            },
            {
              html: "<b>Happy</b>",
              style: {
                  left: '550px',
                  top: '100px',
                  width: '200px'
              }
            },
            {
              html: "<b>Sad</b>",
              style: {
                  left: '130px',
                  top: '340px',
                  width: '200px'
              }
            },
            {
              html: "<b>Relaxed</b>",
              style: {
                  left: '550px',
                  top: '340px',
                  width: '200px'
              }
            }
          ]
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
    return <ReactHighcharts config={config} neverReflow />
  }
}

export default Chart;