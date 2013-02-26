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
//LOGICAL-PATH:aria/tester/runner/BaseFlow.js
//*******************
Aria.classDefinition({$classpath:"aria.tester.runner.BaseFlow",$extends:"aria.templates.FlowCtrl",$constructor:function(){this.$FlowCtrl.constructor.call(this)},$prototype:{oninitCallback:function(e){this.$FlowCtrl.oninitCallback.call(this,e),this.data.flow=this.flowData},navigate:function(e){var t=this.data.flow,n=t.currentState;if(!this.isTransitionValid(n,e))return this.$logError("FLOW_INVALID_TRANSITION",[e]);var r=aria.utils.Json;r.setValue(t,"currentState",e),this.onStateChange(e),this.$raiseEvent("stateChange"
)},onStateChange:function(e){},isTransitionValid:function(e,t){var n=this._getTransitionMap();return n[e]&&n[e][t]},_getTransitionMap:function(){var e={},t=function(t,n){e[t]||(e[t]={}),e[t][n]=!0},n=this.flowData,r=n.validTransitions;for(var i=0;i<r.length;i++){var s=r[i];t(s[0],s[1]),s[2]&&t(s[1],s[0])}return e}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/ModuleController.js
//*******************
Aria.classDefinition({$classpath:"aria.tester.runner.ModuleController",$extends:"aria.templates.ModuleCtrl",$dependencies:["aria.tester.runner.datamodel.DataDefinitions","aria.tester.runner.utils.Hash","aria.jsunit.IOViewer","aria.jsunit.AppletWorker","aria.utils.QueryString","aria.jsunit.NewTestRunner","aria.jsunit.JsCoverage","aria.jsunit.TestCommunicator","aria.utils.Callback","aria.tester.runner.utils.TestUtils","aria.tester.runner.appenders.JsonTextDivAppender","aria.jsunit.TestacularReport"],$statics:{
DATA_DEFINITION:"aria.tester.runner.datamodel.DataDefinitions"},$implements:["aria.tester.runner.ModuleControllerInterface"],$constructor:function(){this.$ModuleCtrl.constructor.call(this),this._testRunner=null,this._reportAppenders=[new aria.tester.runner.appenders.JsonTextDivAppender],aria.core.JsonValidator.normalize({json:this._data,beanName:this.DATA_DEFINITION+".Root"}),this._readConfigurationParameters()},$prototype:{$hasFlowCtrl:!0,$publicInterfaceName:"aria.tester.runner.ModuleControllerInterface",init
:function(e,t){var n=this.getData().campaign,r=n.rootClasspath;Aria.load({classes:[r],oncomplete:{fn:this._onInitLoadCompleted,args:t,scope:this},onerror:{fn:this._onInitLoadError,args:t,scope:this}})},switchView:function(e){var t=aria.tester.runner.utils.Hash;this.json.setValue(this._data.view.configuration,"mini",!this._data.view.configuration.mini),t.setParameter("mini",this._data.view.configuration.mini),this.$callback(e)},_readConfigurationParameters:function(){var e=this.getData().campaign,t=this.getData
().view,n=aria.tester.runner.utils.Hash,r=aria.utils.Json;n.getParameter("mini")=="true"&&r.setValue(t.configuration,"mini",!0),n.getParameter("testClasspath")&&r.setValue(e,"rootClasspath",n.getParameter("testClasspath")),(n.getParameter("autorun")=="true"||aria.jsunit.TestacularReport.isTestacularEnabled())&&r.setValue(e,"autorun",!0),n.getParameter("runIsolated")=="true"&&r.setValue(e,"runIsolated",!0)},_onInitLoadCompleted:function(e){this.getData().campaign.loadSuccessful=!0;var t=aria.tester.runner.utils
.Hash,n=this.getData().campaign;t.setParameter("testClasspath",n.rootClasspath),this.$callback(e)},_onInitLoadError:function(e){this.$logError("Unable to load test object for classpath : "+this.getData().campaign.rootClasspath),this.getData().campaign.loadSuccessful=!1,this.$callback(e)},preloadSuites:function(e){var t=this.getData().campaign,n=t.rootClasspath;this._testRunner=new aria.jsunit.NewTestRunner,this._testRunner.runIsolated=t.runIsolated,this._testRunner.setRootClasspath(n),this._testRunner.$on({preloadEnd
:{fn:this._onPreloadEnd,scope:this,args:e}}),this._testRunner.preload()},_onPreloadEnd:function(e,t){this._testRunner.$on({campaignEnd:this._onCampaignEnd,campaignChange:this._onCampaignChange,scope:this}),this.selectTestSuitesFromHash(),this.updateTests(t)},_onCampaignEnd:function(){this._onCampaignChange(),this.$callback(this._startCampaignCb),this._exportResults()},_exportResults:function(){var e=this._data.campaign,t={errorCount:e.errorCount,tests:[],coverage:{}};for(var n=0;n<e.tests.length;n++){var r=e
.tests[n];t.tests.push({classpath:r.classpath,assertCount:r.instance._totalAssertCount,errors:r.instance._errors})}var i=Aria.$window._$jscoverage;typeof i!="undefined"&&(t.coverage=i);for(var s=0;s<this._reportAppenders.length;s++)this._reportAppenders[s].append(t)},_onCampaignChange:function(){this.updateProgress(),this.updateErrorCount(),this.updateTests()},updateProgress:function(){var e=this._testRunner.getFinishedTestsCount(),t=Math.floor(100*(e/this._testRunner.getTestsCount()));aria.utils.Json.setValue
(this.getData().campaign,"progress",t)},updateErrorCount:function(){var e=this._testRunner.getFailedTests();aria.utils.Json.setValue(this.getData().campaign,"errorCount",e.length)},updateTests:function(e){aria.utils.Json.setValue(this.getData().campaign,"tests",this._testRunner.getTestCases()),aria.utils.Json.setValue(this.getData().campaign,"testsTree",[this._testRunner._rootTest]),this.storeUnselectedSuitesInHash(),this.$callback(e)},selectTestSuitesFromHash:function(){var e=aria.tester.runner.utils.Hash,t=
e.getParameter("unselected"),n=this._testRunner._rootTest;if(!n.$TestSuite)return;var r=n.getAllSubTestSuites();for(var i=0,s=r.length;i<s;i++){var o=r[i].instance,u=o.$classpath;t.indexOf(u)!=-1&&o.setUnselected()}this.updateTests()},storeUnselectedSuitesInHash:function(){var e=aria.tester.runner.utils.TestUtils,t=aria.tester.runner.utils.Hash,n=this._testRunner._rootTest;if(!n.$TestSuite)return;var r=e.getUnselectedSubSuites(n);t.setParameter("unselected",r.join(","))},startCampaign:function(e){var t=[];aria
.utils.QueryString.getKeyValue("UITest")!="1"&&(t=["test.aria.widgets.WidgetsUITestSuite"]),this._startCampaignCb=e,aria.jsunit.TestacularReport.attachTestEngine(this._testRunner.getEngine()),this._testRunner.run(this.testObject,t)},pauseCampaign:function(e){this._testRunner.getEngine().pause(e)},resumeCampaign:function(e){this._testRunner.getEngine().resume(e)},reload:function(e){aria.jsunit.TestacularReport.detachTestEngine(this._testRunner.getEngine()),this._testRunner.$dispose();var t=aria.core.Cache.content
.classes;for(var n in t){if(!t.hasOwnProperty(n)||n.indexOf("aria.")===0)continue;aria.core.ClassMgr.unloadClass(n,!0)}aria.utils.Json.setValue(this.getData().campaign,"autorun",!0),this.$callback(e)}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/ModuleControllerFlow.js
//*******************
Aria.classDefinition({$classpath:"aria.tester.runner.ModuleControllerFlow",$extends:"aria.tester.runner.BaseFlow",$statics:{STATES:{INIT:"init",READY:"ready",FAILURE:"failure",OPTIONS:"options",ONGOING:"ongoing",PAUSED:"paused",PAUSING:"pausing",RESUMING:"resuming",FINISHED:"finished",REPORT:"report"}},$implements:["aria.tester.runner.ModuleControllerFlowInterface"],$constructor:function(){this.$BaseFlow.constructor.call(this);var e=[];e.push([this.STATES.INIT,this.STATES.READY]),e.push([this.STATES.INIT,this
.STATES.FAILURE,!0]),e.push([this.STATES.READY,this.STATES.ONGOING]),e.push([this.STATES.ONGOING,this.STATES.FAILURE]),e.push([this.STATES.ONGOING,this.STATES.PAUSING]),e.push([this.STATES.PAUSING,this.STATES.PAUSED]),e.push([this.STATES.PAUSED,this.STATES.RESUMING]),e.push([this.STATES.RESUMING,this.STATES.ONGOING]),e.push([this.STATES.ONGOING,this.STATES.FINISHED,!0]),e.push([this.STATES.FINISHED,this.STATES.INIT]),e.push([this.STATES.FINISHED,this.STATES.REPORT,!0]),e.push([this.STATES.REPORT,this.STATES.
INIT]),this.flowData={currentState:this.STATES.INIT,validTransitions:e}},$prototype:{$publicInterfaceName:"aria.tester.runner.ModuleControllerFlowInterface",oninitCallback:function(e){this.$BaseFlow.oninitCallback.call(this,e),this.data.campaign.loadSuccessful?this.moduleCtrl.preloadSuites():this.navigate(this.STATES.FAILURE)},displayReady:function(){this._isDisplayReady||(this._isDisplayReady=!0,this._isPreloadFinished&&this.navigate(this.STATES.READY))},onpreloadSuitesCallback:function(){this._isPreloadFinished=!0
,this._isDisplayReady&&this.navigate(this.STATES.READY)},onstartCampaignCallBegin:function(){this.navigate(this.STATES.ONGOING)},onstartCampaignCallback:function(){this.navigate(this.STATES.FINISHED)},onreloadCallback:function(){this.navigate(this.STATES.INIT),this.moduleCtrl.init()},onStateChange:function(e){e===this.STATES.READY?this._onReadyState():e===this.STATES.PAUSING?this.moduleCtrl.pauseCampaign({fn:this._onPausingComplete,scope:this}):e===this.STATES.RESUMING&&this.moduleCtrl.resumeCampaign({fn:this
._onResumingComplete,scope:this})},_onReadyState:function(){this.data.campaign.autorun===!0&&this.moduleCtrl.startCampaign()},_onPausingComplete:function(){this.navigate(this.STATES.PAUSED)},_onResumingComplete:function(){this.navigate(this.STATES.ONGOING)}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/ModuleControllerFlowInterface.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.tester.runner.ModuleControllerFlowInterface",$extends:"aria.templates.IFlowCtrl",$events:{stateChange:"raised when the current flow state changed"},$interface:{STATES:{$type:"Object"},displayReady:{$type:"Function"},navigate:{$type:"Function"},isTransitionValid:{$type:"Function"}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/ModuleControllerInterface.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.tester.runner.ModuleControllerInterface",$extends:"aria.templates.IModuleCtrl",$events:{initSuccessful:"initSuccessful",preloadEnd:"preloadEnd",testEnd:"testEnd",testStateChange:"testStateChange"},$interface:{startCampaign:{$type:"Function",$callbackParam:0},preloadSuites:{$type:"Function",$callbackParam:0},updateTests:{$type:"Function",$callbackParam:0},reload:{$type:"Function",$callbackParam:0},switchView:{$type:"Function",$callbackParam:0},pauseCampaign:{$type:"Function"
,$callbackParam:0},resumeCampaign:{$type:"Function",$callbackParam:0}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/appenders/JsonTextDivAppender.js
//*******************
Aria.classDefinition({$classpath:"aria.tester.runner.appenders.JsonTextDivAppender",$dependencies:["aria.utils.Dom","aria.utils.Json"],$statics:{REPORT_DIV_ID:"testReport"},$prototype:{_destroyReportDiv:function(){var e=aria.utils.Dom.getElementById(this.REPORT_DIV_ID);e&&e.parentNode.removeChild(e)},_createReportDiv:function(e){var t=aria.utils.Dom.getElementById(this.REPORT_DIV_ID);if(!t){var n=Aria.$window.document;t=n.createElement("DIV"),t.id=this.REPORT_DIV_ID,t.style.display="none",t.innerHTML=e,n.body
.appendChild(t)}},append:function(e){this._destroyReportDiv(),this._createReportDiv(aria.utils.Json.convertToJsonString(e))}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/datamodel/DataDefinitions.js
//*******************
Aria.beanDefinitions({$package:"aria.tester.runner.datamodel.DataDefinitions",$description:"",$namespaces:{json:"aria.core.JsonTypes"},$beans:{Root:{$type:"json:Object",$description:"",$properties:{campaign:{$type:"Campaign",$description:"",$default:{}},flow:{$type:"json:Object",$description:"",$properties:{currentState:{$type:"json:String",$description:"",$default:""}},$default:{}},application:{$type:"json:Object",$description:"",$properties:{configuration:{$type:"json:Object",$description:"",$properties:{coverage
:{$type:"json:Boolean",$description:"",$default:!1}},$default:{}}},$default:{}},view:{$type:"json:Object",$description:"",$properties:{filter:{$type:"json:Object",$description:"",$properties:{type:{$type:"json:String",$description:"",$default:"all"}},$default:{}},configuration:{$type:"json:Object",$description:"",$properties:{mini:{$type:"json:Boolean",$description:"",$default:!1}},$default:{}},scrollPositions:{$type:"json:Object",$description:"",$default:{}}},$default:{}}},$default:{}},Campaign:{$type:"json:Object"
,$description:"",$properties:{rootClasspath:{$type:"json:String",$description:"",$default:"MainTestSuite"},currentClasspath:{$type:"json:String",$description:"",$default:""},progress:{$type:"json:Integer",$description:"",$default:0},report:{$type:"Report",$description:"",$default:{}},tests:{$type:"json:Array",$description:"",$contentType:{$type:"Test",$description:"",$default:{}},$default:[]},testsTree:{$type:"json:Array",$description:"",$contentType:{$type:"TestWrapper",$description:"",$default:{}},$default
:[]},errorCount:{$type:"json:Integer",$description:"",$default:0}},$default:{}},Report:{$type:"json:Object",$description:"",$properties:{},$default:{}},Test:{$type:"json:Object",$description:"",$properties:{},$default:{}},TestWrapper:{$type:"json:Object",$description:"",$properties:{classpath:{$type:"json:String",$description:"",$default:""},instance:{$type:"json:Object",$description:"",$default:null}},$default:{}},Failure:{$type:"json:Object",$description:"",$properties:{},$default:{}}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/utils/Hash.js
//*******************
(function(){var e={$classpath:"aria.tester.runner.utils.Hash",$singleton:!0,$constructor:function(){this._hashParameters={}},$prototype:{_getHash:function(){return Aria.$window.document.location.hash},_setHash:function(e){Aria.$window.document.location.hash=e},getParameter:function(e){var t=this._getHash();t=t.substring(1);var n=t.split("&");for(var r=0,i=n.length;r<i;r++){var s=n[r];if(s.indexOf("=")!=-1){var o=s.split("=");if(e==o[0])return o[1]}}return""},setParameter:function(e,t){var n=this._getHash(),r=
[e,t].join("=");n=n.substring(1)||"";var i=!1,s=n.split("&");for(var o=0,u=s.length;o<u;o++){var a=s[o];if(a.indexOf("=")!=-1){var f=a.split("=");e==f[0]&&(i=!0,s[o]=r)}}i||(s[s.length-1]===""?s[s.length-1]=r:s.push(r)),n="#"+s.join("&"),this._setHash(n)}}};Aria.classDefinition(e)})();
//*******************
//LOGICAL-PATH:aria/tester/runner/utils/TestUtils.js
//*******************
(function(){var e={$classpath:"aria.tester.runner.utils.TestUtils",$singleton:!0,$prototype:{getTestSuiteInfo:function(e){var t=e.instance,n=t.getAllSubTestSuites().length,r=t.getAllSubTestCases().length;return this._formatTestSuiteInfo(n,r)},_formatTestSuiteInfo:function(e,t){var n=e?e+" test suite"+(e>1?"s":""):null,r=t?t+" test case"+(t>1?"s":""):null;return t&&e?[n,r].join(" and "):t||e?[n,r].join(""):"no test available in this suite !"},formatTestCaseName:function(e,t){var n=e.classpath,r=this._formatTestCaseClasspath
(n,t);return r},_formatTestCaseClasspath:function(e,t){var n=e.split("."),r=n[n.length-1];return n[n.length-1]="<b>"+r+"</b>",t?"<b>"+r+"</b>":n.join(".")},formatTestErrorsCount:function(e){var t=e.instance.getErrors(),n=t.length;return n+" error"+(n!=1?"s":"")},formatTestSuiteName:function(e){var t=e.$classpath||e.classpath,n=this._formatTestSuiteClasspath(t);return n},_formatTestSuiteClasspath:function(e){var t=e.split(".");return t[t.length-1].replace("TestSuite","")},getSubTestsAsArray:function(e){var t=
[],n=e.getSubTests();for(var r=0,i=n.length;r<i;r++){var s=n[r],o=s.instance;if(o&&o.$TestSuite){if(o.isSelected()!==-1&&!o.isSkipped()){var u=this.getSubTestsAsArray(o);o.getSubTests().length!=o.getSubTestSuites().length&&u.length!==0&&t.push(s),t=t.concat(u)}}else t.push(s)}return t},getUnselectedSubSuites:function(e){var t=[],n=e.getSubTestSuites();for(var r=0,i=n.length;r<i;r++){var s=n[r].instance;s.isSelected()==-1?t.push(s.$classpath):s.isSelected()===0&&(t=t.concat(this.getUnselectedSubSuites(s)))}return t
}}};Aria.classDefinition(e)})();
//*******************
//LOGICAL-PATH:aria/tester/runner/view/BaseCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.BaseCSS'
}}
{macro getErrorCountStyle(state, r, g, b)}
    .errorCounterBox.${state} {
        color : {call rgb(r, g, b, 160)/};
        text-shadow : 1px 1px 1px {call rgb(r, g, b,-10)/};

        {call getButtonStyle(r, g, b)/}
        {call borderRadius("3px")/}
    }
    .errorCounterBox.${state}Pushed {
        color : {call rgb(r, g, b, 160)/};
        text-shadow : 1px 1px 1px {call rgb(r, g, b,-10)/};
        {call getPushedButtonStyle(r, g, b, 20)/}
        {call borderRadius("3px")/}
    }
    .errorCounterBox.${state}:hover {
        {call getButtonStyle(r, g, b, 10)/}
    }
{/macro}

{macro getButtonStyle(r, g, b, mod)}
    {if aria.core.Browser.isIE7 || aria.core.Browser.isIE8}
        color :  white;
    {/if}
    {var m = mod || 0/}
    {var buttonWidth = 1/}
    background : {call rgb(r,g,b,m)/};
    {call gradient(r,g,b, 60+m, m)/}
    border : Solid ${buttonWidth}px {call rgb(r,g,b,m-20)/};
    border-top : Solid ${buttonWidth}px {call rgb(r,g,b,m-40)/};
    border-bottom : Solid ${buttonWidth}px {call rgb(r,g,b,m-40)/};
    cursor : pointer;
{/macro}

{macro getPushedButtonStyle(r, g, b, mod)}
    {if aria.core.Browser.isIE7 || aria.core.Browser.isIE8}
        color :  {call rgb(r,g,b,-90)/};
    {/if}
    {var mod = mod || 0/}
    {var buttonWidth = 1/}
    background : {call rgb(r,g,b,mod)/};
    {call gradient(r,g,b, mod-20, mod)/}
    border : Solid ${buttonWidth}px {call rgb(r,g,b,mod-40)/};
    border-top : Solid ${buttonWidth}px {call rgb(r,g,b,mod-60)/};
    border-bottom : Solid ${buttonWidth}px {call rgb(r,g,b,mod-60)/};
    cursor : default;
{/macro}
    {macro gradient(r, g, b, from, to)}
        {if aria.core.Browser.isFirefox}
            background-image: -moz-linear-gradient(top, {call rgb(r,g,b,from)/}, {call rgb(r,g,b,to)/});
        {elseif aria.core.Browser.isIE9/}
            background-image: linear-gradient(top, {call rgb(r,g,b,from)/}, {call rgb(r,g,b,to)/});
        {elseif aria.core.Browser.isChrome/}
            background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from({call rgb(r,g,b,from)/}), to({call rgb(r,g,b,to)/}));
        {elseif aria.core.Browser.isSafari/}
            background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from({call rgb(r,g,b,from)/}), to({call rgb(r,g,b,to)/}));
        {/if}
    {/macro}
    
    {macro gradientH(r, g, b, from, to)}
        {if aria.core.Browser.isFirefox}
            background-image: -moz-linear-gradient(left, {call rgb(r,g,b,from)/}, {call rgb(r,g,b,to)/});
        {elseif aria.core.Browser.isIE9/}
            background-image: linear-gradient(left, {call rgb(r,g,b,from)/}, {call rgb(r,g,b,to)/});
        {elseif (aria.core.Browser.isChrome || aria.core.Browser.isSafari)/}
            background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, from({call rgb(r,g,b,from)/}), to({call rgb(r,g,b,to)/}));
        {/if}
    {/macro}
    {macro shadow(textContent)}
        {if aria.core.Browser.isFirefox}
            box-shadow : ${textContent};
            -moz-box-shadow : ${textContent};
        {elseif aria.core.Browser.isIE9/}
            box-shadow : ${textContent};
        {elseif aria.core.Browser.isChrome/}
            -webkit-box-shadow : ${textContent};
        {elseif aria.core.Browser.isSafari/}
            -webkit-box-shadow : ${textContent};
        {/if}
    {/macro}
    
    {macro borderRadius(textContent)}
        {if aria.core.Browser.isFirefox}
            border-radius : ${textContent};
            -moz-border-radius : ${textContent};
        {elseif aria.core.Browser.isIE9/}
            border-radius : ${textContent};
        {elseif aria.core.Browser.isChrome/}
            -webkit-border-radius : ${textContent};
        {elseif aria.core.Browser.isSafari/}
            -webkit-border-radius : ${textContent};
        {/if}
    {/macro}
    
    {macro rgb(r,g,b,mod)}rgb(${Math.min(Math.max(r+mod,0),255)}, ${Math.min(Math.max(g+mod,0),255)}, ${Math.min(Math.max(b+mod,0),255)}){/macro}

{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/config/Config.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.config.Config',
    $hasScript:true,
    $width : {value:200},
    $height : {min:125},
    $css : ['aria.tester.runner.view.config.ConfigCSS']
}}
    {macro main()}    
        <h1>Select Suites</h1>
        <div {id "left"/} style="
            overflow-y : scroll;
            overflow-x : hidden;
            width : 200px;
            height : ${$vdim(95,1)}px;
        ">
            {call displaySuitesAsTree()/}
        </div>
    {/macro}
    {macro displaySuitesAsTree()}
        {section {
            id: "suitesTree",
              bindRefreshTo : [{
               inside : data.campaign,
               to : "testsTree"
              }],
              type:"div"
          }}
              
            {var test = data.campaign.testsTree[0]/}
            {if (test && test.$TestSuite)}
                <table class="reportTable" style="
                    {if aria.core.Browser.isIE} 
                        width:${$hdim(186,1)}px;
                    {else/}
                        width : 100%;
                    {/if}
                "
                >
                <tbody>
                    {var testWrapper = {classpath:test.$classpath,instance:test}/}
                    <tr 
                    {on mouseup {
                        fn : this.onSuiteClick,
                        scope : this,
                        args : {testSuite : test}
                    }/}
                    title="${this.getSuiteInfo(testWrapper)}">
                    <td style="padding-left:5px">
                        {var suiteName = this.getSuiteName(testWrapper)/}
                        {var isSelected =  test.isSelected()/}
                        {call displaySelect(isSelected)/}
                        <b>${suiteName}</b>
                            {call displaySuite(test, 1)/}
                        </td>
                    </tr>
                </tbody>
                </table>
            {/if}
        {/section}
    {/macro}
    
    {macro displaySuite(testSuite, nesting)} 
        {var tests=testSuite.getSubTests()/}
        {foreach test in tests} 
            {var instance = test.instance/}
            {var suiteName = this.getSuiteName(test)/}
            {var isTestSuite = !!(instance && instance.$TestSuite)/}
            {if (isTestSuite===true)}
                <tr 
                    {on mouseup {
                        fn : this.onSuiteClick,
                        scope : this,
                        args : {testSuite : instance}
                    }/}
                    title="${this.getSuiteInfo(test)}">
                    <td style="padding-left:${5 + (15*nesting)}px">
                        {var isSelected = instance && instance.isSelected()/}
                        {call displaySelect(isSelected)/}
                        <b>${suiteName}</b>
                        {call displaySuite(instance, nesting+1)/}
                    </td>
                </tr>
            {/if}
        {/foreach}
    {/macro}
    
    {macro displaySelect(isSelected)}
        {if isSelected === 1}
            {var classname = "filled"/}
        {elseif isSelected === 0/}
            {var classname = "half"/}
        {else/}
            {var classname = "empty"/}
        {/if}
        <div class="select">
            <div class="innerSelect ${classname}"></div>
        </div>
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/config/ConfigCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.config.ConfigCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    {var mainColor = "rgb(" + baseColor.r + ","  + baseColor.g + "," + baseColor.b + ")"/}
    {var r=baseColor.r/}
    {var g=baseColor.g/}
    {var b=baseColor.b/}
    tr {
        cursor : pointer;
        color : {call rgb(r, g, b, 0)/};
    }
    
    tr:hover {
        color : {call rgb(r, g, b, 50)/};
    }
    
    tr .select {
        width : 9px;
        height : 9px;
        border : 1px solid {call rgb(r, g, b, 0)/};;
        float : left;
        margin-right : 3px;
        margin-top : 1px;
    }
    tr:hover .select {
        border : 1px solid {call rgb(r, g, b, 50)/};
    }
    
    
    .innerSelect {
        width : 7px;
        height : 7px;
        border : 1px solid white;
        float : left;
        background: {call rgb(r, g, b, 0)/};
    }
    
    .innerSelect.half{
        width : 3px;
        height : 3px;
        border : 3px solid white;
    }
    
    .innerSelect.empty{
        background:white;
    }
    
    
    tr:hover .innerSelect.filled,  tr:hover .innerSelect.half{
        background:{call rgb(r, g, b, 50)/};
    }
{/macro}
{/CSSTemplate}

//*******************
//LOGICAL-PATH:aria/tester/runner/view/config/ConfigScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.config.ConfigScript",$dependencies:["aria.tester.runner.utils.TestUtils","aria.tester.runner.utils.Hash"],$prototype:{getSuiteInfo:function(e){var t=aria.tester.runner.utils.TestUtils;return t.getTestSuiteInfo(e)},getSuiteName:function(e){var t=aria.tester.runner.utils.TestUtils;return t.formatTestSuiteName(e)},onSuiteClick:function(e,t){var n=t.testSuite;n.isSelected()==-1?n.setSelected():n.setUnselected(),this.moduleCtrl.updateTests()}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/view/filter/Filter.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.filter.Filter',
    $hasScript:true,
    $width : {min:178},
    $height : {value:25},
    $css : ['aria.tester.runner.view.filter.FilterCSS']
}}
    {macro main()}
        {section {
            id: "filterSection",
              bindRefreshTo : [{
               inside : data.view.filter,
               to : "type"
              }],
              type:"div"
          }}
            <div {on click {
                fn : this.onFilterLinkClick,
                scope : this,
                args : {}
            }/} class="linkContainer" >
                <div 
                    style="margin-left:10px"
                    class="filterLink ${data.view.filter.type=='all' ? 'selected' : ''}" 
                    title="display all tests"
                    data-type="all">
                    All
                </div> 
                <div class="divider"></div> 
                <div 
                    class="filterLink ${data.view.filter.type=='errors' ? 'selected' : ''}" 
                    title="display tests with errors"
                    data-type="errors">
                    Errors
                </div> 
                <div 
                    class="filterLink ${data.view.filter.type=='warnings' ? 'selected' : ''}" 
                    title="display tests with warnings"
                    data-type="warnings">
                    Warnings
                </div>
            </div>
        {/section}
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/filter/FilterCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.filter.FilterCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    {var mainColor = "rgb(" + baseColor.r + ","  + baseColor.g + "," + baseColor.b + ")"/}
    {var r=baseColor.r/}
    {var g=baseColor.g/}
    {var b=baseColor.b/}
    .linkContainer {
        background: rgb(236,236,236);
        {call gradient(236,236,236,0,-30)/}
        border-bottom : 1px Solid #aaa;
        position : relative;
        height : 20px;
        width : 100%;
        padding-top : 4px;
    }
    .linkContainer div {
        float:left;
        color : #2e2e2e;
        text-shadow : rgb(230,230,230) 0 1px 0;
        font-weight : bold;
        {if aria.core.Browser.isChrome}
            font-size : 11px;
        {elseif (aria.core.Browser.isFirefox && (aria.core.Browser.version.substring(0,1)*1) < 4)/}
            font-size : 11px;
        {else/}
            font-size : 10px;
        {/if}
    }
    .filterLink {
        cursor : pointer;
        margin-left : 3px;
        margin-right : 3px;
        padding-left:7px; 
        padding-right:7px; 
        padding-bottom:2px; 
        
        background : transparent;
        
        border-color: transparent;
        border-style: solid;
        border-width: 1px;
        {call borderRadius("8px")/};
    }
    .filterLink:hover {
        color : white;
        text-shadow : #2e2e2e 0 1px 0;
        background : #bbb;
        border-color: #999 #bbb #f3f3f3;
    }
    .filterLink.selected {
        color : white;
        text-shadow : #2e2e2e 0 1px 0;
        background : #999;
        border-color: #666666 #999999 #EEEEEE;
    }
    .divider {
        margin: 1px 3px 0px 3px;
        background-color: #999;
        height: 14px;
        width: 1px;
        vertical-align: middle;
        display: inline-block;
    }
{/macro}
{/CSSTemplate}

//*******************
//LOGICAL-PATH:aria/tester/runner/view/filter/FilterScript.js
//*******************
(function(){var e={$classpath:"aria.tester.runner.view.filter.FilterScript",$prototype:{onFilterLinkClick:function(e,t){var n=e.target.getData("type");n&&this.$json.setValue(this.data.view.filter,"type",n)}}};Aria.tplScriptDefinition(e)})();
//*******************
//LOGICAL-PATH:aria/tester/runner/view/header/Header.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.header.Header',
    $hasScript:true,
    $width : {"min":178},
    $height : {value:50},
     $css:['aria.tester.runner.view.header.HeaderCSS']
}}
    {macro main()}    
        <div id="header">
            {call displayStartButton()/}
            {call displayGauge()/}
            {call displayErrorCounter()/}
        </div>
    {/macro}
    
    {macro displayStartButton()}
        {section {
            id: "startButton",
              bindRefreshTo : [{
               inside : data.flow,
               to : "currentState"
              }]
          }}
          
              {var cssclass = "button"/}
              {if this.isButtonDisabled()}
                  {set cssclass += " disabled"/}
              {/if}
            
              <div 
                {on click {fn:"_onStartTestsButtonClick", scope: this, args: {}}/}
                id="startTestsButton" class="${cssclass}">
                ${this.getButtonLabel()}
            </div>
        {/section}
    {/macro}
    
    {macro displayGauge()}
        {section {
            id: "gauge",
              bindRefreshTo : [{
               inside : data.campaign,
               to : "progress" 
              }]
          }}
              {var progress = data.campaign.progress/}
            {var containerWidth = $hdim(25)/}
            
            {var progressText = "Progress : " + progress + "%" /}
            {var filledWidth = (containerWidth/100)*progress/}
            {var emptyWidth = Math.floor(containerWidth - filledWidth)/}
            <div id="testGauge" style="width:${containerWidth}px">
                <span id="gaugeEmpty" style="width:${emptyWidth}px">${progressText}</span>
                <span id="gaugeFilled" style="width:${filledWidth}px">${progressText}</span>
            </div>
        {/section}
    {/macro}
    
    {macro displayErrorCounter()}
        {section {
            id: "errorCounter",
              bindRefreshTo : [{
               inside : data.campaign,
               to : "errorCount" 
              },{
               inside : data.flow,
               to : "currentState"
              }]
          }}
              {var errorCount = data.campaign.errorCount/}
              {var classname = "errorCounterBox"/}
              {if errorCount === 0}
                  {set classname += " noError"/}
                  {if data.flow.currentState=="finished"}
                      {set classname += "Finished"/}
                  {elseif data.flow.currentState=="ongoing"/}
                      {set classname += "Ongoing"/}
                  {/if}
              {else/}
                  {set classname += " error"/}
              {/if}
              {if (data.flow.currentState!="finished")}
                {set classname += "Pushed"/}
            {/if}
            <div {on click {fn:"_onErrorCountClick", scope: this, args: {}}/}
            class="${classname}" title="${errorCount} failed test${errorCount!=1?"s":""}">
                ${errorCount}
            </div>
        {/section}
    {/macro}
    {macro displayLeftHefader()}
        {section {
            id: "leftHeader",
            bindRefreshTo : [{
               inside : data.flow,
               to : "currentState" 
            }]
        }}
            {if (data.flow.currentState == "ongoing")}
                {section {
                    id: "currentClasspath",
                    bindRefreshTo : [{
                       inside : data.campaign,
                       to : "currentClasspath" 
                    }]
                }}
                    {var currentClasspath = data.campaign.currentClasspath/}
                    <div id="currentTest">${currentClasspath}</div>
                {/section}
            {/if}
            {if (data.flow.currentState == "finished")}
                <div id="currentTest">0 undisposed objects (FAKE)</div>
            {/if}
        {/section}
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/header/HeaderCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.header.HeaderCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    {var mainColor = "rgb(" + baseColor.r + ","  + baseColor.g + "," + baseColor.b + ")"/}
    {var r=baseColor.r/}
    {var g=baseColor.g/}
    {var b=baseColor.b/}
    #header {
        height : 49px;
        border-bottom : 1px Solid #ddd;
        {call borderRadius("5px 5px 0px 0px")/}
        
        font-family: Arial,'Helvetica Neue',Helvetica,sans-serif;
           font-size: 10pt;
           
        background : white;
    }
    #header * {
        display : inline-block;
        float : left;
    }
    
    #headerText{
        position : relative;
        display : inline-block;
        margin : 7px 10px 10px 7px;
        color : #fafafa;
        font-size : 20pt;
        text-shadow: 0px 0px 1px #fff;
    }
    #startTestsButton{
        color :  {call rgb(r,g,b,-90)/};
        font-weight : bold;
        text-shadow : 0px 1px 0px {call rgb(r,g,b,70)/};
        padding-top : 6px;
        text-decoration : none;
        width : 75px;
        text-align : center;
        {call borderRadius("4px")/}
        {call getButtonStyle(r, g, b)/}
        height : 22px;
        margin-top : 10px;
        margin-left : 10px;
    }
    
    #startTestsButton:hover{
        {call getButtonStyle(r, g, b, 20)/}
    }
    
    #startTestsButton.disabled, #startTestsButton:active{
        cursor : default;
        text-shadow : 0px 1px 0px {call rgb(r,g,b,30)/};
        {call getPushedButtonStyle(r, g, b)/}
    }
    
    #testGauge {
        display : inline-block;
        height : 24px;
        
        background : #fafafa;
        border : 1px Solid #bbb;
        {call borderRadius("3px")/}
        
        margin-left : 10px;
        margin-top : 10px;
        padding : 2px;
        
        overflow : hidden;
    }
    
    #testGauge span{
        position : absolute;
        display : inline-block;
        overflow:hidden;
        height : 20px;
        {call borderRadius("3px")/}
        padding-top : 4px;    
        text-indent: 4px;
        white-space : nowrap;
    }
    
    #gaugeFilled {
        z-index : 5003;
        background : ${mainColor};
        width : 0px;
        color:white;
    }
    #gaugeEmpty {
        display : inline-block;
        z-index : 5002;
        color : ${mainColor};
    }
    
    .errorCounterBox {
        margin-left : 10px;
        margin-top : 10px;
        {if (aria.core.Browser.isChrome ||aria.core.Browser.isIE)}
            height : 26px;
            padding-top : 2px;
        {else/}
            height : 27px;
            padding-top : 1px;
        {/if}
        width : 30px;
        
        text-align : center;
        font-size : 20px;
    }
    
    {call getErrorCountStyle("noError", 200, 200, 200)/}
    {call getErrorCountStyle("error", 220, 90, 90)/}
    {call getErrorCountStyle("noErrorFinished", 55, 160, 55)/}
    {call getErrorCountStyle("noErrorOngoing", 255, 165, 0)/}
{/macro}
{/CSSTemplate}

