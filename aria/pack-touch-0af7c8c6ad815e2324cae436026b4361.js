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
//LOGICAL-PATH:aria/touch/Event.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.Event",$constructor:function(){this.touchEventMap={touchstart:"touchstart",touchend:"touchend",touchmove:"touchmove"},this.touch=!0,this.__touchDetection()},$prototype:{__touchDetection:function(){this.touch="ontouchstart"in Aria.$frameworkWindow||Aria.$frameworkWindow.DocumentTouch&&Aria.$frameworkWindow.document instanceof Aria.$frameworkWindow.DocumentTouch,this.touch||(this.touchEventMap={touchstart:"mousedown",touchend:"mouseup",touchmove:"mousemove"
})}}});
//*******************
//LOGICAL-PATH:aria/touch/Swipe.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.Swipe",$dependencies:["aria.utils.Event","aria.utils.Delegate","aria.utils.AriaWindow","aria.touch.Event"],$events:{swipestart:{description:"",properties:{startX:"The pageX/clientX value of the swipe start event.",startY:"The pageY/clientY value of the swipe start event.",originalEvent:"The originating touchstart event."}},swipemove:{description:"",properties:{route:"Contains the direction and the distance of the swipe from the swipe start to the current swipe event coordinates."
,originalEvent:"The originating touchmove event."}},swipeend:{description:"",properties:{route:"Contains the direction and the distance of the swipe from the swipe start to the current swipe event coordinates.",originalEvent:"The originating touchend event."}},swipecancel:{description:""}},$constructor:function(){this.body={},this.touchEventMap=aria.touch.Event.touchEventMap;var e=aria.utils.AriaWindow;e.$on({attachWindow:this._connectTouchEvents,detachWindow:this._disconnectTouchEvents,scope:this}),e.isWindowUsed&&
this._connectTouchEvents()},$destructor:function(){aria.utils.AriaWindow.$unregisterListeners(this),this._disconnectTouchEvents(),this.body=null,this.touchEventMap=null},$statics:{MARGIN:20},$prototype:{_connectTouchEvents:function(){this.body=Aria.$window.document.body,aria.utils.Event.addListener(this.body,this.touchEventMap.touchstart,{fn:this._swipeStart,scope:this})},_disconnectTouchEvents:function(){aria.utils.Event.removeListener(this.body,this.touchEventMap.touchstart,{fn:this._swipeStart,scope:this}
),this._swipeCancel()},_swipeStart:function(e){var t={startX:e.pageX?e.pageX:e.clientX,startY:e.pageY?e.pageY:e.clientY,start:(new Date).getTime()};aria.utils.Event.addListener(this.body,this.touchEventMap.touchmove,{fn:this._swipeMove,scope:this,args:t}),aria.utils.Event.addListener(this.body,this.touchEventMap.touchend,{fn:this._swipeEnd,scope:this,args:t}),this.$raiseEvent({name:"swipestart",startX:t.startX,startY:t.startY,originalEvent:e})},_swipeEnd:function(e,t){var n=(new Date).getTime()-t.start;t.eventType="swipeend"
;var r=this._getRoute(t),i=!1;if(r){var s=e.target?e.target:e.srcElement,o=aria.DomEvent.getFakeEvent("swipe",s);i=e.returnValue,o.duration=n,o.distance=r.distance,o.direction=r.direction,o.startX=r.startX,o.startY=r.startY,o.endX=r.endX,o.endY=r.endY,aria.utils.Delegate.delegate(o),e.cancelBubble=o.hasStopPropagation,e.returnValue=!o.hasPreventDefault,this.$raiseEvent({name:"swipeend",route:r,originalEvent:e})}return this._swipeCancel(),i},_swipeCancel:function(){var e=!0;while(e)e=aria.utils.Event.removeListener
(this.body,this.touchEventMap.touchend,{fn:this._swipeEnd,scope:this});e=!0;while(e)e=aria.utils.Event.removeListener(this.body,this.touchEventMap.touchmove,{fn:this._swipeMove,scope:this});this.$raiseEvent({name:"swipecancel"})},_swipeMove:function(e,t){t.endX=e.pageX?e.pageX:e.clientX,t.endY=e.pageY?e.pageY:e.clientY,t.eventType="swipemove";var n=this._getRoute(t);n?this.$raiseEvent({name:"swipemove",route:n,originalEvent:e}):this._swipeCancel()},_getRoute:function(e){var t=e.endX-e.startX,n=e.endY-e.startY
,r=Math.abs(t),i=Math.abs(n),s=i>r&&r<=this.MARGIN,o=r>i&&i<=this.MARGIN;return e.eventType==="swipemove"?{direction:"unknown",distance:"0",startX:e.startX,startY:e.startY,endX:e.endX,endY:e.endY}:s?{direction:n<0?"up":"down",distance:i,startX:e.startX,startY:e.startY,endX:e.endX,endY:e.endY}:o?{direction:t<0?"left":"right",distance:r,startX:e.startX,startY:e.startY,endX:e.endX,endY:e.endY}:!1}}});
//*******************
//LOGICAL-PATH:aria/touch/Tap.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.Tap",$dependencies:["aria.utils.Event","aria.utils.Delegate","aria.utils.AriaWindow","aria.touch.Event"],$constructor:function(){this.body={},this.touchEventMap=aria.touch.Event.touchEventMap;var e=aria.utils.AriaWindow;e.$on({attachWindow:this._connectTouchEvents,detachWindow:this._disconnectTouchEvents,scope:this}),e.isWindowUsed&&this._connectTouchEvents()},$destructor:function(){aria.utils.AriaWindow.$unregisterListeners(this),this._disconnectTouchEvents
(),this.body=null,this.touchEventMap=null},$prototype:{_connectTouchEvents:function(){this.body=Aria.$window.document.body,aria.utils.Event.addListener(this.body,this.touchEventMap.touchstart,{fn:this._tapStart,scope:this}),aria.utils.Event.addListener(this.body,this.touchEventMap.touchmove,{fn:this._tapCancel,scope:this})},_disconnectTouchEvents:function(){aria.utils.Event.removeListener(this.body,this.touchEventMap.touchstart,{fn:this._tapStart,scope:this}),aria.utils.Event.removeListener(this.body,this.touchEventMap
.touchmove,{fn:this._tapCancel,scope:this}),this._tapCancel()},_tapStart:function(){var e={start:(new Date).getTime()};aria.utils.Event.addListener(this.body,this.touchEventMap.touchend,{fn:this._tapEnd,scope:this,args:e})},_tapEnd:function(e,t){this._tapCancel();var n=(new Date).getTime()-t.start;if(n<1e3){var r=e.target?e.target:e.srcElement,i=aria.DomEvent.getFakeEvent("tap",r);return i.pageX=e.pageX,i.pageY=e.pageY,i.clientX=e.clientX,i.clientY=e.clientY,aria.utils.Delegate.delegate(i),e.cancelBubble=i.hasStopPropagation
,e.returnValue=!i.hasPreventDefault,e.returnValue}},_tapCancel:function(){var e=!0;while(e)e=aria.utils.Event.removeListener(this.body,this.touchEventMap.touchend,{fn:this._tapEnd,scope:this})}}});
//*******************
//LOGICAL-PATH:aria/touch/widgets/Slider.js
//*******************
Aria.classDefinition({$classpath:"aria.touch.widgets.Slider",$extends:"aria.widgetLibs.BaseWidget",$css:["aria.touch.widgets.SliderCSS"],$statics:{INVALID_CONFIGURATION:"Invalid configuration for the slider!",BUTTON_WIDTH:14},$dependencies:["aria.touch.widgets.SliderCfgBeans","aria.touch.Swipe"],$constructor:function(e,t,n){this.$BaseWidget.constructor.apply(this,arguments);var r={beanName:"aria.touch.widgets.SliderCfgBeans.SliderCfg",json:this._cfg};try{this._cfgOk=aria.core.JsonValidator.normalize(r,!0)}catch(
i){this.$logError(this.INVALID_CONFIGURATION,null,i)}if(!this._cfgOk)return;this._maxLeftPosition=this._cfg.width-this.BUTTON_WIDTH,this._maxLeftPosition<10&&(this._maxLeftPosition=10);var s=this._cfg.bindValue;s&&(this._bindingCallback={fn:this._notifyDataChange,scope:this},aria.utils.Json.addListener(s.inside,s.to,this._bindingCallback,!1)),this._value=null,this._readValue(),this._leftPosition=null,this._setLeftPosition(this._value*this._maxLeftPosition),this._domId=this._createDynamicId(),this._parentDomId=
this._createDynamicId(),this._domElt=null,this._savedX=null,this._needUpdate=!1;var o=aria.utils.AriaWindow;o.$on({attachWindow:this._attachBodyEvents,detachWindow:this._detachBodyEvents,scope:this}),o.isWindowUsed&&this._attachBodyEvents()},$destructor:function(){this._detachBodyEvents();if(this._bindingCallback){var e=this._cfg.bindValue;aria.utils.Json.removeListener(e.inside,e.to,this._bindingCallback,!1),this._bindingCallback=null}this._domElt=null,this._cfgOk=null,this._maxLeftPosition=null,this._cfg=null
,this._value=null,this._leftPosition=null,this._domId=null,this._savedX=null,this._needUpdate=null,this.$BaseWidget.$destructor.call(this)},$prototype:{writeMarkup:function(e){if(!this._cfgOk)return;var t=['<div class="touchLibSlider" style="width:',this._maxLeftPosition+this.BUTTON_WIDTH,'px;" id="',this._parentDomId,'"><span id="',this._domId,'" class="sliderButton" style="left:',this._leftPosition,'px;">&nbsp;</span></div>'];e.write(t.join(""))},_attachBodyEvents:function(){aria.touch.Swipe.$on({swipestart
:{fn:this._dom_onswipestart,scope:this},swipecancel:{fn:this._dom_onswipecancel,scope:this}})},_detachBodyEvents:function(){aria.touch.Swipe.$unregisterListeners(this)},_dom_onswipestart:function(e){var t=this.getButtonDom(),n=e.originalEvent.target?e.originalEvent.target:e.originalEvent.srcElement;n.id===t.id&&(e.originalEvent.preventDefault?e.originalEvent.preventDefault():e.originalEvent.returnValue=!1,this._savedX=e.startX,this._updateDisplay(),aria.touch.Swipe.$on({swipemove:{fn:this._dom_onswipemove,scope
:this},swipeend:{fn:this._dom_onswipeend,scope:this}}))},_dom_onswipemove:function(e){var t=this.getButtonDom(),n=e.originalEvent.target?e.originalEvent.target:e.originalEvent.srcElement;if(n.id===t.id||t.parentNode.id&&n.id===t.parentNode.id){e.originalEvent.preventDefault?e.originalEvent.preventDefault():e.originalEvent.returnValue=!1;var r=e.route.endX-this._savedX,i=this._leftPosition;this._setLeftPosition(this._leftPosition+r),this._savedX+=this._leftPosition-i,this._updateDisplay(),this._setValue(this.
_leftPosition/this._maxLeftPosition)}},_dom_onswipeend:function(e){this._dom_onswipecancel();var t=this.getButtonDom(),n=e.originalEvent.target?e.originalEvent.target:e.originalEvent.srcElement;n.id===t.id&&(e.originalEvent.preventDefault?e.originalEvent.preventDefault():e.originalEvent.returnValue=!1,this._updateDisplay(),this._setValue(this._leftPosition/this._maxLeftPosition))},_dom_onswipecancel:function(){this._detachBodyEvents(),this._attachBodyEvents()},_setLeftPosition:function(e){e>this._maxLeftPosition?
e=this._maxLeftPosition:e<0&&(e=0),this._leftPosition=e},_setValue:function(e){if(e!==this._value){this._value=e;var t=this._cfg.bindValue;t&&aria.utils.Json.setValue(t.inside,t.to,e)}},_readValue:function(){var e=this._value,t=this._cfg.bindValue;t&&(e=t.inside[t.to]),e===null&&(e=0),e<0&&(e=0),e>1&&(e=1),this._value=e},_notifyDataChange:function(){this._readValue(),this._setLeftPosition(this._value*this._maxLeftPosition),this._updateDisplay()},_updateDisplay:function(){var e=this.getButtonDom();if(!e){this
._needUpdate=!0;return}var t="sliderButton";t+=" down",e.className!=t&&(e.className=t);var n=this._leftPosition+"px";e.style.left!=n&&(e.style.left=n)},initWidget:function(){this._needUpdate&&this._updateDisplay()},getButtonDom:function(){var e=this._domElt;return e===null&&(e=aria.utils.Dom.getElementById(this._domId),this._domElt=e),e},getDom:function(){var e=this.getButtonDom();return e.parentNode}}});
//*******************
//LOGICAL-PATH:aria/touch/widgets/SliderCfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.touch.widgets.SliderCfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes"},$beans:{SliderCfg:{$type:"json:Object",$description:"",$properties:{width:{$type:"json:Integer",$description:"",$default:100},bindValue:{$type:"json:Object",$description:"",$properties:{inside:{$type:"json:ObjectRef",$description:"",$mandatory:!0},to:{$type:"json:String",$description:"",$mandatory:!0}}}}}}});
//*******************
//LOGICAL-PATH:aria/touch/widgets/SliderCSS.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.touch.widgets.SliderCSS"
}}

    {macro main()}

        div.touchLibSlider {
            background: none repeat scroll 0 0 #EFF9FF;
            border: 2px solid #999999;
            border-radius: 32px 32px 32px 32px;
            height: 17px;
        }

        div.touchLibSlider span {
            position: absolute;
        }

        div.touchLibSlider span.sliderButton {
            background: none repeat scroll 0 0 #ffffff;
          border: 2px solid #4776A7;
          border-radius: 32px 32px 32px 32px;
          width: 14px;
        }

    {/macro}

{/CSSTemplate}

//*******************
//LOGICAL-PATH:aria/touch/widgets/TouchWidgetLib.js
//*******************
Aria.classDefinition({$classpath:"aria.touch.widgets.TouchWidgetLib",$extends:"aria.widgetLibs.WidgetLib",$singleton:!0,$prototype:{widgets:{Slider:"aria.touch.widgets.Slider"}}});