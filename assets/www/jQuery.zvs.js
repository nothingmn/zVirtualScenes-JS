
(function ($) {
    $.zvs = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("zvs", base);

        base.init = function () {
            base.options = $.extend({}, $.zvs.defaultOptions, options);
			
			jQuery.support.cors = true;
			$.mobile.fallbackTransition = "none"
			$.mobile.defaultPageTransition = "slide"

			$.mobile.changePage('#Devices'); //force the default landing page if they refresh or whatever
			
			base.client = new zvs(credentials());	
			base.context = new dataContext();
			
			base.context.OnDeviceLoadCommands = function(selectedItem) {
				base.client.listDeviceCommands(selectedItem.id, function(commands) {
					base.context.SelectedDeviceCommands(commands.DeviceCommand);					
				}, base.fail);
			}
			
			base.context.OnSendCommand = function(device, command, arg) {				
				base.client.sendDeviceCommand(device.id, command.name, arg, command.type, function(complete) {
					if(complete.success){
						base.context.Message("Command "+command.name+" sent to:" + device.name);
					} else {
						base.context.Message("Command "+command.name+" was NOT sent to:" + device.name);
					}
				}, base.fail);
			}
			base.context.OnRunScene = function(scene) {
				base.client.startScene(scene.id, function(complete) {
					if(complete.success){
						base.context.Message("Scene: "+scene.name+" was started");
					} else {
						base.context.Message("Scene: "+scene.name+" was NOT started");
					}					
				}, base.fail);
			}
			base.client.login(function(data) {
				if(data.success) {
					base.context.Message("Login was successful, retreiving a list of devices");
					base.client.listDevices(function(devices) {
						base.context.Message("Recieved a list of devices");
						base.context.Devices.removeAll();
						var dev = devices.devices;
						var max = dev.length;
						for(var x=0;x<max;x++) {							
							base.context.Devices.push(dev[x]);
						}
						
						base.client.listScenes(function(scenes) {
							base.context.Scenes.removeAll();
							var sc = scenes.scenes;
							var max = sc.length;
							for(var x=0;x<max;x++) {
								base.context.Scenes.push(sc[x]);
							}	
							ko.applyBindings(base.context);							
						}, base.fail);
						
					}, base.fail);
				}
			}, base.fail);
			
			base.fail = function(a,b,c) {
			}
           
        }; //init

        // Run initializer
        base.init();
    };

    $.zvs.defaultOptions = {

    };

    $.fn.zvs = function (options) {
        var instance = $(this).data("zvs");
        if (typeof instance == 'undefined')
            return new $.zvs(this, options);
        else
            return instance;
    };

})(jQuery);