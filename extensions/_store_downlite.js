/* **************************************************************

   Copyright 2013 Zoovy, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

************************************************************** */



//    !!! ->   TODO: replace 'username' in the line below with the merchants username.     <- !!!

var store_downlite = function(_app) {
	var theseTemplates = new Array('');
	var r = {


////////////////////////////////////   CALLBACKS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	vars : {},

	callbacks : {
//executed when extension is loaded. should include any validation that needs to occur.
		init : {
			onSuccess : function()	{
				var r = false; //return false if extension won't load for some reason (account config, dependencies, etc).
				
				_app.u.dump("Begin store_downlite.callbacks.init");
				_app.templates.homepageTemplate.on('complete.downlite',function(infoObj){
					 _app.ext.store_downlite.u.loadBanners();
					 _app.ext.store_downlite.u.startHomepageSlideshow();
				 });
				 
				 //FUNCTIONALITY FOR 
				 $( window ).resize(function() {
				 	var resolution = $(window).width();
					if (resolution >= 990){
						$("#brandCategories").show();
					}
					else if ((resolution < 990) && (resolution >= 800)) {
						$("#brandCategories").show();
					}
					else if ((resolution < 800) && (resolution >= 640)) {
						if($(".showHideBrandsMobile").data("brandsState") == false){
							$("#brandCategories").hide();
						}
						else if($(".showHideBrandsMobile").data("brandsState") == true){
							$("#brandCategories").show();
						}
					}
				 });
				//if there is any functionality required for this extension to load, put it here. such as a check for async google, the FB object, etc. return false if dependencies are not present. don't check for other extensions.
				r = true;

				return r;
				},
			onError : function()	{
//errors will get reported for this callback as part of the extensions loading.  This is here for extra error handling purposes.
//you may or may not need it.
					_app.u.dump('BEGIN store_downlite.callbacks.init.onError');
				}
			},
			
			startExtension : {
				onSuccess : function()	{
					_app.u.dump('Begin store_downlite.callbacks.startExtension.onSuccess');
					
					var r = false; //return false if extension won't load for some reason (account config, dependencies, etc).
				
					_app.u.dump("Begin store_downlite.callbacks.init");
					_app.templates.homepageTemplate.on('complete.downlite',function(event,$context,infoObj){
						 _app.ext.store_downlite.u.loadBanners();
						 _app.ext.store_downlite.u.startHomepageSlideshow();
					 });
					 
					 //FUNCTIONALITY FOR 
					 $( window ).resize(function() {
						var resolution = $(window).width();
						if (resolution >= 990){
							$("#brandCategories").show();
						}
						else if ((resolution < 990) && (resolution >= 800)) {
							$("#brandCategories").show();
						}
						else if ((resolution < 800) && (resolution >= 640)) {
							if($(".showHideBrandsMobile").data("brandsState") == false){
								$("#brandCategories").hide();
							}
							else if($(".showHideBrandsMobile").data("brandsState") == true){
								$("#brandCategories").show();
							}
						}
					 });
					//if there is any functionality required for this extension to load, put it here. such as a check for async google, the FB object, etc. return false if dependencies are not present. don't check for other extensions.
					r = true;
					
					_app.templates.homepageTemplate.on('complete.downlite',function(event,$context,infoObj){
						
						// BEGIN BLOG CONTENT CODE
						var fileref=document.createElement('script');
						fileref.setAttribute("type","text/javascript");
						fileref.setAttribute("src", "http://www.zazar.net/developers/jquery/zrssfeed/jquery.zrssfeed.min.js");
						if (typeof fileref!="undefined"){
						  document.getElementsByTagName("head")[0].appendChild(fileref);
						}
							
						var blogs = function(){
						$('.blog1').rssfeed('http://blog.downlitebedding.com/rss.xml', {
							limit: 1,
							header: false,
							snippet: false,
							date: false,
							showerror: true,
							errormsg: 'Sorry, the blog couldn\'t be loaded right now due to a technical problem. Please try again later.'
						});
						$('.blog2').rssfeed('http://blog.downlitebedding.com/rss.xml', {
							limit: 1,
							offset: 2,
							header: false,
							snippet: false,
							date: false
						});
						$('.blog3').rssfeed('http://blog.downlitebedding.com/rss.xml', {
							limit: 1,
							offset: 3,
							header: false,
							snippet: false,
							date: false
						});
						}
						setTimeout(blogs, 2000);
						// BEGIN BLOG CONTENT CODE
					});
					return r;
				},
				onError : function()	{
					_app.u.dump('Begin store_downlite.callbacks.startExtension.onError');
				}
			}
		}, //callbacks



////////////////////////////////////   ACTION    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//actions are functions triggered by a user interaction, such as a click/tap.
//these are going the way of the do do, in favor of app events. new extensions should have few (if any) actions.
		a : {
			showHideBrands : function (){
				if($(".showHideBrandsMobile").data("brandsState")){
				}
				else{
					$(".showHideBrandsMobile").data("brandsState",false).append();
				}
				
				if($(".showHideBrandsMobile").data("brandsState") == false){
					$("#brandCategories").show("slide", { direction:"up" }, 1000);
					$(".showHideBrandsMobile").data("brandsState",true).append();
				}
				else if($(".showHideBrandsMobile").data("brandsState") == true){
					$("#brandCategories").hide("slide", { direction:"up" }, 1000);
					$(".showHideBrandsMobile").data("brandsState",false).append();
				}
			},
			
			
			showYoutubeInModal : function(videoid)	{
				var resolution = $(window).width();
				var $ele = $('#youtubeVideoModal');
				if($ele.length == 0)	{
					$ele = $("<div />").attr('id','youtubeVideoModal').appendTo('body');
					}
					if(resolution > 480){
						$ele.empty().append("<iframe style='z-index:1;' width='560' height='315' src='https://www.youtube.com/embed/"+videoid+"' frameborder='0' allowfullscreen></iframe>"); //clear any past videos.
						$ele.dialog({
							modal:true,
							width:600,
							height:400,
							'close' : function(event, ui){$(this).dialog('destroy').remove()},
							autoOpen:false
							});
						$ele.dialog('open');
					}
					else if(resolution <= 480){
						$ele.empty().append("<iframe style='z-index:1;' width='420' height='240' src='https://www.youtube.com/embed/"+videoid+"' frameborder='0' allowfullscreen></iframe>"); //clear any past videos.
						$ele.dialog({
							modal:true,
							width:460,
							height:300,
							'close' : function(event, ui){$(this).dialog('destroy').remove()},
							autoOpen:false
							});
						$ele.dialog('open');
					}
				return false;
				}

			}, //Actions

////////////////////////////////////   RENDERFORMATS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//renderFormats are what is used to actually output data.
//on a data-bind, format: is equal to a renderformat. extension: tells the rendering engine where to look for the renderFormat.
//that way, two render formats named the same (but in different extensions) don't overwrite each other.
		renderFormats : {
		
				atcForm : function($tag,data)	{
					$tag.append("<input type='hidden' name='sku' value='"+data.value+"' />");
					//_app.u.dump($tag);
					//_app.u.dump(data.value);
					/*REPLACE THIS ATTRIBUTE WITH NEW CUSTOM ATTRIBUTE WHENEVER IT IS CREATED.*/if(_app.data['appProductGet|'+data.value]['%attribs'] && _app.data['appProductGet|'+data.value]['%attribs']["user:offer_pillow_protector"]){
						//_app.u.dump("user2 is checked. running the modal pop for pillow protectors.");
						$tag.attr("onSubmit","").unbind("submit");
						$tag.bind('submit', function(){
							var $notice = $('<div><h3>Would you like to add a pillow protector to your order?</h3></div>');
							
							var $buttonYes = $('<div class="pillowProtPopupButtonYes"><button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text">Let\'s see them</span></button></div>');
							$buttonYes.bind('click',function(){
								$notice.dialog('close');
								var cartShow = "none";
								_app.ext.store_downlite.u.addItemToCartPillowProtector($tag,cartShow); 
								showContent('category',{'navcat':'.415-protectors-and-covers.100-pillow-protectors'});
								return false;
								});
								
							$notice.append($buttonYes);
							
							var $buttonNo = $('<div class="pillowProtPopupButtonNo"><button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text">No thanks</span></button></div>');
							$buttonNo.bind('click',function(){
								$notice.dialog('close');
								var cartShow = $tag.data('show');
								_app.ext.store_downlite.u.addItemToCartPillowProtector($tag,cartShow); 
								return false;
								});
								
							$notice.append($buttonNo);
							
							$notice.dialog({'modal':'true','title':'Add a pillow protector', 'width':400});
							return false;
							});
					}
					else{
						_app.u.dump("user2 is not checked. Continuing as normal.");
					}
				}, //END atcForm
				
				
				renderYouTubeVideos : function($tag,data)	{
					//_app.u.dump(data);
					var $context = $tag.parent();
					var videoIds = data.value.split(',');
					_app.u.dump("videoIds = " + videoIds);
					var totalVideoAmount = videoIds.length;
					_app.u.dump("totalVideoAmount = " + totalVideoAmount);
					
					for(var i=0;i<totalVideoAmount;i++){
						var $videoContent = $("<div class='prodVideoContainer pointer clearfix youtubeVideo"+i+"' onClick=\"myApp.ext.myRIA.a.showYoutubeInModal($(this).attr('data-videoid'));\">"
							+ "<div class='vidThumb'><img src='blank.gif' width='120' height='90' /></div>"
							+"</div>"
						);
						$($tag).append($videoContent);
						$(".youtubeVideo" + i + " div img", $tag).attr('src',"https://i3.ytimg.com/vi/"+videoIds[i]+"/default.jpg");
						
						$(".youtubeVideo" + i, $tag).attr("data-videoid",videoIds[i]);
					}
					
					if(totalVideoAmount > 1){
						
						$(".ytVideoCont", $context).carouFredSel({
							width   : 478,
							height	: 110,
							items   : 1,
							scroll: 1,
							auto : false,
							prev : ".prodYTPrev",
							next : ".prodYTNext"
						});
						$(".ytVideoCont", $context).css("left","0");
						
					}
					else{
						$(".prodYTPrev", $context).hide();
						$(".prodYTNext", $context).hide();
					}
				},//renderYouTubeVideos
				
				renderYouTubeTitles : function($tag,data)	{
					var $context = $tag.parent();
					var videoTitles = data.value.split(',');
					_app.u.dump("videoTitles = " + videoTitles);
					var totalTitlesAmount = videoTitles.length;
					_app.u.dump("totalTitlesAmount = " + totalTitlesAmount);
					
					for(var i=0;i<totalTitlesAmount;i++){
						var $title = $("<h2>"+videoTitles[i]+"</h2>");
						$(".youtubeVideo" + i, $context).append($title);
					}
					
				},//renderYouTubeTitles
				
				renderYouTubeDesc : function($tag,data)	{
					var $context = $tag.parent();
					var videoDesc = data.value.split(',');
					_app.u.dump("videoDesc = " + videoDesc);
					var totalDescAmount = videoDesc.length;
					_app.u.dump("totalDescAmount = " + totalDescAmount);
					
					for(var i=0;i<totalDescAmount;i++){
						var $desc = $("<p>"+videoDesc[i]+"</p>");
						$(".youtubeVideo" + i, $context).append($desc);
					}
					
				},//renderYouTubeDesc
				
				showhidearea : function($tag,data)	{
					//dump("showHideCategoryVideo data object = ");
					//dump(data);
					if(data.value == null || data.value == ""){
						$tag.hide();
					}
					else{
						$tag.show();
					}
					
				},//showhidecategoryvideo
				
				currencyprodlist : function($tag,data)	{
					//dump("Begin currency product list format");
					//dump(data);
					//dump($tag);
					
					var r = "<span class='pricePrefix'>Our price:</span> $"+data.value;
					//dump(r);
					var cents = r.split(".")
					//dump(cents[1]);
					if(cents[1] == undefined){
						//dump ("No cents present. Add a .00")
						r = r + "<span class='cents'>.00</span>";
					}
					else if(cents[1].length === 1){
						//dump(cents[1].length);
						//dump ("cents only has one value. Adding a zero.")
						var pricePieces = r.split(".");
						r = pricePieces[0] + "<span class='cents'>.00</span>";
					}
					else if(cents[1] == ""){
						//dump("Price value has a decimal but no cent values. Fixing this shenanigans");
						var pricePieces = r.split(".");
						r = pricePieces[0] + "<span class='cents'>.00</span>";
					}
					//dump(r);
					$tag.append(r);
				}, //currencyprodlist
			
			
				currencymsrp : function($tag,data)	{
					//dump("Begin currency product list format");
					//dump(data);
					//dump($tag);
					
					var r = "<span class='msrpPrefix'>MSRP:</span> $"+data.value;
					//dump(r);
					var cents = r.split(".")
					//dump(cents[1]);
					if(cents[1] == undefined){
						//dump ("No cents present. Add a .00")
						r = r + "<span class='cents'>.00</span>";
					}
					else if(cents[1].length === 1){
						//dump(cents[1].length);
						//dump ("cents only has one value. Adding a zero.")
						var pricePieces = r.split(".");
						r = pricePieces[0] + "<span class='cents'>.00</span>";
					}
					else if(cents[1] == ""){
						//dump("Price value has a decimal but no cent values. Fixing this shenanigans");
						var pricePieces = r.split(".");
						r = pricePieces[0] + "<span class='cents'>.00</span>";
					}
					//dump(r);
					$tag.append(r);
				} //currencymsrp


			}, //renderFormats
			
			
						
////////////////////////////////////   UTIL [u]   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//utilities are typically functions that are exected by an event or action.
//any functions that are recycled should be here.
		u : {
			loadBanners : function(){
				$.getJSON("_banners.json?_v="+(new Date()).getTime(), function(json){
					_app.ext.store_downlite.vars.bannerJSON = json;
					}).fail(function(a,b,c){
						_app.ext.store_downlite.vars.bannerJSON = {};
						_app.u.dump("BANNERS FAILED TO LOAD");
						});
				},
			startHomepageSlideshow : function(attempts){
				//_app.u.dump("Begin startHomepageSlideshow function");
				attempts = attempts || 0;
				if(_app.ext.store_downlite.vars.bannerJSON){
					//_app.u.dump("Banners.json detected. Continuing with adding slideshow");
					var $slideshow = $('#wideSlideshow');
					if($slideshow.hasClass('slideshowRendered')){
						//already rendered, do nothing.
						//_app.u.dump("Slideshow already rendered. Doing nothing.");
						}
					else {
						//_app.u.dump(bannerJSON);
						for(var i=0; i < _app.ext.store_downlite.vars.bannerJSON.slides.length; i++){
							//_app.u.dump("slide = " + i);
							var $banner = _app.ext.store_downlite.u.makeBanner(_app.ext.store_downlite.vars.bannerJSON.slides[i], 661, 432, "FFFFFF");
							$slideshow.append($banner);
							}
						$slideshow.addClass('slideshowRendered').cycle(_app.ext.store_downlite.vars.bannerJSON.cycleOptions);
						$slideshow.cycle('next');
						$slideshow.cycle('prev');
						}
					}
				else {
					_app.u.dump("Banners.json not detected. Looping function in .3 seconds.");
					setTimeout(function(){_app.ext.store_downlite.u.startHomepageSlideshow();}, 250);
					}
				},
			makeBanner : function(bannerJSON, w, h, b){
				var $banner = $('<a></a>');
				
				var $img = $('<img />');
				var src = _app.u.makeImage({
					w : w,
					h : h,
					b : b,
					name : bannerJSON.src,
					alt : bannerJSON.alt,
					title : bannerJSON.title
					});
					
				$img.attr('src',src);
				$banner.append($img);
				
				if(bannerJSON.prodLink){
					$banner.data("onClick", "appLink").attr("href","#!product?pid="+bannerJSON.prodLink);
					}
				else if(bannerJSON.catLink){
					$banner.data("onClick", "appLink").attr("href","#!category?navcat="+bannerJSON.catLink);
					}
				else if(bannerJSON.searchLink){
					$banner.data("onClick", "appLink").attr("href","#!category?KEYWORDS="+bannerJSON.searchLink);
					}
				else {
					//just a banner!
					}
				return $banner;
				},
				
			addItemToCartPillowProtector : function($ele,cartType)	{
				//p.preventDefault();
				//the buildCartItemAppendObj needs a _cartid param in the form.
				//_app.u.dump($ele.data('show'));
				if($("input[name='_cartid']",$ele).length)	{}
				else	{
					$ele.append("<input type='hidden' name='_cartid' value='"+_app.model.fetchCartID()+"' \/>");
					}

				var cartObj = _app.ext.store_product.u.buildCartItemAppendObj($ele);
				if(cartObj)	{
					_app.ext.cco.calls.cartItemAppend.init(cartObj,{},'immutable');
					_app.model.destroy('cartDetail|'+cartObj._cartid);
					_app.calls.cartDetail.init(cartObj._cartid,{'callback':function(rd){
						if(_app.model.responseHasErrors(rd)){
							$('#globalMessaging').anymessage({'message':rd});
							}
						else	{
							if((cartType == "modal") || (cartType == "inline")){
								showContent('cart',{'show':$ele.data('show')});
							}
							else{}
							}
						}},'immutable');
					_app.model.dispatchThis('immutable');
					}
				else	{} //do nothing, the validation handles displaying the errors.
				}
			}, //u [utilities]
			
			
			
			
//app-events are added to an element through data-app-event="extensionName|functionName"
//they're used heavily in the admin.html file.
//while no naming convention is stricly forced, 
//when adding an event, be sure to do off('click.appEventName') and then on('click.appEventName') to ensure the same event is not double-added if app events were to get run again over the same template.
		e : {
				productAdd2Cart : function($ele,p)	{
				p.preventDefault();
				//the buildCartItemAppendObj needs a _cartid param in the form.
				if($("input[name='_cartid']",$ele).length)	{}
				else	{
					$ele.append("<input type='hidden' name='_cartid' value='"+_app.model.fetchCartID()+"' \/>");
					}

				var cartObj = _app.ext.store_product.u.buildCartItemAppendObj($ele);
				if(cartObj)	{
					_app.ext.cco.calls.cartItemAppend.init(cartObj,{},'immutable');
					_app.model.destroy('cartDetail|'+cartObj._cartid);
					_app.calls.cartDetail.init(cartObj._cartid,{'callback':function(rd){
						if(_app.model.responseHasErrors(rd)){
							$('#globalMessaging').anymessage({'message':rd});
							}
						else	{
							showContent('cart',{'show':$ele.data('show')});
							}
						}},'immutable');
					_app.model.dispatchThis('immutable');
					}
				else	{} //do nothing, the validation handles displaying the errors.
				}
			} //e [app Events]
		} //r object.
	return r;
	}