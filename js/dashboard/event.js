

(function($) {
    /* "use strict" */
	
 var dzChartlist = function(){
	
	var screenWidth = $(window).width();	
		var chartBar = function(){
		if(jQuery('#chart_widget_2').length > 0 ){
	
			const chart_widget_2 = document.getElementById("chart_widget_2").getContext('2d');
			//generate gradient
			

			// widgetChart1.attr('height', '100');

			new Chart(chart_widget_2, {
				type: 'bar',
				data: {
					defaultFontFamily: 'Poppins',
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan"],
					datasets: [
						{
							label: "My First dataset",
							data: [15, 40, 55, 40, 25, 35, 40, 50, 85, 95, 54, 35,15],
							borderColor: '#13B497',
							borderWidth: "0",
							backgroundColor: ['#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74',], 
							hoverBackgroundColor: '#13B497'
						}
					]
				},
				options: {
					legend: false,
					responsive: true, 
					maintainAspectRatio: false,  
					scales: {
						yAxes: [{
							display: false, 
							ticks: {
								beginAtZero: true, 
								display: false, 
								max: 100, 
								min: 0, 
								stepSize: 10
							}, 
							gridLines: {
								display: false, 
								drawBorder: false
							}
						}],
						xAxes: [{
							display: false, 
							barPercentage: 0.4, 
							gridLines: {
								display: false, 
								drawBorder: false
							}, 
							ticks: {
								display: false
							}
						}]
					}
				}
			});

		}
		
		
	}
	var widgetChart3 = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [100,200, 100, 300, 200, 400, 200, 300,100, 300,200,300],
				//radius: 12,	
			}, 				
		],
			chart: {
			type: 'line',
			height: 80,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
			
		},
		
		colors:['#0E8A74'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: false,
		},
		stroke: {
		  show: true,
		  width: 6,
		  curve:'smooth',
		  colors:['#0E8A74'],
		},
		
		grid: {
			show:false,
			borderColor: '#eee',
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: false,
				style: {
					fontSize: '12px',
				}
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: false,
		},
		fill: {
		  opacity: 1,
		  colors:'#FB3E7A'
		},
		tooltip: {
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + " thousands"
				}
			}
		}
		};

		var chartBar1 = new ApexCharts(document.querySelector("#widgetChart3"), options);
		chartBar1.render();
	 
	}
	 var doughnutChart = function(){
		if(jQuery('#doughnut_chart').length > 0 ){
			//doughut chart
			const doughnut_chart = document.getElementById("doughnut_chart").getContext('2d');
			// doughnut_chart.height = 100;
			new Chart(doughnut_chart, {
				type: 'doughnut',
				data: {
					weight: 5,	
					defaultFontFamily: 'Poppins',
					datasets: [{
						data: [35, 25, 25],
						borderWidth: 3, 
						borderColor: "rgba(255,255,255,1)",
						backgroundColor: [
							"rgba(251, 62, 122, 1)",
							"rgba(14, 138, 116, 1)",
							"rgba(255, 123, 49, 1)"
						],
						hoverBackgroundColor: [
							"rgba(251, 62, 122, 0.5)",
							"rgba(14, 138, 116, 0.5)",
							"rgba(255, 123, 49, 0.5)"
						]

					}],
					// labels: [
					//     "green",
					//     "green",
					//     "green",
					//     "green"
					// ]
				},
				options: {
					weight: 1,	
					 cutoutPercentage: 60,
					responsive: true,
					maintainAspectRatio: false
				}
			});
		}
	}
	var lineChart = function(){
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
					data: [180, 150, 200, 100, 80, 70, 40]
				}
			],
			
			plotOptions: {
				bar: {
					columnWidth: "25%",
					endingShape: "rounded",
					startingShape: "rounded",
					
					colors: {
						backgroundBarColors: ['#F8F8F8', '#F8F8F8', '#F8F8F8', '#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8'],
						backgroundBarOpacity: 1,
						backgroundBarRadius: 5,
					},

				},
				distributed: true
			},
			colors:['#FB3E7A'],
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
			 categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
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
		var chartTimelineRender =  new ApexCharts(document.querySelector("#lineChart"), optionsTimeline);
		 chartTimelineRender.render();	
	}
	var gallerySlider = function(){
		$(document).ready(function() {

			var sync1 = $("#sync1");
			var sync2 = $("#sync2");
			var slidesPerPage = 4; //globaly define number of elements per page
			var syncedSecondary = true;

			sync1.owlCarousel({
				items: 1,
				slideSpeed: 2000,
				nav: true,
				autoplay: true, 
				rtl:true,
				dots: true,
				loop: true,
				responsiveRefreshRate: 200,
				//navText: [],
				navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
			}).on('changed.owl.carousel', syncPosition);

			sync2
				.on('initialized.owl.carousel', function() {
					sync2.find(".owl-item").eq(0).addClass("current");
				})
				.owlCarousel({
					items: slidesPerPage,
					dots: true,
					nav: false,
					items: 6,
					autoWidth:false,
					width:'33%',
					smartSpeed: 200,
					slideSpeed: 500,
					slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
					responsiveRefreshRate: 100
				}).on('changed.owl.carousel', syncPosition2);

			function syncPosition(el) {
				//if you set loop to false, you have to restore this next line
				//var current = el.item.index;

				//if you disable loop you have to comment this block
				var count = el.item.count - 1;
				var current = Math.round(el.item.index - (el.item.count / 2) - .5);

				if (current < 0) {
					current = count;
				}
				if (current > count) {
					current = 0;
				}

				//end block

				sync2
					.find(".owl-item")
					.removeClass("current")
					.eq(current)
					.addClass("current");
				var onscreen = sync2.find('.owl-item.active').length - 1;
				var start = sync2.find('.owl-item.active').first().index();
				var end = sync2.find('.owl-item.active').last().index();

				if (current > end) {
					sync2.data('owl.carousel').to(current, 100, true);
				}
				if (current < start) {
					sync2.data('owl.carousel').to(current - onscreen, 100, true);
				}
			}

			function syncPosition2(el) {
				if (syncedSecondary) {
					var number = el.item.index;
					sync1.data('owl.carousel').to(number, 100, true);
				}
			}

			sync2.on("click", ".owl-item", function(e) {
				e.preventDefault();
				var number = $(this).index();
				sync1.data('owl.carousel').to(number, 300, true);
			});
		});
	}
	
 
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
					chartBar();
					widgetChart3();
					doughnutChart();
					lineChart();
					gallerySlider();
					
			},
			
			resize:function(){
			}
		}
	
	}();

	jQuery(document).ready(function(){
	});
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
			dzChartlist.load();
		}, 1000); 
		
	});

	jQuery(window).on('resize',function(){
		
		
	});     

})(jQuery);