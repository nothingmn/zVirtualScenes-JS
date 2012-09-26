
var dataContext = function() {
	this.Message = new ko.observable(""),
	this.Devices = new ko.observableArray();
	this.Scenes = new ko.observableArray();
	this.loadDeviceCommands = function(data, event) {
		console.log(data, event);
	}
}