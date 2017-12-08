import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import MenuActionCreators from '../../actions/menuActionCreators'
import menuMap from '../../utils/menu-map'
import { locale } from 'moment';

const { Sider } = Layout

const getIcon = (icon) => {
  let nextIcon = '';

  switch (icon) {
    case 'fa-dashboard':
      nextIcon = 'dashboard';
      break;
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
  let to = '/';

  let menuMapItem = menuMap.find((item) => (
    item.path === path
  ))

  if (!menuMapItem) {
    return to
  }

  to = menuMapItem.pathname
  return {
    to,
    defaultSelectedKeys: [menuMapItem.iconClass || menuMapItem.path],
    defaultOpenKeys: !!menuMapItem.parent ? [menuMapItem.parent] : []
  }
}

class LayoutSider extends Component {
  componentDidMount() {
    let { location, auth, getMenu, getUserNenu } = this.props
    const { userInfo } = auth

    if (!!userInfo) {
      if (userInfo.role === 2) {
        getMenu(location.pathname)
      } else {
        getUserNenu(locale.pathname)
      }
    }
  }

  handleClickMenu({item, key, selectedKeys}) {
    let { history, changeMenuDefault } = this.props
    let { to } = item.props
    let toObj = getLinkTo(to)

    changeMenuDefault({
      defaultOpenKeys: toObj.defaultOpenKeys, 
      defaultSelectedKeys: toObj.defaultSelectedKeys
    })

    history.push({
      pathname: toObj.to
    })
  }

  recursiveMenu = (list) => {
    var result = list.map((item) => {
      if (!item.hasChild) {
        return <Menu.Item key={item.iconClass || item.path} to={item.path} >
          {item.iconClass && <Icon type={getIcon(item.iconClass)} />}
          <span>{item.menuName}</span>
        </Menu.Item>
      }
  
      return (
        <Menu.SubMenu 
          title={<span>{item.iconClass && <Icon type={getIcon(item.iconClass)} />}<span>{item.menuName}</span></span>} 
          key={item.iconClass || item.path}
        >
          {this.recursiveMenu(item.children)}
        </Menu.SubMenu>);
    })
  
    return result;
  }

  render() {
    let props = this.props;
    let { list, defaultOpenKeys, defaultSelectedKeys } = props.menu;
    let menus = list.length > 0 && this.recursiveMenu(list);
    let overflow = props.collapsed ? {
      overflow: 'initial'
    } : {
      overflowX: 'hidden',
      overflowY: 'auto'
    }

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        style={ Object.assign({}, {
          background: '#fff',
          position: 'fixed', 
          marginTop: '64px',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000
        }, overflow)}
      >
      { list.length > 0 && <Menu 
          theme='dark'
          mode={!props.collapsed ? 'inline' : 'vertical'} 
          onSelect={this.handleClickMenu.bind(this)}
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          style={{
            height: '100%',
            borderRight: 0
          }} >
          {menus}
        </Menu>
      }
      </Sider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMenu: (pathname) => (dispatch(MenuActionCreators.getMenu(pathname))),
  getUserNenu: (pathname) => (dispatch(MenuActionCreators.getUserMenu(pathname))),
  changeMenuDefault: ({ defaultOpenKeys, defaultSelectedKeys }) => (dispatch(MenuActionCreators.changeMenuDefault({ defaultOpenKeys, defaultSelectedKeys })))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutSider))