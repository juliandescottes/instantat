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
//LOGICAL-PATH:aria/tools/IToolsModule.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.tools.IToolsModule",$extends:"aria.templates.IModuleCtrl",$interface:{subModulesList:[]},$events:{bridgeReady:{description:""},modulesReady:{description:""}}});
//*******************
//LOGICAL-PATH:aria/tools/ToolsBridge.js
//*******************
Aria.classDefinition({$classpath:"aria.tools.ToolsBridge",$extends:"aria.utils.Bridge",$singleton:!0,$constructor:function(){this.$Bridge.constructor.call(this)},$prototype:{open:function(){return this.$Bridge.open.call(this,{moduleCtrlClasspath:"aria.tools.ToolsModule",displayClasspath:"aria.tools.ToolsDisplay",title:"Tools"})}}});
//*******************
//LOGICAL-PATH:aria/tools/ToolsDisplay.tpl
//*******************
// Main display for tools
// @class aria.tools.ToolsDisplay
{Template {
    $classpath : 'aria.tools.ToolsDisplay',
    $hasScript : true,
    $width:{min:800}
}}

    {macro main()}

        // display tools list
        
        <div style="width:${$hdim(790,1)}px; padding:5px 5px 0px 5px; background:#444444;">
            {foreach view inArray moduleCtrl.subModulesList}
                {var refpath = view.refpath/}
                {if (moduleCtrl[refpath])}
                    <span style="cursor:pointer; display:inline-block; font-weight:bold; padding:2px 5px; border-left:solid 1px black; border-right:solid 1px black; border-top:solid 1px black;
                        {if (view["view:selected"])}
                            background:white; color:black; border-bottom:solid 1px white;
                        {else/}
                            background:grey; color:white; border-bottom:solid 1px #444444;
                        {/if}
                    " {on click {fn:selectTab, args:refpath}/}>${refpath|capitalize}</span>
                {/if}
            {/foreach}
        </div>

        {foreach view inArray moduleCtrl.subModulesList}
            {var refpath = view.refpath/}
            {if (view["view:selected"] && moduleCtrl[refpath])}
                {@aria:Template {
                    defaultTemplate:view.display,
                    moduleCtrl:moduleCtrl[refpath],
                    width:$hdim(800,1)                
                }/}
            {/if}
        {/foreach}
        
    {/macro}
    

{/Template}
//*******************
//LOGICAL-PATH:aria/tools/ToolsDisplayScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tools.ToolsDisplayScript",$prototype:{$dataReady:function(){this.moduleCtrl.subModulesList.length>0&&(this.moduleCtrl.subModulesList[0]["view:selected"]=!0)},onModuleEvent:function(e){this.$refresh()},selectTab:function(e,t){var n=this.moduleCtrl.subModulesList;for(var r=0,i=n.length;r<i;r++)n[r].refpath==t?n[r]["view:selected"]=!0:n[r]["view:selected"]=!1;this.$refresh()}}});
//*******************
//LOGICAL-PATH:aria/tools/ToolsModule.js
//*******************
Aria.classDefinition({$classpath:"aria.tools.ToolsModule",$extends:"aria.templates.ModuleCtrl",$implements:["aria.tools.IToolsModule"],$constructor:function(){this.subModulesList=[{refpath:"inspector",classpath:"aria.tools.inspector.InspectorModule",display:"aria.tools.inspector.InspectorDisplay"},{refpath:"logger",classpath:"aria.tools.logger.LoggerModule",display:"aria.tools.logger.LoggerDisplay"}],this.bridge=null,this.$ModuleCtrl.constructor.call(this)},$prototype:{$publicInterfaceName:"aria.tools.IToolsModule"
,init:function(e,t){this.bridge=e.bridge;for(var n=0,r=this.subModulesList.length;n<r;n++)this.subModulesList[n].initArgs||(this.subModulesList[n].initArgs={},this.subModulesList[n].initArgs.bridge=this.bridge);this.loadSubModules(this.subModulesList,{fn:this.onSubModulesReady,scope:this}),this.$ModuleCtrl.init.call(this,e,t)},onSubModulesReady:function(){this.$raiseEvent("modulesReady")},onSubModuleEvent:function(e,t){}}});
//*******************
//LOGICAL-PATH:aria/tools/common/ObjectTreeDisplay.tpl
//*******************
// Display an object
{Template {
    $classpath:'aria.tools.common.ObjectTreeDisplay',
    $hasScript:true
}}

    {var typeUtils = aria.utils.Type/}

    {macro main()}    
        <table cellpadding="0" cellspacing="0">
            {call displayElement(data.content, data.title, 0)/}
        </table>
    {/macro}
    
    {macro displayElement(element, name, depth)}
    
    
        <tr>
            // first td -> name
            <td style="padding-left:${depth*20}px; padding-right:10px;">        
    
                {if (element && !element.$classpath && (typeUtils.isArray(element)||typeUtils.isObject(element)))}
                    {if (element["view:ariaDebug:showOpen"+depth])}
                        <span style="cursor:pointer;" {on click {fn:nodeClick, args:{element:element,depth:depth}}/}>{@aria:Icon {icon:"std:collapse"}/} {call displayName(name)/}</span>
                    {else/}
                        <span style="cursor:pointer;" {on click {fn:nodeClick, args:{element:element,depth:depth}}/}>{@aria:Icon {icon:"std:expand"}/} {call displayName(name)/}</span>
                    {/if}
                {else/}
                    <span style="padding-left:16px">&nbsp;{call displayName(name)/}</span> // span used to simulate icon space
                {/if}        
            </td>
            
            // second td -> content
            <td style="vertical-align: top;">
                {if (typeUtils.isArray(element))}
                    <span style="color:orange; cursor:pointer;" {on click {fn:nodeClick, args:{element:element,depth:depth}}/}>Array [${element.length}]</span>
                {elseif (typeUtils.isObject(element))/}
                    <span style="color:orange; cursor:pointer;" {on click {fn:nodeClick, args:{element:element,depth:depth}}/}>Object</span>
                {elseif (element === null)/}
                    <em>null</em>
                {elseif (typeof element == 'undefined')/}
                    <em>undefined</em>
                {elseif (typeUtils.isString(element))/}
                    <span style="color:red">"${element}"</span>
                {elseif (element === true)/}
                    <span style="color:purple">true</span>
                {elseif (element === false)/}
                    <span style="color:purple">false</span>
                {elseif (typeUtils.isNumber(element))/}
                    <span style="color:blue">${element}</span>
                {elseif (element.$classpath)/}
                    ${element.$classpath}
                {else/}
                    <span style="color:green">${typeof element}</span>
                {/if}    
            </td>
        </tr>
        {if (element && element["view:ariaDebug:showOpen"+depth])}
            {var types = filterTypes(element)/}
            {call displaySubElement(element, types.data, depth+1)/}
            {call displaySubElement(element, types.meta, depth+1)/}
        {/if}
                
    {/macro}
    
    {macro displaySubElement(element, types, depth)}
        {foreach key inArray types.booleans}
            {call displayElement(element[key], key, depth)/}
        {/foreach}
        {foreach key inArray types.strings}
            {call displayElement(element[key], key, depth)/}
        {/foreach}
        {foreach key inArray types.numbers}
            {call displayElement(element[key], key, depth)/}
        {/foreach}
        {foreach key inArray types.instances}
            {call displayElement(element[key], key, depth)/}
        {/foreach}
        {foreach key inArray types.others}
            {call displayElement(element[key], key, depth)/}
        {/foreach}        
        {foreach key inArray types.arrays}
            {call displayElement(element[key], key, depth)/}
        {/foreach}
        {foreach key inArray types.objects}
            {call displayElement(element[key], key, depth)/}
        {/foreach}
    {/macro}
    
    // special greyed display for meta element
    {macro displayName(name)}
        {if (name.indexOf(":")!=-1)}
            <span style="color:grey">${name}</span>
        {else/}
            ${name}
        {/if}
    {/macro}

