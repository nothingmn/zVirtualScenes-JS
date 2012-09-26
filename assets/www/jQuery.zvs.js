
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

			base.client = new zvs(credentials());	
			base.context = new dataContext();
			
			base.client.login(function(data) {
				if(data.success) {
					base.context.Message("Login was successful, retreiving a list of devices");
					base.client.listDevices(function(devices) {
						console.log(devices);
						base.context.Message("Recieved a list of devices");
						base.context.Devices.removeAll();
						var dev = devices.devices;
						var max = dev.length;
						for(var x=0;x<=max;x++) {
							base.context.Devices.push(dev[x]);
						}
					}, base.fail);
				}
			}, base.fail);
			
			base.fail = function(a,b,c) {
				console.log('fail', a,b,c);
			}

           ko.applyBindings(base.context);
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