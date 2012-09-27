
var dataContext = function() {

    if (!(this instanceof dataContext)) {
        return new dataContext();
    } 
	base = this;
	this.DeviceCommandArg = new ko.observable("");
	this.Message = new ko.observable(""),
	this.Devices = new ko.observableArray();
	this.Scenes = new ko.observableArray();
	this.SelectedDevice = new ko.observable({});
	this.SelectedDeviceCommands = new ko.observable({});
	this.SelectedDeviceCommand = new ko.observable({});
	
	this.SelectedDeviceCommandNeedsInput = function(input) {
		return ko.observable((input.type=="device"));
	}
	//events
	this.OnDeviceLoadCommands;
	this.OnSendCommand;
	this.OnRunScene;

	this.loadDeviceCommands = function(data, event) {
		//data is the selected command
		//event is the dom event
		base.SelectedDevice(data);
		if(typeof base.OnDeviceLoadCommands !='undefined') base.OnDeviceLoadCommands(data);
	}
	this.selectDeviceCommand = function(data, event) {
		base.SelectedDeviceCommand(data);
	}
	this.sendDeviceTypeDeviceCommand = function(data, event) {
		base.SelectedDeviceCommand(data);
		base.DeviceCommandArg("");
		base.sendDeviceCommand(data, event);
	}
	this.sendDeviceCommand = function(data, event) {
		var device = base.SelectedDevice();
		var command = base.SelectedDeviceCommand();
		var arg = base.DeviceCommandArg();
		if(command.type!="device") {
			arg = '';
		}
		if(typeof base.OnSendCommand !='undefined') base.OnSendCommand(device, command,  arg);
		
	}
	this.runScene = function(data, event) {
		//data is the selected command
		//event is the dom event
		//base.SelectedDevice(data);
		if(typeof base.OnRunScene !='undefined') base.OnRunScene(data);
	}
	
	
	
}