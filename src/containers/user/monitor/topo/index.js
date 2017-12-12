import React, { Component } from 'react'
import { connect } from 'react-redux'
import topActionCreators from '../../../../actions/user/monitor/topoActionCreators'

const rdsNode = {
  width: 100,
  height: 100
}

const dsNode = {
  width: 120,
  height: 100
}

const rdsNodeStyle = {
  position: 'absolute',
  width: rdsNode.width,
  height: rdsNode.height,
  border: '1px solid #ddd'
}

const dsNodeStyle = {
  position: 'absolute',
  width: dsNode.width,
  height: dsNode.height,
  border: '1px solid #ddd'
}

const lineStyle = {
  stroke: 'greenyellow'
}

const getNodesSnap = (data) => {
  let clientNodes = data.clientNodes;
  let rdsNodes = data.rdsNodes;
  let dsNodes = data.dsNodes;

  if (!clientNodes || !rdsNodes || !dsNodes) {
    return ''
  }

  let curNodesSnap = [
    'clientNodes_' + clientNodes.length + '_' + clientNodes.map((item) => {
      return item.nodeName;
    }).join('_'),
    'rdsNodes_' + rdsNodes.length + '_' + rdsNodes.map((item) => {
      return item.nodeName;
    }).join('_'),
    'dataNodes_' + dsNodes.length + '_' + dsNodes.map((item) => {
      return item.nodeName;
    }).join('_')
  ].join(';');

  return curNodesSnap
}

class index extends Component {
  state = {
    topo_position: { },
    lines: [ ]
  }

  calculateTopoPosition = (options) => {
    let data = options.data
    let name = options.suffix
    let storePosition = ''
    let dimension = ''

    const { auth } = this.props
    const { userInfo } = auth
    
    this.positionKey = 'topo_position_' + userInfo.userId + '_' + (name == 'cur' ? auth.rdsId + '_' : '') + name;
    
    storePosition = localStorage.getItem(this.positionKey);

    this.topo_position = {};
    if (storePosition) {
      try {
        this.topo_position = JSON.parse(storePosition);
        if (this.topo_position.rdsId != auth.rdsId && name == 'cur') {
          this.topo_position = {};
        }
      }
      catch (err) {
        this.topo_position = {};
      }
    }
    
    // if (this.topo_position.length > 0) {
    //   dimension = this.topo_position['dimension'];
    //   if (dimension) {
    //     this.panel.width(dimension.width);
    //     this.panel.height(dimension.height);
    //   }
      
    //   return;
    // } else {
    //   this.panel.width(this.outPanel.width());
    //   this.panel.height(this.outPanel.height());
    // }

    let topo_position = this.setTopoPosition(this.topo_position, data);

    this.setState({
      topo_position
    }, () => {
      this.calculateLines(data)
    });

    // localStorage.setItem(state.positionKey, JSON.stringify(_.assign({}, state.topo_position, {
    //   rdsId: $$.getRDSID()
    // })));
  };

  setTopoPosition = (topo_position, data) => {
    var dataNodes
      , serverNodes
      , clientNodes
      , clientNodesFlat
      , baseNodes
      , left
      , top 
      , offset
      , panelWidth
      , nodeLength
      , minOffset = 145
      ;

    const { refs } = this
      
    let outPanel = refs.topo.parentElement
    let panel = refs.topo

    if (!topo_position) {
      topo_position = { };
    }
  
    data = this.preHandleData(data)
  
    clientNodes = data.clientNodes;
    dataNodes = data.dsNodes;
  
    panelWidth = outPanel.clientWidth;
  
    topo_position['dimension'] = {
      width: panelWidth,
      height: outPanel.clientHeight
    };
  
    if (clientNodes.length > 0) {
      left = 0;
      top = 180;
  
      nodeLength = clientNodes.length;
      offset = panelWidth / nodeLength;
  
      if (offset < minOffset) offset = minOffset;
  
      left = panelWidth / nodeLength / 2;
      if (left < 0) {
        left = 50;
      }
  
      clientNodes.forEach(function(item) {
        var tempLeft = left;
  
        if (!!item.nodeName) {
          topo_position[encodeURIComponent(item.nodeName)] = {
            left: tempLeft,
            top: top
          };
        }
  
        let increaseWidth = 50
        if (panelWidth < tempLeft + increaseWidth) {
          panel.width(tempLeft + increaseWidth);
          topo_position['dimension'] = {
            width: panel.clientWidth,
            height: panel.clientHeight
          }
        }
  
        let increaseHeight = 100
        if (panel.clientHeight < top + increaseHeight) {
          panel.style.height = (top + increaseHeight) + 'px';
          topo_position['dimension'] = {
            width: panel.clientWidth,
            height: panel.clientHeight
          }
        }
  
        left += offset;
      });
    }
  
    let rdsNodes = data.rdsNodes; 
    if (rdsNodes.length > 0) {
      top = 370;
  
      if (clientNodes.filter(function(cn) {
        return !cn.isHide;
      }).length > 0) {
        top = 245;
      }
  
      rdsNodes.forEach(function (item) {
        var tempLeft
          , firstTo
          , lastTo
          , firstToName
          , lastToName
          , toList
          , nodeToList
          , nodeTolistLength
          , innerDataList
          , marginLeft = 23
          , paddingTop = 200
          , increaseHeight = 160
          ;
  
        nodeToList = item.to.slice(0, 1);
  
        toList = clientNodes.filter(function(client) {
          return client.to.indexOf(item.nodeName) > -1;
        });
  
        if (toList.length > 0) {
          if (toList.length == 1) {
            firstTo = lastTo = toList[0];
          } else {
            firstTo = toList[0];
            lastTo = toList[toList.length - 1];
          }
  
          firstToName = encodeURIComponent(firstTo.nodeName);
          lastToName = encodeURIComponent(lastTo.nodeName);
          tempLeft = topo_position[firstToName].left 
            + (topo_position[lastToName].left 
            - topo_position[firstToName].left) / 2;
  
          topo_position[item.nodeName] = {
            left: tempLeft - 10,
            top: top
          };
  
          let nodeToListLength = nodeToList.length
          if (nodeToListLength == 1) {
            topo_position[nodeToList[0]] = {
              left: tempLeft - marginLeft,
              top: top + paddingTop
            }
          } else {
            var tempLeft2 = topo_position[firstToName].left;
            var step;
            step = (topo_position[lastToName].left 
              - topo_position[firstToName].left) / (nodeToListLength - 1);
  
            nodeToList.forEach(function(node) {
              topo_position[node] = {
                left: tempLeft2 - marginLeft,
                top: top + paddingTop
              }
              
              tempLeft2 += step;
            });
          }
  
          if (panel.clientHeight < top + paddingTop + increaseHeight) {
            panel.style.height = top + paddingTop + increaseHeight + 'px'
            topo_position['dimension'] = {
              width: panel.clientWidth,
              height: panel.clientHeight
            }
          }
        }
      });
    }
  
    return topo_position;
  }

