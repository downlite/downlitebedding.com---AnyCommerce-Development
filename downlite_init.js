
myApp.rq.push(['script',0,(document.location.protocol == 'file:') ? myApp.vars.testURL+'jsonapi/config.js' : myApp.vars.baseURL+'jsonapi/config.js',function(){
//in some cases, such as the zoovy UI, zglobals may not be defined. If that's the case, certain vars, such as jqurl, must be passed in via P in initialize:
//	myApp.u.dump(" ->>>>>>>>>>>>>>>>>>>>>>>>>>>>> zGlobals is an object");
	myApp.vars.username = zGlobals.appSettings.username.toLowerCase(); //used w/ image URL's.
//need to make sure the secureURL ends in a / always. doesn't seem to always come in that way via zGlobals
	myApp.vars.secureURL = zGlobals.appSettings.https_app_url;
	myApp.vars.domain = zGlobals.appSettings.sdomain; //passed in ajax requests.
	myApp.vars.jqurl = (document.location.protocol === 'file:') ? myApp.vars.testURL+'jsonapi/' : '/jsonapi/';
	}]); //The config.js is dynamically generated.
	
myApp.rq.push(['extension',0,'order_create','extensions/checkout/extension.js']);
myApp.rq.push(['extension',0,'cco','extensions/cart_checkout_order.js']);

myApp.rq.push(['extension',0,'store_routing','extensions/store_routing.js']);

myApp.rq.push(['extension',0,'store_downlite','extensions/_store_downlite.js','startExtension']);

myApp.rq.push(['extension',0,'store_prodlist','extensions/store_prodlist.js']);
myApp.rq.push(['extension',0,'store_navcats','extensions/store_navcats.js']);
myApp.rq.push(['extension',0,'store_search','extensions/store_search.js']);
myApp.rq.push(['extension',0,'store_product','extensions/store_product.js']);
myApp.rq.push(['extension',0,'cart_message','extensions/cart_message/extension.js']);
myApp.rq.push(['extension',0,'store_crm','extensions/store_crm.js']);
myApp.rq.push(['extension',0,'quickstart','app-quickstart.js','startMyProgram']);

myApp.rq.push(['extension',0,'tracking_hubspot','extensions/tracking_hubspot.js','startExtension']);

//myApp.rq.push(['extension',0,'entomologist','extensions/entomologist/extension.js']);
//myApp.rq.push(['extension',0,'tools_animation','extensions/tools_animation.js']);

//myApp.rq.push(['extension',1,'google_analytics','extensions/partner_google_analytics.js','startExtension']);
//myApp.rq.push(['extension',1,'tools_ab_testing','extensions/tools_ab_testing.js']);
myApp.rq.push(['extension',0,'partner_addthis','extensions/partner_addthis.js','startExtension']);
//myApp.rq.push(['extension',1,'resellerratings_survey','extensions/partner_buysafe_guarantee.js','startExtension']); /// !!! needs testing.
//myApp.rq.push(['extension',1,'buysafe_guarantee','extensions/partner_buysafe_guarantee.js','startExtension']);
//myApp.rq.push(['extension',1,'powerReviews_reviews','extensions/partner_powerreviews_reviews.js','startExtension']);
//myApp.rq.push(['extension',0,'magicToolBox_mzp','extensions/partner_magictoolbox_mzp.js','startExtension']); // (not working yet - ticket in to MTB)

myApp.rq.push(['extension',0,'google_dynamicremarketing','extensions/partner_google_dynamicremarketing.js']); 
myApp.rq.push(['extension',0,'prodlist_infinite','extensions/prodlist_infinite.js']);
myApp.rq.push(['extension',0,'_store_filter','extensions/_store_filter.js','startExtension']);
myApp.rq.push(['extension',0,'store_account_creation','extensions/store_account_creation.js']);

myApp.rq.push(['script',0,'jquery-cycle2/jquery.cycle2.min.js']);
myApp.rq.push(['script',0,myApp.vars.baseURL+'carouFredSel-6.2.1/jquery.carouFredSel-6.2.1-packed.js']);

