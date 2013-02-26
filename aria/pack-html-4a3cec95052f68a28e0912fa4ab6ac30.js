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
//LOGICAL-PATH:aria/html/CheckBox.js
//*******************
(function(){function e(e){var t=this._bindingListeners.checked,n=this._transform(t.transform,e.target.getProperty("checked"),"fromWidget");aria.utils.Json.setValue(t.inside,t.to,n,t.cb)}Aria.classDefinition({$classpath:"aria.html.CheckBox",$extends:"aria.html.Element",$dependencies:["aria.html.beans.CheckBoxCfg"],$statics:{INVALID_USAGE:"Widget %1 can only be used as a %2."},$constructor:function(t,n,r){this.$cfgBean="aria.html.beans.CheckBoxCfg.Properties",t.tagName="input",t.attributes=t.attributes||{},t.attributes
.type="checkbox",t.on=t.on||{},this._chainListener(t.on,"click",{fn:e,scope:this}),this.$Element.constructor.call(this,t,n,r)},$prototype:{writeMarkupBegin:function(e){this.$logError(this.INVALID_USAGE,[this.$class,"container"])},writeMarkupEnd:Aria.empty,initWidget:function(){this.$Element.initWidget.call(this);var e=this._cfg.bind;if(e.checked){var t=this._transform(e.checked.transform,e.checked.inside[e.checked.to],"toWidget");t!=null&&(this._domElt.checked=t)}},onbind:function(e,t,n){e==="checked"&&(this
._domElt.checked=t)}}})})();
//*******************
//LOGICAL-PATH:aria/html/Element.js
//*******************
(function(){function e(e){e.writeMarkup=Aria.empty,e.writeMarkupBegin=Aria.empty,e.writeMarkupEnd=Aria.empty,e.initWidget=Aria.empty}Aria.classDefinition({$classpath:"aria.html.Element",$extends:"aria.widgetLibs.BindableWidget",$dependencies:["aria.html.beans.ElementCfg","aria.core.JsonValidator","aria.utils.Html","aria.utils.Json","aria.utils.Delegate","aria.templates.DomEventWrapper","aria.utils.Dom","aria.utils.Type"],$constructor:function(t,n,r){this.$cfgBean=this.$cfgBean||"aria.html.beans.ElementCfg.Properties"
;var i=aria.core.JsonValidator.normalize({json:t,beanName:this.$cfgBean});this.$BindableWidget.constructor.apply(this,arguments);if(!i)return e(this);var s=t.id;this._id=s?this._context.$getId(s):this._createDynamicId(),this._domElt=null,this.__delegateId=null,this._registerBindings(),this._normalizeCallbacks()},$destructor:function(){this.__delegateId&&(aria.utils.Delegate.remove(this.__delegateId),this.__delegateId=null),this.$BindableWidget.$destructor.call(this),this._domElt=null},$prototype:{_normalizeCallbacks
:function(){var e=this._cfg.on,t=!1,n;for(var r in e)if(e.hasOwnProperty(r)){t=!0,n=e[r],aria.utils.Type.isArray(n)||(n=[n]);for(var i=0,s=n.length;i<s;i++)n[i]=this.$normCallback.call(this._context._tpl,n[i]);e[r]=n}if(t){var o=aria.utils.Delegate;this.__delegateId=o.add({fn:this._delegate,scope:this})}},_delegate:function(e){var t=e.type,n=this._cfg.on[t],r,i;if(n){var s=new aria.templates.DomEventWrapper(e);for(var o=0,u=n.length;o<u;o++){r=n[o],i=r.fn.call(r.scope,s,r.args);if(i===!1)break}return s.$dispose
(),i}},writeMarkup:function(e){this._openTag(e),e.write("/>")},writeMarkupBegin:function(e){this._openTag(e),e.write(">")},writeMarkupEnd:function(e){e.write("</"+this._cfg.tagName+">")},onbind:Aria.empty,initWidget:function(){this._domElt=aria.utils.Dom.getElementById(this._id)},_openTag:function(e){var t=this._cfg,n=aria.utils.Html.buildAttributeList(t.attributes),r=["<",t.tagName," id='",this._id,"' "];n&&r.push(n," "),this.__delegateId&&r.push(aria.utils.Delegate.getMarkup(this.__delegateId)," "),e.write
(r.join(""))},_notifyDataChange:function(e,t){this.onbind(t,this._transform(this._cfg.bind[t].transform,e.newValue,"toWidget"),e.oldValue)},_chainListener:function(e,t,n,r){var i=e[t]||[];aria.utils.Type.isArray(i)||(i=[i]),r?i.push(n):i.splice(0,0,n),e[t]=i}}})})();
//*******************
//LOGICAL-PATH:aria/html/HtmlLibrary.js
//*******************
Aria.classDefinition({$classpath:"aria.html.HtmlLibrary",$extends:"aria.widgetLibs.WidgetLib",$singleton:!0,$prototype:{widgets:{TextInput:"aria.html.TextInput",Template:"aria.html.Template",CheckBox:"aria.html.CheckBox"}}});
//*******************
//LOGICAL-PATH:aria/html/Template.js
//*******************
Aria.classDefinition({$classpath:"aria.html.Template",$extends:"aria.widgetLibs.BaseWidget",$dependencies:["aria.html.beans.TemplateCfg","aria.templates.TemplateTrait","aria.utils.Html","aria.templates.TemplateCtxt","aria.utils.Dom","aria.templates.ModuleCtrlFactory","aria.core.environment.Customizations"],$events:{ElementReady:{description:""}},$statics:{INVALID_CONFIGURATION:"%1Configuration for widget is not valid.",ERROR_SUBTEMPLATE:"#ERROR IN SUBTEMPLATE#"},$constructor:function(e,t){this.$BaseWidget.constructor
.apply(this,arguments),e.id?this._domId=this._context.$getId(e.id):this._domId=this._createDynamicId(),this._subTplDiv=null,this.subTplCtxt=null,this._needCreatingModuleCtrl=e.moduleCtrl&&e.moduleCtrl.getData==null,this._tplcfg={classpath:aria.core.environment.Customizations.getTemplateCP(e.classpath),args:e.args,id:this._domId,moduleCtrl:e.moduleCtrl},this._checkCfgConsistency(e);var n=new aria.templates.TemplateCtxt;this.subTplCtxt=n,this._initCtxDone=!1,this.isDiffered=!1},$destructor:function(){this._subTplDiv=
null,this.subTplCtxt&&(this.subTplCtxt.$dispose(),this.subTplCtxt=null),this.$BaseWidget.$destructor.apply(this,arguments)},$prototype:{$init:function(e){var t=aria.templates.TemplateTrait.prototype;for(var n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])},_checkCfgConsistency:function(e){try{this._cfgOk=aria.core.JsonValidator.normalize({json:e,beanName:"aria.html.beans.TemplateCfg.Properties"},!0),this._needCreatingModuleCtrl&&(this._cfgOk=this._cfgOk&&aria.core.JsonValidator.normalize({json:e
.moduleCtrl,beanName:"aria.templates.CfgBeans.InitModuleCtrl"}))}catch(t){var n=aria.core.Log;if(n){var r;for(var i=0,s=t.errors.length;i<s;i++)r=t.errors[i],r.message=n.prepareLoggedMessage(r.msgId,r.msgArgs);this.$logError(this.INVALID_CONFIGURATION,null,t)}}},_onTplLoad:function(e,t){var n=this._tplcfg;if(!n){t.autoDispose&&e.moduleCtrlPrivate.$dispose();return}var r=this._subTplDiv;n.tplDiv=r,n.data=this._cfg.data,e.moduleCtrl?n.moduleCtrl=e.moduleCtrl:n.context=this._context,t.autoDispose&&(n.toDispose==
null?n.toDispose=[e.moduleCtrlPrivate]:n.toDispose.push(e.moduleCtrlPrivate));var i=this.subTplCtxt;i.parent=this._context,e=i.initTemplate(n),this._initCtxDone=!0,e?(i.dataReady(),r&&i._cfg&&(r.className=r.className+" "+i.getCSSClassNames(!0),i.$onOnce({Ready:this.__innerTplReadyCb,scope:this}),i.$refresh()),this.tplcfg=null):(i.$dispose(),this.subTplCtxt=null),r=null},initWidget:function(){aria.html.Template.superclass.initWidget.call(this);var e=aria.utils.Dom.getElementById(this._domId);this._subTplDiv=e
;if(this._initCtxDone){var t=this.subTplCtxt;e.className=e.className+" "+t.getCSSClassNames(!0),t.linkToPreviousMarkup(e),t.viewReady()}},writeMarkup:function(e){if(this._cfgOk){var t=this._tplcfg;Aria.load({templates:[t.classpath],classes:this._needCreatingModuleCtrl?[this._cfg.moduleCtrl.classpath]:null,oncomplete:{scope:this,fn:this._onModuleCtrlLoad}});if(this._tplcfg){var n=this._cfg.type,r=["<",n,' id="',this._domId,'"'];this._cfg.attributes&&r.push(" "+aria.utils.Html.buildAttributeList(this._cfg.attributes
)),r.push(">");if(this._initCtxDone){var i=this.subTplCtxt,s=i.getMarkup();s!=null?r.push(s):r.push(this.ERROR_SUBTEMPLATE)}else this.isDiffered=!0;r.push("</"+n+">"),e.write(r.join(""))}else e.write("<div>"+this.ERROR_SUBTEMPLATE+"</div>")}},getId:function(){return this._cfg.id}}});
//*******************
//LOGICAL-PATH:aria/html/TextInput.js
//*******************
(function(){function e(e,t){e.fn.call(e.scope,t,e.args)}function t(t){this._typeCallback=null;var n;for(var r=0,i=t.length;r<i;r++)n=this.$normCallback.call(this._context._tpl,t[r]),e(n,this._domElt.value)}function n(e,n){this._typeCallback=aria.core.Timer.addCallback({fn:t,scope:this,delay:12,args:n})}function r(e){if(!u&&this._cfg.placeholder&&this._hasPlaceholder){var t=aria.DomEvent,n=[t.KC_END,t.KC_RIGHT,t.KC_ARROW_RIGHT,t.KC_DOWN,t.KC_ARROW_DOWN,t.KC_DELETE,t.KC_BACKSPACE];aria.utils.Array.contains(n,e
.keyCode)?e.preventDefault():this._removePlaceholder()}}function i(e){var t=this._bindingListeners.value,n=this._transform(t.transform,e.target.getValue(),"fromWidget");this._hasFocus=!1,this._hasPlaceholder?aria.utils.Json.setValue(t.inside,t.to,"",t.cb):aria.utils.Json.setValue(t.inside,t.to,n,t.cb),this._firstFocus=!0}function s(e){this._hasFocus=!0;if(this._cfg.placeholder){var t=new aria.utils.ClassList(this._domElt);t.contains("placeholder")&&aria.utils.Caret.setPosition(this._domElt,0,0),t.$dispose()}
}function o(e){if(this._cfg.autoselect)if(!u&&this._cfg.placeholder){var t=new aria.utils.ClassList(this._domElt);t.contains("placeholder")?aria.utils.Caret.setPosition(this._domElt,0,0):aria.utils.Caret.select(this._domElt),t.$dispose()}else aria.utils.Caret.select(this._domElt)}var u=null;Aria.classDefinition({$classpath:"aria.html.TextInput",$extends:"aria.html.Element",$dependencies:["aria.html.beans.TextInputCfg","aria.utils.Caret"],$statics:{INVALID_USAGE:"Widget %1 can only be used as a %2."},$constructor
:function(e,t,n){this.$cfgBean=this.$cfgBean||"aria.html.beans.TextInputCfg.Properties",e.tagName="input",e.attributes=e.attributes||{},e.attributes.type=e.password?"password":"text",e.on=e.on||{},u="placeholder"in Aria.$window.document.createElement("input"),e.placeholder&&u&&(e.attributes.placeholder=e.placeholder),this._registerListeners(e),this._reactOnType=this._registerType(e.on,t),this._firstFocus=!0,this._hasFocus=!1,this._hasPlaceholder=!1,this.$Element.constructor.call(this,e,t,n)},$destructor:function(
){this._typeCallback&&aria.core.Timer.cancelCallback(this._typeCallback),this.$Element.$destructor.call(this)},$prototype:{writeMarkupBegin:function(e){this.$logError(this.INVALID_USAGE,[this.$class,"container"])},writeMarkupEnd:Aria.empty,initWidget:function(){this.$Element.initWidget.call(this);var e=this._cfg.bind;if(e.value){var t=this._transform(e.value.transform,e.value.inside[e.value.to],"toWidget");t!=null&&(this._domElt.value=t)}this._setPlaceholder()},onbind:function(e,t,n){e==="value"&&(t=t!=null?
t+"":"",t&&this._removePlaceholder(),this._domElt.value=t,this._setPlaceholder())},getId:function(){return this._cfg.id},focus:function(){this._domElt.focus()},_registerType:function(e,t){e.type&&(this._chainListener(e,"keydown",{fn:n,scope:this,args:aria.utils.Type.isArray(e.type)?e.type:[e.type]}),delete e.type)},_autoselect:function(){this._firstFocus&&(this._firstFocus=!1,aria.utils.Caret.select(this._domElt))},_setPlaceholder:function(){if(!u&&this._cfg.placeholder){var e=this._domElt;if(e.value===""){e
.value=this._cfg.placeholder;var t=new aria.utils.ClassList(e);t.add("placeholder"),t.$dispose(),this._hasFocus&&aria.utils.Caret.setPosition(e,0,0),this._hasPlaceholder=!0}}},_removePlaceholder:function(){if(this._hasPlaceholder){var e=this._domElt,t=new aria.utils.ClassList(e);e.value="",this._hasPlaceholder=!1,t.remove("placeholder"),t.$dispose()}},_registerListeners:function(e){var t=e.on;this._chainListener(t,"blur",{fn:i,scope:this});if(!u&&e.placeholder||e.autoselect)this._chainListener(t,"focus",{fn:
s,scope:this}),this._chainListener(t,"click",{fn:o,scope:this}),this._chainListener(t,"keydown",{fn:r,scope:this}),this._chainListener(t,"type",{fn:this._setPlaceholder,scope:this})}}})})();
//*******************
//LOGICAL-PATH:aria/html/beans/AutoCompleteCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.AutoCompleteCfg",$description:"",$namespaces:{json:"aria.core.JsonTypes",input:"aria.html.beans.TextInputCfg"},$beans:{Properties:{$type:"input:Properties",$description:"",$properties:{bind:{$type:"input:Properties.bind",$properties:{suggestions:{$type:"json:Array",$description:"",$contentType:{$type:"json:Object",$description:""},$default:[]}}}}}}});
//*******************
//LOGICAL-PATH:aria/html/beans/CheckBoxCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.CheckBoxCfg",$description:"",$namespaces:{base:"aria.html.beans.ElementCfg",common:"aria.widgetLibs.CommonBeans"},$beans:{Properties:{$type:"base:Properties",$description:"",$properties:{bind:{$type:"base:Properties.$properties.bind",$properties:{checked:{$type:"common:BindingRef",$description:""}}}}}}});
//*******************
//LOGICAL-PATH:aria/html/beans/ElementCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.ElementCfg",$description:"",$namespaces:{json:"aria.core.JsonTypes",html:"aria.templates.CfgBeans"},$beans:{Properties:{$type:"json:Object",$description:"",$properties:{id:{$type:"json:String",$description:"",$mandatory:!1},tagName:{$type:"json:String",$description:"",$sample:"div",$mandatory:!0},attributes:{$type:"html:HtmlAttribute",$default:{}},bind:{$type:"json:Object",$description:"",$default:{},$restricted:!1},on:{$type:"json:Object",$description:"",$default
:{},$restricted:!1}},$restricted:!1}}});
//*******************
//LOGICAL-PATH:aria/html/beans/TemplateCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.TemplateCfg",$description:"",$namespaces:{json:"aria.core.JsonTypes",html:"aria.templates.CfgBeans"},$beans:{Properties:{$type:"json:Object",$description:"",$properties:{attributes:{$type:"html:HtmlAttribute",$description:""},id:{$type:"json:String",$description:"",$mandatory:!1},classpath:{$type:"json:PackageName",$description:"",$mandatory:!0},type:{$type:"json:String",$description:"",$default:"div"},data:{$type:"json:ObjectRef",$description:"",$mandatory:!1}
,moduleCtrl:{$type:"html:ModuleCtrl",$description:"",$mandatory:!1},args:{$type:"json:Array",$description:"",$contentType:{$type:"json:MultiTypes",$description:""},$default:[]},baseTabIndex:{$type:"json:Integer",$description:"",$default:0}}}}});
//*******************
//LOGICAL-PATH:aria/html/beans/TextInputCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.TextInputCfg",$description:"",$namespaces:{json:"aria.core.JsonTypes",base:"aria.html.beans.ElementCfg",common:"aria.widgetLibs.CommonBeans"},$beans:{Properties:{$type:"base:Properties",$description:"",$properties:{tagName:{$type:"base:Properties.$properties.tagName",$description:"",$mandatory:!0},bind:{$type:"base:Properties.$properties.bind",$properties:{value:{$type:"common:BindingRef",$description:""}}},on:{$type:"base:Properties.$properties.on",$properties
:{type:{$type:"common:Callback",$description:""}}},password:{$type:"json:Boolean",$description:"",$default:!1},autoselect:{$type:"json:Boolean",$description:"",$default:!1}}}}});
//*******************
//LOGICAL-PATH:aria/html/controllers/Suggestions.js
//*******************
(function(){function e(){this.getSuggestions=function(e,t){this.pendingSuggestion={entry:e,callback:t}},this.getAllSuggestions=function(e){this.pendingSuggestion={callback:e}},this.$dispose=Aria.empty}function t(e){var t=e.scope;t._autoDisposeHandler=!1,t.$logError(t.INVALID_RESOURCES_HANDLER,e.classpath)}function n(e){var t=e.scope,n=Aria.getClassInstance(e.classpath),r=t._resourcesHandler.pendingSuggestion;t._resourcesHandler=n,t._autoDisposeHandler=!0,r&&(r.entry?n.getSuggestions(r.entry,r.callback):n.getAllSuggestions
(r.callback))}function r(e){aria.core.Timer.addCallback({fn:n,args:e,scope:{},delay:12})}function i(n,i){var s=Aria.getClassRef(n);if(s)return new s;var o={scope:i,classpath:n};return Aria.load({classes:[n],oncomplete:{fn:r,args:o},onerror:{fn:t,args:o}}),new e}Aria.classDefinition({$classpath:"aria.html.controllers.Suggestions",$dependencies:["aria.utils.Json","aria.utils.Type"],$constructor:function(){this._init()},$destructor:function(){this.dispose()},$statics:{INVALID_RESOURCES_HANDLER:"Invalid resources handler '%1'"
},$prototype:{_init:function(){this.data={suggestions:[],value:null},this._resourcesHandler=null,this._autoDisposeHandler=!1},dispose:function(){this._autoDisposeHandler&&this._resourcesHandler&&this._resourcesHandler.$dispose()},setResourcesHandler:function(e){aria.utils.Type.isString(e)&&(e=i(e,this),this._autoDisposeHandler=!0),this._resourcesHandler=e},suggestValue:function(e){this._resourcesHandler.getSuggestions(e,{fn:this._callback,scope:this})},_callback:function(e){aria.utils.Json.setValue(this.data
,"suggestions",e||[])},setSelected:function(e){aria.utils.Json.setValue(this.data,"value",e),this.empty()},empty:function(){aria.utils.Json.setValue(this.data,"suggestions",[])}}})})();