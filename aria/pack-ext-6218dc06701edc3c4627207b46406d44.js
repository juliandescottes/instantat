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
//LOGICAL-PATH:aria/ext/BundleAnalyzer.js
//*******************
Aria.classDefinition({$classpath:"aria.ext.BundleAnalyzer",$singleton:!0,$constructor:function(){this._evalContext="var Aria={},p;Aria.resourcesDefinition=function(c){p={type:'res',path:c.$classpath}};";for(var e in Aria)Aria.hasOwnProperty(e)&&Aria[e]&&Aria[e].call&&e!=="resourcesDefinition"&&(this._evalContext+="Aria."+e+"=function(){};")},$prototype:{getReport:function(){var e=aria.core.Cache.content,t=[];for(var n in e.urls)e.urls.hasOwnProperty(n)&&t.push(n);var r={},i=[],s=[];for(n in e.classes)e.classes
.hasOwnProperty(n)&&(r[aria.core.Cache.getFilename(n)]=!0);for(n in e.files)if(e.files.hasOwnProperty(n))if(e.files[n].status!==aria.core.Cache.STATUS_AVAILABLE)s.push(n);else{var o=this._getClassDescription(e.files[n].value);o?o.type==="res"&&!e.classes[o.path]&&i.push(n):r[n]||i.push(n)}return{downloaded:t,useless:i,error:s}},_getClassDescription:function(classContent){try{return eval("(function(){"+this._evalContext+classContent+";return p})()")}catch(ex){}}}});
//*******************
//LOGICAL-PATH:aria/ext/StressCss.js
//*******************
(function(){function v(e,t){return t.toUpperCase()}var e={},t=null,n=null,r=-1,i=function(e,t){if(e!==!0)aria.templates.CSSMgr.__textToDOM(aria.utils.Object.keys(aria.templates.CSSMgr.__styleTagPool));else{var n={};for(var r in aria.templates.CSSMgr.__styleTagPool)aria.templates.CSSMgr.__styleTagPool.hasOwnProperty(r)&&(n[r]=r==="tpl"&&t?[t]:[]);aria.templates.CSSMgr.__reloadStyleTags(n)}},s=function(){var e=aria.ext.StressCss;e.original__load=aria.templates.CSSMgr.__load,e.original__unload=aria.templates.CSSMgr
.__unload,aria.templates.CSSMgr.__load=function(){return[]},aria.templates.CSSMgr.__unload=function(){},i()},o=function(){var e=aria.ext.StressCss;aria.templates.CSSMgr.__load=e.original__load,aria.templates.CSSMgr.__unload=e.original__unload,i()},u=function(e,t){var n=null,r=[],i=aria.utils.String.trim,s=/[\s]*(([^{]+)\{[^}]+\})/g;while(n=s.exec(e))r.push({name:t+": "+i(n[2]),descriptor:n[1],location:t});return r},a=function(e){var t=aria.templates.CSSMgr,n=t.__textLoaded,r=[];for(var i in n)if(n.hasOwnProperty
(i)){if(e!==!0&&t.__styleTagAssociation[i]==="wgt")continue;r=r.concat(u(n[i].text,i))}return r},f=function(e,t){if(!e){if(!t)return;i(!0)}else{var n=aria.templates.CSSMgr.__textLoaded[e.location];e.original=n.text,t?i(!0,e.descriptor):(n.text=n.text.replace(e.descriptor,""),i())}},l=function(e,t){if(!e){if(!t)return;i()}else aria.templates.CSSMgr.__textLoaded[e.location].text=e.original,i()},c=function(e){e.callback&&e.callback.fn.apply(e.callback.scope,e.callback.args)},h=function(t){var n=+(new Date);t.runTime=
n-t.start,e[t.name]={name:t.name,runTime:t.runTime,baseline:e.__baseline__?e.__baseline__.runTime-t.runTime:NaN},l(t.selector,t.cfg.incremental),setTimeout(function(){c(t)},15)},p=function(e,t){return function(){setTimeout(function(){d.call(t,e)},0)}},d=function(e){if(e.iteration>=e.cfg.repeat)return h(e);e.iteration+=1,e.cfg.action.call(null,e.name,e.iteration-1,p(e,this))},m=function(e,t){for(var n in t)if(t.hasOwnProperty(n))try{var r=n.replace(/\-([a-z])/ig,v),i=t[n];e.style[r]=typeof i=="number"&&r!="zIndex"?
i+"px":i}catch(s){}},g=function(){if(t)return t.parentNode.removeChild(t),t=null,!1},y=function(){var e=Aria.$window.document;t=e.createElement("iframe");var i=e.createElement("iframe");t.scrolling="no",t.frameBorder="no",e.body.appendChild(t),t.doc=t.contentDocument||t.contentWindow.document,t.doc.write("<html><head></head><body></body></html>"),t.doc.close(),n=t.doc.createElement("div");var s=t.doc.createElement("a");t.resize=function(){if(t){var e=t.doc.body;m(t,{width:e.scrollWidth,height:e.scrollHeight}
)}},r=setInterval(t.resize,100),m(t,{position:"fixed",top:10,right:10,zIndex:1e4,background:"white",padding:2,border:"solid 2px #aaa",width:250,height:60,borderRadius:4,boxShadow:"0 0 8px #eee"}),m(t.doc.body,{font:"12px Helvetica,Arials,sans-serif",color:"#444"}),m(n,{whiteSpace:"nowrap"}),s.innerHTML="&#215;",m(s,{position:"absolute",top:0,right:0,textDecoration:"none",fontWeight:"bold",cursor:"pointer",color:"red",fontSize:"1.3em",lineHeight:8}),s.onclick=function(){return s.onclick=null,clearInterval(r),
s=null,i.parentNode.removeChild(i),g()},m(i,{height:Aria.$window.screen.height*2,width:Aria.$window.screen.width,position:"absolute",top:0,left:0,visible:"hidden",display:"none",zIndex:0}),e.body.appendChild(i),t.doc.body.appendChild(s),t.doc.body.appendChild(n)},b=function(e){var t=!e.selector||e.selector.name==="*";if(!n)return;var r=e.cfg.allSelectors.length,i="Testing <strong>"+(t?e.name:e.selector.name)+"</strong>",s="<br />"+(t?"baseline":e.selector.location),o="<br />"+r+" remaining test"+(r===1?"":"s"
);n.innerHTML=i+s+o},w=function(r){if(!t||!e)return;var i="<table><thead><tr><th>Selector</th><th> </th><th>ms</th><th>Total</th></tr></thead><tbody>",s=[];for(var o in e)e.hasOwnProperty(o)&&o!=="__baseline__"&&s.push(e[o]);var u=s.sort(function(e,t){return e.baseline===t.baseline?0:r?e.baseline>t.baseline?1:-1:e.baseline>t.baseline?-1:1}).slice(0,20);for(var a=0,f=u.length;a<f;a+=1){var l=u[a];i+='<tr><td style="font:11px monospace">Removing <strong>'+l.name+'</strong></td><td style="text-align:right">'+(l
.baseline>0?'<span style="color:green">saves</span>':'<span style="color:red">adds</span>')+'</td><td style="text-align:right; font:11px monospace">'+Math.abs(l.baseline)+"ms</td>"+'<td style="text-align:right; font:11px monospace">'+l.runTime+"ms</td></tr>\n"}i+="</tbody></table><hr/>",i+='<table><tr><td style="text-align:right; font:10px monospace">Selectors Tested:</td><td style="font:10px monospace">'+s.length+"</td></tr>"+'<tr><td style="text-align:right; font:10px monospace">Baseline Time:</td><td style="font:10px monospace">'+
e.__baseline__.runTime+"ms</td></tr>",m(t,{width:600}),n.innerHTML=i},E=function(e){e.iteration=0,f(e.selector,e.cfg.incremental),b(e),e.start=+(new Date),d(e)},S=function(e,t){if(e.allSelectors.length>0){var n=e.allSelectors.splice(0,1)[0],r={name:n.name,cfg:e,selector:n,callback:{fn:S,scope:this,args:[e,t]}};E(r)}else w(e.incremental),aria.ext.StressCss.__callback(t)},x=function(t,n){e={};var r={name:"__baseline__",cfg:t,selector:null,callback:{fn:S,scope:this,args:[t,n]}};E(r)},T={repeat:2,silent:!1,widget
:!1,action:function(e,t,n){for(var r=0,i=Aria.rootTemplates.length;r<i;r+=1)Aria.rootTemplates[r].$refresh();n()},incremental:!1},N=function(e){e=e||{};for(var t in T)T.hasOwnProperty(t)&&!(t in e)&&(e[t]=T[t]);return e.allSelectors=a(e.widget),e};Aria.classDefinition({$classpath:"aria.ext.StressCss",$singleton:!0,$dependencies:["aria.utils.Object","aria.utils.String"],$prototype:{stressTest:function(e,t){s(),e=N(e),g(),e.silent||y(),x(e,t)},getResults:function(){return e},__callback:function(e){o(),this.$callback
(e)}}})})();
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/Generator.js
//*******************
Aria.classDefinition({$classpath:"aria.ext.filesgenerator.Generator",$extends:"aria.core.JsObject",$singleton:!0,$dependencies:["aria.core.JsonValidator","aria.ext.filesgenerator.GeneratorBeans"],$texts:{classTxtTplHandle:"aria.ext.filesgenerator.tpl.Class",interfaceTxtTplHandle:"aria.ext.filesgenerator.tpl.Interface",htmlTemplateTxtTplHandle:"aria.ext.filesgenerator.tpl.HtmlTemplate",cssTemplateTxtTplHandle:"aria.ext.filesgenerator.tpl.CssTemplate",templateScriptTxtTplHandle:"aria.ext.filesgenerator.tpl.TemplateScript"
,macroLibraryTxtTplHandle:"aria.ext.filesgenerator.tpl.MacroLibrary",cssLibraryTxtTplHandle:"aria.ext.filesgenerator.tpl.CssLibrary",flowControllerTxtTplHandle:"aria.ext.filesgenerator.tpl.FlowController",moduleControllerTxtTplHandle:"aria.ext.filesgenerator.tpl.ModuleController",moduleControllerInterfaceTxtTplHandle:"aria.ext.filesgenerator.tpl.ModuleControllerInterface",flowControllerInterfaceTxtTplHandle:"aria.ext.filesgenerator.tpl.FlowControllerInterface",bootstrapTxtTplHandle:"aria.ext.filesgenerator.tpl.Bootstrap"
},$statics:{TYPE_CLASS:"class",TYPE_INTERFACE:"interface",TYPE_HTMLTEMPLATE:"htmlTemplate",TYPE_CSSTEMPLATE:"cssTemplate",TYPE_TEMPLATESCRIPT:"templateScript",TYPE_MACROLIBRARY:"macroLibrary",TYPE_CSSLIBRARY:"cssLibrary",TYPE_FLOWCONTROLLER:"flowController",TYPE_MODULECONTROLLER:"moduleController",TYPE_MODULECONTROLLERINTERFACE:"moduleControllerInterface",TYPE_FLOWCONTROLLERINTERFACE:"flowControllerInterface",TYPE_BOOTSTRAP:"bootstrap"},$constructor:function(){this.__classNameCounter=0},$prototype:{generateFile
:function(e,t){if(e){e=this.__isAllowedType("TYPE_"+e.toUpperCase());if(e){var n=this.__getSkeleton(this[e+"TxtTplHandle"],"aria.ext.filesgenerator.GeneratorBeans."+e+"SkeletonTemplate",t);return{type:e,classpath:n.cfg.$classpath,content:n.content}}}return null},generateHtmlTemplate:function(e,t,n){var r=[],i={$classpath:e};if(t){var s=e+"Script";i.$hasScript=!0,r.push(this.generateFile(this.TYPE_TEMPLATESCRIPT,{$classpath:s}))}if(n){var o=e+"Style";i.$css=[o],r.push(this.generateFile(this.TYPE_CSSTEMPLATE,{
$classpath:o}))}return r.push(this.generateFile(this.TYPE_HTMLTEMPLATE,i)),r},generateModuleCtrl:function(e,t){var n=[],r=e.lastIndexOf("."),i=e.substring(0,r),s=e.substring(r+1),o=i+".I"+s;n.push(this.generateFile(this.TYPE_MODULECONTROLLERINTERFACE,{$classpath:o,$description:e+" public interface definition"})),n.push(this.generateFile(this.TYPE_MODULECONTROLLER,{$classpath:e,$description:"",$publicInterface:o,$hasFlowCtrl:t}));if(t){var u=i+".I"+s+"Flow",a=e+"Flow";n.push(this.generateFile(this.TYPE_FLOWCONTROLLERINTERFACE
,{$classpath:u,$description:a+" public interface definition"})),n.push(this.generateFile(this.TYPE_FLOWCONTROLLER,{$classpath:a,$publicInterface:u,$description:""}))}return n},getUniqueClasspathIn:function(e){return e+"."+"Class"+this.__classNameCounter++},__isAllowedType:function(e){return aria.utils.Json.getValue(this,e)},__getSkeleton:function(e,t,n){return n||(n={}),aria.core.JsonValidator.normalize({json:n,beanName:t}),{cfg:n,content:e.processTextTemplate(n)}}}});
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/GeneratorBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.ext.filesgenerator.GeneratorBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes"},$beans:{classSkeletonTemplate:{$type:"json:Object",$description:"",$properties:{$classpath:{$type:"json:String",$description:"",$default:"company.package.Class"},$description:{$type:"json:String",$description:"",$default:"The description of this class and how it should be used"},$extends:{$type:"json:String",$description:"",$default:"aria.core.JsObject"},$singleton:{$type:"json:Boolean"
,$description:"",$default:!1},$dependencies:{$type:"json:Array",$description:"",$default:null,$contentType:{$type:"json:String",$description:""}},$implements:{$type:"json:Array",$description:"",$default:null,$contentType:{$type:"json:String",$description:""}}}},interfaceSkeletonTemplate:{$type:"json:Object",$description:"",$properties:{$classpath:{$type:"json:String",$description:"",$default:"company.package.IClass"},$description:{$type:"json:String",$description:"",$default:"The description of this interface and how it should be implemented"
},$extends:{$type:"json:String",$description:"",$default:null}}},htmlTemplateSkeletonTemplate:{$type:"json:Object",$description:"",$properties:{$classpath:{$type:"json:String",$description:"",$default:"company.package.MyTemplate"},$extends:{$type:"json:String",$description:"",$default:null},$hasScript:{$type:"json:Boolean",$description:"",$default:!1},$css:{$type:"json:Array",$description:"",$default:null,$contentType:{$type:"json:String",$description:""}},content:{$type:"json:String",$description:""}}},cssTemplateSkeletonTemplate
:{$type:"json:Object",$description:"",$properties:{$classpath:{$type:"json:String",$description:"",$default:"company.package.MyCssTemplate"},$hasScript:{$type:"json:Boolean",$description:"",$default:!1}}},templateScriptSkeletonTemplate:{$type:"json:Object",$description:"",$properties:{$classpath:{$type:"json:String",$description:"",$default:"company.package.MyTemplateScript"}}},macroLibrarySkeletonTemplate:{$type:"json:Object",$description:"",$properties:{$classpath:{$type:"json:String",$description:"",$default
:"company.package.MyTemplateScript"},$hasScript:{$type:"json:Boolean",$description:"",$default:!1}}},cssLibrarySkeletonTemplate:{$type:"json:Object",$description:"",$properties:{$classpath:{$type:"json:String",$description:"",$default:"company.package.MyTemplateScript"},$hasScript:{$type:"json:Boolean",$description:"",$default:!1}}},flowControllerSkeletonTemplate:{$type:"json:Object",$description:"",$properties:{$classpath:{$type:"json:String",$description:"",$default:"company.package.MyFlowController"},$description
:{$type:"json:String",$description:"",$default:"The description of this flow controller implementation"},$publicInterface:{$type:"json:String",$description:"",$default:"company.package.IMyFlowController"},$implements:{$type:"json:Array",$description:"",$default:[],$contentType:{$type:"json:String",$description:""}},$extends:{$type:"json:String",$description:"",$default:"aria.templates.FlowCtrl"},$dependencies:{$type:"json:Array",$description:"",$default:null,$contentType:{$type:"json:String",$description:""}
}}},moduleControllerSkeletonTemplate:{$type:"json:Object",$description:"",$properties:{$classpath:{$type:"json:String",$description:"",$default:"company.package.MyModuleController"},$publicInterface:{$type:"json:String",$description:"",$default:"company.package.IMyModuleController"},$implements:{$type:"json:Array",$description:"",$default:[],$contentType:{$type:"json:String",$description:""}},$extends:{$type:"json:String",$description:"",$default:"aria.templates.ModuleCtrl"},$description:{$type:"json:String"
,$description:"",$default:"The description of this module controller implementation"},$dependencies:{$type:"json:Array",$description:"",$default:null,$contentType:{$type:"json:String",$description:""}},$hasFlowCtrl:{$type:"json:Boolean",$description:"",$default:!1}}},moduleControllerInterfaceSkeletonTemplate:{$type:"interfaceSkeletonTemplate",$description:""},flowControllerInterfaceSkeletonTemplate:{$type:"interfaceSkeletonTemplate",$description:""},bootstrapSkeletonTemplate:{$type:"json:Object",$description
:"",$properties:{$classpath:{$type:"json:String",$description:"",$default:"company.package.MyTemplate"},$fwkpath:{$type:"json:String",$description:""},$fwkskin:{$type:"json:String",$description:""},$moduleCtrl:{$type:"json:String",$description:"",$default:null}}}}});
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/Bootstrap.tpl.txt
//*******************
{TextTemplate {$classpath: 'aria.ext.filesgenerator.tpl.Bootstrap'}}
{macro main()}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

        <title>My Title</title>

        <!-- load the framework entry point -->
        <script type="text/javascript" src="${data.$fwkpath}"></script>
        <script type="text/javascript" src="${data.$fwkskin}"></script>
