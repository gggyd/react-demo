import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Badge } from 'antd'
import AuthActionCreators from '../../actions/authActionCreators'
import AppActionCreators from '../../actions/appActionCreators'

const { Header } = Layout

class LayoutHeader extends Component {
  componentDidMount() { 
    
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.theme.name !== this.props.theme.name) {
      let themeCss = document.querySelector('#themeCss')
      themeCss.href = '/themes/' + nextProps.theme.name + '.css'
    }
  }

  render() {
    const { props } = this
    return (
      <Header className={props.collapsed && 'fold'} style={{ background: '#fff', padding: 0 }} >
        <div className="logo" />
        <Icon
          className="trigger"
          type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={props.toggleSider}
        />
        <Menu mode="horizontal" style={{
          float: 'right',
          lineHeight: '62px',
          marginRight: '8px',
          borderBottom: 0
        }}>
          <Menu.Item key="mail">
            <Badge count={25}>
              <Icon type="bell" />
            </Badge>
          </Menu.Item>
          <Menu.SubMenu style={{
            float: 'right'
          }} title={<span> <Icon type="user" />wangqqing</span>}
          >
            <Menu.Item key="theme">
              <a onClick={props.changeAppTheme.bind(this, { name: 'theme1' })}>{props.theme && props.theme.name ? props.theme.name : ''}主题</a>
            </Menu.Item>
            <Menu.Item key="logout">
              <a onClick={props.logout.bind(this)}>注销</a>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.app.theme
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => (dispatch(AuthActionCreators.logout())),
  changeAppTheme: (name) => (dispatch(AppActionCreators.changeAppTheme(name)))
})

export default connect(mapStateToProps, mapDispatchToProps)(LayoutHeader)