//*******************
//LOGICAL-PATH:aria/tester/runner/view/header/HeaderScript.js
//*******************
(function(){var e={$classpath:"aria.tester.runner.view.header.HeaderScript",$prototype:{_onStartTestsButtonClick:function(){var e=this.data.flow.currentState,t=this.flowCtrl.STATES;e==t.READY?this.moduleCtrl.startCampaign():e==t.ONGOING?this.flowCtrl.navigate(t.PAUSING):e==t.PAUSED?this.flowCtrl.navigate(t.RESUMING):e==t.FINISHED&&this.reload()},_onErrorCountClick:function(e,t){this.flowCtrl.navigate(this.flowCtrl.STATES.REPORT)},isButtonDisabled:function(){var e=this.data.flow.currentState;return this.__isButtonDisabledForState
(e)},__isButtonDisabledForState:function(e){var t=[];return t.push(this.flowCtrl.STATES.INIT),t.push(this.flowCtrl.STATES.FAILURE),t.push(this.flowCtrl.STATES.PAUSING),t.push(this.flowCtrl.STATES.RESUMING),t.push(this.flowCtrl.STATES.OPTIONS),aria.utils.Array.indexOf(t,e)!=-1?!0:!1},getButtonLabel:function(){var e=this.data.flow.currentState;return this.__getButtonLabelForState(e)},__getButtonLabelForState:function(e){return e==this.flowCtrl.STATES.READY||e==this.flowCtrl.STATES.OPTIONS?"Run":e==this.flowCtrl
.STATES.INIT||e==this.flowCtrl.STATES.FAILURE||e==this.flowCtrl.STATES.RESUMING?"Loading":e==this.flowCtrl.STATES.FINISHED||e==this.flowCtrl.STATES.REPORT?"Reload":e==this.flowCtrl.STATES.ONGOING?"Pause":e==this.flowCtrl.STATES.PAUSING?"Pausing":e==this.flowCtrl.STATES.PAUSED?"Resume":"#"+e+"#"},reload:function(){this.moduleCtrl.reload()}}};Aria.tplScriptDefinition(e)})();
//*******************
//LOGICAL-PATH:aria/tester/runner/view/links/Links.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.links.Links',
    $hasScript:true,
    $width : {value:200},
    $height : {min:125},
    $css:['aria.tester.runner.view.links.LinksCSS']
}}
    {macro main()}    
        <h1>Links</h1>
        <ul class="container">
            {var topspotLinks = this.getTopspotLinks()/}
            {foreach link in topspotLinks} 
                <li class="item">
                    <a 
                        href="${link.href}" 
                        target="_blank"
                    >
                        ${link.title}
                    </a>
                </li>
            {/foreach}
            {var keyboardShortcuts = getKeyboardShortcuts()/}
            {foreach link in keyboardShortcuts} 
                <li class="item">
                    <a 
                        {on click {
                            fn : link.callback,
                            scope : this                        
                        }/}
                    >
                        Press <b>${link.key}</b> : ${link.description}
                    </a>
                </li>
            {/foreach}
        </ul>
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/links/LinksCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.links.LinksCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    .container {
        padding-left : 20px;
        margin : 10px;
    }
    
    .item {
        list-style-type : disc;
        margin-top : 10px;
        color : {call rgb(baseColor.r, baseColor.g, baseColor.b, 0)/};
    }
    
    a {
        color : {call rgb(baseColor.r, baseColor.g, baseColor.b, 0)/};
    }
{/macro}