{/Template}
//*******************
//LOGICAL-PATH:aria/tools/common/ObjectTreeDisplayScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tools.common.ObjectTreeDisplayScript",$prototype:{$dataReady:function(){this.data.showDepth&&this._showDepth(this.data.content,this.data.showDepth,0)},_showDepth:function(e,t,n){if(e&&n<t){e["view:ariaDebug:showOpen"+n]=!0;for(var r in e)e.hasOwnProperty(r)&&this._showDepth(e[r],t,n+1)}},nodeClick:function(e,t){var n=t.element,r=t.depth,i="view:ariaDebug:showOpen"+r;n[i]?n[i]=!1:n[i]=!0,this.$refresh()},filterTypes:function(e){var t={meta:{arrays:[],objects:[],strings
:[],numbers:[],instances:[],booleans:[],others:[]},data:{arrays:[],objects:[],strings:[],numbers:[],instances:[],booleans:[],others:[]}},n=aria.utils.Type;for(var r in e)if(e.hasOwnProperty(r)&&!this.$json.isMetadata(r)&&r.indexOf("view:ariaDebug:showOpen")!==0){var i=e[r],s;r.indexOf(":")==-1?s=t.data:s=t.meta,n.isArray(i)?s=s.arrays:n.isObject(i)?s=s.objects:n.isString(i)?s=s.strings:n.isNumber(i)?s=s.numbers:n.isBoolean(i)?s=s.booleans:i&&i.$classpath?s=s.instances:s=s.others,s.push(r)}return t}}});
//*******************
//LOGICAL-PATH:aria/tools/inspector/IInspectorModule.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.tools.inspector.IInspectorModule",$extends:"aria.templates.IModuleCtrl",$interface:{displayHighlight:function(){},reloadTemplate:function(){},refreshTemplate:function(){},reloadModule:function(){},getSource:function(){}},$events:{contentChanged:{description:""}}});
//*******************
//LOGICAL-PATH:aria/tools/inspector/InspectorDisplay.tpl
//*******************
// Template to display highlighting informations in subwindow
// aria.tools.inspector.InspectorDisplay
{Template {
    $classpath : 'aria.tools.inspector.InspectorDisplay',
    $hasScript : true,
    $width:{min:800}
}}

    {macro main()}
    
        {@aria:Dialog {
            contentMacro : "showLock",
            modal : true,
            closable : false,
            bind : {
                visible : {
                    to : "locked",
                    inside : data
                }
            }
        }}
        {/@aria:Dialog}
    
        <div style="float:left;width:${$hdim(380,0.5)}px;margin:5px;">
            <h2 style="color:#99CC00;margin-bottom:0px;">Templates</h2>
            <div style="border:solid 1px #888;padding:5px;width:${$hdim(368,0.5)}px;overflow:auto;">
                // display templates
                <em style="color:lightGrey">List of templates displayed in the application. Mouse over to highlight and show associated module, click to display details.</em>    
                {call displayTemplates(data.templates)/}
            </div>
            
            {if (data.selectedTemplate)}
                <div  style="border:solid 1px #888;padding:5px;margin-top:5px;">
                    {@aria:Template {
                        defaultTemplate : "aria.tools.inspector.TemplateInspector",
                        data : data.selectedTemplate,
                        width: $hdim(368,0.5)
                    }/}
                </div>    
            {/if}
            
        </div>
        
        <div style="float:left;width:${$hdim(380,0.5)}px; margin:5px;overflow:auto;">
            <h2 style="color:#CC0099;margin-bottom:0px;">Module Controllers & Data</h2>
            <div  style="border:solid 1px #888;padding:5px;width:${$hdim(368,0.5)}px;overflow:auto;">
                // display modules
                <em style="color:lightGrey">List of module controllers associated to templates in the application. Mouse over to highlight associated template, click to display details.</em>
                {call displayModules(data.modules)/}
            </div>
        
            {if (data.selectedModule)}
                <div  style="border:solid 1px #888;padding:5px;margin-top:5px;">
                    {@aria:Template {
                        defaultTemplate : "aria.tools.inspector.ModuleInspector",
                        data : this.data.selectedModule,
                        width: $hdim(368,0.5)
                    }/}
                </div>
            {/if}    

        </div>
            
    {/macro}
    
    {macro showLock()}
        <div style="padding:10px">
            {@aria:Icon {icon:"std:warning"}/} Operation in progress ...
        </div>
    {/macro}
    
    {macro displayTemplates(templates)}
        {section "templates"}
            {call recDisplayTemplates(templates)/}
        {/section}
    {/macro}
    
    {macro recDisplayTemplates(templates)}
            <ul>
            {for var i=0;i<templates.length;i++}
                {var template = templates[i]/}
                {var templateCtxt = template.templateCtxt/}
                <li {on mouseover {fn:tplMouseOver, args:template}/}
                    {on mouseout {fn:tplMouseOut}/}
                    {on click {fn:selectTemplate, args:template}/}
                    {if (data.overTemplates && aria.utils.Array.contains(data.overTemplates, templateCtxt))}style='background:#DDDDDD;'{/if}>
                    {if (data.selectedTemplate && data.selectedTemplate.templateCtxt == templateCtxt)}<strong>{/if}
                        ${templateCtxt.tplClasspath}
                    {if (data.selectedTemplate && data.selectedTemplate.templateCtxt == templateCtxt)}</strong>{/if}
                {if (template.content.length>0)}
                    {call recDisplayTemplates(template.content)/}    
                {/if}
                </li>
            {/for}
            </ul>
    {/macro}
    
    {macro displayModules(modules)}
        {section "modules"}
            <ul>
            {for var i=0;i<modules.length;i++}
                {var module = modules[i]/}
                <li {on mouseover {fn:moduleMouseOver, args:module}/}
                    {on mouseout {fn:moduleMouseOut}/}
                    {on click {fn:selectModule, args:module}/}
                    {if (module.moduleCtrl == data.overModuleCtrl)}style='background:#DDDDDD;'{/if} />
                    {if (data.selectedModule && data.selectedModule.moduleCtrl == module.moduleCtrl)}<strong>{/if}
                        ${module.moduleCtrl.$classpath}
                    {if (data.selectedModule && data.selectedModule.moduleCtrl == module.moduleCtrl)}</strong>{/if}
                </li>
            {/for}
            </ul>
        {/section}
    {/macro}
    
