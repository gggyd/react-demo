import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd'
import {
  Route,
  Redirect,
  Switch as RouteSwitch,
  Link
} from 'react-router-dom'

import UserInfo from './containers/userInfo'
import Server from './containers/admin/resource/server'
import ServerEdit from './containers/admin/resource/server/edit'
import IDC from './containers/admin/resource/idc'
import IDCEdit from './containers/admin/resource/idc/edit'

import LayoutHeader from './containers/layout/header'
import LayoutSider from './containers/layout/sider'

const { Content } = Layout
const breadcrumbNameMap = {
  '/': '首页',
  '/user': '用户',
  '/server': '服务器管理',
  '/server/edit': '编辑',
  '/idc': '机房管理',
  '/idc/edit': '编辑'
};

class LayoutComponent extends Component {
  constructor() {
    super();

    this.toggleSider = this.toggleSider.bind(this);
  }

  state = {
    collapsed: false
  }

  toggleSider = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    let { location, match } = this.props
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    })

    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        <Link to="/">首页</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems)

    let marginLeft = this.state.collapsed ? 64 : 200
    return (
      <Layout style={{
        height: '100%'
      }}>
        <LayoutHeader collapsed={this.state.collapsed} toggleSider={this.toggleSider} />
        <Layout>
          <LayoutSider collapsed={this.state.collapsed} />
          <Layout style={{ marginLeft }}>

            <Breadcrumb style={{ margin: '16px 0 0 16px' }}>
              {breadcrumbItems}
            </Breadcrumb>
            <Content style={{
              margin: '12px 16px 24px 16px',
              padding: 24,
              background: '#fff'
            }}>
              <RouteSwitch>
                <Route path={`${match.path}`} exact component={Server} />
                <Route path={`${match.path}user`} exact component={UserInfo} />
                <Route path={`${match.path}server`} exact component={Server} />
                <Route path={`${match.path}server/edit`} exact component={ServerEdit} />
                <Route path={`${match.path}idc`} exact component={IDC} />
                <Route path={`${match.path}idc/edit`} exact component={IDCEdit} />
                <Redirect to={`${match.url}`} />
              </RouteSwitch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default LayoutComponent;
