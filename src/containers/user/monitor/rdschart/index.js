import React, { Component } from 'react'
import { connect } from 'react-redux'
import RdschartActionCreators from '../../../../actions/user/monitor/rdschartActionCreators'
import chartHelper from '../../../../utils/charthelper'
import ReactEcharts from 'echarts-for-react'

class index extends Component {
  componentDidMount() {
    const { getPerformance } = this.props

    getPerformance({})
  }

  getChartOption(performance) {
    const { auth } = this.props
    const { rdsId } = auth

    let data = performance.filter((item) => {
      return rdsId === item.rdsCode
    })

    if (!data.length === 0) {
      return {}
    }

    data = data[0]

    data = chartHelper.dataConvertChart.line(data, ['tps']);

    let series = data.series;

    let info = data.infos;

    let option = {
      color: ['#508641', '#eab839', '#e24e42'],
      title: {
        text: ''
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: true,
          lineStyle: {
            color: '#f23838'
          },
          crossStyle: {
            color: '#f23838'
          }
        },
        showContent: true
      },
      grid: {
        show: false,
        top: '10px',
        left: '10px',
        bottom: '70px',
        right: '10px',
        containLabel: true
      },
      legend: {
        show: true,
        orient: 'horizontal',
        left: 'center',
        top: 'bottom',
        data: data.legend
      },
      xAxis: {
        axisLabel: {
          show: true
        },
        boundaryGap: false,
        data: data.axis.x
      },
      yAxis: {
        axisLabel: {
          showMinLabel: true,
          showMaxLabel: true
        },
        axisLine: {
          show: false
        }
      },
      dataZoom: [{
        start: 80,
        end: 100,
        fillerColor: 'rgba(167,183,204,0.1)',
        borderColor: '#444343',
        bottom: '30',
        handleSize: '100%',
        handleStyle: {
          color: '#D8D9DA',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      series: data.series
    };

    return option
  }

  render() {
    const { performance } = this.props.rdschart

    return (
      <div>
        {performance.length > 0 &&
          <ReactEcharts
            option={this.getChartOption(performance)}
            style={{ height: '400px', width: '100%' }}
            className="react_for_echarts"
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rdschart: state.user.monitor.rdschart,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPerformance: (queryParams) => (dispatch(RdschartActionCreators.getPerformance(queryParams)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)