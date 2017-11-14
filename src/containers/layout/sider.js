import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import MenuActionCreators from '../../actions/menuActionCreators';

const { Sider } = Layout;

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

  recursiveMenu = (list) => {
    var result = list.map((item) => {
      if (!item.hasChild) {
        return <Menu.Item key={Date.now() * Math.random(10)}>
          {item.iconClass && <Icon type={getIcon(item.iconClass)} />}
          <span><NavLink to={getLinkTo(item.path)}>{item.menuName}</NavLink></span>
        </Menu.Item>
      }
  
      return (
        <Menu.SubMenu 
          title={<span>{item.iconClass && <Icon type={getIcon(item.iconClass)} />}<span>{item.menuName}</span></span>} 
          key={Date.now() * Math.random(10)}
        >
          {this.recursiveMenu(item.children)}
        </Menu.SubMenu>);
    });
  
    return result;
  };

  render() {
    let props = this.props;
    let menus = this.props.menu.menuState.menu.length > 0 && this.recursiveMenu(this.props.menu.menuState.menu);

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        style={{
          background: '#fff'
        }}
      >
        <Menu mode="inline">
          {menus}
        </Menu>
      </Sider>
    )
  }
};
const mapStateToProps = (state) => ({
  menu: state.menu
});

const mapDispatchToProps = (dispatch) => ({
  getMenu: () => (dispatch(MenuActionCreators.getMenu()))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutSider));