import React, { Component } from 'react'
import { connect } from 'react-redux'
import rdsActionCreators from '../../actions/user/rdsActionCreators'
import authActionCreators from '../../actions/authActionCreators'
import { Card, Col, Row } from 'antd' 

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

  render() {
    const { menuList } = this.props
    return(
      <div>
        <Row gutter={16}>
        {
          menuList.length > 0 && menuList.map((item) => {
            return <Col key={item.id} span={6}>
            <Card title={`${item.name}`} onClick={(id) => this.handleClick(item.id)} >
              <p>{`${item.rdsTypeStr}`}</p>
              <p>{`${item.statusStr}`}</p>
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