{/Template}
//*******************
//LOGICAL-PATH:aria/tools/inspector/InspectorDisplayScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tools.inspector.InspectorDisplayScript",$prototype:{tplMouseOver:function(e,t){this.moduleCtrl.displayHighlight(t.templateCtxt.getContainerDiv()),this.data.overModuleCtrl=t.moduleCtrl,this.mouseOver(e),this._refreshModulesDisplay(),e.stopPropagation()},tplMouseOut:function(e,t){this.data.overModuleCtrl=null,this.mouseOut(e),this._refreshModulesDisplay(),e.stopPropagation()},moduleMouseOver:function(e,t){this.data.overTemplates=t.outerTemplateCtxts,this.mouseOver(e),
this._refreshTemplatesDisplay(),e.stopPropagation()},moduleMouseOut:function(e){this.data.overTemplates=null,this.mouseOut(e),this._refreshTemplatesDisplay(),e.stopPropagation()},mouseOver:function(e){e.target.setStyle("background:#DDDDDD;")},mouseOut:function(e){e.target.setStyle("")},selectTemplate:function(e,t){this.data.selectedTemplate=t,this.$refresh()},selectModule:function(e,t){this.data.selectedModule=t,this.$refresh()},reloadTemplate:function(e,t){this.moduleCtrl.reloadTemplate(t.templateCtxt)},refreshTemplate
:function(e,t){this.moduleCtrl.refreshTemplate(t.templateCtxt)},onModuleEvent:function(e){e.name=="contentChanged"&&this.$refresh()},_refreshModulesDisplay:function(){this.$refresh({filterSection:"modules",macro:{name:"displayModules",args:[this.data.modules]}})},_refreshTemplatesDisplay:function(){this.$refresh({filterSection:"templates",macro:{name:"displayTemplates",args:[this.data.templates]}})}}});
//*******************
//LOGICAL-PATH:aria/tools/inspector/InspectorModule.js
//*******************
Aria.classDefinition({$classpath:"aria.tools.inspector.InspectorModule",$extends:"aria.templates.ModuleCtrl",$dependencies:["aria.utils.Event","aria.utils.Dom","aria.utils.Json"],$templates:["aria.tools.inspector.InspectorDisplay"],$implements:["aria.tools.inspector.IInspectorModule"],$constructor:function(){this.$ModuleCtrl.constructor.call(this),this.bridge=null,this._data={templates:[],modules:[],dataFragments:[],selectedTemplate:null,selectedModule:null,locked:!1},this._holder=null,this._hideTimeout=null
,this._mainContextual=null,this._replaceHtmlOriginal=null},$destructor:function(){this.clearHightlight();var e=this.bridge.getAriaPackage().utils.Dom;e.replaceHTML=this._replaceHtmlOriginal,this._replaceHtmlOriginal=null,e.insertAdjacentHTML=this._insertAdjacentHtmlOriginal,this._insertAdjacentHtmlOriginal=null,e.removeElement=this._removeElementOriginal,this._removeElementOriginal=null,this.$ModuleCtrl.$destructor.call(this)},$prototype:{$publicInterfaceName:"aria.tools.inspector.IInspectorModule",init:function(
e,t){this.bridge=e.bridge,this.$assert(77,!!this.bridge);var n=this.bridge.getAriaPackage().utils.Dom;this._replaceHtmlOriginal=n.replaceHTML,n.replaceHTML=this._interceptMethod(this._replaceHtmlOriginal),this._insertAdjacentHtmlOriginal=n.insertAdjacentHTML,n.insertAdjacentHTML=this._interceptMethod(this._insertAdjacentHtmlOriginal),this._removeElementOriginal=n.removeElement,n.removeElement=this._interceptMethod(this._removeElementOriginal),this.bridge.$on({forwardEvent:this._onForward,scope:this});var r=this
.bridge.getDocument();this._holder=r.createElement("div"),r.body.appendChild(this._holder),this.refreshInformations(),this._mainContextual=Aria.nspace("tools.contextual.ContextualMenu",!1,this.bridge.getAriaPackage()),this._mainContextual&&this._mainContextual.targetTemplateCtxt&&this._selectFromTemplateCtxt(this._mainContextual.targetTemplateCtxt),this.$ModuleCtrl.init.apply(this,arguments)},_interceptMethod:function(e){var t=this,n=function(){try{t.refreshInformations()}catch(e){}};return function(t,r,i){var s=
e.call(this,t,r,i);return setTimeout(n),s}},refreshInformations:function(){this._data.templates=[],this._data.modules=[],this._data.dataFragments=[];var e=this._data.templates,t=this._data.modules,n=this._data.dataFragments,r=this._data.selectedTemplate,i=this._data.selectedModule,s=this.bridge.getAriaPackage().templates.RefreshManager;if(s!=null){s.updateHierarchies();var o=s.getHierarchies();this._convertRefreshMgrHierarchies(o,e,t,n)}r==this._data.selectedTemplate&&(this._data.selectedTemplate=null),i==this
._data.selectedModule&&(this._data.selectedModule=null),this.$raiseEvent("contentChanged")},_convertRefreshMgrHierarchies:function(e,t,n,r,i){for(var s=0,o=e.length;s<o;s++)this._convertRefreshMgrHierarchy(e[s],t,n,r,i)},_convertRefreshMgrHierarchy:function(e,t,n,r,i){if(e.type=="template"||e.type=="templateWidget"){var s=e.elem;e.type=="templateWidget"&&(s.behavior?s=s.behavior.subTplCtxt:s=s.subTplCtxt);var o=this._data.selectedTemplate,u=this._data.selectedModule,a=[],f=[],l=!1,c,h=this.bridge.getAriaPackage
().templates.ModuleCtrlFactory;this.$assert(190,!!s),this.$assert(191,!!h);var p=s.data,d=s.moduleCtrl;if(d){for(var v=0,m=n.length;v<m;v++)c=n[v],c.moduleCtrl==d?(c.current||(c.outerTemplateCtxts.push(s),c.current=!0),l=!0):c.current=!1;if(!l){var g={moduleCtrl:d,outerTemplateCtxts:[s],current:!0,isReloadable:h.isModuleCtrlReloadable(d)};u&&u.moduleCtrl==d&&(this._data.selectedModule=g),n.push(g)}}var y={templateCtxt:s,content:a,moduleCtrl:d,widgets:f};o&&o.templateCtxt==s&&(this._data.selectedTemplate=y),t
.push(y),i=f,t=a}else if(e.type=="widget"){var b=e.elem.behavior;if(i&&b){var w={widget:b};i.push(w);if(e.content){var E=[];w.content=E,i=E}}}e.content&&this._convertRefreshMgrHierarchies(e.content,t,n,r,i)},clearHightlight:function(){this._hideTimeout&&(clearInterval(this._hideTimeout),this._hideTimeout=null),this._holder.innerHTML=""},displayHighlight:function(e,t){this.clearHightlight(),t=t?t:"#ACC2FF";var n=this.bridge.getAriaPackage().utils.Dom.calculatePosition(e),r=this.bridge.getDocument().createElement
("div");r.style.cssText=["position:absolute;top:",n.top,"px;left:",n.left,"px;width:",e.offsetWidth-8>0?e.offsetWidth-8:0,"px;height:",e.offsetHeight-8>0?e.offsetHeight-8:0,"px; border:dashed 4px "+t+";z-index: 999999999999999;z-index: 999999999999999;"].join(""),this._holder.appendChild(r),r=null,this._hideTimeout=setTimeout(aria.utils.Function.bind(this.clearHightlight,this),2e3)},reloadTemplate:function(e,t){aria.utils.Json.setValue(this._data,"locked",!0),t&&(t=this._data.selectedTemplate.tplSrcEdit),this
.clearHightlight(),this._mainContextual&&e.tplClasspath!=this._mainContextual.CONTEXTUAL_TEMPLATE_CLASSPATH&&this._mainContextual.close();var n=this,r=function(){var r=n.bridge.getAria(),i=n.bridge.getAriaPackage();e.$reload(t,{fn:n._unlock,scope:n})};r()},_unlock:function(){var e=this._data;setTimeout(function(){aria.utils.Json.setValue(e,"locked",!1)},500)},reloadModule:function(e){var t=this.bridge.getAriaPackage().templates.ModuleCtrlFactory;aria.utils.Json.setValue(this._data,"locked",!0),this.clearHightlight
(),t.reloadModuleCtrl(e,{fn:this._unlock,scope:this})},refreshTemplate:function(e){this.clearHightlight(),e.$refresh()},_onForward:function(e){if(e.event.name=="ContextualTargetFound"){var t=e.event.templateCtxt;this._selectFromTemplateCtxt(t)}},_selectFromTemplateCtxt:function(e){var t=e.moduleCtrlPrivate,n=this._data.modules,r,i;for(r=0,i=n.length;r<i;r++){if(n[r].moduleCtrl==t){this._data.selectedModule=n[r];break}this._data.selectedModule=null}this._data.selectedTemplate=this._findTemplateDes(this._data.
templates,e)},_findTemplateDes:function(e,t){var n=null,r,i;for(r=0,i=e.length;r<i;r++){var s=e[r];if(s.templateCtxt==t)return s;n=this._findTemplateDes(s.content,t);if(n)return n}return null},getSource:function(e){return this.bridge.getAriaPackage().core.Cache.getItem("files",e,!1)}}});
//*******************
//LOGICAL-PATH:aria/tools/inspector/ModuleInspector.tpl
//*******************
// Dedicated display for module inspection
// aria.tools.inspector.ModuleInspector
{Template {
    $classpath : 'aria.tools.inspector.ModuleInspector',
    $hasScript : true,
    $width:{min:100}
}}

    {macro main()}
    
        {var localModuleCtrl = data.moduleCtrl/}
        
        <h3>${localModuleCtrl.$classpath}</h3>
        
        <div>
            {call displayControls()/}
        </div>
        
        <h4>General Information</h4>
        <ul>
            <li>Classpath: ${localModuleCtrl.$classpath}</li>
            {if (localModuleCtrl._dataBeanName)}
                <li>Data bean definition: ${localModuleCtrl._dataBeanName}</li>
            {/if}
            <li>Interface: ${localModuleCtrl.$publicInterfaceName}</li>
        </ul>
        <h4>Data</h4>
        {@aria:Template {
            defaultTemplate : "aria.tools.common.ObjectTreeDisplay",
            data: {
                content : localModuleCtrl.getData(),
                title : "data",
                showDepth : 2,
                search : true
            },
            width: $hdim(100,1)
        }/}
    {/macro}
    
    {macro displayControls()}
        {section "controls"}
            {if data.isReloadable}
                <div style="text-align:center; padding:5px; background:#F3F3F3; border:solid 1px #DDDDDD;">    
                    {@aria:Button { label:"Reload", onclick : {fn:reloadModule}}/}
                </div>
            {/if}
        {/section}
    {/macro}

