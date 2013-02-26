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
//LOGICAL-PATH:aria/embed/CfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.embed.CfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes",html:"aria.templates.CfgBeans"},$beans:{ElementCfg:{$type:"json:Object",$description:"",$properties:{controller:{$type:"json:ObjectRef",$description:""},type:{$type:"json:String",$description:"",$default:"div"},attributes:{$type:"html:HtmlAttribute",$description:""},args:{$type:"json:MultiTypes",$description:""}}},PlaceholderCfg:{$type:"json:Object",$description:"",$properties:{name:{$type:"json:String"
,$description:"",$mandatory:!0},type:{$type:"json:String",$description:"",$default:"div"},attributes:{$type:"html:HtmlAttribute",$description:""}}},MapCfg:{$type:"json:Object",$description:"",$properties:{id:{$type:"json:String",$description:"",$mandatory:!0},provider:{$type:"json:String",$description:"",$mandatory:!0},initArgs:{$type:"json:MultiTypes",$description:""},loadingIndicator:{$type:"json:Boolean",$description:"",$default:!1},type:{$type:"json:String",$description:"",$default:"div"},attributes:{$type
:"html:HtmlAttribute",$description:""}}}}});
//*******************
//LOGICAL-PATH:aria/embed/Element.js
//*******************
Aria.classDefinition({$classpath:"aria.embed.Element",$extends:"aria.widgetLibs.BaseWidget",$dependencies:["aria.embed.CfgBeans","aria.utils.Html","aria.core.JsonValidator","aria.core.Log","aria.utils.Dom"],$statics:{INVALID_CONFIGURATION:"%1Configuration for widget is not valid."},$constructor:function(e,t,n){this.$BaseWidget.constructor.apply(this,arguments);try{this._cfgOk=aria.core.JsonValidator.normalize({json:e,beanName:this._cfgBeanName},!0)}catch(r){var i=aria.core.Log;if(i){var s;for(var o=0,u=r.errors
.length;o<u;o++)s=r.errors[o],s.message=i.prepareLoggedMessage(s.msgId,s.msgArgs);this.$logError(this.INVALID_CONFIGURATION,null,r)}}},$destructor:function(){this._domId&&this._cfg.controller.onEmbededElementDispose(aria.utils.Dom.getElementById(this._domId),this._cfg.args),this.$BaseWidget.$destructor.apply(this,arguments)},$prototype:{_cfgBeanName:"aria.embed.CfgBeans.ElementCfg",writeMarkup:function(e){if(this._cfgOk){this._domId=this._createDynamicId();var t=this._cfg.type,n=["<",t,' id="',this._domId,'"'
];this._cfg.attributes&&n.push(" "+aria.utils.Html.buildAttributeList(this._cfg.attributes)),n.push("></"+t+">"),e.write(n.join(""))}},initWidget:function(){this._cfgOk&&this._cfg.controller.onEmbededElementCreate(aria.utils.Dom.getElementById(this._domId),this._cfg.args)}}});
//*******************
//LOGICAL-PATH:aria/embed/EmbedLib.js
//*******************
Aria.classDefinition({$classpath:"aria.embed.EmbedLib",$extends:"aria.widgetLibs.WidgetLib",$singleton:!0,$prototype:{widgets:{Element:"aria.embed.Element",Map:"aria.embed.Map",Placeholder:"aria.embed.Placeholder"}}});
//*******************
//LOGICAL-PATH:aria/embed/IContentProvider.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.embed.IContentProvider",$events:{contentChange:{description:"",properties:{contentPaths:"{Array} contains the paths whose corresponding content has changed."}}},$interface:{getContent:function(e){}}});
//*******************
//LOGICAL-PATH:aria/embed/IEmbedController.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.embed.IEmbedController",$extends:"aria.templates.IModuleCtrl",$interface:{onEmbededElementCreate:function(e,t){},onEmbededElementDispose:function(e,t){}}});
//*******************
//LOGICAL-PATH:aria/embed/Placeholder.js
//*******************
Aria.classDefinition({$classpath:"aria.embed.Placeholder",$extends:"aria.widgetLibs.BaseWidget",$dependencies:["aria.embed.CfgBeans","aria.core.JsonValidator","aria.html.Template","aria.embed.PlaceholderManager","aria.utils.Array"],$statics:{INVALID_CONFIGURATION:"%1 Configuration for widget is not valid."},$constructor:function(e,t,n){this.$BaseWidget.constructor.apply(this,arguments),this._validateCfg(e),this._placeholderPath=this._getPlaceholderPath(t),this._sectionId="p_"+this._createDynamicId(),this._onContentChangeListener=
{fn:this._onContentChange,scope:this},this._placeholderManager=aria.embed.PlaceholderManager,this._placeholderManager.$addListeners({contentChange:this._onContentChangeListener})},$destructor:function(){this._placeholderManager.$removeListeners({contentChange:this._onContentChangeListener}),this._onContentChangeListener=null,this.$BaseWidget.$destructor.apply(this,arguments)},$prototype:{_cfgBeanName:"aria.embed.CfgBeans.PlaceholderCfg",writeMarkup:function(e){if(this._cfgOk){var t=this._cfg,n={id:this._sectionId
,type:t.type,attributes:t.attributes};e.beginSection(n),this._writePlaceholderContent(e),e.endSection()}},_writePlaceholderContent:function(e){var t=aria.utils.Type,n=aria.embed.PlaceholderManager,r=this._placeholderPath,i=n.getContent(r);for(var s=0,o=i.length;s<o;s++){var u=i[s];if(t.isString(u))e.write(u);else{var a=new aria.html.Template(u,this._context,this._lineNumber);a.subTplCtxt.placeholderPath=r,e.registerBehavior(a),a.writeMarkup(e)}}},_onContentChange:function(e){var t=e.placeholderPaths;if(aria.
utils.Array.contains(t,this._placeholderPath)){var n=this._context.getRefreshedSection({outputSection:this._sectionId,writerCallback:{fn:this._writePlaceholderContent,scope:this}});this._context.insertSection(n)}},_validateCfg:function(e){try{this._cfgOk=aria.core.JsonValidator.normalize({json:e,beanName:this._cfgBeanName},!0)}catch(t){var n=aria.core.Log;if(n){var r;for(var i=0,s=t.errors.length;i<s;i++)r=t.errors[i],r.message=n.prepareLoggedMessage(r.msgId,r.msgArgs);this.$logError(this.INVALID_CONFIGURATION
,null,t)}}},_getPlaceholderPath:function(){var e="",t=this._context;while(t){if(t.placeholderPath){e=t.placeholderPath+".";break}t=t.parent}return e+this._cfg.name}}});
//*******************
//LOGICAL-PATH:aria/embed/PlaceholderManager.js
//*******************
Aria.classDefinition({$classpath:"aria.embed.PlaceholderManager",$dependencies:["aria.utils.Type","aria.utils.Array"],$singleton:!0,$constructor:function(){this._contentChangeListener={fn:this._onContentChange,scope:this},this._providers=[]},$destructor:function(){this.unregisterAll(),this._contentChangeListener=null},$events:{contentChange:{description:"",properties:{placeholderPaths:"{Array} contains the placeholderPaths whose corresponding content has changed."}}},$statics:{PLACEHOLDER_PATH_NOT_FOUND:"No content has been found for the placeholder path '%1'"
},$prototype:{getContent:function(e){var t=[],n=aria.utils.Type,r=this._providers;for(var i=0,s=r.length;i<s;i++){var o=r[i],u=o.getContent(e);if(u)if(n.isArray(u))for(var a=0,f=u.length;a<f;a++)t.push(u[a]);else t.push(u)}return t.length===0&&this.$logWarn(this.PLACEHOLDER_PATH_NOT_FOUND,[e]),t},register:function(e){var t=this._providers;aria.utils.Array.contains(t,e)||(e.$addListeners({contentChange:this._contentChangeListener}),t.push(e))},unregister:function(e){var t=this._providers;aria.utils.Array.remove
(t,e)&&e.$removeListeners({contentChange:this._contentChangeListener})},unregisterAll:function(){var e=this._providers;while(e.length>0)this.unregister(e[0])},_onContentChange:function(e){this.$raiseEvent({name:"contentChange",placeholderPaths:e.contentPaths})}}});