myApp.rq.push(['script',0,myApp.vars.baseURL+'resources/jquery.showloading-v1.0.jt.js']); //used pretty early in process..
myApp.rq.push(['script',0,myApp.vars.baseURL+'resources/jquery.ui.anyplugins.js']); //in zero pass because it's essential to rendering and error handling.
myApp.rq.push(['script',0,myApp.vars.baseURL+'resources/tlc.js']); //in zero pass cuz you can't render a page without it..
myApp.rq.push(['css',1,myApp.vars.baseURL+'resources/anyplugins.css']);

myApp.rq.push(['script',0,myApp.vars.baseURL+'resources/jsonpath.0.8.0.js']); //used pretty early in process..

//once peg is loaded, need to retrieve the grammar file. Order is important there. This will validate the file too.
myApp.u.loadScript(myApp.vars.baseURL+'resources/peg-0.8.0.js',function(){
	myApp.model.getGrammar(myApp.vars.baseURL+"resources/pegjs-grammar-20140203.pegjs");
	}); // ### TODO -> callback on RQ.push wasn't getting executed. investigate.

//Cart Messaging Responses.
myApp.cmr.push(['chat.join',function(message){
//	dump(" -> message: "); dump(message);
	var $ui = myApp.ext.quickstart.a.showBuyerCMUI();
	$("[data-app-role='messageInput']",$ui).show();
	$("[data-app-role='messageHistory']",$ui).append("<p class='chat_join'>"+message.FROM+" has joined the chat.<\/p>");
	$('.show4ActiveChat',$ui).show();
	$('.hide4ActiveChat',$ui).hide();
	}]);

myApp.cmr.push(['goto',function(message,$context){
	var $history = $("[data-app-role='messageHistory']",$context);
	$P = $("<P>")
		.addClass('chat_post')
		.append("<span class='from'>"+message.FROM+"<\/span> has sent over a "+(message.vars.pageType || "")+" link for you within this store. <span class='lookLikeLink'>Click here<\/span> to view.")
		.on('click',function(){
			showContent(myApp.ext.quickstart.u.whatAmIFor(message.vars),message.vars);
			});
	$history.append($P);
	$history.parent().scrollTop($history.height());
	}]);


//gets executed from app-admin.html as part of controller init process.
//progress is an object that will get updated as the resources load.
/*
'passZeroResourcesLength' : [INT],
'passZeroResourcesLoaded' : [INT],
'passZeroTimeout' : null //the timeout instance running within loadResources that updates this object. it will run indef unless clearTimeout run here OR all resources are loaded.

*/
myApp.u.showProgress = function(progress)	{
	function showProgress(attempt)	{
		if(progress.passZeroResourcesLength == progress.passZeroResourcesLoaded)	{
			//All pass zero resources have loaded.
			//the app will handle hiding the loading screen.
			myApp.u.appInitComplete();
			}
		else if(attempt > 150)	{
			//hhhhmmm.... something must have gone wrong.
			clearTimeout(progress.passZeroTimeout); //end the resource loading timeout.
			}
		else	{
			var percentPerInclude = (100 / progress.passZeroResourcesLength);
			var percentComplete = Math.round(progress.passZeroResourcesLength * percentPerInclude); //used to sum how many includes have successfully loaded.
//			dump(" -> percentPerInclude: "+percentPerInclude+" and percentComplete: "+percentComplete);
			$('#appPreViewProgressBar').val(percentComplete);
			$('#appPreViewProgressText').empty().append(percentComplete+"% Complete");
			attempt++;
			setTimeout(function(){showProgress(attempt);},250);
			}
		}
	showProgress(0)
	}


