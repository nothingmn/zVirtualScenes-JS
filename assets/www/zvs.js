
var zvs = function(credentials) {


    if (!(this instanceof zvs)) {
        return new zvs(credentials);
    } 
	
	this.devices;
	this.controller = new controller(credentials);
		
	this.login = function(complete, fail) {
		this.controller.login(complete, fail);
	}
	this.listDevices = function(complete, fail) {	
		if(typeof this.devices =='undefined') {
			this.controller.listDevices(function(d) {
				this.devices = d;
				complete(this.devices);
			}, fail);
		} else {
			complete(this.devices);
		}
	}
	
	this.listDeviceCommands = function(deviceID, complete, fail) {
		this.controller.listDeviceCommands(deviceID, complete, fail);
	}
}


var controller = function(credentials) {
	this.credentials = credentials;
		
	this.login = function(complete, fail) {
		var action = "/API/login";
		var method = "POST";
		var data = {u:Math.random(), password:this.pass};
		this.ajax(action, method, data, complete, fail);		
	} 
	
	this.listDeviceCommands = function(deviceID, complete, fail) {
		var action = "/API/device/" + deviceID + "/commands?u=" + Math.random();
		var method = "GET";
		var data = {u:Math.random(), password:this.credentials.Pass};
		this.ajax(action, method, data, complete, fail);		
	}
	
	this.listDevices = function(complete, fail) {
		var action = "/API/devices?u={1}&page=1&start=0&limit=999";
		var method = "GET";
		var data = {u:Math.random(), password:this.credentials.Pass};
		this.ajax(action, method, data, complete, fail);		
	} 
	
	//action is the url to append to the host
	//method is the HTTP verb "GET", "POST"
	//params is the JSON object to send
	//complete/fail are the callbacks
	this.ajax = function(action, method, params, complete, fail) {
		if (typeof method == 'undefined') method = 'POST';
		var url = this.credentials.Host + ":" + this.credentials.Port + action;
		console.log('there', this.credentials);
		console.log(url);
		console.log(method);
		return $.ajax({
			type:method,
			url:url,
            dataType: "jsonp",
            contentType: "application/json; charset=utf-8",
            async: true,
			data: params,
			success: complete,
			error:fail,
            traditional: true
			
		});
	}
}

