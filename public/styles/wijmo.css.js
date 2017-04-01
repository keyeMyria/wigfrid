"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "/* Wijmo Control */\n\n/* Primary wj control style - applies to all controls */\n.wj-content {\n  display: inline-block;\n  border: 1px solid rgba(0,0,0,0.2);\n  border-radius: 4px;\n  background-color: #fff;\n  outline: none;\n  box-sizing: border-box;\n}\n\n.wj-control {\n  outline: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n/* Define control header */\n.wj-header {\n  background-color: #EAEAEA;\n  color: #444;\n  font-weight: bold;\n}\n\n/* Selected state colors */\n.wj-state-selected {\n  background-color: #0085c7;\n  color: #fff;\n}\n\n/* Selected state colors */\n.wj-state-multi-selected {\n  background-color: #80ADBF;\n  color: #fff;\n}\n\n/* Disabled elements (via CSS) */\n.wj-state-disabled {\n  opacity: 0.5;\n  cursor: default;\n  pointer-events: none;\n}\n\n/* Disabled controls (via attribute) */\n.wj-control[disabled] {\n  opacity: .5;\n  background-color: #eeeeee;\n  pointer-events: none;\n}\n\n/* Button Styles */\n\n/* Basic style for all button types */\nbutton,\nhtml input[type=button],\ninput[type=reset],\ninput[type=submit] {\n  -webkit-appearance: button;\n  overflow: visible;\n  border-radius: inherit;\n  cursor: pointer;\n}\n\n/* Global base button style */\n.wj-btn {\n  /*display: block;*/\n  padding: 0px 10px;\n  height: 100%;\n  vertical-align: middle;\n  text-align: center;\n  white-space: nowrap;\n  cursor: pointer;\n}\n\n/* Additional styling for default buttons */\n.wj-btn-default {\n  border: 1px solid rgba(0,0,0,0.2);\n  background-color: transparent;\n  color: inherit;\n  /*font-weight: bold;*/\n}\n\n/* Hover on 'default' button */\n.wj-btn-default:hover {\n  background-color: rgba(0,0,0,0.1);\n}\n\n.wj-btn-default:focus {\n  background-color: rgba(0,0,0,0.1);\n}\n\n/* Link Buttons in Wijmo controls*/\n.wj-control a[wj-part^=\"btn-\"] {\n  background: #e6e6e6;\n  padding: 6px 20px;\n  color: #444;\n  display: inline-block;\n  margin-top: 5px;\n  text-decoration: none;\n  font-size: 12px;\n  font-weight: bold;\n}\n\n.wj-control a[wj-part^=\"btn-\"]:hover {\n  text-decoration: none;\n  background: #e0e0e0;\n}\n\n/* Button Group Styles */\n\n/* Define button group based on bootstrap */\n.wj-btn-group,\n.wj-btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  border-radius: 4px;\n  vertical-align: top;\n}\n\n/* Float buttons in group */\n.wj-btn-group > .wj-btn,\n.wj-btn-group-vertical > .wj-btn {\n  position: relative;\n  float: left;\n}\n\n/* Remove inner button border radius */\n.wj-btn-group > .wj-btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n\n.wj-btn-group > .wj-btn:first-child {\n  margin-left: 0;\n}\n\n/* Remove first button right-side border radius and margin */\n.wj-btn-group > .wj-btn:first-child:not(:last-child) {\n  border-right: none;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n/* Remove last button left-side border radius and margin */\n.wj-btn-group > .wj-btn:last-child:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n/* Remove margin from inner buttons to prevent double border */\n.wj-btn-group .wj-btn + .wj-btn,\n.wj-btn-group .wj-btn + .wj-btn-group,\n.wj-btn-group .wj-btn-group + .wj-btn,\n.wj-btn-group .wj-btn-group + .wj-btn-group {\n  margin-left: -1px;\n}\n\n/* ListBox Styles */\n\n.wj-listbox {\n  overflow: auto;\n  cursor: default;\n}\n\n.wj-listbox-item {\n  box-sizing: border-box;\n  padding: 3px 10px;\n}\n\n.wj-listbox-item.wj-separator {\n  height: 1px;\n  margin: 3px 0px;\n  padding: 0px;\n  background-color: rgba(0,0,0,.1);\n}\n\n.wj-listbox-item:not(.wj-state-selected):not(.wj-state-disabled):not(.wj-separator):hover {\n  background-color: rgba(0,0,0,.05);\n}\n\n.wj-listbox-item.wj-state-selected input[type=checkbox]:focus {\n  outline: none;\n}\n\n.wj-listbox .wj-listbox-item label {\n  font-weight: normal;\n  margin: 0px;\n}\n\n.wj-dropdown .wj-listbox {\n  padding: 0;\n  white-space: nowrap;\n}\n\n.wj-listbox-item.wj-state-selected .wj-control {\n  background: #fff;\n  color: #444;\n}\n\n/* Dropdown Styles */\n\n.wj-dropdown {\n  vertical-align: middle;\n}\n\n.wj-dropdown .wj-template,\n.wj-dropdown .wj-dropdown-menu {\n  border-radius: inherit;\n}\n\n.wj-template {\n  height: 100%;\n}\n\n.wj-dropdown-panel {\n  outline: none;\n  box-shadow: 0 6px 13px rgba(0,0,0,0.2);\n  /* Boostrap modals have zIndex 1050, so go higher */\n  z-index: 1500 !important;\n}\n\n\n/* Input Group Styles */\n\n/* Remove spinner buttons from InputNumber control */\n.wj-inputnumber input[type=number]::-webkit-inner-spin-button,\n.wj-inputnumber input[type=number]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n/* Remove clear icon from IE textbox */\ninput::-ms-clear {\n  display: none;\n}\n\n/* Remove default browser focus outlines */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  outline: 0;\n}\n\n.wj-inputnumber {\n  vertical-align: middle;\n}\n\n.wj-input-group-btn,\n.wj-input-group .wj-form-control {\n  box-sizing: border-box;\n  display: table-cell;\n}\n\n.wj-input {\n  height: 100%;\n  overflow: hidden;\n}\n\n/* Define input group based on bootstrap */\n.wj-input-group {\n  position: relative;\n  display: table;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  min-height: 2em;\n  border-collapse: separate;\n  border-radius: 4px;\n  background: inherit;\n}\n\n/* Style for text input box in group */\n.wj-input-group .wj-form-control {\n  position: relative;\n  float: left;\n  padding: 4px 8px;\n  vertical-align: middle;\n  width: 100%;\n  height: 100%;\n  border: none;\n  border-radius: 0;\n  background-color: transparent;\n  color: inherit;\n}\n\n/* Text alignment for numeric input types */\n.wj-input-group .wj-form-control.wj-numeric {\n  text-align: right;\n}\n\n/* Adjust float and width for Menu control */\n.wj-input-group div[wj-part='header'] {\n  float: none;\n  width: auto;\n  vertical-align: middle;\n}\n\n/* Remove border from outside of buttons - outer border set at wj-content level */\n.wj-input-group-btn > .wj-btn {\n  border-width: 0;\n}\n\n/* Remove first button right-side border radius */\n.wj-input-group-btn:first-child > .wj-btn {\n  border-right-width: 1px;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n/* Remove last button left-side border radius */\n.wj-input-group-btn:last-child > .wj-btn {\n  border-left-width: 1px;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n/* RTL borders */\n\n/* Remove first button left-side border radius */\n[dir=\"rtl\"] .wj-input-group-btn:first-child > .wj-btn {\n  border-left-width: 1px;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  /* Unset LTR border styles */\n  border-right-width: 0;\n  border-top-right-radius: inherit;\n  border-bottom-right-radius: inherit;\n}\n\n/* Remove last button right-side border radius */\n[dir=\"rtl\"] .wj-input-group-btn:last-child > .wj-btn {\n  border-right-width: 1px;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  /* Unset LTR border styles */\n  border-left-width: 0;\n  border-top-left-radius: inherit;\n  border-bottom-left-radius: inherit;\n}\n\n/* Style for buttons in group */\n.wj-input-group-btn {\n  position: relative;\n  width: 26px;\n  height: 100%;\n  vertical-align: top;\n  white-space: nowrap;\n}\n\n/* Pager Styles */\n\n.wj-pager {\n  vertical-align: middle;\n  margin-left: 5px;\n  margin-right: 5px;\n}\n\n.wj-pager .wj-input-group-btn > .wj-btn {\n  min-width: 40px;\n}\n\n.wj-pager .wj-btn[disabled] span {\n  opacity: .5;\n  cursor: default;\n}\n\n.wj-pager .wj-form-control {\n  text-align: center;\n  border-left: 1px solid rgba(0,0,0,0.2);\n  border-right: 1px solid rgba(0,0,0,0.2);\n}\n\n/* Calendar Date Input Styles */\n\n.wj-calendar-outer {\n  display: block;\n  padding: 10px;\n  width: 100%;\n  height: auto;\n  cursor: default;\n}\n\n.wj-calendar td {\n  text-align: center;\n}\n\n/* Remove background, border when in dropdown */\n.wj-dropdown-panel .wj-calendar-outer {\n  border: 0;\n  background: none;\n}\n\n.wj-day-today {\n  font-weight: bold;\n}\n\n.wj-day-othermonth {\n  opacity: 0.5;\n}\n\n\n/* -- Date selection -- */\n\n/* Added padding to bottom of date selection options */\n.wj-calendar-header {\n  display: block;\n  padding: 0 0 15px 0;\n  width: 100%;\n}\n\n/* Float month selection to the left */\n.wj-month-select {\n  display: inline-block;\n  float: left;\n  cursor: pointer;\n}\n\n/* Float calendar button group to the right */\n.wj-calendar-header .wj-btn-group {\n  display: inline-block;\n  float: right;\n  margin-bottom: 7px;\n}\n\n/* Size button group in calendar header */\n.wj-calendar-header .wj-btn-group .wj-btn {\n  padding: 0 8px 1px 8px;\n  min-height: 25px;\n}\n\n/* -- Days of the month -- */\n\n.wj-calendar-month {\n  box-sizing: border-box;\n  width: 100%;\n  border-collapse: collapse;\n  font: inherit;\n}\n\n.wj-calendar-month td {\n  width: 14.29%;\n  padding: 5px 0;\n  border: none;\n}\n\n/* Slightly reduce size of text in calendar header */\n.wj-calendar-month .wj-header {\n  font-size: 90%;\n}\n\n/* -- Months of the year -- */\n\n.wj-calendar-year {\n  box-sizing: border-box;\n  width: 100%;\n  border-collapse: collapse;\n  font: inherit;\n}\n\n.wj-calendar-year td {\n  width: 25%;\n  padding: 8px;\n  border: none;\n}\n\n/* -- FlexGrid -- */\n\n.wj-flexgrid {\n  width: 100%;\n  overflow: hidden;\n}\n\n.wj-flexgrid .wj-cell {\n  position: absolute;\n  box-sizing: border-box;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  padding: 3px;\n  border-right: 1px solid #c6c6c6;\n  border-bottom: 1px solid #c6c6c6;\n  outline: none;\n}\n\n/* Text color for nested controls in selected rows */\n.wj-flexgrid .wj-cell.wj-state-selected .wj-control,\n.wj-cell.wj-state-multi-selected .wj-control {\n  color: #444;\n}\n\n/* Selected headers */\n.wj-flexgrid .wj-header.wj-state-multi-selected {\n  background-color: #e4e4e4;\n  color: #444;\n  font-weight: bold;\n}\n\n/* Selected column headers */\n.wj-flexgrid .wj-colheaders .wj-header.wj-state-multi-selected {\n  border-bottom: 2px solid #0085c7;\n}\n\n/* Selected row headers */\n.wj-flexgrid .wj-rowheaders .wj-header.wj-state-multi-selected {\n  border-right: 2px solid #0085c7;\n}\n\n/* Sticky headers */\n.wj-flexgrid .wj-state-sticky .wj-header {\n  opacity: 0.75;\n}\n\n/* Selection Marquee */\n.wj-flexgrid .wj-marquee {\n  position: absolute;\n  box-sizing: border-box;\n  border: 2px solid #0085c7;\n}\n\n/* FlexSheet Marquee */\n.wj-flexsheet .wj-marquee {\n  position: absolute;\n  box-sizing: border-box;\n  border: 2px solid #0085c7;\n}\n\n.wj-flexsheet .wj-state-multi-selected {\n  background: #e6e6e6;\n  color: #222;\n}\n\n/* Darken borders to make visible */\n.wj-flexsheet .wj-cell.wj-state-multi-selected {\n  border-right: 1px solid #bbb;\n  border-bottom: 1px solid #bbb;\n}\n\n\n/* Cells with word-wrapping */\n.wj-flexgrid .wj-cell.wj-wrap {\n  white-space: normal;\n  text-overflow: clip;\n}\n\n/* Default grid cell color */\n.wj-flexgrid .wj-cell:not(.wj-header):not(.wj-group):not(.wj-alt):not(.wj-state-selected):not(.wj-state-multi-selected) {\n  background: #fff;\n}\n\n/* Alternate grid cell color */\n.wj-flexgrid .wj-alt:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected) {\n  background: #f9f9f9;\n}\n\n/* Group row background */\n.wj-flexgrid .wj-group:not(.wj-state-selected):not(.wj-state-multi-selected) {\n  background-color: #dddddd;\n}\n\n/* Frozen area boundaries */\n.wj-flexgrid .wj-cell.wj-frozen-row {\n  border-bottom: 1px solid #666;\n}\n.wj-flexgrid .wj-cell.wj-frozen-col {\n  border-right: 1px solid #666;\n}\n\n/* Grid editor */\n.wj-flexgrid .wj-grid-editor {\n  box-sizing: border-box;\n  padding: 3px;\n  border: none;\n  width: 100%;\n  margin: 0px;\n}\n\n/* Grid drag/resize row/col marker */\n.wj-flexgrid .wj-marker {\n  position: absolute;\n  background-color: #0085c7;\n  opacity: 0.5;\n  pointer-events: none;\n}\n\n/* Switch cell borders in RTL grids */\n[dir=\"rtl\"] .wj-cell {\n  border-left: 1px solid #c6c6c6;\n  border-right: none;\n}\n\n/* Switch frozen borders in RTL grids */\n[dir=\"rtl\"] .wj-frozen-col {\n  border-left: 1px solid #666;\n  border-right: none;\n}\n\n/* FlexGrid Filter extension */\n\n.wj-filter-on .wj-glyph-filter {\n  opacity: 0.85;\n}\n\n.wj-filter-off .wj-glyph-filter {\n  opacity: 0.25;\n}\n\n.wj-columnfiltereditor {\n  padding: 10px;\n  min-width: 230px;\n  max-width: 50%;\n}\n\n.wj-columnfiltereditor .wj-control {\n  margin-bottom: 6px;\n  width: 100%;\n}\n\n.wj-columnfiltereditor .wj-listbox .wj-listbox-item label {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n/* FlexGrid GroupPanel extension */\n.wj-grouppanel {\n  background-color: #f4f4f4;\n  padding: 15px;\n}\n\n.wj-grouppanel .wj-cell {\n  margin-right: 10px;\n  padding: 6px 16px;\n  border: 1px solid #e6e6e6;\n  cursor: pointer;\n}\n\n.wj-grouppanel .wj-cell:hover {\n  background: #e0e0e0;\n}\n\n/* WJ Tooltip */\n\n.wj-tooltip {\n  position: absolute;\n  z-index: 1000;\n  top: 0px;\n  left: 0px;\n  pointer-events: none;\n  max-width: 400px;\n  padding: 6px;\n  background-color: #ffffe5;\n  border: 1px solid rgba(0,0,0,0.1);\n  border-radius: 6px;\n  box-shadow: 0 6px 12px rgba(0,0,0,.175);\n  box-sizing: border-box;\n}\n\n/* Chart Styles */\n\n.wj-flexchart {\n  height: 400px;\n  padding: 15px 10px;\n  margin-bottom: 12px;\n  background-color: white;\n  border: 1px solid #e4e4e4;\n}\n\n.wj-flexchart .wj-title {\n}\n\n.wj-flexchart .wj-header {\n}\n\n.wj-flexchart .wj-header .wj-title {\n  font-size: 16pt;\n  fill: #666;\n  font-weight: normal;\n}\n\n.wj-flexchart .wj-footer {\n}\n\n.wj-flexchart .wj-footer .wj-title {\n  fill: #666;\n  font-weight: normal;\n}\n\n.wj-flexchart .wj-plot-area {\n}\n\n.wj-flexchart .wj-legend .wj-label {\n  fill: #666;\n}\n\n.wj-flexchart .wj-data-label {\n  fill: #666;\n}\n\n.wj-flexchart .wj-data-label-border {\n  stroke: rgba(128,128,128,0.5);\n}\n\n.wj-flexchart .wj-data-label-line {\n  stroke: rgba(128,128,128,1);\n}\n\n.wj-flexchart .wj-axis-x .wj-title,\n.wj-flexchart .wj-axis-y .wj-title {\n  font-style: italic;\n}\n\n/* style for selected items on the chart */\n.wj-flexchart .wj-state-selected {\n  stroke-width: 3px;\n  stroke-dasharray: 6;\n  stroke-linecap: square;\n}\n\n/* style for selected items on the chart - smaller screens */\n@media(max-width: 1025px) {\n  .wj-flexchart .wj-state-selected {\n    stroke-width: 2px;\n    stroke-dasharray: 4;\n  }\n}\n\n@media(max-width: 767px) {\n  wj-flexchart .wj-state-selected {\n    stroke-width: 1px;\n    stroke-dasharray: 3;\n  }\n}\n\n/* X Axis  */\n\n.wj-flexchart .wj-axis-x {\n}\n\n.wj-flexchart .wj-axis-x .wj-label {\n  fill: #666;\n}\n\n/* bottom line */\n.wj-flexchart .wj-axis-x .wj-line {\n  stroke: #aaa;\n  stroke-width: 1px;\n}\n\n/* bottom tick */\n.wj-flexchart .wj-axis-x .wj-tick {\n  stroke: #aaa;\n  stroke-width: 1px;\n}\n\n/* none */\n.wj-flexchart .wj-axis-x .wj-gridline {\n  stroke: black;\n  stroke-width: 0.25px;\n}\n\n/* minor tick */\n.wj-flexchart .wj-axis-x .wj-tick-minor {\n  stroke: #aaa;\n  stroke-width: 1px;\n}\n\n/* minor grid line */\n.wj-flexchart .wj-axis-x .wj-gridline-minor {\n  stroke: black;\n  stroke-dasharray: 6;\n  stroke-width: 0.25px;\n}\n\n/* Y Axis */\n\n.wj-flexchart .wj-axis-y {\n}\n\n/* labels down y axis */\n.wj-flexchart .wj-axis-y .wj-label {\n  fill: #666;\n}\n\n.wj-flexchart .wj-axis-y .wj-tick {\n  stroke: #aaa;\n  stroke-width: 1px;\n}\n\n/* bg horizontal lines */\n.wj-flexchart .wj-axis-y .wj-gridline {\n  stroke: #777;\n  stroke-width: 0.25px;\n}\n\n/* minor tick */\n.wj-flexchart .wj-axis-y .wj-tick-minor {\n  stroke: #aaa;\n  stroke-width: 1px;\n}\n\n/* minor grid line */\n.wj-flexchart .wj-axis-y .wj-gridline-minor {\n  stroke: black;\n  stroke-dasharray: 6;\n  stroke-width: 0.25px;\n}\n\n\n/****  Range Slider Css *****/\n\n.wj-flexchart .wj-chart-rangeslider {\n  position: absolute;\n  touch-action: none;\n  -ms-touch-action: none;\n}\n\n.wj-flexchart .wj-chart-rangeslider button {\n  position: absolute;\n  text-align: center;\n  vertical-align: middle;\n  padding: 0px;\n  line-height: 16px;\n  border-radius: 2px;\n}\n\n.wj-flexchart .wj-chart-hrangeslider button {\n  width: 16px;\n  height: 100%;\n}\n\n.wj-flexchart .wj-chart-vrangeslider button {\n  height: 16px;\n  width: 100%;\n}\n\n.wj-flexchart .wj-chart-rangeslider .wj-rangeslider-content {\n  background-color: #eaeaea;\n  height: 100%;\n  position: relative;\n}\n\n.wj-flexchart .wj-chart-rangeslider .wj-rangeslider-rangehandle {\n  position: absolute;\n  text-align: center;\n  vertical-align: middle;\n  background-color: #BDBDBD;\n  height: 100%;\n  width: 100%;\n}\n\n.wj-flexchart .wj-chart-rangeslider .wj-rangeslider-minhandle,\n.wj-flexchart .wj-chart-rangeslider .wj-rangeslider-maxhandle {\n  border: 1px solid Gray;\n  display: block;\n  position: absolute;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n\n.wj-flexchart .wj-chart-hrangeslider .wj-rangeslider-minhandle,\n.wj-flexchart .wj-chart-hrangeslider .wj-rangeslider-maxhandle {\n  background-color: #BDBDBD;\n  cursor: ew-resize;\n  height: 22px;\n  margin-top: -2px;\n  width: 14px;\n}\n\n.wj-flexchart .wj-chart-vrangeslider .wj-rangeslider-minhandle,\n.wj-flexchart .wj-chart-vrangeslider .wj-rangeslider-maxhandle {\n  background-color: #BDBDBD;\n  cursor: ns-resize;\n  width: 22px;\n  margin-left: -2px;\n  height: 14px;\n}\n\n.wj-flexchart .wj-chart-rangeslider .wj-rangeslider-handle-active {\n  z-index: 2;\n}\n\n.wj-flexchart .wj-chart-hrangeslider .wj-rangeslider-decbtn {\n  left: 0px;\n}\n\n.wj-flexchart .wj-chart-hrangeslider .wj-rangeslider-incbtn {\n  right: 0px;\n}\n\n.wj-flexchart .wj-chart-vrangeslider .wj-rangeslider-decbtn {\n  bottom: 0px;\n}\n\n.wj-flexchart .wj-chart-vrangeslider .wj-rangeslider-incbtn {\n  top: 0px;\n}\n\n.wj-flexchart .wj-chart-rangeslider .wj-glyph-left {\n  border-top: 5px solid transparent;\n  border-right: 4px solid;\n  border-bottom: 4px solid transparent;\n  margin-right: 2px;\n}\n\n.wj-flexchart .wj-chart-rangeslider .wj-glyph-right {\n  border-bottom: 5px solid transparent;\n  border-left: 4px solid;\n  border-top: 4px solid transparent;\n  margin-left: 2px;\n}\n\n.wj-flexchart .wj-chart-rangeslider .wj-glyph-down {\n  border-top: 5px solid;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n  margin-bottom: 3px;\n}\n\n.wj-flexchart .wj-chart-rangeslider .wj-glyph-up {\n  border-right: 4px solid transparent;\n  border-bottom: 5px solid;\n  border-left: 4px solid transparent;\n  margin-bottom: 4px;\n}\n\n/****  Range Selector Css *****/\n.wj-flexchart .wj-chart-rangeselector-container {\n  position: relative;\n}\n\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-rangeslider,\n.wj-flexchart .wj-chart-rangeselector-container .wj-rangeslider-content {\n  background-color: transparent;\n  border-color: transparent;\n}\n\n.wj-flexchart .wj-chart-rangeselector-container .wj-rangeslider-rangehandle {\n  opacity: 0.3;\n}\n\n.wj-flexchart .wj-chart-rangeselector-container .wj-rangeslider-minhandle,\n.wj-flexchart .wj-chart-rangeselector-container .wj-rangeslider-maxhandle {\n  background-color: transparent;\n  opacity: 0.6;\n  border: 2px solid Gray;\n  border-radius: 0.5em;\n}\n\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-minhandle,\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-maxhandle {\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n  border: 1px solid hsla(0,0%,50.2%,0.75);\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  color: hsl(0,0%,50.2%);\n  background: #d3d3d3;\n  opacity: 1;\n}\n\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-minhandle:after,\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-maxhandle:after {\n  content: \"2551\";\n  text-align: center;\n  width: 100%;\n  display: inline-block;\n  position: absolute;\n  margin: 0;\n  top: 50%;\n  transform: translateY(-55%);\n  -webkit-transform: translateY(-55%);\n  opacity: 0.75;\n  font-size: 10px;\n}\n\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-vrangeslider .wj-rangeslider-minhandle,\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-vrangeslider .wj-rangeslider-maxhandle {\n  height: 20px;\n  width: 20px;\n  left: 50%;\n  border-radius: 50%;\n  border: 1px solid hsla(0,0%,50.2%,0.75);\n  top: 0;\n  bottom: 0;\n  color: hsl(0,0%,50.2%);\n  background: #d3d3d3;\n  opacity: 1;\n}\n\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-vrangeslider .wj-rangeslider-minhandle:after,\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-vrangeslider .wj-rangeslider-maxhandle:after {\n  content: \"2550\";\n  text-align: center;\n  height: 100%;\n  display: inline-block;\n  position: absolute;\n  margin: 0;\n  left: 50%;\n  transform: translate(-50%,15%);\n  -webkit-transform: translate(-50%,15%);\n  opacity: 0.75;\n  font-size: 12px;\n}\n\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-rangeslider .wj-rangeslider-minhandle.wj-rangeslider-handle-active,\n.wj-flexchart .wj-chart-rangeselector-container .wj-chart-rangeslider .wj-rangeslider-maxhandle.wj-rangeslider-handle-active {\n  background-color: rgba(136,189,230,0.7);\n}\n\n.wj-flexchart .wj-rangeselector .wj-scroller-center {\n  background: rgba(128,128,128,0.1);\n  position: absolute;\n  display: block;\n  touch-action: none;\n}\n\n/* Chart Gestures Css */\n.wj-flexchart .wj-zoom {\n  visibility: hidden;\n  position: relative;\n}\n\n.wj-flexchart .wj-zoom-overlay {\n  background: rgba(128,128,128,0.2);\n  position: absolute;\n  display: block;\n  touch-action: none;\n}\n\n.wj-flexchart.wj-panable {\n  cursor: pointer;\n}\n\n.wj-flexchart .wj-block-other-interaction {\n  display: none;\n}\n\n/* chart marker */\n.wj-flexchart-touch-disabled {\n  -ms-touch-action: none;\n}\n\n.wj-flexchart .wj-chart-linemarker {\n  background: rgba(128,128,128,0.3);\n  position: absolute;\n  padding: 2px;\n}\n\n.wj-flexchart .wj-chart-linemarker-container {\n  position: relative;\n}\n\n.wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-hline {\n  height: 2px;\n  background: rgba(128,128,128,1);\n  touch-action: none;\n  position: absolute;\n}\n\n.wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-vline {\n  width: 2px;\n  background: rgba(128,128,128,1);\n  touch-action: none;\n  position: absolute;\n}\n\n.wj-flexchart.wj-chart-linemarker-draggable,\n.wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-draggable {\n  -khtml-user-drag: element;\n  cursor: move;\n}\n\n/* Gauges */\n\n.wj-gauge:focus {\n  outline: none;\n}\n\n.wj-gauge .wj-face path {\n  fill: #f5f5f5;\n  stroke: #cbcbcb;\n  stroke-width: 1px;\n  stroke-linejoin: round;\n}\n\n.wj-gauge .wj-pointer {\n  fill: #0085c7;\n}\n\n.wj-gauge .wj-min,\n.wj-gauge .wj-max {\n  font-size: 60%;\n  opacity: .5;\n}\n\n.wj-radialgauge .wj-value {\n  font-size: 150%;\n}\n\n.wj-lineargauge {\n  height: 1.2em;\n}\n\n/* ColorPicker */\n\n.wj-colorpicker {\n  width: 420px;\n  height: 200px;\n  padding: 4px;\n}\n\n.wj-colorbox {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n}\n\n/* wj-popup */\n.wj-popup {\n  background-color: white;\n  box-shadow: 0 3px 9px rgba(0,0,0,.5);\n  z-index: 1500;\n  margin: 2px 0px;\n}\n\n.wj-popup-backdrop {\n  position: fixed;\n  left: 0px;\n  right: 0px;\n  top: 0px;\n  bottom: 0px;\n  z-index: 1500;\n  background-color: rgba(0,0,0,.5);\n}\n\n/**************************************************************************\n    Glyphs\n*/\n\n.wj-glyph-up {\n  position: relative;\n  display: inline-block;\n  border-right: .4em solid transparent;\n  border-bottom: .5em solid;\n  border-left: .4em solid transparent;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-down {\n  position: relative;\n  display: inline-block;\n  border-top: .5em solid;\n  border-right: .4em solid transparent;\n  border-left: .4em solid transparent;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-left,\n.wj-glyph-step-backward {\n  position: relative;\n  display: inline-block;\n  border-top: .4em solid transparent;\n  border-right: .5em solid;\n  border-bottom: .4em solid transparent;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-step-backward {\n  transform: translateX(.12em);\n}\n\n.wj-glyph-step-backward:after {\n  position: absolute;\n  border-left: .2em solid;\n  height: .75em;\n  transform: translate(-100%,-50%);\n  content: \"\";\n}\n\n.wj-glyph-right,\n.wj-glyph-step-forward {\n  position: relative;\n  display: inline-block;\n  border-top: .4em solid transparent;\n  border-bottom: .4em solid transparent;\n  border-left: .5em solid;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-step-forward:after {\n  position: absolute;\n  border-left: .2em solid;\n  height: .75em;\n  transform: translateY(-50%);\n  content: \"\";\n}\n\n.wj-glyph-down-left {\n  position: relative;\n  display: inline-block;\n  border-top: .65em solid transparent;\n  border-left: .65em solid;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-down-right {\n  position: relative;\n  display: inline-block;\n  border-bottom: .65em solid;\n  border-left: .65em solid transparent;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-up-left {\n  position: relative;\n  display: inline-block;\n  border-bottom: .65em solid transparent;\n  border-left: .65em solid;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-up-right {\n  position: relative;\n  display: inline-block;\n  border-top: .65em solid;\n  border-left: .65em solid transparent;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-circle {\n  position: relative;\n  display: inline-block;\n  border: .25em solid;\n  border-radius: 1em;\n  transform: translateY(-.1em);\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-square {\n  position: relative;\n  display: inline-block;\n  border: .25em solid;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-diamond {\n  position: relative;\n  display: inline-block;\n  border: .25em solid;\n  transform: rotate(45deg);\n  transform-origin: 50% 50%;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-check {\n  position: relative;\n  display: inline-block;\n  width: .75em;\n  height: .75em;\n  border-right: .3em solid;\n  border-bottom: .22em solid;\n  transform: rotate(35deg) scaleX(.5);\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-filter {\n  position: relative;\n  box-sizing: border-box;\n  display: inline-block;\n  top: -.1em;\n  width: .5em;\n  border-top: .5em solid;\n  border-right: .4em solid transparent;\n  border-left: .4em solid transparent;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-filter:after {\n  position: absolute;\n  box-sizing: border-box;\n  border-left: .2em solid;\n  height: .4em;\n  transform: translateX(-50%);\n  top: -.2em;\n  content: \"\";\n}\n\n[dir=\"rtl\"] .wj-glyph-filter:after {\n  transform: translateX(50%);\n}\n\n.wj-glyph-plus,\n.wj-glyph-minus {\n  position: relative;\n  box-sizing: border-box;\n  display: inline-block;\n  border-top: .25em solid;\n  width: .9em;\n  top: -.2em;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-plus:after {\n  position: absolute;\n  box-sizing: border-box;\n  border-left: .25em solid;\n  width: .25em;\n  height: .85em;\n  left: .32em;\n  top: -.55em;\n  content: \"\";\n}\n\n.wj-glyph-file {\n  position: relative;\n  display: inline-block;\n  border-left: .7em solid;\n  height: .85em;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-file:after {\n  position: absolute;\n  transform: translateX(-100%);\n  border-top: .3em solid transparent;\n  border-left: .3em solid white;\n  content: \"\";\n}\n\n.wj-glyph-calendar {\n  position: relative;\n  display: inline-block;\n  top: .2em;\n  width: 1em;\n  height: 1em;\n  border: .1em solid;\n  border-top: .3em solid;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-calendar:after {\n  position: absolute;\n  font-size: 50%;\n  top: -.15em;\n  left: .4em;\n  content: '1';\n}\n\n.wj-glyph-clock {\n  position: relative;\n  display: inline-block;\n  top: .2em;\n  width: 1em;\n  height: 1em;\n  border: .13em solid;\n  border-radius: 50%;\n  opacity: 0.75;\n  cursor: pointer;\n}\n\n.wj-glyph-clock:after {\n  position: absolute;\n  border-left: .1em solid;\n  border-bottom: .1em solid;\n  width: .3em;\n  height: .4em;\n  top: .05em;\n  left: .32em;\n  content: \"\";\n}\n\n/**************************************************************************\n    wijmo.grid.sheet module\n*/\n.wj-flexsheet .wj-content {\n  outline: none;\n  border-color: #ccc;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0;\n}\n\n.wj-flexsheet-formula-list {\n  margin: 0;\n  padding: 0;\n  background: #fff;\n  border: 1px solid rgba(0,0,0,.2);\n  font-family: arial,sans-serif;\n  font-size: 12px;\n  line-height: 22px;\n  position: absolute;\n  width: 300px;\n  z-index: 2001;\n  -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.2);\n  -moz-box-shadow: 0 2px 4px rgba(0,0,0,.2);\n  box-shadow: 0 2px 4px rgba(0,0,0,.2);\n}\n\n.wj-flexsheet-formula-name {\n  color: #222;\n  font-size: 13px;\n  font-family: inconsolata,monospace,arial,sans,sans-serif;\n  margin: -2px 0;\n}\n\n.wj-flexsheet-formula-description {\n  color: #666;\n  display: block;\n  font-size: 11px;\n  margin: -2px 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.wj-state-selected .wj-flexsheet-formula-description {\n  color: #fff;\n}\n\n/* Hides filter icons in column headers */\n.wj-flexsheet div[wj-filter] {\n  display: none;\n}\n\ndiv[wj-part='tab-holder'] {\n  background: #b8b8b8;\n}\n\nspan.wj-sheet-icon {\n  margin: 0px 14px;\n}\n\ndiv.wj-sheet-page {\n  padding-top: 1px;\n}\n\ndiv.wj-sheet-page > button {\n  padding: 0px;\n  padding-top: 1px;\n  border-radius: 0;\n  border: 0;\n  background-color: #e4e5e8;\n  color: #727275;\n}\n\ndiv.wj-sheet-page > button:hover {\n  background-color: #dee0e3;\n}\n\n.wj-sheet-tab ul {\n  display: inline-block;\n  margin: 0px;\n  padding: 0px;\n  float: left;\n}\n\n.wj-sheet-tab ul li {\n  float: left;\n  display: block;\n  padding-right: 20px;\n  padding-left: 20px;\n  cursor: pointer;\n  margin-top: 1px;\n  border-left: 1px solid #b8b8b8;\n  min-height: 20px;\n  background-color: #d2d3d8;\n  text-align: center;\n  padding-top: 2px;\n  font-size: 11px;\n  color: #727275;\n}\n\n.wj-sheet-tab ul li.active {\n  border-top-color: transparent;\n  background-color: white;\n  cursor: default;\n  height: 100%;\n  margin-top: 1px;\n  border-left: 1px solid #b8b8b8;\n  font-weight: bold;\n}\n\n.wj-sheet-tab ul li.hidden {\n  display: none;\n}\n\n.wj-sheet-tab ul li:not(.active):hover,\n.wj-sheet-tab ul li:not(.hidden):hover {\n  background-color: #aabcd6;\n  color: #fff;\n  cursor: pointer;\n}\n\n.wj-sheet-tab ul li.wj-new-sheet:hover {\n  background-color: #0085c7;\n}\n\n.wj-new-sheet {\n  padding: 0;\n  width: 32px;\n  height: 20px;\n  font-size: 11px;\n  text-align: center;\n  background-color: #668eb9;\n  color: #fff;\n}\n\n.wj-new-sheet .wj-sheet-icon {\n  color: #727275;\n  margin-top: 5px;\n}\n\ndiv.wj-sheet > div {\n  display: block;\n  float: left;\n}\n\n.wj-flexsheet {\n  background-color: #a9a9a9;\n  width: 100%;\n  height: 100%;\n}\n\n.wj-context-menu {\n  background-color: #fff;\n  border: thin solid #808080;\n  cursor: default;\n}\n\n.wj-context-menu-item {\n  padding: 3px 10px;\n}\n\n.wj-context-menu-item:hover {\n  background-color: #0085c7;\n  color: #fff;\n}\n\n.wj-header-row {\n  background-color: #4800ff !important;\n  color: #ff6a00 !important;\n}\n\n/**************************************************************************\n    wijmo.olap module\n*/\n\n/* PivotPanel */\n.wj-pivotpanel {\n  position: relative;\n  padding: 3px 6px;\n  overflow: auto;\n  min-height: 25em;\n}\n.wj-pivotpanel a {\n  float:right;\n  margin: 6px;\n}\n.wj-pivotpanel table {\n  table-layout: fixed;\n  width: 100%;\n}\n.wj-pivotpanel div {\n  width: 100%;\n}\n.wj-pivotpanel tr,\n.wj-pivotpanel td {\n  border: 1px none #e0e0e0;\n  padding: 3px;\n}\n.wj-pivotpanel label {\n  font-weight: bold;\n  margin: 0;\n}\n.wj-pivotpanel .wj-glyph {\n  opacity: .5;\n}\n.wj-pivotpanel .wj-listbox {\n  flex-grow: 1;\n  border: none;\n  border-radius: 0;\n  min-height: 8em;\n  max-height: 20em;\n}\n.wj-pivotpanel table .wj-listbox {\n  min-height: 5em;\n  height: 5em;\n}\n.wj-pivotpanel .wj-listbox .wj-listbox-item.wj-state-selected {\n  background-color: transparent;\n  color: inherit;\n}\n.wj-pivotpanel .wj-marker {\n  position: absolute;\n  background-color: #0085c7;\n  opacity: 0.5;\n  pointer-events: none;\n}\n.wj-pivotpanel .wj-listbox .wj-listbox-item .wj-glyph-filter {\n  cursor: default;\n  opacity: 0.5;\n}\n.wj-pivotpanel .wj-listbox .wj-listbox-item .wj-aggregate {\n  font-size: 80%;\n  opacity: 0.5;\n}\n\n/* _ListContextMenu */\n.context-menu {\n  font-size: 90%;\n  padding: 6px;\n}\n.menu-icon {\n  display: inline-block;\n  width: 1em;\n  margin-right: 6px;\n  opacity: .75;\n  color: #0000C0;\n}\n.menu-icon.menu-icon-remove {\n  color: #800000;\n  font-weight: bold;\n}\n\n/* PivotFieldEditor */\n.wj-pivotfieldeditor {\n  min-width: 400px;\n}\n.wj-pivotfieldeditor tr.wj-separator {\n  border-top: 10px solid transparent;\n}\n.wj-pivotfieldeditor td:first-child {\n  text-align: right;\n}\n\n/* PivotFilterEditor */\n.wj-pivotfiltereditor {\n  padding: 10px;\n  min-width: 230px;\n}\n.wj-pivotfiltereditor .wj-control {\n  margin-bottom: 6px;\n  width: 100%;\n}\n.wj-pivotfiltereditor .wj-listbox .wj-listbox-item label {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n/* PivotGrid */\n.wj-pivotgrid .wj-colheaders .wj-cell.wj-header {\n  text-align: center;\n}\n.wj-pivotgrid .wj-cell.wj-aggregate {\n  font-weight: bold;\n}\n.wj-pivotgrid .wj-aggregate.wj-cell:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected) {\n  background-color: rgba(0,133,199,0.15); /* slightly highlight scrollable totals cells */\n}\n\n/* PivotChart */\n.wj-pivotchart {\n  position: relative;\n}\n.wj-pivotchart .wj-dropdown {\n  position: absolute;\n  margin-right: 15px;\n}\n\n/* dialogs */\n.wj-detaildialog .wj-flexgrid {\n  max-width: 800px;\n  max-height: 400px;\n}\n.wj-dialog-header {\n  background: rgba(0,0,0,0.05);\n  font-weight: bold;\n  font-size: 120%;\n  padding: 1em;\n}\n.wj-dialog-footer {\n  text-align: right;\n  margin-top: 1em;\n}\n\n";
//# sourceMappingURL=wijmo.css.js.map