//Any code that needs to be executed after the app init has occured can go here.
//will pass in the page info object. (pageType, templateID, pid/navcat/show and more)
myApp.u.appInitComplete = function()	{
	myApp.u.dump("Executing myAppIsLoaded code...");
	
	myApp.ext.order_create.checkoutCompletes.push(function(vars,$checkout){
		dump(" -> begin checkoutCOmpletes code: "); dump(vars);
		
		var cartContentsAsLinks = myApp.ext.cco.u.cartContentsAsLinks(myApp.data[vars.datapointer].order);
		dump(" -> cartContentsAsLinks: "+cartContentsAsLinks);
		
//append this to 
		$("[data-app-role='thirdPartyContainer']",$checkout).append("<h2>What next?</h2><div class='ocm ocmFacebookComment pointer zlink marginBottom checkoutSprite  '></div><div class='ocm ocmTwitterComment pointer zlink marginBottom checkoutSprit ' ></div><div class='ocm ocmContinue pointer zlink marginBottom checkoutSprite'></div>");
		$('.ocmTwitterComment',$checkout).click(function(){
			window.open('http://twitter.com/home?status='+cartContentsAsLinks,'twitter');
			_gaq.push(['_trackEvent','Checkout','User Event','Tweeted about order']);
			});
		//the fb code only works if an appID is set, so don't show banner if not present.				
		if(myApp.u.thisNestedExists("zGlobals.thirdParty.facebook.appId") && typeof FB == 'object')	{
			$('.ocmFacebookComment',$checkout).click(function(){
				myApp.ext.quickstart.thirdParty.fb.postToWall(cartContentsAsLinks);
				_gaq.push(['_trackEvent','Checkout','User Event','FB message about order']);
				});
			}
		else	{$('.ocmFacebookComment').hide()}
		});
		
		//Go get the brands and display them.	
			var addBrands = function(){	
				myApp.ext.store_navcats.calls.appCategoryList.init('.brands',{'callback':'getChildData','extension':'store_navcats','parentID':'brandCategories','templateID':'categoryListTemplateThumb'},'passive');
				myApp.model.dispatchThis('passive'); //use passive or going into checkout could cause request to get muted.		
			};
			setTimeout(addBrands, 1000);
		
		//EB+ND 
	//Adding category nav tabs
		myApp.ext.quickstart.renderFormats.simpleSubcats = function($tag,data)	{
			//app.u.dump("BEGIN control.renderFormats.subcats");
			var L = data.value.length;
			var thisCatSafeID; //used in the loop below to store the cat id during each iteration
			//app.u.dump(data);
			for(var i = 0; i < L; i += 1)	{
				thisCatSafeID = data.value[i].id;
				if(data.value[i].pretty.charAt(0) == '!')	{
					//categories that start with ! are 'hidden' and should not be displayed.
				}
				else{
					$tag.append(myApp.renderFunctions.transmogrify({'id':thisCatSafeID,'catsafeid':thisCatSafeID},data.bindData.loadsTemplate,data.value[i]));
				}
			}
		} //simpleSubcats
	
		//TOP NAV CAROUSEL.
			
		setTimeout(function(){
		$('#tier1categories').carouFredSel({
			width   : "100%",
			//height	: 500,
			//items   : hpTopNavItems,
			scroll: 1,
			auto : false,
			prev : ".headerTopNavPrev",
			next : ".headerTopNavNext"
		});
		}, 2000);
	
		//CONTROLING FUNCTION FOR POSITIONING THE TOP NAV CAROUSEL CORRECTLY AT ANY RESOLUTION
		$(window).resize(function(){
			if($(window).width() >= 990){
				setTimeout(function(){
					$("div.nav_menu div.caroufredsel_wrapper ul#tier1categories").css("left","20px");
				}, 100);
			}
			else if(($(window).width() < 990) && ($(window).width() >= 800)){
				setTimeout(function(){
					$("div.nav_menu div.caroufredsel_wrapper ul#tier1categories").css("left","0");
				}, 100);
				
			}
			else if(($(window).width() < 800) && ($(window).width() >= 640)){
				setTimeout(function(){
					$("div.nav_menu div.caroufredsel_wrapper ul#tier1categories").css("left","15px");
				}, 100);
			}
			else if(($(window).width() < 640) && ($(window).width() >= 480)){
				setTimeout(function(){
					$("div.nav_menu div.caroufredsel_wrapper ul#tier1categories").css("left","1px");
				}, 100);
			}
			else if(($(window).width() < 480) && ($(window).width() >= 320)){
				setTimeout(function(){
					$("div.nav_menu div.caroufredsel_wrapper ul#tier1categories").css("left","8px");
				}, 100);
			}
		})
	
		//BEGIN FACEBOOK COUPON CODE
		//var showCart = function(){showContent('cart',{'show':'cart'})};
		//setTimeout(showCart, 5000);
		
		var facebookCoupon = function(){
			var referral = document.referrer;
			app.u.dump("User is coming from " + referral);	
			
			if(referral.indexOf("www.facebook.com") != -1){
				app.u.dump("User is coming from facebook. Add coupon.");
				app.ext.cco.calls.cartCouponAdd.init("FACEBOOK",{'callback':function(rd) {
					if(app.model.responseHasErrors(rd)) {
						$('#cartMessaging').anymessage({'message':rd})
					}
					else {
						app.u.dump("Coupon added successfully")
						//Do nothing
					}
				}});
				app.model.dispatchThis('immutable');
			}
			else{
				app.u.dump("User is not coming from facebook. Do nothing.");
			}
		};
	
		setTimeout(facebookCoupon, 5000);
		//END FACEBOOK COUPON CODE
	
	}//END myApp.u.appInitComplete

