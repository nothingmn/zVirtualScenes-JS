
var zvs = function(host, port, pass) {
	this.devices;
	this.controller = new controller(host, port, pass);
		
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
}


var controller = function(host, port, pass) {
	this.host = host;
	this.port = port;
	this.pass = pass;
	
	this.login = function(complete, fail) {
		var action = "/API/login";
		var method = "POST";
		var data = {u:Math.random(), password:this.pass};
		this.ajax(action, method, data, complete, fail);		
	} 
	
	this.listDevices = function(complete, fail) {
		var action = "/API/devices?u={1}&page=1&start=0&limit=999";
		var method = "GET";
		var data = {u:Math.random(), password:this.pass};
		this.ajax(action, method, data, complete, fail);		
	} 
	
	//action is the url to append to the host
	//method is the HTTP verb "GET", "POST"
	//params is the JSON object to send
	//complete/fail are the callbacks
	this.ajax = function(action, method, params, complete, fail) {
		var url = this.host + ":" + this.port + action;
		console.log(method);
		return $.ajax({
			type:method,
			url:url,
//			data:params,
			dataType:"jsonp",
			success: complete,
			error:fail
		});
	}
}