{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/links/LinksScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.links.LinksScript",$prototype:{getTopspotLinks:function(){return[{href:"http://topspot/index.php/Aria_Templates_Testing_Documentation",title:"Topspot : Testing Documentation"},{href:"http://topspot/index.php/Category:Aria_Templates_Testing",title:"Topspot : Testing Category"},{href:"http://topspot/index.php/Aria_Templates_Testing_Documentation_:_Assert",title:"Topspot : List of Assert Methods"},{href:"http://topspot/index.php/Aria_Templates_Testing_Documentation_:_First_Steps_Tutorial"
,title:"Topspot : First Tutorial"},{href:"http://topspot/index.php/Aria_Templates_Testing_Documentation_:_Test_Runner",title:"Topspot : Tester User Guide"}]},getKeyboardShortcuts:function(){var e=[{key:"F",description:"fullscreen on/<b>off</b>",callback:this.switchView},{key:"R",description:"Run/Reload the test",callback:this.runTest},{key:"E",description:"Display End test report",callback:this.navigateToReport}];return e},switchView:function(){this.moduleCtrl.switchView()},navigateToOptions:function(){this.
flowCtrl.navigate(this.flowCtrl.STATES.OPTIONS)},navigateToReport:function(){this.flowCtrl.navigate(this.flowCtrl.STATES.REPORT)}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/view/logo/Logo.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.logo.Logo',
    $hasScript:false,
    $width : {value:200},
    $height : {value:90},
    $css : ['aria.tester.runner.view.logo.LogoCSS']
}}
    {macro main()}
    <div style="
        margin-left: 15px;
        margin-top: -30px;
    ">
        <div class="lowerCase">a</div><div class="upperCase">RI</div><div class="lowerCase">a</div>
    </div>
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/logo/LogoCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.logo.LogoCSS'
}}

