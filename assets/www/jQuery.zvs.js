
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

			base.client = new zvs(credentials);	
			base.context = {};
			base.context.devices = new ko.observableArray();
			base.context.scenes = new ko.observableArray();
			
			base.client.login(function(data) {
				if(data.success) {
					$("#Message").text("You have been logged in, discovering devices");
					base.client.listDevices(function(devices) {
						console.log(devices);
						base.context.devices.removeAll();
						var dev = devices.devices;
						var max = dev.length;
						for(var x=0;x<=max;x++) {
							base.context.devices.push(dev[x]);
						}
					}, base.fail);
				}
			}, base.fail);
			
			base.fail = function(a,b,c) {
				console.log('fail', a,b,c);
			}

            //setup our controller class
            //base.Controller = pni.Common.MvcController(base.options.ModuleID, base.options.SiteRoot);			
            //base.zvsRepository = new pni.zvs.Repositories.zvsRepository(base.Controller, base.options.CacheEnabled);

            //base.model = new zvs();

            //$("#SendModel").click(function (event) {
            //	event.preventDefault();
            //	var basicModel = pni.fromKO(base.model);
            //	console.log("before", base.model, basicModel);                
            //   base.zvsRepository.EchoModel(basicModel, function (data) {
            //		console.log("after raw:", data);
            //       base.model = new zvs(data);
            //		console.log("after", base.model());
            //   });
            //   return false;
            //});

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