{/Template}
//*******************
//LOGICAL-PATH:aria/tools/inspector/ModuleInspectorScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tools.inspector.ModuleInspectorScript",$prototype:{$dataReady:function(){this.data["view:dataDepth"]||(this.data["view:dataDepth"]=3)},reloadModule:function(){this.moduleCtrl.reloadModule(this.data.moduleCtrl)},onModuleEvent:function(e){}}});
//*******************
//LOGICAL-PATH:aria/tools/inspector/TemplateInspector.tpl
//*******************
// Dedicated display for template inspection
// aria.tools.inspector.TemplateInspector
{Template {
    $classpath : 'aria.tools.inspector.TemplateInspector',    
    $hasScript : true,
    $width:{min:100}
}}

    {macro main()}
    
        <h3>${data.templateCtxt.tplClasspath}</h3>

        <div>
            {call displayControls()/}
        </div>
        
        <h4>General Information</h4>
        
        {if (data.showSource)}
            <p {on click {fn:toggleSource}/} style="cursor:pointer;">{@aria:Icon {icon:"std:collapse" }/} Source code</p>
            <textarea id='aria.tools.inspector.TemplateInspector_Src' style='width:${$hdim(96,1)}px;font-family: "courier New", courier, monospace; height:250px;' {on keyup {fn:this.editSource}/}>
                ${data.source|escape}
            </textarea>
        {else/}
            <p {on click {fn:toggleSource}/} style="cursor:pointer;">{@aria:Icon {icon:"std:expand" }/} Source code</p>
        {/if}
        
        <h4>Widgets</h4>
        
        {section "widgets"}    
            {if (data.selectedWidget)}
                <div style="border: solid 1px #DDDDDD;padding:5px;width:${$hdim(88,1)}px;overflow:auto;">
                {@aria:Template {
                    defaultTemplate : "aria.tools.common.ObjectTreeDisplay",
                    data: {
                        content : data.selectedWidget.widget._cfg,
                        title : "Configuration",
                        showDepth : 2,
                        search : true
                    }
                }/}
                </div>
            {else/}
                <em style="color:lightGrey">Click to display configuration details</em>
            {/if}
            {call displayWidgets(data.widgets)/}
        {/section}
        
    {/macro}
    
    {macro displayWidgets(container)}
        <ul>
        {foreach widgetDesc inArray container}
            <li {on mouseover {fn:widgetMouseOver, args:widgetDesc}/}
                {on mouseout {fn:widgetMouseOut}/}>
                <span {on click {fn:displayWidgetDetails, args:widgetDesc}/}>
                    {if (data.selectedWidget==widgetDesc)}<strong>{/if}
                        ${widgetDesc.widget.$classpath}
                    {if (data.selectedWidget==widgetDesc)}</strong>{/if}
                </span>
                {if (widgetDesc.content)}
                    {call displayWidgets(widgetDesc.content)/}
                {/if}
            </li> 
        {/foreach}
        </ul>
    {/macro}
    
    {macro displayControls()}
        {section "controls"}    
            <div style="text-align:center; padding:5px; background:#F3F3F3; border:solid 1px #DDDDDD;">
                {@aria:Button { label:"Reload", onclick : {fn:reloadTemplate}}/}
                {@aria:Button { label:"Refresh", onclick : {fn:refreshTemplate}}/}
                {if (data.showSource && !data.initialSource)}
                    {@aria:Button { label:"Reload with Source", onclick : {fn:reloadTemplateWithSrc}}/}
                    </div>
                    <div style="text-align:center;color:red;">{@aria:Icon {icon:"std:warning"}/} &nbsp;&nbsp; Changes done here ARE NOT PERSISTENT. Use for testing only.
                {/if}
            </div>
        {/section}
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tools/inspector/TemplateInspectorScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tools.inspector.TemplateInspectorScript",$prototype:{widgetMouseOver:function(e,t){var n=t.widget,r=n.getDom();r&&this.moduleCtrl.displayHighlight(r,"#FF6666"),this.mouseOver(e),e.stopPropagation()},widgetMouseOut:function(e){this.mouseOut(e),e.stopPropagation()},mouseOver:function(e){e.target.setStyle("background:#DDDDDD;")},mouseOut:function(e){e.target.setStyle("")},displayWidgetDetails:function(e,t){this.data.selectedWidget=t,this.$refresh({filterSection:"widgets"
})},reloadTemplate:function(e){this.moduleCtrl.reloadTemplate(this.data.templateCtxt)},reloadTemplateWithSrc:function(){this.moduleCtrl.reloadTemplate(this.data.templateCtxt,!0)},refreshTemplate:function(e){this.moduleCtrl.refreshTemplate(this.data.templateCtxt)},onModuleEvent:function(e){},toggleSource:function(e){this.data.showSource=!this.data.showSource;if(this.data.showSource){this.data.initialSource=!0;var t=this.data.templateCtxt.tplClasspath.replace(/\./g,"/")+".tpl";this.data.source=this.moduleCtrl.
getSource(t).value}this.$refresh()},editSource:function(e){this.data.initialSource&&(aria.utils.Json.setValue(this.data,"initialSource",!1),this.$refresh({filterSection:"controls",macro:{name:"displayControls"}})),this.data.tplSrcEdit=e.target.getValue()},_refreshWidgetsDisplay:function(){this.$refresh({filterSection:"widgets"})}}});
//*******************
//LOGICAL-PATH:aria/tools/logger/ILoggerModule.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.tools.logger.ILoggerModule",$extends:"aria.templates.IModuleCtrl",$interface:{clean:function(){}},$events:{newLog:{description:""}}});
//*******************
//LOGICAL-PATH:aria/tools/logger/LoggerDisplay.tpl
//*******************
// Template to display highlighting informations in subwindow
// aria.tools.logger.LoggerDisplay
{Template {
    $classpath : 'aria.tools.logger.LoggerDisplay',
    $hasScript : true
}}

    {macro main()}
        
        <div style="padding: 10px;">
        
        <div style="text-align:center; padding:5px; background:#F3F3F3; border:solid 1px #DDDDDD; margin-bottom:10px;">    
            {@aria:Button {
                label : "Clean",
                onclick : {
                    fn : moduleCtrl.clean,
                    scope: moduleCtrl
                }
            }/}
        </div>
        
        <table style="width:100%" cellpadding="3" cellspacing="0">
            <thead>
                <tr style="color:white; border-bottom:solid 1px #444444; font-weight:bold;">
                    <th style="border-right:solid 1px white; width:3em;"></th>
                    <th style="background:#444;border-right:solid 1px white; width:10em;">Class Name</th>
                    <th style="background:#444;border-right:solid 1px white; width:7em;">Message Id</th>
                    <th style="background:#444;border-right:solid 1px white;">Message</th>
                    <th style="background:#444;">Data</th>
                </tr>
            </thead>
            
            <tbody>
                {foreach log inArray data.logs}
                    <tr style="background:
                        {if (log.type==aria.core.Log.LEVEL_DEBUG)}#DDDDDD{/if} // light grey
                        {if (log.type==aria.core.Log.LEVEL_INFO)}#AADDFF{/if} // blue
                        {if (log.type==aria.core.Log.LEVEL_WARN)}#FFDD44{/if} // yellow
                        {if (log.type==aria.core.Log.LEVEL_ERROR)}#FF6666{/if} // red
                    ">
                        <td style="border-right:solid 1px white; text-align:middle; border-top:solid 1px #444444;">
                            ${log.date}
                        </td>
                        <td style="border-right:solid 1px white; border-top:solid 1px #444444;">
                            ${log.className}
                        </td>
                        <td style="border-right:solid 1px white; border-top:solid 1px #444444;">
                            ${log.msgId|empty:"&nbsp;"}
                        </td>
                        <td style="border-right:solid 1px white; border-top:solid 1px #444444;"> 
                            ${log.msg|empty:"&nbsp;"}
                        </td >
                        <td style="border-top:solid 1px #444444;">
                            {if (log.object)}
                                {@aria:Template {
                                    defaultTemplate : "aria.tools.common.ObjectTreeDisplay",
                                    data: {
                                        content : log.object,
                                        title : "data",
                                        showDepth : 0
                                    }
                                }/}
                            {else/}
                                &nbsp;
                            {/if}
                        </td>
                    </tr>
                {/foreach}
            </tbody>
            
        </table>
        
        </div>
        
            
    {/macro}
    
    

