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
//LOGICAL-PATH:aria/widgets/AriaSkinBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.widgets.AriaSkinBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes"},$beans:{Object:{$type:"json:Object",$description:"",$default:{}},Color:{$type:"json:String",$description:""},Pixels:{$type:"json:Integer",$description:""},Opacity:{$type:"json:Float",$description:"",$minValue:0,$maxValue:100},GeneralCfg:{$type:"Object",$description:"",$properties:{imagesRoot:{$type:"json:String",$description:"",$default:"css/"},font:{$type:"Object",$description:"",$properties:
{size:{$type:"Pixels",$description:""},family:{$type:"json:String",$description:""}}},colors:{$type:"Object",$description:"",$properties:{bkg:{$type:"Color",$description:""},disabled:{$type:"Color",$description:""}}},loadingOverlay:{$type:"Object",$description:"",$properties:{backgroundColor:{$type:"Color"},spriteURL:{$type:"json:String",$description:""},opacity:{$type:"Opacity",$description:""}}},overlay:{$type:"Object",$description:"",$properties:{backgroundColor:{$type:"Color",$default:"#ddd"},opacity:{$type
:"Opacity",$description:"",$default:100},border:{$type:"json:String",$description:"",$default:"1px solid black"}}},dialogMask:{$type:"Object",$description:"",$properties:{backgroundColor:{$type:"Color",$default:"black"},opacity:{$type:"Opacity",$description:"",$default:40}}},anchor:{$type:"Object",$description:"",$properties:{states:{$type:"StatesSet",$description:"",$properties:{normal:{$type:"AnchorState"},link:{$type:"AnchorState"},visited:{$type:"AnchorState"},hover:{$type:"AnchorState"},focus:{$type:"AnchorState"
}}}}},disable:{$type:"Object",$description:"",$properties:{ul:{$type:"Object",$description:"",$properties:{list:{$type:"Object",$description:"",$properties:{style:{$type:"json:Boolean",$description:""}}}}}}}}},AnchorState:{$type:"Object",$description:"",$properties:{color:{$type:"Color",$description:""},text:{$type:"Object",$properties:{decoration:{$type:"json:String",$description:""}}},outline:{$type:"json:String",$description:""}}},Icons:{$type:"json:String",$description:""},IconsLeft:{$type:"Icons",$description
:""},IconsRight:{$type:"Icons",$description:""},StatesSet:{$type:"Object",$description:""},StateWithFrame:{$type:"json:Object",$description:"",$properties:{frame:{$type:"json:MultiTypes",$description:"",$contentTypes:[{$type:"FixedHeightFrameStateCfg"},{$type:"SimpleFrameStateCfg"},{$type:"TableFrameStateCfg"},{$type:"SimpleHTMLFrameStateCfg"},{$type:"Old0FrameStateCfg"},{$type:"Old1FrameStateCfg"},{$type:"Old2FrameStateCfg"}]}},$default:{}},StateWithFrameWithIcons:{$type:"StateWithFrame",$description:"",$properties
:{icons:{$type:"json:Map",$description:"",$contentType:{$type:"json:MultiTypes",$description:"",$contentTypes:[{$type:"json:Boolean",$description:""},{$type:"Icons"}]}}}},Frame:{$type:"json:MultiTypes",$description:"",$contentTypes:[{$type:"FixedHeightFrameCfg"},{$type:"SimpleFrameCfg"},{$type:"TableFrameCfg"},{$type:"SimpleHTMLFrameCfg"},{$type:"Old0FrameCfg"},{$type:"Old1FrameCfg"},{$type:"Old2FrameCfg"}]},ButtonCfg:{$type:"Object",$description:"",$properties:{states:{$type:"StatesSet",$properties:{normal:
{$type:"StateWithFrame"},msdown:{$type:"StateWithFrame"},msover:{$type:"StateWithFrame"},selected:{$type:"StateWithFrame"},disabled:{$type:"StateWithFrame"}}},frame:{$type:"Frame"},simpleHTML:{$type:"json:Boolean",$description:"",$default:!1},label:{$type:"Object",$description:"",$properties:{fontWeight:{$type:"json:String",$description:"",$default:"normal"}}}}},CalendarCfg:{$type:"Object",$description:"",$properties:{generalBackgroundColor:{$type:"Color"},monthTitleBorderColor:{$type:"Color",$default:"#E6D9C6"
},monthTitleColor:{$type:"Color",$default:"black"},monthTitleBackgroundColor:{$type:"Color",$default:"transparent"},monthTitlePaddingTop:{$type:"json:String",$description:"",$default:"0px"},monthTitlePaddingBottom:{$type:"json:String",$description:"",$default:"0px"},dayBorderColor:{$type:"Color"},dayBackgroundColor:{$type:"Color",$default:"transparent"},dayColor:{$type:"Color",$default:"black"},dayPadding:{$type:"json:String",$description:"",$default:"0px"},dayFontWeight:{$type:"json:String",$description:"",
$default:"normal"},weekEndBackgroundColor:{$type:"Color",$default:"#F2ECDE"},weekEndBorderColor:{$type:"Color",$default:"#F2ECDE"},weekEndColor:{$type:"Color",$default:"black"},unselectableBorderColor:{$type:"Color"},unselectableBackgroundColor:{$type:"Color"},unselectableColor:{$type:"Color"},todayBorderColor:{$type:"Color",$default:"black"},todayBackgroundColor:{$type:"Color",$default:"transparent"},todayColor:{$type:"Color",$default:"black"},weekNumberBackgroundColor:{$type:"Color",$default:"#E7DBC6"},weekNumberBorderColor
:{$type:"Color",$default:"#E7DBC6"},weekDaysLabelBackgroundColor:{$type:"Color",$default:"transparent"},weekDaysLabelBorderColor:{$type:"Color",$default:"white"},weekDaysLabelFontWeight:{$type:"json:String",$description:"",$default:"bold"},weekDaysLabelColor:{$type:"Color",$default:"black"},weekDaysLabelPadding:{$type:"json:String",$description:"",$default:"0px"},selectedBackgroundColor:{$type:"Color",$default:"#FFCC66"},selectedBorderColor:{$type:"Color",$default:"black"},selectedColor:{$type:"Color",$default
:"black"},defaultTemplate:{$type:"json:PackageName",$description:""},divsclass:{$type:"json:String",$description:""},previousPageIcon:{$type:"Icons"},nextPageIcon:{$type:"Icons"}}},ListCfg:{$type:"Object",$description:"",$properties:{divsclass:{$type:"json:String",$description:""},enabledColor:{$type:"Color",$default:"#666"},mouseOverBackgroundColor:{$type:"Color"},mouseOverColor:{$type:"Color"},highlightMouseOver:{$type:"json:Boolean",$description:"",$default:!0},selectedItemBackgroundColor:{$type:"Color"},
selectedItemColor:{$type:"Color"},link:{$type:"Object",$description:"",$properties:{marginLeft:{$type:"Pixels",$default:3},marginRight:{$type:"Pixels",$default:3}}},footer:{$type:"Object",$description:"",$properties:{padding:{$type:"Pixels",$default:5},backgroundColor:{$type:"Color",$default:"#eadbc8"},borderColor:{$type:"Color",$default:"#d3c3ab"},borderTopOnly:{$type:"json:Boolean",$description:"",$default:!1},borderStyle:{$type:"json:String",$description:"",$default:"solid"},borderWidth:{$type:"Pixels",$default
:1},marginTop:{$type:"Pixels",$default:5},marginRight:{$type:"Pixels",$default:0},marginBottom:{$type:"Pixels",$default:0},marginLeft:{$type:"Pixels",$default:-1}}}}},LinkCfg:{$type:"Object",$description:"",$properties:{states:{$type:"StatesSet",$properties:{normal:{$type:"LinkStateCfg"},hover:{$type:"LinkStateCfg"},focus:{$type:"LinkStateCfg"}}}}},LinkStateCfg:{$type:"Object",$description:"",$properties:{color:{$type:"Color"}}},GaugeCfg:{$type:"Object",$description:"",$properties:{spriteUrl:{$type:"json:String"
,$description:"",$default:"atdefskin/sprites/back.gif"},sprHeight:{$type:"Pixels"},border:{$type:"json:String",$description:""},borderPadding:{$type:"Pixels"},labelMargins:{$type:"json:String",$description:""},labelFontSize:{$type:"Pixels"}}},RadioButtonCfg:{$type:"CheckBoxCfg",$description:""},CheckBoxCfg:{$type:"Object",$description:"",$properties:{states:{$type:"StatesSet",$properties:{normal:{$type:"CheckBoxStateCfg"},normalSelected:{$type:"CheckBoxStateCfg"},focused:{$type:"CheckBoxStateCfg"},focusedSelected
:{$type:"CheckBoxStateCfg"},disabled:{$type:"CheckBoxStateCfg"},disabledSelected:{$type:"CheckBoxStateCfg"},readonly:{$type:"CheckBoxStateCfg"},readonlySelected:{$type:"CheckBoxStateCfg"}}},simpleHTML:{$type:"json:Boolean",$description:"",$default:!1},iconset:{$type:"json:String",$description:""},iconprefix:{$type:"json:String",$description:""}}},CheckBoxStateCfg:{$type:"Object",$description:"",$properties:{color:{$type:"Color"}}},DatePickerCfg:{$type:"DropDownTextInputCfg",$description:"",$properties:{calendar
:{$type:"Object",$properties:{showWeekNumbers:{$type:"json:Boolean",$description:"",$default:!0},restrainedNavigation:{$type:"json:Boolean",$description:"",$default:!0},showShortcuts:{$type:"json:Boolean",$description:"",$default:!0},numberOfUnits:{$type:"json:Integer",$description:"",$default:3},sclass:{$type:"json:String",$description:"",$default:"dropdown"}}}}},SelectBoxCfg:{$type:"DropDownTextInputCfg",$description:"",$properties:{listSclass:{$type:"json:String",$description:"",$default:"dropdown"}}},TextareaCfg
:{$type:"TextInputCfg",$description:""},ErrorListCfg:{$type:"Object",$description:"",$properties:{divsclass:{$type:"json:String",$description:""}}},FieldsetCfg:{$type:"Object",$description:"",$properties:{states:{$type:"StatesSet",$properties:{normal:{$type:"FieldsetStateCfg"}}},frame:{$type:"Frame"}}},FieldsetStateCfg:{$type:"StateWithFrame",$description:"",$properties:{label:{$type:"Object",$description:"",$properties:{left:{$type:"Pixels",$default:0},top:{$type:"Pixels",$default:0},paddingTop:{$type:"Pixels"
,$default:0},paddingLeft:{$type:"Pixels",$default:0},paddingRight:{$type:"Pixels",$default:0},paddingBottom:{$type:"Pixels",$default:0},backgroundColor:{$type:"Color",$default:"white"},fontWeight:{$type:"json:String",$description:"",$default:"bold"},color:{$type:"Color",$default:"black"}}}}},MultiSelectCfg:{$type:"DropDownTextInputCfg",$description:"",$properties:{listSclass:{$type:"json:String",$description:"",$default:"dropdown"}}},SelectCfg:{$type:"Object",$description:"",$properties:{states:{$type:"StatesSet"
,$properties:{normal:{$type:"StateWithFrameWithIcons"},normalFocused:{$type:"StateWithFrameWithIcons"},mandatory:{$type:"StateWithFrameWithIcons"},mandatoryFocused:{$type:"StateWithFrameWithIcons"},disabled:{$type:"StateWithFrameWithIcons"},readOnly:{$type:"StateWithFrameWithIcons"},normalError:{$type:"StateWithFrameWithIcons"},normalErrorFocused:{$type:"StateWithFrameWithIcons"},mandatoryError:{$type:"StateWithFrameWithIcons"},mandatoryErrorFocused:{$type:"StateWithFrameWithIcons"}}},frame:{$type:"Frame"},iconsLeft
:{$type:"IconsLeft"},iconsRight:{$type:"IconsRight"},simpleHTML:{$type:"json:Boolean",$description:"",$default:!1},offsetTop:{$type:"Pixels"},listSclass:{$type:"json:String",$description:"",$default:"dropdown"}}},SortIndicatorCfg:{$type:"Object",$description:"",$properties:{iconset:{$type:"json:String",$description:""},iconprefix:{$type:"json:String",$description:""}}},SplitterCfg:{$type:"Object",$description:"",$properties:{separatorHeight:{$type:"Pixels"},separatorWidth:{$type:"Pixels"},handleBackgroundColor
:{$type:"Color",$default:"transparent"},handleSpriteURLh:{$type:"json:String",$description:""},handleSpriteURLv:{$type:"json:String",$description:""},proxyBackgroundColor:{$type:"Color",$default:"transparent"},proxySpriteURLh:{$type:"json:String",$description:""},proxySpriteURLv:{$type:"json:String",$description:""},borderColor:{$type:"Color"}}},IconCfg:{$type:"Object",$description:"",$properties:{iconWidth:{$type:"Pixels"},iconHeight:{$type:"Pixels"},spriteSpacing:{$type:"Pixels"},biDimensional:{$type:"json:Boolean"
,$description:"",$default:!1},direction:{$type:"json:Enum",$description:"",$enumValues:["x","y"]},content:{$type:"json:Map",$default:{},$description:"",$contentType:{$type:"json:Integer",$description:""},$keyType:{$type:"json:String",$description:""}},spriteURL:{$type:"json:String",$description:""}}},DivCfg:{$type:"Object",$description:"",$properties:{states:{$type:"StatesSet",$properties:{normal:{$type:"StateWithFrame"},topLeft:{$type:"StateWithFrame"},bottomRight:{$type:"StateWithFrame"},bottomLeft:{$type:"StateWithFrame"
}}},frame:{$type:"Frame"}}},DialogCfg:{$type:"Object",$description:"",$properties:{titleBarTop:{$type:"Pixels"},titleBarLeft:{$type:"Pixels"},titleBarRight:{$type:"Pixels"},titleBarHeight:{$type:"Pixels"},titleColor:{$type:"Color",$default:"#615E55"},divsclass:{$type:"json:String",$description:""},closeIcon:{$type:"json:String",$description:""},maximizeIcon:{$type:"json:String",$description:""},shadowLeft:{$type:"Pixels"},shadowTop:{$type:"Pixels"},shadowRight:{$type:"Pixels"},shadowBottom:{$type:"Pixels"}}}
,TextInputCfg:{$type:"Object",$description:"",$properties:{states:{$type:"StatesSet",$properties:{normal:{$type:"TextInputStateCfg"},normalFocused:{$type:"TextInputStateCfg"},mandatory:{$type:"TextInputStateCfg"},mandatoryFocused:{$type:"TextInputStateCfg"},normalError:{$type:"TextInputStateCfg"},normalErrorFocused:{$type:"TextInputStateCfg"},mandatoryError:{$type:"TextInputStateCfg"},mandatoryErrorFocused:{$type:"TextInputStateCfg"},disabled:{$type:"TextInputStateCfg"},readOnly:{$type:"TextInputStateCfg"},prefill
:{$type:"TextInputStateCfg"}}},simpleHTML:{$type:"json:Boolean",$description:"",$default:!1},frame:{$type:"Frame"},iconsLeft:{$type:"IconsLeft"},iconsRight:{$type:"IconsRight"},label:{$type:"Object",$description:"",$properties:{fontWeight:{$type:"json:String",$description:"",$default:"normal"}}},helpText:{$type:"Object",$description:"",$properties:{color:{$type:"Color"},italics:{$type:"json:Boolean",$description:""}}},innerPaddingTop:{$type:"Pixels",$default:0},innerPaddingRight:{$type:"Pixels",$default:0},innerPaddingBottom
:{$type:"Pixels",$default:0},innerPaddingLeft:{$type:"Pixels",$default:0}}},TextInputStateCfg:{$type:"StateWithFrameWithIcons",$description:"",$properties:{color:{$type:"Color",$default:"#000"}}},DropDownTextInputCfg:{$type:"TextInputCfg",$description:"",$properties:{offsetTop:{$type:"Pixels"}}},AutoCompleteCfg:{$type:"DropDownTextInputCfg",$description:"",$properties:{listSclass:{$type:"json:String",$description:"",$default:"dropdown"}}},TabPanelCfg:{$type:"Object",$description:"",$properties:{states:{$type
:"StatesSet",$properties:{normal:{$type:"StateWithFrame"}}},frame:{$type:"Frame"}}},TabCfg:{$type:"Object",$description:"",$properties:{states:{$type:"StatesSet",$properties:{normal:{$type:"StateWithFrame"},msover:{$type:"StateWithFrame"},selected:{$type:"StateWithFrame"},disabled:{$type:"StateWithFrame"},normalFocused:{$type:"StateWithFrame"},msoverFocused:{$type:"StateWithFrame"},selectedFocused:{$type:"StateWithFrame"}}},frame:{$type:"Frame"}}},SimpleFrameCfg:{$type:"Object",$description:"",$properties:{sprType
:{$type:"json:Integer",$description:""},frameType:{$type:"json:Enum",$enumValues:["Simple"],$description:""}}},SimpleFrameStateCfg:{$type:"Object",$description:"",$properties:{paddingTop:{$type:"Pixels",$default:0},paddingRight:{$type:"Pixels",$default:0},paddingBottom:{$type:"Pixels",$default:0},paddingLeft:{$type:"Pixels",$default:0},border:{$type:"json:String",$description:"",$default:"",$sample:"solid"},borderSize:{$type:"Pixels",$default:0},borderColor:{$type:"Color",$default:""},backgroundColor:{$type:"Color"
,$default:"#FFF"},color:{$type:"Color",$default:""}}},SkipBorderCfg:{$type:"json:MultiTypes",$description:"",$default:!1,$contentTypes:[{$type:"json:Boolean",$description:""},{$type:"json:Enum",$description:"",$enumValues:["dependsOnIcon"]}]},FixedHeightFrameCfg:{$type:"Object",$description:"",$properties:{sprType:{$type:"json:Integer",$description:""},frameType:{$type:"json:Enum",$enumValues:["FixedHeight"],$description:""}}},FixedHeightFrameStateCfg:{$type:"Object",$description:"",$properties:{color:{$type
:"Color",$default:"#000"},spriteURL:{$type:"json:String",$description:""},spriteURLv:{$type:"json:String",$description:""},skipLeftBorder:{$type:"SkipBorderCfg",$description:""},skipRightBorder:{$type:"SkipBorderCfg",$description:""},sprWidth:{$type:"Pixels"},sprHeight:{$type:"Pixels"},sprIdx:{$type:"json:Integer",$description:""},sprSpacing:{$type:"Pixels",$default:2},spcLeft:{$type:"Pixels"},marginTop:{$type:"Pixels",$default:0},marginLeft:{$type:"Pixels",$default:0},marginRight:{$type:"Pixels",$default:0}
,marginBottom:{$type:"Pixels",$default:0}}},TableFrameCfg:{$type:"Object",$description:"",$properties:{sprType:{$type:"json:Integer",$description:""},frameType:{$type:"json:Enum",$enumValues:["Table"],$description:""}}},TableFrameStateCfg:{$type:"Object",$description:"",$properties:{sprWidth:{$type:"Pixels"},sprHeight:{$type:"Pixels"},sprIdx:{$type:"json:Integer",$description:"",$default:0},sprSpacing:{$type:"Pixels",$default:2},spcLeft:{$type:"Pixels"},spcTop:{$type:"Pixels"},spriteURL:{$type:"json:String",
$description:""},spriteURLv:{$type:"json:String",$description:""},spriteURLh:{$type:"json:String",$description:""},marginTop:{$type:"Pixels",$default:0},marginLeft:{$type:"Pixels",$default:0},marginRight:{$type:"Pixels",$default:0},marginBottom:{$type:"Pixels",$default:0},color:{$type:"Color",$default:"#000"},backgroundColor:{$type:"Color",$default:"#FFF"},frameHeight:{$type:"Pixels"},frameIcon:{$type:"json:String",$description:"",$default:""},frameIconHPos:{$type:"json:String",$description:"",$default:"left"
},frameIconVPos:{$type:"json:String",$description:"",$default:"bottom"}}},OldFrame:{$type:"Object",$description:"",$properties:{spriteURL:{$type:"json:String",$description:""},spcLeft:{$type:"Pixels"},spcRight:{$type:"Pixels"},spcTop:{$type:"Pixels"},spcBottom:{$type:"Pixels"},sprWidth:{$type:"Pixels"},sprHeight:{$type:"Pixels"},offsetLeft:{$type:"Pixels"}}},Old0FrameCfg:{$type:"OldFrame",$description:"",$properties:{sprType:{$type:"json:Integer",$description:""},frameType:{$type:"json:Enum",$enumValues:["Old0"
],$description:""}}},Old1FrameCfg:{$type:"OldFrame",$description:"",$properties:{sprType:{$type:"json:Integer",$description:""},frameType:{$type:"json:Enum",$enumValues:["Old1"],$description:""}}},Old2FrameCfg:{$type:"OldFrame",$description:"",$properties:{sprType:{$type:"json:Integer",$description:""},frameType:{$type:"json:Enum",$enumValues:["Old2"],$description:""}}},OldFrameState:{$type:"Object",$description:"",$properties:{sprIdx:{$type:"json:Integer",$description:""},textAlign:{$type:"json:String",$description
:""},color:{$type:"Color"}}},Old0FrameStateCfg:{$type:"OldFrameState"},Old1FrameStateCfg:{$type:"OldFrameState"},Old2FrameStateCfg:{$type:"OldFrameState"},SimpleHTMLFrameCfg:{$type:"Object",$description:"",$properties:{sprType:{$type:"json:Integer",$description:""},frameType:{$type:"json:Enum",$enumValues:["SimpleHTML"],$description:""}}},SimpleHTMLFrameStateCfg:{$type:"Object",$description:"",$properties:{}}}});
//*******************
//LOGICAL-PATH:aria/widgets/IconLib.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.IconLib",$dependencies:["aria.widgets.AriaLib"],$singleton:!0,$constructor:function(){this._sprites={iconsSTD:{cssClass:"xICNstd",spriteURL:null,spriteSpacing:2,iconWidth:16,iconHeight:16,biDimensional:!1,direction:"x",content:{amn_air:0,amn_bar:1,amn_bus:2,amn_chi:3,amn_hea:4,amn_gym:4,amn_lau:5,amn_mee:6,amn_par:7,amn_pch:8,amn_pet:9,amn_res:10,amn_roo:11,amn_saf:12,amn_sea:13,amn_spa:14,amn_swi:15,amn_wif:16,info:17,fire:18,add_line:19,rm_line:20,zoom_in:21,zoom_out
:22,save:23,close:24,undo:25,redo:26,baby:27,extended_seat:28,hand_bag:29,expand:30,collapse:31,left_arrow:32,down_arrow:33,right_arrow:34,up_arrow:35,validated:36,warning:37}},iconsPb13x19:{cssClass:"xICNPB13x19",spriteURL:null,spriteSpacing:2,iconWidth:13,iconHeight:19,biDimensional:!0,content:{no1:"0_0",no2:"0_1",no3:"0_2",no4:"1_0",no5:"1_1",no6:"1_2"}},fieldstd:{cssClass:"xTINbkg_std",spriteURL:null,spriteSpacing:2,iconWidth:2e3,iconHeight:20,biDimensional:!1,direction:"y",content:{normal:0,mandatory:1,
normalFocus:2,mandatoryFocus:3,normalError:4,mandatoryError:5,disabled:6,readOnly:7}},ariaButton:{cssClass:"xBTN",spriteURL:null,spriteSpacing:2,iconWidth:1e3,iconHeight:25,biDimensional:!1,direction:"y",content:{normal:0,pushed:1,disabled:2}},field1aBlue:{cssClass:"xTINbkg_1aBlue",spriteURL:null,spriteSpacing:2,iconWidth:800,iconHeight:22,biDimensional:!1,direction:"y",content:{normal:0,normalFocus:1}}}},$prototype:{registerSprite:function(e){var t;if(!e)return!1;if(this._sprites[e.name]!==undefined)return this
.$logError("Sprite already exists"),!1;if(aria.core.JsonValidator.normalize({json:e,beanName:"aria.widgets.CfgBeans.SpriteCfg"})){if(e.biDimensional){for(t in e.content)if(typeof e.content[t]!="string"||!e.content[t].match(/^\d+_\d+$/))return this.$logError("Bidimensional sprites must have positionings in the following format: x_y"),!1}else for(t in e.content)if(typeof e.content[t]!="number")return this.$logError("single-dimensional sprites must have numerical positionings."),!1;return this._sprites[e.name]=
e,delete e.name,!0}return!1},_deleteSprite:function(e){return this._sprites[e]?(delete this._sprites[e],!0):!1},getIcon:function(e,t){var n=this._sprites[e],r,i=0,s=0;if(n&&(r=n.content[t])!==undefined){if(n.biDimensional){var o=r.split("_");i=(n.iconWidth+n.spriteSpacing)*o[0],s=(n.iconHeight+n.spriteSpacing)*o[1]}else n.direction==="x"?i=(n.iconWidth+n.spriteSpacing)*r:n.direction==="y"&&(s=(n.iconHeight+n.spriteSpacing)*r);return n=r=null,{iconLeft:i,iconTop:s,cssClass:n.cssClass,spriteURL:n.spriteURL,width
:n.iconWidth,height:n.iconHeight}}return!1},writeMarkup:function(e){var t,n=0,r=0,i;for(var s in this._sprites){t=this._sprites[s],e.write("<h3>"+s+"</h3>");for(var o in t.content){i=t.content[o];if(t.biDimensional){var u=i.split("_");n=(t.iconWidth+t.spriteSpacing)*u[0],r=(t.iconHeight+t.spriteSpacing)*u[1]}else t.direction==="x"?n=(t.iconWidth+t.spriteSpacing)*i:t.direction==="y"&&(r=(t.iconHeight+t.spriteSpacing)*i);var a=t.cssClass?'class="'+t.cssClass+'" ':"",f=t.spriteURL?"background:url("+t.spriteURL+") no-repeat;"
:"",l=t.iconWidth<600?"width:"+(t.iconWidth+100)+"px;":"";e.write(['<span style="display:inline-block;',l,'"><span ',a,'style="',f,"margin:1px;display:inline-block;width:",t.iconWidth,"px;height:",t.iconHeight,"px;background-position:-",n,"px -",r,'px;"></span> ',o,"</span>"].join(""))}e.write("<br /><br/>")}t=null}}});
//*******************
//LOGICAL-PATH:aria/widgets/action/SortIndicator.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.action.SortIndicator",$extends:"aria.widgets.action.ActionWidget",$dependencies:["aria.widgets.container.Div","aria.widgets.Icon","aria.utils.Ellipsis","aria.utils.Dom","aria.DomEvent","aria.utils.String","aria.utils.Type"],$css:["aria.widgets.action.SortIndicatorStyle"],$constructor:function(e,t,n){this.$ActionWidget.constructor.apply(this,arguments),this._setSkinObj("SortIndicator"),this._setInputType(),this._setIconPrefix(),this._state=this._setState(e),this.
_icon=new aria.widgets.Icon({icon:this._getIconName(this._state)},t,n),aria.utils.Type.isString(e.ellipsis)&&(this._activateEllipsis=!0,this._directInit=!0);var r=this._cfg.width;this._spanStyle=[r>0?"width:"+r+"px;":"","display:inline-block;","white-space:nowrap;"].join(""),this.loadTime=null},$destructor:function(){this._icon.$dispose(),this.textContent=null,this._ellipsis&&(this._ellipsis.$dispose(),this._ellipsis=null),this.loadTime=null,this._hasMouseOver=null,this._hasFocus=null,this._state=null,this.$ActionWidget
.$destructor.call(this)},$statics:{ASCENDING_STATE:"ascending",DESCENDING_STATE:"descending",NORMAL_STATE:"normal"},$prototype:{_activateEllipsis:!1,_hasMouseOver:!1,_hasFocus:!1,_customTabIndexProvided:!0,_initActionWidget:function(e){this.loadTime=new Date;if(e){this._actingDom=e;var t=this.getDom();this._initializeFocusableElement(),this._activateEllipsis&&this._initializeEllipsis()}},_initializeEllipsis:function(){var e=this._cfg,t=aria.utils.Dom.getDomElementChild(this.getDom(),0),n=Aria.$window.document
.createElement("span");n.innerHTML=aria.utils.String.escapeHTML(e.label),this.textContent=e.label,n.innerHTML&&t.insertBefore(n,t.firstChild);var r=e.labelWidth;r>0&&(this._ellipsis=new aria.utils.Ellipsis(n,r,e.ellipsisLocation,e.ellipsis,this._context)),n.innerHTML&&t.removeChild(t.childNodes[1])},_initializeFocusableElement:function(){this._focusElt=this._actingDom},_widgetMarkup:function(e){var t=this._cfg,n=t.tabIndex!=null?' tabindex="'+this._calculateTabIndex()+'" ':" ";e.write(["<a",Aria.testMode?' id="'+
this._domId+'_link"':"",' class="sortIndicatorLink" href="#"'+n+">"+aria.utils.String.escapeHTML(t.label)].join("")),this._icon.writeMarkup(e),e.write("</a>")},_setState:function(e){if(e.view.sortName!=e.sortName)return this.NORMAL_STATE;if(e.view.sortOrder=="A")return this.ASCENDING_STATE;if(e.view.sortOrder=="D")return this.DESCENDING_STATE},_sortList:function(){this._cfg.view.toggleSortOrder(this._cfg.sortName,this._cfg.sortKeyGetter),this._cfg.view.refresh(),this._state=this._setState(this._cfg),this._icon
.changeIcon(this._getIconName(this._state))},_setSkinObj:function(e){this._skinObj=aria.widgets.AriaSkinInterface.getSkinObject(e,this._cfg.sclass)},_getIconName:function(e){var t=this._cfg;return t._iconSet+":"+t._iconPrefix+e},_setInputType:function(){this._cfg._inputType="sortindicator"},_setIconPrefix:function(){this._cfg._iconSet=this._skinObj.iconset,this._cfg._iconPrefix=this._skinObj.iconprefix},_doPartialRefresh:function(e){var t=e.length;while(t--)this._context.$refresh(e[t])},_dom_onmouseover:function(
e){this.$ActionWidget._dom_onmouseover.call(this,e);if(this._ellipsis){var t=new Date,n=t.getTime()-this.loadTime.getTime();if(n>200){this._hasMouseOver=!0;var r;aria.core.Browser.isFirefox?r={left:1,top:2}:aria.core.Browser.isIE8?r={left:0,top:1}:r={left:1,top:1},this._ellipsis&&this._ellipsis.displayFullText(r)}}},_dom_onmouseout:function(e){this.$ActionWidget._dom_onmouseout.call(this,e),this._ellipsis&&this._hasFocus===!1&&this._hasMouseOver===!0&&(this._hasMouseOver=!1,this._ellipsis&&this._ellipsis._hideFullText
(e.relatedTarget))},_dom_onfocus:function(e){if(this._actingDom&&this._hasMouseOver===!1){this._hasFocus=!0;var t;aria.core.Browser.isFirefox?t={left:1,top:2}:t={left:1,top:1},this._ellipsis&&this._ellipsis.displayFullText(t)}},_dom_onblur:function(e){this._hasMouseOver===!1&&this._hasFocus===!0&&(this._hasFocus=!1,this._ellipsis&&this._ellipsis._hideFullText(e.relatedTarget))},_dom_onclick:function(e){return this._sortList(),this.$ActionWidget._dom_onclick.apply(this,arguments),this._cfg.refreshArgs?this._doPartialRefresh
(this._cfg.refreshArgs):this._context.$refresh(),e.preventDefault(),!1}}});
//*******************
//LOGICAL-PATH:aria/widgets/action/SortIndicatorStyle.tpl.css
//*******************
{CSSTemplate {
    $classpath : "aria.widgets.action.SortIndicatorStyle",
    $extends : "aria.widgets.WidgetStyle"
}}
    {var skinnableClassName="SortIndicator"/}
    
    {macro main()}
        a.sortIndicatorLink label {
            cursor:pointer;    
        }
        a.sortIndicatorLink:focus {
            border-bottom:1px dotted #000;
        }
        {call startLooping()/}
    {/macro}
    