{macro main()}
    {var mainColor = "rgb(" + baseColor.r + ","  + baseColor.g + "," + baseColor.b + ")"/}
    div {
        float : left;
        {if (aria.core.Browser.isIE && !aria.core.Browser.isIE9)}
            color : ${mainColor};    
        {else/}
            color : white;    
            text-shadow: 0px 0px 2px ${mainColor};
        {/if}
        font-family: times New Roman;
    }
     .upperCase {
         font-size: 68px;
        margin-top: 30px;
    }
    .lowerCase {
        font-size : 101px;
    }
{/macro}

{/CSSTemplate}

//*******************
//LOGICAL-PATH:aria/tester/runner/view/main/Main.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.main.Main',
     $css:['aria.tester.runner.view.main.MainCSS'],
    $hasScript:true,
    $width : {"min":180},
    $height : {"min":342}
}}
    {macro main()}
        {section {
            id : "mainSection",
            bindRefreshTo : [{
                inside : data.view.configuration,
                to : "mini"
            }]
        }}
            {if data.view.configuration.mini}
                {@aria:Template {
                    width:$hdim(180,1),
                    height:$vdim(342,1),
                    defaultTemplate:"aria.tester.runner.view.mini.Mini"
                } /}
            {else/}
                {@aria:Template {
                    width:$hdim(180,1),
                    height:$vdim(342,1),
                    defaultTemplate:"aria.tester.runner.view.normal.Normal"
                } /}
            {/if}
        {/section}
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/main/MainCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.main.MainCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    {set baseColor={
        r : 90,
        g : 150,
        b : 226
    }/}
    span {
        {if aria.core.Browser.isIE}
            float : left;
        {/if}
    }
    
    .header {
        background: {call rgb(baseColor.r+10, baseColor.g+5, baseColor.b, 140)/};
        background: {call rgb(0,0,0,245)/};
        background: rgb(233, 241, 251);
        
        position : absolute;
        top : 0px;
        left : 0px;
        z-index:0;
        height : 100px;
    }
    
    .monitor {
        margin-top:50px;
        position:relative;
        float:left;
        z-index:10000;
        {call shadow("0px 0 4px rgba(0,0,0,0.4)")/} 
        {call borderRadius("5px 5px 0px 0px")/} 
        overflow : hidden;
    }
{/macro}

