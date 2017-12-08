export default [
  {
    path: '/page/admin/portal/index.html',
    iconClass: 'fa-server',
    pathname: '/'
  },
  {
    path: '/page/admin/user/index.html',
    iconClass: 'fa-user',
    pathname: '/user'
  },
  {
    path: '/page/admin/resource/server/index.html',
    iconClass: '',
    pathname: '/server',
    parent: 'fa-cloud'
  },
  {
    path: '/page/admin/resource/rdsserver/index.html',
    iconClass: '',
    pathname: '/page/admin/resource/rdsserver/index.html'
  },
  {
    path: '/page/admin/resource/idc/index.html',
    iconClass: '',
    pathname: '/idc'
  },
  {
    path: '/page/user/monitor/rdschart/index.html',
    iconClass: '',
    pathname: '/monitor/rdschart'
  }
]