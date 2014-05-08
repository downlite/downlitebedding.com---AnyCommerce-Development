/* **************************************************************

   Copyright 2011 Zoovy, Inc.

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

var store_account_creation = function(_app) {
	var r= {
		vars : {
		},
		
		calls : {

		appBuyerCreate : {
			init : function(obj,_tag)	{
				this.dispatch(obj,_tag);
				return 1;
				},
			dispatch : function(obj,_tag){
				obj._tag = _tag || {};
				obj._cmd = "appBuyerCreate";
				_app.model.addDispatchToQ(obj,'immutable');
				}
			} //appBuyerCreate
		},//END calls
		
		callbacks : {
			init : {
				onSuccess : function(){
					_app.u.dump('BEGIN _app.ext.store_account_creation.callbacks.init.onSuccess');
					_app.ext.store_account_creation.u.bindOnclick();
					
										
				},
				onError : function() {
					_app.u.dump('BEGIN _app.ext.store_account_creation.callbacks.init.onError');
				}
			}
			
		},//END callbacks
		
		
		////////////////////////////////////   ACTION    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//actions are functions triggered by a user interaction, such as a click/tap.
//these are going the way of the do do, in favor of app events. new extensions should have few (if any) actions.
		a : {
			
			loginFrmSubmit : function(email,password,errorDiv)        {
					var errors = '';
					$errorDiv = errorDiv.empty(); //make sure error screen is empty. do not hide or callback errors won't show up.

					if(_app.u.isValidEmail(email) == false){
							errors += "Please provide a valid email address<br \/>";
							}
					if(!password)        {
							errors += "Please provide your password<br \/>";
							}
					if(errors == ''){
							_app.calls.appBuyerLogin.init({"login":email,"password":password},{'callback':'authenticateBuyer','extension':'quickstart'});
							_app.calls.refreshCart.init({},'immutable'); //cart needs to be updated as part of authentication process.
//                                        _app.calls.buyerProductLists.init('forgetme',{'callback':'handleForgetmeList','extension':'store_prodlist'},'immutable');
							_app.model.dispatchThis('immutable');
							}
					else {
							$errorDiv.anymessage({'message':errors});
							}
					showContent('customer',{'show':'myaccount'})
			}, //loginFrmSubmit
			 
		},//END a FUNCTIONS
		
		u : {
			
			handleAppLoginCreate : function($form)        {
				if($form)        {
						var formObj = $form.serializeJSON();
						
						if(formObj.pass !== formObj.pass2) {
								_app.u.throwMessage('Sorry, your passwords do not match! Please re-enter your password');
								return;
						}
						
						var tagObj = {
								'callback':function(rd) {
										if(_app.model.responseHasErrors(rd)) {
												$form.anymessage({'message':rd});
										}
										else {
												showContent('customer',{'show':'myaccount'});
												_app.u.throwMessage(_app.u.successMsgObject("Your account has been created!"));
										}
								}
						}
						
						formObj._vendor = "downlite";
						//dump("formObj = ");
						//dump(formObj);
						_app.ext.store_account_creation.calls.appBuyerCreate.init(formObj,tagObj);
						_app.model.dispatchThis('immutable');
				}
				else {
						$('#globalMessaging').anymessage({'message':'$form not passed into store_account_creation.u.handleBuyerAccountCreate','gMessage':true});
				}
			},
			
			//replacement for bindByAnchor href to make crawlable links. Currently used mainly on sitemap
			bindOnclick : function() {
				$('body').off('click', 'a[data-onclick]').on('click', 'a[data-onclick]', function(event){
					var $this = $(this);
					var P = _app.ext.quickstart.u.parseAnchor($this.data('onclick'));
					return _app.ext.quickstart.a.showContent('',P);
				});
			}
		},//END u FUNCTIONS
		
		renderFormats : {
			
			
		},//END renderFormats
		
		e : {
			//add this as a data-app-submit to the login form.
			accountLoginSubmit : function($ele,p)	{
				p.preventDefault();
				if(_app.u.validateForm($ele))	{
					var sfo = $ele.serializeJSON();
					_app.ext.cco.calls.cartSet.init({"bill/email":sfo.login,"_cartid":_app.model.fetchCartID()}) //whether the login succeeds or not, set bill/email in the cart.
					sfo._cmd = "appBuyerLogin";
					sfo.method = 'unsecure';
					sfo._tag = {"datapointer":"appBuyerLogin",'callback':'authenticateBuyer','extension':'quickstart'}
					_app.model.addDispatchToQ(sfo,"immutable");
					_app.calls.refreshCart.init({},'immutable'); //cart needs to be updated as part of authentication process.
					_app.model.dispatchThis('immutable');
					showContent('customer',{'show':'myaccount'});
				}
				else	{} //validateForm will handle the error display.
				return false;
			}
		},//END e
		
		tlcFormats : {
			
		}//END tlcFormats
	}
	return r;
}