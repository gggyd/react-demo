import React, { Component } from 'react'
import { connect } from 'react-redux'
import rdsActionCreators from '../../actions/user/rdsActionCreators'
import authActionCreators from '../../actions/authActionCreators'
import { Card, Col, Row } from 'antd' 
import ReactEcharts from 'echarts-for-react'

require('echarts-liquidfill')

class rdslist extends Component {
  componentDidMount() {
    this.props.getRDSMenuList()
  }

  handleClick = (id) => {
    let { history, changeAuthInfo } = this.props

    changeAuthInfo({rdsId: id})

    history.replace({
      pathname: '/info'
    })
  }

  getOption(item) {
    let score = 0
    let score2 = 0
    let color = ''
    let backColor = ''
    let borderColor = ''
    let textColor = ''
    let option = { }

    score = (item.healthScore / 100).toFixed(2);
    score2 = ((item.healthScore - 2) / 100).toFixed(2);

    if (item.healthScore >= 85) {
      color = ['#5b965c', '#3c763d', '#99c79a', '#eaf5ea'];
      backColor = '#e4f5e4';
      borderColor = '#3c763d';
      textColor = '#3c763d';
    } else if (item.healthScore < 60) {
      color = ['#dc6c68', '#ce4844', '#e68b88', '#e4a256'];
      backColor = '#f3ebeb';
      borderColor = '#ce4844';
      textColor = '#ce4844';
    } else {
      color = ['#e89e48', '#e08c2b', '#ecb472', '#fdfcf6'];
      backColor = '#f7f5ed';
      borderColor = '#e08c2b';
      textColor = '#e08c2b';
    }

    option = {
      grid: {
        top: 0,
        bottom: 0
      },
      series: [{
        type: 'liquidFill',
        color: color,
        amplitude: '5%',
        data: [score, {
          value: score2,
          phase: Math.PI
        }],
        phase: 0,
        period: 2000,
        waveLength: '100%',
        animationDurationUpdate: 5000,
        outline: {
          show: true,
          borderDistance: 0,
          itemStyle: {
            color: 'none',
            borderColor: borderColor,
            borderWidth: 1,
            shadowBlur: 0,
            shadowColor: 'rgba(0, 0, 0, 0.25)'
          }
        },
        backgroundStyle: {
          color: backColor
        },
        itemStyle: {
          normal: {
            opacity: 0.75,
            shadowBlur: 0,
            shadowColor: 'rgba(0, 0, 0, 0.4)'
          },
          emphasis: {
            opacity: 0.8
          }
        },
        label: {
          normal: {
            show: true,
            formatter: (param) => {
              return param.data * 1000 / 10;
            },
            textStyle: {
              color: textColor,
              insideColor: '#fff',
              fontSize: 42,
              fontWeight: 'bold',
              align: 'center',
              baseline: 'middle'
            },
            position: 'inside'
          }
        }
      }]
    }

    return option
  }

  render() {
    const { menuList } = this.props
    return(
      <div>
        <Row gutter={16}>
        {
          menuList.length > 0 && menuList.map((item) => {
            return <Col key={item.id} span={8}>
            <Card title={`${item.name}`} onClick={(id) => this.handleClick(item.id)} >
              <p>{`${item.rdsTypeStr}`}</p>
              <p>{`${item.statusStr}`}</p>
              <ReactEcharts
                option={this.getOption(item)}
                style={{ height: '400px', width: '100%' }}
                className="react_for_echarts"
              />
            </Card>
            </Col>
          })
        }
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuList: state.user.rds.menuList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRDSMenuList: () => (dispatch(rdsActionCreators.getRDSMenuList())),
    changeAuthInfo: ({rdsId}) => (dispatch(authActionCreators.changeAuthInfo({rdsId})))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(rdslist)