</head>
<body>
        <div id='container'></div>
        <script type="text/javascript">
                Aria.loadTemplate(\{
                        classpath:"${data.$classpath}",
                        div:"container"{if data.$moduleCtrl},
                        moduleCtrl: \{classpath:"${data.$moduleCtrl}"\}{/if}
                \});
        </script>
</body>
</html>
{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/Class.tpl.txt
//*******************
{TextTemplate {$classpath: 'aria.ext.filesgenerator.tpl.Class'}}
{macro main()}/\**
 * ${data.$description}
 * @class ${data.$classpath}
 * @extends ${data.$extends}{if data.$singleton}
 * @singleton{/if}
 */
Aria.classDefinition(\{
    \$classpath : "${data.$classpath}",
    \$extends : "${data.$extends}",{if data.$singleton}
    \$singleton : true,{/if}{if data.$dependencies}
    \$dependencies : [{foreach d in data.$dependencies}{separator}, {/separator}"${d}"{/foreach}],{/if}{if data.$implements}
    \$implements : [{foreach i in data.$implements}{separator}, {/separator}"${i}"{/foreach}],{/if}
    \$constructor : function () \{\},
    \$destructor : function () \{\},
    \$prototype : \{\}
\});{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/CssLibrary.tpl.txt
//*******************
{TextTemplate {$classpath: 'aria.ext.filesgenerator.tpl.CssLibrary'}}
{macro main()}\{CSSLibrary \{
    \$classpath : "${data.$classpath}",
    \$hasScript : ${data.$hasScript}
\}\}
    \{macro example()\}

    \{/macro\}
\{/CSSLibrary\}{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/CssTemplate.tpl.txt
//*******************
{TextTemplate {$classpath: 'aria.ext.filesgenerator.tpl.CssTemplate'}}
{macro main()}\{CSSTemplate \{
    \$classpath : "${data.$classpath}",
    \$hasScript : ${data.$hasScript}
\}\}
    \{macro main()\}
        
       \{/macro\}
\{/CSSTemplate\}{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/FlowController.tpl.txt
//*******************
{TextTemplate {$classpath: 'aria.ext.filesgenerator.tpl.FlowController'}}
{macro main()}
${(function(){
    var superClassName = data.$extends.split(".");            
    data.superClassName = "\$" + superClassName[superClassName.length-1];            
})()}
/\**
 * ${data.$description}
 * @class ${data.$classpath}
 * @extends ${data.$extends}
 */
Aria.classDefinition(\{
    \$classpath : "${data.$classpath}",
    \$extends : "${data.$extends}",{if data.$dependencies}
    \$dependencies : [{foreach d in data.$dependencies}{separator}, {/separator}"${d}"{/foreach}],{/if}
    \$implements : ["${data.$publicInterface}"{if data.$implements}{foreach i in data.$implements}, "${i}"{/foreach}{/if}],
    \$constructor : function () \{
        this.${data.superClassName}.constructor.call(this);
    \},
    \$destructor : function () \{
        this.${data.superClassName}.$destructor.call(this);
    \},
    \$prototype : \{
        \$publicInterfaceName : "${data.$publicInterface}"
    \}
\});{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/FlowControllerInterface.tpl.txt
//*******************
{TextTemplate {
    $classpath: 'aria.ext.filesgenerator.tpl.FlowControllerInterface',
    $texts : {
        interfaceTxtTpl : 'aria.ext.filesgenerator.tpl.Interface'
    }
}}
{macro main()}${function(){data.$extends = "aria.templates.IFlowCtrl"}()}${interfaceTxtTpl.processTextTemplate(data)}{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/HtmlTemplate.tpl.txt
//*******************
{TextTemplate {$classpath: 'aria.ext.filesgenerator.tpl.HtmlTemplate'}}
{macro main()}\{Template \{
    \$classpath : "${data.$classpath}",{if data.$extends}
    \$extends : "${data.$extends}",{/if}
    \$hasScript : ${data.$hasScript}{if data.$css},
    \$css : [{foreach c in data.$css}{separator}, {/separator}"${c}"{/foreach}]{/if}
\}\}

    {if (data.content)}${data.content}{else/}\{macro main()\}
    \{/macro\}{/if}
    
\{/Template\}
{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/Interface.tpl.txt
//*******************
{TextTemplate {$classpath: 'aria.ext.filesgenerator.tpl.Interface'}}
{macro main()}/\**
 * ${data.$description}
 * @class ${data.$classpath}
 */
Aria.interfaceDefinition(\{
    \$classpath : "${data.$classpath}",{if data.$extends}
    \$extends : "${data.$extends}",{/if}
    \$interface : \{\}
\});{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/MacroLibrary.tpl.txt
//*******************
{TextTemplate {$classpath: 'aria.ext.filesgenerator.tpl.MacroLibrary'}}
{macro main()}\{Library \{
    \$classpath : "${data.$classpath}",
    \$hasScript : ${data.$hasScript}
\}\}
    \{macro sayHello(name)\}
        Hello, $\{name\}!
    \{/macro\}
\{/Library\}{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/ModuleController.tpl.txt
//*******************
{TextTemplate {$classpath: 'aria.ext.filesgenerator.tpl.ModuleController'}}
{macro main()}
${(function(){
    var superClassName = data.$extends.split(".");            
    data.superClassName = "\$" + superClassName[superClassName.length-1];            
})()}
/\**
 * ${data.$description}
 * @class ${data.$classpath}
 * @extends ${data.$extends}
 */
Aria.classDefinition(\{
    \$classpath : "${data.$classpath}",
    \$extends : "${data.$extends}",{if data.$dependencies}
    \$dependencies : [{foreach d in data.$dependencies}{separator}, {/separator}"${d}"{/foreach}],{/if}
    \$implements : ["${data.$publicInterface}"{if data.$implements}{foreach i in data.$implements}, "${i}"{/foreach}{/if}],
    \$constructor : function () \{                    
        this.${data.superClassName}.constructor.call(this);
    \},
    \$destructor : function () \{
        this.${data.superClassName}.$destructor.call(this);
    \},
    \$prototype : \{
        \$publicInterfaceName : "${data.$publicInterface}"{if data.$hasFlowCtrl},
        \$hasFlowCtrl : true{/if}        
    \}
\});{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/ModuleControllerInterface.tpl.txt
//*******************
{TextTemplate {
    $classpath: 'aria.ext.filesgenerator.tpl.ModuleControllerInterface',
    $texts : {
        interfaceTxtTpl : 'aria.ext.filesgenerator.tpl.Interface'
    }
}}
{macro main()}${function(){data.$extends = "aria.templates.IModuleCtrl"}()}${interfaceTxtTpl.processTextTemplate(data)}{/macro}
{/TextTemplate}
//*******************
//LOGICAL-PATH:aria/ext/filesgenerator/tpl/TemplateScript.tpl.txt
//*******************
{TextTemplate {$classpath: 'aria.ext.filesgenerator.tpl.TemplateScript'}}
{macro main()}Aria.tplScriptDefinition(\{
    \$classpath : "${data.$classpath}",
    \$prototype : \{       
            showAlert: function() \{\}
    \}
\});{/macro}
{/TextTemplate}