
if(typeof console=='undefined') console = { log : function(){} }

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
	this.listScenes = function(complete, fail) {	
		if(typeof this.scenes =='undefined') {
			this.controller.listScenes(function(s) {
				this.scenes = s;
				complete(this.scenes);
			}, fail);
		} else {
			complete(this.scenes);
		}
	}
	
	this.listDeviceCommands = function(deviceID, complete, fail) {
		this.controller.listDeviceCommands(deviceID, complete, fail);
	}
	
	this.sendDeviceCommand = function(deviceID, name, arg, type, complete, fail) {
		this.controller.sendDeviceCommand(deviceID, name, arg, type, complete, fail);
	}
	this.startScene = function(SceneID, complete, fail){ 
		this.controller.startScene(SceneID, complete, fail);
	}
}


var controller = function(credentials) {
	this.credentials = credentials;
		
	this.login = function(complete, fail) {
		var action = "/API/login";
		var method = "POST";		
		var data = {u:Math.random(), password:this.credentials.Password, type:"json"};
		this.ajax(action, method, data, complete, fail);		
	} 
	this.sendDeviceCommand = function(deviceID, name, arg, type, complete, fail) {
		var action = "/API/device/" + deviceID + "/command";
		var method = "POST";
		var data = {u:Math.random(), name:name, arg:arg, type:type};
		this.ajax(action, method, data, complete, fail);		
	}	
	this.listDeviceCommands = function(deviceID, complete, fail) {
		var action = "/API/device/" + deviceID + "/commands?u=" + Math.random();
		var method = "GET";
		var data = {};//{u:Math.random(), password:this.credentials.Pass};
		this.ajax(action, method, data, complete, fail);		
	}
	this.listScenes = function(complete, fail) {
		var action = "/API/scenes?u="+Math.random()+"&page=1&start=0&limit=999";
		var method = "GET";
		var data = {type:"json"};//{u:Math.random(), password:this.credentials.Pass};
		this.ajax(action, method, data, complete, fail);		
	} 
	this.startScene = function(SceneID, complete, fail) {
		var action = "/API/scene/" + SceneID;
		var method = "POST";		
		var data = {u:Math.random(), is_running:true, type:"json"};
		this.ajax(action, method, data, complete, fail);		
	} 
	this.listDevices = function(complete, fail) {
		var action = "/API/devices?u="+Math.random()+"&page=1&start=0&limit=999";
		var method = "GET";
		var data = {type:"json"};//{u:Math.random(), password:this.credentials.Pass};
		this.ajax(action, method, data, complete, fail);		
	} 
	
	//action is the url to append to the host
	//method is the HTTP verb "GET", "POST"
	//params is the JSON object to send
	//complete/fail are the callbacks
	this.ajax = function(action, method, params, complete, fail) {
		if (typeof method == 'undefined') method = 'POST';
		var url = this.credentials.Host + ":" + this.credentials.Port + action;
		return $.ajax({
			type:method,
			url:url,
            dataType: "json",
            async: true,
			data: params,
			xhrFields: { withCredentials: true },
			success: complete,
			error:fail,
            traditional: true
			
		});
	}
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
