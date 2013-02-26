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
//LOGICAL-PATH:aria/widgets/AriaLib.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.AriaLib",$singleton:!0,$extends:"aria.widgetLibs.WidgetLib",$prototype:{widgets:{Fieldset:"aria.widgets.container.Fieldset",Button:"aria.widgets.action.Button",IconButton:"aria.widgets.action.IconButton",Tooltip:"aria.widgets.container.Tooltip",Text:"aria.widgets.Text",Calendar:"aria.widgets.calendar.Calendar",Dialog:"aria.widgets.container.Dialog",Link:"aria.widgets.action.Link",Div:"aria.widgets.container.Div",TextField:"aria.widgets.form.TextField",Textarea:"aria.widgets.form.Textarea"
,Splitter:"aria.widgets.container.Splitter",Tab:"aria.widgets.container.Tab",TabPanel:"aria.widgets.container.TabPanel",PasswordField:"aria.widgets.form.PasswordField",DateField:"aria.widgets.form.DateField",DatePicker:"aria.widgets.form.DatePicker",MultiSelect:"aria.widgets.form.MultiSelect",TimeField:"aria.widgets.form.TimeField",NumberField:"aria.widgets.form.NumberField",AutoComplete:"aria.widgets.form.AutoComplete",CheckBox:"aria.widgets.form.CheckBox",RadioButton:"aria.widgets.form.RadioButton",Icon:"aria.widgets.Icon"
,SelectBox:"aria.widgets.form.SelectBox",Select:"aria.widgets.form.Select",SortIndicator:"aria.widgets.action.SortIndicator",Template:"aria.widgets.Template",List:"aria.widgets.form.list.List",Gauge:"aria.widgets.form.Gauge",ErrorList:"aria.widgets.errorlist.ErrorList"},registerWidget:function(){this.$logWarn("The registerWidget method is deprecated and does nothing. You should remove any call to this method.")},getBeanConfig:function(){return this.$logWarn("The getBeanConfig method is deprecated. You should remove any call to this method."
),"aria.widgets.CfgBeans"}}});
//*******************
//LOGICAL-PATH:aria/widgets/AriaSkinInterface.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.AriaSkinInterface",$singleton:!0,$dependencies:["aria.core.JsonValidator","aria.widgets.AriaSkinBeans","aria.widgets.AriaSkinNormalization","aria.core.DownloadMgr"],$statics:{WIDGET_SKIN_CLASS_OBJECT_NOT_FOUND:"There is no skin configuration for skin class %1 of widget %2. Skin class std will be used instead. The widget will probably not be displayed correctly."},$prototype:{skinImageProperties:["spriteURL","handleSpriteURLh","proxySpriteURLh","handleSpriteURLv"
,"proxySpriteURLv","spriteUrl","frameIcon","spriteURLv","spriteURLh"],normalizeSkin:function(){aria.widgets.AriaSkinNormalization.normalizeSkin(aria.widgets.AriaSkin.skinObject)},getWidgetStates:function(e){var t=aria.core.JsonValidator.getBean("aria.widgets.AriaSkinBeans."+e+"Cfg");return t&&t.$properties.states?t.$properties.states.$properties:null},getSkinObject:function(e,t,n){var r=this.getSkinClasses(e);if(r){t==null&&(t="std");var i=r[t];return i?i:n?null:(this.$logWarn(this.WIDGET_SKIN_CLASS_OBJECT_NOT_FOUND
,[t,e]),r.std)}},getSkinClasses:function(e){var t=aria.widgets.AriaSkin.skinObject[e];if(!t||!t["aria:skinNormalized"]){var n=aria.widgets.AriaSkinNormalization.normalizeWidget(e,t);n&&n!=t&&(t=n,aria.widgets.AriaSkin.skinObject[e]=n)}return t},getGeneral:function(){var e=aria.widgets.AriaSkin.skinObject.general;if(!e||!e["aria:skinNormalized"]){var t=aria.widgets.AriaSkinNormalization.normalizeGeneral(e);e!=t&&(e=t,aria.widgets.AriaSkin.skinObject.general=t)}return e},getIcon:function(e,t){var n=this.getSkinObject
("Icon",e,!0),r,i=0,s=0;if(n&&(r=n.content[t])!==undefined){if(n.biDimensional){var o=r.split("_");i=(n.iconWidth+n.spriteSpacing)*o[0],s=(n.iconHeight+n.spriteSpacing)*o[1]}else n.direction==="x"?i=(n.iconWidth+n.spriteSpacing)*r:n.direction==="y"&&(s=(n.iconHeight+n.spriteSpacing)*r);return{iconLeft:i,iconTop:s,cssClass:"xICN"+e,spriteURL:n.spriteURL,width:n.iconWidth,height:n.iconHeight}}return!1},getSkinName:function(){return aria.widgets.AriaSkin.skinName||"atdefskin"},_extractSkinImages:function(e,t){if(
e){var n=this.skinImageProperties;for(var r=0,i=n.length;r<i;r++){var s=n[r],o=e[s];o&&(t[o]=1)}}},preloadSkinImages:function(e){var t={};e||(e=aria.widgets.AriaSkin.skinObject);if(e)for(var n in e){var r=e[n];if(r&&e.hasOwnProperty(n)&&n!="general")for(var i in r){var s=r[i];if(s&&r.hasOwnProperty(i)){this._extractSkinImages(s,t),this._extractSkinImages(s.frame,t);var o=this.getWidgetStates(n),u=s.states;if(u&&o)for(var a in u)if(o.hasOwnProperty(a)){var f=u[a];f&&(this._extractSkinImages(f,t),this._extractSkinImages
(f.frame,t))}}}}var l=[];for(var c in t)t.hasOwnProperty(c)&&l.push('<span style="background-image:url(',this.getSkinImageFullUrl(c),');">&nbsp;</span>');var h=Aria.$window.document,p=h.createElement("div");return h.body.appendChild(p),p.style.display="none",p.innerHTML=l.join(""),p},getSkinImageFullUrl:function(e){return aria.core.DownloadMgr.resolveURL(this.getGeneral().imagesRoot+e,!0)},backgroundMacro:function(e,t,n){var r="",i="";if(t){var s=this.getSkinImageFullUrl(t);r="url("+s+") ",aria.utils.String.
endsWith(t,".png")?i=s.substring(0,s.length-4)+".gif":i=s}var o=["background: ",e," ",r,n,";"];return i&&o.push("_background-image: url(",i,") !important;"),o.join("")}}});
//*******************
//LOGICAL-PATH:aria/widgets/AriaSkinNormalization.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.AriaSkinNormalization",$dependencies:["aria.core.JsonValidator","aria.widgets.AriaSkinBeans","aria.utils.InheritanceNormalization","aria.utils.FunctionWriter","aria.utils.Function"],$singleton:!0,$constructor:function(){this._widgetNormalizers={},this._frameNormalizers={},this._createNormalizerObject=function(){};var e={normFrame:aria.utils.Function.bind(this._normFrame,this),checkFrameState:aria.utils.Function.bind(this._checkFrameState,this)};this._createNormalizerObject
.prototype=e},$destructor:function(){this._widgetNormalizers=null,this._createNormalizerObject&&(this._createNormalizerObject.prototype=null),this._createNormalizerObject=null},$statics:{MISSING_STD_SKINCLASS:"There is no skin configuration for skin class std of widget %1. The widget will probably not be displayed correctly.",INVALID_FRAME_TYPE:"Frame type %3 is not valid in widget %1, skin class %2.",INVALID_SKINNABLE_CLASS:"Skinnable class %1 is not valid",FRAME_NORMALIZATION_ERROR:"Error while normalizing the frame part of widget %1, skin class %2:\n %3"
,FRAME_STATE_NORMALIZATION_ERROR:"Error while normalizing the frame part of widget %1, skin class %2, state %3:\n %4",WIDGET_NORMALIZATION_ERROR:"Error while normalizing widget %1:\n %2",GENERAL_NORMALIZATION_ERROR:"Error while normalizing general skin properties:\n %1",DEPRECATED_FRAME_TYPE:"The frame type %1, used in widget %2, skin class %3, is deprecated. Please use either Table, FixedHeight, SimpleHTML or Simple."},$prototype:{_frameTypes:["Old0","Old1","Old2","Table","FixedHeight","SimpleHTML","Simple"
],skinnableClasses:{Button:1,Calendar:1,List:1,Link:1,Gauge:1,RadioButton:1,CheckBox:1,DatePicker:1,SelectBox:1,Textarea:1,ErrorList:1,Fieldset:1,MultiSelect:1,Select:1,SortIndicator:1,Splitter:1,Icon:1,Div:1,Dialog:1,TextInput:1,AutoComplete:1,TabPanel:1,Tab:1},_normFrame:function(e,t,n,r){n.frame==null&&(n.frame={});var i=n.frame;r=r||{};var s=r.frame||{},o,u="Simple";if(n.simpleHTML)o="SimpleHTML";else{var a=[i.frameType||i.sprType,n.sprType,s.frameType||s.sprType,r.sprType,u];for(var f=0,l=a.length;f<l;f++
)if(a[f]!=null){o=a[f];break}aria.utils.Type.isNumber(o)&&(o=this._frameTypes[o])}var c=this._getFrameNormalizers(e,t,o);c==null&&(o=u,c=this._getFrameNormalizers(e,t,o)),i.frameType=o,c.normFrameSkinClass(n,r);if(Aria.debug){/^Old/.test(o)&&this.$logWarn(this.DEPRECATED_FRAME_TYPE,[o,e,t]);var h=this._check(i,"aria.widgets.AriaSkinBeans."+o+"FrameCfg");h.result||this.$logWarn(this.FRAME_NORMALIZATION_ERROR,[e,t,h.message.replace(/\n/g,"\n ")])}return c.normFrameState},_checkFrameState:function(e,t,n,r,i){var s=
this._check(r,i);s.result||this.$logWarn(this.FRAME_STATE_NORMALIZATION_ERROR,[e,t,n,s.message.replace(/\n/g,"\n ")])},_getFrameNormalizers:function(e,t,n){var r=this._frameNormalizers[n];if(r==null){var i=aria.core.JsonValidator.getBean("aria.widgets.AriaSkinBeans."+n+"FrameCfg");if(i==null)return this.$logError(this.INVALID_FRAME_TYPE,[e,t,n]),null;r={normFrameSkinClass:this._createFrameNormalizer(n,i),normFrameState:this._createFrameStateNormalizer(n,"aria.widgets.AriaSkinBeans."+n+"FrameStateCfg")},this.
_frameNormalizers[n]=r}return r},normalizeSkin:function(e){if(e["aria:skinNormalized"])return;for(var t in e)e.hasOwnProperty(t)&&t!="general"&&(e[t]=this.normalizeWidget(t,e[t]));return e.general=this.normalizeGeneral(e.general),e["aria:skinNormalized"]=!0,e},_createSkinClassNormalizer:function(e,t){if(e=="Icon")return function(e,n,r){t.$fastNorm(n)};var n=t.$properties.frame!=null,r=new aria.utils.FunctionWriter(["skinClassName","skin","std"]);aria.utils.InheritanceNormalization.writeInheritanceNormalization
({writer:r,beanDef:t,varToNormalize:"skin",parentVars:["std"],excludes:{states:!0,frame:!0}});if(n)var i=r.createTempVariable("this.normFrame(this.widgetName,skinClassName,skin,std)");var s=t.$properties.states;if(s){s=s.$properties,r.writeEnsureObjectExists("skin.states");var o=r.createTempVariable("skin.states"),u=r.createTempVariable("std.states||{}"),a=r.out;for(var f in s)if(s.hasOwnProperty(f)&&f!="normal"){var l=r.getDotProperty(f);r.writeEnsureObjectExists(o+l),a.push("this.normState(",o,l,",",u,l,","
,o,".normal,",u,".normal);"),n&&a.push(i,".call(this,skinClassName,",r.stringify(f),",",o,l,",",u,l,",",o,".normal, ",u,".normal);")}r.writeEnsureObjectExists(o+".normal"),a.push("this.normState(",o,".normal, ",u,".normal);"),n&&a.push(i,'.call(this,skinClassName,"normal",',o,".normal,",u,".normal);")}var c=r.createFunction();return r.$dispose(),c},_createStateNormalizer:function(e,t){var n=t.$properties.states;if(n==null)return null;var r=new aria.utils.FunctionWriter(["state","stdState","normal","stdNormal"
]);aria.utils.InheritanceNormalization.writeInheritanceNormalization({writer:r,beanDef:n.$properties.normal,varToNormalize:"state",parentVars:["stdState","normal","stdNormal"],excludes:{frame:!0}});var i=r.createFunction();return r.$dispose(),i},_createFrameStateNormalizer:function(e,t){var n=aria.core.JsonValidator.getBean(t),r=new aria.utils.FunctionWriter(["skinClassName","stateName","state","stdState","normal","stdNormal"]);r.writeEnsureObjectExists("state.frame"),r.writeEnsureObjectExists("stdState"),r.
writeEnsureObjectExists("normal"),r.writeEnsureObjectExists("stdNormal"),aria.utils.InheritanceNormalization.writeInheritanceNormalization({writer:r,beanDef:n,varToNormalize:"state.frame",parentVars:["state","stdState.frame","stdState","normal.frame","normal","stdNormal.frame","stdNormal"]});var i=n.$properties;for(var s in i)i.hasOwnProperty(s)&&r.out.push("delete state",r.getDotProperty(s),";");Aria.debug&&r.out.push("this.checkFrameState(this.widgetName,skinClassName,stateName,state.frame,",r.stringify(t)
,");");var o=r.createFunction();return r.$dispose(),o},_createFrameNormalizer:function(e,t){var n=new aria.utils.FunctionWriter(["skin","std"]),r=n.out;aria.utils.InheritanceNormalization.writeInheritanceNormalization({writer:n,beanDef:t,varToNormalize:"skin.frame",parentVars:["skin","std.frame","std"]});var i=t.$properties;for(var s in i)i.hasOwnProperty(s)&&r.push("delete skin",n.getDotProperty(s),";");var o=n.createFunction();return n.$dispose(),o},_getWidgetNormalizer:function(e){var t=this._widgetNormalizers
[e];if(!t){var n=aria.core.JsonValidator.getBean("aria.widgets.AriaSkinBeans."+e+"Cfg");t=new this._createNormalizerObject,t.widgetName=e,t.normSkinClass=this._createSkinClassNormalizer(e,n),t.normState=this._createStateNormalizer(e,n),this._widgetNormalizers[e]=t}return t},normalizeWidget:function(e,t){if(!this.skinnableClasses.hasOwnProperty(e))return this.$logError(this.INVALID_SKINNABLE_CLASS,[e]),null;t==null&&(t={});var n=this._getWidgetNormalizer(e),r="aria.widgets.AriaSkinBeans."+e+"Cfg",i=t.std;i==null&&
(this.$logWarn(this.MISSING_STD_SKINCLASS,[e]),i={},t.std=i);var s=!0,o=aria.core.Log,u=[],a;for(var f in t)if(t.hasOwnProperty(f)&&f!="std"){var l=t[f];n.normSkinClass(f,l,i),a=this._check(l,r),a.result||(s=!1),o&&a.message&&u.push(o.prepareLoggedMessage("In skin class %1:\n %2",[f,a.message.replace(/\n/g,"\n ")]))}return n.normSkinClass("std",i,{}),a=this._check(i,r),a.result||(s=!1),o&&a.message&&u.push(o.prepareLoggedMessage("In skin class %1:\n %2",["std",a.message.replace(/\n/g,"\n ")])),s||this.$logWarn
(this.WIDGET_NORMALIZATION_ERROR,[e,u.join("\n").replace(/\n/g,"\n ")]),t["aria:skinNormalized"]=!0,t},_processJsonValidatorError:function(e){var t,n=e.errors,r=aria.core.Log;if(n&&n.length>0&&r){var i=[],s;for(var o=0,u=n.length;o<u;o+=1)s=n[o],i[o]=r.prepareLoggedMessage(s.msgId,s.msgArgs);t=i.join("\n")}return{result:!1,message:t}},_check:function(e,t){try{return{result:aria.core.JsonValidator.check(e,t,!0),message:null}}catch(n){return this._processJsonValidatorError(n)}},_normalize:function(e){try{return{
result:aria.core.JsonValidator.normalize(e,!0),message:null}}catch(t){return this._processJsonValidatorError(t)}},normalizeGeneral:function(e){var t={json:e,beanName:"aria.widgets.AriaSkinBeans.GeneralCfg"},n=this._normalize(t);return n.result||this.$logWarn(this.GENERAL_NORMALIZATION_ERROR,[n.message.replace(/\n/g,"\n ")]),e["aria:skinNormalized"]=!0,t.json}}});
//*******************
//LOGICAL-PATH:aria/widgets/CfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.widgets.CfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes",templates:"aria.templates.CfgBeans",environmentBase:"aria.core.environment.EnvironmentBaseCfgBeans",FormListCfg:"aria.widgets.form.list.CfgBeans",dragDrop:"aria.utils.dragdrop.DragDropBean",common:"aria.widgetLibs.CommonBeans"},$beans:{WidgetCfg:{$type:"json:Object",$description:"",$properties:{id:{$type:"json:String",$description:"",$mandatory:!1},bind:{$type:"json:Object",$description:"",$properties
:{tooltip:{$type:"common:BindingRef"}},$sample:{tooltip:{to:"name",inside:"REF HERE - e.g.: data"}}},tooltip:{$type:"json:String",$description:"",$default:null},tooltipId:{$type:"json:String",$description:"",$default:null},width:{$type:"json:Integer",$description:"",$default:-1},verticalAlign:{$type:"json:String",$description:""},margins:{$type:"json:String",$description:"",$default:null},block:{$type:"json:Boolean",$description:"",$default:!1},printOptions:{$type:"templates:PrintOptions"},sclass:{$type:"json:String"
,$description:"",$default:"std"},tabIndex:{$type:"json:Integer",$description:"",$default:null}}},ContainerCfg:{$type:"ResizableWidgetCfg",$description:"",$properties:{}},ResizableWidgetCfg:{$type:"WidgetCfg",$description:"",$properties:{height:{$type:"json:Integer",$description:"",$default:-1},minWidth:{$type:"json:Integer",$description:""},maxWidth:{$type:"json:Integer",$description:""},minHeight:{$type:"json:Integer",$description:""},maxHeight:{$type:"json:Integer",$description:""},scrollBarX:{$type:"json:Boolean"
,$description:"",$default:!1},scrollBarY:{$type:"json:Boolean",$description:"",$default:!0}}},InputCfg:{$type:"WidgetCfg",$description:"",$properties:{bind:{$type:"WidgetCfg.bind",$properties:{label:{$type:"common:BindingRef"},value:{$type:"common:BindingRef"},mandatory:{$type:"common:BindingRef"},readOnly:{$type:"common:BindingRef"},disabled:{$type:"common:BindingRef"},error:{$type:"common:BindingRef"},errorMessages:{$type:"common:BindingRef"},formatError:{$type:"common:BindingRef"},formatErrorMessages:{$type
:"common:BindingRef"},invalidText:{$type:"common:BindingRef"},requireFocus:{$type:"common:BindingRef"},name:{$type:"common:BindingRef"}}},inputMetaData:{$type:"json:String",$description:""},value:{$type:"json:MultiTypes",$description:""},mandatory:{$type:"json:Boolean",$description:"",$default:!1},readOnly:{$type:"json:Boolean",$description:"",$default:!1},error:{$type:"json:Boolean",$description:"",$default:!1},errorMessages:{$type:"json:Array",$description:"",$contentType:{$type:"json:String",$description:""
},$default:[]},formatError:{$type:"json:Boolean",$description:""},formatErrorMessages:{$type:"json:Array",$description:"",$contentType:{$type:"json:String",$description:""},$default:[]},invalidText:{$type:"json:String",$description:""},requireFocus:{$type:"json:Boolean",$description:"",$default:!1},directOnBlurValidation:{$type:"json:Boolean",$description:""},validationGroups:{$type:"json:Array",$description:"",$contentType:{$type:"json:String",$description:""}},onvalidate:{$type:"common:Callback",$description
:""},validationEvent:{$type:"json:Enum",$enumValues:["onFocus","onBlur","none"],$default:"onFocus",$description:""},name:{$type:"json:String",$description:"",$mandatory:!1},disabled:{$type:"json:Boolean",$description:"",$default:!1},label:{$type:"json:String",$description:"",$default:null},labelAlign:{$type:"json:Enum",$description:"",$enumValues:["left","right","center"],$default:"left"},labelPos:{$type:"json:Enum",$description:"",$enumValues:["left","top","right","bottom"],$default:"left"},labelWidth:{$type
:"json:Integer",$description:"",$default:-1},labelHeight:{$type:"json:Integer",$description:"",$default:-1},hideLabel:{$type:"json:Boolean",$description:"",$default:!1}}},CheckBoxCfg:{$type:"InputCfg",$description:"",$properties:{labelPos:{$type:"InputCfg.labelPos",$description:"",$default:"right"},value:{$type:"InputCfg.value",$description:"",$default:!1},onchange:{$type:"common:Callback",$description:""},icon:{$type:"json:String",$description:"",$default:null},tabIndex:{$type:"WidgetCfg.tabIndex",$default:0
}}},RadioButtonCfg:{$type:"CheckBoxCfg",$description:"",$properties:{bind:{$type:"CheckBoxCfg.bind",$properties:{keyValue:{$type:"common:BindingRef"}}},value:{$type:"CheckBoxCfg.value",$description:"",$default:""},keyValue:{$type:"json:String",$description:"",$default:""}}},TextInputCfg:{$type:"InputCfg",$description:"",$properties:{maxlength:{$type:"json:Integer",$description:"",$default:-1},helptext:{$type:"json:String",$description:""},validationDelay:{$type:"json:Integer",$description:"",$default:null},onchange
:{$type:"common:Callback",$description:""},spellCheck:{$type:"json:Boolean",$description:""},autoselect:{$type:"json:Boolean",$description:""},bind:{$type:"InputCfg.bind",$properties:{prefill:{$type:"common:BindingRef"},prefillError:{$type:"common:BindingRef"}}}}},TextFieldCfg:{$type:"TextInputCfg",$description:"",$properties:{}},TextareaCfg:{$type:"TextInputCfg",$description:"",$properties:{height:{$type:"json:Integer",$description:"",$default:-1}}},SortIndicatorCfg:{$type:"ActionWidgetCfg",$description:"",
$properties:{view:{$type:"json:ObjectRef",$description:"",$classpath:"aria.templates.View"},sortKeyGetter:{$type:"json:FunctionRef",$description:""},refreshArgs:{$type:"json:Array",$description:"",$contentType:{$type:"templates:RefreshCfg"}},sortName:{$type:"json:String",$description:"",$mandatory:!0},labelWidth:{$type:"json:Integer",$description:"",$default:-1},activateEllipsis:{$type:"json:Boolean",$description:"",$default:!1},ellipsis:{$type:"json:String",$description:""},ellipsisLocation:{$type:"json:Enum"
,$enumValues:["left","right"],$description:"",$default:"right"}}},PasswordFieldCfg:{$type:"TextInputCfg",$description:"",$properties:{}},DateFieldCfg:{$type:"TextInputCfg",$description:"",$properties:{pattern:{$type:"environmentBase:FormatTypes",$description:""},minValue:{$type:"json:Date",$description:""},maxValue:{$type:"json:Date",$description:""},referenceDate:{$type:"json:Date",$description:""},bind:{$type:"TextInputCfg.bind",$properties:{referenceDate:{$type:"common:BindingRef"}}}}},TimeFieldCfg:{$type
:"TextInputCfg",$description:"",$properties:{pattern:{$type:"environmentBase:FormatTypes",$description:""}}},NumberFieldCfg:{$type:"TextInputCfg",$description:"",$properties:{pattern:{$type:"environmentBase:FormatTypes",$description:"",$default:""}}},DropDownTextInputCfg:{$type:"TextInputCfg",$description:"",$properties:{popupWidth:{$type:"json:Integer",$description:"",$default:-1}}},DropDownInputCfg:{$type:"InputCfg",$description:"",$properties:{popupWidth:{$type:"json:Integer",$description:"",$default:-1}}
},ListItemCfg:{$type:"json:Object",$description:"",$restricted:!1,$properties:{value:{$type:"json:String",$description:"",$mandatory:!0},label:{$type:"json:String",$description:"",$mandatory:!0}}},MultiSelectCfg:{$type:"DropDownTextInputCfg",$description:"",$properties:{activateSort:{$type:"json:Boolean",$description:"",$default:!1},fieldSeparator:{$type:"json:String",$description:"",$default:","},maxOptions:{$type:"json:Integer",$description:"",$minValue:1},fieldDisplay:{$type:"json:Enum",$description:"",$enumValues
:["code","label"],$default:"label"},valueOrderedByClick:{$type:"json:Boolean",$description:"",$default:!0},instantBind:{$type:"json:Boolean",$description:"",$default:!1},listTemplate:{$type:"json:PackageName",$description:"",$default:"aria.widgets.form.templates.TemplateMultiSelect"},listSclass:{$type:"json:String",$description:""},items:{$type:"ListCfg.items",$description:""},numberOfColumns:{$type:"FormListCfg:numberOfColumns",$description:""},numberOfRows:{$type:"FormListCfg:numberOfRows",$description:""}
,displayOptions:{$type:"FormListCfg:displayOptions",$description:""}}},DatePickerCfg:{$type:"DropDownTextInputCfg",$description:"",$properties:{pattern:{$type:"environmentBase:FormatTypes",$description:""},inputPattern:{$type:"environmentBase:inputFormatTypes",$description:""},minValue:{$type:"json:Date",$description:""},maxValue:{$type:"json:Date",$description:""},referenceDate:{$type:"json:Date",$description:""},calendarTemplate:{$type:"json:PackageName",$description:""},calendarLabel:{$type:"json:String",
$description:""},calendarDisplayUnit:{$type:"json:Enum",$description:"",$enumValues:["M","W"]},calendarNumberOfUnits:{$type:"json:Integer",$description:""},calendarFirstDayOfWeek:{$type:"json:Integer",$description:"",$minValue:0,$maxValue:6},calendarMonthLabelFormat:{$type:"json:String",$description:""},calendarDayOfWeekLabelFormat:{$type:"json:String",$description:""},calendarDateLabelFormat:{$type:"json:String",$description:""},calendarCompleteDateLabelFormat:{$type:"json:String",$description:""},calendarShowWeekNumbers
:{$type:"json:Boolean",$description:""},calendarShowShortcuts:{$type:"json:Boolean",$description:""},calendarRestrainedNavigation:{$type:"json:Boolean",$description:""},calendarSclass:{$type:"json:String",$description:""},iconTooltip:{$type:"json:String",$description:"",$default:"Open the Calendar"},bind:{$type:"TextInputCfg.bind",$properties:{referenceDate:{$type:"common:BindingRef"}}}}},SelectBoxCfg:{$type:"DropDownTextInputCfg",$description:"",$properties:{listTemplate:{$type:"json:PackageName",$description
:""},listSclass:{$type:"json:String",$description:""},options:{$type:"json:Array",$description:"",$contentType:{$type:"ListItemCfg"},$default:[]},bind:{$type:"TextInputCfg.bind",$properties:{options:{$type:"common:BindingRef"}}}}},SelectCfg:{$type:"DropDownInputCfg",$description:"",$properties:{tabIndex:{$type:"WidgetCfg.tabIndex",$default:0},listTemplate:{$type:"json:PackageName",$description:""},listSclass:{$type:"json:String",$description:""},options:{$type:"json:Array",$description:"",$contentType:{$type
:"ListItemCfg"},$default:[]},onchange:{$type:"common:Callback",$description:""},bind:{$type:"InputCfg.bind",$properties:{options:{$type:"common:BindingRef"}}}}},AutoCompleteCfg:{$type:"DropDownTextInputCfg",$description:"",$properties:{autoFill:{$type:"json:Boolean",$description:"",$default:!0},freeText:{$type:"json:Boolean",$description:"",$default:!0},suggestionsTemplate:{$type:"json:PackageName",$description:""},resourcesHandler:{$type:"json:MultiTypes",$description:"",$contentTypes:[{$type:"json:PackageName"
,$description:""},{$type:"json:ObjectRef",$description:""}],$mandatory:!0},preselect:{$type:"json:String",$description:"",$default:"strict"},expandButton:{$type:"json:Boolean",$description:"",$default:!1},popupMaxHeight:{$type:"json:Integer",$description:""},listSclass:{$type:"json:String",$description:""}}},ActionWidgetCfg:{$type:"WidgetCfg",$description:"",$properties:{label:{$type:"json:String",$description:"",$default:""},onclick:{$type:"common:Callback",$description:""}}},ButtonCfg:{$type:"ActionWidgetCfg"
,$description:"",$properties:{bind:{$type:"WidgetCfg.bind",$properties:{disabled:{$type:"common:BindingRef"}}},height:{$type:"json:Integer",$description:"",$default:-1},disabled:{$type:"json:Boolean",$description:"",$default:!1},selected:{$type:"json:Boolean",$description:"",$default:!1},tabIndex:{$type:"WidgetCfg.tabIndex",$default:0}}},TextCfg:{$type:"WidgetCfg",$description:"",$properties:{bind:{$type:"WidgetCfg.bind",$properties:{text:{$type:"common:BindingRef"}}},text:{$type:"json:String",$description:""
,$default:""},activateEllipsis:{$type:"json:Boolean",$description:"",$default:!1},ellipsis:{$type:"json:String",$description:""},ellipsisLocation:{$type:"json:Enum",$enumValues:["left","right"],$description:"",$default:"right"}}},IconButtonCfg:{$type:"ButtonCfg",$description:"",$properties:{icon:{$type:"json:String",$description:"",$default:null},sourceImage:{$type:"json:Object",$description:"",$properties:{path:{$type:"json:String",$description:"",$default:null},width:{$type:"json:Integer",$description:"",$default
:16},height:{$type:"json:Integer",$description:"",$default:16}}}}},LinkCfg:{$type:"ActionWidgetCfg",$description:"",$properties:{color:{$type:"json:String",$description:""}}},SpriteCfg:{$type:"json:Object",$description:"",$properties:{name:{$type:"json:String",$description:"",$default:null},cssClass:{$type:"json:String",$description:"",$default:""},spriteURL:{$type:"json:String",$description:"",$default:null},spriteSpacing:{$type:"json:Integer",$description:"",$default:0},iconWidth:{$type:"json:Integer",$description
:"",$default:-1},iconHeight:{$type:"json:Integer",$description:"",$default:-1},biDimensional:{$type:"json:Boolean",$description:"",$default:!1},direction:{$type:"json:String",$description:"",$default:"x"},content:{$type:"json:Map",$description:"",$contentType:{$type:"json:MultiTypes",$description:"",$contentTypes:[{$type:"json:Integer",$description:""},{$type:"json:String",$description:""}]}}}},IconCfg:{$type:"WidgetCfg",$description:"",$properties:{icon:{$type:"json:String",$description:"",$default:null},sourceImage
:{$type:"json:Object",$description:"",$properties:{path:{$type:"json:String",$description:"",$default:null},width:{$type:"json:Integer",$description:"",$default:16},height:{$type:"json:Integer",$description:"",$default:16}}}}},DivCfg:{$type:"ResizableWidgetCfg",$description:"",$properties:{bind:{$type:"ResizableWidgetCfg.bind",$properties:{width:{$type:"common:BindingRef"},height:{$type:"common:BindingRef"}}},cssClass:{$type:"json:String",$description:"",$default:""},minWidth:{$type:"ResizableWidgetCfg.$properties.minWidth"
,$description:""},maxWidth:{$type:"ResizableWidgetCfg.$properties.maxWidth",$description:""},minHeight:{$type:"ResizableWidgetCfg.$properties.minHeight",$description:""},maxHeight:{$type:"ResizableWidgetCfg.$properties.maxHeight",$description:""}}},TemplateCfg:{$type:"ResizableWidgetCfg",$description:"",$properties:{printOptions:{$type:"WidgetCfg.printOptions",$default:"adaptXY"},defaultTemplate:{$type:"json:PackageName",$description:"",$mandatory:!0},data:{$type:"json:ObjectRef",$description:"",$mandatory:!1
},moduleCtrl:{$type:"templates:ModuleCtrl",$description:"",$mandatory:!1},args:{$type:"json:Array",$description:"",$contentType:{$type:"json:MultiTypes",$description:""},$default:[]},baseTabIndex:{$type:"json:Integer",$description:"",$default:0}}},TooltipCfg:{$type:"ResizableWidgetCfg",$description:"",$properties:{id:{$type:"WidgetCfg.id",$mandatory:!0},macro:{$type:"templates:MacroCfg",$description:"",$mandatory:!1},sclass:{$type:"WidgetCfg.sclass",$default:"tooltip"},showOnlyOnMouseStill:{$type:"json:Boolean"
,$description:"",$default:!0},showDelay:{$type:"json:Integer",$description:"",$default:100},closeOnMouseClick:{$type:"json:Boolean",$description:"",$default:!0},closeOnMouseOut:{$type:"json:Boolean",$description:"",$default:!0},closeOnMouseOutDelay:{$type:"json:Integer",$description:"",$default:100},closeOnMouseScroll:{$type:"json:Boolean",$description:"",$default:!0}}},ErrorListCfg:{$type:"ResizableWidgetCfg",$description:"",$properties:{bind:{$type:"WidgetCfg.bind",$properties:{messages:{$type:"common:BindingRef"
}}},defaultTemplate:{$type:"json:String",$description:"",$default:"aria.widgets.errorlist.ErrorListTemplate"},messages:{$type:"json:ObjectRef",$description:"",$default:[]},displayCodes:{$type:"json:Boolean",$description:"",$default:!0},title:{$type:"json:String",$description:"",$default:""},filterTypes:{$type:"json:Array",$description:"",$default:null,$contentType:{$type:"json:String",$description:"",$mandatory:!0},$sample:["F","E"]},block:{$type:"ResizableWidgetCfg.block",$default:!0}}},CalendarCfg:{$type:"ResizableWidgetCfg"
,$description:"",$properties:{bind:{$type:"WidgetCfg.bind",$properties:{value:{$type:"common:BindingRef"},startDate:{$type:"common:BindingRef"}}},tabIndex:{$type:"WidgetCfg.tabIndex",$default:0},label:{$type:"json:String",$description:""},showWeekNumbers:{$type:"json:Boolean",$description:"",$default:!0},defaultTemplate:{$type:"json:PackageName",$description:""},onclick:{$type:"common:Callback",$description:""},onchange:{$type:"common:Callback",$description:""},value:{$type:"json:Date",$description:""},minValue
:{$type:"json:Date",$description:""},maxValue:{$type:"json:Date",$description:""},displayUnit:{$type:"json:Enum",$description:"",$enumValues:["M","W"]},numberOfUnits:{$type:"json:Integer",$description:"",$default:3},startDate:{$type:"json:Date",$description:""},firstDayOfWeek:{$type:"json:Integer",$description:"",$minValue:0,$maxValue:6},monthLabelFormat:{$type:"json:String",$description:""},dayOfWeekLabelFormat:{$type:"json:String",$description:""},dateLabelFormat:{$type:"json:String",$description:""},completeDateLabelFormat
:{$type:"json:String",$description:""},showShortcuts:{$type:"json:Boolean",$description:"",$default:!0},restrainedNavigation:{$type:"json:Boolean",$description:"",$default:!0}}},ListCfg:{$type:"ResizableWidgetCfg",$description:"",$properties:{tabIndex:{$type:"WidgetCfg.tabIndex",$default:0},defaultTemplate:{$type:"json:PackageName",$description:"",$default:"aria.widgets.form.list.templates.ListTemplate"},preselect:{$type:"json:String",$description:"",$default:"strict"},items:{$type:"json:MultiTypes",$description
:"",$contentTypes:[{$type:"json:Array",$description:"",$contentType:{$type:"json:Object",$description:"",$properties:{label:{$type:"json:String",$description:""},value:{$type:"json:MultiTypes",$description:""}}}},{$type:"json:Object",$description:"",$properties:{container:{$type:"json:Object",$description:"",$default:{}},labelProperty:{$type:"json:String",$description:"",$default:""},valueProperty:{$type:"json:String",$description:"",$default:""}}}]},selectedValues:{$type:"json:Array",$description:"",$default
:[],$contentType:{$type:"json:MultiTypes",$description:""}},selectedIndex:{$type:"json:Integer",$description:""},maxOptions:{$type:"json:Integer",$description:"",$minValue:1},multipleSelect:{$type:"json:Boolean",$description:"",$default:!1},activateSort:{$type:"json:Boolean",$description:"",$default:!1},disabled:{$type:"json:Boolean",$description:"",$default:!1},onclick:{$type:"common:Callback",$description:""},onchange:{$type:"common:Callback",$description:""},onkeyevent:{$type:"common:Callback",$description
:""},onmouseover:{$type:"common:Callback",$description:""},bind:{$type:"WidgetCfg.bind",$properties:{selectedValues:{$type:"common:BindingRef"},selectedIndex:{$type:"common:BindingRef"},items:{$type:"common:BindingRef"},disabled:{$type:"common:BindingRef"},multipleSelect:{$type:"common:BindingRef"},maxOptions:{$type:"common:BindingRef"}}},displayOptions:{$type:"FormListCfg:displayOptions",$description:""},numberOfColumns:{$type:"FormListCfg:numberOfColumns",$description:""},numberOfRows:{$type:"FormListCfg:numberOfRows"
,$description:""},onclose:{$type:"common:Callback",$description:""}}},DialogCfg:{$type:"DivCfg",$description:"",$properties:{bind:{$type:"DivCfg.bind",$properties:{visible:{$type:"common:BindingRef"},contentMacro:{$type:"common:BindingRef"},title:{$type:"common:BindingRef"},xpos:{$type:"common:BindingRef"},ypos:{$type:"common:BindingRef"},maximized:{$type:"common:BindingRef",$description:""},center:{$type:"common:BindingRef"}}},title:{$type:"json:String",$description:"",$default:""},visible:{$type:"json:Boolean"
,$description:"",$default:!1},contentMacro:{$type:"templates:MacroCfg",$description:""},icon:{$type:"json:String",$description:""},modal:{$type:"json:Boolean",$description:"",$default:!1},closable:{$type:"json:Boolean",$description:"",$default:!0},maximizable:{$type:"json:Boolean",$description:"",$default:!1},closeOnMouseClick:{$type:"json:Boolean",$description:"",$default:!1},center:{$type:"json:Boolean",$description:"",$default:!0},xpos:{$type:"json:Integer",$description:"",$default:0},ypos:{$type:"json:Integer"
,$description:"",$default:0},movable:{$type:"json:Boolean",$description:""},resizable:{$type:"json:Boolean",$description:"",$default:!1},movableProxy:{$type:"dragDrop:ProxyCfg",$description:""},onOpen:{$type:"common:Callback",$description:""},onCloseClick:{$type:"common:Callback",$description:""},ondragstart:{$type:"common:Callback",$description:""},ondragend:{$type:"common:Callback",$description:""},beforeresize:{$type:"common:Callback",$description:""},resizeend:{$type:"common:Callback",$description:""}}},
FieldsetCfg:{$type:"ResizableWidgetCfg",$description:"",$properties:{bind:{$type:"WidgetCfg.bind",$properties:{width:{$type:"common:BindingRef"},height:{$type:"common:BindingRef"}}},onSubmit:{$type:"common:Callback",$description:""},label:{$type:"json:String",$description:""},minWidth:{$type:"ResizableWidgetCfg.$properties.minWidth",$description:""},maxWidth:{$type:"ResizableWidgetCfg.$properties.maxWidth",$description:""},minHeight:{$type:"ResizableWidgetCfg.$properties.minHeight",$description:""},maxHeight
:{$type:"ResizableWidgetCfg.$properties.maxHeight",$description:""}}},TabCfg:{$type:"ContainerCfg",$description:"",$properties:{bind:{$type:"WidgetCfg.bind",$properties:{selectedTab:{$type:"common:BindingRef"}}},tabId:{$type:"json:String",$description:"",$mandatory:!0},disabled:{$type:"json:Boolean",$description:"",$default:!1},selectedTab:{$type:"json:String",$description:""}}},TabPanelCfg:{$type:"ContainerCfg",$description:"",$properties:{bind:{$type:"WidgetCfg.bind",$properties:{width:{$type:"common:BindingRef"
},height:{$type:"common:BindingRef"},selectedTab:{$type:"common:BindingRef"}}},selectedTab:{$type:"json:String",$description:""},macro:{$type:"templates:MacroCfg",$description:"",$mandatory:!1},block:{$type:"WidgetCfg.block",$default:!0},minWidth:{$type:"ResizableWidgetCfg.$properties.minWidth",$description:""},maxWidth:{$type:"ResizableWidgetCfg.$properties.maxWidth",$description:""},minHeight:{$type:"ResizableWidgetCfg.$properties.minHeight",$description:""},maxHeight:{$type:"ResizableWidgetCfg.$properties.maxHeight"
,$description:""}}},GaugeCfg:{$type:"WidgetCfg",$description:"",$properties:{bind:{$type:"WidgetCfg.bind",$properties:{label:{$type:"common:BindingRef"},currentValue:{$type:"common:BindingRef"},maxValue:{$type:"common:BindingRef"}}},label:{$type:"json:String",$description:"",$default:""},labelWidth:{$type:"json:Integer",$description:"",$default:-1},labelAlign:{$type:"json:Enum",$description:"",$enumValues:["left","right","center"],$default:"center"},gaugeWidth:{$type:"json:Integer",$description:"",$default:150
},minValue:{$type:"json:Integer",$description:"",$default:0},maxValue:{$type:"json:Integer",$description:"",$default:100},currentValue:{$type:"json:Integer",$description:"",$default:0}}},SplitterCfg:{$type:"ResizableWidgetCfg",$description:"",$properties:{macro1:{$type:"templates:MacroCfg",$description:"",$mandatory:!0},macro2:{$type:"templates:MacroCfg",$description:"",$mandatory:!0},size1:{$type:"json:Integer",$description:""},size2:{$type:"json:Integer",$description:""},height:{$type:"ResizableWidgetCfg.height"
,$mandatory:!0},width:{$type:"ResizableWidgetCfg.width",$mandatory:!0},adapt:{$type:"json:Enum",$enumValues:["size1","size2","both"],$description:"",$default:"both"},orientation:{$type:"json:Enum",$enumValues:["horizontal","vertical"],$description:"",$default:"horizontal"},border:{$type:"json:Boolean",$description:"",$default:!0},bind:{$type:"WidgetCfg.bind",$properties:{size1:{$type:"common:BindingRef"},size2:{$type:"common:BindingRef"}}}}}}});
//*******************
//LOGICAL-PATH:aria/widgets/GlobalStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.GlobalStyle",
    $dependencies : ["aria.widgets.environment.WidgetSettings","aria.widgets.AriaSkinInterface"],
    $extends: "aria.widgets.WidgetStyle"
}}

{macro main()}
    {var general = aria.widgets.AriaSkinInterface.getGeneral()/}
/* Note: all private classes start with 'x' - these classes must not be used in application pages as they can change when new features are implemented */

/* BACKWARD-COMPATIBILITY-BEGIN */
/* CSS rules added by Aria Templates itself should not impact the whole page */

/* Global classes */
body, textarea, select, input, button, table {
{if general.font.size}
    font-size: ${general.font.size}px;
{/if}
{if general.font.family}
    font-family: ${general.font.family};
{/if}
}
body {
    padding: 0;
    margin: 0;
    cursor:default;
{if general.colors.bkg}
    background-color: ${general.colors.bkg};
{/if}
}

a {
{call writeAnchorState(general.anchor.states.normal)/}
}
a:link {
{call writeAnchorState(general.anchor.states.link)/}
}
a:visited {
{call writeAnchorState(general.anchor.states.visited)/}
}
a:hover {
{call writeAnchorState(general.anchor.states.hover)/}
}

{if ! general.disable.ul.list.style}
ul, li {list-style-type:none;}
{/if}

/* Hide input focus on safari*/
{if aria.core.Browser.isSafari || aria.core.Browser.isChrome}
*:focus {
    outline: 0;
}
{/if}

a:focus {
{call writeAnchorState(general.anchor.states.focus)/}
}

/* BACKWARD-COMPATIBILITY-END */

.xLDI {
    {call background(general.loadingOverlay.backgroundColor, general.loadingOverlay.spriteURL,"no-repeat center center")/}
    {call opacity(general.loadingOverlay.opacity)/}
}

.xOverlay {
    background-color: ${general.overlay.backgroundColor};
    {call opacity(general.overlay.opacity)/}
    border: ${general.overlay.border};
}

/*AT Widget wrapper DOMElm */
{var widgetSettings = aria.widgets.environment.WidgetSettings.getWidgetSettings() /}
.xWidget {
    position: relative;
    display: inline-block;
    {if widgetSettings.middleAlignment}vertical-align: middle;{/if}
}

.xWidget.xBlock, .xBlock {
    display: block;
}

/* Mask for modal dialogs */
.xDialogMask {
    /* width and height are required for IE6 to work correctly */
    width:100%;
    height:100%;
    background-color: ${general.dialogMask.backgroundColor};
    {call opacity(general.dialogMask.opacity || 40) /}
}

.xFrameContent {
    display: inline-block;
    position:relative;
    padding: 0 0 0 0 !important;
    border: 0 0 0 0 !important;
}

.xFixedHeightFrame_w {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: {if widgetSettings.middleAlignment}middle{else/}top{/if};
}
.xFixedHeightFrame_bme {
    display: inline-block;
    vertical-align: {if widgetSettings.middleAlignment}middle{else/}top{/if};
}
.xSimpleFrame {
    display: inline-block;
    position: relative;
}

{if aria.core.Browser.isIE7 }
.xFixedHeightFrame_w {
    vertical-align:top;
}

.xFixedHeightFrame_bme {
    vertical-align:top;
}
{/if}

{if aria.core.Browser.isIE10 }
.xTextInputInput::-ms-clear {
    display: none;
}
.xTextInputInput::-ms-reveal {
    display: none;
}
{/if}
{/macro}

/* BACKWARD-COMPATIBILITY-BEGIN */
{macro writeAnchorState(state)}
{if state.color}
    color: ${state.color};
{/if}
{if state.text.decoration}
    text-decoration: ${state.text.decoration};
{/if}
{if state.outline}
    outline: ${state.outline};
{/if}
{/macro}
/* BACKWARD-COMPATIBILITY-END */

{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/Icon.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.Icon",$extends:"aria.widgets.Widget",$dependencies:["aria.utils.Dom"],$css:["aria.widgets.IconStyle"],$constructor:function(e,t){this.$Widget.constructor.apply(this,arguments),this._iconInfo=null,this._cssClassNames="xWidget"},$statics:{ERROR_ICON:null,ERROR_ICON_TITLE:"Icon % not found",ICON_BADLY_FORMATTED:"%1Icon name is not valid: %2",ICON_NOT_FOUND:"%1Icon was not found: %2"},$prototype:{writeMarkup:function(e){var t=this._cfg,n=this._domId,r=t.tooltip,i=t.
sourceImage,s=i?{imageURL:i.path,width:i.width,height:i.height}:this._getIconInfo(t.icon);s||(r=this.ERROR_ICON_TITLE.replace("%",t.icon),s=this._getErrIcon()),this._cfgOk&&(r!=null&&r!==""?r='title="'+r+'" ':r="",e.write(['<span id="',n,'" class="',this._getIconClasses(s),'" ',r,'style="',this._getIconStyle(s),'"></span>'].join("")),this._iconInfo=s),this._domReady=!0},changeIcon:function(e){if(!this._iconInfo)return;var t=this._getIconInfo(e);if(t){var n=this.getDom();n.style.cssText=this._getIconStyle(t),
n.className=this._getIconClasses(t)}this._iconInfo=t},getCurrentIconInfo:function(){return this._iconInfo},_getIconInfo:function(e){var t=e.split(":");if(t.length!==2)return this.$logError(this.ICON_BADLY_FORMATTED,[e]),null;var n=aria.widgets.AriaSkinInterface.getIcon(t[0],t[1]);return n?n:(this.$logError(this.ICON_NOT_FOUND,[e]),null)},_getIconStyle:function(e){var t=this._cfg,n=e.verticalAlign?"vertical-align: "+e.verticalAlign:"",r="margin: 0 0 0 0 ";if(t.margins!=null&&t.margins.match(/^(\d+|x) (\d+|x) (\d+|x) (\d+|x)$/
)){var i=t.margins.split(" ");r=["margin:",i[0],"px ",i[1],"px ",i[2],"px ",i[3],"px; "].join("")}else e.margins!=null&&(r=e.margins);return t.sourceImage?[r,";padding:0;background:url(",e.imageURL,") no-repeat; width:",e.width,"px;height:",e.height,"px;",n].join(""):[r,";padding:0;background-position:-",e.iconLeft,"px -",e.iconTop,"px;width:",e.width,"px;height:",e.height,"px;",n].join("")},_getIconClasses:function(e){var t=this._cfg,n=aria.core.TplClassLoader.addPrintOptions(this._cssClassNames,t.printOptions
);return e.cssClass&&(n+=" "+e.cssClass),t.block&&(n+=" xBlock"),n},_getErrIcon:function(){return this.ERROR_ICON||(aria.widgets.Icon.prototype.ERROR_ICON=aria.widgets.AriaSkinInterface.getIcon("std","missing")),this.ERROR_ICON}}});
//*******************
//LOGICAL-PATH:aria/widgets/IconStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.IconStyle",
    $extends : "aria.widgets.WidgetStyle",
    $dependencies : ["aria.widgets.environment.WidgetSettings"]
}}
    {var skinnableClassName="Icon"/}

    {macro writeSkinClass(info)}
        {var widgetSettings = aria.widgets.environment.WidgetSettings.getWidgetSettings() /}
        
        /* Icon class: ${info.skinClassName} */
        .xICN${info.skinClassName} {
            {if !widgetSettings.middleAlignment}vertical-align:top;{/if}
            font-size:1px;
            width:${info.skinClass.iconWidth}px;
            height:${info.skinClass.iconHeight}px;
            {call background("",info.skinClass.spriteURL,"no-repeat top left") /}
        }
        
        {if info.skinClassName == "checkBoxes" && !widgetSettings.middleAlignment}
            .xICN${info.skinClassName} {
                vertical-align:middle;    
            }
        {/if}
    {/macro}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/Template.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.Template",$extends:"aria.widgets.container.Container",$dependencies:["aria.templates.TemplateTrait","aria.templates.TemplateCtxt","aria.utils.Dom","aria.templates.CfgBeans","aria.templates.ModuleCtrlFactory","aria.core.environment.Customizations"],$events:{ElementReady:{description:""}},$constructor:function(e,t){aria.widgets.Template.superclass.constructor.apply(this,arguments),e.width!=-1&&(this._cssClassNames+=" xOverflowXAuto"),e.height!=-1&&(this._cssClassNames+=" xOverflowYAuto"
),this._defaultMargin=0,this._subTplDiv=null,this.subTplCtxt=null,this._needCreatingModuleCtrl=e.moduleCtrl&&e.moduleCtrl.getData==null,this._tplcfg={classpath:aria.core.environment.Customizations.getTemplateCP(e.defaultTemplate),args:e.args,id:this._domId,originalId:this.getId()},this.tplLoadCallback=null},$destructor:function(){this.removeDelegation(),this._subTplDiv=null,this.subTplCtxt&&(this.subTplCtxt.$dispose(),this.subTplCtxt=null),this.tplLoadCallback=null,this._deleteTplcfg(),aria.widgets.Template.
superclass.$destructor.call(this)},$prototype:{$init:function(e){var t=aria.templates.TemplateTrait.prototype;for(var n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])},_directInit:!0,_deleteTplcfg:function(){if(this._tplcfg){var e=this._tplcfg,t=e.toDispose;if(t){var n=t.length;for(var r=0;r<n;r++)t[r].$dispose()}e.toDispose=null,e.tplDiv=null,e.div=null,e.data=null,this._tplcfg=null}},_errorWhileLoadingTemplate:function(){var e=this._subTplDiv;e&&(e.className="xTplContent",aria.utils.Dom.replaceHTML
(e,"#ERROR WHILE LOADING TEMPLATE#")),this._deleteTplcfg(),this.$callback(this.tplLoadCallback,{success:!1})},_checkCfgConsistency:function(){var e=this._tplcfg,t=this._cfg;if(this._needCreatingModuleCtrl){if(!aria.core.JsonValidator.normalize({json:t.moduleCtrl,beanName:"aria.templates.CfgBeans.InitModuleCtrl"})){this._cfgOk=!1;return}}else e.moduleCtrl=t.moduleCtrl;t.width>-1&&(e.width=t.width),t.height>-1&&(e.height=t.height),e.printOptions=t.printOptions,e.baseTabIndex=t.baseTabIndex},_onTplLoad:function(
e,t){var n=this._tplcfg;if(!n){t.autoDispose&&e.moduleCtrlPrivate.$dispose();return}var r=this._subTplDiv;n.tplDiv=r,n.div=this._domElt,n.data=this._cfg.data,e.moduleCtrl&&(n.moduleCtrl=e.moduleCtrl),n.isRootTemplate=!1,n.context=this._context,t.autoDispose&&(n.toDispose==null?n.toDispose=[e.moduleCtrlPrivate]:n.toDispose.push(e.moduleCtrlPrivate));var i=new aria.templates.TemplateCtxt;this.subTplCtxt=i,i.parent=this._context;var e=i.initTemplate(n);e?(i.dataReady(),r&&i._cfg&&(r.className=i.getCSSClassNames
(),i.$onOnce({Ready:this.__innerTplReadyCb,SectionRefreshed:{fn:this.__innerTpl1stRefreshed,args:{success:!0,templateCtxt:i},scope:this},scope:this}),i.$refresh()),this.tplcfg=null):(i.$dispose(),this.subTplCtxt=null,this._errorWhileLoadingTemplate()),r=null},__innerTpl1stRefreshed:function(e,t){this.$callback(this.tplLoadCallback,t)},_init:function(){aria.widgets.Template.superclass._init.call(this);var e=aria.utils.Dom.getDomElementChild(this._domElt,0);this._subTplDiv=e;var t=this.subTplCtxt;t&&(t.linkToPreviousMarkup
(e),this.$callback(this.tplLoadCallback,{success:!0,templateCtxt:t}),t.viewReady()),this.isDiffered||(this.isDiffered=t&&!t._ready,this.isDiffered&&t.$on({Ready:{fn:this.__differedComplete,scope:this}}))},_widgetMarkup:function(e){var t=this._tplcfg;Aria.load({templates:[t.classpath],classes:this._needCreatingModuleCtrl?[this._cfg.moduleCtrl.classpath]:null,oncomplete:{scope:this,fn:this._onModuleCtrlLoad}});var n=this.subTplCtxt,r;n?(e.write('<div class="'+n.getCSSClassNames()+'">'),r=n.getMarkup(),r!=null?
e.write(r):e.write("#ERROR IN SUBTEMPLATE#"),e.write("</div>")):this._tplcfg?(e.write('<div class="xLDI"></div>'),this.isDiffered=!0):e.write("<div>#ERROR IN SUBTEMPLATE#</div>")},getDomElt:function(){return this._domElt},__differedComplete:function(){this.isDiffered=!1,this.$raiseEvent("ElementReady")}}});
//*******************
//LOGICAL-PATH:aria/widgets/TemplateBasedWidget.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.TemplateBasedWidget",$extends:"aria.widgets.container.Container",$dependencies:["aria.widgets.Template"],$events:{widgetContentReady:{description:""}},$destructor:function(){this._subTplModuleCtrl&&(this._subTplModuleCtrl.$unregisterListeners(this),this._subTplModuleCtrl=null),this._subTplCtxt=null,this._subTplData=null,this._tplWidget&&(this._tplWidget.$dispose(),this._tplWidget=null),aria.widgets.TemplateBasedWidget.superclass.$destructor.call(this)},$prototype
:{__inherithCfg:["tooltip","tooltipId","tabIndex","margins","block","printOptions"],_initTemplate:function(e){if(this._cfgOk){var t=this._cfg;for(var n=0,r=this.__inherithCfg.length;n<r;n+=1){var i=this.__inherithCfg[n];e.hasOwnProperty(i)||(e[i]=t[i])}t.defaultTemplate&&(e.defaultTemplate=t.defaultTemplate),t.id&&(e.id=t.id+"_t_"),this._tplWidget=new aria.widgets.Template(e,this._context,this._lineNumber),this._tplWidget.tplLoadCallback={fn:this._tplLoadCallback,scope:this}}},_onModuleEvent:function(e){},_tplLoadCallback
:function(e){e.success&&(this._subTplCtxt=e.templateCtxt,this._subTplModuleCtrl=e.templateCtxt.moduleCtrl,this._subTplData=this._subTplCtxt.data,this._subTplModuleCtrl&&this._subTplModuleCtrl.$on({"*":this._onModuleEvent,scope:this}),this._registerBindings(),this._tplWidget&&(this.initWidgetDom(this._tplWidget.getDom()),this.$raiseEvent("widgetContentReady")))},writeMarkup:function(e){if(!this._cfgOk)return aria.widgets.TemplateBasedWidget.superclass.writeMarkup.call(this,e);this._tplWidget._delegateId=aria.
utils.Delegate.add({fn:this.delegate,scope:this}),this._tplWidget.writeMarkup(e),this._domReady=!0},initWidget:function(){if(!this._cfgOk)return;this._tplWidget.initWidget()}}});
//*******************
//LOGICAL-PATH:aria/widgets/Text.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.Text",$extends:"aria.widgets.Widget",$dependencies:["aria.utils.Ellipsis","aria.DomEvent","aria.utils.Dom","aria.utils.String"],$constructor:function(e,t){this.$Widget.constructor.apply(this,arguments),aria.utils.Type.isString(e.ellipsis)&&(this._activateEllipsis=!0,this._directInit=!0),this._defaultMargin=0},$destructor:function(){this.textContent=null,this._ellipsis&&(this._ellipsis.$dispose(),this._ellipsis=null),this._hasMouseOver=null,this._hasFocus=null,this
.$Widget.$destructor.call(this)},$prototype:{_activateEllipsis:!1,_hasMouseOver:!1,_hasFocus:!1,_widgetMarkup:function(e){var t=this._cfg,n=this._cfg.text;n!==null?n=""+n:n="",this.textContent=n,e.write('<span class="createdEllipisElement">'+aria.utils.String.escapeHTML(this.textContent)+"</span>")},_init:function(){this._activateEllipsis===!0&&this.__ellipseText(this._cfg.text)},__ellipseText:function(e){e!==null?e=""+e:e="";var t=this.getDom();if(t){var n=aria.utils.String;this.textContent=e,t.style.display="inline-block"
,t.style.overflow="hidden",t.style.whiteSpace="nowrap",t.style.verticalAlign="top";var r,i=aria.utils.Dom.getDomElementChild(t,0);i||(t.innerHTML='<span class="createdEllipisElement">'+n.escapeHTML(this.textContent)+"</span>",i=aria.utils.Dom.getDomElementChild(t,0)),this._cfg.width>0&&(r=this._cfg.width,t.style.width=this._cfg.width+"px",this._ellipsis=new aria.utils.Ellipsis(i,r,this._cfg.ellipsisLocation,this._cfg.ellipsis,this._context),this._ellipsis.ellipsesNeeded||(t.removeChild(i),t.innerHTML=n.escapeHTML
(e)))}},_onBoundPropertyChange:function(e,t,n){var r=this.getDom();e=="text"&&t!==null&&(this._activateEllipsis?(r.innerHTML="",this.__ellipseText(t)):(t=""+t,r.getElementsByTagName("span")[0].innerHTML=aria.utils.String.escapeHTML(t)))},_dom_onmouseover:function(e){this.$Widget._dom_onmouseover.call(this,e),this._ellipsis&&this._ellipsis.ellipsesNeeded&&(this._hasMouseOver=!0,this._ellipsis.displayFullText({left:0,top:0}))},_dom_onmouseout:function(e){this.$Widget._dom_onmouseout.call(this,e),this._ellipsis&&
this._ellipsis.ellipsesNeeded&&this._hasFocus===!1&&this._hasMouseOver===!0&&(this._hasMouseOver=!1,this._ellipsis._hideFullText(e.relatedTarget))}}});
//*******************
//LOGICAL-PATH:aria/widgets/Widget.js
//*******************
(function(){var e=null,t=null;Aria.classDefinition({$classpath:"aria.widgets.Widget",$extends:"aria.widgetLibs.BindableWidget",$dependencies:["aria.widgets.CfgBeans","aria.utils.Json","aria.utils.Dom","aria.DomEvent","aria.utils.Delegate","aria.widgets.AriaSkinInterface","aria.utils.Type","aria.templates.RefreshManager"],$onload:function(){e=aria.utils.Delegate,t=aria.utils.Json,aria.widgets.AriaSkin||this.$JsObject.$logError.call(this,this.SKIN_NOT_READY)},$onunload:function(){e=null,t=null},$constructor:function(
e,n,r){e=e?e:{},this.$BindableWidget.constructor.call(this,e,n,r),this.$assert(18,n&&n.$getId),this._domElt=null,this._defaultMargin=1,this._hasMarkup=!0,this.isDiffered=!1,this._delegateId=null,this._initDone=!1,this._domReady=!1,this._refreshMap=null,this._cssClassNames="xWidget",this.__initWhileContentChange=!1;try{this._cfgOk=aria.core.JsonValidator.normalize({json:e,beanName:this._cfgBean||this._cfgPackage+"."+this.$class+"Cfg"},!0)}catch(i){var s=aria.core.Log;if(s){var o;for(var u=0,a=i.errors.length;
u<a;u+=1)o=i.errors[u],o.message=s.prepareLoggedMessage(o.msgId,o.msgArgs);this.$logError(this.INVALID_CONFIGURATION,null,i)}}var f=e.bind;if(f){var l,c,h,p,d;for(var v in f)if(f.hasOwnProperty(v)){l=f[v],c=l.inside,h=l.to,d=l.transform;if(c&&(h||h===0)){p=c[h];if(typeof p!="undefined"){if(d){p=this._transform(d,p,"toWidget");if(typeof p=="undefined")continue}this._cfg[v]=p}else if(typeof this._cfg[v]!="undefined"){var m=this._transform(d,this._cfg[v],"fromWidget");t.setValue(c,h,m)}}}}var g=e.id,y;g&&g.indexOf
("+")>-1&&(Aria.testMode&&(y=this._context.$getAutoId(g)),delete e.id,g=null),this._domId=y||(g?this._context.$getId(g):this._createDynamicId())},$destructor:function(){this.removeDelegation(),this._tooltipWidget&&(this._tooltipWidget=null),this._domElt&&(this._domElt.__widget=null),this.$BindableWidget.$destructor.call(this),this._domElt=null,this._refreshMap=null,this._context=null,this._cfg=null},$statics:{SKIN_NOT_READY:"CRITICAL ! There is no skin available, widgets can not be used. Check that the skin (css+js) is properly loaded."
,WIDGET_NOT_FOUND:"%1Following %3 widget was not found in DOM: %2",WIDGET_TOOLTIP_NOT_FOUND:"%1Tooltip with id '%2', for widget %3 was not found in template '%4'.",WIDGET_BINDING_ERROR:"%1Binding failed in widget: 	Inside:%2	To:%3",INVALID_CONFIGURATION:"%1Configuration for widget is not valid.",WIDGET_PROPERTY_DEPRECATION:"%1The following property is deprecated and will be removed from the framework in the near future. Refactor your code to avoid any issues. Property:'%2'.",INVALID_VERTICAL_ALIGN:"%1Invalid verticalAlign:'%2'."
,verticalAlignTester:/^[%a-z0-9-]*$/},$prototype:{_cfgPackage:"aria.widgets.CfgBeans",_cfgBean:null,_directInit:!1,writeMarkup:function(e){this._cfgOk?(this._hasMarkup&&this.__markupBegin(e),this._widgetMarkup(e),this._hasMarkup&&this.__markupEnd(e),this._domReady=!0):e.write('#ERROR#<span style="font-size:x-small"><br/>Widget: '+this.$classpath+"<br/>Tpl:"+this._context.tplClasspath+"<br/>Line: "+this._lineNumber+"</span>")},writeMarkupBegin:function(e){this._cfgOk?(this._hasMarkup&&this.__markupBegin(e),this
._widgetMarkupBegin(e)):e.write('#ERROR - Begin#<span style:"font-size:x-small"><br/>Widget: '+this.$classpath+"<br/>Tpl:"+this._context.tplClasspath+"<br/>Line: "+this._lineNumber+"</span>")},writeMarkupEnd:function(e){this._cfgOk?(this._widgetMarkupEnd(e),this._hasMarkup&&this.__markupEnd(e),this._domReady=!0):e.write("#ERROR - End#")},getId:function(){return this._cfg.id},__markupEnd:function(e){e.write("</span>")},__markupBegin:function(t){var n=this._cfg,r=aria.core.TplClassLoader.addPrintOptions(this._cssClassNames
,n.printOptions);n.block&&(r+=" xBlock"),this._checkCfgConsistency(),t.write('<span id="'+this._domId+'" '),this._delegateId||(this._delegateId=e.add({fn:this.delegate,scope:this})),t.write(e.getMarkup(this._delegateId)+" "),t.write('class="'+r+'" '),t.write('style="'),this._spanStyle!=null&&t.write(this._spanStyle),n.width>-1&&t.write("width:"+n.width+"px;"),n.height!=null&&n.height!=-1&&t.write("height:"+n.height+"px;"),n.verticalAlign!=null&&(this.verticalAlignTester.test(n.verticalAlign)?t.write("vertical-align:"+
n.verticalAlign+";"):this.$logError(this.INVALID_VERTICAL_ALIGN,[n.verticalAlign]));if(n.margins!=null&&n.margins.match(/^(\d+|x) (\d+|x) (\d+|x) (\d+|x)$/)){var i=n.margins.split(" ");t.write(["margin:",i[0]==="x"?this._defaultMargin:i[0],"px ",i[1]==="x"?this._defaultMargin:i[1],"px ",i[2]==="x"?this._defaultMargin:i[2],"px ",i[3]==="x"?this._defaultMargin:i[3],'px;" '].join(""))}else t.write("margin:"+this._defaultMargin+'px;" ');n.tooltip&&t.write('title="'+n.tooltip+'" ');if(n.tabIndex!=null&&!this._customTabIndexProvided&&!
n.disabled){var s=this._calculateTabIndex();t.write('tabindex="'+s+'" ')}t.write(">")},_calculateTabIndex:function(){var e=-1;return this._context&&this._context._cfg&&this._context._cfg.baseTabIndex>=0&&(this._cfg.tabIndex>0?e=this._context._cfg.baseTabIndex+this._cfg.tabIndex:e=this._cfg.tabIndex),e},_widgetMarkup:function(e){},_widgetMarkupBegin:function(e){},_widgetMarkupEnd:function(e){},_checkCfgConsistency:function(){},_linkToTooltipWidget:function(){var e=this._cfg.tooltipId;if(!e)return;var t=this._context
.getBehaviorById(e);if(!t){this.$logError(this.WIDGET_TOOLTIP_NOT_FOUND,[e,this.$class,this._context.tplClasspath]);return}this._tooltipWidget=t},_dom_onmousemove:function(e){this._tooltipWidget&&(this._tooltipWidget.associatedWidgetMouseMove(this,e),e.$dispose())},_dom_onmouseover:function(e){this._tooltipWidget&&(this._tooltipWidget.associatedWidgetMouseOver(this,e),e.$dispose())},_dom_onmouseout:function(e){this._tooltipWidget&&(this._tooltipWidget.associatedWidgetMouseOut(this,e),e.$dispose())},initWidget
:function(){this._linkToTooltipWidget(),this._registerBindings(),this._directInit&&this._hasMarkup&&this.initWidgetDom()},initWidgetDom:function(e){this._initDone=!0,e||(e=aria.utils.Dom.getElementById(this._domId),e||this.$logError(this.WIDGET_NOT_FOUND,[this._domId,this.$class])),e.__widget=this,this._domElt=e,this._init()},_init:function(){},setProperty:function(e,n){var r;if(!this._cfg)return null;var i=this._cfg.bind,s=this.getProperty(e);this._cfg[e]=n;if(i){var o=i[e];if(o){var u=o.inside,a=o.to,f=o.transform
;if(u&&(a||a===0)){r=this._transform(f,n,"fromWidget");var l=this._bindingListeners[e];t.setValue(u,a,r,l?l.cb:null)}}}if(s!==n)return{oldValue:s,newValue:n}},setWidgetProperty:function(e,t){if(!this._cfg)return;var n=this.getProperty(e);t!=n&&(this._cfg[e]=t,this._onBoundPropertyChange(e,t,n))},changeProperty:function(e,t){if(!this._cfg)return;this.setWidgetProperty(e,t),this.setProperty(e,t)},getProperty:function(e){return this._cfg?this._cfg[e]:null},_notifyDataChange:function(e,t){if(!this._cfg)return;var n=
this._cfg.bind[t],r=this._transform(n.transform,n.inside[n.to],"toWidget");aria.templates.RefreshManager.isStopped()?(this._refreshMap||(aria.templates.RefreshManager.queue({fn:this._notifyDataChangeCB,scope:this},this),this._refreshMap={}),this._refreshMap[t]=r):this.setWidgetProperty(t,r)},_notifyDataChangeCB:function(){var e=this._refreshMap;if(!e)return;this._refreshMap=null;for(var t in e)e.hasOwnProperty(t)&&this.setWidgetProperty(t,e[t])},_onBoundPropertyChange:function(e,t,n){var r=this.getDom();e=="tooltip"&&
(r.title=t);if(e=="disabled"){var i=r.tabIndex!=null;t&&i&&r.removeAttribute("tabindex",0);if(!t&&!i){var s=this.getProperty("tabIndex");s&&(r.tabIndex=s)}}},delegate:function(e){var t=e.delegateTarget;if(!this._cfg.disabled&&!this._cfg.readOnly){this._initDone||(e.type=="contentchange"&&(this.__initWhileContentChange=!0),this.initWidgetDom(t));var n="_dom_on"+e.type;return this[n]?this[n](e)!==!1:!0}},getDom:function(){return!this._domElt&&this._domReady&&this.initWidgetDom(),this._domElt},removeDelegation:
function(){this._delegateId&&(e.remove(this._delegateId),delete this._delegateId)}}})})();
//*******************
//LOGICAL-PATH:aria/widgets/WidgetsRes.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.widgets.WidgetsRes",$resources:{errors:{"40006_WIDGET_NUMBERFIELD_VALIDATION":"Number field must be a numerical value.","40007_WIDGET_TIMEFIELD_VALIDATION":"Please enter a valid time format, for example: 1000 or 10:00","40008_WIDGET_DATEFIELD_VALIDATION":"Please enter a valid date format, for example: 10/12 or 01MAR or +4","40018_WIDGET_DATEFIELD_MINVALUE":"Date is before the minimum date.","40019_WIDGET_DATEFIELD_MAXVALUE":"Date is after the maximum date.","40020_WIDGET_AUTOCOMPLETE_VALIDATION"
:"There is no suggestion available for the given entry.","":""}}});
//*******************
//LOGICAL-PATH:aria/widgets/WidgetStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.WidgetStyle",
    $dependencies : ["aria.widgets.AriaSkinInterface"],
    $hasScript: true
}}

    {var skinnableClassName="Widget"/}
    {var useFrame=false/}
    
    {macro main()}
        {call startLooping()/}
    {/macro}

    {macro startLooping()}
        {var skinClasses=aria.widgets.AriaSkinInterface.getSkinClasses(skinnableClassName)/}
        {foreach skinClass in skinClasses}
            {var info={
                skinClassName: skinClass_index,
                skinClass: skinClass
            }/}
            {call writeSkinClass(info)/}
            {call writeAllStates(info)/}
        {/foreach}
    {/macro}

    {macro writeAllStates(info)}
        {var states=aria.widgets.AriaSkinInterface.getWidgetStates(skinnableClassName)/}
        {if states}
            {foreach state in states}
                {var info={
                    skinClassName: info.skinClassName,
                    skinClass: info.skinClass,
                    stateName: state_index,
                    state: info.skinClass.states[state_index]
                }/}
                {if useFrame}
                    {call writeStateOfFrame(info)/}
                {/if}
                {call writeState(info)/}
            {/foreach}
        {/if}
    {/macro}

    {macro writeSkinClass(info)}
        // to be overridden
    {/macro}

    {macro writeState(info)}
        // to be overridden
    {/macro}
    
    {macro background(color,imageurl,otherparams)}
        {checkDefault color=""/}
        {checkDefault imageurl=""/}
        {checkDefault otherparams=""/}
        ${aria.widgets.AriaSkinInterface.backgroundMacro(color,imageurl,otherparams)}
    {/macro}
    
    {macro opacity(percent)}
        filter: alpha(opacity=${percent});
        -moz-opacity: ${percent/100};
        opacity: ${percent/100};
    {/macro}

    // Macros for frames:

    /*{macro writeStateOfFrame(info)}
        {var sprType=info.skinClass.sprType/}
        {if sprType==}
            {call writeStateOfTableFrame(info)/}
        {elseif sprType==""/}
            {call writeStateOfFixedHeightFrame(info)/}
        {elseif sprType==6/}
            {call writeStateOfSimpleFrame(info)/}
        {/if}        
    {/macro}*/
    
    {macro writeStateOfFixedHeightFrame(info)}
        {var state=info.state.frame/}
        {var sprWidth=state.sprWidth/}
        {var sprHeight=state.sprHeight/}
        {var sprIndex=state.sprIdx/}
        {var sprSpacing=state.sprSpacing/}
        {var refTop=(sprHeight+sprSpacing)*sprIndex/}
        {var spcLeft=state.spcLeft/}
        {var spcRight=sprWidth-spcLeft/}
        {var prefix=cssPrefix(info)/}

        .${prefix}bkgA {
            {call background("transparent",state.spriteURL,"no-repeat scroll 0 0")/}
            font-size:1px;
        }
        .${prefix}bkgB {
            {call background("transparent",state.spriteURLv,"repeat-x 0 0")/}
        }
        .${prefix}w {
            height:${sprHeight}px;
        }
        .${prefix}c {
            margin: ${state.marginTop}px ${state.marginRight}px ${state.marginBottom}px ${state.marginLeft}px;
            color: ${state.color};
        }
        {if state.skipLeftBorder!=true}
        .${prefix}b {width:${spcLeft}px; height:${sprHeight}px; background-position:0 ${-refTop}px;}
        {/if}
        .${prefix}m {height:${sprHeight}px; background-position:0 ${-refTop}px;}
        {if state.skipRightBorder!=true}
        .${prefix}e {width:${spcRight}px; height:${sprHeight}px; background-position: ${-spcLeft}px ${-refTop}px;}
        {/if}
    {/macro}

    {macro writeStateOfSimpleFrame(info)}
        {var state=info.state.frame/}
        {var padTop=state.paddingTop/}
        .${cssPrefix(info)}frame  {
            border: ${state.borderSize}px ${state.border} ${state.borderColor};
            padding: ${state.paddingTop}px ${state.paddingRight}px ${state.paddingBottom}px ${state.paddingLeft}px;
            {if (padTop>1)}
            *padding-top: ${padTop-1}px;
            {/if}
            background-color: ${state.backgroundColor};
            color: ${state.color};
            vertical-align: top;
        }
    {/macro}

    {macro writeStateOfTableFrame(info)}
        {var state=info.state.frame/}
        {var sprWidth=state.sprWidth/}
        {var sprHeight=state.sprHeight/}
        {var sprIndex=state.sprIdx/}
        {var sprSpacing=state.sprSpacing/}
        {var refTop=(sprHeight+sprSpacing)*sprIndex/}
        {var refLeft=(sprWidth+sprSpacing)*sprIndex/}
        {var spcLeft=state.spcLeft/}
        {var spcTop=state.spcTop/}
        {var spcRight=sprWidth-spcLeft/}
        {var spcBottom=sprHeight-spcTop/}
        {var prefix=cssPrefix(info)/}

        .${prefix}bkgA {
            {call background("transparent",state.spriteURL,"no-repeat scroll 0 0")/}
            font-size:1px;
        }
        .${prefix}bkgB {
            {call background("transparent",state.spriteURLv,"repeat-x 0 0")/}
            font-size:1px;
        }
        .${prefix}bkgC {
            {call background("transparent",state.spriteURLh,"repeat-y 0 0")/}
            font-size:1px;
        }
        .${prefix}c {
            margin: ${state.marginTop}px ${state.marginRight}px ${state.marginBottom}px ${state.marginLeft}px;
            color: ${state.color};
        }
        .${prefix}m {
            background-color: ${state.backgroundColor};
        }
        .${prefix}tlc {width:${spcLeft}px; height:${spcTop}px; background-position:0 ${-refTop}px;}
        .${prefix}ts {height:${spcTop}px; background-position:0 ${-refTop}px; }
        .${prefix}trc {width:${spcRight}px; height:${spcTop}px; background-position: ${-spcLeft}px ${-refTop}px;}
        .${prefix}rs {width:${spcRight}px; background-position:${-refLeft-spcLeft}px 0;}
        .${prefix}brc {width:${spcRight}px; height:${spcBottom}px; background-position: ${-spcLeft}px ${-refTop-spcTop}px;}
        .${prefix}bs {height: ${spcBottom}px; background-position:0 ${-refTop-spcTop}px;}
        .${prefix}blc {width:${spcLeft}px; height:${spcBottom}px; background-position: 0 ${-refTop-spcTop}px;}
        .${prefix}ls {width: ${spcLeft}px; background-position:${-refLeft}px 0;}
        .${prefix}frameIcon {
                display: block;
                height:${state.frameHeight}px;
                {call background("",state.frameIcon,"no-repeat "+state.frameIconHPos)/}
        }
    {/macro}

{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/WidgetStyleScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.widgets.WidgetStyleScript",$prototype:{macro_writeStateOfFrame:function(e){var t=this["macro_writeStateOf"+e.skinClass.frame.frameType+"Frame"];t&&t.call(this,e)},cssPrefix:function(e){return"x"+this.skinnableClassName+"_"+e.skinClassName+"_"+e.stateName+"_"}}});
//*******************
//LOGICAL-PATH:aria/widgets/environment/WidgetSettings.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.environment.WidgetSettings",$extends:"aria.core.environment.EnvironmentBase",$dependencies:["aria.widgets.environment.WidgetSettingsCfgBeans","aria.widgetLibs.environment.WidgetLibsSettings"],$singleton:!0,$prototype:{_cfgPackage:"aria.widgets.environment.WidgetSettingsCfgBeans.AppCfg",getWidgetLib:function(){return Aria.getClassRef(this.getWidgetLibClassName())},getWidgetLibClassName:function(){return this.$logWarn("The getWidgetLibClassName and getWidgetLib methods are deprecated. There is no longer a single default library. Instead of these methods, you can consider using the getWidgetLibs method in aria.widgetLibs.environment.WidgetLibsSettings."
),aria.widgetLibs.environment.WidgetLibsSettings.getWidgetLibs().aria},getWidgetSettings:function(){return this.checkApplicationSettings("widgetSettings")}}});
//*******************
//LOGICAL-PATH:aria/widgets/environment/WidgetSettingsCfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.widgets.environment.WidgetSettingsCfgBeans",$namespaces:{json:"aria.core.JsonTypes",dragDrop:"aria.utils.dragdrop.DragDropBean"},$description:"",$beans:{AppCfg:{$type:"json:Object",$description:"",$restricted:!1,$properties:{widgetSettings:{$type:"WidgetSettingsCfg",$description:"",$default:{}},defaultWidgetLib:{$type:"json:String",$description:""}}},WidgetSettingsCfg:{$type:"json:Object",$description:"",$properties:{directOnBlurValidation:{$type:"json:Boolean",$description
:"",$default:!0},autoselect:{$type:"json:Boolean",$description:"",$default:!1},middleAlignment:{$type:"json:Boolean",$description:"",$default:!0},dialog:{$type:"json:Object",$description:"",$properties:{movable:{$type:"json:Boolean",$description:"",$default:!1},movableProxy:{$type:"dragDrop:ProxyCfg",$description:""}},$default:{}}}}}});
//*******************
//LOGICAL-PATH:aria/widgets/action/ActionWidget.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.action.ActionWidget",$extends:"aria.widgets.Widget",$dependencies:["aria.utils.Function","aria.utils.Dom","aria.templates.DomEventWrapper"],$constructor:function(){this.$Widget.constructor.apply(this,arguments),this._actingDom=null},$destructor:function(){this._actingDom&&(this._actingDom=null),this.$Widget.$destructor.call(this)},$prototype:{_init:function(){var e=aria.utils.Dom.getDomElementChild(this.getDom(),0);e&&(this._actingDom=e,this._initActionWidget(e)
),e=null},_initActionWidget:function(e){},_dom_onclick:function(e){this._performAction(e)},_performAction:function(e){if(this._cfg){var t;e&&(t=new aria.templates.DomEventWrapper(e));var n=this.evalCallback(this._cfg.onclick,t);return t&&t.$dispose(),n}return!0},focus:function(){this._focusElt||this.getDom(),this._focusElt.focus()}}});
//*******************
//LOGICAL-PATH:aria/widgets/action/Button.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.action.Button",$extends:"aria.widgets.action.ActionWidget",$dependencies:["aria.widgets.frames.FrameFactory","aria.utils.Dom","aria.DomEvent","aria.utils.String"],$css:["aria.widgets.action.ButtonStyle"],$constructor:function(e,t){this.$ActionWidget.constructor.apply(this,arguments),this._mouseOver=!1,this._mousePressed=!1,this._keyPressed=!1,this._updateState(!0),this._customTabIndexProvided=!0,this.currTarget=null,this._skinnableClass||(this._skinnableClass="Button"
),this._simpleHTML=aria.widgets.AriaSkinInterface.getSkinObject(this._skinnableClass,e.sclass).simpleHTML,this._simpleHTML||(this._frame=aria.widgets.frames.FrameFactory.createFrame({height:e.height,width:e.width,state:this._state,sclass:e.sclass,skinnableClass:this._skinnableClass,"oldStuff:cssRoot":"BTN",scrollBarX:!1,scrollBarY:!1}))},$destructor:function(){this.currTarget=null,this._frame&&(this._frame.$dispose(),this._frame=null),this.$ActionWidget.$destructor.call(this)},$prototype:{_updateState:function(
e){var t="normal",n=this._cfg;n.disabled?t="disabled":this._mousePressed&&this._mouseOver||this._keyPressed?t="msdown":this._mouseOver&&(t="msover"),this._state=t,e||(this.getDom(),this._simpleHTML?t=="disabled"?this._focusElt.setAttribute("disabled","disabled"):this._focusElt.removeAttribute("disabled"):(this._frame.changeState(this._state),this._focusElt.className=t=="disabled"?"xButton xButtonDisabled":"xButton"))},_onBoundPropertyChange:function(e,t,n){this.$ActionWidget._onBoundPropertyChange.apply(this
,arguments);var r=!1;e==="disabled"&&(r=!0,this._isDisabled=!!t),r&&(this._cfg[e]=t,this._updateState())},_initActionWidget:function(e){this._simpleHTML||this._frame.linkToDom(aria.utils.Dom.getDomElementChild(e,0)),this._focusElt=e},_widgetMarkup:function(e){var t=this._cfg,n=t.tabIndex!=null?' tabindex="'+this._calculateTabIndex()+'" ':"",r=aria.core.Browser.isIE7||aria.core.Browser.isIE6,i=Aria.testMode?' id="'+this._domId+'_button" ':"",s=t.disabled?"xButton xButtonDisabled":"xButton";if(this._simpleHTML
){var o=t.disabled?" disabled='disabled' ":"",u=t.width!="-1"?" style='width:"+t.width+"px;' ":"";e.write(['<input type="button" value="',aria.utils.String.encodeForQuotedHTMLAttribute(t.label),'"',i,n,o,u,"/>"].join(""))}else{if(r)e.write(['<span class="'+s+'" style="margin: 0;"',n,i,">"].join(""));else{var a=aria.core.Browser.isIE?" onfocusin='this.blur()' ":"";e.write(['<button type="button" class="'+s+'"',a,n,i,">"].join(""))}this._frame.writeMarkupBegin(e),this._widgetMarkupContent(e),this._frame.writeMarkupEnd
(e),r?e.write("</span>"):e.write("</button>")}},_widgetMarkupContent:function(e){e.write(aria.utils.String.escapeHTML(this._cfg.label))},_dom_onmouseover:function(e){this.$ActionWidget._dom_onmouseover.call(this,e),this._mouseOver=!0,this._updateState()},_dom_onmouseout:function(e){this.$ActionWidget._dom_onmouseout.call(this,e),this._mouseOver=!1,this._mousePressed=!1,this._updateState()},_dom_onmousedown:function(e){this.focus(),this._mouseOver=!0,this._mousePressed=!0,this._updateState();if(aria.core.Browser
.isChrome||aria.core.Browser.isSafari)this.currTarget=e.currentTarget},_dom_onmouseup:function(e){if(aria.core.Browser.isChrome||aria.core.Browser.isSafari)this._mousePressed&&e.currentTarget==this.currTarget&&this._performAction(e),this.currTarget=null;this._cfg&&(this._mousePressed=!1,this._updateState())},_dom_onkeydown:function(e){return e.keyCode==aria.DomEvent.KC_SPACE||e.keyCode==aria.DomEvent.KC_ENTER?(this._keyPressed=!0,this._updateState(),e.stopPropagation(),!1):!0},_dom_onclick:aria.core.Browser.
isChrome||aria.core.Browser.isSafari?function(e){this._keyPressed=!1;return}:function(e){if(this._keyPressed){this._keyPressed=!1;return}this._performAction(e)},_dom_onkeyup:function(e){return e.keyCode==aria.DomEvent.KC_SPACE||e.keyCode==aria.DomEvent.KC_ENTER?(this._keyPressed=!1,this._updateState(),this._performAction(e)?!0:(e.stopPropagation(),!1)):!0}}});
//*******************
//LOGICAL-PATH:aria/widgets/action/ButtonStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.action.ButtonStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="Button"/}
    {var useFrame=true/}

    {macro main()}
        .xButton {
            background:none repeat scroll 0 0 transparent;
            border:0 none;
            cursor:pointer;
            {if aria.core.Browser.isFirefox}
              margin: -1px -3px -1px -3px;
            {else/}
              margin: -1px 0px -1px 0px;
            {/if}
            padding:0;
            vertical-align:top;
            tabindex:10;
        }

        .xButtonDisabled {
            cursor:default;
        }

        {call startLooping()/}
    {/macro}

    {macro writeSkinClass(info)}
        .xBTNbkg_${info.skinClassName} {
            /* old type of button (to remove) */
            {call background("transparent",info.spriteURL,"no-repeat")/}
        }
    {/macro}

    {macro writeState(info)}
        .${cssPrefix(info)}c {
            font-weight: ${info.skinClass.label.fontWeight}
        }
    {/macro}

{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/action/Link.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.action.Link",$extends:"aria.widgets.action.ActionWidget",$dependencies:["aria.utils.String"],$css:["aria.widgets.action.LinkStyle"],$constructor:function(e,t){this.$ActionWidget.constructor.apply(this,arguments),this._pressed=!1,this._customTabIndexProvided=!0,this._keyPressed=!1},$prototype:{_widgetMarkup:function(e){var t=this._cfg;t.color&&this.$logWarn(this.WIDGET_PROPERTY_DEPRECATION,["color"]),e.write(["<a",Aria.testMode?' id="'+this._domId+'_link"':"",' class="xLink_'
,t.sclass,'" href="javascript:(function(){})()"',t.tabIndex!=null?" tabindex="+this._calculateTabIndex()+'"':"",">",aria.utils.String.escapeHTML(t.label),"</a>"].join("")),t=null},_init:function(){this._focusElt=this.getDom().firstChild,this.$ActionWidget._init.call(this)},_dom_onkeydown:function(e){return e.keyCode==aria.DomEvent.KC_ENTER?(this._keyPressed=!0,e.stopPropagation(),!1):!0},_dom_onclick:function(e){return e.preventDefault(),this._keyPressed?(this._keyPressed=!1,!1):this.$ActionWidget._dom_onclick
.apply(this,arguments)},_dom_onkeyup:function(e){return e.keyCode==aria.DomEvent.KC_ENTER?this._performAction(e)?!0:(e.stopPropagation(),!1):!0}}});
//*******************
//LOGICAL-PATH:aria/widgets/action/LinkStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.action.LinkStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="Link"/}

    {macro writeState(info)}
        {var pseudoclass=""/}
        {if info.stateName != "normal"}
            {set pseudoclass=":"+info.stateName/}
        {/if}
        
        a${pseudoclass}.xLink_${info.skinClassName} {
            color:${info.state.color};
        }
    {/macro}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/calendar/Calendar.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.calendar.Calendar",$extends:"aria.widgets.TemplateBasedWidget",$dependencies:["aria.widgets.Template","aria.widgets.calendar.CalendarController","aria.DomEvent"],$css:["aria.widgets.calendar.CalendarStyle"],$templates:["aria.widgets.calendar.CalendarTemplate"],$constructor:function(e,t){this.$TemplateBasedWidget.constructor.apply(this,arguments);var n=this._cfg.sclass,r=aria.widgets.AriaSkinInterface.getSkinObject("Calendar",n);this._hasFocus=!1,this._initTemplate
({defaultTemplate:r.defaultTemplate,moduleCtrl:{classpath:"aria.widgets.calendar.CalendarController",initArgs:{skin:{sclass:n,skinObject:r,baseCSS:"xCalendar_"+n+"_"},settings:{value:e.value,minValue:e.minValue,maxValue:e.maxValue,startDate:e.startDate,displayUnit:e.displayUnit,numberOfUnits:e.numberOfUnits,firstDayOfWeek:e.firstDayOfWeek,dateLabelFormat:e.dateLabelFormat,monthLabelFormat:e.monthLabelFormat,dayOfWeekLabelFormat:e.dayOfWeekLabelFormat,completeDateLabelFormat:e.completeDateLabelFormat,showWeekNumbers
:e.showWeekNumbers,showShortcuts:e.showShortcuts,restrainedNavigation:e.restrainedNavigation,label:e.label,focus:this._hasFocus}}}})},$prototype:{_onModuleEvent:function(e){if(this._inOnBoundPropertyChange)return;e.name=="update"?(e.properties.startDate&&this.setProperty("startDate",this._subTplData.settings.startDate),e.properties.value&&(this.setProperty("value",this._subTplData.settings.value),this.evalCallback(this._cfg.onchange))):e.name=="dateClick"&&this.evalCallback(this._cfg.onclick,{date:e.date})},
_onBoundPropertyChange:function(e,t,n){this._inOnBoundPropertyChange=!0;try{e=="startDate"?this._subTplModuleCtrl.navigate({},{date:t}):e=="value"&&this._subTplModuleCtrl.selectDay({date:t})}finally{this._inOnBoundPropertyChange=!1}},_dom_onkeydown:function(e){var t=this.getDom();this.sendKey(e.charCode,e.keyCode)&&(e.preventDefault(!0),t.focus())},_dom_onfocus:function(){this._hasFocus=!0,this._focusUpdate()},_dom_onblur:function(){this._hasFocus=!1,this._focusUpdate()},_tplLoadCallback:function(e){this.$TemplateBasedWidget
._tplLoadCallback.call(this,e),e.success&&this._focusUpdate()},_focusUpdate:function(){var e=this._subTplModuleCtrl,t=this.getDom();if(e&&t&&this._cfg.tabIndex!=null&&this._cfg.tabIndex>=0){var n=e.notifyFocusChanged(this._hasFocus);if(!n){var r=t.style,i=aria.utils.VisualFocus?aria.utils.VisualFocus.getStyle():null;this._hasFocus?aria.core.Browser.isIE6||aria.core.Browser.isIE7?(r.border="1px dotted black",r.padding="0px"):i==null&&(r.outline="1px dotted black"):aria.core.Browser.isIE6||aria.core.Browser.isIE7?
(r.border="0px",r.padding="1px"):i==null&&(r.outline="none")}}},sendKey:function(e,t){var n=this._subTplModuleCtrl;return n?n.keyevent({charCode:e,keyCode:t}):!1}}});
//*******************
//LOGICAL-PATH:aria/widgets/calendar/CalendarController.js
//*******************
(function(){var e;Aria.classDefinition({$classpath:"aria.widgets.calendar.CalendarController",$extends:"aria.templates.ModuleCtrl",$implements:["aria.widgets.calendar.ICalendarController"],$dependencies:["aria.widgets.Template","aria.utils.Date","aria.widgets.calendar.CfgBeans","aria.utils.environment.Date","aria.utils.Array"],$onload:function(){e=aria.utils.Date},$onunload:function(){e=null},$constructor:function(){this.$ModuleCtrl.constructor.call(this),this._dataBeanName="aria.widgets.calendar.CfgBeans.CalendarModel"
,this._changedSettings={value:{},minValue:{},maxValue:{},startDate:{},displayUnit:{},numberOfUnits:{},firstDayOfWeek:{},monthLabelFormat:{},dayOfWeekLabelFormat:{},dateLabelFormat:{},completeDateLabelFormat:{}},this._changedSettingsNbr=11},$destructor:function(){this._jsonListener&&(this.json.removeListener(this._calendarSettings,null,this._jsonListener),this._jsonListener=null),this._calendarData=null,this._calendarSettings=null,this.$ModuleCtrl.$destructor.call(this)},$prototype:{$hasFlowCtrl:!1,$publicInterfaceName
:"aria.widgets.calendar.ICalendarController",_settingsProperties:{value:{isDate:!0},minValue:{isDate:!0},maxValue:{isDate:!0},startDate:{isDate:!0},displayUnit:{},numberOfUnits:{},firstDayOfWeek:{},monthLabelFormat:{},dayOfWeekLabelFormat:{},dateLabelFormat:{},completeDateLabelFormat:{}},_defaultKeyActions:{33:{increment:-1,incrementUnit:"M"},34:{increment:1,incrementUnit:"M"},35:{refDate:"maxValue"},36:{refDate:"minValue"},37:{increment:-1,incrementUnit:"D"},38:{increment:-7,incrementUnit:"D"},39:{increment
:1,incrementUnit:"D"},40:{increment:7,incrementUnit:"D"}},_jsonDataChanged:function(t){var n=t.dataName,r=this._settingsProperties[n];if(r){var i=this._changedSettings[n];i==null&&(i={oldValue:t.oldValue,newValue:t.newValue},this._changedSettingsNbr++);if(i.oldValue===t.newValue||r.isDate&&e.isSameDay(i.oldValue,t.newValue))i=null,this._changedSettingsNbr--;this._changedSettings[n]=i}},init:function(e,t){e||(e={}),e.calendar={},e.settings||(e.settings={});var n=e.settings;this._data=e,this._calendarSettings=
n,this._calendarData=e.calendar,n.startDate||(n.startDate=new Date),n.completeDateLabelFormat||(n.completeDateLabelFormat=aria.utils.environment.Date.getDateFormats().longFormat),n.firstDayOfWeek==null&&(n.firstDayOfWeek=aria.utils.environment.Date.getFirstDayOfWeek()),aria.core.JsonValidator.normalize({json:this._calendarSettings,beanName:"aria.widgets.calendar.CfgBeans.CalendarSettings"}),this.update(),this._jsonListener={fn:this._jsonDataChanged,scope:this},this.json.addListener(n,null,this._jsonListener,!0
),this.$callback(t)},notifyFocusChanged:function(e){var t={name:"focusChanged",focus:e,cancelDefault:!1};return this.json.setValue(this._data.settings,"focus",e),this.$raiseEvent(t),t.cancelDefault},keyevent:function(e){var t={name:"keyevent",charCode:e.charCode,keyCode:e.keyCode,cancelDefault:!1},n=this._defaultKeyActions[t.keyCode];n!=null&&(t.cancelDefault=!0,this.json.inject(n,t,!1)),this.$raiseEvent(t);var r=this._transformDate(this._calendarSettings.value,t);return r&&this.selectDay({date:r}),t.cancelDefault===!0
},getDatePosition:function(t){var n=aria.utils.Array,r=this._calendarData,i=e.dayDifference(this._realStartDate,t),s=Math.floor(i/7);if(s<0||s>=r.weeks.length)return null;var o=r.weeks[s],u=i%7,a=o.days[u];this.$assert(228,e.isSameDay(t,a.jsDate));var f=null,l=null,c=r.months[a.monthKey];return c!=null&&(l=n.indexOf(r.months,c),this.$assert(239,c==r.months[l]),a.monthKey==o.month||a.monthKey==o.monthEnd?f=o.indexInMonth:f=0,this.$assert(245,c.weeks[f]==o)),{weekIndex:s,monthIndex:l,weekInMonthIndex:f,dayInWeekIndex
:u,month:c,week:o,day:a}},dateClick:function(e){var t={name:"dateClick",date:e.date};this.$raiseEvent(t),this._data&&this.selectDay({date:t.date})},navigate:function(t,n){t&&t.preventDefault&&t.preventDefault();var r=this._calendarData.startDate,i=this._transformDate(r,n);if(i==null)return;if(e.isSameDay(r,i)||e.isSameDay(this._calendarSettings.startDate,i))return;this.json.setValue(this._calendarSettings,"startDate",i),this.update()},selectDay:function(e){var t=e.date;if(!t||this._isSelectable(t))this.json.
setValue(this._calendarSettings,"value",t),this._ensureDateVisible(t),this.update()},_ensureDateVisible:function(t){if(t){var n=this._calendarData;(e.dayDifference(t,n.startDate)>0||e.dayDifference(t,n.endDate)<0||this._changedSettings.startDate)&&this.json.setValue(this._calendarSettings,"startDate",t)}},_getMonthKey:function(e){return[e.getMonth(),e.getFullYear()].join("-")},update:function(){if(this._changedSettingsNbr===0)return;var t=this.json,n=this._changedSettings,r=this._calendarData,i=this._calendarSettings
;n.minValue&&t.setValue(i,"minValue",e.removeTime(i.minValue)),n.maxValue&&t.setValue(i,"maxValue",e.removeTime(i.maxValue)),(n.value||n.minValue||n.maxValue)&&this._checkValue();if(n.value&&this._changedSettingsNbr==1){var s=n.value,o=n.value.oldValue,u=i.value;if(o){var a=this.getDatePosition(o);a&&(a.day.isSelected=!1,s.oldValuePosition=a)}if(u){var f=this.getDatePosition(u);f&&(f.day.isSelected=!0,s.newValuePosition=f)}}else{(n.firstDayOfWeek||n.dayOfWeekLabelFormat)&&t.setValue(r,"daysOfWeek",this._createDaysOfWeek
()),t.setValue(r,"today",new Date);var l=new Date(i.startDate),c,h,p;i.displayUnit=="W"?(l=e.getStartOfWeek(l,i.firstDayOfWeek),c=new Date(l.getFullYear(),l.getMonth(),1),c=e.getStartOfWeek(c,i.firstDayOfWeek),h=new Date(l.getTime()),h.setDate(h.getDate()+7*i.numberOfUnits-1),p=new Date(h.getTime()),p.setDate(32),p.setDate(1)):(l=new Date(l.getFullYear(),l.getMonth(),1),c=e.getStartOfWeek(l,i.firstDayOfWeek),h=new Date(l.getTime()),h.setMonth(h.getMonth()+i.numberOfUnits),h.setDate(h.getDate()-1),p=new Date(
h.getTime()),p.setDate(p.getDate()+1));var d=[],v=[];this._createMonthsAndWeeks(c,p,d,v),t.setValue(r,"startDate",l),t.setValue(r,"endDate",h),t.setValue(r,"weeks",d),t.setValue(r,"months",v),t.setValue(r,"startMonthIndex",0),t.setValue(r,"endMonthIndex",v.length-1),t.setValue(r,"startWeekIndex",Math.floor(e.dayDifference(c,l)/7)),t.setValue(r,"endWeekIndex",Math.floor(e.dayDifference(c,h)/7)),this.$assert(128,r.endMonthIndex<v.length),this.$assert(129,r.endWeekIndex<d.length);var m=i.minValue,g=i.maxValue;t
.setValue(r,"previousPageEnabled",!m||m<l),t.setValue(r,"nextPageEnabled",!g||g>h),this._realStartDate=c}var y=this._changedSettings,b=this._changedSettingsNbr;this._changedSettings={},this._changedSettingsNbr=0,this.$raiseEvent({name:"update",properties:y,propertiesNbr:b,propertyshowShortcuts:i.showShortcuts})},_transformDate:function(e,t){var n;if(t.increment!=null){e==null&&(e=this._calendarSettings.startDate),n=new Date(e);if(t.incrementUnit=="M"){var r=n.getMonth();n.setMonth(r+t.increment),(24+r+t.increment
)%12!=n.getMonth()&&n.setDate(0)}else t.incrementUnit=="D"?n.setDate(n.getDate()+t.increment):n.setDate(n.getDate()+7*t.increment)}else if(t.refDate){var i=t.refDate;i=="minValue"?this._calendarSettings.minValue&&(n=this._calendarSettings.minValue):i=="maxValue"&&this._calendarSettings.maxValue&&(n=this._calendarSettings.maxValue)}else t.date&&(n=new Date(t.date));return n},_createDaysOfWeek:function(){var t=[],n=this._calendarSettings.dayOfWeekLabelFormat,r=e.getStartOfWeek(new Date,this._calendarSettings.firstDayOfWeek
);for(var i=0;i<7;i++)t.push({label:e.format(r,n),day:r.getDay()}),r.setDate(r.getDate()+1);return t},_createMonthsAndWeeks:function(e,t,n,r){var i=new Date(e.getTime()),s=i.getDate()==1?i.getMonth():null;while(i<t){var o=this._createWeek(i);n.push(o);if(i.getMonth()!=s){if(s!=null){var u=this._createMonth(n,n.length-1);r.push(u),r[u.monthKey]=u}s=i.getMonth()}}},_createWeek:function(t){var n=0,r,i=[],s={days:i,indexInMonth:1+Math.floor((t.getDate()-2)/7),weekNumber:e.dayOfWeekNbrSinceStartOfYear(t)};for(var o=0
;o<7;o++){var u=this._createDay(t);i.push(u),r?n===0&&r!=u.monthKey&&(n=o):r=u.monthKey,t.getDate()==1&&(s.monthStart=u.monthKey,u.isFirstOfMonth=!0),t.setDate(t.getDate()+1),t.getDate()==1&&(s.monthEnd=u.monthKey,u.isLastOfMonth=!0)}return s.overlappingDays=n,n===0&&(s.month=r),s},_isSelectable:function(e){var t=this._calendarSettings,n=t.minValue,r=t.maxValue;return(!n||e>=n)&&(!r||e<=r)},_checkValue:function(){var e=this._calendarSettings,t=e.value,n=e.minValue,r=e.maxValue,i=t;if(t==null)return;n&&n>t&&(
i=n),r&&r<t&&(i=r),i!=t&&(n>r&&(i=null),this.json.setValue(e,"value",i))},_createDay:function(t){var n=this._calendarSettings,r=new Date(t.getFullYear(),t.getMonth(),t.getDate()),i=t.getDay(),s={jsDate:r,label:e.format(r,n.dateLabelFormat),monthKey:this._getMonthKey(t)};if(i===0||i===6)s.isWeekend=!0;return e.isSameDay(r,this._calendarData.today)&&(s.isToday=!0),e.isSameDay(r,n.value)&&(s.isSelected=!0),s.isSelectable=this._isSelectable(r),s},_createMonth:function(t,n){var r=t[n],i=r.days[0].monthKey,s=[],o=
{monthKey:i,weeks:s};for(var u=n;u>=0;u--){var a=t[u];s.unshift(a);if(a.monthStart==i)break}var f=s[0];this.$assert(260,f.monthStart==i);var l=f.days[f.overlappingDays].jsDate;return o.firstOfMonth=l,o.label=e.format(l,this._calendarSettings.monthLabelFormat),o.weeksInMonth=s.length,o.daysBeforeStartOfMonth=f.overlappingDays,o.daysAfterEndOfMonth=r.overlappingDays>0?7-r.overlappingDays:0,o.daysInMonth=s.length*7-o.daysBeforeStartOfMonth-o.daysAfterEndOfMonth,o.wholeWeeksInMonth=s.length-(f.overlappingDays>0?1
:0)-(r.overlappingDays>0?1:0),o}}})})();
//*******************
//LOGICAL-PATH:aria/widgets/calendar/CalendarStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.calendar.CalendarStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="Calendar"/}

    {macro writeSkinClass(info)}
        /* Calendar classes. Should only be used in the calendar templates. */
        {var skinClassName=info.skinClassName/}
        {var skinClass=info.skinClass/} 
        {var general=aria.widgets.AriaSkinInterface.getGeneral()/}
        .xCalendar_${skinClassName}_general {
            background-color:${skinClass.generalBackgroundColor|default:general.colors.bkg};
        }
        .xCalendar_${skinClassName}_label {
            font-weight:bold;
            margin: 2px;
        }
        .xCalendar_${skinClassName}_general a:hover {
            text-decoration: underline;
        }
        .xCalendar_${skinClassName}_month {
            font-size: 10px;
            text-align: center;
            border: 0px none;
            border-collapse:separate;
            border-spacing:0;
        }
        .xCalendar_${skinClassName}_monthTitle {
            width: 100%;
            border-color:${skinClass.monthTitleBorderColor};
            border-style:solid;
            border-width:1px 0;
            color:${skinClass.monthTitleColor};
            font-weight:bold;
            background-color:${skinClass.monthTitleBackgroundColor};
            padding-top:${skinClass.monthTitlePaddingTop};
            padding-bottom:${skinClass.monthTitlePaddingBottom};
        }
        .xCalendar_${skinClassName}_day {
            border:1px solid ${skinClass.dayBorderColor|default:general.colors.bkg};
            width: 13px;
            background-color:${skinClass.dayBackgroundColor};
            color:${skinClass.dayColor};
            padding:${skinClass.dayPadding};
            font-weight:${skinClass.dayFontWeight};
        }
        .xCalendar_${skinClassName}_weekEnd {
            background-color:${skinClass.weekEndBackgroundColor};
            border:1px solid ${skinClass.weekEndBorderColor};
            color:${skinClass.weekEndColor};
        }
        .xCalendar_${skinClassName}_selectable  {
            cursor: pointer;
        }
        .xCalendar_${skinClassName}_unselectable {
            border: 1px solid ${skinClass.unselectableBorderColor|default:skinClass.dayBorderColor|default:general.colors.bkg};
            background-color:${skinClass.unselectableBackgroundColor|default:skinClass.dayBackgroundColor};
            color:${skinClass.unselectableColor|default:general.colors.disabled};
        }
        .xCalendar_${skinClassName}_today {
            border: 1px solid ${skinClass.todayBorderColor};
            background-color:${skinClass.todayBackgroundColor};
            color:${skinClass.todayColor};
        }
        .xCalendar_${skinClassName}_weekNumber {
            background-color:${skinClass.weekNumberBackgroundColor};
            border:1px solid ${skinClass.weekNumberBorderColor};
            font-weight:bold;
            width: 13px;
        }
        .xCalendar_${skinClassName}_weekDaysLabel {
            background-color:${skinClass.weekDaysLabelBackgroundColor};
            border:1px solid ${skinClass.weekDaysLabelBorderColor};
            font-weight:${skinClass.weekDaysLabelFontWeight};
            color:${skinClass.weekDaysLabelColor};
            width: 13px;
            padding:${skinClass.weekDaysLabelPadding};
        }
        .xCalendar_${skinClassName}_selected,.xCalendar_${skinClassName}_mouseOver {
            background-color:${skinClass.selectedBackgroundColor};
            border: 1px solid ${skinClass.selectedBorderColor};
            color:${skinClass.selectedColor};
        }
    {/macro}
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/calendar/CalendarTemplate.tpl
//*******************
{Template {
    $classpath: "aria.widgets.calendar.CalendarTemplate",
    $hasScript: true,
    $res: {
        res:"aria.resources.CalendarRes"
    }
}}

    {var calendar=data.calendar/}
    {var settings=data.settings/}
    {var skin=data.skin/}

    {macro main()}

        {if settings.displayUnit == "M"}
            {@aria:Div {
                sclass: skin.skinObject.divsclass,
                margins: "0 0 0 0",
                block: true,
                cssClass: skin.baseCSS+"general"
            }}
              {call renderCalendar()/}
            {/@aria:Div}
        {/if}
    {/macro}

    {macro renderCalendar()}
        {if settings.label}
            <div class="${skin.baseCSS}label">${settings.label}</div>
        {/if}
        {for var startIndex = calendar.startMonthIndex, endIndex = calendar.endMonthIndex, index = startIndex ; index <= endIndex ; index++}
            <span style="display: inline-block; vertical-align: top; margin: 2px;">
                {call renderMonth(calendar.months[index],index == startIndex, index == endIndex)/}
            </span>
        {/for}
        {if settings.showShortcuts}
            <div style="text-align: center; margin: 1px;">
                <a title="${calendar.today|dateformat:settings.completeDateLabelFormat}" tabIndex="-1" href="javascript:;" {on click {fn: "navigate", scope: moduleCtrl, args: {date:calendar.today}}/}>${res.today}</a>
                {section {
                    id : "selectedDay",
                    macro : "selectedDay"
                } /}
            </div>
        {/if}
    {/macro}

    {macro selectedDay()}
        {if settings.value}
            &nbsp;|&nbsp; <a title="${settings.value|dateformat:settings.completeDateLabelFormat}" tabIndex="-1" href="javascript:;" {on click {fn: "navigate", scope: moduleCtrl, args: {date:settings.value}}/}>${res.selectedDate}</a>
        {/if}
    {/macro}

    {macro renderMonth(month,first,last)}
        <table class="${skin.baseCSS}month" cellspacing="0" style="width: ${settings.showWeekNumbers?138:128}px;">
            <thead>
                <tr>
                    <th colspan="8">
                        <div class="${skin.baseCSS}monthTitle" style="position: relative;">
                            {if first && (calendar.previousPageEnabled || !settings.restrainedNavigation)}
                                <div style="position: absolute; left: 0px; top: -2px; cursor: pointer;" {on click {fn: "navigate", args : { increment: -1, incrementUnit: "M" }, scope : moduleCtrl}/}>{@aria:Icon { icon: skin.skinObject.previousPageIcon }/}</div>
                            {/if}
                            {if last && (calendar.nextPageEnabled || !settings.restrainedNavigation)}
                                <div style="position: absolute; right: 0px; top: -2px; cursor: pointer;" {on click {fn: "navigate", args : { increment: 1, incrementUnit: "M" }, scope : moduleCtrl}/}>{@aria:Icon { icon: skin.skinObject.nextPageIcon }/}</div>
                            {/if}
                            ${month.label}
                        </div>
                    </th>
                </tr>
                <tr>
                    {if settings.showWeekNumbers}<th  class="${skin.baseCSS}weekNumber">&nbsp;</th>{/if}
                    {foreach day inArray calendar.daysOfWeek}
                        <th class="${skin.baseCSS}weekDaysLabel">${day.label}</th>
                    {/foreach}
                </tr>
            </thead>
            <tbody {on click clickDay/} {on mouseover mouseOverDay/} {on mouseout mouseOutDay/} {id "month_"+month.monthKey/}>
                {var nbweeks=0/}
                {foreach week inArray month.weeks}
                    {set nbweeks+=1/}
                    <tr>
                        {if settings.showWeekNumbers}<td class="${skin.baseCSS}weekNumber">{if week.overlappingDays == 0 || week.monthEnd == month.monthKey}${week.weekNumber}{else/}&nbsp;{/if}</td>{/if}
                        {foreach day inArray week.days}
                            {call renderDay(day,month)/}
                        {/foreach}
                    </tr>
                {/foreach}
                {for ;nbweeks<=5;nbweeks++}
                    <tr>
                        {if settings.showWeekNumbers}<td class="${skin.baseCSS}weekNumber" style="visibility: hidden;">&nbsp;</td>{/if}
                        <td class="${skin.baseCSS}day" colspan="7" style="visibility: hidden;">&nbsp;</td>
                    </tr>
                {/for}
            </tbody>
        </table>
    {/macro}

    {macro renderDay(day, month)}
        {var jsDate=day.jsDate/}
        {if day.monthKey==month.monthKey}
            <td ${day.isSelectable ? "data-date=\""+jsDate.getTime()+"\"":""}
                class="${getClassForDay(day)}"
            >${day.label}</td>
        {else/}
            <td />
        {/if}
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/widgets/calendar/CalendarTemplateScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.widgets.calendar.CalendarTemplateScript",$prototype:{onModuleEvent:function(e){if(e.name=="update"){var t=e.properties.value;e.propertiesNbr==1&&t?(this.updateClass(t.oldValuePosition),this.updateClass(t.newValuePosition),e.propertyshowShortcuts&&this.$refresh({outputSection:"selectedDay"})):this.$refresh()}},updateClass:function(e){if(e==null||e.month==null)return;var t=this.$getChild("month_"+e.month.monthKey,e.weekInMonthIndex),n=t.getChild((this.settings.showWeekNumbers?1
:0)+e.dayInWeekIndex);n.classList.setClassName(this.getClassForDay(e.day)),n.$dispose(),t.$dispose()},clickDay:function(e){var t=e.target.getData("date");if(t){var n=new Date(parseInt(t,10));this.moduleCtrl.dateClick({date:n})}},getClassForDay:function(e){var t=[],n=this.skin.baseCSS;return t.push(n+"day"),t.push(n+"mouseOut"),e.isWeekend&&e.isSelectable&&t.push(n+"weekEnd"),e.isSelected&&t.push(n+"selected"),e.isToday&&t.push(n+"today"),t.push(e.isSelectable?n+"selectable":n+"unselectable"),t.join(" ")},mouseOverDay
:function(e){var t=e.target.getData("date");t&&e.target.classList.setClassName(e.target.classList.getClassName().replace(this.skin.baseCSS+"mouseOut",this.skin.baseCSS+"mouseOver"))},mouseOutDay:function(e){var t=e.target.getData("date");t&&e.target.classList.setClassName(e.target.classList.getClassName().replace(this.skin.baseCSS+"mouseOver",this.skin.baseCSS+"mouseOut"))}}});
//*******************
//LOGICAL-PATH:aria/widgets/calendar/CfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.widgets.calendar.CfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes",AppCfg:"aria.core.environment.EnvironmentBaseCfgBeans"},$beans:{CalendarSettings:{$type:"json:Object",$description:"",$properties:{value:{$type:"json:Date",$description:""},minValue:{$type:"json:Date",$description:""},maxValue:{$type:"json:Date",$description:""},displayUnit:{$type:"json:Enum",$description:"",$enumValues:["M","W"],$default:"M"},numberOfUnits:{$type:"json:Integer",$description
:"",$minValue:1,$default:2},startDate:{$type:"json:Date",$description:""},firstDayOfWeek:{$type:"json:Integer",$description:"",$minValue:0,$maxValue:6},monthLabelFormat:{$type:"json:String",$description:"",$default:"MMMM yyyy"},dayOfWeekLabelFormat:{$type:"json:String",$description:"",$default:"EE"},dateLabelFormat:{$type:"json:String",$description:"",$default:"d"},completeDateLabelFormat:{$type:"AppCfg:FormatTypes",$description:""},label:{$type:"json:String",$description:""},showWeekNumbers:{$type:"json:Boolean"
,$description:""},showShortcuts:{$type:"json:Boolean",$description:"",$default:!0},restrainedNavigation:{$type:"json:Boolean",$description:"",$default:!0},focus:{$type:"json:Boolean",$description:""}}},CalendarModel:{$type:"json:Object",$description:"",$properties:{settings:{$type:"CalendarSettings"},skin:{$type:"json:Object",$description:"",$properties:{sclass:{$type:"json:String",$description:""},baseCSS:{$type:"json:String",$description:""},skinObject:{$type:"json:ObjectRef",$description:""}}},calendar:{$type
:"json:Object",$description:"",$properties:{startDate:{$type:"json:Date",$description:"",$mandatory:!0},endDate:{$type:"json:Date",$description:"",$mandatory:!0},daysOfWeek:{$type:"json:Array",$description:"",$contentType:{$type:"DayOfWeek"},$mandatory:!0},startWeekIndex:{$type:"json:Integer",$description:"",$mandatory:!0},endWeekIndex:{$type:"json:Integer",$description:"",$mandatory:!0},weeks:{$type:"json:Array",$description:"",$contentType:{$type:"Week"},$mandatory:!0},startMonthIndex:{$type:"json:Integer"
,$description:"",$mandatory:!0},endMonthIndex:{$type:"json:Integer",$description:"",$mandatory:!0},months:{$type:"json:Map",$description:"",$contentType:{$type:"Month"},$mandatory:!0},previousPageEnabled:{$type:"json:Boolean",$description:"",$mandatory:!0},nextPageEnabled:{$type:"json:Boolean",$description:"",$mandatory:!0},today:{$type:"json:Date",$description:"",$mandatory:!0}}}}},DayOfWeek:{$type:"json:Object",$description:"",$properties:{label:{$type:"json:String",$description:""},day:{$type:"json:Integer"
,$description:"",$minValue:0,$maxValue:6}}},Month:{$type:"json:Object",$description:"",$properties:{label:{$type:"json:String",$description:"",$mandatory:!0},monthKey:{$type:"json:String",$description:"",$mandatory:!0},firstOfMonth:{$type:"json:Date",$description:"",$mandatory:!0},weeks:{$type:"json:Array",$description:"",$contentType:{$type:"Week"},$mandatory:!0},weeksInMonth:{$type:"json:Integer",$description:"",$minValue:4,$maxValue:6,$mandatory:!0},wholeWeeksInMonth:{$type:"json:Integer",$description:"",
$minValue:3,$maxValue:4,$mandatory:!0},daysBeforeStartOfMonth:{$type:"json:Integer",$description:"",$minValue:0,$maxValue:6,$mandatory:!0},daysInMonth:{$type:"json:Integer",$description:"",$minValue:28,$maxValue:31,$mandatory:!0},daysAfterEndOfMonth:{$type:"json:Integer",$description:"",$minValue:0,$maxValue:6,$mandatory:!0}},$mandatory:!0},Week:{$type:"json:Object",$description:"",$properties:{overlappingDays:{$type:"json:Integer",$description:"",$mandatory:!0},monthStart:{$type:"json:String",$description:""
,$mandatory:!1},month:{$type:"json:String",$description:"",$mandatory:!1},monthEnd:{$type:"json:String",$description:"",$mandatory:!1},indexInMonth:{$type:"json:Integer",$description:"",$mandatory:!0},weekNumber:{$type:"json:Integer",$description:"",$mandatory:!0},days:{$type:"json:Array",$description:"",$contentType:{$type:"Date"},$mandatory:!0}}},Date:{$type:"json:Object",$description:"",$properties:{jsDate:{$type:"json:Date",$description:"",$mandatory:!0},label:{$type:"json:String",$description:"",$mandatory
:!0},monthKey:{$type:"json:String",$description:"",$mandatory:!0},isFirstOfMonth:{$type:"json:Boolean",$description:"",$mandatory:!1},isLastOfMonth:{$type:"json:Boolean",$description:"",$mandatory:!1},isSelected:{$type:"json:Boolean",$description:"",$mandatory:!1},isWeekend:{$type:"json:Boolean",$description:"",$mandatory:!1},isToday:{$type:"json:Boolean",$description:"",$mandatory:!1},isSelectable:{$type:"json:Boolean",$description:"",$mandatory:!1}},$mandatory:!0},DatePosition:{$type:"json:Object",$description
:"",$properties:{weekIndex:{$type:"json:Integer",$description:"",$mandatory:!0},monthIndex:{$type:"json:Integer",$description:""},weekInMonthIndex:{$type:"json:Integer",$description:"",$mandatory:!0},dayInWeekIndex:{$type:"json:Integer",$description:"",$mandatory:!0},month:{$type:"Month",$description:"",$mandatory:!0},week:{$type:"Week",$description:"",$mandatory:!0},day:{$type:"Date",$description:"",$mandatory:!0}}}}});
//*******************
//LOGICAL-PATH:aria/widgets/calendar/ICalendarController.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.widgets.calendar.ICalendarController",$extends:"aria.templates.IModuleCtrl",$events:{focusChanged:{description:"",properties:{focus:"Contains the current value of the focus property.",cancelDefault:"If true, prevent the default focus visual notification."}},update:{description:"",properties:{properties:"Map of properties which have changed in the settings. This map must stay read-only.",propertiesNbr:"Number of properties which have changed in the settings."}},dateClick
:{description:"",properties:{date:"Date which the user clicked on.",cancelDefault:""}},keyevent:{description:"",properties:{charCode:"",keyCode:"",increment:"",incrementUnit:"",refDate:"",date:"",cancelDefault:"Set this property to true if some action is done on this key when receiving this event, so that the key propagation and the default action of the browser on this key is canceled."}}},$interface:{navigate:function(e,t){},selectDay:function(e){},update:function(){},keyevent:function(e){},dateClick:function(
e){},getDatePosition:function(e){},notifyFocusChanged:function(e){}}});
//*******************
//LOGICAL-PATH:aria/widgets/container/Container.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.container.Container",$extends:"aria.widgets.Widget",$dependencies:["aria.utils.Size","aria.utils.Math"],$constructor:function(e,t){this.$Widget.constructor.apply(this,arguments),this._cssClassNames=aria.core.TplClassLoader.addPrintOptions(this._cssClassNames,e.printOptions),this._frame=null,this._sizeConstraints=!!e.minWidth||!!e.maxWidth||!!e.minHeight||!!e.maxHeight,this._directInit=this._directInit||this._sizeConstraints},$prototype:{initWidgetDom:function(e)
{this.$Widget.initWidgetDom.call(this,e),this._sizeConstraints&&this._updateContainerSize(!0)},_dom_oncontentchange:function(e){this.__initWhileContentChange!==!0&&this._updateContainerSize(),this.__initWhileContentChange=!1},_onBoundPropertyChange:function(e,t,n){e==="height"||e==="width"?this._updateSize():this.$Widget._onBoundPropertyChange.apply(this,arguments)},_updateSize:function(){this._changedContainerSize=!0,this._updateContainerSize()},_updateContainerSize:function(e){var t=this._cfg,n=this.getDom
();if(!n)return;var r=this._getWidthConf(),i=this._getHeightConf();if(this._changedContainerSize||this._sizeConstraints){if(this._changedContainerSize){var s=aria.utils.Math.normalize(t.width,r.min,r.max),o=aria.utils.Math.normalize(t.height,i.min,i.max);n.style.width=t.width>-1?s+"px":"",n.style.height=t.height>-1?o+"px":"";if(this._frame){var u=t.width>-1?s:-1,a=t.height>-1?o:-1;this._frame.resize(u,a)}}var f=aria.utils.Size.setContrains(n,r,i);f&&this._frame&&(this._frame.resize(f.width,f.height),n.parentNode&&
e&&aria.utils.Delegate.delegate(aria.DomEvent.getFakeEvent("contentchange",n.parentNode))),this._changedContainerSize=f}},_getWidthConf:function(){return{min:this._cfg.minWidth||0,max:this._cfg.maxWidth||Infinity}},_getHeightConf:function(){return{min:this._cfg.minHeight||0,max:this._cfg.maxHeight||Infinity}},_widgetMarkupBegin:function(e){},_widgetMarkupEnd:function(e){}}});
//*******************
//LOGICAL-PATH:aria/widgets/container/Dialog.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.container.Dialog",$extends:"aria.widgets.container.Container",$dependencies:["aria.widgets.container.Div","aria.popups.Popup","aria.widgets.Icon","aria.utils.Dom","aria.utils.Function","aria.utils.Delegate","aria.templates.NavigationManager","aria.utils.String","aria.utils.Math","aria.templates.Layout"],$css:["aria.widgets.container.DialogStyle"],$constructor:function(e,t){this.$Container.constructor.apply(this,arguments),this._skinObj=aria.widgets.AriaSkinInterface
.getSkinObject("Dialog",e.sclass),this._popup=null,this._hasMarkup=!1,this._closeDelegateId=null,this._maximizeDelegateId=null,this._draggable=null;var n=e.handles||"n-resize,s-resize,e-resize,w-resize,ne-resize,nw-resize,se-resize,sw-resize";this._handlesArr=n.split(","),this._resizable={},this._optionsBeforeMaximize=null,this._shadows={left:this._skinObj.shadowLeft||0,top:this._skinObj.shadowTop||0,right:this._skinObj.shadowRight||0,bottom:this._skinObj.shadowBottom||0},this._shadowsZero={left:0,top:0,right
:0,bottom:0}},$destructor:function(){this.close(),this.$Container.$destructor.call(this)},$statics:{MISSING_CONTENT_MACRO:"Missing contentMacro in Dialog configuration."},$prototype:{_onViewportResized:function(e){var t=this._domElt,n=this._cfg.maximized;if(t){t.style.width="",t.style.height="";var r=aria.utils.Dom._getViewportSize(),i=aria.utils.Math,s,o;n?(s=r.height+this._shadows.top+this._shadows.bottom,o=r.width+this._shadows.left+this._shadows.right):(s=i.min(this._cfg.maxHeight,r.height),o=i.min(this.
_cfg.maxWidth,r.width)),this._div.updateSize({height:this._cfg.height,maxHeight:s,width:this._cfg.width,maxWidth:o}),this._updateContainerSize()}n&&this._setMaximizedHeightAndWidth(r)},_checkCfgConsistency:function(e){!("contentMacro"in e)&&!("bind"in e&&"contentMacro"in e.bind)&&this.$logError(this.MISSING_CONTENT_MACRO);var t=aria.widgets.environment.WidgetSettings.getWidgetSettings().dialog;"movable"in e||(e.movable=t.movable),"movableProxy"in e||(e.movableProxy=t.movableProxy)},_widgetMarkupBegin:function(
e){var t=this._cfg;this._skipContent=e.sectionState==e.SECTION_KEEP||!t.visible,e.beginSection({id:"__dialog_"+this._domId});if(this._skipContent)return;var n=aria.utils.Dom._getViewportSize(),r=aria.utils.Math,i,s;this._cfg.maximized?(i=n.height+this._shadows.top+this._shadows.bottom,s=n.width+this._shadows.left+this._shadows.right):(i=r.min(this._cfg.maxHeight,n.height),s=r.min(this._cfg.maxWidth,n.width)),this._div=new aria.widgets.container.Div({sclass:this._skinObj.divsclass,margins:"0 0 0 0",block:!0,cssClass
:this._context.getCSSClassNames(!0)+" "+this._cfg.cssClass,height:this._cfg.height,minHeight:this._cfg.minHeight,maxHeight:i,width:this._cfg.width,minWidth:this._cfg.minWidth,maxWidth:s,scrollBarX:this._cfg.scrollBarX,scrollBarY:this._cfg.scrollBarY},this._context,this._lineNumber),e.registerBehavior(this._div),this._div.writeMarkupBegin(e),e.beginSection({id:"__dialogContent_"+this._domId,keyMap:[{key:"ESCAPE",callback:{fn:this.actionClose,scope:this}}]})},_widgetMarkupEnd:function(e){var t=this._cfg;if(!this
._skipContent){e.endSection(),this._div.writeMarkupEnd(e);if(t.resizable&&this._handlesArr){var n=this._handlesArr;for(var r=0,i=n.length;r<i;r++)e.write(['<span class="xDialog_resizable xDialog_'+n[r]+'">',"</span>"].join(""))}e.write(['<div class="xDialog_titleBar xDialog_',t.sclass,'_titleBar">'].join(""));if(t.icon){e.write(['<span class="xDialog_icon xDialog_',t.sclass,'_icon">'].join(""));var s=new aria.widgets.Icon({icon:t.icon},this._context,this._lineNumber);e.registerBehavior(s),s.writeMarkup(e),e.
write("</span>")}e.write(['<span class="xDialog_title xDialog_',t.sclass,'_title">',aria.utils.String.escapeHTML(t.title),"</span>"].join("")),t.closable&&(this._closeDelegateId=aria.utils.Delegate.add({fn:this._onCloseBtnEvent,scope:this}),this.__writeTitlebarButton(e,this._closeDelegateId,"close","closeIcon")),t.maximizable&&(this._maximizeDelegateId=aria.utils.Delegate.add({fn:this._onMaximizeBtnEvent,scope:this}),this.__writeTitlebarButton(e,this._maximizeDelegateId,"maximize","maximizeIcon")),e.write("</div>"
)}e.endSection()},__writeTitlebarButton:function(e,t,n,r){var i=this._cfg;e.write(['<span class="xDialog_',n," xDialog_",i.sclass,"_",n,'" ',aria.utils.Delegate.getMarkup(t),">"].join(""));var s=new aria.widgets.Icon({icon:this._skinObj[r]},this._context,this._lineNumber);e.registerBehavior(s),s.writeMarkup(e),e.write("</span>")},_widgetMarkup:function(e){this._widgetMarkupBegin(e),this._widgetMarkupEnd(e)},_writerCallback:function(e){this._widgetMarkupBegin(e),this._cfg.contentMacro&&e.callMacro(this._cfg.contentMacro
),this._widgetMarkupEnd(e)},initWidget:function(){this.$Container.initWidget.apply(this,arguments),this._cfgOk&&this._checkCfgConsistency(this._cfg),this._init()},_init:function(){this.getProperty("visible")&&this._cfgOk&&this.open()},_onBoundPropertyChange:function(e,t,n){if(e==="visible")this._cfg.visible=t,t?this.open():this.close();else if(e==="title")this._cfg.title=t,this._titleDomElt&&(this._titleDomElt.innerHTML=t);else if(e==="contentMacro"){this._cfg.contentMacro=t;if(this._popup)if(!this._popup.isOpen
)this.open();else{var r={outputSection:"__dialogContent_"+this._domId,macro:t};this._context.$refresh(r)}}else e==="xpos"||e==="ypos"?(this._cfg[e]=t,this.setProperty("center",!1),this.updatePosition()):e==="center"?(this._cfg.center=t,this.updatePosition()):e==="maximized"?this._toggleMaximize(t):e==="width"||e==="height"?this._domElt&&(this.$Container._onBoundPropertyChange.apply(this,arguments),this._div.updateSize(this._cfg),this._cfg.center&&this.updatePosition()):this.$Container._onBoundPropertyChange.
apply(this,arguments)},_onCloseBtnEvent:function(e){e.type=="click"&&this.actionClose()},_onMaximizeBtnEvent:function(e){e.type=="click"&&this.actionToggleMaximize()},actionClose:function(){this._actionFromTitlebarButton("onCloseClick","visible",!1)},actionToggleMaximize:function(){this._actionFromTitlebarButton("onMaximizeClick","maximized",!this._cfg.maximized)},_actionFromTitlebarButton:function(e,t,n){var r=this._cfg[e],i=!1;if(r){var s={cancelDefault:!0};this.evalCallback(r,s),i=s.cancelDefault}i||this.
changeProperty(t,n)},open:function(){var e=this._cfg,t={filterSection:"__dialog_"+this._domId,writerCallback:{fn:this._writerCallback,scope:this}},n=this._context.getRefreshedSection(t),r=new aria.popups.Popup;this._popup=r,r.$on({onAfterOpen:this._onAfterPopupOpen,scope:this}),e.closeOnMouseClick&&r.$on({onMouseClickClose:this._onMouseClickClose,scope:this});if(this._cfg.modal){var i=aria.templates.NavigationManager;i.addGlobalKeyMap({key:"ESCAPE",modal:!0,callback:{fn:this.actionClose,scope:this}}),i.setModalBehaviour
(!0)}r.open({section:n,keepSection:!0,absolutePosition:{left:e.xpos,top:e.ypos},center:e.center,maximized:e.maximized,offset:e.maximized?this._shadows:this._shadowsZero,modal:e.modal,maskCssClass:"xDialogMask",closeOnMouseClick:e.closeOnMouseClick,closeOnMouseScroll:!1,parentDialog:this}),aria.templates.Layout.$on({viewportResized:this._onViewportResized,scope:this});if(this._cfg.maximized){var s=this._setBodyOverflow("hidden");this._setMaximizedHeightAndWidth(s)}},_onAfterPopupOpen:function(){var e=this._cfg
,t=aria.utils.Dom.getDomElementChild;this._domElt=this._popup.domElement,this._titleBarDomElt=t(this._domElt,0,!0),this._titleDomElt=t(this._titleBarDomElt,e.icon?1:0),this._calculatePosition(),e.modal&&aria.templates.NavigationManager.focusFirst(this._domElt),this.evalCallback(e.onOpen);if(e.maximized)return;e.movable&&this._loadAndCreateDraggable(),e.resizable&&this._loadAndCreateResizable()},_loadAndCreateDraggable:function(){aria.utils.dragdrop&&aria.utils.dragdrop.Drag?this._createDraggable():Aria.load(
{classes:["aria.utils.dragdrop.Drag"],oncomplete:{fn:this._createDraggable,scope:this}})},_loadAndCreateResizable:function(){aria.utils.resize&&aria.utils.resize.Resize?this._createResize():Aria.load({classes:["aria.utils.resize.Resize"],oncomplete:{fn:this._createResize,scope:this}})},_onMouseClickClose:function(){this.actionClose()},close:function(){var e=this._cfg;if(this._popup){this._destroyDraggable(),this._destroyResizable(),e.maximized&&this._setBodyOverflow(this._optionsBeforeMaximize.bodyOverflow),
this._domElt=null,this._titleBarDomElt=null,this._titleDomElt=null,this._closeDelegateId&&aria.utils.Delegate.remove(this._closeDelegateId),this._maximizeDelegateId&&aria.utils.Delegate.remove(this._maximizeDelegateId),this._popup.close(),this._popup.$dispose(),this._popup=null;if(e.modal){var t=aria.templates.NavigationManager;t.removeGlobalKeyMap({key:"ESCAPE",modal:!0,callback:{fn:this.actionClose,scope:this}}),t.setModalBehaviour(!1)}aria.templates.Layout.$removeListeners({viewportResized:this._onViewportResized
,scope:this})}},_updateContainerSize:function(){this.$Container._updateContainerSize.call(this),this.updatePosition()},updatePosition:function(){this._popup&&this._popup.isOpen&&(this._popup.moveTo({center:this._cfg.center,absolutePosition:{left:this._cfg.xpos,top:this._cfg.ypos,height:this._cfg.height,width:this._cfg.width}}),this._calculatePosition())},_calculatePosition:function(){var e=aria.utils.Dom.calculatePosition(this._domElt);this.setProperty("xpos",e.left),this.setProperty("ypos",e.top)},_calculateSize
:function(){var e=aria.utils.Dom.getGeometry(this._domElt);this.setProperty("height",e.height),this.setProperty("width",e.width)},_toggleMaximize:function(e){this._cfg.maximized=e,e===!0?this._toggleMaximizeOn():this._toggleMaximizeOff()},_toggleMaximizeOn:function(){var e=this._cfg;this._optionsBeforeMaximize={center:e.center,width:e.width,height:e.height,maxWidth:e.maxWidth,maxHeight:e.maxHeight,xpos:e.xpos,ypos:e.ypos,bodyOverflow:Aria.$window.document.documentElement.style.overflow},this.setProperty("center"
,!1),this.setProperty("maxWidth",undefined),this.setProperty("maxHeight",undefined);if(this._popup&&this._popup.isOpen){this._popup.conf.maximized=!0,this._popup.conf.offset=this._shadows;var t=this._setBodyOverflow("hidden");this.setProperty("ypos",0),this.setProperty("xpos",0),this._setMaximizedHeightAndWidth(t),this._destroyResizable(),this._destroyDraggable()}},_toggleMaximizeOff:function(){var e=this._cfg,t=this._optionsBeforeMaximize;if(!t)return;this._popup&&(this._popup.conf.maximized=!1,this._popup.
conf.offset=this._shadowsZero),this._setBodyOverflow(t.bodyOverflow),this.setProperty("maxWidth",t.maxWidth),this.setProperty("maxHeight",t.maxHeight),this.changeProperty("width",t.width),this.changeProperty("height",t.height),t.center?this.changeProperty("center",!0):(this.changeProperty("xpos",t.xpos),this.changeProperty("ypos",t.ypos)),this._popup&&this._popup.isOpen&&(e.resizable&&this._loadAndCreateResizable(),e.movable&&this._loadAndCreateDraggable()),this._optionsBeforeMaximize=null},_setBodyOverflow:
function(e){Aria.$window.document.documentElement.style.overflow=e,this._onViewportResized();var t=aria.utils.Dom._getViewportSize();return t},_setMaximizedHeightAndWidth:function(e){var t=e.height+this._shadows.top+this._shadows.bottom,n=e.width+this._shadows.left+this._shadows.right;this.changeProperty("height",t),this.changeProperty("width",n)},_createDraggable:function(){this._draggable=new aria.utils.dragdrop.Drag(this._domElt,{handle:this._titleBarDomElt,cursor:"move",proxy:this._cfg.movableProxy,constrainTo
:aria.utils.Dom.VIEWPORT}),this._draggable.$on({dragstart:{fn:this._onDragStart,scope:this},move:{fn:this._onDragMove,scope:this},dragend:{fn:this._onDragEnd,scope:this}})},_createResize:function(){if(this._handlesArr){var e=this._handlesArr,t=0,n=this._domElt,r=aria.utils.Dom.getDomElementChild;for(var i=0,s=e.length;i<s;i++){var o=r(n,++t,!1),u=null,a;a=e[i];if(a=="n-resize"||a=="s-resize")u="y";if(a=="w-resize"||a=="e-resize")u="x";this._resizable[a]=new aria.utils.resize.Resize(this._domElt,{handle:o,cursor
:a,axis:u}),this._resizable[a].$on({beforeresize:{fn:this._onResizeStart,scope:this},resize:{fn:this._onResizing,scope:this},resizeend:{fn:this._onResizeEnd,scope:this}})}}},_onDragStart:function(){this.evalCallback(this._cfg.ondragstart)},_onDragMove:function(){!this._cfg.movableProxy&&this._popup&&this._popup.refreshProcessingIndicators()},_onDragEnd:function(){this._popup&&this._popup.refreshProcessingIndicators(),this.setProperty("center",!1),this._calculatePosition(),this.updatePosition(),this.evalCallback
(this._cfg.ondragend)},_onResizeStart:function(){this.evalCallback(this._cfg.beforeresize)},_onResizing:function(){this._popup&&this._popup.refreshProcessingIndicators()},_onResizeEnd:function(){this._calculatePosition(),this._calculateSize(),this.setProperty("center",!1),this._popup&&(this.close(),this.open(),this._popup.refreshProcessingIndicators()),this.evalCallback(this._cfg.resizeend)},_destroyDraggable:function(){if(!this._cfg.movable||!this._draggable)return;this._draggable.$removeListeners({dragstart
:{fn:this._onDragStart,scope:this},move:{fn:this._onDragMove,scope:this},dragend:{fn:this._onDragEnd,scope:this}}),this._draggable.$dispose(),this._draggable=null},_destroyResizable:function(){if(!this._cfg.resizable||!this._resizable)return;var e=this._handlesArr;for(var t=0,n=e.length;t<n;t++){var r=e[t];this._resizable[r]&&(this._resizable[r].$dispose(),this._resizable[r]=null)}}}});
//*******************
//LOGICAL-PATH:aria/widgets/container/DialogStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.container.DialogStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="Dialog"/}

    {macro main()}
        .xDialog_titleBar {
            position:absolute;
        }
        .xDialog_icon {
            float:left;
        }
        .xDialog_title {
            float:left;
        }
        .xDialog_close {
            float:right;
            cursor:pointer;
        }
        .xDialog_maximize {
            float:right;
            cursor:pointer;
        }

    .xDialog_resizable {
            position: absolute;
        z-index: 100;
    }
    .xDialog_n-resize {
                height: 8px;
                left: 0;
                right: 14px;
                top: -4px;
        }
    .xDialog_ne-resize {
            height: 8px;
            right: 11px;
            top: -3px;
            width: 8px;
            z-index: 110;
        }
    .xDialog_nw-resize {
            height: 8px;
            left: -3px;
            top: -4px;
            width: 8px;
            z-index: 110;
        }
    .xDialog_s-resize {
        bottom: 10px;
    height: 8px;
    left: 0;
    right: 14px;
    z-index: 110;
}
    .xDialog_se-resize {
        bottom: 6px;
        height: 8px;
        right: 8px;
        width: 8px;
        z-index: 110;
    }
    .xDialog_sw-resize {
        bottom: 6px;
        height: 8px;
        left: -4px;
        width: 8px;
        z-index: 110;
    }
    .xDialog_e-resize {
        bottom: 10px;
        right: 10px;
        top: 0;
        width: 8px;
    }
    .xDialog_w-resize {
        bottom: 10px;
        left: -4px;
        top: 0;
        width: 8px;
    }

        {call startLooping()/}
    {/macro}

    {macro writeSkinClass(info)}
        {var skinClassName=info.skinClassName/}
        {var skinClass=info.skinClass/}
        /* Dialog classes */
        .xDialog_${skinClassName}_titleBar {
            top:${skinClass.titleBarTop}px;
            left:${skinClass.titleBarLeft}px;
            right:${skinClass.titleBarRight}px;
            height:${skinClass.titleBarHeight}px;
        }
        .xDialog_${skinClassName}_title {
            padding-left: 6px;
            padding-top: 6px;
            color:${skinClass.titleColor};
            font-weight:bold;
        }
        .xDialog_${skinClassName}_icon {
            padding-left: 6px;
            padding-top: 6px;
        }
        .xDialog_${skinClassName}_close {
            padding-right: 9px;
            padding-top: 6px;
        }
        .xDialog_${skinClassName}_maximize {
            padding-right: 2px;
            padding-top: 6px;
        }
    {/macro}

{/CSSTemplate}

//*******************
//LOGICAL-PATH:aria/widgets/container/Div.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.container.Div",$extends:"aria.widgets.container.Container",$dependencies:["aria.utils.Dom","aria.widgets.frames.FrameFactory"],$css:["aria.widgets.container.DivStyle"],$constructor:function(e,t){this.$Container.constructor.apply(this,arguments),this._frame||(this._frame=aria.widgets.frames.FrameFactory.createFrame({skinnableClass:"Div",sclass:e.sclass,state:"normal",width:e.width,height:e.height,printOptions:e.printOptions,cssClass:e.cssClass,"oldStuff:cssRoot":"DIV"
,block:e.block,scrollBarX:e.scrollBarX,scrollBarY:e.scrollBarY})),this._skinObj=this._frame.getSkinObject(),this._selected=!1},$destructor:function(){this._skinObj=null,this._initState=null,this._frame&&(this._frame.$dispose(),this._frame=null),this.$Container.$destructor.call(this)},$prototype:{_init:function(){var e=aria.utils.Dom.getDomElementChild(this.getDom(),0);this._frame.linkToDom(e),aria.widgets.container.Div.superclass._init.call(this)},_widgetMarkupBegin:function(e){this._frame.writeMarkupBegin(e
)},_widgetMarkupEnd:function(e){this._frame.writeMarkupEnd(e)},updateSize:function(e){var t=!1,n;n=e.maxWidth,n&&n!=this._cfg.maxWidth&&(this._cfg.maxWidth=n,t=!0),n=e.width,n&&n!=this._cfg.width&&(this._cfg.width=n,t=!0),n=e.maxHeight,n&&n!=this._cfg.maxHeight&&(this._cfg.maxHeight=n,t=!0),n=e.height,n&&n!=this._cfg.height&&(this._cfg.height=n,t=!0),t&&this.$Container._updateSize.call(this)}}});
//*******************
//LOGICAL-PATH:aria/widgets/container/DivStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.container.DivStyle",
    $extends: "aria.widgets.WidgetStyle"
}}

{var skinnableClassName="Div"/}
{var useFrame=true/}

{macro main()}

// THE 4 CSS CLASSES BELOW ARE PROBABLY NO LONGER USED AND SHOULD BE REMOVED

/* DIV Top row */
.xDIVtr {
    position:relative;
    zoom:1;
    _overflow-y:hidden;
    padding:0px;
}
/* DIV Top row corner*/
.xDIVtrc {
    position:absolute;
    top:0px;
    left:0px;
    height:100%;
    _height:1600px; /* arbitrary long height, IE 6 */
}
/* DIV Bottom row */
.xDIVbr {
    position:relative;
    width:100%;
    font-size:1px;
}
/* DIV Bottom row corner*/
.xDIVbrc {
    position:relative;
}

{call startLooping()/}

{/macro}
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/container/FieldsetStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.container.FieldsetStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="Fieldset"/}
    {var useFrame=true/}
    
    {macro writeState(info)}
        {var state=info.state/}
        .${cssPrefix(info)}label {
            left: ${state.label.left}px;
            top: ${state.label.top}px;
            padding-top: ${state.label.paddingTop}px;
            padding-left: ${state.label.paddingLeft}px;
            padding-right: ${state.label.paddingRight}px;
            padding-bottom: ${state.label.paddingBottom}px;
            background-color: ${state.label.backgroundColor};
            font-weight: ${state.label.fontWeight};
            color: ${state.label.color};
            position: absolute;
        }
    {/macro}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/container/SplitterStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.container.SplitterStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="Splitter"/}

    {macro writeSkinClass(info)}
        {var skinClassName=info.skinClassName/}
        {var skinClass=info.skinClass/}

/* Splitter classes */

.xSplitter_${skinClassName}_sHandleH {
  position:absolute;
  height:${skinClass.separatorHeight}px;
  cursor: n-resize;
  display:block;
  {call background(skinClass.handleBackgroundColor,skinClass.handleSpriteURLh,"no-repeat center top")/}
}

.xSplitter_${skinClassName}_sHandleV {
  position:absolute;
  width:${skinClass.separatorHeight}px;
  cursor: e-resize;
  display:block;
  {call background(skinClass.handleBackgroundColor,skinClass.handleSpriteURLv,"no-repeat right center")/}
}

.xSplitter_${skinClassName}_sContainer{
  position:relative;
  display:inline-block;
}

.xSplitter_${skinClassName}_sConstrained{
  width:100%;
  height:100%;
  display:inline-block;
  position:absolute;
}

.xSplitter_${skinClassName}_sSplitBarProxyH{
  position:absolute;
  height:${skinClass.separatorHeight}px;
  cursor: n-resize;
  display:block;
  z-index:9999;
  width:100%;
  {call background(skinClass.proxyBackgroundColor,skinClass.proxySpriteURLh,"no-repeat center top")/}
}

.xSplitter_${skinClassName}_sSplitBarProxyV{
  position:absolute;
  width:${skinClass.separatorHeight}px;
  cursor: e-resize;
  display:block;
  z-index:9999;
  height:100%;
  {call background(skinClass.proxyBackgroundColor,skinClass.proxySpriteURLv,"no-repeat right center")/}
}

.xSplitter_${skinClassName}_sBdr{
   border:1px solid ${skinClass.borderColor} ;
}

.xSplitter_${skinClassName}_sMacro {
  position:absolute;
  overflow: auto;
  display:block;
}

    {/macro}

{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/container/TabPanelStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.container.TabPanelStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="TabPanel"/}
    {var useFrame=true/}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/container/TabStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.container.TabStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="Tab"/}
    {var useFrame=true/}
    
    {macro main()}
        .xTab_std_selectedFocused_c {
            outline: 1px dotted;
        }
        
        .xTab_std_normalFocused_c {
            outline: 1px dotted;
        }
        
        .xTab_std_msoverFocused_c {
            outline: 1px dotted;
        }
        {call startLooping()/}
    {/macro}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/controllers/AutoCompleteController.js
//*******************
(function(){var e,t;Aria.classDefinition({$classpath:"aria.widgets.controllers.AutoCompleteController",$extends:"aria.widgets.controllers.DropDownListController",$dependencies:["aria.DomEvent","aria.utils.Json","aria.templates.RefreshManager","aria.widgets.controllers.reports.DropDownControllerReport","aria.utils.Type","aria.html.controllers.Suggestions"],$resources:{res:"aria.widgets.WidgetsRes"},$onload:function(){e=aria.utils.Json,t=aria.utils.Type},$onunload:function(){e=null,t=null},$constructor:function(
){this.$DropDownListController.constructor.call(this),this.autoFill=!1,this.freeText=!0,this.expandButton=!1,this._pendingRequestNb=0,this.maxlength=-1,this._resetFocus=!1,this._init()},$destructor:function(){this.dispose(),this.$DropDownListController.$destructor.call(this)},$prototype:{$init:function(e){var t=aria.html.controllers.Suggestions.prototype;for(var n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])},getDefaultTemplate:function(){return this._resourcesHandler.getDefaultTemplate()},checkText
:function(e){var t=this._dataModel;if(e!==""&&e!==t.text)return t.text=e,this._pendingRequestNb+=1,this._resourcesHandler.getSuggestions(e,{fn:this._suggestionsCallback,scope:this,args:{nextValue:e,triggerDropDown:!1}}),null;var n=new aria.widgets.controllers.reports.DropDownControllerReport;return e===""?(t.value=null,t.text="",n.ok=!0,n.value=null):(this.freeText?(n.ok=!0,this._pendingRequestNb>0&&!t.value&&(n.value=t.text)):t.value||(this.expandButton&&t.listContent&&this._checkValueList()?n.ok=!0:(n.ok=!1
,n.value=null,n.errorMessages.push(this.res.errors["40020_WIDGET_AUTOCOMPLETE_VALIDATION"]))),t.value&&(n.value=t.value)),n},_checkValueList:function(){var e=!1,t=this._dataModel.listContent;for(var n=0,r=t.length;n<r;n+=1)if(this._dataModel.text===t[n].value.label){e=!0;break}return e},checkValue:function(e){var n=new aria.widgets.controllers.reports.DropDownControllerReport,r=this._dataModel;if(e==null)r.text=this._pendingRequestNb>0&&r.text?r.text:"",r.value=null,n.ok=!0;else if(e&&!t.isString(e))if(aria.
core.JsonValidator.check(e,this._resourcesHandler.SUGGESTION_BEAN)){var i=this._getLabelFromSuggestion(e);r.text=i,r.value=e,n.ok=!0}else r.value=null,n.ok=!1,this.$logError("Value does not match definition for this autocomplete: "+this._resourcesHandler.SUGGESTION_BEAN,[],e);else t.isString(e)&&(r.text=e),this.freeText?(n.ok=!0,r.value=e):(n.ok=!1,r.value=null);return n.value=r.value,n.text=r.text,n},_checkInputKey:function(e,t,n,r,i){if(this.maxlength>0&&n.length>this.maxlength)return;this._dataModel.value=
this.freeText?n:null,this._dataModel.text=n,this._typeTimout&&(clearTimeout(this._typeTimout),this._typeTimout=null);var s=this,o=aria.DomEvent;if(t==o.KC_ARROW_DOWN&&!n&&s.expandButton){s.toggleDropdown("",!!s._listWidget);return}return this._typeTimout=setTimeout(function(){s._typeTimout=null,s._pendingRequestNb+=1,s._resourcesHandler.getSuggestions(n,{fn:s._suggestionsCallback,scope:s,args:{nextValue:n,triggerDropDown:!0,caretPosStart:r,caretPosEnd:i}})},10),null},_suggestionsCallback:function(t,n){this._pendingRequestNb-=1
;var r=null,i=null,s=!1;t!=null&&("suggestions"in t?(r=t.suggestions,i=t.error,s=t.repositionDropDown):r=t);var o=n.nextValue,u=n.triggerDropDown,a=-1,f=this._dataModel;if(f&&o==f.text||n.keepSelectedValue){var l=r!==null;if(l){if(n.keepSelectedValue&&f.value){var c=f.value.code;for(var h=0;h<r.length;h+=1)r[h].exactMatch=r[h].code===c}a=this._prepareSuggestionsAndMatch(r,o)}else r=[];var p=r.length>0;this._resetFocus=r.length>0||!this.expandButton,aria.templates.RefreshManager.stop(),e.setValue(f,"selectedIdx"
,-1),e.setValue(f,"listContent",r),e.setValue(f,"selectedIdx",a);var d=new aria.widgets.controllers.reports.DropDownControllerReport;d.text=o,d.caretPosStart=n.caretPosStart,d.caretPosEnd=n.caretPosEnd,a!=-1?f.value=f.listContent[a].value:this.freeText&&o?f.value=o:f.value=null,d.value=f.value,d.cancelKeyStroke=!0,i!=null?d.ok=!i:!this.freeText&&l&&!p?d.ok=!1:d.ok=!0,d.ok&&l&&!p&&(f.value=o),d.displayDropDown=p&&u,d.repositionDropDown=s;var v={};v.stopValueProp=!0,this._raiseReport(d,v),aria.templates.RefreshManager
.resume()}},_prepareSuggestionsAndMatch:function(e,t){var n=-1,r;for(var i=0,s=e.length,o;i<s;i+=1){r=e[i],n==-1&&r.exactMatch&&(n=i),o=this._getLabelFromSuggestion(r);var u={entry:t,label:o,value:r};e[i]=u}return n},_getLabelFromSuggestion:function(e){return this._resourcesHandler.suggestionToLabel(e)},_getLabelFromListValue:function(e){return this.autoFill?this._getLabelFromSuggestion(e.value):null},getDisplayTextFromValue:function(e){var t=e?this._getLabelFromSuggestion(e):"";return t?t:e},toggleDropdown:
function(e,t){this._resourcesHandler.getAllSuggestions({fn:this._suggestionsCallback,scope:this,args:{nextValue:e,triggerDropDown:!t,keepSelectedValue:!0}})}}})})();
//*******************
//LOGICAL-PATH:aria/widgets/controllers/DatePickerController.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.controllers.DatePickerController",$dependencies:["aria.widgets.controllers.reports.ControllerReport","aria.utils.Json"],$extends:"aria.widgets.controllers.DateController",$constructor:function(){this.$DateController.constructor.call(this),this._calendar=null,this._dataModel.calendarValue=null},$destructor:function(){this._calendar=null,this.$DateController.$destructor.call(this)},$prototype:{setCalendar:function(e){this._calendar=e},checkText:function(e){var t=this
.$DateController.checkText.apply(this,arguments);return t.ok&&aria.utils.Json.setValue(this._dataModel,"calendarValue",this._dataModel.jsDate),t},checkValue:function(e){var t=this.$DateController.checkValue.apply(this,arguments);return t.ok&&aria.utils.Json.setValue(this._dataModel,"calendarValue",this._dataModel.jsDate),t},checkKeyStroke:function(e,t,n,r){if(this._calendar){if(t==13||e==32||t==9){var i=this.checkValue(this._dataModel.calendarValue);return i.displayDropDown=!1,i.cancelKeyStroke=t!=9,i}var i=new 
aria.widgets.controllers.reports.ControllerReport;return i.text=n,t==27?(i.displayDropDown=!1,i.caretPosStart=0,i.caretPosEnd=n.length):i.cancelKeyStroke=this._calendar.sendKey(e,t),i.text=n,i}if(t==40){var i=this.checkText(n);return i.cancelKeyStroke=!0,i.displayDropDown=!0,i}return this.$DateController.checkKeyStroke.apply(this,arguments)},toggleDropdown:function(e,t){var n=this.checkText(e);return n.displayDropDown=!t,n.ok=n.ok||!e,n}}});
//*******************
//LOGICAL-PATH:aria/widgets/controllers/DropDownListController.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.controllers.DropDownListController",$extends:"aria.widgets.controllers.TextDataController",$dependencies:["aria.DomEvent","aria.widgets.controllers.reports.DropDownControllerReport"],$constructor:function(){this.$TextDataController.constructor.call(this),this._listWidget=null,this._dataModel={value:null,text:"",initialInput:"",selectedIdx:-1,listContent:[]}},$destructor:function(){this._listWidget&&this._listWidget.$dispose&&this._listWidget.$dispose(),this._dataModel=
null,this.$TextDataController.$destructor.call(this)},$prototype:{setListWidget:function(e){this._listWidget=e},getListWidget:function(){return this._listWidget},checkKeyStroke:function(e,t,n,r,i){var s=this._dataModel,o=aria.DomEvent,u;if(!o.isNavigationKey(t)){var a,f=t==o.KC_DELETE||t==o.KC_BACKSPACE;return f?a=this._getTypedValueOnDelete(t,n,r,i):a=this._getTypedValue(e,n,r,i),s.initialInput=a.nextValue,this._checkInputKey(e,t,a.nextValue,a.caretPosStart,a.caretPosEnd)}if(!this._listWidget)return t==o.KC_ARROW_DOWN?
u=this._checkInputKey(e,t,n,r,i):u=new aria.widgets.controllers.reports.DropDownControllerReport,u&&t!=o.KC_TAB&&(u.cancelKeyStroke=!1),u;if(t==o.KC_ESCAPE)return u=this.checkText(s.initialInput),u||(u=new aria.widgets.controllers.reports.DropDownControllerReport),u.displayDropDown=!1,u.text=s.initialInput,u.value=u.text,s.value=null,u;if(t!=o.KC_ENTER){if(t==o.KC_TAB)return s.listContent.length===1&&(s.selectedIdx=0,s.text=this._getLabelFromListValue(s.listContent[s.selectedIdx]),s.value=s.listContent[s.selectedIdx
].value),u=this.checkValue(s.value),u.displayDropDown=!1,u.cancelKeyStroke=!1,u;if(t==o.KC_ARROW_LEFT)return;u=new aria.widgets.controllers.reports.DropDownControllerReport;var l=s.selectedIdx;this._listWidget.sendKey(0,t);var c=s.selectedIdx;return l!=c&&(u.ok=!0,c==-1?(s.value=null,s.text=s.initialInput):(s.value=s.listContent[c].value,s.text=this._getLabelFromListValue(s.listContent[c])),u.text=s.text),u}s.listContent.length===1&&(s.selectedIdx=0,s.text=this._getLabelFromListValue(s.listContent[s.selectedIdx
]),s.value=s.listContent[s.selectedIdx].value);if(s.selectedId!=-1)return u=this.checkValue(s.value),u.displayDropDown=!1,u.cancelKeyStroke=!0,u},_checkInputKey:function(e,t,n,r,i){var s=new aria.widgets.controllers.reports.DropDownControllerReport;return s.ok=!0,s.cancelKeyStroke=!1,s.displayDropDown=this._dataModel.listContent.length>0,s},_getLabelFromListValue:function(e){return e.label}}});
//*******************
//LOGICAL-PATH:aria/widgets/controllers/NumberController.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.controllers.NumberController",$extends:"aria.widgets.controllers.TextDataController",$dependencies:["aria.DomEvent","aria.widgets.controllers.reports.ControllerReport","aria.utils.Number"],$resources:{res:"aria.widgets.WidgetsRes"},$constructor:function(){this.$TextDataController.constructor.call(this),this._dataModel={number:0,displayText:""},this._pattern=""},$destructor:function(){this._dataModel=null,this.$TextDataController.$destructor.call(this),this._pattern=
null},$prototype:{setPattern:function(e){e&&(aria.utils.Number.isValidPattern(e)?this._pattern=e:this.$logError(aria.widgets.Widget.INVALID_CONFIGURATION,["pattern "]))},checkValue:function(e){var t=new aria.widgets.controllers.reports.ControllerReport;return t.ok=e===null||aria.utils.Type.isNumber(e),t.ok&&(this._dataModel.number=e,e!==null?this._pattern?this._dataModel.displayText=aria.utils.Number.formatNumber(e.toString(),this._pattern):this._dataModel.displayText=e.toString():this._dataModel.displayText=""
,t.text=this._dataModel.displayText,t.value=this._dataModel.number),t},checkText:function(e,t){var n=new aria.widgets.controllers.reports.ControllerReport;n.ok=!1;if(!e)n.ok=!0,this._dataModel.displayText="",this._dataModel.number=null;else if(e===this._dataModel.displayText)n.ok=!t,n.ok||(n.errorMessages[0]=this.res.errors["40006_WIDGET_NUMBERFIELD_VALIDATION"]);else{this._dataModel.displayText=e;var r=aria.utils.Number.interpretNumber(e,this._pattern);r=aria.utils.Number.toNumber(r),r!==null?(this._dataModel
.number=r,this._dataModel.displayText=aria.utils.Number.formatNumber(r,this._pattern),n.ok=!0):(n.errorMessages[0]=this.res.errors["40006_WIDGET_NUMBERFIELD_VALIDATION"],this._dataModel.number=null)}return n.text=this._dataModel.displayText,n.value=this._dataModel.number,n}}});
//*******************
//LOGICAL-PATH:aria/widgets/controllers/SelectBoxController.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.controllers.SelectBoxController",$extends:"aria.widgets.controllers.DropDownListController",$dependencies:["aria.DomEvent","aria.utils.Json","aria.widgets.controllers.reports.DropDownControllerReport"],$constructor:function(){this.$DropDownListController.constructor.call(this),this._options=null},$statics:{LABEL_META:Aria.FRAMEWORK_PREFIX+"lcLabel"},$prototype:{setListOptions:function(e){this._options=e;var t=e.length,n;for(var r=0;t>r;r++)n=e[r],n[this.LABEL_META
]=n.label.toLowerCase()},toggleDropdown:function(e,t){var n=this._dataModel,r=new aria.widgets.controllers.reports.DropDownControllerReport,i=this._options;r.displayDropDown=i.length>0&&(!t||n.listContent.length<i.length);if(r.displayDropDown){n.initialInput=e;var s=aria.utils.Json;s.setValue(n,"selectedIdx",-1),s.setValue(n,"listContent",i)}return r},setListWidget:function(e){this._listWidget=e},_buildSuggestionsList:function(e){var t=e.toLowerCase(),n=[],r=t.length,i=this._options.length,s,o,u=null,a=-1;for(
var f=0;i>f;f++)s=this._options[f],o=s[this.LABEL_META].slice(0,r),o==t&&(n.push(s),a==-1&&(r==s.label.length?(a=n.length-1,u=s.label):u==null&&(u=s.label.slice(0,r))));return{bestDisplayValue:u,exactMatch:a,suggestions:n}},checkValue:function(e){var t=new aria.widgets.controllers.reports.DropDownControllerReport,n=this._dataModel,r=this._options;if(e==null)t.ok=!0,n.value=null,n.text="";else if(e==n.value)t.ok=!0;else{t.ok=!1;for(var i=0,s=r.length;i<s;i++){var o=r[i];if(o.value==e){t.ok=!0,n.text=o.label,n
.value=o.value;break}}}return t.ok&&(t.text=n.text,t.value=n.value),t},checkText:function(e){var t=new aria.widgets.controllers.reports.DropDownControllerReport,n=this._dataModel,r=e.toLowerCase(),i=e.length;if(!e)n.value=null,n.text="",t.ok=!0;else if(e==n.text)t.ok=!0;else{t.ok=!1;var s=this._options.length,o;for(var u=0;s>u;u++){o=this._options[u];if(o.label==e){n.value=o.value,n.text=o.label,t.ok=!0;break}r==o[this.LABEL_META].slice(0,i)&&(t.matchCorrectValueStart=!0)}}return t.ok&&(t.text=n.text,t.value=
n.value),t},_checkInputKey:function(e,t,n,r,i){var s=new aria.widgets.controllers.reports.DropDownControllerReport,o=this._dataModel;s.caretPosStart=r,s.caretPosEnd=i;var u=this._buildSuggestionsList(n),a=u.suggestions;s.matchCorrectValueStart=a.length>0;if(s.matchCorrectValueStart){s.text=u.bestDisplayValue;var f=u.exactMatch;if(f!=-1){var l=a[f];s.ok=!0,o.text=l.label,o.value=l.value,s.displayDropDown=a.length>1}else s.ok=!1,s.displayDropDown=a.length>0;var c=aria.utils.Json;c.setValue(o,"listContent",a),c
.setValue(o,"selectedIdx",f),o.initialInput=s.text}return s.cancelKeyStroke=!0,s},getDisplayTextFromValue:function(e){var t=this._options;for(var n=0,r=t.length;r>n;n++)if(t[n].value==e)return t[n].label;return""}}});
//*******************
//LOGICAL-PATH:aria/widgets/controllers/SelectController.js
//*******************
(function(){var e,t;Aria.classDefinition({$classpath:"aria.widgets.controllers.SelectController",$extends:"aria.widgets.controllers.TextDataController",$dependencies:["aria.DomEvent","aria.widgets.controllers.reports.DropDownControllerReport"],$constructor:function(){this.$TextDataController.constructor.call(this),this._dataModel={listContent:[],lastTypedKeys:null,pageSize:20,displayIdx:-1,displayText:"",value:null,selectedIdx:-1},this._reinitTypedKeysTimeout=null},$destructor:function(){this._setLastTypedKeys
(null),this.setListWidget(null),this.$TextDataController.$destructor.call(this)},$onload:function(){e=aria.utils.Json,t=aria.DomEvent},$onunload:function(){e=null,t=null},$statics:{LABEL_META:Aria.FRAMEWORK_PREFIX+"lcLabel",LAST_TYPED_KEYS_DELAY:800},$prototype:{setListOptions:function(t){var n=this._dataModel,r=t.length,i;for(var s=0;r>s;s++)i=t[s],i[this.LABEL_META]=i.label.toLowerCase();e.setValue(n,"listContent",t),this._setDisplayIdx(0)},_createReport:function(e){var t=this._dataModel,n=new aria.widgets
.controllers.reports.DropDownControllerReport;return n.ok=!0,e&&(n.value=t.value),n.text=t.displayText,n},_setDisplayIdx:function(t){var n=this._dataModel,r=n.listContent;r.length===0?t=-1:t>=r.length?t=r.length-1:t<0&&(t=0),t==-1?(e.setValue(n,"selectedIdx",-1),e.setValue(n,"displayIdx",-1),e.setValue(n,"displayText",""),e.setValue(n,"value",null)):(e.setValue(n,"selectedIdx",t),e.setValue(n,"displayIdx",t),e.setValue(n,"displayText",r[t].label),e.setValue(n,"value",r[t].value))},_setLastTypedKeys:function(
t){var n=this._dataModel;e.setValue(n,"lastTypedKeys",t),this._reinitTypedKeysTimeout&&(aria.core.Timer.cancelCallback(this._reinitTypedKeysTimeout),this._reinitTypedKeysTimeout=null),t!=null&&(this._reinitTypedKeysTimeout=aria.core.Timer.addCallback({fn:this._reinitLastTypedKeys,scope:this,delay:this.LAST_TYPED_KEYS_DELAY}))},_reinitLastTypedKeys:function(){this._reinitTypedKeysTimeout=null,this._setLastTypedKeys(null)},_findMatch:function(e,t){var n=this.LABEL_META,r=this._dataModel.listContent,i=e.length,
s=this._dataModel.selectedIdx+(t?1:0);for(var o=0,u=r.length;o<u;o++,s++){s>=u&&(s=0);var a=r[s],f=a[n].substr(0,i);if(f==e)return s}return-1},_findLetterMatch:function(e){var t=e.length;if(t<=1)return-1;var n=e.charAt(0);for(var r=1;r<t;r++)if(n!=e.charAt(r))return-1;return this._findMatch(n,!0)},checkKeyStroke:function(n,r){var i=this._dataModel,s;if(t.isNavigationKey(r)){var o,u=!1;r==t.KC_LEFT||r==t.KC_UP?o=i.selectedIdx-1:r==t.KC_RIGHT||r==t.KC_DOWN?o=i.selectedIdx+1:r==t.KC_PAGE_UP?o=i.selectedIdx-(i.pageSize-1
):r==t.KC_PAGE_DOWN?o=i.selectedIdx+(i.pageSize-1):r==t.KC_HOME?o=0:r==t.KC_END?o=i.listContent.length-1:r==t.KC_ENTER?(o=i.selectedIdx,u=!0):r==t.KC_ESCAPE?this._listWidget&&(s=this._createReport(!1),s.displayDropDown=!1,s.cancelKeyStroke=!0,e.setValue(i,"selectedIdx",i.displayIdx)):r==t.KC_TAB&&(o=i.displayIdx,u=!0),o!=null&&(this._setLastTypedKeys(null),this._setDisplayIdx(o),s=this._createReport(u),s.cancelKeyStroke=r!=t.KC_TAB&&(r!=t.KC_ENTER||this._listWidget!=null),this._listWidget&&u&&(s.displayDropDown=!1
))}else{var a=i.lastTypedKeys,f=a==null;f&&(a="");var l;if(r==t.KC_BACKSPACE)l=this._getTypedValueOnDelete(r,a,a.length,a.length).nextValue;else{l=this._getTypedValue(n,a,a.length,a.length).nextValue,l=l.toLowerCase();var c=this._findMatch(l,f);c==-1&&(c=this._findLetterMatch(l)),c>-1&&this._setDisplayIdx(c)}s=this._createReport(!1),s.cancelKeyStroke=!0,this._setLastTypedKeys(l)}return s},checkValue:function(e){var t=this._dataModel.listContent,n=-1;for(var r=0,i=t.length;r<i;r++)if(t[r].value==e){n=r;break}
return this._setDisplayIdx(n),this._createReport(!0)},checkText:function(e){return null},toggleDropdown:function(){var e=new aria.widgets.controllers.reports.DropDownControllerReport;return e.displayDropDown=this._listWidget==null,this._dataModel&&this._dataModel.displayIdx!==this._dataModel.selectedIdx&&this._setDisplayIdx(this._dataModel.displayIdx),e},setListWidget:function(e){this._listWidget=e}}})})();
//*******************
//LOGICAL-PATH:aria/widgets/controllers/TextDataController.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.controllers.TextDataController",$dependencies:["aria.widgets.controllers.reports.ControllerReport"],$events:{onCheck:{description:"",properties:{report:"{aria.widgets.controllers.reports.ControllerReport} a check report"}}},$constructor:function(){this._dataModel={value:null,displayText:""}},$prototype:{checkKeyStroke:function(e,t,n,r){return new aria.widgets.controllers.reports.ControllerReport},checkText:function(e){var t=new aria.widgets.controllers.reports.ControllerReport
;return aria.utils.Type.isString(e)||aria.utils.Type.isNumber(e)?(t.value=e,t.ok=!0):t.ok=!1,t},checkValue:function(e){e==null&&(e="");var t=this.checkText(e);return t.text=t.value,t},getDataModel:function(){return this._dataModel},_getTypedValue:function(e,t,n,r){var i;if(e===0)return i={nextValue:t,caretPosStart:n,caretPosEnd:r},i;var s=String.fromCharCode(e);if(s==="")return i={nextValue:t,caretPosStart:n,caretPosEnd:r},i;if(t==null||t==="")return i={nextValue:s,caretPosStart:s.length,caretPosEnd:s.length
},i;var o=t.length;if(n>=o)return i={nextValue:t+s,caretPosStart:n+s.length,caretPosEnd:n+s.length},i;var u=t.slice(0,n),a=t.slice(r,o);return i={nextValue:u+s+a,caretPosStart:n+s.length,caretPosEnd:n+s.length},i},_getTypedValueOnDelete:function(e,t,n,r){var i={};if(t==null||t==="")return i={nextValue:"",caretPosStart:0,caretPosEnd:0},i;var s=t.length;n>=s&&(n=s);var o="",u="";return n!=r&&(e=aria.DomEvent.KC_DELETE),e==aria.DomEvent.KC_DELETE?(n!=r?(o=t.slice(0,n),u=t.slice(r,s)):(o=t.slice(0,n),n==s?u="":u=
t.slice(n+1,s)),i.caretPosStart=n,i.caretPosEnd=n):(n<1?(o="",i.caretPosStart=n,i.caretPosEnd=n):(o=t.slice(0,n-1),i.caretPosStart=n-1,i.caretPosEnd=n-1),u=t.slice(r,s)),i.nextValue=o+u,i},_raiseReport:function(e,t){this.$raiseEvent({name:"onCheck",report:e,arg:t})}}});
//*******************
//LOGICAL-PATH:aria/widgets/controllers/reports/ControllerReport.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.controllers.reports.ControllerReport",$dependencies:[],$constructor:function(){this.ok=null,this.cancelKeyStroke=!1,this.matchCorrectValueStart=!1,this.text=null,this.value,this.errorMessages=[],this.caretPosStart=null,this.caretPosEnd=null},$destructor:function(){this.ok=null,this.internalValue=null,this.errorMessages=null}});
//*******************
//LOGICAL-PATH:aria/widgets/controllers/reports/DropDownControllerReport.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.controllers.reports.DropDownControllerReport",$extends:"aria.widgets.controllers.reports.ControllerReport",$dependencies:[],$constructor:function(){this.$ControllerReport.constructor.call(this),this.displayDropDown=null,this.repositionDropDown=!1},$destructor:function(){this.displayDropDown=null,this.$ControllerReport.$destructor.call(this)}});
//*******************
//LOGICAL-PATH:aria/widgets/errorlist/CfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.widgets.errorlist.CfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes"},$beans:{Model:{$type:"json:Object",$description:"",$mandatory:!0,$properties:{title:{$type:"json:String",$description:""},displayCodes:{$type:"json:Boolean",$description:""},messages:{$type:"json:ObjectRef",$description:"",$mandatory:!0},filterTypes:{$type:"json:Array",$description:"",$default:null,$contentType:{$type:"json:String",$description:"",$mandatory:!0},$sample:["F","E"]},divCfg:
{$type:"json:ObjectRef",$mandatory:!0,$description:""},messageTypes:{$type:"json:Map",$description:"",$contentType:{$type:"json:Integer",$description:"",$minValue:0}}}}}});
//*******************
//LOGICAL-PATH:aria/widgets/errorlist/ErrorList.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.errorlist.ErrorList",$extends:"aria.widgets.TemplateBasedWidget",$dependencies:["aria.widgets.Template","aria.widgets.errorlist.ErrorListController","aria.DomEvent"],$onload:function(){Aria.load({templates:["aria.widgets.errorlist.ErrorListTemplate"]})},$constructor:function(e,t){this.$TemplateBasedWidget.constructor.apply(this,arguments);var n=aria.widgets.AriaSkinInterface.getSkinObject("ErrorList",this._cfg.sclass),r=aria.utils.Json.copy(e,!0,["width","minWidth"
,"maxWidth","height","minHeight","block","maxHeight"]);r.sclass=n.divsclass,r.margins="0 0 0 0",r.id=e.id+"_div",this._initTemplate({defaultTemplate:this._cfg.defaultTemplate,moduleCtrl:{classpath:"aria.widgets.errorlist.ErrorListController",initArgs:{divCfg:r,filterTypes:e.filterTypes,displayCodes:e.displayCodes,title:e.title,messages:e.messages}}})},$destructor:function(){this.$TemplateBasedWidget.$destructor.call(this)},$prototype:{_onBoundPropertyChange:function(e,t,n){this._inOnBoundPropertyChange=!0;try{
if(e=="messages"){var r=this._domElt;this._subTplModuleCtrl.setMessages(t,r)}this._cfg[e]=t}finally{this._inOnBoundPropertyChange=!1}}}});
//*******************
//LOGICAL-PATH:aria/widgets/errorlist/ErrorListController.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.errorlist.ErrorListController",$extends:"aria.templates.ModuleCtrl",$implements:["aria.widgets.errorlist.IErrorListController"],$dependencies:["aria.widgets.errorlist.CfgBeans"],$constructor:function(){this.$ModuleCtrl.constructor.call(this),this._dataBeanName="aria.widgets.errorlist.CfgBeans.Model"},$prototype:{$publicInterfaceName:"aria.widgets.errorlist.IErrorListController",init:function(e,t){this._data={title:e.title,divCfg:e.divCfg,filterTypes:e.filterTypes
,displayCodes:e.displayCodes},this.setMessages(e.messages),this.$callback(t)},setMessages:function(e,t){e==null&&(e=[]);var n={},r=this._processMessages(e,n,this._data.filterTypes);this.json.setValue(this._data,"messageTypes",n),this.json.setValue(this._data,"messages",r);var i=r.length>0?t:null;this.$raiseEvent({name:"messagesChanged",domRef:i})},focusField:function(e){if(!e.metaDataRef)return;e.metaDataRef.requireFocus&&this.json.setValue(e.metaDataRef,"requireFocus",!1),this.json.setValue(e.metaDataRef,"requireFocus"
,!0)},_processMessages:function(e,t,n){var r;for(var i=0,s=e.length;i<s;i++){var o=e[i],u=o.type,a=!n||aria.utils.Array.contains(n,u);a&&(t[o.type]?t[o.type]+=1:t[o.type]=1);var f=!1,l=o.subMessages;l&&l.length>0?(l=this._processMessages(l,t,n),l.length>0&&(a=!0),a&&l!=o.subMessages?(f=!0,o=aria.utils.Json.copy(o,!1),o.subMessages=l):f=!a):f=!a,!r&&f&&(r=e.slice(0,i)),r&&a&&r.push(o)}return r==null&&(r=e),r}}});
//*******************
//LOGICAL-PATH:aria/widgets/errorlist/ErrorListTemplate.tpl
//*******************
{Template {
    $classpath:'aria.widgets.errorlist.ErrorListTemplate',
    $hasScript: true
}}

    {macro main()}
        {if data.messages.length > 0}
            {@aria:Div data.divCfg}
                {@aria:Icon {icon: getIcon()}/}
                <span style="padding: 3px 16px 3px 10px; font-weight: bold;">${data.title}</span>
                <div style="padding: 3px 0 0 0;">
                    {call messagesList(data.messages)/}
                </div>
            {/@aria:Div}
        {/if}
    {/macro}
    
    {macro messagesList(messages, indentation)}
        <ul style="margin: 0 0 0 10px; padding-left: 10px;">
            {foreach msg inArray messages}
                <li style="list-style-type: square;">
                {if msg.metaDataRef}
                    {@aria:Link {
                        label: getDisplayMessage(msg),
                        onclick: { fn: clickOnMessage, args: msg }
                    }/}
                {else/}
                    ${getDisplayMessage(msg)}
                {/if}
                {if msg.subMessages}
                    {call messagesList(msg.subMessages)/}
                {/if}
                </li>
            {/foreach}
        </ul>
    {/macro}

{/Template}
//*******************
//LOGICAL-PATH:aria/widgets/errorlist/ErrorListTemplateScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.widgets.errorlist.ErrorListTemplateScript",$dependencies:["aria.utils.Data","aria.utils.Dom"],$statics:{ICONS:[],DEFAULT_ICON:"std:missing"},$prototype:{$init:function(e){e.ICONS.push({type:aria.utils.Data.TYPE_ERROR,icon:"std:error"},{type:aria.utils.Data.TYPE_WARNING,icon:"std:warning"},{type:aria.utils.Data.TYPE_INFO,icon:"std:info"},{type:aria.utils.Data.TYPE_FATAL,icon:"std:error"},{type:aria.utils.Data.TYPE_NOTYPE,icon:"std:info"},{type:aria.utils.Data.TYPE_CRITICAL_WARNING
,icon:"std:warning"},{type:aria.utils.Data.TYPE_CONFIRMATION,icon:"std:confirm"})},onModuleEvent:function(e){if(e.name=="messagesChanged"){if(e.domRef)var t=aria.utils.Dom.scrollIntoView(e.domRef);this.$refresh()}},clickOnMessage:function(e,t){this.moduleCtrl.focusField(t)},getIcon:function(){var e=this.data.messageTypes,t=this.DEFAULT_ICON,n=this.ICONS;for(var r=0,i=n.length;r<i;r++){var s=n[r];if(e[s.type]>0){t=s.icon;break}}return t},getDisplayMessage:function(e){return this.data.displayCodes&&(e.code||e.
code===0)?e.localizedMessage+" ("+e.code+")":e.localizedMessage}}});
//*******************
//LOGICAL-PATH:aria/widgets/errorlist/IErrorListController.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.widgets.errorlist.IErrorListController",$extends:"aria.templates.IModuleCtrl",$events:{messagesChanged:"Raised when the list of messages to be displayed has changed."},$interface:{setMessages:function(e){},focusField:function(e){}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/AutoComplete.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.AutoComplete",$extends:"aria.widgets.form.DropDownTextInput",$dependencies:["aria.widgets.form.DropDownListTrait","aria.widgets.controllers.AutoCompleteController","aria.utils.Event"],$css:["aria.widgets.form.AutoCompleteStyle","aria.widgets.form.list.ListStyle","aria.widgets.container.DivStyle"],$constructor:function(e,t,n,r){this._skinnableClass||(this._skinnableClass="AutoComplete");var r=new aria.widgets.controllers.AutoCompleteController;this.$DropDownTextInput
.constructor.call(this,e,t,n,r),e.expandButton||(this._hideIconNames=["dropdown"]);try{r.setResourcesHandler(this._cfg.resourcesHandler)}catch(i){this.$logError(this.WIDGET_AUTOCOMPLETE_INVALID_HANDLER,[this._cfg.resourcesHandler],i)}r.autoFill=this._cfg.autoFill,r.freeText=this._cfg.freeText,r.maxlength=this._cfg.maxlength,r.expandButton=this._cfg.expandButton},$destructor:function(){this._dropdownPopup&&this._dropdownPopup.$removeListeners({onBeforeClose:this._beforeDropdownClose,scope:this}),this._initDone&&
this._removeEvents(),this.$DropDownTextInput.$destructor.call(this)},$statics:{WIDGET_AUTOCOMPLETE_INVALID_HANDLER:"%1Could not create resources handler %2: dependency on this handler is missing."},$prototype:{$init:function(e){var t=aria.widgets.form.DropDownListTrait.prototype;for(var n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])},_renderDropdownContent:function(e,t){t=t||{};if(!("defaultTemplate"in t)){var n=this._cfg;n.suggestionsTemplate?t.defaultTemplate=n.suggestionsTemplate:t.defaultTemplate=
this.controller.getDefaultTemplate()}if(!("minWidth"in t)){var r=this._inputMarkupWidth;r=r<150?150:r,t.minWidth=r+15}t.maxHeight=this._cfg.popupMaxHeight||210,this.$DropDownListTrait._renderDropdownContent.call(this,e,t)},_reactToControllerReport:function(e,t){this.controller._resetFocus||(this._keepFocus=!1),this.$DropDownTextInput._reactToControllerReport.call(this,e,t)},_beforeDropdownClose:function(e){if(this._cfg.autoFill&&e.domEvent){var t=this.controller.checkValue(this.controller._dataModel.value);this
._reactToControllerReport(t)}},_init:aria.core.Browser.isIE?function(){this.$DropDownTextInput._init.call(this);var e=this.getTextInputField();aria.utils.Event.addListener(e,"paste",{fn:this._dom_onpaste,scope:this}),aria.utils.Event.addListener(e,"cut",{fn:this._dom_oncut,scope:this})}:function(){this.$DropDownTextInput._init.call(this)},_removeEvents:aria.core.Browser.isIE?function(){var e=this.getTextInputField();aria.utils.Event.removeListener(e,"paste"),aria.utils.Event.removeListener(e,"cut")}:function(
){},_dom_onpaste:function(e){this.__propagateKeyDown(e)},_dom_oncut:function(e){this.__propagateKeyDown(e)},__propagateKeyDown:function(e){var t=!1;e.$DomEvent||(e=new aria.DomEvent(e),t=!0),e.isSpecialKey=!0,e.ctrlKey=!0,e.charCode=0,this._dom_onkeydown.call(this,e),t&&e.$dispose()}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/AutoCompleteBean.js
//*******************
Aria.beanDefinitions({$package:"aria.widgets.form.AutoCompleteBean",$description:"",$namespaces:{json:"aria.core.JsonTypes"},$beans:{Suggestion:{$type:"json:Object",$description:"",$properties:{exactMatch:{$type:"json:Boolean",$description:"",$default:!1}}}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/AutoCompleteStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.AutoCompleteStyle",
    $extends : "aria.widgets.form.TextInputStyle"
}}
    {var skinnableClassName="AutoComplete"/}
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/CheckBox.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.CheckBox",$extends:"aria.widgets.form.Input",$dependencies:["aria.widgets.Icon","aria.utils.Function","aria.DomEvent","aria.utils.String"],$css:["aria.widgets.form.CheckBoxStyle"],$constructor:function(e,t,n){this.$Input.constructor.apply(this,arguments),this._skinnableClass||(this._skinnableClass="CheckBox"),this._setSkinObj(this._skinnableClass),this._setInputType(),this._setIconPrefix(),this._setState(),this._skinObj.simpleHTML||(this._icon=new aria.widgets
.Icon({icon:this._getIconName(this._state)},t,n)),this._hasFocus=!1,this._mousePressed=!1},$destructor:function(){this._icon&&(this._icon.$dispose(),this._icon=null),this.$Input.$destructor.call(this)},$prototype:{focus:function(){this._focus()},_checkCfgConsistency:function(){this._customTabIndexProvided=this._skinObj.simpleHTML},_isChecked:function(){return this.getProperty("value")},_inputMarkup:function(e){var t=this._cfg,n=this._inputName?' name="'+this._inputName+'"':"";if(this._skinObj.simpleHTML){var r=
this._cfg.tabIndex;r=t.disabled?"":'tabindex="'+this._calculateTabIndex()+'" ',e.write(['<input style="display:inline-block"',t.disabled?" disabled":"",this._isChecked()?" checked":"",' type="',t._inputType,'"',n,' value="',t.value.toString(),'" '+r+"/>"].join(""))}else this._icon.writeMarkup(e),e.write(["<input",Aria.testMode?' id="'+this._domId+'_input"':"",' style="display:none"',t.disabled?" disabled":"",this._isChecked()?" checked":"",' type="',t._inputType,'"',n,' value="',t.value.toString(),'"/>'].join
(""))},_inputLabelMarkup:function(e,t,n){var r=this._cfg,i=this._icon?this._icon.getCurrentIconInfo():null,s,o;i!=null&&(s=i.height),this._skinObj.states[this._state]!=null&&(o=this._skinObj.states[this._state].color),e.write('<span style="'),this._skinObj.simpleHTML&&t!="block"&&e.write("padding-bottom: 7px;display:inline-block;"),s&&aria.core.Browser.isIE&&e.write("line-height:"+(s-2)+"px;"),e.write('vertical-align:middle;"><label style="display:'+t),n&&e.write(";margin-"+n+":"+this._labelPadding+"px"),r.labelWidth>-1&&
e.write(";width:"+r.labelWidth+"px"),o&&e.write(";color:"+o),e.write(";text-align:"+r.labelAlign+';">'),e.write(aria.utils.String.escapeHTML(r.label)),e.write("</label></span>")},_initInputMarkup:function(e){this._initializeFocusableElement();var t=this._getFocusableElement();this._label=null;var n=this.getDom().getElementsByTagName("label");n.length>0&&(this._label=n[0],n=null)},_initializeFocusableElement:function(){this._focusableElement=this.getDom()},_getFocusableElement:function(){return this._focusableElement||
this._initializeFocusableElement(),this._focusableElement},_onBoundPropertyChange:function(e,t,n){if(e==="value")this._cfg.value=t,this._setState(),this._updateDomForState();else if(e==="disabled"){this._cfg.disabled=t;var r=this.getDom(),i=this.getProperty("disabled")||this.getProperty("readOnly"),s=i?-1:this._calculateTabIndex();r.tabIndex=s,this._setState(),this._updateDomForState(),this._initInputMarkup()}else this.$Input._onBoundPropertyChange.apply(this,arguments)},_getIconName:function(e){var t=this._cfg
;return t._iconSet+":"+t._iconPrefix+e},_setState:function(){var e=this._cfg;this._state=this._hasFocus?"focused":"normal",e.disabled&&(this._state="disabled"),this._isChecked()&&(this._state+="Selected")},_updateDomForState:function(){var e=this._state;this._icon&&this._icon.changeIcon(this._getIconName(e));var t=this.getDom().getElementsByTagName("input")[0];if(t!=null){var n=this._isChecked();t.checked=n,t.value=n?"true":"false",t.disabled=this.getProperty("disabled")}this._label!=null&&(this._label.style
.color=this._skinObj.states[e].color)},_setInputType:function(){this._cfg._inputType="checkbox"},_setSkinObj:function(e){this._skinObj=aria.widgets.AriaSkinInterface.getSkinObject(e,this._cfg.sclass)},_setIconPrefix:function(){this._cfg._iconSet=this._skinObj.iconset,this._cfg._iconPrefix=this._skinObj.iconprefix},_focus:function(){try{this._getFocusableElement().focus()}catch(e){}},_toggleValue:function(){var e=!this.getProperty("value");this._cfg.value=e,this.setProperty("value",e);if(this._cfg){this._setState
(),this._updateDomForState();var t=this._cfg.onchange;t&&this.evalCallback(t)}},_dom_onclick:function(e){e.preventDefault(!0)},_dom_onmouseout:function(e){this._mousePressed=!1},_dom_onmousedown:function(e){this._mousePressed=!0,this._hasFocus||this._focus(),e.preventDefault(!0)},_dom_onmouseup:function(e){this._mousePressed&&(this._mousePressed=!1,this._toggleValue(),this._hasFocus||this._focus())},_dom_onfocus:function(e){this._hasFocus=!0,this._setState(),this._updateDomForState()},_dom_onblur:function(e)
{this._hasFocus=!1,this._setState(),this._updateDomForState()},_dom_onkeydown:function(e){e.keyCode==aria.DomEvent.KC_SPACE&&(this._toggleValue(),e.preventDefault(!0))}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/CheckBoxStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.CheckBoxStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="CheckBox"/}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/DatePicker.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.DatePicker",$extends:"aria.widgets.form.DropDownTextInput",$dependencies:["aria.widgets.calendar.Calendar","aria.widgets.controllers.DatePickerController"],$css:["aria.widgets.form.DatePickerStyle","aria.widgets.calendar.CalendarStyle","aria.widgets.container.DivStyle"],$constructor:function(e,t,n){this._skinnableClass||(this._skinnableClass="DatePicker");var r=new aria.widgets.controllers.DatePickerController;this.$DropDownTextInput.constructor.call(this,e
,t,n,r),r.setPattern(e.pattern),r.setInputPattern(e.inputPattern),e.minValue&&r.setMinValue(new Date(e.minValue)),e.maxValue&&r.setMaxValue(new Date(e.maxValue)),e.referenceDate&&r.setReferenceDate(new Date(e.referenceDate)),this._dropDownIconFocus=!1},$destructor:function(){this._dropDownIcon=null,this.$DropDownTextInput.$destructor.call(this)},$prototype:{_frame_events:function(e){e.name==="iconFocus"&&e.iconName=="dropdown"&&!this._cfg.disabled&&(this._dropDownIconFocus=!0),e.name==="iconBlur"&&e.iconName=="dropdown"&&!
this._cfg.disabled&&(this._dropDownIconFocus=!1),this.$DropDownTextInput._frame_events.call(this,e)},_clickOnDate:function(e){var t=e.date;this._closeDropdown();var n=this.controller.checkValue(t);this._reactToControllerReport(n)},_initInputMarkup:function(){this.$DropDownTextInput._initInputMarkup.apply(this,arguments);var e=null;this._frame.getIcon&&(e=this._frame.getIcon("dropdown")),this.$assert(54,e),this._dropDownIcon=e},setCaretPosition:function(e,t){if(!this._dropDownIconFocus)return this.$DropDownTextInput
.setCaretPosition.apply(this,arguments);this._currentCaretPosition={start:e,end:t}},getCaretPosition:function(){if(this._dropDownIconFocus){var e=this._currentCaretPosition;return e?e:{start:0,end:0}}return this.$DropDownTextInput.getCaretPosition.apply(this,arguments)},focus:function(){this._dropdownPopup?(this._hasFocus&&!this._dropDownIconFocus&&(this._keepFocus=!0),this._dropDownIconFocus||this._dropDownIcon.focus()):(this._hasFocus&&this._dropDownIconFocus&&(this._keepFocus=!0),this.$DropDownTextInput.focus
.call(this))},_dom_onclick:function(){this.$DropDownTextInput._dom_onclick.call(this),this._dropDownIconFocus||this._closeDropdown()},_applyCalendarCfg:function(e,t){var n=this._cfg,r=this._skinObj,i="calendar"+e.substring(0,1).toUpperCase()+e.substring(1);t[e]=typeof n[i]!="undefined"?n[i]:r.calendar[e]},_renderDropdownContent:function(e){var t=this._cfg,n=this._skinObj,r=t.popupWidth&&t.popupWidth>-1&&aria.core.Browser.isIE6;r&&e.write('<div style="width: '+t.popupWidth+'px;">');var i=this.controller.getDataModel
(),s={block:!0,startDate:i.jsDate,tabIndex:-1,label:t.calendarLabel,defaultTemplate:t.calendarTemplate,minValue:t.minValue,maxValue:t.maxValue,onclick:{fn:this._clickOnDate,scope:this},bind:{value:{to:"calendarValue",inside:i}}},o=["displayUnit","numberOfUnits","firstDayOfWeek","monthLabelFormat","dayOfWeekLabelFormat","dateLabelFormat","completeDateLabelFormat","showWeekNumbers","showShortcuts","restrainedNavigation","sclass"];for(var u=0,a;a=o[u];u++)this._applyCalendarCfg(a,s);var f=new aria.widgets.calendar
.Calendar(s,this._context,this._lineNumber);f.$on({widgetContentReady:this._refreshPopup,scope:this}),this.controller.setCalendar(f),e.registerBehavior(f),f.writeMarkup(e),r&&e.write("</div>")},_closeDropdown:function(){this._dropdownPopup&&(this.$DropDownTextInput._closeDropdown.call(this),this.focus())},_refreshPopup:function(){this._dropdownPopup&&this._dropdownPopup.refresh()},_afterDropdownClose:function(){this.$DropDownTextInput._afterDropdownClose.call(this),this.controller.setCalendar(null)},_onBoundPropertyChange
:function(e,t,n){e==="referenceDate"?this.controller.setReferenceDate(t):this.$DropDownTextInput._onBoundPropertyChange.call(this,e,t,n)}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/DatePickerStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.DatePickerStyle",
    $extends : "aria.widgets.form.TextInputStyle"
}}
    {var skinnableClassName="DatePicker"/}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/DropDownInput.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.DropDownInput",$extends:"aria.widgets.form.InputWithFrame",$dependencies:["aria.widgets.form.DropDownTrait"],$constructor:function(){this.$InputWithFrame.constructor.apply(this,arguments),this.controller=null},$destructor:function(){this._closeDropdown(),this.controller&&(this.controller.$dispose(),this.controller=null),this.$InputWithFrame.$destructor.call(this)},$prototype:{$init:function(e){var t=aria.widgets.form.DropDownTrait.prototype;for(var n in t)t
.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])},_handleKey:function(e){var t=this.controller;if(t&&!e.ctrlKey&&!e.altKey){var n=t.checkKeyStroke(e.charCode,e.keyCode);n&&n.cancelKeyStroke&&e.preventDefault&&e.preventDefault(!0),this._reactToControllerReport(n)}},_toggleDropdown:function(){var e=this.controller;if(e){var t=e.toggleDropdown();this._reactToControllerReport(t)}}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/DropDownListTrait.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.DropDownListTrait",$dependencies:["aria.widgets.form.list.List"],$constructor:function(){this.$assert(11,!1)},$statics:{MAX_HEIGHT:210,MIN_HEIGHT:50},$prototype:{_clickOnItem:function(e){this._closeDropdown();var t=this.controller.checkValue(e.value);this._reactToControllerReport(t)},_handleKey:function(e){this._ignoreMouseOverItemCallback&&aria.core.Timer.cancelCallback(this._ignoreMouseOverItemCallback),this._ignoreMouseOverItemCallback=aria.core.Timer.addCallback
({fn:this._enableMouseOverItem,scope:this,delay:100});var t=this.$DropDownTextInput||this.$DropDownInput;t._handleKey.call(this,e)},_enableMouseOverItem:function(){this._ignoreMouseOverItemCallback=null},_mouseOverItem:function(e){if(!this._ignoreMouseOverItemCallback){var t=this.controller.getDataModel();aria.utils.Json.setValue(t,"selectedIdx",e.index)}},_keyPressed:function(e){return this._hasFocus?!1:(this.focus(null,!0),this._handleKey({charCode:e.charCode,keyCode:e.keyCode}),!0)},_renderDropdownContent
:function(e,t){t=t||{};var n=this._cfg,r=this.controller.getDataModel(),i=this._domElt.lastChild,s=aria.utils.Dom,o=s.getGeometry(i);if(o===null)return;s.scrollIntoView(i);var u=o.y,a=aria.utils.Dom._getViewportSize(),f=a.height-u-o.height,l=u>f?u:f,c=t.maxHeight||this.MAX_HEIGHT;l=l<this.MIN_HEIGHT?this.MIN_HEIGHT:l,l=l>c?c:l-2;var h=new aria.widgets.form.list.List({id:n.id,defaultTemplate:"defaultTemplate"in t?t.defaultTemplate:n.listTemplate,block:!0,sclass:n.listSclass||this._skinObj.listSclass,onclick:{
fn:this._clickOnItem,scope:this},onmouseover:{fn:this._mouseOverItem,scope:this},onkeyevent:{fn:this._keyPressed,scope:this},onclose:{fn:this._closeDropdown,scope:this},maxHeight:l,minWidth:"minWidth"in t?t.minWidth:this._inputMarkupWidth+15,width:this.__computeListWidth(n.popupWidth,this._inputMarkupWidth+15),preselect:n.preselect,bind:{items:{to:"listContent",inside:r},selectedIndex:{to:"selectedIdx",inside:r}},scrollBarX:!1},this._context,this._lineNumber);h.$on({widgetContentReady:this._refreshPopup,scope
:this}),e.registerBehavior(h),h.writeMarkup(e),this.controller.setListWidget(h)},_afterDropdownClose:function(){this.controller.setListWidget(null),this.$DropDownTrait._afterDropdownClose.call(this)},__computeListWidth:function(e,t){return e<0?null:aria.core.Browser.isIE6?e:e>t?e:t}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/DropDownTextInput.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.DropDownTextInput",$extends:"aria.widgets.form.TextInput",$dependencies:["aria.widgets.form.DropDownTrait"],$constructor:function(e,t,n,r){this._skinnableClass||(this._skinnableClass="DropDownInput"),this.$TextInput.constructor.call(this,e,t,n,r)},$destructor:function(){this._closeDropdown(),this.$TextInput.$destructor.call(this)},$prototype:{$init:function(e){var t=aria.widgets.form.DropDownTrait.prototype;for(var n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty
(n)&&(e[n]=t[n])},_toggleDropdown:function(){this._hasFocus||this.focus(null,!0);var e=this.controller.toggleDropdown(this.getTextInputField().value,this._dropdownPopup!=null);this._reactToControllerReport(e,{hasFocus:!0}),this.focus(null,!0)},_handleKey:function(e){this.controller&&(!e.ctrlKey&&!e.altKey?this._checkKeyStroke(e):aria.core.Timer.addCallback({fn:this._checkKeyStroke,scope:this,args:e,delay:4}))},_checkKeyStroke:function(e){var t=this.controller,n=this.getCaretPosition();if(n){var r=t.checkKeyStroke
(e.charCode,e.keyCode,this.getTextInputField().value,n.start,n.end);r&&r.cancelKeyStroke&&e.preventDefault&&e.preventDefault(!0),this._reactToControllerReport(r,{hasFocus:!0})}},_dom_onkeydown:function(e){this.$DropDownTrait._dom_onkeydown.call(this,e),e.hasStopPropagation||this.$TextInput._dom_onkeydown.call(this,e)},_dom_onkeyup:function(e){var t=aria.core.Browser;t.isAndroid&&t.isChrome&&!e.isSpecialKey&&e.keyCode==229&&(e.charCode=0,this._handleKey(e)),this.$TextInput._dom_onkeydown.call(this,e)},_reactToControllerReport
:function(e,t){if(e){var n=e.displayDropDown,r=e.repositionDropDown;this.$TextInput._reactToControllerReport.call(this,e,t),this._cfg&&(n===!0&&!this._dropdownPopup?this._openDropdown():n===!1&&this._dropdownPopup?this._closeDropdown():r&&this._dropdownPopup&&(this._closeDropdown(),this._openDropdown()))}}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/DropDownTrait.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.DropDownTrait",$dependencies:["aria.popups.Popup"],$constructor:function(){this.$assert(14,!1)},$prototype:{_openDropdown:function(){if(this._dropdownPopup)return;if(this._cfg.disabled||this._cfg.readOnly)return;var e=this._context.createSection({fn:this._renderDropdownContent,scope:this}),t=new aria.popups.Popup;this._dropdownPopup=t;var n={onAfterOpen:this._afterDropdownOpen,onAfterClose:this._afterDropdownClose,scope:this};this._beforeDropdownClose&&(n.onBeforeClose=
this._beforeDropdownClose),t.$on(n),aria.templates.Layout.$on({viewportResized:this._onViewportResized,scope:this}),t.open({section:e,domReference:this._getInputMarkupDomElt(),preferredPositions:[{reference:"bottom left",popup:"top left"},{reference:"top left",popup:"bottom left"}],offset:{top:this._skinObj.offsetTop},closeOnMouseClick:!0,closeOnMouseScroll:!0,ignoreClicksOn:this._getPopupIgnoreClicksOnDomElts(),preferredWidth:this._getPopupWidth()})},_onViewportResized:function(e){this._closeDropdown(),this
._openDropdown()},_frame_events:function(e){e.name=="iconMouseDown"&&e.iconName=="dropdown"&&!this._cfg.disabled?this._hasFocus&&(this._keepFocus=!0):e.name=="iconClick"&&e.iconName=="dropdown"&&!this._cfg.disabled&&this._toggleDropdown()},_toggleDropdown:function(){},_getPopupIgnoreClicksOnDomElts:function(){return this._frame&&this._frame.getIcon?[this._frame.getIcon("dropdown")]:null},_afterDropdownOpen:function(){this._keepFocus=!0,this.focus(null,!0)},_afterDropdownClose:function(){this._dropdownPopup.$dispose
(),this._dropdownPopup=null,aria.templates.Layout.$unregisterListeners(this),this.focus(null,!0),this._keepFocus=!1},_closeDropdown:function(){if(!this._dropdownPopup)return;this._dropdownPopup.close()},_renderDropdownContent:function(e){},_refreshPopup:function(){this._dropdownPopup.refresh()},_handleKey:function(e){},_dom_onkeydown:function(e){var t=this._cfg;e.isSpecialKey&&this._handleKey(e)},_dom_onkeypress:function(e){var t=this._cfg;e.isSpecialKey||this._handleKey(e)},_getPopupWidth:function(){return this
._cfg.popupWidth||-1}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/GaugeStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.GaugeStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="Gauge"/}
    
    {macro writeSkinClass(info)}
        .xGAUGE_progress_${info.skinClassName}{
            {call background("transparent",info.skinClass.spriteUrl,"repeat-x")/}    
        }
    {/macro}
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/Input.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.Input",$extends:"aria.widgets.Widget",$dependencies:["aria.utils.Dom","aria.widgets.form.InputValidationHandler","aria.utils.Data","aria.utils.String","aria.widgets.environment.WidgetSettings","aria.core.Browser"],$constructor:function(e,t){this._setAutomaticBindings(e),this.$Widget.constructor.apply(this,arguments),this._minInputMarkupWidth=5,this._defaultInputMarkupWidth=-1,this._labelPadding=2,this._maxInputMarkupWidth=-1,this._inputMarkupWidth=-1,this._label=
null,this._inputMarkupHeight=-1,this._isIE7OrLess=aria.core.Browser.isIE&&aria.core.Browser.majorVersion<8},$destructor:function(){this._onValidatePopup&&(this._onValidatePopup.$dispose(),this._onValidatePopup=null),this._label=null,this.$Widget.$destructor.call(this)},$statics:{WIDGET_INPUT_NO_LABEL:"%1Label HTML Element was not found.",WIDGET_INPUT_TOO_MANY_LABELS:"%1More than one label HTML Element has been found."},$prototype:{$init:function(e,t,n){e.automaticallyBindedProperties=["formatError","formatErrorMessages"
,"error","errorMessages","requireFocus"]},_init:function(){var e=this._getInputMarkupDomElt();e&&this._initInputMarkup(e);var t=this._getInputLabelMarkupDomElt();t&&this._initLabelMarkup(t)},_initInputMarkup:function(e){},_initLabelMarkup:function(e){this._label=e},_widgetMarkup:function(e){var t=this._cfg,n=!t.hideLabel&&!!t.label;this._isIE7OrLess&&e.write('<span style="display: inline-block;">'),n?t.labelPos==="left"?(this._inputLabelMarkup(e,"inline-block","right"),this._inputMarkup(e)):t.labelPos==="top"?
(this._inputLabelMarkup(e,"block",!1),this._inputMarkup(e)):t.labelPos==="bottom"?(this._inputMarkup(e),this._inputLabelMarkup(e,"block",!1)):(this._inputMarkup(e),this._inputLabelMarkup(e,"inline-block","left")):this._inputMarkup(e),this._isIE7OrLess&&e.write("</span>")},_getInputMarkupDomElt:function(){var e=this._cfg,t=!e.hideLabel&&!!e.label,n;t?e.labelPos==="right"||e.labelPos==="bottom"?n=0:n=1:n=0;var r=this.getDom();return this._isIE7OrLess&&(r=r?r.firstChild:null),aria.utils.Dom.getDomElementChild(r
,n)},_getInputLabelMarkupDomElt:function(){var e=this._cfg,t=!e.hideLabel&&!!e.label;if(t){var n=this.getDom();this._isIE7OrLess&&(n=n?n.firstChild:null);var r=aria.utils.Dom.getDomElementsChildByTagName(n,"label");if(r)if(r.length===0)this.$logError(this.WIDGET_INPUT_NO_LABEL,[]);else{if(r.length==1)return r[0];this.$logError(this.WIDGET_INPUT_TOO_MANY_LABELS,[])}}return null},getLabel:function(){return!this._label&&!this._initDone&&this.getDom(),this._label},_inputMarkup:function(e){},_inputLabelMarkup:function(
e,t,n){var r=this._cfg,i='class="x'+this._skinnableClass+"_"+r.sclass+"_"+this._state+'_label"',s=aria.core.Browser.isIE7?"-25%":"middle";e.write("<label "+i+' style="'),aria.widgets.environment.WidgetSettings.getWidgetSettings().middleAlignment?e.write("vertical-align:"+s+";"):e.write("vertical-align:-1px;"),e.write("display:"+t),n&&e.write(";margin-"+n+":"+this._labelPadding+"px"),r.labelWidth>-1&&e.write(";width:"+r.labelWidth+"px"),r.labelHeight>-1&&e.write(";height:"+r.labelHeight+"px"),e.write(";text-align:"+
r.labelAlign+';">'),e.write(aria.utils.String.escapeHTML(r.label)),e.write("</label>")},_checkCfgConsistency:function(){var e=this._cfg,t=e.width,n=e.labelPos==="top"||e.labelPos==="bottom",r=!e.hideLabel&&!!e.label,i;t>-1&&(t<this._minInputMarkupWidth&&(t=this._minInputMarkupWidth),i=e.labelWidth,r&&i>-1?(n?(i<t?i=t:i>t&&(t=i),this._inputMarkupWidth=t):i+this._minInputMarkupWidth>t?(t=i+this._minInputMarkupWidth,this._inputMarkupWidth=this._minInputMarkupWidth):this._inputMarkupWidth=t-i,e.labelWidth=i):this
._inputMarkupWidth=t,e.width=t),this._inputMarkupWidth<0&&(this._inputMarkupWidth=this._defaultInputMarkupWidth),r&&!n&&(this._inputMarkupWidth-=this._labelPadding),e.directOnBlurValidation==null&&(e.directOnBlurValidation=aria.widgets.environment.WidgetSettings.getWidgetSettings().directOnBlurValidation),e.height>-1&&(this._inputMarkupHeight=e.height,r&&n&&(this._inputMarkupHeight-=e.labelHeight)),this.$Widget._checkCfgConsistency.call(this)},_validationPopupShow:function(){this._onValidatePopup||(this._onValidatePopup=new 
aria.widgets.form.InputValidationHandler(this)),this._onValidatePopup.show()},_validationPopupHide:function(){this._onValidatePopup&&this._onValidatePopup.hide()},_onBoundPropertyChange:function(e,t,n){if(e==="requireFocus"){if(!t||!this.focus||this._cfg.disabled)return;var r=this._cfg.bind[e],i=r.inside[r.to];i&&(this.focus(),aria.utils.Json.setValue(r.inside,r.to,!1))}else if(e==="label"){this._cfg[e]=t;var s=this.getLabel();s&&(s.innerHTML=aria.utils.String.escapeHTML(t))}return this.$Widget._onBoundPropertyChange
.apply(this,arguments)},_setAutomaticBindings:function(e){var t,n,r,i=this.automaticallyBindedProperties,s=null;e&&e.bind&&(s=e.bind.value);if(s&&s.inside){t=aria.utils.Data._getMeta(s.inside,s.to,!1),e.bind.error||(e.bind.error={inside:t,to:"error"}),e.bind.errorMessages||(e.bind.errorMessages={inside:t,to:"errorMessages"}),e.bind.formatErrorMessages||(e.bind.formatErrorMessages={inside:t,to:"formatErrorMessages"}),e.bind.requireFocus||(e.bind.requireFocus={inside:t,to:"requireFocus"});if(e.inputMetaData){r="local:"+
e.inputMetaData,n=t[r],n==null&&(n={},t[r]=n);for(var o=0;o<i.length;o++)e.bind[i[o]]||(e.bind[i[o]]={inside:n,to:i[o]})}}}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/InputValidationHandler.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.InputValidationHandler",$dependencies:["aria.DomEvent","aria.utils.Dom","aria.popups.Popup","aria.widgets.container.Div","aria.templates.Layout"],$constructor:function(e){this._context=e._context,this._lineNumber=e._lineNumber,this._textInputField=e.getTextInputField(),this._WidgetCfg=e._cfg,this._validationPopup=null,this._div=null},$destructor:function(){this._closeValidation(),this._context=null,this._textInputField=null,this._WidgetCfg=null,this._validationPopup=
null},$prototype:{_checkErrorMessage:function(e){var t=null;for(var n=0;n<e.length;n++)t===null&&e[n]&&(t=e[n]);return t},_renderValidationContent:function(e){var t;this._WidgetCfg.formatError?t=this._WidgetCfg.formatErrorMessages:this._WidgetCfg.error&&(t=this._WidgetCfg.errorMessages);var n=new aria.widgets.container.Div({sclass:"errortip",width:289,margins:"0 0 0 0"},this._context);e.registerBehavior(n),n.writeMarkupBegin(e),e.write(this._checkErrorMessage(t)),n.writeMarkupEnd(e),this._div=n},_openValidation
:function(){if(this._validationPopup)return;var e=this._context.createSection({fn:this._renderValidationContent,scope:this}),t=new aria.popups.Popup;this._validationPopup=t,this._validationPopup.$on({onAfterClose:this._afterValidationClose,onPositioned:this._onTooltipPositioned,scope:this}),aria.templates.Layout.$on({viewportResized:this._onViewportResized,scope:this}),this._validationPopup.open({section:e,domReference:this._textInputField,preferredPositions:[{reference:"top right",popup:"bottom left",offset
:{left:-30}},{reference:"bottom right",popup:"top left",offset:{left:-30}},{reference:"top left",popup:"bottom right",offset:{right:-30}},{reference:"bottom left",popup:"top right",offset:{right:-30}}],closeOnMouseClick:!0,closeOnMouseScroll:!1})},_afterValidationClose:function(e){this._validationPopup.$dispose(),this._div=null,this._validationPopup=null,aria.templates.Layout.$unregisterListeners(this)},_closeValidation:function(){if(!this._validationPopup)return;this._validationPopup.close()},_onTooltipPositioned
:function(e){var t=e.position;if(t&&t.reference!="top right"){var n=t.reference.replace(" right","Right").replace(" left","Left"),r=this._div,i=r._frame;r.initWidgetDom(),i.checkState(n)&&i.changeState(n)}},_onViewportResized:function(e){this._closeValidation(),this._openValidation()},show:function(){this._openValidation()},hide:function(){this._closeValidation()}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/InputWithFrame.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.InputWithFrame",$extends:"aria.widgets.form.Input",$dependencies:["aria.widgets.frames.FrameWithIcons"],$css:["aria.widgets.IconStyle"],$constructor:function(e,t){this.$Input.constructor.apply(this,arguments),this._skinObj=aria.widgets.AriaSkinInterface.getSkinObject(this._skinnableClass,e.sclass),this._frame=null,this._hideIconNames=null,this._setState()},$destructor:function(){this._frame&&(this._frame.$unregisterListeners(this),this._frame.$dispose(),this
._frame=null),this.$Input.$destructor.call(this)},$prototype:{_frame_events:function(e){},_inputMarkup:function(e){var t=this._cfg;this._frame=aria.widgets.frames.FrameWithIcons.createFrame({sclass:t.sclass,id:this._domId,skinnableClass:this._skinnableClass,width:this._inputMarkupWidth,state:this._state,"oldStuff:cssRoot":"TIN",scrollBarX:!1,scrollBarY:!1,tooltipLabels:[t.iconTooltip],hideIconNames:this._hideIconNames,inlineBlock:!0,height:this._inputMarkupHeight}),this._frame.$on({"*":this._frame_events,scope
:this}),this._frame.writeMarkupBegin(e),this._inputWithFrameMarkup(e),this._frame.writeMarkupEnd(e)},_inputWithFrameMarkup:function(e){},_initInputMarkup:function(e){this._frame.linkToDom(e)},_setState:function(){this._state="normal"},_updateState:function(){this._setState(),!this._selectField&&!this._initDone&&this.getDom(),this._frame.changeState(this._state)}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/MultiSelectStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.MultiSelectStyle",
    $extends : "aria.widgets.form.TextInputStyle"
}}
    {var skinnableClassName="MultiSelect"/}
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/NumberField.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.NumberField",$extends:"aria.widgets.form.TextInput",$dependencies:["aria.widgets.controllers.NumberController"],$constructor:function(e,t,n){var r=new aria.widgets.controllers.NumberController;e.pattern&&r.setPattern(e.pattern),this.$TextInput.constructor.call(this,e,t,n,r)}});
//*******************
//LOGICAL-PATH:aria/widgets/form/RadioButton.js
//*******************
(function(){var e=null;Aria.classDefinition({$classpath:"aria.widgets.form.RadioButton",$extends:"aria.widgets.form.CheckBox",$dependencies:["aria.utils.IdManager","aria.utils.Array"],$css:["aria.widgets.form.RadioButtonStyle"],$constructor:function(t,n){this._skinnableClass||(this._skinnableClass="RadioButton"),this.$CheckBox.constructor.apply(this,arguments),this._skinObj.simpleHTML&&(e||(e=new aria.utils.IdManager("radio")),this._inputName=e.getId()),this._cfg.disabled||this._instances.push(this)},$destructor
:function(){aria.utils.Array.remove(this._instances,this),this._inputName&&(e.releaseId(this._inputName),this._inputName=null),this.$CheckBox.$destructor.call(this)},$onunload:function(){e&&(e.$dispose(),e=null),this._instances=null},$prototype:{_instances:[],_setInputType:function(){this._cfg._inputType="radio"},_isChecked:function(){return this.getProperty("value")===this._cfg.keyValue},_onBoundPropertyChange:function(e,t,n){this.$CheckBox._onBoundPropertyChange.apply(this,arguments)},_dom_onmousedown:function(
e){this._focus()},_dom_onmouseup:function(e){this._setRadioValue(),this._focus()},_dom_onkeydown:function(e){e.keyCode==aria.DomEvent.KC_SPACE?(this._setRadioValue(),e.preventDefault(!0)):e.keyCode==aria.DomEvent.KC_LEFT?this._navigate(-1):e.keyCode==aria.DomEvent.KC_RIGHT?this._navigate(1):e.keyCode==aria.DomEvent.KC_DOWN?this._navigate(1):e.keyCode==aria.DomEvent.KC_UP&&this._navigate(-1)},_navigate:function(e){if(!this._cfg||!this._cfg.bind||!this._cfg.bind.value)return;var t=this._cfg.bind.value,n=aria.utils
.Array.indexOf(this._instances,this),r=this._instances.length,i,s,o;while(n>0||n<r){n+=e;if(n<0||n>=r)break;s=this._instances[n],i=s._cfg.bind;if(i){o=i.value;if(o&&t.inside===o.inside&&t.to===o.to){s._setRadioValue(),s._focus();break}}}},_setRadioValue:function(){var e=this._cfg.keyValue;this._cfg.value=e,this.setProperty("value",e),this._setState(),this._updateDomForState(),this._cfg.onchange&&this.evalCallback(this._cfg.onchange)}}})})();
//*******************
//LOGICAL-PATH:aria/widgets/form/RadioButtonStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.RadioButtonStyle",
    $extends : "aria.widgets.form.CheckBoxStyle"
}}
    {var skinnableClassName="RadioButton"/}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/Select.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.Select",$extends:"aria.widgets.form.DropDownInput",$dependencies:["aria.widgets.form.DropDownListTrait","aria.utils.String","aria.widgets.controllers.SelectController","aria.utils.Dom"],$css:["aria.widgets.form.SelectStyle","aria.widgets.form.list.ListStyle","aria.widgets.container.DivStyle"],$constructor:function(e,t,n){this._skinnableClass||(this._skinnableClass="Select"),this.$DropDownInput.constructor.call(this,e,t,n);var r=this._skinObj;if(!r.simpleHTML
){var i=new aria.widgets.controllers.SelectController;this.controller=i,i.setListOptions(e.options)}else r.iconsRight=[];this._minInputMarkupWidth=8,this._defaultInputMarkupWidth=170,this._customTabIndexProvided=!0,this._selectField=null},$destructor:function(){this.$DropDownInput.$destructor.call(this),this._skinnableClass=null,this._selectField=null},$statics:{WIDGET_OPTIONS_INVALID_VALUE:"%1Bound value stored in the data model is not a valid option value for the select widget."},$prototype:{$init:function(
e){var t=aria.widgets.form.DropDownListTrait.prototype;for(var n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])},_checkCfgConsistency:function(){this.$DropDownInput._checkCfgConsistency.call(this),this._checkValue()},focus:function(){var e=this.getSelectField();e.focus()},_reactToControllerReport:function(e,t){if(e){var n=e.text,r=e.value,i=t?t.stopValueProp:!1;if(n!=null){var s=this.getSelectField();s.innerHTML=aria.utils.String.escapeHTML(n)+"&nbsp;"}var o=e.displayDropDown;typeof r!="undefined"&&
i!==!0&&this._updateValue(!0),this._cfg&&(o===!0&&!this._dropdownPopup?this._openDropdown():o===!1&&this._dropdownPopup&&this._closeDropdown()),e.$dispose()}},_checkValue:function(){if(!this._cfg.options.length)return;if(typeof this._cfg.value!="undefined"){for(var e=0;e<this._cfg.options.length;e++)if(this._cfg.options[e].value===this._cfg.value)return;this.$logError(this.WIDGET_OPTIONS_INVALID_VALUE)}else this.setProperty("value",this._cfg.options[0].value)},_setState:function(){if(this._cfg.disabled)this.
_state="disabled";else if(this._cfg.readOnly)this._state="readOnly";else{var e;this._cfg.mandatory?e="mandatory":e="normal";if(this._cfg.formatError||this._cfg.error)e+="Error";if(this._hasFocus||this._keepFocus)e+="Focused";this._state=e}},_dom_onblur:function(){this._hasFocus=!1,this._updateState();if(this._cfg.formatError&&this._cfg.validationEvent==="onBlur")this._validationPopupShow();else{this._validationPopupHide();if(this._cfg.directOnBlurValidation){if(this._cfg.bind){var e=this._cfg.bind.value;if(e
){var t=e.inside,n=e.to,r=this._cfg.validationGroups;aria.utils.Data.validateValue(t,n,null,r,"onblur")}}this._onvalidate({popup:!1})}}this._updateValue(!0)},_dom_onfocus:function(){this._hasFocus=!0,this._cfg&&this._cfg.validationEvent==="onFocus"&&(this._cfg.formatError&&this._cfg.formatErrorMessages.length||this._cfg.error&&this._cfg.errorMessages.length)&&this._validationPopupShow(),this._updateState()},_onvalidate:function(e){this._cfg.onvalidate&&this.$logWarn(this.WIDGET_PROPERTY_DEPRECATION,["onvalidate"
]),this.evalCallback(this._cfg.onvalidate),e.popup&&this._cfg.error?this._validationPopupShow():this._validationPopupHide()},_dom_onmousedown:function(e){var t=e.target,n=this._getInputMarkupDomElt();this.controller&&aria.utils.Dom.isAncestor(t,n)&&(this._toggleDropdown(),e.preventDefault())},_dom_onclick:function(){this._updateValue(!1)},_dom_onchange:function(){this._updateValue(!1)},_dom_onkeypress:function(e){var t=aria.DomEvent;e.keyCode===t.KC_ENTER&&this._updateValue(!1),this.$DropDownInput._dom_onkeypress
.call(this,e)},_getPopupIgnoreClicksOnDomElts:function(){var e=this.$DropDownInput._getPopupIgnoreClicksOnDomElts.call(this);return e.push(this._getInputMarkupDomElt()),e},_updateValue:function(e){var t=null;if(this._skinObj.simpleHTML)t=this.setProperty("value",this.getSelectField().value);else if(e){var n=this.controller,r=n.getDataModel();t=this.setProperty("value",r.value)}this._cfg&&t!=null&&(this.changeProperty("error",!1),(!this._cfg.formatError||!this._cfg.formatErrorMessages.length||this._cfg.error&&
this._cfg.errorMessages.length)&&this._validationPopupHide(),this._cfg.onchange&&this.evalCallback(this._cfg.onchange))},_initInputMarkup:function(e){this.$InputWithFrame._initInputMarkup.call(this,e),this._selectField=this._frame.getChild(0)},_inputWithFrameMarkup:function(e){var t=this._cfg,n=this._frame.innerWidth,r=t.disabled||t.readOnly,i=r?"":' tabindex="'+this._calculateTabIndex()+'"';if(this._skinObj.simpleHTML){var s=aria.utils.String,o=t.options,u=t.value,a=["<select",Aria.testMode?' id="'+this._domId+'_input"'
:"",n>0?' style="width: '+n+'px;" ':"",i,r?' disabled="disabled"':"",' _ariaInput="1">'];for(var f=0,l=o.length;f<l;f++){var c=""+o[f].value;a.push('<option value="',s.encodeForQuotedHTMLAttribute(c),'"',c==u?' selected="selected"':"",">",s.escapeHTML(o[f].label),"</option>")}a.push("</select>"),e.write(a.join(""))}else{var h=this.controller.checkValue(t.value),p=h.text;h.$dispose(),e.write(["<span",Aria.testMode?' id="'+this._domId+'_input"':"",' class="xSelect" style="',n>0?"width:"+n+"px;":"",'"',i,' _ariaInput="1">'
,aria.utils.String.escapeHTML(p),"&nbsp;</span>"].join(""))}},_onBoundPropertyChange:function(e,t,n){if(e==="value"){this._checkValue();if(this.controller){var r=this.controller.checkValue(t);this._reactToControllerReport(r,{stopValueProp:!0})}else{var i=this.getSelectField();for(var s=0;s<i.options.length;s++)if(i.options[s].value===t){i.options[s].selected=!0;break}}}else if(e==="mandatory")this._updateState();else if(e==="readOnly"||e==="disabled"){var i=this.getSelectField(),o=this.getProperty("disabled"
)||this.getProperty("readOnly");this._skinObj.simpleHTML&&(i.disabled=o?"disabled":"");var u=o?-1:this._calculateTabIndex();i.tabIndex=u,this._updateState()}else if(e==="options")if(this.controller){this.controller.setListOptions(t);var r=this.controller.checkValue(null);this._reactToControllerReport(r,{stopValueProp:!0})}else{var a=[],f=aria.utils.String;for(var s=0,l=t.length;s<l;s++){var c=""+t[s].value;a.push('<option value="',f.encodeForQuotedHTMLAttribute(c),'">',f.escapeHTML(t[s].label),"</option>")}var i=
this.getSelectField(),h=a.join("");if(aria.core.Browser.isIE9||aria.core.Browser.isIE8||aria.core.Browser.isIE7){i.innerHTML="";var p=Aria.$window.document.createElement("div");p.innerHTML="<select>"+h+"</select>";for(var d=0,v=p.children[0].children;d<v.length;d++)i.appendChild(v[d])}else i.innerHTML=h}else e==="formatError"||e==="formatErrorMessages"||e==="error"||e==="errorMessages"?(this._cfg[e]=t,this._updateState()):this.$DropDownInput._onBoundPropertyChange.apply(this,arguments)},getSelectField:function(
){return!this._selectField&&!this._initDone&&this.getDom(),this._selectField},getTextInputField:function(){return this.getSelectField()}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/SelectBox.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.SelectBox",$extends:"aria.widgets.form.DropDownTextInput",$dependencies:["aria.widgets.form.DropDownListTrait","aria.widgets.controllers.SelectBoxController"],$css:["aria.widgets.form.SelectBoxStyle","aria.widgets.form.list.ListStyle","aria.widgets.container.DivStyle"],$statics:{DUPLICATE_VALUE:"%1 - Duplicate values %2 found in options"},$constructor:function(e,t,n){this._skinnableClass||(this._skinnableClass="SelectBox");var r=new aria.widgets.controllers
.SelectBoxController;this.$DropDownTextInput.constructor.call(this,e,t,n,r),this.controller.setListOptions(this._cfg.options)},$destructor:function(){this.$DropDownTextInput.$destructor.call(this)},$prototype:{$init:function(e){var t=aria.widgets.form.DropDownListTrait.prototype;for(var n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])},_checkCfgConsistency:function(){this.$DropDownTextInput._checkCfgConsistency.call(this);var e=this._cfg.options,t=[],n=[],r={};for(var i=0;i<e.length;i++)r[e[i].value
]?n.push(e[i].value):(r[e[i].value]=!0,t.push(e[i]));n.length>0&&(this.controller.setListOptions(t),this.$logError(this.DUPLICATE_VALUE,[n]))},_onBoundPropertyChange:function(e,t,n){if(e==="options"){this.controller.setListOptions(t);var r=this.controller.checkValue(null);this._reactToControllerReport(r,{stopValueProp:!0})}else aria.widgets.form.SelectBox.superclass._onBoundPropertyChange.call(this,e,t,n)}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/SelectBoxStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.SelectBoxStyle",
    $extends : "aria.widgets.form.TextInputStyle"
}}
    {var skinnableClassName="SelectBox"/}
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/SelectStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.SelectStyle",
    $extends : "aria.widgets.WidgetStyle",
    $dependencies: ["aria.widgets.AriaSkinInterface"]
}}
    {var skinnableClassName="Select"/}
    {var useFrame=true/}
    
    {macro main()}
        {var general=aria.widgets.AriaSkinInterface.getGeneral()/}
        .xSelect {
        {if general.font.size}
            font-size: ${general.font.size}px;
        {/if}
        {if general.font.family}
            font-family: ${general.font.family};
        {/if}
            display:inline-block;
            white-space:nowrap;
            overflow:hidden;
        }
        {call startLooping()/}
    {/macro}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/Textarea.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.Textarea",$extends:"aria.widgets.form.TextInput",$dependencies:["aria.widgets.controllers.TextDataController"],$css:["aria.widgets.form.TextareaStyle"],$statics:{LABEL_HEIGHT:13},$constructor:function(e,t,n){this._skinnableClass||(this._skinnableClass="Textarea");var r=new aria.widgets.controllers.TextDataController;this.$TextInput.constructor.call(this,e,t,n,r),this._isTextarea=!0,e.labelHeight=e.labelHeight>-1?e.labelHeight:this.LABEL_HEIGHT},$prototype:{
}});
//*******************
//LOGICAL-PATH:aria/widgets/form/TextareaStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.TextareaStyle",
    $extends : "aria.widgets.form.TextInputStyle"
}}
    {var skinnableClassName="Textarea"/}
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/TextField.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.TextField",$extends:"aria.widgets.form.TextInput",$dependencies:["aria.widgets.controllers.TextDataController"],$constructor:function(e,t,n){var r=new aria.widgets.controllers.TextDataController;this.$TextInput.constructor.call(this,e,t,n,r)},$prototype:{_isPropertyEquals:function(e,t){var n=this.getProperty(e)||"";return n===(t||"")}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/TextInput.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.TextInput",$extends:"aria.widgets.form.InputWithFrame",$dependencies:["aria.utils.Function","aria.utils.Data","aria.utils.String","aria.widgets.environment.WidgetSettings","aria.utils.Caret"],$css:["aria.widgets.form.TextInputStyle"],$constructor:function(e,t,n,r){this._skinnableClass||(this._skinnableClass="TextInput"),this.$InputWithFrame.constructor.apply(this,arguments),this._minInputMarkupWidth=8,this._defaultInputMarkupWidth=170,this._isPassword=!1,this
._isTextarea=!1,this._valTimer=null,this._keepFocus=!1,this._currentCaretPosition=null,this.controller=r,r&&r.$on({onCheck:this._reactToControllerReportEvent,scope:this}),this._textInputField=null,this._hasFocus=!1,this._customTabIndexProvided=!0,this._isPrefilled=!1,this._simpleHTML=this._skinObj.simpleHTML,this._firstFocus=!0},$destructor:function(){this._textInputField=null,this.controller&&(this.controller.$dispose(),this.controller=null),this.$InputWithFrame.$destructor.call(this)},$statics:{WIDGET_VALUE_IS_WRONG_TYPE
:"%1Value %2 is of incorrect type."},$prototype:{$init:function(e,t,n){e.automaticallyBindedProperties=e.automaticallyBindedProperties.concat("prefillError")},_getTextFieldColor:function(){if(this._simpleHTML)return this._skinObj.states[this._state].color;if(this._isIE7OrLess){var e=this._skinObj.states[this._state];return e.color||e.frame.color}return"inherit"},_getText:function(){var e=this._cfg,t=e.invalidText||"";t&&e.value&&(this.setProperty("invalidText",null),t="");var n=this.checkValue({text:t,value:
e.value,performCheckOnly:!0});if(n.report){var r=n.report;!t&&r.text!=null&&(t=""+r.text),r.$dispose()}return t||(t=this._getPrefilledText(e.prefill)),t},_setText:function(e){e==null&&(e=this._getText()),!e&&!this._isPassword?(this.getTextInputField().value="",this.setHelpText(!0)):e&&(this.setHelpText(!1),this.getTextInputField().value=e)},_getPrefilledText:function(e){return e&&this.controller&&this.controller.getDisplayTextFromValue?this.controller.getDisplayTextFromValue(this._cfg.prefill):e},_inputWithFrameMarkup
:function(e){var t=this._cfg,n=this._skinObj,r=this._helpTextSet,i=this._skinObj.helpText,s=this._getTextFieldColor(),o=aria.utils.String,u=["padding:",n.innerPaddingTop,"px ",n.innerPaddingRight,"px ",n.innerPaddingBottom,"px ",n.innerPaddingLeft,"px;position:relative;margin:0;"];this._simpleHTML||u.push("background-color:transparent;border-width:0px;vertical-align:top;");var a=this._getText();r&&(this._isIE7OrLess&&this._isPassword?(this._helpTextSet=r=!1,t.helptext=null):s=i.color+(i.italics?";font-style:italic"
:""));var f=this._isPassword&&!r?"password":"text",l=this._frame.innerWidth-n.innerPaddingLeft-n.innerPaddingRight;l<0&&(l=0);var c="";t.spellCheck!=null&&(c=' spellcheck="'+(t.spellCheck?"true":"false")+'"'),this._isTextarea?e.write(["<textarea",Aria.testMode?' id="'+this._domId+'_textarea"':"",t.disabled?' disabled="disabled"':t.readOnly?' readonly="readonly"':"",' type="',f,'" style="',u.join(""),"color:",s,";overflow:auto;resize:none;height: "+this._frame.innerHeight+"px; width:",l,'px;"','value=""',t.maxlength>-1?'maxlength="'+
t.maxlength+'" ':" ",t.tabIndex!=null?'tabindex="'+this._calculateTabIndex()+'" ':" ",c,">",o.encodeForQuotedHTMLAttribute(this._helpTextSet?t.helptext:a),"</textarea>"].join("")):e.write(['<input class="xTextInputInput" ',Aria.testMode?' id="'+this._domId+'_input"':"",t.disabled?' disabled="disabled"':t.readOnly?' readonly="readonly"':"",' type="',f,'" style="',u.join(""),"color:",s,";width:",l,'px;"','value="',o.encodeForQuotedHTMLAttribute(this._helpTextSet?t.helptext:a),'" ',t.maxlength>-1?'maxlength="'+
t.maxlength+'" ':" ",t.tabIndex!=null?'tabindex="'+this._calculateTabIndex()+'" ':" ",c,' _ariaInput="1"/>'].join(""))},_initInputMarkup:function(e){this.$InputWithFrame._initInputMarkup.call(this,e),this._textInputField=this._frame.getChild(0),this._reactToChange()},getTextInputField:function(){return!this._textInputField&&!this._initDone&&this.getDom(),this._textInputField},checkValue:function(e){var t=this.getTextInputField(),n=t?t.value:"",r=null,i=!1;e&&(n=e.text!=null?e.text:n,r=e.value,i=e.performCheckOnly
),!i&&this._cfg.directOnBlurValidation&&this.changeProperty("formatError",!1);var s={isValid:!0,report:null};if(!this.controller)return s;var o=this._cfg.formatErrorMessages.length?!0:!1,u;r!=null?u=this.controller.checkValue(r):u=this.controller.checkText(n,o);if(!u)return s;u.errorMessages.length?i||(this.changeProperty("value",null),this.changeProperty("invalidText",n),this._cfg.directOnBlurValidation&&this.changeProperty("formatErrorMessages",u.errorMessages)):this._cfg.formatError===!1&&aria.utils.Type.
isArray(this._cfg.formatErrorMessages)&&this._cfg.formatErrorMessages.length?(this.changeProperty("invalidText",null),this.changeProperty("formatErrorMessages",[]),this.setHelpText(!1)):u.ok&&!i&&this.changeProperty("invalidText",null);if(i)return{isValid:u.ok,report:u};this._reactToControllerReport(u,e);return},_reactToControllerReportEvent:function(e){this._keepFocus||this._hasFocus?this._reactToControllerReport(e.report,e.arg):e.report&&e.report.$dispose()},_reactToControllerReport:function(e,t){var n=!1,
r=this._cfg;if(e){var i=!0,s=this._hasFocus,o=!1,u=!1;t&&(i=t.resetErrorIfOK!==!1,t.hasFocus!=null&&(s=t.hasFocus),t.stopValueProp&&(o=t.stopValueProp),t.delayedValidation&&(u=t.delayedValidation));if(!u){var a=e.text,f=e.value;a!=null&&!this._helpTextSet&&(this.getTextInputField().value=a,e.caretPosStart!=null&&e.caretPosEnd!=null&&this.setCaretPosition(e.caretPosStart,e.caretPosEnd)),typeof f!="undefined"&&!o&&!this._isPropertyEquals("value",f)&&(n=this.setProperty("value",f))}this._cfg&&(e.ok?i&&r.directOnBlurValidation&&
this.changeProperty("formatError",!1):e.ok===!1&&(s&&e.matchCorrectValueStart?r.directOnBlurValidation&&this.changeProperty("formatError",!1):r.directOnBlurValidation&&this.changeProperty("formatError",!0),n=this.setProperty("value",undefined))),n&&this._cfg&&(this.changeProperty("error",!1),this.evalCallback(r.onchange)),e.$dispose()}},getCaretPosition:function(){if(!this._hasFocus)return null;var e=this.getTextInputField();return aria.utils.Caret.getPosition(e)},setCaretPosition:function(e,t){if(!this._hasFocus
)return;var n=this.getTextInputField();aria.utils.Caret.setPosition(n,e,t)},_isPropertyEquals:function(e,t){var n=this.getProperty(e);return n===t},_onBoundPropertyChange:function(e,t,n){if(e==="value"){this.setHelpText(!1),this.setPrefillText(!1,null,!0);var r=this._cfg,i="",s=this.checkValue({performCheckOnly:!0,value:t,text:t==null?"":null});if(!s.isValid){this.$logError(this.WIDGET_VALUE_IS_WRONG_TYPE,[t]),s.report.$dispose();return}this._cfg&&s.report&&s.report.text!=null&&(this._cfg.directOnBlurValidation&&
this.changeProperty("formatError",!1),i=s.report.text),this.getTextInputField().value=i,s.report.$dispose();if(s.report&&s.report.value!=t){var o=s.report.value;this._isPropertyEquals("value",o)||this.setProperty("value",o)}this.setHelpText(!0),(aria.utils.Type.isArray(r.value)&&aria.utils.Array.isEmpty(r.value)||!r.value)&&r.prefill&&r.prefill+""&&this.setPrefillText(!0,r.prefill,!0)}else if(e==="invalidText"){if(t==n)return;var s;this._cfg.value&&(s=this.checkValue({performCheckOnly:!0,value:this._cfg.value
,text:t==null?"":null}));if(!s||!s.isValid){var u=this.getTextInputField();u&&this._setText(t)}s&&s.report&&s.report.$dispose(),t||(this.changeProperty("formatErrorMessages",[]),this.changeProperty("formatError",!1),this.changeProperty("error",!1)),this.setProperty("invalidText",t),this._reactToChange()}else e==="readOnly"||e==="disabled"?(t&&(this._hasFocus=!1),this._cfg[e]=t,this._reactToChange()):e==="mandatory"||e==="formatError"||e==="formatErrorMessages"||e==="error"||e==="errorMessages"?(this._cfg[e]=
t,this._reactToChange()):e=="prefill"?this.setPrefillText(!0,t,!0):e=="prefillError"?t?this.setPrefillText(!0,"",!0):t===!1&&this.setPrefillText(!0,this._cfg.prefill,!0):this.$InputWithFrame._onBoundPropertyChange.apply(this,arguments)},_setState:function(){if(this._cfg.disabled)this._state="disabled";else if(this._cfg.readOnly)this._state="readOnly";else if(this._isPrefilled)this._state="prefill";else{this._cfg.mandatory?this._state="mandatory":this._state="normal";if(this._cfg.formatError||this._cfg.error)
this._state+="Error";if(this._hasFocus||this._keepFocus)this._state+="Focused"}},_updateState:function(){this.$InputWithFrame._updateState.call(this);var e=this._skinObj,t=this._frame.innerWidth-e.innerPaddingLeft-e.innerPaddingRight;t<0&&(t=0),this.getTextInputField().style.width=t+"px",(this._isIE7OrLess||this._simpleHTML)&&!this._helpTextSet&&(this.getTextInputField().style.color=this._getTextFieldColor()),!this._cfg.formatError&&!this._cfg.error&&this._validationPopupHide()},_reactToChange:function(){var e=
this.getTextInputField();e&&(this._updateState(),e.readOnly=this._cfg.readOnly,e.disabled=this._cfg.disabled)},_onvalidate:function(e){this._cfg.onvalidate&&(this.$logWarn(this.WIDGET_PROPERTY_DEPRECATION,["onvalidate"]),this.evalCallback(this._cfg.onvalidate)),e.popup&&this._cfg.error?this._validationPopupShow():this._validationPopupHide()},_dom_onkeydown:function(e){var t=e.keyCode==e.KC_ENTER;t&&this.checkValue()},_dom_onkeyup:function(e){this._cfg.validationDelay&&(this._valTimer&&aria.core.Timer.cancelCallback
(this._valTimer),this._valTimer=aria.core.Timer.addCallback({fn:this.checkValue,scope:this,args:{delayedValidation:!0},delay:this._cfg.validationDelay}))},_dom_onclick:function(){this._autoselect()},_dom_onfocus:function(e){this._hasFocus=!0;if(!this._keepFocus){var t=this._cfg;if(t.readOnly)return;this.setHelpText(!1),this._isPrefilled&&(this.setPrefillText(!1),this.checkValue({value:t.prefill})),this.checkValue({stopValueProp:!0}),this._cfg&&(t=this._cfg,t.validationEvent==="onFocus"&&(t.formatError&&t.formatErrorMessages
.length||t.error&&t.errorMessages.length)&&this._validationPopupShow()),this._updateState()}else{var n=this._currentCaretPosition;this._currentCaretPosition=null,n&&this.setCaretPosition(n.start,n.end)}},_dom_onblur:function(e){if(!this._hasFocus)return;if(!this._keepFocus){var t=this._cfg,n=this._skinObj.helpText;this._hasFocus=!1,this._firstFocus=!0;if(t.readOnly)return;this.checkValue(),t=this._cfg;if(!t)return;t.prefill?this.setPrefillText(!0,t.prefill,!1):this.setHelpText(!0),t.directOnBlurValidation||this
.changeProperty("error",!1),this._updateState();if(t.formatError&&t.validationEvent==="onBlur")this._validationPopupShow();else{this._validationPopupHide();if(t.directOnBlurValidation){if(t.bind){var r=t.bind.value;if(r){var i=r.inside,s=r.to,o=t.validationGroups;aria.utils.Data.validateValue(i,s,null,o,"onblur");if(!this._cfg)return}}this._onvalidate({popup:!1})}}}else this._currentCaretPosition=this.getCaretPosition(),this._hasFocus=!1},_setAutomaticBindings:function(e){this.$InputWithFrame._setAutomaticBindings
.call(this,e);var t=null,n=null,r;e&&e.bind&&(t=e.bind.value,n=e.bind.prefill),t&&t.inside&&(r=aria.utils.Data._getMeta(t.inside,t.to,!1),e.bind.invalidText||(e.bind.invalidText={inside:r,to:"invalidText"})),n&&n.inside&&(r=aria.utils.Data._getMeta(n.inside,n.to,!1),e.bind.prefillError||(e.bind.prefillError={inside:r,to:"error"}))},_checkCfgConsistency:function(){this.$InputWithFrame._checkCfgConsistency.call(this);var e=this._cfg;e.autoselect==null&&(e.autoselect=aria.widgets.environment.WidgetSettings.getWidgetSettings
().autoselect);var t=e.value;if(e.invalidText){var n=this.checkValue({text:e.invalidText,value:t,performCheckOnly:!0});if(!n.isValid)e.directOnBlurValidation&&this.changeProperty("error",!0),t=e.invalidText,this._helpTextSet=!1,n.report&&n.report.$dispose();else if(n.report){this.changeProperty("error",!1);if(n.report.text==null||n.report.text==="")e.prefill&&e.prefill+""?this._isPrefilled=!0:this._helpTextSet=e.helptext;n.report.$dispose()}this._setState()}else{if(aria.utils.Type.isArray(t)&&aria.utils.Array
.isEmpty(t)||!t)e.prefill&&e.prefill+""?this._isPrefilled=!0:this._helpTextSet=e.helptext;this._isPrefilled&&this._setState()}},setHelpText:function(e){var t=this._cfg;if(!t)return;var n=t.helptext,r=this._skinObj.helpText;if(!n||!this._helpTextSet&&!e||(this._hasFocus||this._keepFocus)&&e)return;var i=this.getTextInputField();if(i.value&&e)return;this._helpTextSet=e;if(!i)return;var s=e?r.color:this._getTextFieldColor(),o=e&&r.italics?"italic":"normal",u=e?n:"",a=i.style;a.color=s,a.fontStyle=o,i.value=u},setPrefillText
:function(e,t,n){var r=this._cfg,i;if(!r)return;var s=this.getTextInputField();if(e){if(!s||s.value&&!this._helpTextSet&&!this._isPrefilled)return;this.setHelpText(!1),t==null?i="":i=this._getPrefilledText(t),r.prefillError&&(i=""),i?(this._isPrefilled=!0,s.value=i):(s.value=i,this._isPrefilled=!1,this.setHelpText(!0),this._updateState())}else this._isPrefilled=!1;n&&(!e||this._state!="prefill")&&this._updateState()},focus:function(e,t){if(this._cfg.disabled)return!1;var n=this.getTextInputField();n.focus(),
n.value=n.value,t||this._autoselect()},_autoselect:function(){if(this._firstFocus&&this._cfg&&this._cfg.autoselect){this._firstFocus=!1;var e=this.getTextInputField(),t=0,n=e.value.length?e.value.length:0;n&&this.setCaretPosition(t,n)}}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/TextInputStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.TextInputStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="TextInput"/}
    {var useFrame=true/}

    {macro writeState(info)}
        .${cssPrefix(info)}label {
            font-weight: ${info.skinClass.label.fontWeight}
        }
    {/macro}

{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/list/CfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.widgets.form.list.CfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes"},$beans:{ListModel:{$type:"json:Object",$description:"",$properties:{items:{$type:"ItemsArray"},itemsView:{$type:"json:ObjectRef",$description:"",$classpath:"aria.templates.View"},activateSort:{$type:"json:Boolean",$description:""},multipleSelect:{$type:"json:Boolean",$description:""},maxSelectedCount:{$type:"json:Integer",$minValue:1,$description:""},disabled:{$type:"json:Boolean",$description
:""},selectedIndex:{$type:"json:Integer",$minValue:-1,$description:""},selectedCount:{$type:"json:Integer",$description:"",$minValue:0},displayOptions:{$type:"displayOptions"},cfg:{$type:"json:ObjectRef",$description:""},skin:{$type:"json:ObjectRef",$description:""},numberOfColumns:{$type:"numberOfColumns",$description:""},numberOfRows:{$type:"numberOfRows",$description:""},focusIndex:{$type:"json:Integer",$description:"",$default:0},preselect:{$type:"json:String",$description:"",$default:"none"}}},numberOfColumns
:{$type:"json:Integer",$description:"",$default:0,$minValue:0},numberOfRows:{$type:"json:Integer",$description:"",$default:0,$minValue:0},displayOptions:{$type:"json:Object",$description:"",$default:{flowOrientation:"vertical",tableMode:!1},$properties:{flowOrientation:{$type:"json:Enum",$description:"",$enumValues:["horizontal","vertical"],$default:"vertical"},tableMode:{$type:"json:Boolean",$description:"",$default:!1},listDisplay:{$type:"json:Enum",$description:"",$enumValues:["code","label","both"],$default
:"code"},displayFooter:{$type:"json:Boolean",$description:"",$default:!1}}},ItemsArray:{$type:"json:Array",$description:"",$contentType:{$type:"Item"}},Item:{$type:"json:Object",$description:"",$properties:{label:{$type:"json:String",$description:""},value:{$type:"json:String",$description:""},currentlyDisabled:{$type:"json:Boolean",$description:""},initiallyDisabled:{$type:"json:Boolean",$description:""},object:{$type:"json:ObjectRef",$description:""},selected:{$type:"json:Boolean",$description:""},index:{$type
:"json:Integer",$description:""}}}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/list/IListController.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.widgets.form.list.IListController",$extends:"aria.templates.IModuleCtrl",$events:{onChange:{description:"",properties:{selectedIndexes:"Array of newly selected indexes.",unselectedIndexes:"Array of newly unselected indexes."}},itemClick:{description:"",properties:{item:"Item which the user clicked on.",index:"Index of the item which the user clicked on.",value:"Value of the item which the user clicked on.",alreadyChanged:"If true, the event is raised after the value changed because of the click. Otherwise before. The event is raised only once, but whether it is raised before or after the change depends on the template."
,cancelDefault:"If alreadyChanged is true, it is possible to cancel the change of the value by setting this parameter to true."}},itemMouseOver:{description:"",properties:{item:"Item over which the user moved the mouse.",index:"Index of the item over which the user moved the mouse.",value:"Value of the item over which the user moved the mouse."}},keyevent:{description:"",properties:{charCode:"",keyCode:"",cancelDefault:""}},focusList:{description:"",properties:{report:"{aria.widgets.controllers.reports.ControllerReport} a check report"
}},focusTextBox:{description:"",properties:{report:"{aria.widgets.controllers.reports.ControllerReport} a check report"}},close:{description:""}},$interface:{toggleSelection:function(e){},setSelection:function(e,t){},getSelectedIndexes:function(){},getSelectedItems:function(){},getSelectedValues:function(){},setSelectedValues:function(e){},setSelectedIndex:function(e){},setMultipleSelect:function(e){},setMaxSelectedCount:function(e){},setItems:function(e){},setDisabled:function(e){},setFocus:function(e){},itemClick
:function(e){},itemMouseOver:function(e){},setFocusedIndex:function(){},keyevent:function(e){},close:function(){},deselectAll:function(){},selectAll:function(){}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/list/List.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.list.List",$extends:"aria.widgets.TemplateBasedWidget",$dependencies:["aria.utils.Json","aria.widgets.form.list.ListController"],$css:["aria.widgets.form.list.ListStyle"],$constructor:function(e,t){e||(e={}),this.$TemplateBasedWidget.constructor.apply(this,arguments);var n=aria.widgets.AriaSkinInterface.getSkinObject("List",e.sclass),r=aria.utils.Json.copy(n,!1);r.cssClassItem="xLISTItem_"+e.sclass,r.cssClassEnabled="xLISTEnabledItem_"+e.sclass,r.cssClassSelected="xLISTSelectedItem_"+
e.sclass,r.cssClassDisabled="xLISTDisabledItem_"+e.sclass,r.cssClassMouseover="xLISTMouseOverItem_"+e.sclass,r.cssClassFooter="xLISTFooter_"+e.sclass;var i=aria.utils.Json.copy(e,!0,["width","minWidth","maxWidth","height","minHeight","maxHeight","scrollBarX","scrollBarY"]);i.sclass=r.divsclass,i.margins="0 0 0 0",this._initTemplate({moduleCtrl:{classpath:"aria.widgets.form.list.ListController",initArgs:{itemsInfo:{items:e.items,selectedValues:e.selectedValues,selectedIndex:e.selectedIndex},dataModel:{activateSort
:e.activateSort,multipleSelect:e.multipleSelect,maxSelectedCount:e.maxOptions,disabled:e.disabled,displayOptions:e.displayOptions,numberOfColumns:e.numberOfColumns,numberOfRows:e.numberOfRows,skin:r,cfg:i,preselect:e.preselect}}}})},$prototype:{sendKey:function(e,t){var n=this._subTplModuleCtrl,r=this._getFirstEnabledItem();if(n){var i=n.getData();return this.evalCallback(this._cfg.onkeyevent,{charCode:e,keyCode:t,focusIndex:i.focusIndex,closeItem:r})?!0:n.keyevent({charCode:e,keyCode:t})}return!1},_getFirstEnabledItem
:function(){var e=this._subTplData.itemsView.items;for(var t=0;t<e.length;t++)if(!e[t].value.currentlyDisabled)return{id:t,value:e[t].value.value}},_onModuleEvent:function(e){if(e.name=="onChange"){var t=this._subTplModuleCtrl,n=t.getSelectedValues();this.setProperty("selectedValues",n),this.setProperty("selectedIndex",t.getData().selectedIndex),this.evalCallback(this._cfg.onchange,n)}else e.name=="itemClick"?this.evalCallback(this._cfg.onclick,{value:e.value,index:e.index}):e.name=="itemMouseOver"?this.evalCallback
(this._cfg.onmouseover,{value:e.value,index:e.index}):e.name=="close"&&this.evalCallback(this._cfg.onclose)},_dom_onkeypress:function(e){var t=this._cfg;if(this._subTplModuleCtrl&&!e.isSpecialKey&&e.charCode!=e.KC_SPACE)var n=this.sendKey(e.charCode,e.keyCode)},_dom_onkeydown:function(e){var t=this._cfg;if(this._subTplModuleCtrl&&e.isSpecialKey)var n=this.sendKey(e.charCode,e.keyCode);return e.keyCode!=e.KC_TAB&&e.preventDefault(),!1},focus:function(){var e=this._subTplModuleCtrl.getData(),t=e.itemsView.items
[e.focusIndex].initIndex;e.items[t].currentlyDisabled&&(e.focusIndex=this._getFirstEnabledItem().id),this._subTplModuleCtrl.setFocus()},_onBoundPropertyChange:function(e,t,n){var r=!1,i=this._subTplModuleCtrl,s=this._subTplCtxt.data;e=="selectedValues"?i.setSelectedValues(t):e=="selectedIndex"?i.setSelectedIndex(t):e=="disabled"?(i.setDisabled(t),r=!0):e=="maxOptions"?i.setMaxSelectedCount(t):e=="items"?(i.setItems(t),r=!0):e=="multipleSelect"&&i.setMultipleSelect(t),r&&this._subTplCtxt.$refresh()}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/list/ListController.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.list.ListController",$extends:"aria.templates.ModuleCtrl",$implements:["aria.widgets.form.list.IListController"],$dependencies:["aria.utils.Array","aria.widgets.form.list.CfgBeans","aria.templates.View","aria.DomEvent"],$constructor:function(){this.$ModuleCtrl.constructor.call(this),this._dataBeanName="aria.widgets.form.list.CfgBeans.ListModel",this._nbStopUpdates=0,this._navigationEvent=!1,this._itemsListener={fn:this._notifyItemsChange,scope:this},this.json
.setValue(this._data,"focusIndex",0)},$destructor:function(){var e=this._data,t=e.itemsView;t&&(t.$dispose(),e.itemsView=null),this._setItems(null),this._navigationEvent=null,this._itemsListener=null,this.$ModuleCtrl.$destructor.call(this)},$prototype:{$hasFlowCtrl:!1,$publicInterfaceName:"aria.widgets.form.list.IListController",init:function(e,t){this.setData(e.dataModel);var n=e.itemsInfo,r=this._mergeItemsAndSelectionInfo(n.items,n.selectedValues,n.selectedIndex);this._setItems(r.items),this.json.setValue
(this._data,"selectedIndex",r.selectedIndex),this.json.setValue(this._data,"selectedCount",r.selectedCount),n.selectedValues==null&&this.setSelectedIndex(n.selectedIndex);var i=new aria.templates.View(this._data.items);this.json.setValue(this._data,"itemsView",i),this._data.activateSort&&i.setSort(i.SORT_ASCENDING,"sortByLabel",this._sortByLabel),this.$callback(t)},setFocus:function(e){var t={name:"focusList"};this.$raiseEvent(t)},_checkPreselect:function(){if(!this._navigationEvent){if(this._data.preselect==="none"
)return null;if(this._data.preselect==="always")return 0}else this._navigationEvent=!1},_sortByLabel:function(e){return e.value.label},_stopUpdates:function(){this._nbStopUpdates++},_resumeUpdates:function(){this.$assert(63,this._nbStopUpdates>0),this._nbStopUpdates--},_updatesStopped:function(){return this._nbStopUpdates>0},_notifyItemsChange:function(e){if(this._updatesStopped())return;var t=e.dataName;if(t=="selected"){var n=e.dataHolder;(e.newValue&&!e.oldValue||!e.newValue&&e.oldValue)&&this._selectionChanged
(n.index)}else t=="initiallyDisabled"&&this._updateCurrentlyDisabled([e.dataHolder])},_updateCurrentlyDisabled:function(e){var t=this._data.selectedCount,n=this._getTrueMaxSelectedCount();for(var r=0,i=e.length;r<i;r++){var s=e[r],o=s.initiallyDisabled;!o&&t>=n&&(o=!s.selected),this.json.setValue(s,"currentlyDisabled",o)}},_selectionChanged:function(e){this._stopUpdates();var t=this.json,n=this._data,r=n.items,i=r[e],s=i.selected,o=[],u=[],a=[i],f=this._getTrueMaxSelectedCount(),l=n.selectedCount,c=n.selectedIndex
,h=l;this.$assert(149,f>=l);if(s){o[0]=e,h++;if(h>f){var p=this.getSelectedIndexes();for(var d=0,v=p.length;d<v;d++){var m=p[d];if(m!=e){var g=r[m];if(!g.initiallyDisabled){h--,u[0]=m,t.setValue(g,"selected",!1),a.push(g);break}}}this.$assert(182,h==f)}h===1?c=e:c=null}else{u[0]=e,h--;if(h===0)this.$assert(194,c==e),c=-1;else if(h===1){var p=this.getSelectedIndexes();this.$assert(202,p.length==1),c=p[0]}else this.$assert(203,h>1),this.$assert(204,c==null)}t.setValue(n,"selectedIndex",c),t.setValue(n,"selectedCount"
,h),h==l||l!=f&&h!=f?this._updateCurrentlyDisabled(a):this._updateCurrentlyDisabled(r),this._resumeUpdates(),this._raiseOnChangeEvent(o,u)},_setItems:function(e){var t=this._itemsListener,n=this.json,r=this._data.items,i;if(r==e)i=e.length;else{if(r)for(var s=0,o=r.length;s<o;s++)n.removeListener(r[s],null,t);n.setValue(this._data,"items",e);if(e){i=e.length;for(var s=0,o=e.length;s<o;s++)n.addListener(e[s],null,t);var u=this._data.itemsView;u&&(u.initialArray=e,u.refresh(u.CHANGED_INITIAL_ARRAY))}}this._data
.displayOptions&&this._calcRowCols(this._data.displayOptions.flowOrientation,this._data.numberOfRows,this._data.numberOfColumns,i)},_getTrueMaxSelectedCount:function(e){var t=this._data,n=t.multipleSelect?t.maxSelectedCount:1;return n==null&&(e==null&&(e=t.items),n=1+e.length),this.$assert(268,n>=1),n},_mergeItemsAndSelectionInfo:function(e,t,n){var r=aria.utils.Array,i=this._checkPreselect();n=i===undefined?n:i;var s=this._getTrueMaxSelectedCount(e),o=!1,u=e,a="label",f="value",l="disabled";aria.utils.Type.
isArray(e)||(u=e.container,a=e.labelProperty,f=e.valueProperty,l=e.disabledProperty);var c=[],h=-1,p=0;for(var d=0,v=u.length;d<v;d++){var m=u[d],g=t?r.contains(t,m[f])||n===d:!1;e[d].disabled&&(g=!1),g&&(p<s?(p++,h!=null&&(h==-1?h=d:h=null)):(o=!0,g=!1));var y=l?m[l]:!1;c[d]={index:d,label:m[a],value:m[f],object:m,selected:g,initiallyDisabled:y,currentlyDisabled:y}}if(p==s)for(var d=0,v=c.length;d<v;d++)c[d].selected||(c[d].currentlyDisabled=!0);return{items:c,pbMaxSelected:o,selectedIndex:h,selectedCount:p
}},setDisabled:function(e){this.json.setValue(this._data,"disabled",e)},setItems:function(e){var t=this._mergeItemsAndSelectionInfo(e,this.getSelectedValues());this._setItems(t.items),this.json.setValue(this._data,"selectedIndex",t.selectedIndex),this.json.setValue(this._data,"selectedCount",t.selectedCount)},calcMoveFocus:function(e,t,n,r,i,s){var o=t;if(r==1)i==aria.DomEvent.KC_ARROW_UP&&o--,i==aria.DomEvent.KC_ARROW_DOWN&&o++;else if(i==aria.DomEvent.KC_ARROW_UP)e=="vertical"?o=t-1:t-r<0?o=t--:o=t-r;else if(
i==aria.DomEvent.KC_ARROW_DOWN)if(e=="vertical")o=t+1;else{if(!(r<s-t))return t;o=t+r}else if(i==aria.DomEvent.KC_ARROW_LEFT)if(e=="horizontal")o=t-1;else{if(!(t>=n))return t;o=t-n}else if(i==aria.DomEvent.KC_ARROW_RIGHT)if(e=="horizontal")o=t+1;else{if(!(r<s-t))return t;o=t+n}return o>=s?s-1:o<0?0:o},keyevent:function(e){var t=this._data,n={name:"keyevent",charCode:e.charCode,keyCode:e.keyCode,focusIndex:t.focusIndex,cancelDefault:!1};this.$raiseEvent(n);if(t&&!n.cancelDefault){var r,i=t.itemsView;if(aria.DomEvent
.isNavigationKey(n.keyCode)){this._navigationEvent=!0;var s=t.multipleSelect?t.focusIndex:t.selectedIndex,o=!1,u=s;r=s;while(!o)r=this.calcMoveFocus(t.displayOptions.flowOrientation,r,t.numberOfRows,t.numberOfColumns,n.keyCode,t.itemsView.items.length),u==r?(r=s,o=!0):o=!t.multipleSelect||!i.initialArray[i.items[r].initIndex].currentlyDisabled,u=r}else var r=t.focusIndex;t.multipleSelect?n.cancelDefault=this.setFocusedIndex(r):t.selectedIndex!=null&&this.setSelectedIndex(r),n.cancelDefault=!0}return n.cancelDefault
},setFocusedIndex:function(e){var t=this._data;if(e==null)return;var n=t.items;return e<0?!1:e>=n.length?!1:(this.json.setValue(t,"focusIndex",e),this.setFocus(t.focusIndex),!0)},itemClick:function(e,t){var n=this._data;e=parseInt(e,10);if(isNaN(e)||e<0||e>n.items.length)return;var r;n.itemsView?r=this._data.itemsView.getNewIndex(n.itemsView.items,e):r=e,this.setFocusedIndex(r),t==null&&(t=!1);var i=n.items[e],s={name:"itemClick",index:e,item:i,value:i.value,alreadyChanged:t};this.$raiseEvent(s),this._data&&!
s.cancelDefault&&!t&&this.toggleSelection(e)},itemMouseOver:function(e){var t=this._data;e=parseInt(e,10);if(isNaN(e)||e<0||e>t.items.length)return;var n=t.items[e];this._navigationEvent=!0;var r={name:"itemMouseOver",index:e,item:n,value:n.value};this.$raiseEvent(r)},toggleSelection:function(e){if(!this._data.disabled){var t=!this._data.items[e].selected;return this.setSelection(e,t),t}return this._data.items[e].selected},setSelection:function(e,t){this.json.setValue(this._data.items[e],"selected",t)},setSelectedValues
:function(e){var t=aria.utils.Array;this._stopUpdates();var n=[],r=[],i=-1,s=this._data,o=s.items,u=this._getTrueMaxSelectedCount(o),a=0;for(var f=0,l=o.length;f<l;f++){var c=o[f],h=t.contains(e,c.value);h&&(a==u?h=!1:i==-1?(a=1,i=f):(a++,i=null));if(s.preselect==="none"||c.selected!=h)(h?n:r).push(f),this.json.setValue(o[f],"selected",h)}this.json.setValue(s,"selectedIndex",i),this.json.setValue(s,"selectedCount",a),this._updateCurrentlyDisabled(o),this._resumeUpdates(),(n.length>0||r.length>0)&&this._raiseOnChangeEvent
(n,r)},setSelectedIndex:function(e){if(e==null)return;var t=this._data.items;e<0||e>=t.length?this.setSelectedValues([]):this.setSelectedValues([t[e].value])},setMultipleSelect:function(e){this.json.setValue(this._data,"multipleSelect",e),this._updateMaxSelectedCount()},setMaxSelectedCount:function(e){this.json.setValue(this._data,"maxSelectedCount",e),this._updateMaxSelectedCount()},_updateMaxSelectedCount:function(){var e=this._getTrueMaxSelectedCount();this._data.selectedCount>=e&&this.setSelectedValues(this
.getSelectedValues())},getSelectedIndexes:function(){var e=this._data;if(e.selectedIndex==-1)return[];if(e.selectedIndex!=null)return[e.selectedIndex];var t=[],n=e.itemsView;n.refresh();var r=n.items;for(var i=0,s=r.length;i<s;i++)r[i].value.selected&&t.push(r[i].initIndex);return t},getSelectedItems:function(){var e=this.getSelectedIndexes(),t=[],n=this._data.items;for(var r=0,i=e.length;r<i;r++)t[r]=n[e[r]];return t},getSelectedValues:function(){var e=this.getSelectedIndexes(),t=[],n=this._data.items;for(var r=0
,i=e.length;r<i;r++)t[r]=n[e[r]].value;return t},_raiseOnChangeEvent:function(e,t){var n=this._checkPreselect();e=n===undefined?e:[n],this.$raiseEvent({name:"onChange",selectedIndexes:e,unselectedIndexes:t})},_calcRowCols:function(e,t,n,r){var i;e=="vertical"?t?(n=Math.ceil(r/t),i=r%t):n?(t=Math.ceil(r/n),n=Math.ceil(r/t)):(n=1,t=r):e=="horizontal"&&(n?t=Math.ceil(r/n):t?(n=Math.ceil(r/t),t=Math.ceil(r/n)):(t=1,n=r)),this.json.setValue(this._data,"numberOfRows",t),this.json.setValue(this._data,"numberOfColumns"
,n)},close:function(){this.$raiseEvent("close")},deselectAll:function(){this.setSelectedValues([]),this.json.setValue(this._data,"focusIndex",0)},selectAll:function(){var e=[],t=this._data.items;for(var n=0;n<t.length;n++)t[n].initiallyDisabled||e.push(t[n].value);this.setSelectedValues(e),this.json.setValue(this._data,"focusIndex",0)}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/list/ListStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.form.list.ListStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="List"/}
    
    {macro writeSkinClass(info)}
        {var skinClassName=info.skinClassName/}
        {var skinClass=info.skinClass/}
        /* List Widget classes */
        
        a.xLISTItem_${skinClassName},
        a.xLISTItem_${skinClassName}:link,
        a.xLISTItem_${skinClassName}:active,
        a.xLISTItem_${skinClassName}:visited {
            color: #000;
            text-decoration:none;
        }
        
        a.xLISTItem_${skinClassName} {
            display: block;
            padding:1px 1px 1px 2px;
            margin: 1px ${skinClass.link.marginRight}px 1px ${skinClass.link.marginLeft}px;
        }
        
        
        .xLISTEnabledItem_${skinClassName} {
            color:${skinClass.enabledColor};
            cursor:pointer;
        }
        
        .xLISTMouseOverItem_${skinClassName} {
            background-color:${skinClass.mouseOverBackgroundColor};
            color:${skinClass.mouseOverColor};
        }
        
        .xLISTEnabledItem_${skinClassName}:hover {
        {if skinClass.highlightMouseOver}
            background-color:${skinClass.mouseOverBackgroundColor};
            color: ${skinClass.mouseOverColor};
        {/if}
            text-decoration: none;
        }
        
        .xLISTSelectedItem_${skinClassName}, .xLISTSelectedItem_${skinClassName}:link, .xLISTSelectedItem_${skinClassName}:visited, .xLISTSelectedItem_${skinClassName}:active  {
            background-color: ${skinClass.selectedItemBackgroundColor};
            color: ${skinClass.selectedItemColor};
        }
        
        .xLISTDisabledItem_${skinClassName},
        a.xLISTDisabledItem_${skinClassName}:visited,
        a.xLISTDisabledItem_${skinClassName}:hover,
        a.xLISTDisabledItem_${skinClassName}:link {
            color:#888;
        }
        
        .xLISTFooter_${skinClassName} {
            padding:${skinClass.footer.padding}px;
            background-color: ${skinClass.footer.backgroundColor};
            border-color: ${skinClass.footer.borderColor};
            {if skinClass.footer.borderTopOnly}border-top-style{else/}border-style{/if}: ${skinClass.footer.borderStyle};
            border-width: ${skinClass.footer.borderWidth}px;
            margin:    ${skinClass.footer.marginTop}px ${skinClass.footer.marginRight}px ${skinClass.footer.marginBottom}px ${skinClass.footer.marginLeft}px;
        }
    {/macro}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/form/list/templates/LCTemplate.tpl
//*******************
// Default template LCResourceHandler
{Template {
    $classpath : 'aria.widgets.form.list.templates.LCTemplate',
    $extends : 'aria.widgets.form.list.templates.ListTemplate'
}}
    
    {macro renderItem(item, itemIdx)}
        {var className = _getClassForItem(item)/}
        {var entry = item.object.entry/}
    
        <a href="#" class="${className}" _itemIdx="${itemIdx}" onclick="return false;">
            {if ! item.label}
                &nbsp;
            {elseif item.value.multiWordMatch/}
                ${item.label|escape|highlightfromnewword:entry}
            {else/}
                ${item.label|escape|starthighlight:entry}
            {/if}
        </a>
    {/macro}
    
{/Template}

//*******************
//LOGICAL-PATH:aria/widgets/form/list/templates/ListTemplate.tpl
//*******************
// Default template for List Widget
{Template {
    $classpath:'aria.widgets.form.list.templates.ListTemplate',
    $hasScript:true
}}
    {macro main()}
        // The Div is used to wrap the items with good looking border.
        {@aria:Div data.cfg}

                {section 'Items'}
                <div {id "myList" /}
                    {if !data.disabled}
                        {on mouseup {fn: "itemClick"} /}
                        {on mouseover {fn: "itemMouseOver"} /}
                    {/if}
                >
                    <a href="#" style="display: none;">&nbsp;</a> //IE6 does not highlight the 1 elm in list
                    {foreach item inArray data.items}
                        {call renderItem(item, item_index)/}
                    {/foreach}
                </div>
                {/section}
        {/@aria:Div}
    {/macro}

    {macro renderItem(item, itemIdx)}
        {var a = _getClassForItem(item)/}

        <a href="#" class="${a}" data-itemIdx="${itemIdx}" onclick="return false;">
            {if ! item.label}
                &nbsp;
            {else/}
                ${item.label|escape}
            {/if}
        </a>
    {/macro}

{/Template}

//*******************
//LOGICAL-PATH:aria/widgets/form/list/templates/ListTemplateScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.widgets.form.list.templates.ListTemplateScript",$constructor:function(){this._refContainer="myList",this._itemShift=1},$destructor:function(){this._scrollToSelectedItemCb!=null&&(aria.core.Timer.cancelCallback(this._scrollToSelectedItemCb),this._scrollToSelectedItemCb=null)},$prototype:{_scrollToSelectedItem:function(){this._scrollToSelectedItemCb=null;var e=this.data.selectedIndex;if(e!=null&&e>-1){var t=this.$getChild(this._refContainer,e+this._itemShift);t.scrollIntoView
(),t.$dispose()}},$afterRefresh:function(e){var t=e?e.outputSection:null;if(t==null||t=="Items"){var n=this.data.selectedIndex;n!=null&&n>-1&&this._scrollToSelectedItemCb==null&&(this._scrollToSelectedItemCb=aria.core.Timer.addCallback({fn:this._scrollToSelectedItem,scope:this,delay:1}))}},onModuleEvent:function(e){if(e.name=="onChange")if(!e.selectedIndexes&&!e.unselectedIndexes)this.$refresh({filterSection:"Items"});else{var t=this.data.items;if(e.unselectedIndexes.length>0)for(var n=0,r=e.unselectedIndexes
.length;n<r;n+=1){var i=e.unselectedIndexes[n],s=this.$getChild(this._refContainer,i+this._itemShift);s.classList.setClassName(this._getClassForItem(t[i],!1)),s.$dispose()}if(e.selectedIndexes.length>0)for(var n=0,r=e.selectedIndexes.length;n<r;n+=1){var i=e.selectedIndexes[n],s=this.$getChild(this._refContainer,i+this._itemShift);s.classList.setClassName(this._getClassForItem(t[i],!1)),n===0&&s.scrollIntoView(),s.$dispose()}}},itemClick:function(e){if(!this.data.disabled){var t=e.target.getData("itemIdx",!0
);t&&(aria.core.Browser.isWebkit&&e.target.focus(),this.moduleCtrl.itemClick(t))}},itemMouseOver:function(e){if(!this.data.disabled){var t=e.target.getData("itemIdx",!0);t&&this.moduleCtrl.itemMouseOver(t)}},_getClassForItem:function(e){var t=[this.data.skin.cssClassItem];return e&&e.selected&&t.push(this.data.skin.cssClassSelected),this.data.disabled?t.push(this.data.skin.cssClassDisabled):t.push(this.data.skin.cssClassEnabled),t.join(" ")}}});
//*******************
//LOGICAL-PATH:aria/widgets/frames/CfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.widgets.frames.CfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes",templates:"aria.templates.CfgBeans"},$beans:{FrameCfg:{$type:"json:Object",$description:"",$properties:{id:{$type:"json:String",$description:""},skinnableClass:{$type:"json:String",$description:"",$sample:"Button"},sclass:{$type:"json:String",$description:"",$sample:"std"},skinObject:{$type:"json:ObjectRef",$description:""},state:{$type:"json:String",$description:""},stateObject:{$type:"json:ObjectRef"
,$description:""},width:{$type:"json:Integer",$description:"",$default:-1},height:{$type:"json:Integer",$description:"",$default:-1},cssClass:{$type:"json:String",$description:"",$default:""},scrollBarX:{$type:"json:Boolean",$description:"",$default:!0},scrollBarY:{$type:"json:Boolean",$description:"",$default:!0},printOptions:{$type:"templates:PrintOptions"},block:{$type:"json:Boolean",$description:""},tooltipLabels:{$type:"json:Array",$description:"",$contentType:{$type:"json:String",$description:""},$default
:[]},hideIconNames:{$type:"json:Array",$description:"",$contentType:{$type:"json:String",$description:""},$default:[]},iconsLeft:{$type:"json:Array",$description:"",$contentType:{$type:"json:String",$description:""},$default:[]},iconsRight:{$type:"json:Array",$description:"",$contentType:{$type:"json:String",$description:""},$default:[]},inlineBlock:{$type:"json:Boolean",$description:""}}}}});
//*******************
//LOGICAL-PATH:aria/widgets/frames/FixedHeightFrame.js
//*******************
(function(){var e;Aria.classDefinition({$classpath:"aria.widgets.frames.FixedHeightFrame",$extends:"aria.widgets.frames.Frame",$dependencies:["aria.utils.Dom"],$onload:function(){e=aria.utils.Dom},$onunload:function(){e=null},$constructor:function(e){this.$Frame.constructor.call(this,e),this._mainContentIndex=1,this._computeSize()},$prototype:{_computeSize:function(){var e=this._cfg,t=e.stateObject;if(e.width>-1){var n=e.width-t.marginLeft-t.marginRight;this._hasBorder(t.skipLeftBorder,e.iconsLeft)&&(n-=t.spcLeft
),this._hasBorder(t.skipRightBorder,e.iconsRight)&&(n-=t.sprWidth-t.spcLeft),this.innerWidth=n>0?n:0}else this.innerWidth=-1;this.innerHeight=t.sprHeight-t.marginTop-t.marginBottom},_writeExtraMarkupBegin:function(e){},_writeExtraMarkupEnd:function(e){},writeMarkupBegin:function(e){var t=this._cfg,n=this._cssPrefix,r={style:"",className:"xFrameContent "+n+"c "+t.cssClass};this._appendInnerWidthInfo(r),this._appendInnerHeightInfo(r),e.write(['<span class="xFixedHeightFrame_w ',n,'w">'].join(""));var i=this._hasBorder
(this._cfg.stateObject.skipLeftBorder,this._cfg.iconsLeft);e.write(["<span  ",i?"":'style="display:none;"',' class="xFixedHeightFrame_bme ',n,"b ",n,'bkgA">&nbsp;</span>'].join("")),this._writeExtraMarkupBegin(e),e.write(['<span class="xFixedHeightFrame_bme ',n,"m ",n,'bkgB" >','<span style="',r.style,'" class="',r.className,'">'].join(""))},writeMarkupEnd:function(e){var t=this._cssPrefix;e.write("</span></span>"),this._writeExtraMarkupEnd(e);var n=this._hasBorder(this._cfg.stateObject.skipRightBorder,this.
_cfg.iconsRight);e.write(["<span ",n?"":'style="display:none;"',' class="xFixedHeightFrame_bme ',t,"e ",t,'bkgA">&nbsp;</span>'].join("")),e.write("</span>")},linkToDom:function(t){this.$Frame.linkToDom.call(this,t),this._childRootElt=e.getDomElementChild(e.getDomElementChild(t,this._mainContentIndex),0)},changeState:function(t){this.$Frame.changeState.call(this,t),this._computeSize();var n=this._cfg,r=this._cssPrefix,i=this._domElt;i.className=["xFixedHeightFrame_w ",r,"w"].join("");var s;s=e.getDomElementChild
(i,0),s.className=["xFixedHeightFrame_bme ",r,"b ",r,"bkgA"].join(""),s=e.getDomElementChild(i,this._mainContentIndex),s.className=["xFixedHeightFrame_bme ",r,"m ",r,"bkgB"].join(""),s=e.getDomElementChild(s,0);var o={className:["xFrameContent ",r,"c ",n.cssClass].join("")};this._appendInnerWidthInfo(o),this._appendInnerHeightInfo(o),s.style.width=o.width,s.style.height=o.height,s.className=o.className,s=e.getDomElementChildReverse(i,0),s.className=["xFixedHeightFrame_bme ",r,"e ",r,"bkgA"].join("")},resize:
function(e,t){this.$Frame.resize.call(this,e,t),this.changeState(this.getStateName())},_hasBorder:function(e,t){var n=e===!1;return e=="dependsOnIcon"&&(n=t.length===0),n}}})})();
//*******************
//LOGICAL-PATH:aria/widgets/frames/Frame.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.frames.Frame",$dependencies:["aria.utils.Dom"],$constructor:function(e){e.stateObject=e.skinObject.states[e.state].frame,this._cssPrefix=["x",e.skinnableClass,"_",e.sclass,"_",e.state,"_"].join(""),this._cfg=e,this.innerWidth=e.width,this.innerHeight=e.height,this._domElt=null,this._childRootElt=null,this.domElementNbr=1},$destructor:function(){this._domElt=null,this._childRootElt=null},$statics:{FRAME_INVALID_STATE:"Invalid state (%1) for the frame in this skinnable class (%2)."
},$prototype:{writeMarkupBegin:function(e){},writeMarkupEnd:function(e){},linkToDom:function(e){this.$assert(57,this._domElt==null),this._domElt=e},getChild:function(e){return aria.utils.Dom.getDomElementChild(this._childRootElt,e)},checkState:function(e){return!!this._cfg.skinObject.states[e]},changeState:function(e){var t=this._cfg,n=t.skinObject.states[e];if(n==null){this.$logError(this.FRAME_INVALID_STATE,[e,t.skinnableClass]);return}t.state=e,t.stateObject=n.frame,this._cssPrefix=["x",t.skinnableClass,"_"
,t.sclass,"_",t.state,"_"].join("")},getSkinObject:function(){return this._cfg.skinObject},getStateName:function(){return this._cfg.state},getStateObject:function(){return this._cfg.stateObject},resize:function(e,t){var n=this._cfg;n.width=e,n.height=t},_appendInnerWidthInfo:function(e){if(this.innerWidth>-1){e.width=this.innerWidth+"px",e.style!=null&&(e.style+="width:"+e.width+";"),this._cfg.scrollBarX?e.className+=" xOverflowXAuto":e.className+=" xOverflowXHidden";if(this._cfg.printOptions=="adaptX"||this
._cfg.printOptions=="adaptXY")e.className+=" xPrintAdaptX"}else e.width=""},_appendInnerHeightInfo:function(e){if(this.innerHeight>-1){e.height=this.innerHeight+"px",e.style!=null&&(e.style+="height:"+e.height+";"),this._cfg.scrollBarY?e.className+=" xOverflowYAuto":e.className+=" xOverflowYHidden";if(this._cfg.printOptions=="adaptY"||this._cfg.printOptions=="adaptXY")e.className+=" xPrintAdaptY"}else e.height=""}}});
//*******************
//LOGICAL-PATH:aria/widgets/frames/FrameFactory.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.frames.FrameFactory",$singleton:!0,$dependencies:["aria.widgets.AriaSkinInterface","aria.widgets.frames.CfgBeans","aria.widgets.frames.OldFrame","aria.widgets.frames.SimpleFrame","aria.widgets.frames.TableFrame","aria.widgets.frames.FixedHeightFrame","aria.widgets.frames.SimpleHTMLFrame"],$constructor:function(){this._frameTypeBuilders={Old0:aria.widgets.frames.OldFrame,Old1:aria.widgets.frames.OldFrame,Old2:aria.widgets.frames.OldFrame,Table:aria.widgets.frames
.TableFrame,FixedHeight:aria.widgets.frames.FixedHeightFrame,SimpleHTML:aria.widgets.frames.SimpleHTMLFrame,Simple:aria.widgets.frames.SimpleFrame}},$statics:{SPRTYPE_OLD_STD:0,SPRTYPE_OLD_BGREPEAT:1,SPRTYPE_OLD_FIXED_HEIGHT:2,SPRTYPE_TABLE:3,SPRTYPE_FIXED_HEIGHT:4,SPRTYPE_NO_FRAME:5,SPRTYPE_SIMPLE_FRAME:6,FRAME_INVALID_FRAMETYPE:"Invalid frame type: %1.",FRAME_INVALID_CONFIG:"Invalid frame configuration."},$prototype:{normalizeFrameCfg:function(e){var t={json:e,beanName:"aria.widgets.frames.CfgBeans.FrameCfg"
};if(aria.core.JsonValidator.normalize(t)){e=t.json;var n=e.skinObject;return n==null&&(n=aria.widgets.AriaSkinInterface.getSkinObject(e.skinnableClass,e.sclass),e.skinObject=n),e}return this.$logError(this.FRAME_INVALID_CONFIG),null},createFrame:function(e){e=this.normalizeFrameCfg(e);if(e){var t=e.skinObject.frame.frameType,n=this._frameTypeBuilders[t];if(n)return new n(e);this.$logError(this.FRAME_INVALID_FRAMETYPE,[t])}}}});
//*******************
//LOGICAL-PATH:aria/widgets/frames/FrameWithIcons.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.frames.FrameWithIcons",$dependencies:["aria.widgets.AriaSkinInterface","aria.widgets.frames.FrameFactory","aria.utils.Dom","aria.utils.Type","aria.utils.Function","aria.widgets.frames.FrameFactory","aria.utils.Array","aria.utils.Delegate"],$constructor:function(e){var t=e.skinObject;this._baseId=e.id,this._skinObject=t,this._stateName=e.state,this._iconsLeft=e.iconsLeft,this._iconsRight=e.iconsRight,this._icons={},this._tooltipLabels=e.tooltipLabels,aria.utils.Array
.forEach(this._iconsLeft,this._initIcon,this),aria.utils.Array.forEach(this._iconsRight,this._initIcon,this),this._outerWidth=e.width,this._outerHeight=e.height,this._updateIcons(),this._updateFrameWidth(),e.width=this._frameWidth,this._frame=aria.widgets.frames.FrameFactory.createFrame(e),this.domElementNbr=this._frame.domElementNbr+this._iconsLeft.length+this._iconsRight.length,this.innerWidth=this._frame.innerWidth,this.innerHeight=this._frame.innerHeight},$destructor:function(){this._frame&&(this._frame.
$dispose(),this._frame=null),this._icons&&(aria.utils.Array.forEach(this._iconsLeft,this._destroyIcon,this),aria.utils.Array.forEach(this._iconsRight,this._destroyIcon,this),this._iconsLeft=null,this._iconsRight=null,this._icons=null),this._domElt=null},$events:{iconClick:{description:"",properties:{iconName:"Name of the icon."}},iconMouseDown:{description:"",properties:{iconName:"Name of the icon."}},iconMouseUp:{description:"",properties:{iconName:"Name of the icon."}},iconBlur:{description:"",properties:{
iconName:"Name of the icon."}},iconFocus:{description:"",properties:{iconName:"Name of the icon."}}},$statics:{createFrame:function(e){e=aria.widgets.frames.FrameFactory.normalizeFrameCfg(e);var t=e.skinObject;t.iconsLeft==null||t.iconsLeft===""?t.iconsLeft=[]:aria.utils.Type.isString(t.iconsLeft)&&(t.iconsLeft=t.iconsLeft.split(",")),t.iconsRight==null||t.iconsRight===""?t.iconsRight=[]:aria.utils.Type.isString(t.iconsRight)&&(t.iconsRight=t.iconsRight.split(","));var n=this._filterIcons(t.iconsLeft,e.hideIconNames
),r=this._filterIcons(t.iconsRight,e.hideIconNames);return e.iconsLeft=n,e.iconsRight=r,n.length===0&&r.length===0?aria.widgets.frames.FrameFactory.createFrame(e):new aria.widgets.frames.FrameWithIcons(e)},_filterIcons:function(e,t){if(t.length>0){var n=[];return aria.utils.Array.forEach(e,function(r,i){aria.utils.Array.contains(t,e[i])||n.push(e[i])}),n}return e},eventMap:{click:"iconClick",mousedown:"iconMouseDown",mouseup:"iconMouseDown",blur:"iconBlur",focus:"iconFocus"},ICON_NOT_FOUND:"Icon was not found: %1"
},$prototype:{writeMarkupBegin:function(e){var t=this;aria.utils.Array.forEach(this._iconsLeft,function(n){t._writeIcon(n,e)}),this._frame.writeMarkupBegin(e)},writeMarkupEnd:function(e){this._frame.writeMarkupEnd(e);var t=this;aria.utils.Array.forEach(this._iconsRight,function(n){t._writeIcon(n,e)})},getChild:function(e){return this._frame.getChild(e)},getSkinObject:function(){return this._skinObject},getStateName:function(){return this._stateName},getStateObject:function(){return this._skinObject.states[this
._stateName]},resize:function(e,t){this._updateFrameWidth(e),this._frame.resize(this._frameWidth,t),this.innerWidth=this._frame.innerWidth,this.innerHeight=this._frame.innerHeight},_initIcon:function(e){this._icons[e]={domElts:[]}},_destroyIcon:function(e){this._icons[e].domElts=null,aria.utils.Delegate.remove(this._icons[e].iconDelegateId),this._icons[e]=null,delete this._icons[e]},_updateIcons:function(){var e={width:0,activeIconIndex:0},t=this;aria.utils.Array.forEach(this._iconsLeft,function(n){t._computeIconSize
(n,e)}),aria.utils.Array.forEach(this._iconsRight,function(n){t._computeIconSize(n,e)}),this._iconsWidth=e.width},_updateFrameWidth:function(){var e=this._outerWidth,t;return e<0?t=-1:(t=e-this._iconsWidth,t<0&&(t=0)),this._frameWidth!==t?(this._frameWidth=t,!0):!1},_computeIconSize:function(e,t){var n=this.getStateObject(),r=n.icons[e].split(":"),i=aria.widgets.AriaSkinInterface.getIcon(r[0],r[1]),s=n.icons[e+"IsActive"];i?(this._icons[e].iconInfo=i,this._icons[e].active=s,s&&(this._icons[e].tooltip=this._tooltipLabels
[t.activeIconIndex++]),t.width+=i.width):this.$logError(this.ICON_NOT_FOUND,e)},linkToDom:function(e){var t={domElt:e},n=this;aria.utils.Array.forEach(this._iconsLeft,function(e){n._linkIconToDom(e,t)}),this._frame.linkToDom(t.domElt),t.domElt=aria.utils.Dom.getNextSiblingElement(t.domElt,this._frame.domElementNbr),aria.utils.Array.forEach(this._iconsRight,function(e){n._linkIconToDom(e,t)})},changeState:function(e){this._stateName=e,this._updateIcons(),this._updateFrameWidth()&&this._frame.resize(this._frameWidth
,this._outerHeight),aria.utils.Array.forEach(this._iconsLeft,this._changeIconState,this),this._frame.changeState(e),aria.utils.Array.forEach(this._iconsRight,this._changeIconState,this),this.innerWidth=this._frame.innerWidth,this.innerHeight=this._frame.innerHeight},getIcon:function(e){var t=this._icons[e];return t?t.domElts[0]:null},_getIconStyle:function(e,t){var n=["padding:0;display:inline-block;background-position:-",e.iconLeft,"px -",e.iconTop,"px;width:",e.width,"px;height:",e.height,"px;vertical-align: top;"
];return t&&n.push("cursor:pointer;"),n.join("")},_writeIcon:function(e,t){var n=this._icons[e],r=n.iconInfo,i=this._getIconStyle(r,n.active),s=aria.utils.Delegate,o=s.add({fn:this._delegateIcon,scope:this,args:e});this._icons[e].iconDelegateId=o;var u=n.tooltip?' title="'+n.tooltip.replace(/\"/gi,"&quot;")+'"':"";t.write(["<span",Aria.testMode&&this._baseId?' id="'+this._baseId+"_"+e+'"':"",' class="',r.cssClass,'" style="',i,'" '+s.getMarkup(o)+u+' tabIndex="-1">&nbsp;</span>'].join(""))},_linkIconToDom:function(
e,t){var n=t.domElt;t.domElt=aria.utils.Dom.getNextSiblingElement(n),this._icons[e].domElts.push(n)},_changeIconState:function(e){var t=this._icons[e],n=t.domElts,r=t.iconInfo,i=this._getIconStyle(r,t.active);for(var s=0,o=n.length;s<o;s++){var u=n[s];u.className=r.cssClass,u.style.cssText=i}},_delegateIcon:function(e,t){var n=this.eventMap[e.type];n&&this.$raiseEvent({name:n,iconName:t})}}});
//*******************
//LOGICAL-PATH:aria/widgets/frames/OldFrame.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.frames.OldFrame",$extends:"aria.widgets.frames.Frame",$constructor:function(e){this.$Frame.constructor.call(this,e),this.setSkinObj(e.skinnableClass);var t=e["oldStuff:cssRoot"];this._wName=t?t:"DIV";var n=e.state;this._initState=n&&this._skinObj.states[n]?this._skinObj.states[n].frame:this._skinObj.states.normal.frame,this.innerWidth>-1&&(this.innerWidth-=this._skinObj.spcLeft+this._skinObj.spcRight+this._skinObj.offsetLeft+6),this.innerHeight>-1&&(this.innerHeight-=
this._skinObj.spcTop+this._skinObj.spcBottom);var r=this._sprTypes[this._skinObj.frame.frameType];this.domElementNbr=r.domElementNbr},$prototype:{$init:function(e){e._sprTypes={Old0:{markupBegin:e._markupBeginStd,markupEnd:e._markupEndStd,domElementNbr:1},Old1:{markupBegin:e._markupBeginBgRepeat,markupEnd:e._markupEndBgRepeat,domElementNbr:1},Old2:{markupBegin:e._markupBeginFixedHeight,markupEnd:e._markupEndFixedHeight,domElementNbr:2}}},writeMarkupBegin:function(e){var t=this._skinObj,n=this._sprTypes[t.frame
.frameType];n.markupBegin.call(this,e),t=null},writeMarkupEnd:function(e){var t=this._skinObj,n=this._sprTypes[t.frame.frameType];n.markupEnd.call(this,e),t=null},setSkinObj:function(e){this._skinObj=aria.widgets.AriaSkinInterface.getSkinObject(e,this._cfg.sclass)},_markupBeginBgRepeat:function(e){var t=this._cfg,n=this._skinObj.frame,r=this._initState,i=n.sprHeight,s=t.height,o=t.width,u=s===-1?"":s>i?";height:"+i+"px":";height:"+s+"px",a=o===-1?"":";width:"+o+"px";e.write(['<span class="x',this._wName,"bkg_"
,t.sclass,'" style="display:inline-block;color:',r.color,";","text-align:",r.textAlign,a,";padding:",n.spcTop,"px ",n.spcRight,"px ",n.spcBottom,"px ",n.spcLeft,"px",u,'">'].join(""))},_markupEndBgRepeat:function(e){e.write("</span>")},_markupBeginFixedHeight:function(e){var t=this._skinObj.frame,n=this._initState,r=this._cfg,i=t.spcLeft,s=t.spcRight,o=t.spcTop,u=t.spcBottom,a=t.sprWidth,f=t.sprHeight,l=r.width===-1?"":r.width>a?"width:"+(a-s)+"px;":"width:"+(r.width-s-i-6)+"px;",c=n.topPos=n.sprIdx*(f+2),h=
t.h="height:"+(f-o-u)+"px;";e.write(['<span class="x',this._wName,"bkg_",r.sclass,'" style="color:',n.color,";text-align:",n.textAlign,";display:inline-block;",h,l,"padding:",o,"px 0 ",u,"px ",i,"px;vertical-align:top;background-position:0 -",c,'px;">'].join(""))},_markupEndFixedHeight:function(e){var t=this._skinObj.frame,n=t.spcRight;e.write(["</span>",'<span class="x',this._wName,"bkg_",this._cfg.sclass,'" style="display:inline-block;',t.h,"width:",n,"px;","padding:",t.spcTop,"px 0 ",t.spcBottom,"px 0;vertical-align:top;background-position:-"
,t.sprWidth-n,"px -",this._initState.topPos,'px;">&nbsp;</span>'].join("")),delete t.h},_markupBeginStd:function(e){var t=this._cfg,n=t.sclass,r=this._skinObj.frame,i=this._initState,s=i.sprIdx,o=r.offsetLeft,u=r.spcLeft,a=r.spcTop,f=r.spcBottom,l=r.spcRight,c=r.sprWidth,h=r.sprHeight,p=i.topPos=s*h+2*s,d=t.width,v=t.height,m=d>-1?d-u:c-u,g=v===-1?"":v>h?";height:"+(h-f-a)+"px":";height:"+(v-f-a)+"px",y=this._wName;d>-1&&m>c&&(m=c),e.write(['<span class="x',y,"_",n,'" style="display:block;text-align:',i.textAlign
,";color:",i.color,d>-1?";width:"+m+"px":"",";padding-left:",u,'px">','<span class="x',y,"tr x",y,"bkg_",n,'" style="display:block;padding-right:',l,"px;background-position: -",c-m,"px -",p,'px;">','<span class="x',y,"trc x",y,"bkg_",n," x",y,"c_",n,'" style="display:block;background-position: 0px -',p,'px">&nbsp;</span>','<span style="padding-top:',a,"px;width:",m-l,"px;padding-right:",l-o,"px;display:block;position:relative;left:",o,"px",g,'">','<span class="'+t.cssClass+'" style="display:block;overflow:auto; position:relative;'
,g,';">'].join(""))},_markupEndStd:function(e){var t=this._cfg.sclass,n=this._skinObj.frame,r=this._initState,i=n.spcBottom,s=r.topPos+n.sprHeight-i,o=this._cfg.width,u=n.sprWidth,a=n.spcLeft,f=o>-1?o-a:u-a,l=this._wName;o>-1&&f>u&&(f=u),e.write(["</span></span>","</span>",'<span class="x',l,"br x",l,"bkg_",t,'" style="display:block;background-position: -',u-f,"px -",s,'px">','<span class="x',l,"brc x",l,"bkg_",t," x",l,"c_",t,'" style="height:',i,"px;display:block;background-position: 0px -",s,'px">&nbsp;</span>'
,"</span>","</span>"].join(""))},changeState:function(e){this.$Frame.changeState.call(this,e),this._changeState(this.getStateObject(),this._domElt)},_changeState:function(e,t){t.style.color=e.color,t.style.textAlign=e.textAlign;var n=this._skinObj.frame;if(!n.bgRepeat){var r=t.getElementsByTagName("span"),i=n.sprHeight,s=e.sprIdx,o=e.topPos;r.length===0&&(r=t.parentNode.getElementsByTagName("span")),o||(o=e.topPos=s*i+2*s);var u=o+i-n.spcBottom,a;for(var f=0;f<r.length;f++)a=r[f].className,a.match(/x[A-Z]{3}tr/
)||a.match(/^x[A-X]{3}bkg_.*$/)?this.__changeBgPos(r[f],o):a.match(/x[A-Z]{3}br/)&&this.__changeBgPos(r[f],u)}},__changeBgPos:function(e,t){var n=e.style.backgroundPosition.split(" ");e.style.backgroundPosition=n[0]+" -"+t+"px",n=null},linkToDom:function(e){this.$Frame.linkToDom.call(this,e);var t=aria.utils.Dom.getDomElementChild,n=this._sprTypes[this._skinObj.frame.frameType];this._childRootElt=e},resize:function(e,t){this.$Frame.resize.call(this,e,t)}}});
//*******************
//LOGICAL-PATH:aria/widgets/frames/SimpleFrame.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.frames.SimpleFrame",$extends:"aria.widgets.frames.Frame",$dependencies:["aria.utils.Dom"],$constructor:function(e){this.$Frame.constructor.call(this,e),this._computeSize()},$prototype:{_computeSize:function(){var e=this._cfg,t=e.stateObject,n=t.borderSize>0?t.borderSize*2:0;this.innerWidth=e.width>-1?e.width-t.paddingLeft-t.paddingRight-n:-1,this.innerHeight=e.height>-1?e.height-t.paddingTop-t.paddingBottom-n:-1},writeMarkupBegin:function(e){var t=this._cfg,n=this
._cssPrefix,r=t.stateObject,i={style:t.block?"display:block;":"",className:"xSimpleFrame "+this._cssPrefix+"frame "+t.cssClass};this._appendInnerWidthInfo(i),this._appendInnerHeightInfo(i),e.write("<span "+(i.style?'style="'+i.style+'"':"")+'class="'+i.className+'">')},writeMarkupEnd:function(e){e.write("</span>")},linkToDom:function(e){this.$Frame.linkToDom.call(this,e),this._childRootElt=e},changeState:function(e){this.$Frame.changeState.call(this,e),this._computeSize();var t=this._domElt,n={className:"xSimpleFrame "+
this._cssPrefix+"frame "+this._cfg.cssClass};this._appendInnerWidthInfo(n),this._appendInnerHeightInfo(n),t.style.width=n.width,t.style.height=n.height,t.className=n.className},resize:function(e,t){this.$Frame.resize.call(this,e,t),this.changeState(this.getStateName())}}});
//*******************
//LOGICAL-PATH:aria/widgets/frames/SimpleHTMLFrame.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.frames.SimpleHTMLFrame",$extends:"aria.widgets.frames.Frame",$constructor:function(e){this.$Frame.constructor.call(this,e),this._computeSize()},$prototype:{_computeSize:function(){var e=this._cfg,t=e.stateObject,n=4;this.innerWidth=e.width>-1?e.width-n:-1,this.innerHeight=e.height>-1?e.height-n:-1},linkToDom:function(e){this.$Frame.linkToDom.call(this,e),this._childRootElt=e},getChild:function(e){return e===0?this._childRootElt:aria.utils.Dom.getDomElementChild(
this._childRootElt,e-1)},changeState:function(e){this.$Frame.changeState.call(this,e),this._computeSize();var t=this._domElt,n={width:this.innerWidth>-1?this.innerWidth+"px":"",height:this.innerHeight>-1?this.innerHeight+"px":""};t.style.width=n.width,t.style.height=n.height},resize:function(e,t){this.$Frame.resize.call(this,e,t),this.changeState(this.getStateName())}}});
//*******************
//LOGICAL-PATH:aria/widgets/frames/TableFrame.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.frames.TableFrame",$extends:"aria.widgets.frames.Frame",$dependencies:["aria.utils.Dom"],$constructor:function(e){this.$Frame.constructor.call(this,e),this._baseId=e.id,this._computeSize(),this._tds=null,this._inlineBlock=e.inlineBlock},$statics:{},$destructor:function(){var e=this._tds;if(e){for(var t=0,n=e.length;t<n;t++)e[t].element=null;this._tds=null}this.$Frame.$destructor.call(this)},$prototype:{_computeSize:function(){var e=this._cfg,t=e.stateObject;if(e
.width>-1){var n=e.width-t.sprWidth-t.marginLeft-t.marginRight;this.innerWidth=n>0?n:0}else this.innerWidth=-1;if(e.height>-1){var r=e.height-t.sprHeight-t.marginTop-t.marginBottom;this.innerHeight=r>0?r:0}else this.innerHeight=-1},writeMarkupBegin:function(e){var t=this._cfg,n=this._cssPrefix,r=t.stateObject,i=t.block!==!0?" ":'class="xBlock"',s={style:"",className:"xFrameContent "+n+"c "+t.cssClass};this._appendInnerWidthInfo(s),this._appendInnerHeightInfo(s);var o=this._inlineBlock?"display:inline-block;vertical-align: middle;"
:"";e.write(['<table cellspacing="0" cellpadding="0" style="position: relative;'+o+'"',i,'><tbody isFrame="1">',"<tr>",'<td class="',n,"tlc ",n,'bkgA">&nbsp;</td>','<td class="',n,"ts ",n,'bkgB">'+this.__addFrameIcon(t,n,"top")+"</td>",'<td class="',n,"trc ",n,'bkgA">&nbsp;</td>',"</tr>","<tr>",'<td class="',n,"ls ",n,'bkgC">&nbsp;</td>','<td class="',n,'m">',"<span ",Aria.testMode&&this._baseId?' id="'+this._baseId+'"':"",s.style?'style="'+s.style+'"':"",' class="',s.className,'">'].join(""))},writeMarkupEnd
:function(e){var t=this._cfg,n=t.sclass,r=this._cssPrefix;e.write(["</span></td>",'<td class="',r,"rs ",r,'bkgC">&nbsp;</td>',"</tr>","<tr>",'<td class="',r,"blc ",r,'bkgA">&nbsp;</td>','<td class="',r,"bs ",r,'bkgB">',this.__addFrameIcon(t,r,"bottom"),"</td>",'<td class="',r,"brc ",r,'bkgA">&nbsp;</td>',"</tr>","</tbody></table>"].join(""))},linkToDom:function(e){this.$Frame.linkToDom.call(this,e);var t=aria.utils.Dom.getDomElementChild;this._childRootElt=t(t(t(t(e,0),1),1),0)},__addFrameIcon:function(e,t,n
){var r=e.stateObject,i=r.frameIconVPos;return r.frameIcon&&i==n?'<span class="'+t+'frameIcon">&nbsp;</span>':"&nbsp"},changeState:function(e){this.$Frame.changeState.call(this,e);var t=this._cfg,n=this._cssPrefix,r,i,s=aria.utils.Dom.getDomElementChild;this._computeSize();var o=this._tds;if(!o){o=[],this._tds=o;var u=s(this._domElt,0);r=s(u,0),i=s(r,0),o.push({element:i,cssPart1:"tlc ",cssPart2:"bkgA"}),i=s(r,1),o.push({element:i,cssPart1:"ts ",cssPart2:"bkgB"}),i=s(r,2),o.push({element:i,cssPart1:"trc ",cssPart2
:"bkgA"}),r=s(u,1),i=s(r,0),o.push({element:i,cssPart1:"ls ",cssPart2:"bkgC"}),i=s(r,1),o.push({element:i,cssPart:"m"}),i=s(r,2),o.push({element:i,cssPart1:"rs ",cssPart2:"bkgC"}),r=s(u,2),i=s(r,0),o.push({element:i,cssPart1:"blc ",cssPart2:"bkgA"}),i=s(r,1),o.push({element:i,cssPart1:"bs ",cssPart2:"bkgB"}),i=s(r,2),o.push({element:i,cssPart1:"brc ",cssPart2:"bkgA"})}var a={className:"xFrameContent "+n+"c "+t.cssClass};this._appendInnerWidthInfo(a),this._appendInnerHeightInfo(a),this._childRootElt.style.width=
a.width,this._childRootElt.style.height=a.height,this._childRootElt.className=a.className;for(var f=0,l=o.length;f<l;f++)i=o[f],i.cssPart?i.element.className=n+"m":i.element.className=n+i.cssPart1+n+i.cssPart2,f==1&&(i.element.innerHTML=this.__addFrameIcon(t,n,"top")),f==7&&(i.element.innerHTML=this.__addFrameIcon(t,n,"bottom"))},resize:function(e,t){this.$Frame.resize.call(this,e,t),this.changeState(this.getStateName())}}});
//*******************
//LOGICAL-PATH:aria/popups/Beans.js
//*******************
Aria.beanDefinitions({$package:"aria.popups.Beans",$description:"",$namespaces:{json:"aria.core.JsonTypes",dom:"aria.utils.DomBeans"},$beans:{PopupConf:{$type:"json:Object",$description:"",$properties:{section:{$type:"json:ObjectRef",$description:"",$mandatory:!0},keepSection:{$type:"json:Boolean",$description:"",$default:!1},modal:{$type:"json:Boolean",$description:"",$default:!1},maskCssClass:{$type:"json:String",$description:""},domReference:{$type:"json:ObjectRef",$description:"",$default:null},absolutePosition
:{$type:"dom:Position",$description:"",$default:null},center:{$type:"json:Boolean",$description:"",$default:!1},maximized:{$type:"json:Boolean",$description:"",$default:!1},closeOnMouseClick:{$type:"json:Boolean",$description:"",$default:!0},closeOnMouseScroll:{$type:"json:Boolean",$description:"",$default:!0},closeOnMouseOut:{$type:"json:Boolean",$description:"",$default:!1},closeOnMouseOutDelay:{$type:"json:Integer",$description:"",$default:500},preferredPositions:{$type:"json:Array",$description:"",$contentType
:{$type:"PreferredPosition",$mandatory:!0,$description:""},$default:[{}]},offset:{$type:"OffsetConfig",$description:"",$default:{}},ignoreClicksOn:{$type:"json:Array",$description:"",$contentType:{$type:"json:ObjectRef",$description:""},$default:[{}]},parentDialog:{$type:"json:ObjectRef",$description:"",$default:null},preferredWidth:{$type:"json:Integer",$description:"",$default:-1}}},PreferredPosition:{$type:"json:Object",$description:"",$properties:{reference:{$type:"json:String",$description:"",$default:"bottom right"
},popup:{$type:"json:String",$description:"",$default:"top left"},offset:{$type:"OffsetConfig",$description:""}}},OffsetConfig:{$type:"json:Object",$description:"",$properties:{top:{$type:"json:Integer",$description:"",$default:0},bottom:{$type:"json:Integer",$description:"",$default:0},right:{$type:"json:Integer",$description:"",$default:0},left:{$type:"json:Integer",$description:"",$default:0}}}}});
//*******************
//LOGICAL-PATH:aria/popups/Popup.js
//*******************
Aria.classDefinition({$classpath:"aria.popups.Popup",$dependencies:["aria.popups.PopupManager","aria.popups.Beans","aria.DomEvent","aria.utils.Math","aria.utils.Dom","aria.utils.Size","aria.utils.Event","aria.utils.Delegate"],$events:{onBeforeClose:{description:"",properties:{domEvent:"{aria.DomEvent} The event that triggered the closing of the popup",cancelClose:"{Boolean} Cancel the closing of the popup"}},onMouseOutTimerStart:{description:"",properties:{domEvent:"{aria.DomEvent} The event that triggered the closing of the popup"
,cancelClose:"{Boolean} Cancel the closing of the popup"}},onMouseClickClose:{description:"",properties:{domEvent:"{aria.DomEvent} The event that triggered the closing of the popup"}},onAfterClose:"",onBeforeOpen:"",onAfterOpen:"",onPositioned:{description:"",properties:{position:"Position choosed if any. If empty, no position in viewset was found."}}},$statics:{ANCHOR_BOTTOM:"bottom",ANCHOR_TOP:"top",ANCHOR_LEFT:"left",ANCHOR_RIGHT:"right"},$constructor:function(){this.preferredPositions=[],this.modalMaskDomElement=
null,this._delegateId=aria.utils.Delegate.add({fn:this._handleDelegate,scope:this}),this.domElement=null,this.isOpen=!1,this.reference=null,this.referencePosition=null,this.referenceSize=null,this.section=null,this.sectionSize=null,this.ANCHOR_KEYS=[this.ANCHOR_BOTTOM,this.ANCHOR_TOP,this.ANCHOR_LEFT,this.ANCHOR_RIGHT],this._ignoreClicksOn=null,this._rootElementOverflow=-1,this._rootElement=aria.utils.Dom.getDocumentScrollElement(),this._document=Aria.$window.document,aria.popups.PopupManager.registerPopup(this
)},$destructor:function(){this.close(),this.reference=null,this._delegateId&&aria.utils.Delegate.remove(this._delegateId),this.section&&(this.section.$unregisterListeners(this),this.conf.keepSection?this.section.removeContent():this.section.$dispose(),this.section=null),this.modalMaskDomElement&&(aria.utils.Dom.removeElement(this.modalMaskDomElement),this.modalMaskDomElement=null),this.domElement&&(aria.utils.Dom.removeElement(this.domElement),this.domElement=null),this.conf.domReference=null,this._parentDialog=
null,this._ignoreClicksOn=null,this._document=null,this.$unregisterListeners(),aria.popups.PopupManager.unregisterPopup(this)},$prototype:{_applyConfig:function(e){aria.core.JsonValidator.normalize({json:e,beanName:"aria.popups.Beans.PopupConf"}),this.modalMaskDomElement&&(aria.utils.Dom.removeElement(this.modalMaskDomElement),this.modalMaskDomElement=null),e.modal&&(this.modalMaskDomElement=this._createMaskDomElement(e.maskCssClass)),this.domElement!=null&&aria.utils.Dom.removeElement(this.domElement),this.
domElement=this._createDomElement(),this.setPreferredPositions(e.preferredPositions),this.setSection(e.section),e.absolutePosition===null?this.setReference(e.domReference):this.setPositionAsReference(e.absolutePosition),this._ignoreClicksOn=e.ignoreClicksOn,this._parentDialog=e.parentDialog,this.conf=e},_attachMouseOverListener:function(){this._detachMouseOverListener(),aria.utils.Event.addListener(this.getDomElement(),"mouseover",{fn:this._clearMouseOutTimer,scope:this})},_handleDelegate:function(e){e.type=="contentchange"&&
this.refresh()},_createDomElement:function(){var e=this._document,t=e.createElement("div");t.style.cssText="position:absolute;top:-15000px;left:-15000px;",e.body.appendChild(t),t.innerHTML="<div "+aria.utils.Delegate.getMarkup(this._delegateId)+" style='position:absolute;top:-15000px;left:-15000px;visibility:hidden;display:block;'></div>";var n=t.firstChild;return e.body.removeChild(t),e.body.appendChild(n),n},_createMaskDomElement:function(e){var t=this._document,n=t.createElement("div");return n.className=
e||"xModalMask-default",n.style.cssText="position:absolute;top:-15000px;left:-15000px;visibility:hidden;display:block;",t.body.appendChild(n)},_clearMouseOutTimer:function(){aria.core.Timer.cancelCallback(this._mouseOutTimer)},_defaultBeforeOpenCallback:function(){return!0},_defaultBeforeCloseCallback:function(){return!0},_detachMouseOverListener:function(){aria.utils.Event.removeListener(this.getDomElement(),"mouseover",{fn:this._clearMouseOutTimer})},_getComputedStyle:function(){var e,t;this.isOpen&&this.computedStyle
.zIndex?t=this.computedStyle.zIndex:t=aria.popups.PopupManager.getZIndexForPopup(this),this.conf.preferredWidth>0?e={width:this.conf.preferredWidth,height:0}:e=this._getFreeSize();var n=this._getPosition(e),r={top:n.top,left:n.left,height:e.height,width:e.width,zIndex:t};return r},_getFreeSize:function(){var e=this.domElement,t=aria.core.Browser;e.style.cssText="position:absolute;top:-15000px;left:-15000px;visibility:hidden;display:block;";var n=t.isIE9||t.isIE10?e.offsetWidth+1:e.offsetWidth;return{width:n,
height:e.offsetHeight}},_getPosition:function(e){var t,n;if(this.conf.maximized){var r=this.conf.offset;t={top:-r.top,left:-r.left}}else if(this.conf.center){var r=this.conf.offset,i={width:e.width+r.left+r.right,height:e.height+r.top+r.bottom};t=aria.utils.Dom.centerInViewport(i,this.reference),t=aria.utils.Dom.fitInViewport(t,i,this.reference)}else{var s=0,o;do o=this.preferredPositions[s],t=this._getPositionForAnchor(o,e),n=aria.utils.Dom.isInViewport(t,e),s++;while(!n&&this.preferredPositions[s]);var u={
name:"onPositioned"};n?u.position=this.preferredPositions[s-1]:(t=this._getPositionForAnchor(this.preferredPositions[0],e),t=aria.utils.Dom.fitInViewport(t,e)),this.$raiseEvent(u)}return t},_getPositionForAnchor:function(e,t){var n=this.reference,r=e.reference,i=e.popup,s=this.referencePosition.top,o=this.referencePosition.left;r.indexOf(this.ANCHOR_BOTTOM)!=-1&&(s+=this.referenceSize.height),r.indexOf(this.ANCHOR_RIGHT)!=-1&&(o+=this.referenceSize.width);var u=e.offset||this.conf.offset;i.indexOf(this.ANCHOR_BOTTOM
)!=-1?(s-=t.height,s-=u.bottom):i.indexOf(this.ANCHOR_TOP)!=-1&&(s+=u.top),i.indexOf(this.ANCHOR_RIGHT)!=-1?(o-=t.width,o-=u.right):i.indexOf(this.ANCHOR_LEFT)!=-1&&(o+=u.left);var a=aria.utils.Dom._getDocumentScroll();o+=a.scrollLeft,s+=a.scrollTop;var f={top:s,left:o};return f},_hide:function(){if(!this.domElement)return;this.domElement.style.cssText="position:absolute;display:none;overflow:auto;";if(this.modalMaskDomElement){this.modalMaskDomElement.style.cssText="position:absolute;display:none";if(this._rootElementOverflow!=-1
){if(aria.core.Browser.isFirefox){var e=aria.utils.Dom._getDocumentScroll();this._rootElement.style.overflow=this._rootElementOverflow,this._rootElement.scrollTop=e.scrollTop,this._rootElement.scrollLeft=e.scrollLeft}else this._rootElement.style.overflow=this._rootElementOverflow;this._rootElementOverflow=-1}}},_isValidAnchor:function(e){var t=e.split(" ");if(t.length>2)return!1;for(var n=0,r=t.length;n<r;n++){var i=t[n];if(!aria.utils.Array.contains(this.ANCHOR_KEYS,i))return!1}return!0},_isValidPosition:function(
e){return this._isValidAnchor(e.reference)&&this._isValidAnchor(e.popup)},_onMouseOutTimeout:function(){this._detachMouseOverListener(),this.close()},_show:function(){if(this.modalMaskDomElement){if(this._rootElementOverflow==-1){this._rootElementOverflow=this._rootElement.style.overflow;if(aria.core.Browser.isFirefox){var e=aria.utils.Dom._getDocumentScroll();this._rootElement.style.overflow="hidden",this._rootElement.scrollTop=e.scrollTop,this._rootElement.scrollLeft=e.scrollLeft}else this._rootElement.style
.overflow="hidden"}var t=aria.utils.Dom._getViewportSize(),n=this._rootElement.scrollWidth,r=this._rootElement.scrollHeight;r=Math.max(t.height,r),n=Math.max(t.width,n),this.computedStyle=this._getComputedStyle(),this.modalMaskDomElement.style.cssText=["left:0px;top:0px;","width:",n,"px;","height:",r,"px;","z-index:",this.computedStyle.zIndex,";","position:absolute;display:block;"].join("")}else this.computedStyle=this._getComputedStyle();this.domElement.style.cssText=["top:",this.computedStyle.top,"px;","left:"
,this.computedStyle.left,"px;","z-index:",this.computedStyle.zIndex,";","position:absolute;display:inline-block;"].join(""),aria.core.Browser.isIE7&&!this.isOpen&&this._document.body.appendChild(this.domElement)},refresh:function(){this.isOpen&&this._show()},moveTo:function(e){e&&("center"in e&&(this.conf.center=e.center),"absolutePosition"in e&&this.setPositionAsReference(e.absolutePosition)),this.refresh(),this.refreshProcessingIndicators()},cancelMouseOutTimer:function(){this._mouseOutTimer&&this._clearMouseOutTimer
()},close:function(e){if(this.isOpen){var t={name:"onBeforeClose",cancelClose:!1,domEvent:e};this.$raiseEvent(t),t.cancelClose||(this._hide(),this.isOpen=!1,aria.popups.PopupManager.onPopupClose(this),this.$raiseEvent("onAfterClose"))}},closeOnMouseClick:function(e){if(this.conf.closeOnMouseClick){var t={name:"onMouseClickClose",cancelClose:!1,domEvent:e};return this.$raiseEvent(t),this.close(e),!0}},closeOnMouseOut:function(e){this.conf.closeOnMouseOut&&(this.conf.closeOnMouseOutDelay?(this.cancelMouseOutTimer
(),this._mouseOutTimer=aria.core.Timer.addCallback({fn:this._onMouseOutTimeout,scope:this,delay:this.conf.closeOnMouseOutDelay}),this._attachMouseOverListener()):this.close(e))},closeOnMouseScroll:function(e){if(this.conf.closeOnMouseScroll)return this.close(e),!0},_isScrolling:function(){var e=this.reference;if(e){var t=aria.utils.Dom.getGeometry(e);t?(this.referencePosition={left:t.x,top:t.y},this.referenceSize={width:t.width,height:t.height},this.refresh(),this.domElement&&this.domElement.style.visibility==="hidden"&&
(this.domElement.style.visibility="visible")):this.domElement.style.visibility="hidden"}},getDomElement:function(){return this.domElement},open:function(e){this.isOpen||(this.$raiseEvent("onBeforeOpen"),this._applyConfig(e),this._show(),this.isOpen=!0,aria.popups.PopupManager.onPopupOpen(this),this.refreshProcessingIndicators(),this.$raiseEvent("onAfterOpen"))},setPreferredPositions:function(e){this.preferredPositions=[];for(var t=0,n=e.length;t<n;t++){var r=e[t];this._isValidPosition(r)&&(this.preferredPositions
[this.preferredPositions.length]=r)}},setPositionAsReference:function(e){var t={height:0,width:0};e={top:e.top,left:e.left},this.reference=null,this.referencePosition=e,this.referenceSize=t},setReference:function(e){var t=aria.utils.Size.getSize(e),n=aria.utils.Dom;n.scrollIntoView(e);var r=n.calculatePosition(e);this.reference=e,this.referencePosition=r,this.referenceSize=t},setSection:function(e){aria.utils.Dom.replaceHTML(this.domElement,e.html);var t=this.domElement.firstChild;e.initWidgets(),this.section=
e},refreshProcessingIndicators:function(){this.section&&this.section.refreshProcessingIndicator(!0)}}});
//*******************
//LOGICAL-PATH:aria/popups/PopupManager.js
//*******************
(function(){var e=null,t=null,n=null;Aria.classDefinition({$classpath:"aria.popups.PopupManager",$dependencies:["aria.DomEvent","aria.utils.Event","aria.utils.Array","aria.utils.Dom","aria.utils.Math","aria.templates.NavigationManager","aria.utils.AriaWindow"],$events:{modalPopupPresent:{description:""},modalPopupAbsent:{description:""},popupOpen:{description:"",properties:{popup:"Reference to the popup"}},popupClose:{description:"",properties:{popup:"Reference to the popup"}}},$onload:function(){e=aria.utils
.Array,t=aria.utils.Dom,n=aria.utils.Event},$onunload:function(){e=null,t=null,n=null},$singleton:!0,$constructor:function(){this.openedPopups=[],this.modalPopups=0,this.popups=[],this.baseZIndex=2e4,this.currentZIndex=this.baseZIndex,aria.utils.AriaWindow.$on({unloadWindow:this._reset,scope:this})},$destructor:function(){aria.utils.AriaWindow.$unregisterListeners(this),this._reset()},$prototype:{_reset:function(){this._closeAllPopups(),this._unregisterAllPopups(),this.disconnectEvents()},_closeAllPopups:function(
){for(var e=this.openedPopups.length-1;e>=0;e--){var t=this.openedPopups[e];t.close()}},_isEventInsidePopup:function(e,t){var n=aria.utils.Dom._getDocumentScroll(),r={top:e.clientY+n.scrollTop,left:e.clientX+n.scrollLeft},i={top:t.computedStyle.top,left:t.computedStyle.left},s={width:t.computedStyle.width,height:t.computedStyle.height};return r.top>=i.top&&r.left>=i.left&&r.top<=i.top+s.height&&r.left<=i.left+s.width},_unregisterAllPopups:function(){for(var e=this.popups.length-1;e>=0;e--){var t=this.popups[
e];this.unregisterPopup(t)}},connectEvents:function(){this.disconnectEvents(),aria.utils.AriaWindow.attachWindow(),this._document=Aria.$window.document,n.addListener(this._document,"mousedown",{fn:this.onDocumentClick,scope:this},!0),n.addListener(this._document,"mouseout",{fn:this.onDocumentMouseOut,scope:this},!0),n.addListener(this._document,"mousewheel",{fn:this.onDocumentMouseScroll,scope:this},!0),aria.core.Browser.isIE?aria.utils.Event.addListener(Aria.$window,"mousewheel",{fn:this._onScroll,scope:this
},!0):aria.utils.Event.addListener(Aria.$window,"scroll",{fn:this._onScroll,scope:this},!0)},disconnectEvents:function(){this._document&&(n.removeListener(this._document,"mousedown",{fn:this.onDocumentClick}),n.removeListener(this._document,"mouseout",{fn:this.onDocumentMouseOut}),n.removeListener(this._document,"mousewheel",{fn:this.onDocumentMouseScroll}),aria.utils.AriaWindow.detachWindow(),this._document=null,aria.core.Browser.isIE?aria.utils.Event.removeListener(Aria.$window,"mousewheel",{fn:this._onScroll
}):aria.utils.Event.removeListener(Aria.$window,"scroll",{fn:this._onScroll}))},connectModalEvents:function(){n.addListener(this._document.body,"focusin",{fn:this.onDocumentFocusIn,scope:this})},disconnectModalEvents:function(){n.removeListener(this._document.body,"focusin",{fn:this.onDocumentFocusIn})},_onScroll:function(e){for(var t=this.openedPopups.length-1;t>=0;t--){var n=this.openedPopups[t];e.type==="mousewheel"?aria.core.Timer.addCallback({fn:n._isScrolling,scope:n}):e.type==="scroll"&&n._isScrolling
()}},getZIndexForPopup:function(e){return this.currentZIndex+=10,this.currentZIndex},hide:function(e){e.close(),e.$dispose()},onDocumentFocusIn:function(e){var n=new aria.DomEvent(e),r=n.target,i=r!=this._document.body;if(i)for(var s=this.openedPopups.length-1;s>=0;s--){var o=this.openedPopups[s];if(t.isAncestor(r,o.getDomElement()))break;if(o.modalMaskDomElement){aria.templates.NavigationManager.focusFirst(o.domElement);break}}n.$dispose()},onDocumentClick:function(e){var n=new aria.DomEvent(e),r=n.target;if(
this.openedPopups.length===0){n.$dispose();return}var i=this.openedPopups[this.openedPopups.length-1],s=!1;for(var o=0,u=i._ignoreClicksOn.length;o<u;o++)if(t.isAncestor(r,i._ignoreClicksOn[o])){s=!0;break}!s&&!t.isAncestor(r,i.getDomElement())&&i.closeOnMouseClick(n),n.$dispose()},onDocumentMouseOut:function(e){var n=new aria.DomEvent(e),r=n.target,i=n.relatedTarget;for(var s=this.openedPopups.length-1;s>=0;s--){var o=this.openedPopups[s];!t.isAncestor(i,o.getDomElement())&&t.isAncestor(r,o.getDomElement())&&
o.closeOnMouseOut(n)}n.$dispose()},onDocumentMouseScroll:function(e){var n=new aria.DomEvent(e),r=n.target,i=!1,s=[];for(var o=this.openedPopups.length-1;o>=0;o--){var u=this.openedPopups[o];if(!t.isAncestor(r,u.getDomElement())){var a=u.closeOnMouseScroll(n);if(a)break}}n.$dispose()},onPopupOpen:function(t){e.isEmpty(this.openedPopups)&&this.connectEvents(),t.modalMaskDomElement&&(this.modalPopups===0&&(this.connectModalEvents(),this.$raiseEvent("modalPopupPresent")),this.modalPopups+=1),this.openedPopups.push
(t),this.$raiseEvent({name:"popupOpen",popup:t})},onPopupClose:function(t){e.remove(this.openedPopups,t),t.modalMaskDomElement&&(this.modalPopups-=1,this.modalPopups===0&&(this.disconnectModalEvents(),this.$raiseEvent("modalPopupAbsent"))),e.isEmpty(this.openedPopups)&&this.disconnectEvents(),this.$raiseEvent({name:"popupClose",popup:t})},registerPopup:function(t){e.contains(this.popups,t)||this.popups.push(t)},show:function(e){var t=new aria.popups.Popup;return t.open(e),t},unregisterPopup:function(t){e.contains
(this.openedPopups,t)&&e.remove(this.openedPopups,t),e.contains(this.popups,t)&&e.remove(this.popups,t),e.isEmpty(this.openedPopups)&&(this.currentZIndex=this.baseZIndex)},getPopupFromDom:function(e){var t=this.popups;for(var n=0,r=t.length;n<r;n++){var i=t[n];if(i.domElement==e)return i}return null}}})})();
//*******************
//LOGICAL-PATH:aria/utils/environment/Number.js
//*******************
Aria.classDefinition({$classpath:"aria.utils.environment.Number",$extends:"aria.core.environment.EnvironmentBase",$dependencies:["aria.utils.environment.NumberCfgBeans"],$singleton:!0,$prototype:{_cfgPackage:"aria.utils.environment.NumberCfgBeans.AppCfg",getCurrencyFormats:function(){return this.checkApplicationSettings("currencyFormats")},getDecimalFormatSymbols:function(){return this.checkApplicationSettings("decimalFormatSymbols")}}});
//*******************
//LOGICAL-PATH:aria/utils/environment/NumberCfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.utils.environment.NumberCfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes",environmentBase:"aria.core.environment.EnvironmentBaseCfgBeans"},$beans:{AppCfg:{$type:"json:Object",$description:"",$restricted:!1,$properties:{decimalFormatSymbols:{$type:"DecimalFormatSymbols",$description:"",$default:{}},currencyFormats:{$type:"CurrencyFormatsCfg",$description:"",$default:{}}}},DecimalFormatSymbols:{$type:"json:Object",$description:"",$properties:{decimalSeparator
:{$type:"json:String",$description:"",$default:"."},groupingSeparator:{$type:"json:String",$description:"",$default:","},strictGrouping:{$type:"json:Boolean",$description:"",$default:!1}}},CurrencyFormatsCfg:{$type:"json:Object",$description:"",$properties:{currencyFormat:{$type:"environmentBase:FormatTypes",$description:"",$default:"#.######"},currencySymbol:{$type:"environmentBase:FormatTypes",$description:"",$default:"USD"}}}}});