{/CSSTemplate}
//*******************
//LOGICAL-PATH:aria/widgets/action/IconButton.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.action.IconButton",$extends:"aria.widgets.action.Button",$dependencies:["aria.widgets.Icon"],$constructor:function(e,t,n){this.$Button.constructor.apply(this,arguments),this._icon=new aria.widgets.Icon({icon:e.icon,sourceImage:e.sourceImage},t,n)},$destructor:function(){this._icon.$dispose(),this.$Button.$destructor.call(this)},$prototype:{_widgetMarkupContent:function(e){this._icon.writeMarkup(e)}}});
//*******************
//LOGICAL-PATH:aria/widgets/container/Splitter.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.container.Splitter",$extends:"aria.widgets.container.Container",$dependencies:["aria.utils.Dom","aria.utils.ClassList","aria.utils.dragdrop.Drag","aria.core.Browser"],$css:["aria.widgets.container.SplitterStyle"],$constructor:function(e,t){this.$Container.constructor.apply(this,arguments),this._skinObj=aria.widgets.AriaSkinInterface.getSkinObject("Splitter",e.sclass),this._splitPanel1=null,this._splitPanel2=null,this._height=null,this._handleBarClass=null,this._splitBarProxyClass=
null,this._splitBar=null,this._splitBarProxy=null,this._orientation=e.orientation==="horizontal"?!0:!1,this._addHandleCls=this._orientation?"_sSplitBarProxyH":"_sSplitBarProxyV",this._width=null},$destructor:function(){this._skinObj=null,this._splitBar=null,this._splitBarProxy=null,this._splitPanel1=null,this._splitPanel2=null,this._splitBarProxyClass.$dispose(),this._destroyDraggable(),this.$Container.$destructor.call(this)},$statics:{SPLITTER_BORDER_SIZE:2},$prototype:{initWidget:function(){this.$Container
.initWidget.apply(this,arguments);var e=aria.utils.Dom.getDomElementChild,t=e(e(this.getDom(),0),0);this._splitPanel1=e(t,0),this._splitBar=e(t,1),this._splitBarProxy=e(t,2),this._splitPanel2=e(t,3),this._splitBarProxyClass=new aria.utils.ClassList(this._splitBarProxy);var n="splitBarProxy_"+this._domId,r=this._orientation?"n-resize":"e-resize";this._draggable=new aria.utils.dragdrop.Drag(n,{handle:n,cursor:r,proxy:null,constrainTo:t}),this._draggable.$on({dragstart:{fn:this._onDragStart,scope:this},dragend:
{fn:this._onDragEnd,scope:this}})},_onDragStart:function(){aria.core.Browser.isIE&&(this.getDom().onselectstart=Aria.returnFalse),this._splitBarProxyClass.remove(this._handleBarClass),this._splitBarProxyClass.add("xSplitter_"+this._cfg.sclass+this._addHandleCls)},_onDragEnd:function(){this.getDom().onselectstart=Aria.returnTrue,this._splitBarProxyClass.remove("xSplitter_"+this._cfg.sclass+this._addHandleCls),this._splitBarProxyClass.add(this._handleBarClass);var e=this._draggable.element,t,n,r,i;this._orientation?
(t="offsetTop",n="height",r="top",i=this._height):(t="offsetLeft",n="width",r="left",i=this._width);var s=e[t]<=0?0:e[t],o=i-s<=0?0:i-s;this.setProperty("size1",s),this.setProperty("size2",o),this._splitPanel1.style[n]=s+"px",this._splitPanel2.style[n]=o+"px",n=="width"&&(this._splitPanel1.style.overflowY=s<=16?"hidden":"",this._splitPanel2.style.overflowY=o<=16?"hidden":""),this._splitBar.style[r]=s+"px",this._splitBarProxy.style[r]=s+"px",this._context.$refresh({outputSection:"_splitterContent1_"+this._domId
}),this._context.$refresh({outputSection:"_splitterContent2_"+this._domId})},_widgetMarkupBegin:function(e){var t=this._cfg,n=this._orientation,r,i,s,o,u=this._calculateSize(t);this.setProperty("size1",u.size1),this.setProperty("size2",u.size2);var a="",f=n?t.width:t.height,l=this._height+Number(this._skinObj.separatorHeight),c=this._width+Number(this._skinObj.separatorWidth);t.border&&(a="xSplitter_"+t.sclass+"_sBdr"),this._handleBarClass="xSplitter_"+t.sclass+(n?"_sHandleH":"_sHandleV"),n?(r=l,i=t.width,s=
u.size1,o=t.width):(r=t.height,i=c,s=t.height,o=u.size1),e.write(['<span class="xSplitter_',t.sclass,"_sContainer ",a,'" style="height:',r,"px;width:",i,'px;"><span class="xSplitter_',t.sclass,'_sConstrained"  ><span class="xSplitter_',t.sclass,'_sMacro" style="height: ',s,"px; width:",o,'px;">'].join("")),e.beginSection({id:"_splitterContent1_"+this._domId,macro:t.macro1}),e.endSection(),e.write("</span> ");var h,p,d;n?(s=u.size2,o=t.width,h="width",p="top",d="bottom"):(s=t.height,o=u.size2,h="height",p="left"
,d="right"),e.write(['<span class="',this._handleBarClass,'" style="'+h+":",f,"px;"+p+":",u.size1,'px; "> </span><span id="splitBarProxy_',this._domId,'" class="',this._handleBarClass,' " style="'+p+":",u.size1,"px; "+h+':100%;"></span><span class="xSplitter_',t.sclass,'_sMacro" style="height: ',s,"px;width:",o,"px;"+d+':0px">'].join("")),e.beginSection({id:"_splitterContent2_"+this._domId,macro:t.macro2}),e.endSection(),e.write(["</span> </span> </span>"].join(""))},_calculateSize:function(e){var t=e.border?
this.SPLITTER_BORDER_SIZE:0,n={},r,i;return this._height=e.height-this._skinObj.separatorHeight-t,this._width=e.width-this._skinObj.separatorWidth-t,this._height<0&&(this._height=0),this._width<0&&(this._width=0),e.size1<0&&(e.size1=0),e.size2<0&&(e.size2=0),i=this._orientation?this._height:this._width,e.size1==null&&e.size2==null?(e.size1=Math.floor(i/2),e.size2=i-e.size1):e.size1==null&&e.size2!=null?e.size1=i-e.size2:e.size1!=null&&e.size2==null&&(e.size2=i-e.size1),r=e.size1+e.size2,i==r?(n.size1=e.size1
,n.size2=e.size2):e.adapt=="size1"?(n.size2=e.size2,n.size2>i&&(n.size2=i),n.size1=i-n.size2):e.adapt=="size2"?(n.size1=e.size1,n.size1>i&&(n.size1=i),n.size2=i-n.size1):r!==0?(n.size1=Math.floor(i*e.size1/r),n.size2=i-n.size1):(n.size1=Math.floor(i/2),n.size2=i-e.size1),n},_onBoundPropertyChange:function(e,t,n){if(e=="size1"||e=="size2"){var r=this._orientation,i=r?this._height:this._width,s,o;t>i&&(t=i),t<0&&(t=0);var u=i-t;s=r?"height":"width",o=r?"top":"left",e=="size1"?(this._splitPanel2.style[s]=u+"px"
,this._splitPanel1.style[s]=t+"px",this._splitBar.style[o]=t+"px",this._splitBarProxy.style[o]=t+"px",this.setProperty("size1",t),this.setProperty("size2",u)):(this._splitPanel1.style[s]=u+"px",this._splitPanel2.style[s]=t+"px",this._splitBar.style[o]=u+"px",this._splitBarProxy.style[o]=u+"px",this.setProperty("size2",t),this.setProperty("size1",u)),this._context.$refresh({outputSection:"_splitterContent1_"+this._domId}),this._context.$refresh({outputSection:"_splitterContent2_"+this._domId})}else this.$Container
._onBoundPropertyChange.apply(this,arguments)},_destroyDraggable:function(){this._draggable.$removeListeners({dragstart:{fn:this._onDragStart,scope:this},dragend:{fn:this._onDragEnd,scope:this}}),this._draggable.$dispose(),this._draggable=null}}});
//*******************
//LOGICAL-PATH:aria/widgets/container/Fieldset.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.container.Fieldset",$extends:"aria.widgets.container.Container",$dependencies:["aria.utils.Function","aria.DomEvent","aria.widgets.frames.FrameFactory","aria.utils.String"],$css:["aria.widgets.container.FieldsetStyle"],$constructor:function(e,t){this.$Container.constructor.apply(this,arguments),this._frame||(this._frame=aria.widgets.frames.FrameFactory.createFrame({skinnableClass:"Fieldset",sclass:e.sclass,state:"normal",width:e.width,height:e.height,printOptions
:e.printOptions}))},$destructor:function(){this._frame&&(this._frame.$dispose(),this._frame=null),this.$Container.$destructor.call(this)},$statics:{INPUT_ATTRIBUTE:"_ariaInput"},$prototype:{_init:function(){var e=this.getDom(),t=aria.utils.Dom.getDomElementChild(e,0);this._frame.linkToDom(t),this.$Container._init.call(this)},_checkTargetBeforeSubmit:function(e){return e.getAttribute(this.INPUT_ATTRIBUTE)=="1"},_dom_onkeydown:function(e){if(e.keyCode==e.KC_ENTER&&this._checkTargetBeforeSubmit(e.target)){var t=
this._cfg.onSubmit;if(t)return this.evalCallback(this._cfg.onSubmit)===!0}},_widgetMarkupBegin:function(e){this._frame.writeMarkupBegin(e)},_widgetMarkupEnd:function(e){this._frame.writeMarkupEnd(e);var t=this._cfg.label;t&&e.write('<span class="xFieldset_'+this._cfg.sclass+'_normal_label">'+aria.utils.String.escapeHTML(t)+"</span>")}}});
//*******************
//LOGICAL-PATH:aria/widgets/container/Tab.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.container.Tab",$extends:"aria.widgets.container.Container",$dependencies:["aria.widgets.frames.FrameFactory","aria.utils.Function"],$css:["aria.widgets.container.TabStyle"],$constructor:function(e,t){this.$Container.constructor.apply(this,arguments),this._setSkinObj("Tab"),this._mouseOver=!1,this._hasFocus=!1,this._updateState(!0),this._frame=aria.widgets.frames.FrameFactory.createFrame({height:e.height,state:this._state,width:e.width,sclass:e.sclass,skinnableClass
:"Tab",printOptions:e.printOptions,id:Aria.testMode?this._domId+"_"+e.tabId:undefined}),this._spanStyle="z-index:100;vertical-align:top;"},$destructor:function(){this._frame&&(this._frame.$dispose(),this._frame=null),this.$Container.$destructor.call(this)},$prototype:{_init:function(){var e=this.getDom(),t=aria.utils.Dom.getDomElementChild(e,0);t&&this._frame.linkToDom(t),aria.widgets.container.Tab.superclass._init.call(this)},_focus:function(){try{this.getDom().focus()}catch(e){}},_onBoundPropertyChange:function(
e,t,n){var r=!1;if(e==="selectedTab"){if(t===this._cfg.tabId||n===this._cfg.tabId)r=!0}else this.$Container._onBoundPropertyChange.call(this,e,t,n);r&&(this._cfg[e]=t,this._updateState())},_widgetMarkupBegin:function(e){this._frame.writeMarkupBegin(e)},_widgetMarkupEnd:function(e){this._frame.writeMarkupEnd(e)},_setSkinObj:function(e){this._skinObj=aria.widgets.AriaSkinInterface.getSkinObject(e,this._cfg.sclass)},_updateState:function(e){var t="normal",n=this._cfg;n.disabled?t="disabled":n.tabId===n.selectedTab?
t="selected":this._mouseOver&&(t="msover"),this._hasFocus&&(t+="Focused"),this._state=t,e||(this.getDom(),this._frame.changeState(this._state))},_selectTab:function(){this.changeProperty("selectedTab",this._cfg.tabId)},_dom_onclick:function(e){this._selectTab(),this._hasFocus||this._focus()},_dom_onmouseover:function(e){this.$Container._dom_onmouseover.call(this,e),this._mouseOver=!0,this._updateState()},_dom_onmouseout:function(e){this.$Container._dom_onmouseout.call(this,e),this._mouseOver=!1,this._updateState
()},_dom_onfocus:function(e){var t=this._cfg;this._hasFocus=!0,this._updateState()},_dom_onblur:function(e){var t=this._cfg;this._hasFocus=!1,this._updateState()},_dom_onkeyup:function(e){return!1},_dom_onkeydown:function(e){(e.keyCode==aria.DomEvent.KC_SPACE||e.keyCode==aria.DomEvent.KC_ENTER)&&this._selectTab()}}});
//*******************
//LOGICAL-PATH:aria/widgets/container/TabPanel.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.container.TabPanel",$extends:"aria.widgets.container.Container",$dependencies:["aria.widgets.frames.FrameFactory","aria.utils.Function"],$css:["aria.widgets.container.TabPanelStyle"],$constructor:function(e,t){this.$Container.constructor.apply(this,arguments),this._setSkinObj("TabPanel"),this._frame=aria.widgets.frames.FrameFactory.createFrame({height:e.height,state:"normal",width:e.width,sclass:e.sclass,skinnableClass:"TabPanel",printOptions:e.printOptions,block
:e.block}),this._container=!0,this._defaultMargin=0,this._spanStyle="top:-1.5px;"},$destructor:function(){this._frame&&(this._frame.$dispose(),this._frame=null),this.$Container.$destructor.call(this)},$statics:{TABPANEL_INVALID_CONFIG_MACRO:"%1Invalid tab panel configuration, you must pass a macro if your panel is not a container.",TABPANEL_INVALID_CONFIG_ID:"%1Invalid tab panel configuration, you must pass an ID if your panel is a container"},$prototype:{_init:function(){var e=aria.utils.Dom.getDomElementChild
(this.getDom(),0);e&&this._frame.linkToDom(e),this.$Container._init.call(this)},_onBoundPropertyChange:function(e,t,n){e=="selectedTab"?this._container?this._context.$refresh({filterSection:"__tabPanel_"+this._domId}):this._context.$refresh({outputSection:"__tabPanel_"+this._domId,macro:this._cfg.macro}):this.$Container._onBoundPropertyChange.call(this,e,t,n)},_widgetMarkup:function(e){this._container=!1,this._cfg.macro?(this._widgetMarkupBegin(e),e.callMacro(this._cfg.macro),this._widgetMarkupEnd(e)):this.$logError
(this.TABPANEL_INVALID_CONFIG_MACRO)},_widgetMarkupBegin:function(e){this._container&&(this._cfg.id||this.$logError(this.TABPANEL_INVALID_CONFIG_ID)),this._frame.writeMarkupBegin(e),e.beginSection({id:"__tabPanel_"+this._domId})},_widgetMarkupEnd:function(e){e.endSection(),this._frame.writeMarkupEnd(e)},_setSkinObj:function(e){this._skinObj=aria.widgets.AriaSkinInterface.getSkinObject(e,this._cfg.sclass)}}});
//*******************
//LOGICAL-PATH:aria/widgets/container/Tooltip.js
//*******************
(function(){var e={},t;Aria.classDefinition({$classpath:"aria.widgets.container.Tooltip",$extends:"aria.widgets.container.Container",$dependencies:["aria.widgets.container.Div","aria.popups.Popup"],$onload:function(e){t=aria.core.Timer},$onunload:function(){e=null,t=null},$constructor:function(e,t){this.$Container.constructor.apply(this,arguments),this._associatedWidget=null,this._showTimeout=null,this._popup=null},$destructor:function(){this._cfgOk=!1,this._showTimeout&&(t.cancelCallback(this._showTimeout),
this._showTimeout=null),this._popup&&this._popup.close(),this._associatedWidget=null,this.$Container.$destructor.call(this)},$statics:{WIDGET_TOOLTIP_MACRO:"%1Tooltip with id '%2' must either be a container or have the 'macro' property specified."},$prototype:{_checkCfgConsistency:function(){if(!this._cfgOk)return;var e=this._cfg;if(this._container&&e.macro||!this._container&&!e.macro){this.$logError(this.WIDGET_TOOLTIP_MACRO,[e.id]),this._cfgOk=!1;return}},_widgetMarkupBegin:function(t){var n=this._cfg;this
._sectionId=["__toolTipSection_",n.id].join(""),this._skipContent=t.sectionState==t.SECTION_KEEP||!e[this._domId],t.skipContent=this._skipContent,t.beginSection({id:this._sectionId,type:""});if(this._skipContent)return;var r=new aria.widgets.container.Div({sclass:n.sclass,width:n.width,height:n.height,printOptions:n.printOptions,cssClass:this._context.getCSSClassNames(!0)},this._context,this._lineNumber);this._tooltipDiv=r,t.registerBehavior(r),r.writeMarkupBegin(t)},_widgetMarkupEnd:function(e){if(!this._skipContent
){var t=this._tooltipDiv;this._tooltipDiv=null,t.writeMarkupEnd(e),this.$assert(52,t)}e.endSection()},_writerCallback:function(e){this._widgetMarkupBegin(e),e.callMacro(this._cfg.macro),this._widgetMarkupEnd(e)},writeMarkup:function(e){this._container=!1,this._checkCfgConsistency(),this._cfgOk&&(this._widgetMarkupBegin(e),this._widgetMarkupEnd(e))},writeMarkupBegin:function(e){this._container=!0,this._checkCfgConsistency(),this._cfgOk&&this._widgetMarkupBegin(e)},writeMarkupEnd:function(e){this._widgetMarkupEnd
(e)},associatedWidgetMouseOver:function(e,n){if(!this._cfgOk)return;this._popup&&this._associatedWidget==e&&this._popup.cancelMouseOutTimer(),this._showTimeout||(this._showTimeout=t.addCallback({scope:this,fn:this.showTooltip,args:{widget:e,absolutePosition:{left:n.clientX,top:n.clientY}},delay:this._cfg.showDelay}))},associatedWidgetMouseMove:function(e,n){if(!this._cfgOk)return;this._showTimeout&&this._cfg.showOnlyOnMouseStill&&(t.cancelCallback(this._showTimeout),this._showTimeout=t.addCallback({scope:this
,fn:this.showTooltip,args:{widget:e,absolutePosition:{left:n.clientX,top:n.clientY}},delay:this._cfg.showDelay}))},associatedWidgetMouseOut:function(e,n){if(!this._cfgOk)return;this._popup&&this._popup.closeOnMouseOut(n),this._showTimeout&&(t.cancelCallback(this._showTimeout),this._showTimeout=null)},showTooltip:function(t){if(!this._cfgOk)return;this._showTimeout=null;var n=t.absolutePosition,r=t.widget;this._associatedWidget!=r&&(this.closeTooltip(),this._associatedWidget=r);if(this._popup)return;var i={filterSection
:this._sectionId};this._container||(i.writerCallback={fn:this._writerCallback,scope:this},i.outputSection=this._sectionId),e[this._domId]=!0;var s=this._context.getRefreshedSection(i),o=this._cfg,u=new aria.popups.Popup;this._popup=u,u.$on({scope:this,onAfterClose:this._onAfterPopupClose}),u.open({section:s,keepSection:!0,absolutePosition:n,closeOnMouseClick:o.closeOnMouseClick,closeOnMouseScroll:o.closeOnMouseScroll,closeOnMouseOut:o.closeOnMouseOut,closeOnMouseOutDelay:o.closeOnMouseOutDelay,offset:{left:0
,top:16}})},closeTooltip:function(){this._popup&&this._popup.close()},_onAfterPopupClose:function(){this._popup.$dispose(),e[this._domId]=!1,delete e[this._domId],this._popup=null}}})})();
//*******************
//LOGICAL-PATH:aria/widgets/controllers/MultiSelectController.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.controllers.MultiSelectController",$dependencies:["aria.utils.Json","aria.DomEvent","aria.widgets.controllers.reports.DropDownControllerReport"],$extends:"aria.widgets.controllers.DropDownListController",$constructor:function(){this.$DropDownListController.constructor.call(this),this._separator=null,this._fieldDisplay="value",this._dataModel.selectedValues=[],this._maxOptions=null,this._cacheValues={}},$destructor:function(){this._cacheValues=null,this.$DropDownListController
.$destructor.call(this)},$statics:{INVALID_MULTISELECT_CONTENT:"Multiselect items should not contain field separator as a value."},$prototype:{setSeparator:function(e){this._separator=e},setMaxOptions:function(e){this._maxOptions=e},setFieldDisplay:function(e){this._fieldDisplay=e},setValueDisplay:function(e){this._valueDisplay=e},getSeparator:function(){return this._separator},setListOptions:function(e){this._cacheValues={},this._dataModel.listContent=e},toggleDropdown:function(e,t){var n=this._dataModel,r=
n.listContent,i=n.selectedValues;n.selectedIdx=-1,i=this._parseInputString(r,e),t||aria.utils.Json.equals(i,n.value)||(aria.utils.Json.setValue(n,"selectedValues",i),n.value=i,n.text=this._getDisplayValue(i));var s=new aria.widgets.controllers.reports.DropDownControllerReport;return s.displayDropDown=r.length>0&&!t,s.displayDropDown&&(n.initialInput=e,aria.utils.Json.setValue(n,"listContent",r)),s.text=n.text,s.value=this._getValue(n.text,n.value),i.length||(n.selectedIdx=null),s},_parseInputString:function(
e,t){var n=[],r=t.split(this._separator);if(r)for(var i=0,s=aria.utils.Math.min(r.length,this._maxOptions);i<s;i++)for(var o=0,u=e.length;o<u;o++){var a=aria.utils.String.trim(r[i]);e[o].label=e[o].label+"",e[o].value=e[o].value+"",a+="",(e[o].label.toLowerCase()==a.toLowerCase()||e[o].value.toLowerCase()==a.toLowerCase())&&(e[o].label.toLowerCase()==a.toLowerCase()||e[o].value.toLowerCase()==a.toLowerCase())&&!aria.utils.Array.contains(n,e[o].value)&&!e[o].disabled&&n.push(e[o].value)}return n},_getDisplayValue
:function(e){var t=this._fieldDisplay,n=this._dataModel.listContent,r=this._fieldDisplay=="value"?"label":"value",i=[],s;for(var o=0,u=e.length;o<u;o++){s=e[o];for(var a=0,f=n.length;a<f;a++)n[a].value==s&&i.push(n[a][t]?n[a][t]:n[a][r])}return i.join(this._separator)},checkValue:function(e){var t=new aria.widgets.controllers.reports.DropDownControllerReport,n=this._dataModel,r=this._options;if(e===null)t.ok=!0,n.value=null,n.text="";else{aria.utils.Json.equals(e,n.value)?aria.utils.Json.equals(n.selectedValues
,n.value)||(e=n.selectedValues,n.value=e):(aria.utils.Json.setValue(n,"selectedValues",e),n.value=e),t.ok=!0;var i=this._getDisplayValue(e);n.text=i}return t.ok&&(t.text=n.text,t.value=this._getValue(n.text,n.value)),t},checkText:function(e){var t=this._dataModel,n=t.listContent,r;r=this._parseInputString(n,e),aria.utils.Json.equals(r,t.value)||(aria.utils.Json.setValue(t,"value",r),aria.utils.Json.setValue(t,"text",this._getDisplayValue(r)),aria.utils.Json.setValue(t,"selectedValues",r));var i=new aria.widgets
.controllers.reports.DropDownControllerReport;return i.text=t.text,i.value=this._getValue(t.text,t.value),i},checkError:function(){var e=this._dataModel.listContent,t;for(var n=0,r=e.length;n<r;n++){t=e[n].value+"";if(t.indexOf(this._separator)!=-1){this.$logError(this.INVALID_MULTISELECT_CONTENT);break}}},_checkInputKey:function(e,t,n,r,i){if(aria.DomEvent.KC_ARROW_DOWN===t){var s=this.checkValue(n.split(this._separator));s!=null&&s.$dispose()}var s=new aria.widgets.controllers.reports.DropDownControllerReport
;return s.ok=!0,s.cancelKeyStroke=!1,s.displayDropDown=t===aria.DomEvent.KC_ARROW_DOWN,s},_getValue:function(e,t){var n=this._cacheValues[e];return n?n:(this._cacheValues[e]=t,t)},getDisplayTextFromValue:function(e){return this._getDisplayValue(e)}}});
//*******************
//LOGICAL-PATH:aria/widgets/controllers/DateController.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.controllers.DateController",$extends:"aria.widgets.controllers.TextDataController",$dependencies:["aria.DomEvent","aria.widgets.controllers.reports.ControllerReport","aria.utils.Date","aria.utils.Type","aria.utils.environment.Date"],$resources:{res:"aria.widgets.WidgetsRes"},$constructor:function(){this.$TextDataController.constructor.call(this),this._dataModel={jsDate:null,displayText:""},this._pattern="",this._inputPattern="",this._minValue=null,this._maxValue=
null,this._referenceDate=null},$destructor:function(){this._dataModel=null,this.$TextDataController.$destructor.call(this)},$prototype:{setPattern:function(e){if(!e)var e=aria.utils.environment.Date.getDateFormats().shortFormat;this._pattern=e},setInputPattern:function(e){this._inputPattern=e},setMinValue:function(e){this._minValue=aria.utils.Date.removeTime(e)},setMaxValue:function(e){this._maxValue=aria.utils.Date.removeTime(e)},setReferenceDate:function(e){this._referenceDate=aria.utils.Date.removeTime(e)
},checkValue:function(e){var t=new aria.widgets.controllers.reports.ControllerReport;return e==null?(t.ok=!0,this._dataModel.jsDate=null,this._dataModel.displayText=""):aria.utils.Type.isDate(e)?(e=aria.utils.Date.removeTime(e),this._minValue&&e<this._minValue?(t.ok=!1,t.errorMessages.push(this.res.errors["40018_WIDGET_DATEFIELD_MINVALUE"])):this._maxValue&&e>this._maxValue?(t.ok=!1,t.errorMessages.push(this.res.errors["40019_WIDGET_DATEFIELD_MAXVALUE"])):(t.ok=!0,this._dataModel.jsDate=e,this._dataModel.displayText=
aria.utils.Date.format(e,this._pattern))):t.ok=!1,t.ok&&(t.text=this._dataModel.displayText,t.value=this._dataModel.jsDate),t},checkText:function(e,t){var n;if(!e)n=this.checkValue(null);else if(e===this._dataModel.displayText)n=new aria.widgets.controllers.reports.ControllerReport,n.ok=!0;else{var r={referenceDate:this._referenceDate,inputPattern:this._inputPattern},i=aria.utils.Date.interpret(e,r);i?n=this.checkValue(i):(n=new aria.widgets.controllers.reports.ControllerReport,n.ok=!1,n.errorMessages.push(this
.res.errors["40008_WIDGET_DATEFIELD_VALIDATION"]))}return n},getDisplayTextFromValue:function(e){return e&&aria.utils.Type.isDate(e)?aria.utils.Date.format(e,this._pattern):""}}});
//*******************
//LOGICAL-PATH:aria/widgets/controllers/TimeController.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.controllers.TimeController",$extends:"aria.widgets.controllers.TextDataController",$dependencies:["aria.widgets.controllers.reports.ControllerReport","aria.utils.Date","aria.utils.environment.Date"],$resources:{res:"aria.widgets.WidgetsRes"},$constructor:function(){this.$TextDataController.constructor.call(this),this._dataModel={jsDate:null,displayText:""},this._pattern=""},$destructor:function(){this._dataModel=null,this.$TextDataController.$destructor.call(this
)},$prototype:{setPattern:function(e){if(!e)var e=aria.utils.environment.Date.getTimeFormats().longFormat;this._pattern=e},checkValue:function(e){var t=new aria.widgets.controllers.reports.ControllerReport;return t.ok=e==null||aria.utils.Type.isDate(e),t.ok&&(this._dataModel.jsDate=e,this._dataModel.displayText=e?aria.utils.Date.format(e,this._pattern):"",t.text=this._dataModel.displayText,t.value=this._dataModel.jsDate),t},checkText:function(e,t){if(!e)return this.checkValue(null);var n=new aria.widgets.controllers
.reports.ControllerReport,r=aria.utils.Date;n.ok=!1;if(e===this._dataModel.displayText)n.ok=!0;else{var i=r.interpretTime(e);i?(this._dataModel.jsDate=i,n.ok=!0,this._pattern&&(this._dataModel.displayText=r.format(i,this._pattern),n.text=this._dataModel.displayText,n.value=this._dataModel.jsDate)):n.errorMessages[0]=this.res.errors["40007_WIDGET_TIMEFIELD_VALIDATION"]}return n},getDisplayTextFromValue:function(e){return e&&aria.utils.Type.isDate(e)?aria.utils.Date.format(e,this._pattern):""}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/Gauge.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.Gauge",$extends:"aria.widgets.Widget",$css:["aria.widgets.form.GaugeStyle"],$dependencies:["aria.utils.String"],$constructor:function(e,t){this.$Widget.constructor.apply(this,arguments),this._cfg=e,this.__setSkinObj("Gauge"),this.showLabel=this._cfg.labelWidth>-1||!!this._cfg.label},$destructor:function(){this.$Widget.$destructor.call(this)},$statics:{WIDGET_GAUGE_CFG_MIN_EQUAL_GREATER_MAX:"%1Gauge configuration error: minValue must be lower than maxValue."
},$prototype:{_widgetMarkup:function(e){this._checkCfgConsistency();if(!this._cfgOk)return;this.showLabel&&this._labelMarkup(e),this._widgetMarkupBegin(e);var t=this.__calculateBarWidth(this._cfg.currentValue);e.write(['<div class="xGAUGE_progress_',this._cfg.sclass,'" style="width:',t>=0?t:"0",'%;height:100%"></div>'].join("")),this._widgetMarkupEnd(e),t=0},_widgetMarkupBegin:function(e){var t=this._skinObj,n=this._cfg;e.write(['<div class="xGAUGE_',n.sclass,'" style="float:left;position:relative',t.border?";border:"+
t.border:"",t.borderPadding?";padding:"+t.borderPadding+"px":"",";height:",t.sprHeight,"px;width:",n.gaugeWidth,'px;">'].join(""))},_labelMarkup:function(e){var t=this._skinObj,n=this._cfg;e.write(['<span style="float:left;text-align:',n.labelAlign,t.labelMargins?";margin:"+t.labelMargins:"",t.labelFontSize?";font-size:"+t.labelFontSize+"px":"",n.labelWidth>-1?";width:"+n.labelWidth+"px":"",'">',aria.utils.String.escapeHTML(n.label),"</span>"].join(""))},_widgetMarkupEnd:function(e){e.write("</div>")},_checkCfgConsistency
:function(){if(!this._cfgOk)return;var e=this._cfg;if(e!==null&&e.minValue>=e.maxValue){this.$logError(this.WIDGET_GAUGE_CFG_MIN_EQUAL_GREATER_MAX,[]),this._cfgOk=!1;return}},__getGauge:function(){return this.getDom()},_onBoundPropertyChange:function(e,t,n){e==="currentValue"?this.__setCurrentValue(t):e==="label"&&this.showLabel?this.__setLabel(t):e==="maxValue"?(this._cfg.maxValue=t,this._checkCfgConsistency()):this.$Widget._onBoundPropertyChange.call(this,e,t,n)},__setCurrentValue:function(e){var t=this.showLabel?1
:0,n=this.getDom().childNodes[t].firstChild,r=this.__calculateBarWidth(e);n!==null&&r!==null&&r!=-1&&(n.style.width=r+"%"),n=null},__setLabel:function(e){var t=this.getDom().childNodes[0];t!==null&&(t.innerHTML=e),t=null},__calculateBarWidth:function(e){if(!this._cfgOk)return-1;var t=this._cfg,n=null;return t!==null&&(e!==null&&e!==""&&e>=t.minValue&&e<=t.maxValue?n=(e-t.minValue)/Math.abs(this._cfg.maxValue-this._cfg.minValue)*100:n=-1),t=null,n},__setSkinObj:function(e){this._skinObj=aria.widgets.AriaSkinInterface
.getSkinObject(e,this._cfg.sclass)}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/DateField.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.DateField",$extends:"aria.widgets.form.TextInput",$dependencies:["aria.widgets.controllers.DateController"],$constructor:function(e,t,n){var r=new aria.widgets.controllers.DateController;this.$TextInput.constructor.call(this,e,t,n,r),r.setPattern(e.pattern),e.minValue&&r.setMinValue(new Date(e.minValue)),e.maxValue&&r.setMaxValue(new Date(e.maxValue)),e.referenceDate&&r.setReferenceDate(new Date(e.referenceDate))},$prototype:{_onBoundPropertyChange:function(
e,t,n){e==="referenceDate"?this.controller.setReferenceDate(t):this.$TextInput._onBoundPropertyChange.call(this,e,t,n)}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/MultiSelect.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.MultiSelect",$extends:"aria.widgets.form.DropDownTextInput",$dependencies:["aria.widgets.form.list.List","aria.widgets.controllers.MultiSelectController","aria.DomEvent"],$css:["aria.widgets.form.MultiSelectStyle","aria.widgets.form.list.ListStyle","aria.widgets.container.DivStyle","aria.widgets.form.CheckBoxStyle"],$constructor:function(e,t,n){this._skinnableClass||(this._skinnableClass="MultiSelect");var r=new aria.widgets.controllers.MultiSelectController
;e.value=e.value||[],this.$DropDownTextInput.constructor.call(this,e,t,n,r),r.setListOptions(e.items),r.setSeparator(e.fieldSeparator),r.setMaxOptions(e.maxOptions),r.setFieldDisplay(e.fieldDisplay),r.setValueDisplay(e.valueDisplay),r.checkError(),this._instantBind=e.instantBind===!0,this._dropDownOpen=!1,this.refreshPopup=!1,this._listFocused=!1,this._dropDownList=null},$destructor:function(){this._dropDownOpen=null,this.refreshPopup=null,this._listFocused=null,this.$DropDownTextInput.$destructor.call(this)
,this._dropDownList=null},$prototype:{_clickOnItem:function(e){var t=this.controller.checkValue(this.controller.getDataModel().value),n={stopValueProp:!this._instantBind};this._reactToControllerReport(t,n)},_checkCloseItem:function(e){return e.focusIndex===e.closeItem.id?!0:!1},_keyPressed:function(e){return e.keyCode==aria.DomEvent.KC_ARROW_UP&&this._checkCloseItem(e)?(this.focus(),this._toggleDropdown(),!0):!1},_toggleDropdown:function(){this._hasFocus||this.focus();var e=this.controller.toggleDropdown(this
.getTextInputField().value,this._dropdownPopup!=null);this._reactToControllerReport(e,{hasFocus:!0})},_renderDropdownContent:function(e){var t=this._cfg,n=this.controller.getDataModel(),r=new aria.widgets.form.list.List({defaultTemplate:t.listTemplate,block:!0,sclass:t.listSclass||this._skinObj.listSclass,onchange:{fn:this._clickOnItem,scope:this},onkeyevent:{fn:this._keyPressed,scope:this},onclose:{fn:this._toggleDropdown,scope:this},minWidth:this._inputMarkupWidth+15,width:t.popupWidth>0&&t.popupWidth>this
._inputMarkupWidth?t.popupWidth:null,multipleSelect:!0,maxHeight:250,activateSort:t.activateSort,maxOptions:t.maxOptions,bind:{items:{to:"listContent",inside:n},selectedIndex:{to:"selectedIdx",inside:n},selectedValues:{to:"selectedValues",inside:n}},numberOfColumns:t.numberOfColumns,numberOfRows:t.numberOfRows,displayOptions:t.displayOptions},this._context,this._lineNumber);e.registerBehavior(r),r.writeMarkup(e),this.controller.setListWidget(r),r.$on({widgetContentReady:{fn:this._refreshPopup,scope:this,args
:{list:r}}}),this._dropDownList=r},_afterDropdownClose:function(){this.controller.setListWidget(null);if(!this._hasFocus){var e=this.controller.toggleDropdown(this.getTextInputField().value,this._dropdownPopup!=null);e.displayDropDown=!1,this._reactToControllerReport(e,{hasFocus:!1})}this.$DropDownTextInput._afterDropdownClose.call(this),this._dropDownOpen=!1,this.refreshPopup=!1,this._keepFocus=!1},_focusMultiSelect:function(e){this._dropDownOpen&&this.refreshPopup&&e.focus()},_afterDropdownOpen:function(){
this._keepFocus=!0;var e=this.controller.getListWidget();this._dropDownOpen=!0,this._focusMultiSelect(e)},_refreshPopup:function(e,t){this._dropdownPopup&&(this.refreshPopup=!0,this._dropdownPopup.refresh()),this._focusMultiSelect(t.list)},_reactToControllerReport:function(e,t){this.$DropDownTextInput._reactToControllerReport.call(this,e,t)},_widgetContentReady:function(e){this._refreshPopup(e),this._dropDownList.focus()}}});
//*******************
//LOGICAL-PATH:aria/widgets/form/PasswordField.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.PasswordField",$extends:"aria.widgets.form.TextInput",$constructor:function(e,t,n){var r=new aria.widgets.controllers.TextDataController;this.$TextInput.constructor.call(this,e,t,n,r),this._isPassword=!0},$prototype:{}});
//*******************
//LOGICAL-PATH:aria/widgets/form/TimeField.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.form.TimeField",$extends:"aria.widgets.form.TextInput",$dependencies:["aria.widgets.controllers.TimeController"],$constructor:function(e,t,n){var r=new aria.widgets.controllers.TimeController(e);r.setPattern(e.pattern),this.$TextInput.constructor.call(this,e,t,n,r)},$prototype:{}});
//*******************
//LOGICAL-PATH:aria/widgets/form/templates/TemplateMultiSelect.tpl
//*******************
// Default template for List Widget 
{Template {
    $classpath:'aria.widgets.form.templates.TemplateMultiSelect',
    $hasScript:true,
    $res:{
      footerRes : 'aria.resources.multiselect.FooterRes'
    }
}}
    {macro main()}
        // The Div is used to wrap the items with good looking border.
        {@aria:Div data.cfg}
                
                {section 'Items'}
                    
                    {if (data.displayOptions.flowOrientation == 'horizontal')}
                        // with columns, horizontal
                        <table>
                        {foreach item inView data.itemsView}
                    
                            {if item_index % data.numberOfColumns == 0}
                                <tr>
                            {/if}
                            <td>{call renderItem(item, item_info.initIndex)/}</td>
                            
                            {if (data.displayOptions.tableMode == true)}  
                                {var checkboxLabelSplit = item.label.split('|')/}
                                <td {on click {fn: "itemTableClick", args: {    item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[0]}</td>
                                <td {on click {fn: "itemTableClick", args: {    item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[1]}</td>
                                <td {on click {fn: "itemTableClick", args: {    item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[2]}</td>
                                <td {on click {fn: "itemTableClick", args: {    item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[3]}</td>
                            {/if} 
                            
                            {if (item_index + 1) % data.numberOfColumns == 0}
                                </tr>
                            {/if}
                        {/foreach}
                        </table>
                    {elseif (data.displayOptions.flowOrientation == 'vertical')/}
                    
                        {var lineCount = data.numberOfRows /}
                        {var columnCount = data.numberOfColumns /}
                        {var outputCount = 0 /}
                        {var outputRows = 1 /}

                        <table>
                            
                        {for var i = 0 ; i < lineCount ; i++}
                    
                            <tr>
                            {var lastColCount = 0 /}
                            {for var j = 0 ; j < columnCount ; j++ }
                                <td>
                                {var itemIndex = (j*lineCount)+i/}                    
                                {if (itemIndex < data.itemsView.items.length)}
                                    {var item = data.itemsView.items[itemIndex].value/} 
                                    {call renderItem(item, itemIndex)/}
                                {/if}
                                {set outputCount = outputCount + 1/}
                                </td>                                
                            {/for}
                            {set outputRows = outputRows + 1/}
                            </tr>
                        {/for}
                        </table>
                    {else/}
                    
                        {foreach item inView data.itemsView}
                            {call renderItem(item, item_info.initIndex)/}
                        {/foreach}

                    {/if}
                    
                {/section}
                {if (data.displayOptions.displayFooter)}                                            
                    {call footer()/}
                {/if}
        {/@aria:Div}
    {/macro}    
    
    {macro renderItem(item)}
         
        {var checkboxLabel = "Error"/}
        {if (data.displayOptions.listDisplay == 'code')}
            {set checkboxLabel = item.value/}
        {elseif (data.displayOptions.listDisplay == 'label')/}
            {set checkboxLabel = item.label/}
        {elseif (data.displayOptions.listDisplay == 'both')/}
            {set checkboxLabel = item.label + " (" + item.value + ") " /}
        {/if}
        {if (data.displayOptions.tableMode == true)}  
            {set checkboxLabel = ""/}
        {/if} 
            
                                
        {@aria:CheckBox {                                        
            label: checkboxLabel,                
            onchange: {
                fn: "itemClick",                    
                args: {
                    item : item,
                    itemIdx : item.index
                }
            },    
            id: 'listItem' + item.index,                                                                                         
            bind:{
                "value": {
                    inside: item, to: 'selected'
                },
                "disabled" : {
                    inside : item, to: "currentlyDisabled"
                    }
            },
            value: item.selected
        }/}
        
    {/macro}
        
    {macro footer()}        
        <div class="${data.skin.cssClassFooter}">
            <div style="width:120px">
                {@aria:Link { 
                    label : footerRes.selectAll,
                    sclass : 'multiSelectFooter',
                    onclick : {
                        fn : "selectAll",
                        scope : moduleCtrl    
                    }
                }/}
            </div>    
            <span style="position:absolute;right:2px;text-align:right;">        
                {@aria:Link { 
                    label:footerRes.close,
                    sclass : 'multiSelectFooter',
                    onclick: {
                        fn: "close",
                        scope: moduleCtrl
                    }
                }/}                        
            </span>                
            <span>
                {@aria:Link {
                    label:footerRes.deselectAll,
                    sclass : 'multiSelectFooter',
                    onclick: {
                        fn: "deselectAll",
                        scope: moduleCtrl
                    }
                }/}                        
            </span>                        
        </div>
    {/macro}
    
{/Template}

//*******************
//LOGICAL-PATH:aria/widgets/form/templates/TemplateMultiSelectScript.js
//*******************
Aria.tplScriptDefinition({$classpath:"aria.widgets.form.templates.TemplateMultiSelectScript",$constructor:function(){this._refContainer="myList",this._itemShift=1},$prototype:{onModuleEvent:function(e){if(e.name=="onChange")!e.selectedIndexes&&!e.unselectedIndexes&&this.$refresh({filterSection:"Items"});else if(e.name=="focusList"){var t=this.data.focusIndex?this.data.focusIndex:0,n=this.data.itemsView.items[t].value.index,r="listItem"+n;this.$focus(r)}else if(e.name=="keyevent"&&e.keyCode==aria.DomEvent.KC_ARROW_UP&&
e.focusIndex===0){e.cancelDefault=!0;var n=this.data.itemsView.items[t].value.index,r="listItem"+n;this.$focus(r)}},itemTableClick:function(e,t){this.itemClick(e,t,!1)},itemClick:function(e,t,n){n==null&&(n=!0),this.data.disabled||this.moduleCtrl.itemClick(t.itemIdx,n)},_getClassForItem:function(e){var t=[this.data.skin.cssClassItem];return e.selected&&t.push(this.data.skin.cssClassSelected),this.data.disabled?t.push(this.data.skin.cssClassDisabled):t.push(this.data.skin.cssClassEnabled),t.join(" ")}}});
//*******************
//LOGICAL-PATH:aria/widgets/transform/NotTransform.js
//*******************
Aria.classDefinition({$classpath:"aria.widgets.transform.NotTransform",$constructor:function(){this.$JsObject.constructor.call(this)},$prototype:{toWidget:function(e){return!e},fromWidget:function(e){return!e}}});
//*******************
//LOGICAL-PATH:aria/utils/environment/Date.js
//*******************
Aria.classDefinition({$classpath:"aria.utils.environment.Date",$dependencies:["aria.utils.environment.DateCfgBeans"],$extends:"aria.core.environment.EnvironmentBase",$singleton:!0,$prototype:{_cfgPackage:"aria.utils.environment.DateCfgBeans.AppCfg",getDateFormats:function(){return this.checkApplicationSettings("dateFormats")},getTimeFormats:function(){return this.checkApplicationSettings("timeFormats")},getFirstDayOfWeek:function(){var e=this.checkApplicationSettings("firstDayOfWeek");return aria.utils.Date&&
(e=aria.utils.Date.firstDayOfWeek),e},_applyEnvironment:function(e){aria.utils.Date&&(aria.utils.Date.firstDayOfWeek=this.checkApplicationSettings("firstDayOfWeek")),this.$callback(e)}}});
//*******************
//LOGICAL-PATH:aria/utils/environment/DateCfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.utils.environment.DateCfgBeans",$description:"",$namespaces:{json:"aria.core.JsonTypes",environmentBase:"aria.core.environment.EnvironmentBaseCfgBeans"},$beans:{AppCfg:{$type:"json:Object",$description:"",$restricted:!1,$properties:{dateFormats:{$type:"DateFormatsCfg",$description:"",$default:{dateBeforeMonth:!0,shortFormat:"d/M/y",mediumFormat:"d MMM y",longFormat:"d MMMM yyyy",fullFormat:"EEEE d MMMM yyyy"}},timeFormats:{$type:"TimeFormatsCfg",$description:"",$default:{
shortFormat:"HH:mm",fullFormat:"HH:mm:ss"}},firstDayOfWeek:{$type:"json:Integer",$description:"",$default:0,$sample:1}}},DateFormatsCfg:{$type:"json:Object",$description:"",$properties:{dateBeforeMonth:{$type:"json:Boolean",$description:"",$default:!0},shortFormat:{$type:"environmentBase:FormatTypes",$description:"",$default:"d/M/y"},mediumFormat:{$type:"environmentBase:FormatTypes",$description:"",$default:"d MMM y"},longFormat:{$type:"environmentBase:FormatTypes",$description:"",$default:"d MMMM yyyy"},fullFormat
:{$type:"environmentBase:FormatTypes",$description:"",$default:"EEEE d MMMM yyyy"}}},TimeFormatsCfg:{$type:"json:Object",$description:"",$properties:{shortFormat:{$type:"environmentBase:FormatTypes",$description:"",$default:"hh:mm"},fullFormat:{$type:"environmentBase:FormatTypes",$description:"",$default:"hh:mm:ss"}}}}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Select All",deselectAll:"Deselect All",close:"Close"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_ca_ES.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Selecciona-ho tot",deselectAll:"Desselecciona-ho tot",close:"Tancar"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_cn_CN.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\u5168\u9009",deselectAll:"\u53d6\u6d88\u5168\u9009",close:"\u5173\u95ed"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_da_DK.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"V\u00e6lg alle",deselectAll:"Frav\u00e6lg alt",close:"Afslut"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_de_DE.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Alle ausw\u00e4hlen",deselectAll:"Alle Auswahlen aufheben",close:"Schlie\u00dfen"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_el_GR.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\u0395\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae \u03cc\u03bb\u03c9\u03bd",deselectAll:"\u0391\u03ba\u03cd\u03c1\u03c9\u03c3\u03b7 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae\u03c2 \u03cc\u03bb\u03c9\u03bd",close:"\u039a\u03bb\u03b5\u03af\u03c3\u03b9\u03bc\u03bf"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_en_GB.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Select All",deselectAll:"Deselect All",close:"Close"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_en_US.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Select All",deselectAll:"Deselect All",close:"Close"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_es_ES.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Seleccionar todo",deselectAll:"Deseleccionar todo",close:"Cerrar"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_fi_FI.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Valitse kaikki",deselectAll:"Poista kaikkien valinnat",close:"Sulje"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_fo_FO.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Vel \u00f8ll",deselectAll:"Fr\u00e1vel \u00f8ll",close:"Lat aftur"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_fr_FR.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"S\u00e9lectionner tout",deselectAll:"D\u00e9s\u00e9lect. tout",close:"Fermer"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_he_IL.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\u05d1\u05d7\u05e8 \u05d4\u05db\u05dc",deselectAll:"\u05d1\u05d8\u05dc \u05d1\u05d7\u05d9\u05e8\u05ea \u05d4\u05db\u05dc",close:"\u05e1\u05d2\u05d5\u05e8"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_hi_IN.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\u0938\u092d\u0940 \u091a\u0941\u0928\u0947\u0902",deselectAll:"\u0938\u092d\u0940 \u0915\u094b \u0905\u091a\u092f\u0928\u093f\u0924 \u0915\u0930\u0947\u0902",close:"\u092c\u0902\u0926 \u0915\u0930\u0947\u0902"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_hu_HU.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\u00d6sszes kijel\u00f6l\u00e9se",deselectAll:"\u00d6sszes kijel\u00f6l\u00e9s megsz\u00fcntet\u00e9se",close:"Bez\u00e1r"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_is_IS.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Velja allt",deselectAll:"H\u00e6tta vi\u00f0 val \u00e1 \u00f6llu",close:"Loka"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_it_IT.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Seleziona tutto",deselectAll:"Deseleziona tutto",close:"Chiudi"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_ja_JP.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\u3059\u3079\u3066\u9078\u629e",deselectAll:"\u3059\u3079\u3066\u9078\u629e\u89e3\u9664",close:"\u9589\u3058\u308b"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_ko_KO.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\ubaa8\ub450 \uc120\ud0dd",deselectAll:"\ubaa8\ub450 \uc120\ud0dd \ucde8\uc18c",close:"\ub2eb\uae30"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_nl_NL.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Alles selecteren",deselectAll:"Gehele selectie uitschakelen",close:"Sluiten"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_no_NO.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Velg alle",deselectAll:"Opphev merking av alle",close:"Lukk"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_pl_PL.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Wybierz wszystko",deselectAll:"Usu\u0144 wszystkie zaznaczenia",close:"Zamknij"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_pt_BR.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Selecionar tudo",deselectAll:"Desmarcar todos",close:"Fechar"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_pt_PT.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"Seleccionar tudo",deselectAll:"Desactivar a selec\u00e7\u00e3o de todos",close:"Fechar"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_ru_RU.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0441\u0435",deselectAll:"\u0421\u043d\u044f\u0442\u044c \u0432\u044b\u0434\u0435\u043b\u0435\u043d\u0438\u0435",close:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_sp_AR.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0643\u0644",deselectAll:"\u0623\u0644\u063a\u064a \u0623\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0643\u0644",close:"\u0623\u063a\u0644\u0627\u0642"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_sv_SE.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"V\u00e4lj alla",deselectAll:"Avmarkera alla",close:"St\u00e4ng"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_th_TH.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14",deselectAll:"\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01\u0e01\u0e32\u0e23\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14",close:"\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_tr_TR.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"T\u00fcm\u00fcn\u00fc Se\u00e7",deselectAll:"T\u00fcm se\u00e7imi kald\u0131r",close:"Kapat"}});
//*******************
//LOGICAL-PATH:aria/resources/multiselect/FooterRes_tw_TW.js
//*******************
Aria.resourcesDefinition({$classpath:"aria.resources.multiselect.FooterRes",$resources:{selectAll:"\u5168\u90e8\u9078\u64c7",deselectAll:"\u5168\u90e8\u53d6\u6d88\u9078\u64c7",close:"\u95dc\u9589"}});