{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/main/MainScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.main.MainScript",$prototype:{navigate:function(e){this.flowCtrl.navigate(e)},$displayReady:function(){this.__connectKeyboardEvents(),this.flowCtrl.displayReady()},__connectKeyboardEvents:function(){var e=[["F",this.__onSwitchKeyPressed],["R",this.__onRunKeyPressed],["E",this.__onEndTestReportKeyPressed]];for(var t=0,n=e.length;t<n;t++)aria.templates.NavigationManager.addGlobalKeyMap({key:e[t][0],callback:{fn:e[t][1],scope:this}})},__onSwitchKeyPressed
:function(){var e=this.data.flow.currentState;return e!=this.flowCtrl.STATES.FAILURE&&this.moduleCtrl.switchView(),!0},__onOptionsKeyPressed:function(){var e=this.data.flow.currentState;return e==this.flowCtrl.STATES.OPTIONS?this.flowCtrl.navigate(this.flowCtrl.STATES.READY):e==this.flowCtrl.STATES.READY&&this.flowCtrl.navigate(this.flowCtrl.STATES.OPTIONS),!0},__onRunKeyPressed:function(){var e=this.data.flow.currentState;return e==this.flowCtrl.STATES.READY?this.moduleCtrl.startCampaign():(e==this.flowCtrl
.STATES.FINISHED||e==this.flowCtrl.STATES.REPORT)&&this.moduleCtrl.reload(),!0},__onEndTestReportKeyPressed:function(){var e=this.data.flow.currentState;return e==this.flowCtrl.STATES.FINISHED?this.flowCtrl.navigate(this.flowCtrl.STATES.REPORT):e==this.flowCtrl.STATES.REPORT&&this.flowCtrl.navigate(this.flowCtrl.STATES.FINISHED),!0}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/view/mini/Mini.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.mini.Mini',
     $css:['aria.tester.runner.view.mini.MiniCSS'],
    $hasScript:true,
    $width : {"min":180},
    $height : {"min":342}
}}
    {macro main()}
        <div  style="position:absolute;top:0px;left:0px;z-index:12000">
            {@aria:Template {
                defaultTemplate:"aria.tester.runner.view.popup.Popup"
            } /}
        </div>
        <div class="monitor" style="
            height : ${$vdim(342)}px;
            width : ${$hdim(180)}px;
        ">
            {@aria:Template {
                height:$vdim(342,1),
                width:$hdim(180,1),
                defaultTemplate:"aria.tester.runner.view.monitor.Monitor"
            } /}
        </div>
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/mini/MiniCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.mini.MiniCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    {set baseColor={
        r : 90,
        g : 150,
        b : 226
    }/}
    
    span {
        float:left;
    }
    
    .header {
        background: {call rgb(baseColor.r+10, baseColor.g+5, baseColor.b, 140)/};
        background: {call rgb(0,0,0,245)/};
        background: rgb(233, 241, 251);
        
        position : absolute;
        top : 0px;
        left : 0px;
        z-index:0;
        height : 100px;
    }
    
    .monitor {
        margin-left:0px;
        margin-top:0px;
        position:relative;
        float:left;
        z-index:10000;
        {call borderRadius("5px 5px 0px 0px")/} 
        overflow : hidden;
    }
{/macro}

