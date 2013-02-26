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
//LOGICAL-PATH:aria/embed/Map.js
//*******************
Aria.classDefinition({$classpath:"aria.embed.Map",$extends:"aria.embed.Element",$dependencies:["aria.embed.controllers.MapController"],$constructor:function(e,t,n){this.$Element.constructor.apply(this,arguments),this._cfg.controller=aria.embed.controllers.MapController,this._cfg.args={id:e.id,provider:e.provider,initArgs:e.initArgs,loadingIndicator:e.loadingIndicator}},$prototype:{_cfgBeanName:"aria.embed.CfgBeans.MapCfg"}});
//*******************
//LOGICAL-PATH:aria/embed/controllers/MapController.js
//*******************
(function(){var e={},t={};Aria.classDefinition({$classpath:"aria.embed.controllers.MapController",$singleton:!0,$dependencies:["aria.map.MapManager","aria.utils.Json"],$constructor:function(){this.mapManager=aria.map.MapManager,this.mapManager.$addListeners({mapDestroy:{fn:this._nullifyMapDom,scope:this}}),this._listeners=0},$destructor:function(){this.mapManager.$removeListeners({mapDestroy:{fn:this._nullifyMapDom,scope:this}}),this.mapManager=null,e=null,t=null},$prototype:{onEmbededElementCreate:function(
t,n){var r=this.mapManager.getMapStatus(n.id),i=e[n.id];r===null?this._createMap(t,n):t.appendChild(i),r=this.mapManager.getMapStatus(n.id),n.loadingIndicator&&r!=this.mapManager.READY&&this._activateLoadingIndicator(t,n)},_createMap:function(t,n){var r=aria.utils.Json.copy(n),i=r.provider;delete r.loadingIndicator;var s=Aria.$window.document.createElement("div");r.domElement=s,e[n.id]=s,t.appendChild(s),this.mapManager.createMap(r)},_activateLoadingIndicator:function(e,n){this._triggerLoadingIndicator(e,!0)
,t[n.id]={container:e},this._listeners===0&&this.mapManager.$addListeners({mapReady:{fn:this._removeLoadingIndicator,scope:this}}),this._listeners++},_removeLoadingIndicator:function(e){var n=t[e.mapId];n&&(this._triggerLoadingIndicator(n.container,!1),delete t[e.mapId],this._listeners--,this._listeners===0&&this.mapManager.$removeListeners({mapReady:{fn:this._removeLoadingIndicator,scope:this}}))},onEmbededElementDispose:function(t,n){var r=n.id;n.loadingIndicator&&this._triggerLoadingIndicator(t,!1);var i=
e[r];if(i){var s=i.parentNode;s&&s.removeChild(i)}},_nullifyMapDom:function(t){delete e[t.mapId]},_triggerLoadingIndicator:function(e,t){e&&(t?aria.utils.DomOverlay.create(e):aria.utils.DomOverlay.detachFrom(e))}}})})();
//*******************
//LOGICAL-PATH:aria/map/CfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.map.CfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes",core:"aria.core.CfgBeans"},$beans:{MapCfg:{$type:"json:Object",$description:"",$properties:{id:{$type:"json:String",$description:"",$mandatory:!0},domElement:{$type:"json:ObjectRef",$description:"",$mandatory:!0},initArgs:{$type:"json:MultiTypes",$description:"",$default:{}}}},CreateMapCfg:{$type:"MapCfg",$description:"",$properties:{provider:{$type:"json:String",$description:"",$mandatory:!0},afterCreate
:{$type:"core:Callback",$description:""}}}}});
//*******************
//LOGICAL-PATH:aria/map/MapManager.js
//*******************
(function(){var e={},t={},n={},r={microsoft7:"aria.map.providers.Microsoft7MapProvider"},i={},s={};Aria.classDefinition({$classpath:"aria.map.MapManager",$singleton:!0,$dependencies:["aria.map.CfgBeans","aria.templates.DomElementWrapper","aria.utils.Type"],$constructor:function(){this._createdDomWrappers={}},$destructor:function(){this.destroyAllMaps();for(var o in s)s.hasOwnProperty(o)&&s[o].$dispose();t=null,n=null,this._createdDomWrappers=null,i=null,s=null,e=null,r=null},$events:{mapReady:{description:""
,properties:{mapId:"{String} id of the map"}},mapDestroy:{description:"",properties:{mapId:"{String} id of the map"}}},$statics:{INVALID_CONFIGURATION:"Invalid configuration for creating a map\n%1",INEXISTENT_PROVIDER:"Provider %1 cannot be found",INVALID_PROVIDER:"Provider %1 is not valid",DUPLICATED_PROVIDER:"Provider %1 exists already",DUPLICATED_MAP_ID:"A map with id %1 already exists.",LOADING:"loading",READY:"ready"},$prototype:{createMap:function(e){if(!this._checkCfg(e))return;if(n[e.id]){this.$logError
(this.DUPLICATED_MAP_ID,e.id);return}n[e.id]=this.LOADING;var t=e.provider;t in r||this.addProvider(t,t),this._getProviderInstance(t,{fn:this._loadProviderDependencies,scope:this,args:e})},getMap:function(t){return e[t]?e[t].instance:null},getMapDom:function(e){var n=this._createdDomWrappers[e];if(n)return n;var r=t[e];if(r)return n=new aria.templates.DomElementWrapper(r),this._createdDomWrappers[e]=n,n},destroyMap:function(r){var s=e[r];if(s){i[s.providerName].disposeMap(s.instance),s=null,delete e[r],delete 
t[r];var o=this._createdDomWrappers[r];o&&(o.$dispose(),o=null,delete this._createdDomWrappers[r]),delete n[r],this.$raiseEvent({name:"mapDestroy",mapId:r})}},destroyAllMaps:function(t){var n=t&&t in r,i;for(var s in e)e.hasOwnProperty(s)&&(i=e[s],(!n||i.providerName==t)&&this.destroyMap(s))},addProvider:function(e,t){r[e]?this.$logError(this.DUPLICATED_PROVIDER,e):aria.utils.Type.isObject(t)?this._isValidProvider(t)?(i[e]=t,r[e]=t):this.$logError(this.INVALID_PROVIDER,e):r[e]=t},removeProvider:function(e){this
.destroyAllMaps(e),delete r[e],s[e]&&(s[e].$dispose(),delete s[e]),delete i[e]},hasProvider:function(e){return e in r},_checkCfg:function(e){try{aria.core.JsonValidator.normalize({json:e,beanName:"aria.map.CfgBeans.CreateMapCfg"},!0)}catch(t){var n=aria.core.Log,r=[""];if(n){var i;for(var s=0,o=t.errors.length;s<o;s+=1)i=t.errors[s],r.push(n.prepareLoggedMessage(i.msgId,i.msgArgs))}return this.$logError(this.INVALID_CONFIGURATION,r.join("\n")),!1}return!0},_getProviderInstance:function(e,t){i[e]?this.$callback
(t):Aria.load({classes:[r[e]],oncomplete:{fn:this._setProviderInstance,scope:this,args:{providerName:e,cb:t}},onerror:{fn:this._raiseInexistentProviderError,scope:this,args:{providerName:e,cb:t}}})},_raiseInexistentProviderError:function(e){this.$logError(this.INEXISTENT_PROVIDER,e.providerName);var t=e.cb.args;delete n[t.id];var r=t.afterCreate;r&&this.$callback(r,null)},_setProviderInstance:function(e){var t=e.providerName,o=Aria.getClassRef(r[t]),u=!aria.utils.Type.isFunction(o),a=u?o:new o,f=this._isValidProvider
(a);if(f)i[t]=a,u||(s[t]=a),this.$callback(e.cb);else{var l=e.cb.args;delete n[l.id],a.$dispose(),this.$logError(this.INVALID_PROVIDER,e.providerName);var c=l.afterCreate;c&&this.$callback(c,null)}},_isValidProvider:function(e){var t=!0,n=["load","getMap","disposeMap"];for(var r=0;r<n.length;r++)t=t&&e[n[r]]&&aria.utils.Type.isFunction(e[n[r]]);return t},_loadProviderDependencies:function(e,t){var n=i[t.provider];n.load({fn:this._retrieveMapInstance,scope:this,args:t})},_retrieveMapInstance:function(r,s){var o=
r&&r.id&&r.provider?r:s,u=o.provider,a=o.id,f=o.afterCreate,l=i[u].getMap(o);e[a]={instance:l,providerName:u},t[a]=o.domElement,n[a]=this.READY,f&&this.$callback(f,l),this.$raiseEvent({name:"mapReady",mapId:a})},getMapStatus:function(e){return n[e]||null}}})})();
//*******************
//LOGICAL-PATH:aria/map/providers/Microsoft7MapProvider.js
//*******************
Aria.classDefinition({$classpath:"aria.map.providers.Microsoft7MapProvider",$singleton:!0,$dependencies:["aria.utils.ScriptLoader"],$constructor:function(){this.credentials="",this._loadCallback=null},$destructor:function(){this._loadCallback=null},$prototype:{load:function(e){if(this.isLoaded())this.$callback(e);else{var t=this;this._loadCallback=e,Aria.$window.__bing7MapLoadCallback=function(){t._afterLoad.apply(t),t=null},aria.utils.ScriptLoader.load(["http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&mkt=en-US&onscriptload=__bing7MapLoadCallback"
])}},_afterLoad:function(){this.$assert(35,this.isLoaded()),Aria.$window.__bing7MapLoadCallback=null;var e=this;Aria.$window.Microsoft.Maps.loadModule("Microsoft.Maps.Overlays.Style",{callback:function(){e.$callback(e._loadCallback),e=null}})},isLoaded:function(){return typeof Aria.$window.Microsoft!="undefined"&&typeof Aria.$window.Microsoft.Maps!="undefined"&&typeof Aria.$window.Microsoft.Maps.Map!="undefined"},getMap:function(e){var t={credentials:this.credentials};return aria.utils.Json.inject(e.initArgs
,t),this.isLoaded()?new Aria.$window.Microsoft.Maps.Map(e.domElement,t):null},disposeMap:function(e){e.dispose()}}});