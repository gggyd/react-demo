const helper = {
  dataConvertChart: {
    line: function (data, legend) {
      var seriesData = {}
        , seriesList = []
        , x = []
        , items
        ;

      legend.forEach(function (series) {
        var seriesObj = {};
        seriesObj.name = series;
        seriesObj.data = [];
        seriesData[series] = seriesObj;
      });

      items = data.items;

      items.forEach(function (item) {
        x.push(item.time);
        legend.forEach(function (series) {
          seriesData[series].data.push(item[series]);
        });
      });

      for (let key in seriesData) {
        seriesList.push(seriesData[key])
      };

      return {
        title: data.title,
        legend: legend,
        axis: {
          x: x
        },
        series: seriesList.map(function(item) {
          return Object.assign({}, item, helper.series.defaultLine);
        })
      };
    },
    pie: function(data, legend) {
      var seriesList = []
        , nextData = []
        , name = ''
        ;

      legend.forEach(function(key) {
        nextData.push({
          value: data.item[key],
          name: key
        })
      });

      seriesList.push({
        data: nextData,
        name: name
      })

      return {
        title: data.title,
        legend: legend,
        series: seriesList
      }
    }
  },
  convertLegendName: {
    line: function(data, map) {
      var legend 
        , series
        ;
      
      legend = data.legend;
      series = data.series;
      
      legend = helper.handleLegend(legend, map);

      series.forEach(function(item) {
        item.name = map[item.name];
      });

      return Object.assign({ }, data, {
        legend: legend
      });
    },
    pie: function(data, map) {
      var legend 
        , series
        ;
      
      legend = data.legend;
      series = data.series;

      legend = helper.handleLegend(legend, map);

      series.forEach(function(item) {
        item.data.forEach(function(value) {
          value.name = map[value.name];
        });
      });

      return Object.assign({ }, data, {
        legend: legend
      });
    }
  },
  series: {
    defaultLine: {
      type: 'line',
      smooth: true,
      areaStyle: { normal: {} }
    }
  },
  handleLegend: function(legend, map) {
    return legend.map(function(item) {
      var convert = map[item];
      return convert;
    });
  }
}

export default helper