{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/mini/MiniScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.mini.MiniScript",$prototype:{navigate:function(e){this.flowCtrl.navigate(e)},$displayReady:function(){this.flowCtrl.displayReady()}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/view/monitor/Monitor.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.monitor.Monitor',
    $hasScript:false,
    $width : {min:180},
    $height : {min:282},
    $css : ['aria.tester.runner.view.monitor.MonitorCSS']
}}
    {macro main()}
        {var width = 180-2/}
        <div class="monitorContainer" 
            style="
                height : ${$vdim(280)}px;
                width : ${$hdim(width)}px;
        ">
            {@aria:Template {
                width:$hdim(width,1),
                height:50,
                defaultTemplate:"aria.tester.runner.view.header.Header",
                block:true
            } /}
            {@aria:Template {
                width:$hdim(width,1),
                height:25,
                defaultTemplate:"aria.tester.runner.view.filter.Filter",
                block:true
            } /}
            {@aria:Template {
                width:$hdim(width,1),
                height:$vdim(203,1),
                defaultTemplate:"aria.tester.runner.view.report.Report",
                block:true
            } /}
        </div>
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/monitor/MonitorCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.monitor.MonitorCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    .monitorContainer {
        position:relative;
        float:left;
        border : Solid 1px #ddd;
        {call borderRadius("5px 5px 0px 0px")/} 
    }
{/macro}
{/CSSTemplate}

//*******************
//LOGICAL-PATH:aria/tester/runner/view/nav/Nav.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.nav.Nav',
    $hasScript:false,
    $width : {value:200},
    $height : {min:342},
     $css:['aria.tester.runner.view.nav.NavCSS']
}}
    {macro main()}    
        <div style="float:left; overflow:hidden;">
            {call displayLogo()/}
            {call displayWidgets()/}
        </div>
    {/macro}
    
    {macro displayLogo()}
        <div style="
            position:relative;
            height : 90px;
            width:200px;
        ">
            {@aria:Template {
                width:200,
                height:90,
                defaultTemplate:'aria.tester.runner.view.logo.Logo'
            } /}
        </div>
    {/macro}
    
    {macro displayWidgets()}
        {call displayWidget("Select Suites", 'aria.tester.runner.view.config.Config')/}
        {call displayWidget("Documentation", 'aria.tester.runner.view.links.Links')/}
    {/macro}
    
    {macro displayWidget(title, classpath)} 
        {@aria:Template {
            width:200,
            height:$vdim(125,0.5),
            defaultTemplate:classpath,
            block:true
        } /}
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/nav/NavCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.nav.NavCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    {var mainColor = "rgb(" + baseColor.r + ","  + baseColor.g + "," + baseColor.b + ")"/}
    {var r=baseColor.r/}
    {var g=baseColor.g/}
    {var b=baseColor.b/}
    
    h1 {
        color : white;
        font-size:16px;
        font-weight:normal;
        background : {call rgb(r,g,b, 0)/};
        border-top : 2px Solid {call rgb(r,g,b, 20)/};
        border-bottom : 2px Solid {call rgb(r,g,b, -20)/};
        height : 22px;
        text-indent : 10px;
        padding-top : 4px;
        margin: 0px;
    }
{/macro}
{/CSSTemplate}

//*******************
//LOGICAL-PATH:aria/tester/runner/view/normal/Normal.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.normal.Normal',
    $hasScript:true,
    $width : {"min":390},
    $height : {"min":342}
}}
    {macro main()}    
        <div  style="position:absolute;top:0px;left:0px;z-index:12000">
            {@aria:Template {
                defaultTemplate:"aria.tester.runner.view.popup.Popup"
            } /}
        </div>
        <div class="header" style="
            width : ${$hdim(390)}px;
        ">
        </div>
        <div style="float:left;position:relative">
        {@aria:Template {
            width:200,
            height:$vdim(342,1),
            defaultTemplate:"aria.tester.runner.view.nav.Nav"
        } /}
        </div>
        <div class="monitor" style="
            height : ${$vdim(282)}px;
            width : ${$hdim(180)}px;
        ">
            {@aria:Template {
                height:$vdim(282,1),
                width:$hdim(180,1),
                defaultTemplate:"aria.tester.runner.view.monitor.Monitor"
            } /}
        </div>
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/normal/NormalScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.normal.NormalScript",$prototype:{navigate:function(e){this.flowCtrl.navigate(e)},$displayReady:function(){this.flowCtrl.displayReady()}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/Popup.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.popup.Popup',
    $hasScript:true,
    $css:['aria.tester.runner.view.popup.PopupCSS']
}}
    {macro main()}    
        {section {
            id:"mainSection",
            bindRefreshTo:[{
                inside : data.flow,
                to : "currentState"
            }]
        }}
            {call displayReport()/}
        {/section}
    {/macro}
    {macro displayReport()}
        {if data.flow.currentState == "report"}
            {@aria:Template {
                defaultTemplate:"aria.tester.runner.view.popup.report.Report"
            } /}
        {elseif data.flow.currentState == "failure"/}
            {@aria:Template {
                defaultTemplate:"aria.tester.runner.view.popup.warning.Warning"
            } /}
        {elseif data.flow.currentState == "options"/}
            {@aria:Template {
                defaultTemplate:"aria.tester.runner.view.popup.options.Options"
            } /}
        {/if}
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/PopupCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.popup.PopupCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    .mask, .popup {
        position:fixed;
    }
    .mask {
        position : fixed;
        top:0px;
        left:0px;
        {if (aria.core.Browser.isIE && !aria.core.Browser.isIE9)}
            height : 100%;
            width : 100%;
            background:rgb(0,0,0);
            filter: alpha(opacity=20);
        {else/}
            right:0px;
            bottom:0px;
            background:rgba(0,0,0,0.2);
        {/if}
        z-index:12000;
    }
    .popup {
        top:50%;
        left:50%;
        
        background:white;
        border: 1px Solid #ddd;
        
        {call borderRadius("8px")/}
        {call shadow("0px 0 4px rgba(0,0,0,0.6)")/} 
        
        z-index:12001;
    }
    
    h1 {
        margin-top : 7px;
        margin-bottom : 5px;
        color :  {call rgb(baseColor.r, baseColor.g, baseColor.b, 0)/};
        text-shadow : 0px 1px 0px #D4E3F7, 0px -1px 0px #0F2E57;
        text-align:center;
        font-size : 25px;
        font-family : Verdana;
        font-weight : normal;
        
    }
    .separator {
        margin-left : 19px;
        height : 1px;
        background: rgb(200,200,200);
        {call gradientH(255, 255, 255, -10, -40)/}
    }
    
    {var failedColor = "rgb(245,70,70)"/}
    .content {
        margin-left : 19px;
        overflow-y : scroll;
        color : ${failedColor};
    }
    
    .buttonContainer {
        float : right;   
        margin-bottom: 5px;
        margin-right: 10px;
        margin-top: 5px;
    }
    
    .popupButton {
        float:left;
        padding-top : 2px;
        color :  #444;
        font-weight : bold;
        text-shadow : 0px 1px 0px white;
        cursor : pointer;
        width : 50px;
        text-align : center;
        {call borderRadius("4px")/}
        {call getButtonStyle(200, 200, 200)/}
        margin-top:1px;
        margin-left:5px;
        height : 16px;
    }
    .popupButton:hover {
        {call getButtonStyle(200, 200, 200, 20)/}
    }
    .popupButton.reload {
        color :  {call rgb(baseColor.r, baseColor.g, baseColor.b,-90)/};
        text-shadow : 0px 1px 0px {call rgb(baseColor.r, baseColor.g, baseColor.b,70)/};
        {call getButtonStyle(baseColor.r, baseColor.g, baseColor.b)/}
    }
    .popupButton.reload:hover {
        {call getButtonStyle(baseColor.r, baseColor.g, baseColor.b, 20)/}
    }
{/macro}
{/CSSTemplate}

