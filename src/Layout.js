import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd'
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'

import Routes from './routes'

import LayoutHeader from './containers/layout/header'
import LayoutSider from './containers/layout/sider'

const { Content } = Layout
const breadcrumbNameMap = {
  '/': '首页',
  '/user': '用户',
  '/server': '服务器管理',
  '/server/edit': '编辑',
  '/idc': '机房管理',
  '/idc/edit': '编辑',
  '/info': '基本信息',
  '/monitor': '监控',
  '/monitor/rdschart': '实例智能监控'
};

class LayoutComponent extends Component {
  constructor() {
    super();

    this.toggleSider = this.toggleSider.bind(this);
  }

  state = {
    collapsed: false
  }

  componentDidMount() {
    const { auth, history, location } = this.props
    const { userInfo } = auth
    if (userInfo.role === 1 && !auth.rdsId) {
      history.replace({
        pathname: '/rdslist'
      })
    }
  }

  toggleSider = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    let { location, match, auth } = this.props
    const { userInfo } = auth
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

    if (userInfo.role === 1 && !auth.rdsId) {
      marginLeft = 0
    }

    return (
      <Layout style={{
        height: '100%'
      }}>
        <LayoutHeader collapsed={this.state.collapsed} toggleSider={this.toggleSider} />
        <Layout>
          {
            userInfo.role === 1 && !auth.rdsId ? null : <LayoutSider collapsed={this.state.collapsed} />
          }
          
          <Layout style={{ marginLeft }}>

            <Breadcrumb style={{ margin: '16px 0 0 16px' }}>
              {breadcrumbItems}
            </Breadcrumb>
            <Content style={{
              margin: '12px 16px 24px 16px',
              padding: 24,
              background: '#fff'
            }}>
              <Routes match={match} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps)(LayoutComponent);
