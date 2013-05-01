define(['underscore',
        './collections/collection',
        'highcharts',
        'hbs!./templates/chart'],
function( _,
          Collection,
          highcharts,
          chartTmpl) {

  return {    
    type: 'Backbone',

    collection: new Collection(),

    template: chartTmpl,

    initialize: function() {
      this.attachCollectionListeners();

      this.collection.fetch();
    },

    render: function() {
      console.log(this);

      this.$el.html( chartTmpl() );

      this.initChart();
    },

    attachCollectionListeners: function() {
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.render, this);
      this.collection.on('remove', this.render, this);
    },

    initChart: function(){
      var names = this.collection.getNames(),
          clubMoney = this.collection.getClubMoney(),
          totalprizes = this.collection.getTotalPrizes();

      this.$('.chart').highcharts({
        chart: {
          type: 'column'
        },
        colors: [
          '#f28f43', 
          '#8bbc21'
        ],
        title: {
          text: 'Rejsepenge sæsonen 2013'
        },
        xAxis: {
          categories: names
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Rejsepenge'
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
              }
            },
            labels: {
              formatter: function(){
                return this.value + ' kr.';
              }
            }
          },
          legend: {
            align: 'right',
            x: -100,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: true
          },
          tooltip: {
            formatter: function() {
              return '<b>'+ this.x +'</b><br/>'+
              this.series.name +': '+ this.y +' kr.<br/>'+
              'Total: '+ this.point.stackTotal + ' kr.';
            }
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                formatter: function() {
                  return (this.y === 0) ? '' : this.y + ' kr.';
                }
              }
            }
          },
          series: [{
            name: 'Præmiebeløb',
            data: totalprizes
          }, {
            name: 'Klubkassens bidrag',
            data: clubMoney
          }]
        });
    }

  }
});