//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/PopupScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.popup.PopupScript",$dependencies:["aria.tester.runner.utils.TestUtils"],$prototype:{}});
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/generic/Generic.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.popup.generic.Generic',
    $hasScript:true
}}
    {macro main()}
        <div class="mask"></div>
        <div class="popup">
            <h1 class="title">{call displayPopupTitle()/}</h1>
            <div class="separator"></div>
            <div class="content">
                {call displayPopupContent()/}
            </div>
            <div class="separator"></div>
            <div class= "buttonContainer">
                {call displayButtons()/}
            </div>
        </div>
    {/macro}
    
    {macro displayButton(label, callback)}
        <div class="popupButton ${label}"
            {on click {
                fn : callback,
                scope : this
            }/}
        >
            ${getLabelWithShortcut(label)}
        </div>
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/generic/GenericScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.popup.generic.GenericScript",$dependencies:[],$constructor:function(){this.keys=this._getKeys();var e=this.keys;for(var t=0,n=e.length;t<n;t++)aria.templates.NavigationManager.addGlobalKeyMap({key:e[t][0],callback:{fn:e[t][1],scope:this}})},$destructor:function(){var e=this.keys;for(var t=0,n=e.length;t<n;t++)aria.templates.NavigationManager.removeGlobalKeyMap({key:e[t][0],callback:{fn:e[t][1],scope:this}})},$prototype:{getLabelWithShortcut:function(
e){var t="<u>"+e.substring(0,1).toUpperCase()+"</u>",n=t+e.substring(1);return n}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/options/Options.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.popup.options.Options',
    $extends:'aria.tester.runner.view.popup.generic.Generic',
    $css : ['aria.tester.runner.view.popup.options.OptionsCSS'],
    $hasScript:true
}}
    {macro displayPopupTitle()}
        Options
    {/macro}
    {macro displayPopupContent()}
        <ul class="optionsList">
            <li class="option">
                <h2 class="optionTitle">Coverage</h2>
                {@aria:CheckBox {
                    label : "Enable coverage (beta!)",
                    bind:{
                        value:{
                            inside:this.data.application.configuration, 
                            to:"coverage"
                        }
                    }
                } /}
            </li>
        </ul>
    {/macro}
    {macro displayButtons()}
        {call displayButton("apply", this._onApplyButtonClicked)/}
        {call displayButton("cancel", this._onCancelButtonClicked)/}
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/options/OptionsCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.popup.options.OptionsCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    .optionsList {
        padding-left : 20px;
    }
    
    .popup, .content {
        height : auto;
        width : auto;
    }
    
    {var popupWidth =400/}
    {var popupHeight = 300/}
    
    .popup {
        width:${popupWidth-2}px;
        height:${popupHeight-2}px;
        
        margin-top:-${popupHeight/2}px;
        margin-left:-${popupWidth/2}px;
        
        z-index:12001;
    }
    
    .content {
        height : ${popupHeight-80}px;
        width : ${popupWidth-30}px;
    }
    
    .separator {
        width : ${popupWidth-30}px;
    }
    
    .optionTitle {
        color : {call rgb(baseColor.r, baseColor.g, baseColor.b, 0)/};
        margin-top : 5px;
        margin-bottom : 5px;
        font-size : 11px;
    }
    
    .optionsList {
        margin-left : 0px;
    } 
{/macro}
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/options/OptionsScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.popup.options.OptionsScript",$dependencies:[],$prototype:{_onApplyButtonClicked:function(){this.flowCtrl.navigate(this.flowCtrl.STATES.READY)},_onCancelButtonClicked:function(){this.flowCtrl.navigate(this.flowCtrl.STATES.READY)},_getKeys:function(){var e=[["A",this._onApplyButtonClicked],["C",this._onCancelButtonClicked]];return e}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/report/Report.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.popup.report.Report',
    $extends:'aria.tester.runner.view.popup.generic.Generic',
    $css : ['aria.tester.runner.view.popup.report.ReportCSS'],
    $hasScript:true
}}
    {macro displayPopupTitle()}
        Error Report
    {/macro}
    {macro displayButtons()}
        {call displayButton("reload", this._onReloadButtonClicked)/}
        {call displayButton("close", this._onCloseButtonClicked)/}
    {/macro}
    
    {macro displayPopupContent()}
        {var tests = this.getTestsWithErrors()/}
        {if tests.length == 0}
            <div class="noerrors">
                No errors to report ! 
            </div>
        {else/}
            {foreach test in tests} 
                {var classname = "test"/}
                {if (test.classpath == this.data.view.highlightedTest)}
                    {set classname+=" highlight"/}
                {/if}
                <div class="${classname}">
                    {call displayTestErrors(test)/}        
                </div>
            {/foreach}
        {/if}
    {/macro}
    
    {macro displayTestErrors(test)}
        <div class="classpath">
            ${this.formatTestClasspath(test)}
        </div>
        <div class="count">
            (${this.formatTestErrorsCount(test)})
        </div>
        {var errors = this.getTestErrors(test)/}
        {if errors.length == 0}
            No errors to display for this test
        {else/}
            <ul>
            {foreach error in errors} 
                {call displayTestError(error, test)/}        
            {/foreach}
            </ul>
        {/if}
    {/macro}
    {macro displayTestError(error, test)}
        <li class="error">
            <div class="message">
                ${this.formatErrorMessage(error)}
            </div>
        </li>
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/report/ReportCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.popup.report.ReportCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}    
    {var popupWidth =800/}
    {var popupHeight = 500/}
    {var failedColor = "rgb(245,70,70)"/}
    
    .popup, .content {
        height : auto;
        width : auto;
    }
    
    .popup {
        width:${popupWidth-2}px;
        height:${popupHeight-2}px;
        
        margin-top:-${popupHeight/2}px;
        margin-left:-${popupWidth/2}px;
        
        z-index:12001;
    }
    
    .content {
        height : ${popupHeight-80}px;
        width : ${popupWidth-30}px;
    }
    
    .separator {
        width : ${popupWidth-30}px;
    }
    
    .noerrors {
        text-align : center;
        font-size:20px;
        color : #ddd;
        text-shadow : 0px 1px 0px #eee;
        margin-top : ${(popupHeight-100)/2}px;
    }
    
    .test {
        background : white;
        margin-top : 15px;
        font-size : 11px;
        font-family:tahoma;
        border-left : 10px Solid ${failedColor};
        border-bottom : 1px Solid ${failedColor};
        border-top : 1px Solid ${failedColor};
        padding : 5px 10px 0px;
    }
    .test.highlight {
        background : rgb(255,240,240);
    }
    .classpath {
        text-decoration : underline;
        float : left;
    }
    .count {
        margin-left : 10px;
        display : inline-block;
    }
    .error {
        font-size : 11px;
    }
{/macro}
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/report/ReportScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.popup.report.ReportScript",$dependencies:[],$prototype:{getTestsWithErrors:function(){var e=aria.tester.runner.utils.TestUtils,t=this.data.campaign.testsTree[0],n=null,r=[],i=[];t.$TestSuite?i=e.getSubTestsAsArray(t):t.$TestCase&&(i=[{instance:t,classpath:t.$classpath}]);for(var s=0,o=i.length;s<o;s++){var u=i[s],a=u.instance;a.hasError&&a.hasError()&&r.push(u)}return r},getTestErrors:function(e){return e.instance.getErrors()},formatTestClasspath:
function(e){var t=aria.tester.runner.utils.TestUtils;return t.formatTestCaseName(e)},formatTestErrorsCount:function(e){var t=aria.tester.runner.utils.TestUtils;return t.formatTestErrorsCount(e)},formatErrorMessage:function(e){return"<b>"+e.testMethod.replace("()","")+" : </b>"+e.description},_onCloseButtonClicked:function(e,t){this.__close()},_onReloadButtonClicked:function(e,t){this.moduleCtrl.reload()},__close:function(){this.data.view.highlightedTest=null,this.flowCtrl.navigate("finished")},_getKeys:function(
){var e=[["C",this._onCloseButtonClicked]];return e}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/warning/Warning.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.popup.warning.Warning',
    $extends:'aria.tester.runner.view.popup.generic.Generic',
    $hasScript:true,
    $css : ['aria.tester.runner.view.popup.warning.WarningCSS']
}}
    {macro displayPopupTitle()}
        Load Error !
    {/macro}
    {macro displayPopupContent()}
        <div style="margin-top:10px;margin-left:0px;">
            ! No TestSuite was found for the classpath : "<b>${data.campaign.rootClasspath}</b>"
        </div>
        <div style="margin:10px;margin-left:0px;color:#444">
            As explained in the documentation, we strongly suggest you create a test suite with the <b>MainTestSuite</b> classpath.
        </div>
        <div style="margin:10px;margin-left:0px;color:#444">
            Alternatively, please enter the classpath of your test suite below :
        </div>
        <br/>
        {@aria:TextField {
            bind:{value: {inside:this.data.campaign, to:"newClasspath"}},
            helptext : "Enter your classpath here"
        } /}
    {/macro}
    {macro displayButtons()}
        {call displayButton("load", this._onReloadButtonClicked)/}
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/warning/WarningCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.popup.warning.WarningCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    .optionsList {
        padding-left : 20px;
    }
    
    .popup, .content {
        height : auto;
        width : auto;
    }
    
    {var popupWidth =400/}
    {var popupHeight = 250/}
    
    .popup {
        width:${popupWidth-2}px;
        height:${popupHeight-2}px;
        
        margin-top:-${popupHeight/2}px;
        margin-left:-${popupWidth/2}px;
        
        z-index:12001;
    }
    
    .content {
        height : ${popupHeight-80}px;
        width : ${popupWidth-30}px;
    }
    
    .separator {
        width : ${popupWidth-30}px;
    }
    
    .optionTitle {
        color : {call rgb(baseColor.r, baseColor.g, baseColor.b, 0)/};
        margin-top : 5px;
        margin-bottom : 5px;
        font-size : 11px;
    }
{/macro}
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/popup/warning/WarningScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.popup.warning.WarningScript",$dependencies:[],$prototype:{_onReloadButtonClicked:function(){this.$json.setValue(this.data.campaign,"rootClasspath",this.data.campaign.newClasspath);var e=this.moduleCtrl;this.flowCtrl.navigate("init"),e.init()},_getKeys:function(){var e=[["ENTER",this._onReloadButtonClicked]];return e}}});
//*******************
//LOGICAL-PATH:aria/tester/runner/view/report/Report.tpl
//*******************
// TODOC
{Template {
    $classpath:'aria.tester.runner.view.report.Report',
    $hasScript:true,
    $width : {"min":178},
    $height : {"min":203},
    $css:['aria.tester.runner.view.report.ReportCSS']
}}
    {macro main()}
        <div {id "left"/}
            class="leftContainer"
            style="
                width : ${$hdim(178,1)}px;
                height : ${$vdim(203,1)}px;
            "
        >
            {call displayReportAsTree()/}
        </div>
        <div class="rightContainer">
            <div id="tplContainer">
                <div id="TESTAREA"></div>
            </div>
        </div>
    {/macro}

    {macro displayReportAsTree()}
        {section {
            id: "reportSection",
              bindRefreshTo : [{
               inside : data.campaign,
               to : "testsTree"
              },{
               inside : data.view.filter,
               to : "type"
              },{
               inside : data.flow,
               to : "currentState"
              }],
              type:"div"
          }}

            ${this._beforeDisplayReport()|empty:""}
            {var testsArray = this.getFilteredTestsArray()/}
            <table
                class="reportTable"
                cellspacing="1"
                style="
                {if aria.core.Browser.isIE}
                    width:${$hdim(161,1)}px;
                {/if}
            "
            >
                <tbody>
                    {foreach test in testsArray}
                        {call displayTest(test, 0)/}
                    {/foreach}
                </tbody>
            </table>
        {/section}
    {/macro}

    {macro displayTest(test)}
        {var isTestSuite = test.instance && test.instance.$TestSuite/}
        {var isFinished = test.instance && test.instance.isFinished()/}
        {var hasError = test.instance && test.instance.hasError && test.instance.hasError()/}

        {var classname = isTestSuite ? "suite" : (counter++%2? "odd" : "even")/}
        {if (isFinished && !isTestSuite)}
            {if (hasError)}
                {set classname += " failure"/}
            {else/}
                {set classname += " success"/}
            {/if}
            ${this._setLastFinishedId(counter)}
        {else/}
            {if !currentAssigned && (!isTestSuite) && (data.flow.currentState == "ongoing" || data.flow.currentState == "pausing")}
                {set classname += " current"/}
                {set currentAssigned = true/}
            {/if}
        {/if}
        <tr
            class="${classname}"
        >
            <td>
                {if (isTestSuite)}
                    <b>${getSuiteName(test.instance)}</b>
                {else/}
                        <div style="float:left;">${getTestName(test)}</div>
                    {if (hasError)}
                        <div class="errorCount"
                        {on click {fn:this._onErrorTestClick,scope:this, args:test}/}
                        {if data.flow.currentState == "finished"}
                            style="cursor:pointer; text-decoration:underline;"
                        {/if}
                        >
                        (${formatTestErrorsCount(test)})
                        </div>
                    {elseif data.flow.currentState == "finished"/}
                        <div class="testInfo">
                            ${formatTestInfo(test)}
                        </div>
                    {/if}
                {/if}
            </td>
        </tr>
        {if !isTestSuite && test.lastInSuite}
        <tr class="suite separator">
            <td>&nbsp;</td>
        </tr>
        {/if}
    {/macro}
{/Template}
//*******************
//LOGICAL-PATH:aria/tester/runner/view/report/ReportCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : 'aria.tester.runner.view.report.ReportCSS',
    $extends : "aria.tester.runner.view.BaseCSS"
}}

