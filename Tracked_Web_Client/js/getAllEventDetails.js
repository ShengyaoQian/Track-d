		var myApp = angular.module('myApp', []);
		myApp.controller('MainControl', function ($scope, $http) {
	     // any code here

	  	});

		// Model for all event objects
	  	function evnt(name, sDay, eDay, sTime, eTime, loc_name, lat, longi, shortD, longD) {
	  		this.e_name = name;
	  		this.e_sDay = sDay;
	  		this.e_eDay = eDay;
	  		this.e_sTime = sTime;
	  		this.e_eTime = eTime;
	  		this.e_loc_name = loc_name;
	  		this.e_lat = lat;
	  		this.e_log = longi;
	  		this.e_shortD = shortD;
	  		this.e_longD = longD;
	  	}

		myApp.controller('EventsCtrlAjax', function ($scope, $http) {
			$http.get('http://tracked-server-dev.elasticbeanstalk.com/events').
		    success(function(data, status, headers, config) {
			   	$scope.events = []

			   	// load event objects into $scope.events
			   	for(item in data.events) {
			   		var temp = data.events[item];
			   		$scope.events.push(
			   			new evnt (
				   			temp.event_name,
				   			Date.parse(temp.start_time),
				   			Date.parse(temp.start_time),
				   			Date.parse(temp.end_time),
				   			Date.parse(temp.end_time),
				   			temp.loc_info.name,
				   			temp.loc_info.lat,
				   			temp.loc_info.log,
				   			temp.event_desc_short,
				   			temp.event_desc_long
			   			)
		   			);			   		
			   	}
		    }).
		    error(function(data, status, headers, config) {
	   
	    	});
		});