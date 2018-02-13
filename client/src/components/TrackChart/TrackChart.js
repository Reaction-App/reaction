import React, { Component } from 'react';
import SortFunctions from "../../utils/SortFunctions";
// import $ from "jquery";
const ReactHighcharts = require('react-highcharts');

class Chart extends Component {

  componentDidUpdate() {
    let chart = this.refs.chart.getChart();
    chart.showLoading()
    setTimeout(() => {
      chart.hideLoading()
    }, 500)
  }

  render() {

    let {chartData} = this.props
    let data = [{data: chartData, color: '#5A66E3'}]
    // let labelStyle = {
    //     left: '120px',
    //     top: '100px',
    //     width: '200px',
    //     'font-size': '30px',
    //     'text-shadow':'1px 1px 5px rgba(92,92,92,0.7)',
    //     'font-style':'oblique',
    //     color:'#C4C4C4',
    //     'letter-spacing': '3pt',
    //     'font-family':'helvetica, sans-serif'
    // }

    const config = {
      // responsive: {
      //   rules: [{
      //     condition: {
      //       minWidth: 900,

      //     },
      //     chartOptions: {
      //       chart: {
      //         width: 355,

      //       }
      //     }
      //   }]
      // },

      credits: {
        enabled: false
      },
      loading: {
        labelStyle: {
            color: 'white'
        },
        style: {
            backgroundColor: 'gray'
        }
      },
      chart: {
        // width: 355,
        type: 'scatter',
        backgroundColor: 'transparent',
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
            width: 1,
            value: .5
        }]
      },
      yAxis: {
        title: {
          text: 'Energy'
        },
        min: 0,
        max: 1,
        plotLines: [{
            color: '#C4C4C4',
            width: 1,
            value: .5
        }]

      },
      legend: {
        enabled: false
      },

      plotOptions: {
        series: {
          events: {
            // click: function() {
            //   // alert(this.chart.hoverPoint.name)
            //   SortFunctions.helloWorld()
            // }
          }
        },
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
    return <ReactHighcharts config={config} ref="chart"/>
  }
}

export default Chart;
