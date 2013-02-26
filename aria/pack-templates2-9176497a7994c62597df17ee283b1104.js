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
//LOGICAL-PATH:aria/templates/TextTemplate.js
//*******************
Aria.classDefinition({$classpath:"aria.templates.TextTemplate",$extends:"aria.templates.BaseTemplate",$dependencies:["aria.templates.TxtCtxt"],$constructor:function(){this.$BaseTemplate.constructor.call(this)},$destructor:function(){this.$BaseTemplate.$destructor.call(this)},$prototype:{data:{},$init:function(e,t){e.$BaseTemplate.constructor.classDefinition.$prototype.$init(e,t),aria.templates.TextTemplate.processTextTemplate=function(e){var t=new aria.templates.TxtCtxt;t.initTemplate({classpath:this.prototype
.$classpath,data:e});var n=t.getTextTemplateContent();return t.$dispose(),n}}}});
//*******************
//LOGICAL-PATH:aria/templates/TxtClassGenerator.js
//*******************
Aria.classDefinition({$classpath:"aria.templates.TxtClassGenerator",$extends:"aria.templates.ClassGenerator",$singleton:!0,$dependencies:["aria.templates.TxtParser"],$constructor:function(){this.$ClassGenerator.constructor.call(this),this._loadStatements(["TextTemplate"]),this._parser=aria.templates.TxtParser,this._superClass="aria.templates.TextTemplate",this._classType="TXT",this._rootStatement="TextTemplate",this._templateParamBean="aria.templates.CfgBeans.TextTemplateCfg"},$prototype:{_writeClassInit:function(
e){var t=e.templateParam;e.enterBlock("classInit"),e.writeln(e.templateParam.$classpath,".processTextTemplate = aria.templates.TextTemplate.processTextTemplate;"),e.leaveBlock(),this.$ClassGenerator._writeClassInit.call(this,e)}}});
//*******************
//LOGICAL-PATH:aria/templates/TxtCtxt.js
//*******************
Aria.classDefinition({$classpath:"aria.templates.TxtCtxt",$extends:"aria.templates.BaseCtxt",$implements:["aria.templates.IBaseTemplate"],$constructor:function(e){this.$BaseCtxt.constructor.apply(this,arguments),this.tplClasspath=null},$destructor:function(){if(this._tpl){try{this._tpl.$dispose()}catch(e){this.$logError(this.TEMPLATE_DESTR_ERROR,[this.tplClasspath],e)}aria.templates.IBaseTemplate.prototype.$destructor.call(this._tpl),this._tpl=null}this.$BaseCtxt.$destructor.call(this)},$prototype:{initTemplate
:function(e){if(!aria.core.JsonValidator.normalize({json:e,beanName:"aria.templates.CfgBeans.InitTxtTemplateCfg"}))return!1;this._cfg=e;var t;try{t=Aria.getClassInstance(e.classpath)}catch(n){return this.$logError(this.TEMPLATE_CONSTR_ERROR,[e.classpath],n),!1}this._tpl=t,this.tplClasspath=e.classpath,aria.templates.IBaseTemplate.call(t,this);var r=this;return t.__$write=function(e){return r.__$write.call(r,e)},t.__$initTemplate()?(t.data=e.data,!0):!1},getTextTemplateContent:function(){this.$assert(19,this.
_out==null),this._out=[],this._callMacro(this._out,"main");var e=this._out.join("");return this._out=null,e},__$write:function(e){this._out.push(e)}}});
//*******************
//LOGICAL-PATH:aria/templates/ViewCfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.templates.ViewCfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes"},$beans:{Item:{$type:"json:Object",$description:"",$properties:{value:{$type:"json:MultiTypes",$description:""},initIndex:{$type:"json:MultiTypes",$description:"",$mandatory:!0,$contentTypes:[{$type:"json:Integer",$description:""},{$type:"json:String",$description:""}]},filteredIn:{$type:"json:Boolean",$description:"",$mandatory:!0},sortKey:{$type:"json:String",$description:""},pageIndex:{$type
:"json:Integer",$description:"",$mandatory:!0}}},Pages:{$type:"json:Object",$description:"",$properties:{pageIndex:{$type:"json:Integer",$description:""},pageNumber:{$type:"json:Integer",$description:""},firstItemIndex:{$type:"json:Integer",$description:""},lastItemIndex:{$type:"json:Integer",$description:""},firstItemNumber:{$type:"json:Integer",$description:""},lastItemNumber:{$type:"json:Integer",$description:""}}}}});