$(function() {
    "use strict";


// chart 1

  var ctx = document.getElementById("chart1").getContext('2d');

  var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke1.addColorStop(0, '#6078ea');
      gradientStroke1.addColorStop(1, '#17c5ea');

  var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke2.addColorStop(0, '#ff8359');
      gradientStroke2.addColorStop(1, '#ffdf40');

      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Laptops',
            data: [65, 59, 80, 81,65, 59, 80, 81,59, 80, 81,65],
            borderColor: gradientStroke1,
            backgroundColor: gradientStroke1,
            hoverBackgroundColor: gradientStroke1,
            pointRadius: 0,
            fill: false,
            borderRadius: 20,
            borderWidth: 0
          }, {
            label: 'Mobiles',
            data: [28, 48, 40, 19,28, 48, 40, 19,40, 19,28, 48],
            borderColor: gradientStroke2,
            backgroundColor: gradientStroke2,
            hoverBackgroundColor: gradientStroke2,
            pointRadius: 0,
            fill: false,
            borderRadius: 20,
            borderWidth: 0
          }]
        },

        options: {
				  maintainAspectRatio: false,
          barPercentage: 0.5,
          categoryPercentage: 0.8,
				  plugins: {
					  legend: {
						  display: false,
					  }
				  },
				  scales: {
					  y: {
						  beginAtZero: true
					  }
				  }
			  }
      });


// chart 2

 var ctx = document.getElementById("chart2").getContext('2d');

  var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke1.addColorStop(0, '#fc4a1a');
      gradientStroke1.addColorStop(1, '#f7b733');

  var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke2.addColorStop(0, '#4776e6');
      gradientStroke2.addColorStop(1, '#8e54e9');


  var gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke3.addColorStop(0, '#ee0979');
      gradientStroke3.addColorStop(1, '#ff6a00');

	var gradientStroke4 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke4.addColorStop(0, '#42e695');
      gradientStroke4.addColorStop(1, '#3bb2b8');

      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Jeans", "T-Shirts", "Shoes", "Lingerie"],
          datasets: [{
            backgroundColor: [
              gradientStroke1,
              gradientStroke2,
              gradientStroke3,
              gradientStroke4
            ],
            hoverBackgroundColor: [
              gradientStroke1,
              gradientStroke2,
              gradientStroke3,
              gradientStroke4
            ],
            data: [25, 80, 25, 25],
			borderWidth: [1, 1, 1, 1]
          }]
        },
        options: {
          maintainAspectRatio: false,
          cutout: 82,
          plugins: {
            legend: {
                display: false,
             }
          }

       }
      });



// worl map

jQuery('#geographic-map-2').vectorMap(
{
    map: 'world_mill_en',
    backgroundColor: 'transparent',
    borderColor: '#818181',
    borderOpacity: 0.25,
    borderWidth: 1,
    zoomOnScroll: false,
    color: '#009efb',
    regionStyle : {
        initial : {
          fill : '#008cff'
        }
      },
    markerStyle: {
      initial: {
				r: 9,
				'fill': '#fff',
				'fill-opacity':1,
				'stroke': '#000',
				'stroke-width' : 5,
				'stroke-opacity': 0.4
                },
                },
    enableZoom: true,
    hoverColor: '#009efb',
    markers : [{
        latLng : [21.00, 78.00],
        name : 'Lorem Ipsum Dollar'

      }],
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#c9dfaf',
    selectedRegions: [],
    showTooltip: true,
});


// chart 3


// chart 4

  // chart 5



   });