{macro main()}
    .leftContainer {
        position : relative;
        background : white;
        {if aria.core.Browser.isIE7}
            overflow-y : scroll;
            overflow-x : hidden;
        {else/}
            overflow-y : auto;
            overflow-x : hidden;
        {/if}
    }
    .rightContainer {
        position:absolute;
        overflow:hidden;
        top : 100px;
        left : 50px;
        width : 60px;
        height : 60px;
        z-index : 1;
    }
    {var lightColor="white"/}
    {var mainColor = "rgb(" + baseColor.r + ","  + baseColor.g + "," + baseColor.b + ")"/}
    {var failedColor = {
        r : 245,
        g : 70,
        b : 70
    }/}
    .reportTable {
        margin-right : -16px;
        position : relative;
        background-color:white;
        z-index:4000;
        width : 100%;
    }

    .reportTable tr{
        color: {call rgb(baseColor.r, baseColor.g, baseColor.b, 0)/};
    }

    .reportTable tr.even {
        background-color:{call rgb(240,243,245,0)/};
    }

    .reportTable tr.odd {
        background-color:{call rgb(250,250,250, 0)/};
    }

    .reportTable tr b{
        text-shadow: 0px 1px 0px white;
    }

    .reportTable td {
        padding : 5px;
        padding-left : 10px;
    }

    .reportTable tr.suite {
        color : ${lightColor};
        background-color:${mainColor};
        {call gradient(baseColor.r, baseColor.g, baseColor.b, 0, -20)/};
    }

    .reportTable tr.suite b{
        text-shadow: none;
    }

    .reportTable tr.suite td {
        padding-top : 2px;
        padding-bottom: 2px;
    }

    .reportTable tr.success {
        color:{call rgb(45,180,45,0)/};
    }

    .reportTable tr.failure{
        color:{call rgb(failedColor.r,failedColor.g,failedColor.b,0)/};
    }

    .reportTable tr.current {
        color:{call rgb(255,165,0,0)/};
    }

    .reportTable tr.warning {
        color:${lightColor};
        background-color:${mainColor};
        text-shadow: none;
    }

    .errorCount {
        display : inline-block;
        padding-left : 5px;
    }

    .testInfo {
        display : inline-block;
        padding-left : 5px;
        color:{call rgb(45,180,45,0)/};
    }

    .separator {
        line-height : 1px;
    }
    tr.suite.separator td {
        padding : 0;
    }
{/macro}
{/CSSTemplate}

//*******************
//LOGICAL-PATH:aria/tester/runner/view/report/ReportScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.tester.runner.view.report.ReportScript",$dependencies:["aria.tester.runner.utils.TestUtils"],$destructor:function(){this._backupScrollPosition()},$prototype:{$beforeRefresh:function(){this._backupScrollPosition()},$afterRefresh:function(){var e=this.$getElementById("left"),t=this.data.flow.currentState;if(this.lastFinishedId>10&&t==this.flowCtrl.STATES.ONGOING){var n=e.getScroll();n.scrollTop=23*(this.lastFinishedId-10),e.setScroll(n)}else{var r=this.data.view.scrollPositions
.ReportScript_left;r&&e.setScroll(r)}},_backupScrollPosition:function(){var e=this.$getElementById("left");e&&this.$json.setValue(this.data.view.scrollPositions,"ReportScript_left",e.getScroll())},_setLastFinishedId:function(e){this.lastFinishedId=e-1},getTestsArray:function(){var e=aria.tester.runner.utils.TestUtils,t=this.data.campaign.testsTree[0];if(!t)return[];if(!t.$TestSuite)return[{classpath:t.$classpath,instance:t}];var n=e.getSubTestsAsArray(t);return n},getFilteredTestsArray:function(){var e=this.
getTestsArray(),t=[];for(var n=0,r=e.length;n<r;n++){var i=e[n];this._isFiltered(i)&&t.push(i)}for(var n=0;n<t.length;n++){var s=t[n],o=t[n+1];if(!o||o.instance&&o.instance.$TestSuite)s.lastInSuite=!1;s.instance&&s.instance.$TestSuite&&(!o||o.instance&&!o.instance.$Assert)&&(t.splice(n,1),n--)}return t},_isFiltered:function(e){var t=e.instance;return this.data.view.filter.type=="all"?!0:t?t.$Assert?this.data.view.filter.type=="errors"&&t.hasError()?!0:this.data.view.filter.type=="warnings"&&t.hasWarning()?!0
:!1:!0:!1},getSuiteName:function(e){var t=aria.tester.runner.utils.TestUtils,n=t.formatTestSuiteName(e),r=e.getParentTest();return r&&r.getParentTest()?this.getSuiteName(r)+" | "+n:n},getTestName:function(e){var t=aria.tester.runner.utils.TestUtils;return t.formatTestCaseName(e,this.data.view.configuration.mini)},formatTestErrorsCount:function(e){var t=aria.tester.runner.utils.TestUtils;return t.formatTestErrorsCount(e)},formatTestInfo:function(e){var t=aria.tester.runner.utils.TestUtils,n=e.instance._totalAssertCount
,r=n+" asserts",i=e.instance._testsCount,s=i+" tests and ";return"("+s+r+")"},_beforeDisplayReport:function(){this.counter=0,this.currentAssigned=!1},_onErrorTestClick:function(e,t){this.data.view.highlightedTest=t.classpath,this.flowCtrl.navigate(this.flowCtrl.STATES.REPORT)}}});