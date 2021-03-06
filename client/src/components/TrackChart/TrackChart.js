import React, { Component } from 'react';
const ReactHighcharts = require('react-highcharts');

class Chart extends Component {

  highlight = () => {
    let chart = this.refs.chart.getChart();
    let highlightThisSong = this.props.highlightSongOnGraph;
    let highlightThisIndex = null;

    chart.series[0].data.forEach((data) => {
      if (highlightThisSong === data.options.name) {
        highlightThisIndex = data.index
      }
    })

    if (highlightThisIndex != null) {
      chart.series[0].data[highlightThisIndex].setState('hover');
      chart.tooltip.refresh(chart.series[0].data[highlightThisIndex]);
    }
  }

  graphLoading = (message) => {
    let chart = this.refs.chart.getChart();
    chart.showLoading(message)
    setTimeout(() => {
      chart.hideLoading()
    }, 1250)
  }

  componentDidLoad() {
  }

  componentDidUpdate() {
    this.highlight();
  }

  render() {

    const componentScope = this;
    let {chartData} = componentScope.props
    let data = [{data: chartData, color: '#5A66E3'}]


    // if (componentScope.props.hoverPoint()) {
    //   let chart = this.refs.chart.getChart();
    //   this.series[0].data[0].setState('hover');
    // }

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
        maxWidth: 600,
        type: 'scatter',
        backgroundColor: 'transparent',
      },
      title: {
        text: 'My Song Chart',
        style: {
            fontSize: '30px',
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
            color: '#5A66E3'
          }
      },
      xAxis: {
        labels: {
          formatter: function() {
            return this.value+'%';
          },
          style: {
            fontFamily: 'Montserrat',
          },
        },
        title: {
          enabled: true,
          text: 'Positivity',
          style: {
            fontSize: '18px',
            fontFamily: 'Montserrat',
            color: '#454448',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontWeight: 'bold',
            marginTop: '20px',
          }
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
        min: 0,
        max: 100,
        plotLines: [{
            color: '#C4C4C4',
            width: 1,
            value: 50
        }]
      },
      yAxis: {
        labels: {
          formatter: function() {
            return this.value+'%';
          },
          style: {
            fontFamily: 'Montserrat',
          },
        },
        title: {
          text: 'Energy',
          style: {
            fontSize: '18px',
            fontFamily: 'Montserrat',
            color: '#454448',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontWeight: 'bold',
            marginTop: '20px',
          }
        },
        min: 0,
        max: 100,
        plotLines: [{
            color: '#C4C4C4',
            width: 1,
            value: 50
        }]
      },
      legend: {
        enabled: false
      },

      plotOptions: {
        series: {
          animation: false,
          events: {
            click: (event) => {
              componentScope.props.graphClick(event);
              this.graphLoading("Sorting by song...")
            }
          },
          cursor: 'pointer'
        },
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)',
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              },
            },
          },
          tooltip: {
            useHTML: true,
            headerFormat: '<b>{point.key}</b><br><table>',
            pointFormat: 'Positivity: {point.x}%, Energy: {point.y}%',
          }
        }
      },
      series: data
    };
    return (
      <div>
        <ReactHighcharts config={config} ref="chart"/>
          <p style={{position: 'absolute', top: '15%', left: '23%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Angry</p>
          <p style={{position: 'absolute', top: '15%', left: '70%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Happy</p>
          <p style={{position: 'absolute', top: '48%', left: '25%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Sad</p>
          <p style={{position: 'absolute', top: '48%', left: '68%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Relaxed</p>
      </div>
    )
  }
}

export default Chart;
