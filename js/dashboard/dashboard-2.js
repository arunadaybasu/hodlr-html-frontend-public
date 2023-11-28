

(function($) {
    /* "use strict" */
	
 var dzChartlist = function(){
	
	var screenWidth = $(window).width();	

	// window.Apex = {
	//   chart: {
	//     foreColor: '#fff',
	//     toolbar: {
	//       show: false
	//     },
	//   },
	//   colors: ['#FCCF31', '#17ead9', '#f02fc2'],
	//   stroke: {
	//     width: 3
	//   },
	//   dataLabels: {
	//     enabled: false
	//   },
	//   grid: {
	//     borderColor: "#40475D",
	//   },
	//   xaxis: {
	//     axisTicks: {
	//       color: '#333'
	//     },
	//     axisBorder: {
	//       color: "#333"
	//     }
	//   },
	//   fill: {
	//     type: 'gradient',
	//     gradient: {
	//       gradientToColors: ['#F55555', '#6078ea', '#6094ea']
	//     },
	//   },
	//   tooltip: {
	//     theme: 'dark',
	//     x: {
	//       formatter: function (val) {
	//         return moment(new Date(val)).format("HH:mm:ss")
	//       }
	//     }
	//   },
	//   yaxis: {
	//     decimalsInFloat: 2,
	//     opposite: true,
	//     labels: {
	//       offsetX: -10
	//     }
	//   }
	// };

	var trigoStrength = 3
	var iteration = 11

	function getRandom() {
	  var i = iteration;
	  return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2)
	}

	function getRangeRandom(yrange) {
	  return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
	}

	function generateMinuteWiseTimeSeries(baseval, count, yrange) {
	  var i = 0;
	  var series = [];
	  while (i < count) {
	    var x = baseval;
	    var y = ((Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2))

	    series.push([x, y]);
	    baseval += 300000;
	    i++;
	  }
	  return series;
	}

	function getNewData(baseval, yrange) {
	  var newTime = baseval + 300000;
	  return {
	    x: newTime,
	    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
	  }
	}


	var currentChart = function(){
		 var options = {
		  series: [85, 60, 67, 50],
		  chart: {
		  height: 350,
		  type: 'radialBar',
		},
		plotOptions: {
		  radialBar: {
				startAngle:-90,
			   endAngle: 90,
			dataLabels: {
			  name: {
				fontSize: '22px',
			  },
			  value: {
				fontSize: '16px',
			  },
			}
		  },
		},
		stroke:{
			 lineCap: 'round',
		},
		labels: ['Income', 'Income', 'Imcome', 'Income'],
		 colors:['#FFAF65', '#4441DE','#60C695','#F34F80'],
		};

		var chart = new ApexCharts(document.querySelector("#currentChart"), options);
		chart.render();
	}
	
	var marketChart = function(){
		 var options = {
        series: [
	        {
	          name: 'series1',
	          data: [200, 200, 200, 450, 300, 400, 300,400, 500, 300]
	        },
	        {
	          name: 'series2',
	          data: [400, 300, 450, 350, 700, 200, 800, 800, 700, 750]
	        }
        ],
        chart: {
          height: 350,
          type: 'line',
				  toolbar:{
					  show:false
				  }
    		},
				colors:["#2258BF","#FF7213"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
		   		width: 10,
        },
				legend:{
					show:false
				},
				grid:{
					borderColor: '#AFAFAF',
					strokeDashArray: 10,
				},
				yaxis: {
				  labels: {
					style: {
						colors: '#787878',
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 400
						
					},
					formatter: function (value) {
					  return value + "k";
					}
				  },
				},
        xaxis: {
          categories: ["Week 01","Week 02","Week 03","Week 04","Week 05","Week 06","Week 07","Week 08","Week 09","Week 10"],
				  labels:{
					  style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400
						},
				  },
				  axisBorder: {
						show:false,  
				  },
				  axisTicks:{
					  show: false,
					},
			  
	        },
	        tooltip: {
	          x: {
	            format: 'dd/MM/yy HH:mm'
	          },
	        },
        };

        var chart = new ApexCharts(document.querySelector("#marketChart"), options);
        chart.render();
	}

	var realtimeLineChart = function(){

		var optionsLine = {
		  chart: {
		    height: 350,
		    type: 'line',
		    stacked: true,
		    animations: {
		      enabled: true,
		      easing: 'linear',
		      dynamicAnimation: {
		        speed: 1000
		      }
		    },
		    dropShadow: {
		      enabled: true,
		      opacity: 0.3,
		      blur: 5,
		      left: -7,
		      top: 22
		    },
		    events: {
		      animationEnd: function (chartCtx, opts) {
		        const newData1 = chartCtx.w.config.series[0].data.slice()
		        newData1.shift()
		        const newData2 = chartCtx.w.config.series[1].data.slice()
		        newData2.shift()

		        // check animation end event for just 1 series to avoid multiple updates
		        if (opts.el.node.getAttribute('index') === '0') {
		          window.setTimeout(function () {
		            chartCtx.updateOptions({
		              series: [{
		                data: newData1
		              }, {
		                data: newData2
		              }],
		              subtitle: {
		                text: parseInt(getRandom() * Math.random()).toString(),
		              }
		            }, false, false)
		          }, 300)
		        }

		      }
		    },
		    toolbar: {
		      show: false
		    },
		    zoom: {
		      enabled: false
		    }
		  },
		  dataLabels: {
		    enabled: false
		  },
		  stroke: {
		    curve: 'straight',
		    width: 5,
		  },
		  grid: {
		    padding: {
		      left: 0,
		      right: 0
		    }
		  },
		  markers: {
		    size: 0,
		    hover: {
		      size: 0
		    }
		  },
		  series: [{
		    name: 'Running',
		    data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
		      min: 30,
		      max: 110
		    })
		  }, {
		    name: 'Waiting',
		    data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
		      min: 30,
		      max: 110
		    })
		  }],
		  xaxis: {
		    type: 'datetime',
		    range: 2700000
		  },
		  title: {
		    text: 'Processes',
		    align: 'left',
		    style: {
		      fontSize: '12px'
		    }
		  },
		  subtitle: {
		    text: 'Realtime',
		    floating: true,
		    align: 'right',
		    offsetY: 0,
		    style: {
		      fontSize: '22px'
		    }
		  },
		  legend: {
		    show: true,
		    floating: true,
		    horizontalAlign: 'left',
		    onItemClick: {
		      toggleDataSeries: false
		    },
		    position: 'top',
		    offsetY: -28,
		    offsetX: 60
		  },
		}

		var chartLine = new ApexCharts(
		  document.querySelector("#realtimeLineChart1"),
		  optionsLine
		);
		chartLine.render();

		window.setInterval(function () {

		  iteration++;

		  chartLine.updateSeries([{
		    data: [...chartLine.w.config.series[0].data,
		      [
		        chartLine.w.globals.maxX + 300000,
		        getRandom()
		      ]
		    ]
		  },
		  {
		    data: [...chartLine.w.config.series[1].data,
		      [
		        chartLine.w.globals.maxX + 300000,
		        getRandom()
		      ]
		    ]
		  }]);

		}, 3000);

	}


	var recentContact = function(){
		jQuery('.card-slide').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
            rtl:(getUrlParams('dir') == 'rtl')?true:false,
			autoWidth:true,
            //rtl:true,
			dots: false,
			navText: ['', ''],
		});	
	}
	var carouselReview = function(){
		jQuery('.testimonial-two').owlCarousel({
			loop:true,
			autoplay:true,
			margin:10,
			nav:false,
			stagePadding: 20,
			rtl:false,
			dots: false,
			navText: ['', ''],
			responsive:{
				0:{
					items:2
				},
				450:{
					items:3
				},
				600:{
					items:3
				},	
				991:{
					items:4
				},			
				
				1200:{
					items:5
				},
				1600:{
					items:4
				},
			}
		})
	}
	
	/* Function ============ */
		return {
			init: function(){
			},
			
			
			load: function(){

				currentChart();
				marketChart();
				recentContact();
				carouselReview();
				realtimeLineChart();

			},
			
			resize:function(){
			}
		}
	
	}();

	
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
			dzChartlist.load();
		}, 1000); 
		
	});

     

})(jQuery);