  preHandleData = (data) => {
    var nextData = {}
      , dsNodes
      , clientNodes
      , nextClientNodes = []
      , rdsNodes
      , nextDSNodes
      ;
  
    rdsNodes = data.rdsNodes;
    clientNodes = data.clientNodes;
  
    rdsNodes.forEach(function (rn) {
      var rdsNodeName = rn.nodeName
        , filterClientNodes
        ;
  
      filterClientNodes = clientNodes.filter(function (cn) {
        return cn.to.indexOf(rdsNodeName) > -1;
      });
  
      if (filterClientNodes.length === 0) {
        filterClientNodes.push({
          nodeName: rdsNodeName,
          to: [rdsNodeName],
          isHide: true
        });
      }
  
      nextClientNodes = nextClientNodes.concat(filterClientNodes);
    });
  
    nextData = Object.assign({}, data, {
      clientNodes: nextClientNodes
    });
  
    return nextData;
  }

  calculateLines = (data) => {
    let lines = []
    const topo_position = this.state.topo_position
    const rdsNodes = data['rdsNodes']

    rdsNodes.length > 0 && rdsNodes.forEach((node) => {
      const toList = node.to
      const nodeName = node.nodeName
      const fromTarget = topo_position[nodeName]

      toList && toList.forEach((to) => {
        const toTarget = topo_position[to]

        if (!!toTarget) {
          const x1 = fromTarget.left + rdsNode.width / 2
          const y1 = fromTarget.top + rdsNode.height
          const x2 = toTarget.left + dsNode.width / 2
          const y2 = toTarget.top 

          lines = lines.concat([{
            nodeName,
            to,
            x1,
            x2, 
            y1,
            y2
          }])
        }
      })
    })

    this.setState({
      lines
    })
  }

  componentDidMount() {
    console.log(this.props)
    const { getTopo } = this.props
    getTopo()
  }

  componentWillReceiveProps(nextProps) {
    let nextNodesSnap = getNodesSnap(nextProps.topo.rds)
    let thisNodesSnap = getNodesSnap(this.props.topo.rds)

    if (nextNodesSnap !== thisNodesSnap) {
      this.calculateTopoPosition({
        data: nextProps.topo.rds,
        suffix: 'curMode'
      });


    }
  }

  render() {
    const { topo } = this.props
    const { rds } = topo
    return(
      <div ref="topo" style={{
          position: 'relative'
        }}>
        <svg style={{
          width: '100%',
          height: '100%'
        }}>
          {
            this.state.lines.length > 0 && this.state.lines.map((line) => {
              return (<line 
                key={`line-${line.nodeName}`}
                data-name-from={line.nodeName}
                data-name-to={line.to}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                strokeWidth="2" 
                stroke="greenyellow"
              />)
            })
          }
        </svg>
        {
          rds.rdsNodes && rds.rdsNodes.length > 0 && rds.rdsNodes.map((node) => {
            let nodePos = this.state.topo_position[node.nodeName]
            if (!!nodePos) {
              return <span key={node.nodeName} style={{ ...{
                top: nodePos.top,
                left: nodePos.left,
              }, ...rdsNodeStyle }}>rdsNode</span>
            }

            return null
          })
        }
        {
          rds.dsNodes && rds.dsNodes.length > 0 && rds.dsNodes.map((node) => {
            let nodePos = this.state.topo_position[node.nodeName]
            if (!!nodePos) {
              return <span key={node.nodeName} style={{ ...{
                top: nodePos.top,
                left: nodePos.left
              }, ...dsNodeStyle }} >dsNode</span>
            }
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topo: state.user.monitor.topo,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTopo: (queryParams) => (dispatch(topActionCreators.getTopo(queryParams)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)