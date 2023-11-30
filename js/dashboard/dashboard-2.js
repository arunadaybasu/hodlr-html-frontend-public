

(function($) {
    /* "use strict" */
	
 var dzChartlist = function(){
	
	var screenWidth = $(window).width(),
	dataSeriesBtcUsdt = [],
	chartMarketPriceBtc,
	trigoStrength = 3,
	iteration = 11,
	btcMin = 9999999999999,
	btcMax = 0;

	const URL = 'http://localhost:4000';
  const socket = io(URL, {
  	cors: {
			origin: URL
	  }
  });

  const form = document.getElementById('chat-form-1');
  const input = document.getElementById('chat-input-1');
  const messages = document.getElementById('chat-messages-1');
  // // const priceDashPrimary = document.getElementById('price-dash-primary');
  // const priceDashPrimaryPnl = document.getElementById('price-dash-primary-pnl');


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
	
	var marketChart = async function() {

		var options = {
			series: [{
		    name: 'BTC/USDT',
		    data: []
			 }],
			chart: {
				id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: {
          autoScaleYaxis: true
        },
		    animations: {
		      enabled: true,
		      easing: 'linear',
		      dynamicAnimation: {
		        speed: 1000
		      }
		    },
		  },
			colors:["#2258BF"],
			dataLabels: {
			  enabled: false
			},
			stroke: {
			  curve: 'smooth',
				width: 5
			},
			legend:{
				show:false
			},
			grid:{
				borderColor: '#AFAFAF',
				strokeDashArray: 10
			},
			yaxis: {
				min: 0.000008,
			  max: 0.000009,
			  labels: {
					style: {
						colors: '#787878',
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 400
					},
					// formatter: function (value) {
					//   return value + "k";
					// }
			  }
			},
			xaxis: {
			  type: 'datetime',
			  labels:{
				  style: {
						colors: '#787878',
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 400
					},
			  },
			  // axisBorder: {
				// 	show:false,  
			  // },
			  // axisTicks:{
				//   show: false,
				// },
		  },
		  tooltip: {
		    x: {
		      format: 'dd/MM/yy HH:mm:ss'
		    }
		  },
		  fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
		  // legend: {
		  //   show: true,
		  //   floating: true,
		  //   horizontalAlign: 'left',
		  //   onItemClick: {
		  //     toggleDataSeries: true
		  //   },
		  //   position: 'top',
		  //   offsetY: -28,
		  //   offsetX: 60
		  // },
		  // title: {
		  //   text: 'Price/USDT',
		  //   align: 'left',
		  //   style: {
		  //     fontSize: '12px'
		  //   }
		  // },
		  // subtitle: {
		  //   text: 'BTC/USDT',
		  //   floating: true,
		  //   align: 'right',
		  //   offsetY: 0,
		  //   style: {
		  //     fontSize: '22px'
		  //   }
		  // }
		};

		chartMarketPriceBtc = new ApexCharts(document.querySelector("#marketChart"), options);
		chartMarketPriceBtc.render();

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
		                text: ''+parseInt(getRandom() * Math.random()).toString(),
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

	// socket.on('price-btc-usdt-init', (msg) => {

  //   console.log(msg);

  //   for( var i = 0; i < msg.length; i++)
  //   {
  //   	dataSeriesBtcUsdt.push(msg[i].result.price);
  //   	if (parseFloat(msg[i].result.price) < btcMin)
  //   		btcMin = parseFloat(msg[i].result.price);
  //   	if (parseFloat(msg[i].result.price) > btcMax)
  //   		btcMax = parseFloat(msg[i].result.price);
  //   }
  //   console.log(btcMin, btcMax);

	// 	var flotRealtime1 = function(){

	// 		var plot4 = $.plot('#flotRealtime1', dataSeriesBtcUsdt, {
	// 			colors: ['#2258BF'],
	// 			series: {
	// 				lines: {
	// 					show: true,
	// 					lineWidth: 5
	// 				},
	// 				shadowSize: 0	// Drawing is faster without shadows
	// 			},
	// 			grid: {
	// 				// borderColor: 'transparent',
	// 				borderWidth: 1,
	// 				labelMargin: 5
	// 			},
	// 			xaxis: {
	//         // mode: "time",
	//         // timeBase: "milliseconds",
	// 				// color: 'transparent',
	// 				// font: {
	// 				// 	size: 10,
	// 				// 	color: '#000000'
	// 				// }
	// 			},
	// 			yaxis: {
	// 				min: 0.000008,
	// 				max: 0.000009,
	// 				// color: 'transparent',
	// 				// font: {
	// 				// 	size: 10,
	// 				// 	color: '#000000'
	// 				// }
	// 			}
	// 		});

	// 		// update_plot4();
	// 		// function update_plot4() {
	// 		// 	plot4.setData([getRandomData()]);
	// 		// 	plot4.draw();
	// 		// 	setTimeout(update_plot4, updateInterval);
	// 		// }

	//     // plot4.setData(dataSeriesBtcUsdt);
	// 		plot4.draw();
	    
	// 		// chartMarketPriceBtc.updateSeries([{
	// 	  //   name: 'BTC/USDT',
	// 		// 	data: dataSeriesBtcUsdt
	// 	  // }]);

	// 	}

	// 	flotRealtime1();

	// });


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

	socket.on('price-btc-usdt-init', async (msg) => {

    console.log(msg);

    for( var i = 0; i < msg.length; i++)
    {
    	dataSeriesBtcUsdt.push( [msg[i].timestamp, msg[i].result.price] );
    	if (parseFloat(msg[i].result.price) < btcMin)
    		btcMin = parseFloat(msg[i].result.price);
    	if (parseFloat(msg[i].result.price) > btcMax)
    		btcMax = parseFloat(msg[i].result.price);
    }
    console.log(btcMin, btcMax);

    // plot4.setData([dataSeriesBtcUsdt]);
		// plot4.draw();
    
		// await chartMarketPriceBtc.updateSeries([{
		// 	data: dataSeriesBtcUsdt
	  // }]);

  });

	socket.on('price-btc-usdt', async (msg) => {

    console.log(msg);
    var timestampBtc = new Date(msg.timestamp);

    dataSeriesBtcUsdt.push( [msg.timestamp, msg.result.price] );

    for( var i = 0; i < dataSeriesBtcUsdt.length; i++)
    {
    	if (parseFloat(dataSeriesBtcUsdt[i][1]) < btcMin)
    		btcMin = parseFloat(dataSeriesBtcUsdt[i][1]);
    	if (parseFloat(dataSeriesBtcUsdt[i][1]) > btcMax)
    		btcMax = parseFloat(dataSeriesBtcUsdt[i][1]);
    }
    console.log(btcMin, btcMax);
    // console.log(dataSeriesBtcUsdt);
    $("#price-dash-primary").html(parseFloat(msg.result.price).toFixed(2));
    $("#price-dash-primary-max").html(btcMax.toFixed(2));
    $("#price-dash-primary-min").html(btcMin.toFixed(2));
    $(".price-dash-primary-time").html(
    	timestampBtc.getDate()
    	+'/'
    	+timestampBtc.getMonth()
    	+'/'
    	+timestampBtc.getFullYear()
    	+' '
    	+timestampBtc.getHours()
    	+':'
    	+timestampBtc.getMinutes()
    	+':'
    	+timestampBtc.getSeconds()
    );

  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat-message-2', input.value);
      input.value = '';
    }
  });
	
	/* Function ============ */
		return {
			init: function(){
			},
			
			
			load: function(){

				currentChart();
				// marketChart();
				recentContact();
				carouselReview();
				// realtimeLineChart();
				// flotRealtime1();

			},
			
			resize:function(){
			}
		}
	
	}();

	jQuery(document).ready(function(){

		// window.setInterval(function () {
			// setTimeout(function(){

			//   $.ajax({
			//   	url: "http://localhost:8000/dbrecords/price-btc-usdt",
			//   	async: true,
			//   	success: function(resultPrice){

			//   		// for (var i = 0; i < resultPrice.length)
			//   		// {

			//   		// }
			//   		console.log(resultPrice.result[0].result.price);
		  //     	$("#price-dash-primary").html(resultPrice.result[0].result.price);

		  //   	}
		  //   });

			// }, 3000);
		// }, 30000);

	});
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
		dzChartlist.load();
	}, 1000); 

	jQuery(window).on('resize',function(){
		dzChartlist.resize();
	});
	
});

     

})(jQuery);