{/Template}
//*******************
//LOGICAL-PATH:aria/tools/logger/LoggerDisplayScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tools.logger.LoggerDisplayScript",$prototype:{onModuleEvent:function(e){this.$refresh()}}});
//*******************
//LOGICAL-PATH:aria/tools/logger/LoggerModule.js
//*******************
Aria.classDefinition({$classpath:"aria.tools.logger.LoggerModule",$extends:"aria.templates.ModuleCtrl",$dependencies:["aria.utils.Date"],$templates:["aria.tools.logger.LoggerDisplay"],$implements:["aria.tools.logger.ILoggerModule"],$constructor:function(){this.$ModuleCtrl.constructor.call(this),this.bridge=null,this._data={logs:[]},this.logsMaxLength=20},$destructor:function(){this.bridge.getAriaPackage().core.Log.removeAppender(this),this.$ModuleCtrl.$destructor.call(this)},$prototype:{$publicInterfaceName:"aria.tools.logger.ILoggerModule"
,init:function(e,t){this.bridge=e.bridge,this.$assert(77,!!this.bridge),this.bridge.getAria().load({classes:["aria.core.Log"],oncomplete:{fn:function(){this.bridge.getAriaPackage().core.Log.addAppender(this),this.$callback(t)},scope:this}})},debug:function(e,t,n,r){this._log(aria.core.Log.LEVEL_DEBUG,e,t,n,r)},info:function(e,t,n,r){this._log(aria.core.Log.LEVEL_INFO,e,t,n,r)},warn:function(e,t,n,r){this._log(aria.core.Log.LEVEL_WARN,e,t,n,r)},error:function(e,t,n,r){this._log(aria.core.Log.LEVEL_ERROR,e,t,n
,r)},_log:function(e,t,n,r,i){var s=this._data.logs,o=s.unshift({type:e,className:t,msg:n,msgId:r,object:i,date:aria.utils.Date.format(new Date,"HH:mm:ss")});o>this.logsMaxLength&&s.pop(),this.$raiseEvent("newLog")},clean:function(){this._data.logs=[],this.$raiseEvent("newLog")}}});
//*******************
//LOGICAL-PATH:aria/tools/contextual/ContextualDisplay.tpl
//*******************
// Content of the contextual menu for templates
{Template {
    $classpath:'aria.tools.contextual.ContextualDisplay',
    $hasScript:true
}}

    {macro main()}
        {@aria:Div {
            sclass : "dropdown"
        }}
            <div style="padding:5px;">
                <table cellpadding="0" cellspacing="5">
                    <tr>
                        <td align="right">Template:</td>
                        <td><strong>${data.templateCtxt.tplClasspath}</strong></td>
                    </tr>
                    {if (data.templateCtxt.moduleCtrlPrivate)}
                        <tr>
                            <td align="right">Module Controller:</td>
                            <td><strong>${data.templateCtxt.moduleCtrlPrivate.$classpath}</strong></td>
                        </tr>
                    {/if}
                </table>
                <div style="text-align:center; padding:5px; background:#F3F3F3; border:solid 1px #DDDDDD;">
                    {@aria:Button {label:"Reload Template", onclick : "reloadTemplate"}/}
                    {if aria.templates.ModuleCtrlFactory.isModuleCtrlReloadable(data.templateCtxt.moduleCtrlPrivate)}
                        {@aria:Button {label:"Reload Module", onclick : "reloadModule"}/}
                    {/if}
                     {@aria:Button {label:"Debug Tools", onclick: "openDebug"}/}
                 </div>
            </div>

        {/@aria:Div}
    {/macro}
    