/*$(document).ready(function(){
		myApp.u.handleRQ(0);
		//instantiate wiki parser.
	myCreole = new Parse.Simple.Creole(); //needs to happen before controller is instantiated.
		
		//Offer a mobile redirect
		var uagent = navigator.userAgent.toLowerCase();
		var promptmobile = false;
		if (promptmobile ||
			uagent.search("ipad") > -1 ||
			uagent.search("iphone") > -1 ||
			uagent.search("ipod") > -1 ||
			uagent.search("android") > -1 ||
			(uagent.search("webkit") > -1 && (uagent.search("series60") > -1 || uagent.search("symbian") > -1)) ||
			uagent.search("windows ce") > -1 ||
			uagent.search("palm") > -1 ){
			
			var $popup = $("<div><h3>It appears you are using a mobile device, would you like to use our mobile site?</h3><button class='yesbtn floatLeft'>Yes</button><button class='nobtn floatRight'>No</button></div>");
			$('.yesbtn', $popup).on('click', function(){
				window.location = "http://m.downlitebedding.com";
				});
			$('.nobtn', $popup).on('click', function(){
				$popup.dialog('close');
				});
			$popup.dialog({
				'title':'',
				'dialogClass' : 'hideTitleBarAndClose',
				'noCloseModal' : true,
				'modal' : true
			});
		}
	//if you wish to add init, complete or depart events to your templates w/ JS, this is a good place to do it.
	// ex:  $("#productTemplate").on('complete.someIndicator',function($ele,infoObj){doSomethingWonderful();})

	});
	*/
//this will trigger the content to load on app init. so if you push refresh, you don't get a blank page.
//it'll also handle the old 'meta' uri params.
//this will trigger the content to load on app init. so if you push refresh, you don't get a blank page.
//it'll also handle the old 'meta' uri params.
myApp.router.appendInit({
	'type':'function',
	'route': function(v){
		return {'init':true} //returning anything but false triggers a match.
		},
	'callback':function(f,g){
		dump(" -> triggered callback for appendInit");
		g = g || {};
		if(g.uriParams.seoRequest){
			showContent(g.uriParams.pageType, g.uriParams);
			}
		else if(document.location.hash)	{	
			myApp.u.dump('triggering handleHash');
			myApp.router.handleHashChange();
			}
		else	{
			//IE8 didn't like the shortcut to showContent here.
			myApp.ext.quickstart.a.showContent('homepage');
			}
		if(g.uriParams && g.uriParams.meta)	{
			myApp.ext.cco.calls.cartSet.init({'want/refer':infoObj.uriParams.meta,'cartID':_app.model.fetchCartID()},{},'passive');
			}
		if(g.uriParams && g.uriParams.meta_src)	{
			myApp.ext.cco.calls.cartSet.init({'want/refer_src':infoObj.uriParams.meta_src,'cartID':_app.model.fetchCartID()},{},'passive');
			}
		}
	});





