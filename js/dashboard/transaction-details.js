

(function($) {
    /* "use strict" */
	
 var dzChartlist = function(){
	
	var screenWidth = $(window).width();	

	var activityChart = function(){
		var optionsTimeline = {
			chart: {
				type: "bar",
				height: 350,
				stacked: true,
				toolbar: {
					show: false
				},
				sparkline: {
					//enabled: true
				},
				offsetX:0,
			},
			series: [
				 {
					name: "New Clients",
					data: [180, 150, 200, 100, 80, 70, 40,50,60,80,90,50,50,40,20,50,60,100,200,300,180,200,150]
				}
			],
			
			plotOptions: {
				bar: {
					columnWidth: "25%",
					endingShape: "rounded",
					startingShape: "rounded",
					 borderRadius: 5,
					
					colors: {
						backgroundBarColors: ['#F8F8F8', '#F8F8F8', '#F8F8F8', '#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8'],
						backgroundBarOpacity: 1,
						backgroundBarRadius: 5,
					},

				},
				distributed: true
			},
			colors:['#5bcfc5'],
			grid: {
				show:false,
				borderColor:'#F8F8F8'
			},
			legend: {
				show: false
			},
			fill: {
			  opacity: 1
			},
			dataLabels: {
				enabled: false,
				colors: ['#000'],
				dropShadow: {
				  enabled: true,
				  top: 1,
				  left: 1,
				  blur: 1,
				  opacity: 1
			  }
			},
			xaxis: {
			 categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S','S','M','T','W','T','F','S','M','T','W','T','F','S','M','T','W'],
			  labels: {
			   style: {
				  colors: '#787878',
				  fontSize: '13px',
				  fontFamily: 'poppins',
				  fontWeight: 100,
				  cssClass: 'apexcharts-xaxis-label',
				},
			  },
			  crosshairs: {
				show: false,
			  },
			  axisBorder: {
				  show: false,
				},
			},
			
			yaxis: {
				show: false
			},
			
			tooltip: {
				x: {
					show: true
				}
			}
		};
		var chartTimelineRender =  new ApexCharts(document.querySelector("#activityChart"), optionsTimeline);
		 chartTimelineRender.render();	
	}
 
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				
				activityChart();
					
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