{/Template}
//*******************
//LOGICAL-PATH:aria/tools/contextual/ContextualDisplayScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tools.contextual.ContextualDisplayScript",$prototype:{openDebug:function(e){var t=this.data.driver;t.openTools()},reloadTemplate:function(e){this.data.templateCtxt.$reload(),this.data.driver.close()},reloadModule:function(){aria.templates.ModuleCtrlFactory.reloadModuleCtrl(this.data.templateCtxt.moduleCtrlPrivate),this.data.driver.close()}}});
//*******************
//LOGICAL-PATH:aria/tools/contextual/ContextualMenu.js
//*******************
(function(){var e=null,t=null,n=null,r=null;Aria.classDefinition({$classpath:"aria.tools.contextual.ContextualMenu",$singleton:!0,$dependencies:["aria.utils.Event","aria.DomEvent","aria.templates.TemplateCtxtManager","aria.popups.Popup","aria.widgets.Template","aria.utils.Dom","aria.tools.contextual.environment.ContextualMenu","aria.utils.AriaWindow"],$implements:["aria.tools.contextual.IContextualMenu"],$constructor:function(){e=aria.utils.Event,t=aria.templates.TemplateCtxtManager,n=aria.tools.contextual.environment
.ContextualMenu,r=aria.utils.Dom,this._enabled=!1,this._popup=null,this.targetTemplateCtxt=null,this._appEnvCfg=null,n.$on({environmentChanged:this._environmentChanged,scope:this}),this._environmentChanged(),aria.utils.AriaWindow.$on({attachWindow:this._attachWindow,detachWindow:this._detachWindow,scope:this})},$destructor:function(){aria.core.environment.Environment.$unregisterListeners(this),aria.utils.AriaWindow.$unregisterListeners(this),this._setEnabled(!1),this._popup&&this._popup.close(),this.targetTemplateCtxt=
null},$prototype:{_attachWindow:function(){var e=n.getContextualMenu();this._setEnabled(e.enabled)},_detachWindow:function(){this._setEnabled(!1)},_environmentChanged:function(){var e=n.getContextualMenu();this._appEnvCfg=e,this._setEnabled(e.enabled)},_setEnabled:function(t){var n=Aria.$window.document;t?aria.widgets.AriaSkin&&(this._enabled=!0,e.addListener(n,"contextmenu",{fn:this._onContextMenu,scope:this}),aria.core.Browser.isSafari&&e.addListener(n,"mouseup",{fn:this._onSafariMouseUp,scope:this})):(this
._enabled=!1,e.removeListener(n,"contextmenu",{fn:this._onContextMenu}),aria.core.Browser.isSafari&&e.removeListener(n,"mouseup",{fn:this._onSafariMouseUp}))},_onSafariMouseUp:function(e){this._safariCtrlKey=e.ctrlKey},_onContextMenu:function(e){if(!this._enabled)return;e=new aria.DomEvent(e),aria.core.Browser.isSafari&&(e.ctrlKey=this._safariCtrlKey);if(e.ctrlKey){e.stopPropagation(),e.preventDefault();var t=e.target;return this.__callContextualMenu(t,e.clientX,e.clientY),e.$dispose(),!1}e.$dispose()},open:
function(e,t){this._popup&&aria.tools.contextual.ContextualMenu.close();var n={};t?n=t:e.$TemplateCtxt?n={x:0,y:0}:n=r.getGeometry(e);if(e.$TemplateCtxt){this._notifyFound(e,n.x,n.y);return}return this.__callContextualMenu(e,n.x,n.y),!1},__callContextualMenu:function(e,n,r){var i,s=Aria.$window.document.body;while(e&&e!=s&&!e.__template)i=e,e=e.parentNode;if(e==s&&i){if(aria.popups&&aria.popups.PopupManager){var o=aria.popups.PopupManager.getPopupFromDom(i);o&&o.section&&o.section.tplCtxt&&this._notifyFound(
o.section.tplCtxt,n,r)}}else e&&e!=s&&this._notifyFound(t.getFromDom(e.parentNode),n,r)},_afterClose:function(e){this._popup&&(this._popup.$dispose(),this._popup=null)},_notifyFound:function(e,t,n){var r=aria.tools.ToolsBridge;r&&r.isOpen&&r.$raiseEvent({name:"forwardEvent",event:{name:"ContextualTargetFound",templateCtxt:e}});if(this._popup)return;var i=new aria.popups.Popup;this._popup=i,i.$on({onAfterClose:this._afterClose,scope:this});var s=e.createSection({fn:function(t){var n=new aria.widgets.Template(
{defaultTemplate:this._appEnvCfg.template,moduleCtrl:{classpath:this._appEnvCfg.moduleCtrl,initArgs:{templateCtxt:e.$interface("aria.templates.ITemplateCtxt"),driver:this.$interface("aria.tools.contextual.IContextualMenu")}}},e,"NOLINE");t.registerBehavior(n),n.writeMarkup(t)},scope:this});i.open({section:s,absolutePosition:{top:n,left:t},modal:!0,maskCssClass:"xDialogMask",preferredPositions:[{reference:"bottom left",popup:"top left"},{reference:"bottom left",popup:"top right"}],offset:{top:0,left:0},closeOnMouseClick
:!0,closeOnMouseScroll:!0}),this.targetTemplateCtxt=e},close:function(){this.targetTemplateCtxt=null,this._popup&&this._popup.close()},openTools:function(){(!aria.tools.ToolsBridge||!aria.tools.ToolsBridge.isOpen)&&Aria.load({classes:["aria.tools.ToolsBridge"],oncomplete:function(){aria.tools.ToolsBridge.open(),aria.tools.contextual.ContextualMenu.close()}})}}})})();
//*******************
//LOGICAL-PATH:aria/tools/contextual/ContextualModule.js
//*******************
Aria.classDefinition({$classpath:"aria.tools.contextual.ContextualModule",$extends:"aria.templates.ModuleCtrl",$constructor:function(){this.$ModuleCtrl.constructor.call(this)},$prototype:{init:function(e,t){this._data=e,this.$callback(t)}}});
//*******************
//LOGICAL-PATH:aria/tools/contextual/IContextualMenu.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.tools.contextual.IContextualMenu",$interface:{close:"Function",open:"Function",openTools:"Function"}});