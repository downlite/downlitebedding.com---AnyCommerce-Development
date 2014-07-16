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

var tracking_roi = function(_app) {
	var theseTemplates = new Array('');
	var r = {
	
	vars : {
		userID : "286471"
		},

////////////////////////////////////   CALLBACKS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



	callbacks : {
//executed when extension is loaded. should include any validation that needs to occur.
		init : {
			onSuccess : function()	{
				var r = false; //return false if extension won't load for some reason (account config, dependencies, etc).
				
				/*
				myApp.rq.push(['templateFunction','homepageTemplate',	'onCompletes',	function(infoObj){ app.ext.tracking_roi.u.trackPageView(infoObj); }]);
				myApp.rq.push(['templateFunction','categoryTemplate',	'onCompletes',	function(infoObj){ app.ext.tracking_roi.u.trackPageView(infoObj); }]);
				myApp.rq.push(['templateFunction','productTemplate',	'onCompletes',	function(infoObj){ app.ext.tracking_roi.u.trackPageView(infoObj); }]);
				myApp.rq.push(['templateFunction','companyTemplate',	'onCompletes',	function(infoObj){ app.ext.tracking_roi.u.trackPageView(infoObj); }]);
				myApp.rq.push(['templateFunction','customerTemplate',	'onCompletes',	function(infoObj){ app.ext.tracking_roi.u.trackPageView(infoObj); }]);
				myApp.rq.push(['templateFunction','cartTemplate',		'onCompletes',	function(infoObj){ app.ext.tracking_roi.u.trackPageView(infoObj); }]);
				myApp.rq.push(['templateFunction','checkoutTemplate',	'onCompletes',	function(infoObj){ app.ext.tracking_roi.u.trackPageView(infoObj); }]);
				*/
				
				
				
				//if there is any functionality required for this extension to load, put it here. such as a check for async google, the FB object, etc. return false if dependencies are not present. don't check for other extensions.
				r = true;

				return r;
				},
			onError : function()	{
//errors will get reported for this callback as part of the extensions loading.  This is here for extra error handling purposes.
//you may or may not need it.
				myApp.u.dump('BEGIN tracking_roi.callbacks.init.onError');
				}
			},
		startExtension : {
			onSuccess : function(){
				
				_app.templates.homepageTemplate.on('complete',	function(event,$context,infoObj){_app.ext.tracking_roi.u.trackPageView(infoObj);});
				_app.templates.categoryTemplate.on('complete',	function(event,$context,infoObj){_app.ext.tracking_roi.u.trackPageView(infoObj);});
				_app.templates.productTemplate.on('complete',	function(event,$context,infoObj){_app.ext.tracking_roi.u.trackPageView(infoObj);});
				_app.templates.companyTemplate.on('complete',	function(event,$context,infoObj){_app.ext.tracking_roi.u.trackPageView(infoObj);});
				_app.templates.customerTemplate.on('complete',	function(event,$context,infoObj){_app.ext.tracking_roi.u.trackPageView(infoObj);});
				_app.templates.checkoutTemplate.on('complete',	function(event,$context,infoObj){_app.ext.tracking_roi.u.trackPageView(infoObj);});
				_app.templates.cartTemplate.on('complete',		function(event,$context,infoObj){_app.ext.tracking_roi.u.trackPageView(infoObj);});
				_app.templates.searchTemplate.on('complete',	function(event,$context,infoObj){_app.ext.tracking_roi.u.trackPageView(infoObj);});
				
				_app.ext.order_create.checkoutCompletes.push(function(infoObj){ _app.ext.tracking_roi.u.trackBuyerConvert(infoObj); });
				},
			onError : function(){
				_app.u.dump('BEGIN tracking_roi.callbacks.startExtension.onError');
				}
			}
		}, //callbacks



////////////////////////////////////   ACTION    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//actions are functions triggered by a user interaction, such as a click/tap.
//these are going the way of the do do, in favor of app events. new extensions should have few (if any) actions.
		a : {

			}, //Actions

////////////////////////////////////   RENDERFORMATS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//renderFormats are what is used to actually output data.
//on a data-bind, format: is equal to a renderformat. extension: tells the rendering engine where to look for the renderFormat.
//that way, two render formats named the same (but in different extensions) don't overwrite each other.
		renderFormats : {

			}, //renderFormats
////////////////////////////////////   UTIL [u]   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//utilities are typically functions that are exected by an event or action.
//any functions that are recycled should be here.
		u : {
			trackPageView : function(infoObj){					
				$('#hs-analytics').remove();
				var n = document.createElement("script"),
					e = document.getElementsByTagName("script")[0];
				n.src = (document.location.protocol == "https:" ? "https:" : "http:") + '//js.hs-analytics.net/analytics/'+new Date().getTime()+'/'+_app.ext.tracking_roi.vars.userID+'.js';
				n.id = "hs-analytics";
				e.parentNode.insertBefore(n, e);
				},
			trackBuyerConvert : function(infoObj){
				$('body').append('<img src="http://track.hubspot.com/v1/event/?_n=000000026717&_a='+_app.ext.tracking_roi.vars.userID+'&email='+_app.data[infoObj.datapointer].order.bill.email+'&t='+new Date().getTime()+'"/>');
				},
			trackBuyerTarget : function(username){
				$('body').append('<img src="http://track.hubspot.com/v1/event/?_n=000000026217&_a='+_app.ext.tracking_roi.vars.userID+'&email='+username+'&t='+new Date().getTime()+'"/>');
				}
			}, //u [utilities]

//app-events are added to an element through data-app-event="extensionName|functionName"
//right now, these are not fully supported, but they will be going forward. 
//they're used heavily in the admin.html file.
//while no naming convention is stricly forced, 
//when adding an event, be sure to do off('click.appEventName') and then on('click.appEventName') to ensure the same event is not double-added if app events were to get run again over the same template.
		e : {
			} //e [app Events]
		} //r object.
	return r;
	}