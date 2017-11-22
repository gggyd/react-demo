import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'
import MenuActionCreators from '../../actions/menuActionCreators'

const { Sider } = Layout

const getIcon = (icon) => {
  let nextIcon = '';

  switch (icon) {
    case 'fa-user':
      nextIcon = 'user';
      break;
    case 'fa-cloud':
      nextIcon = 'cloud';
      break;
    case 'fa-user-circle':
      nextIcon = 'check-circle';
      break;
    case 'fa-eye':
      nextIcon = 'eye';
      break;
    case 'fa-wrench':
      nextIcon = 'setting';
      break;
    case 'fa-book':
      nextIcon = 'book';
      break;
    default: 
      nextIcon = ''
  }

  return nextIcon;
}

const getLinkTo = (path) => {
  let to = '';

  switch (path) {
    case '/page/admin/resource/idc/index.html':
      to = '/about';
      break;
    case '/page/admin/user/index.html':
      to = '/user';
      break;
    default:
      to = '/'
  }

  return to;
}

class LayoutSider extends Component {
  componentDidMount() {
    this.props.getMenu();
  }

  handleClickMenu({item, key, selectedKeys}) {
    let { history } = this.props
    let { to } = item.props
    
    history.push({
      pathname: getLinkTo(to)
    })
  }

  recursiveMenu = (list) => {
    var result = list.map((item) => {
      if (!item.hasChild) {
        return <Menu.Item key={Date.now() * Math.random(10)} to={item.path} >
          {item.iconClass && <Icon type={getIcon(item.iconClass)} />}
          <span>{item.menuName}</span>
        </Menu.Item>
      }
  
      return (
        <Menu.SubMenu 
          title={<span>{item.iconClass && <Icon type={getIcon(item.iconClass)} />}<span>{item.menuName}</span></span>} 
          key={Date.now() * Math.random(10)}
        >
          {this.recursiveMenu(item.children)}
        </Menu.SubMenu>);
    })
  
    return result;
  }

  render() {
    let props = this.props;
    let list = this.props.list.length > 0 && this.recursiveMenu(this.props.list);

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        style={{
          background: '#fff'
        }}
      >
        <Menu mode="inline" onSelect={this.handleClickMenu.bind(this)}>
          {list}
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.menu.list
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMenu: () => (dispatch(MenuActionCreators.getMenu()))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutSider))