/*
 * Aria Templates 1.3.5 - 05 Feb 2013
 *
 * Copyright 2009-2013 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//***MULTI-PART
//*******************
//LOGICAL-PATH:aria/storage/AbstractStorage.js
//*******************
Aria.classDefinition({$classpath:"aria.storage.AbstractStorage",$dependencies:["aria.storage.EventBus","aria.utils.json.JsonSerializer","aria.utils.Type"],$implements:["aria.storage.IStorage"],$statics:{INVALID_SERIALIZER:"Invalid serializer configuration. Make sure it implements aria.utils.json.ISerializer",INVALID_NAMESPACE:"Inavlid namespace configuration. Must be a string.",EVENT_KEYS:["name","key","oldValue","newValue","url"]},$constructor:function(e){this._disposeSerializer=!1,this._eventCallback={fn:this
._onStorageEvent,scope:this},aria.storage.EventBus.$on({change:this._eventCallback});var t=e?e.serializer:null,n=!0;t&&("serialize"in t&&"parse"in t?n=!1:this.$logError(this.INVALID_SERIALIZER)),n&&(t=new aria.utils.json.JsonSerializer(!0),this._disposeSerializer=!0),this.serializer=t;var r="";e&&e.namespace&&(aria.utils.Type.isString(e.namespace)?r=e.namespace+"$":this.$logError(this.INVALID_NAMESPACE)),this.namespace=r},$destructor:function(){aria.storage.EventBus.$removeListeners({change:this._eventCallback
}),this._disposeSerializer&&this.serializer&&this.serializer.$dispose(),this.serializer=null,this._eventCallback=null},$prototype:{getItem:function(e){var t=this._get(this.namespace+e);return this.serializer.parse(t)},setItem:function(e,t){var n=this.getItem(e),r=this.serializer.serialize(t,{reversible:!0,keepMetadata:!1});aria.storage.EventBus.stop=!0,this._set(this.namespace+e,r),aria.storage.EventBus.stop=!1,t=this.serializer.parse(r),aria.storage.EventBus.notifyChange(this.type,e,t,n,this.namespace)},removeItem
:function(e){var t=this.getItem(e);t!==null&&(aria.storage.EventBus.stop=!0,this._remove(this.namespace+e),aria.storage.EventBus.stop=!1,aria.storage.EventBus.notifyChange(this.type,e,null,t,this.namespace))},clear:function(){aria.storage.EventBus.stop=!0,this._clear(),aria.storage.EventBus.stop=!1,aria.storage.EventBus.notifyChange(this.type,null,null,null)},_onStorageEvent:function(e){if(e.key===null||e.namespace===this.namespace){var t=aria.utils.Json.copy(e,!1,this.EVENT_KEYS);this.$raiseEvent(t)}}}});
//*******************
//LOGICAL-PATH:aria/storage/Beans.js
//*******************
Aria.beanDefinitions({$package:"aria.storage.Beans",$namespaces:{json:"aria.core.JsonTypes"},$description:"",$beans:{ConstructorArgs:{$type:"json:Object",$description:"",$properties:{namespace:{$type:"json:String",$description:""},serializer:{$type:"json:ObjectRef",$description:""}}}}});
//*******************
//LOGICAL-PATH:aria/storage/EventBus.js
//*******************
Aria.classDefinition({$classpath:"aria.storage.EventBus",$singleton:!0,$events:{change:"Raised when a change happens in any of the linked instances"},$prototype:{stop:!1,notifyChange:function(e,t,n,r,i){this.$raiseEvent({name:"change",location:e,namespace:i,key:t,newValue:n,oldValue:r,url:Aria.$window.location})}}});
//*******************
//LOGICAL-PATH:aria/storage/HTML5Storage.js
//*******************
Aria.classDefinition({$classpath:"aria.storage.HTML5Storage",$dependencies:["aria.utils.Event"],$extends:"aria.storage.AbstractStorage",$statics:{UNAVAILABLE:"%1 not supported by the browser."},$constructor:function(e,t,n){this.$AbstractStorage.constructor.call(this,e),this.type=t,this.storage=Aria.$window[t],this._browserEventCb={fn:this._browserEvent,scope:this};if(this.storage)aria.utils.Event.addListener(Aria.$window,"storage",this._browserEventCb);else if(n!==!1)throw this._disposeSerializer&&this.serializer&&
this.serializer.$dispose(),this.$logError(this.UNAVAILABLE,[this.type]),new Error(this.type)},$destructor:function(){aria.utils.Event.removeListener(Aria.$window,"storage",this._browserEventCb),this._browserEventCb=null,this.__target=null,this.$AbstractStorage.$destructor.call(this)},$prototype:{_get:function(e){return this.storage.getItem(e)},_set:function(e,t){this.storage.setItem(e,t)},_remove:function(e){this.storage.removeItem(e)},_clear:function(){this.storage.clear()},_browserEvent:function(e){if(aria
.storage.EventBus.stop)return;var t=this.namespace?e.key.substring(0,this.namespace.length)===this.namespace:!0;if(t){var n=e.oldValue,r=e.newValue;n&&(n=this.serializer.parse(n)),r&&(r=this.serializer.parse(r)),this._onStorageEvent({name:"change",key:e.key,oldValue:n,newValue:r,url:e.url,namespace:this.namespace})}},$on:function(e){aria.core.Browser.isIE8&&this.$logWarn(this.UNAVAILABLE,"change event"),this.$AbstractStorage.$on.call(this,e)}}});
//*******************
//LOGICAL-PATH:aria/storage/IStorage.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.storage.IStorage",$events:{change:{description:"",properties:{key:"Name of the key that changed",oldValue:"Old value of the key in question, null if the key is newly added",newValue:"New value being set",url:"Address of the document whose storage object was affected"}}},$interface:{getItem:function(e){},setItem:function(e,t){},removeItem:function(e){},clear:function(){}}});
//*******************
//LOGICAL-PATH:aria/storage/LocalStorage.js
//*******************
(function(){function e(e,t){e._get=t._get,e._set=t._set,e._remove=t._remove,e._clear=t._clear,e.storage=aria.storage.UserData._STORAGE,e.__keys=aria.storage.UserData._ALL_KEYS}Aria.classDefinition({$classpath:"aria.storage.LocalStorage",$extends:"aria.storage.HTML5Storage",$dependencies:["aria.core.Browser","aria.storage.UserData"],$constructor:function(t){var n=aria.core.Browser.isIE7;this.$HTML5Storage.constructor.call(this,t,"localStorage",!n);if(!this.storage&&n){var r=new aria.storage.UserData(t);e(this
,r),this._fallback=r}},$destructor:function(){this._fallback&&(this._fallback.$dispose(),this._fallback=null),this.$HTML5Storage.$destructor.call(this)}})})();
//*******************
//LOGICAL-PATH:aria/storage/SessionStorage.js
//*******************
Aria.classDefinition({$classpath:"aria.storage.SessionStorage",$extends:"aria.storage.HTML5Storage",$constructor:function(e){this.$HTML5Storage.constructor.call(this,e,"sessionStorage")}});
//*******************
//LOGICAL-PATH:aria/storage/UserData.js
//*******************
(function(){function i(){t||(t=new aria.utils.json.JsonSerializer(!0));var n=e.getAttribute("kMap");return n?t.parse(n):{}}function s(r,i){r?n[i]=r:delete n[i],e.setAttribute("kMap",t.serialize(n)),e.save("JSONPersist")}function o(e,t){n=i();if(!t||e in n)return n[e];var o="uD"+r++;return s(o,e),o}var e,t,n={},r=4;Aria.classDefinition({$classpath:"aria.storage.UserData",$dependencies:["aria.utils.Object","aria.utils.Dom","aria.utils.json.JsonSerializer","aria.core.Browser"],$implements:["aria.storage.IStorage"
],$extends:"aria.storage.AbstractStorage",$onload:function(){if(aria.core.Browser.isIE)try{var t=Aria.$frameworkWindow.document.createElement("form");t.innerHTML="<input type='hidden' id='__aria_storage_UserData__' style='behavior:url(#default#userData)'>",Aria.$frameworkWindow.document.body.appendChild(t),e=t.firstChild,e.load("JSONPersist"),i()}catch(n){}},$onunload:function(){aria.core.Browser.isIE&&(e&&e.parentNode.removeChild(e),e=null),t&&t.$dispose(),t=null},$prototype:{_get:function(t){var n=o(t);return n?
e.getAttribute(n):null},_set:function(t,n){var r=o(t,!0);e.setAttribute(r,n),e.save("JSONPersist")},_remove:function(t){e.removeAttribute(o(t)),s(null,t),e.save("JSONPersist")},_clear:function(){var t=i();n={},e.removeAttribute("kMap");for(var r in t)t.hasOwnProperty(r)&&e.removeAttribute(t[r]);e.save("JSONPersist")}}})})();