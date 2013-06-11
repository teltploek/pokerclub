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
          type: 'column',
          borderRadius: 0,
          style: {
            fontFamily: '"Open Sans", Georgia, "Times New Roman", Times, serif', // default font
            fontSize: '14px'
          }
        },
        colors: [
          '#EFCC58', 
          '#DC4A2D'
        ],
        title: {
          text: 'Rejsepenge sæsonen 2013',
          align: 'left',
          margin: 40,
          useHTML: true,
          style: {
            fontFamily: '"Montserrat", Helvetica, Arial, sans-serif', // default font
            fontSize: '33px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            webkitTextStrokeWidth: '0.5px',
            color: '#EFCC58',
            top: '0'
          }
        },
        xAxis: {
          categories: names
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || '#6B6763'
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
            x: 0,
            verticalAlign: 'top',
            y: 0,
            borderRadius: 0,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#ddd',
            borderWidth: 1,
            shadow: false,
            useHTML: true
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