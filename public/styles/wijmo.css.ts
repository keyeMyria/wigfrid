export default `/* Wijmo Control */

/* Primary wj control style - applies to all controls */
.wj-content {
  display: inline-block;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 4px;
  background-color: #fff;
  outline: none;
  box-sizing: border-box;
}

.wj-control {
  outline: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Define control header */
.wj-header {
  background-color: #EAEAEA;
  color: #444;
  font-weight: bold;
}

/* Selected state colors */
.wj-state-selected {
  background-color: #0085c7;
  color: #fff;
}

/* Selected state colors */
.wj-state-multi-selected {
  background-color: #80ADBF;
  color: #fff;
}

/* Disabled elements (via CSS) */
.wj-state-disabled {
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
}

/* Disabled controls (via attribute) */
.wj-control[disabled] {
  opacity: .5;
  background-color: #eeeeee;
  pointer-events: none;
}

/* Button Styles */

/* Basic style for all button types */
button,
html input[type=button],
input[type=reset],
input[type=submit] {
  -webkit-appearance: button;
  overflow: visible;
  border-radius: inherit;
  cursor: pointer;
}

/* Global base button style */
.wj-btn {
  /*display: block;*/
  padding: 0px 10px;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
}

/* Additional styling for default buttons */
.wj-btn-default {
  border: 1px solid rgba(0,0,0,0.2);
  background-color: transparent;
  color: inherit;
  /*font-weight: bold;*/
}

/* Hover on 'default' button */
.wj-btn-default:hover {
  background-color: rgba(0,0,0,0.1);
}

.wj-btn-default:focus {
  background-color: rgba(0,0,0,0.1);
}

/* Link Buttons in Wijmo controls*/
.wj-control a[wj-part^="btn-"] {
  background: #e6e6e6;
  padding: 6px 20px;
  color: #444;
  display: inline-block;
  margin-top: 5px;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
}

.wj-control a[wj-part^="btn-"]:hover {
  text-decoration: none;
  background: #e0e0e0;
}

/* Button Group Styles */

/* Define button group based on bootstrap */
.wj-btn-group,
.wj-btn-group-vertical {
  position: relative;
  display: inline-block;
  border-radius: 4px;
  vertical-align: top;
}

/* Float buttons in group */
.wj-btn-group > .wj-btn,
.wj-btn-group-vertical > .wj-btn {
  position: relative;
  float: left;
}

/* Remove inner button border radius */
.wj-btn-group > .wj-btn:not(:first-child):not(:last-child) {
  border-radius: 0;
}

.wj-btn-group > .wj-btn:first-child {
  margin-left: 0;
}

/* Remove first button right-side border radius and margin */
.wj-btn-group > .wj-btn:first-child:not(:last-child) {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

/* Remove last button left-side border radius and margin */
.wj-btn-group > .wj-btn:last-child:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Remove margin from inner buttons to prevent double border */
.wj-btn-group .wj-btn + .wj-btn,
.wj-btn-group .wj-btn + .wj-btn-group,
.wj-btn-group .wj-btn-group + .wj-btn,
.wj-btn-group .wj-btn-group + .wj-btn-group {
  margin-left: -1px;
}

/* ListBox Styles */

.wj-listbox {
  overflow: auto;
  cursor: default;
}

.wj-listbox-item {
  box-sizing: border-box;
  padding: 3px 10px;
}

.wj-listbox-item.wj-separator {
  height: 1px;
  margin: 3px 0px;
  padding: 0px;
  background-color: rgba(0,0,0,.1);
}

.wj-listbox-item:not(.wj-state-selected):not(.wj-state-disabled):not(.wj-separator):hover {
  background-color: rgba(0,0,0,.05);
}

.wj-listbox-item.wj-state-selected input[type=checkbox]:focus {
  outline: none;
}

.wj-listbox .wj-listbox-item label {
  font-weight: normal;
  margin: 0px;
}

.wj-dropdown .wj-listbox {
  padding: 0;
  white-space: nowrap;
}

.wj-listbox-item.wj-state-selected .wj-control {
  background: #fff;
  color: #444;
}

/* Dropdown Styles */

.wj-dropdown {
  vertical-align: middle;
}

.wj-dropdown .wj-template,
.wj-dropdown .wj-dropdown-menu {
  border-radius: inherit;
}

.wj-template {
  height: 100%;
}

.wj-dropdown-panel {
  outline: none;
  box-shadow: 0 6px 13px rgba(0,0,0,0.2);
  /* Boostrap modals have zIndex 1050, so go higher */
  z-index: 1500 !important;
}


/* Input Group Styles */

/* Remove spinner buttons from InputNumber control */
.wj-inputnumber input[type=number]::-webkit-inner-spin-button,
.wj-inputnumber input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Remove clear icon from IE textbox */
input::-ms-clear {
  display: none;
}

/* Remove default browser focus outlines */
button,
input,
optgroup,
select,
textarea {
  outline: 0;
}

.wj-inputnumber {
  vertical-align: middle;
}

.wj-input-group-btn,
.wj-input-group .wj-form-control {
  box-sizing: border-box;
  display: table-cell;
}

.wj-input {
  height: 100%;
  overflow: hidden;
}

/* Define input group based on bootstrap */
.wj-input-group {
  position: relative;
  display: table;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 2em;
  border-collapse: separate;
  border-radius: 4px;
  background: inherit;
}

/* Style for text input box in group */
.wj-input-group .wj-form-control {
  position: relative;
  float: left;
  padding: 4px 8px;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0;
  background-color: transparent;
  color: inherit;
}

/* Text alignment for numeric input types */
.wj-input-group .wj-form-control.wj-numeric {
  text-align: right;
}

/* Adjust float and width for Menu control */
.wj-input-group div[wj-part='header'] {
  float: none;
  width: auto;
  vertical-align: middle;
}

/* Remove border from outside of buttons - outer border set at wj-content level */
.wj-input-group-btn > .wj-btn {
  border-width: 0;
}

/* Remove first button right-side border radius */
.wj-input-group-btn:first-child > .wj-btn {
  border-right-width: 1px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

/* Remove last button left-side border radius */
.wj-input-group-btn:last-child > .wj-btn {
  border-left-width: 1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* RTL borders */

/* Remove first button left-side border radius */
[dir="rtl"] .wj-input-group-btn:first-child > .wj-btn {
  border-left-width: 1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  /* Unset LTR border styles */
  border-right-width: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}

/* Remove last button right-side border radius */
[dir="rtl"] .wj-input-group-btn:last-child > .wj-btn {
  border-right-width: 1px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  /* Unset LTR border styles */
  border-left-width: 0;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

/* Style for buttons in group */
.wj-input-group-btn {
  position: relative;
  width: 26px;
  height: 100%;
  vertical-align: top;
  white-space: nowrap;
}

/* Pager Styles */

.wj-pager {
  vertical-align: middle;
  margin-left: 5px;
  margin-right: 5px;
}

.wj-pager .wj-input-group-btn > .wj-btn {
  min-width: 40px;
}

.wj-pager .wj-btn[disabled] span {
  opacity: .5;
  cursor: default;
}

.wj-pager .wj-form-control {
  text-align: center;
  border-left: 1px solid rgba(0,0,0,0.2);
  border-right: 1px solid rgba(0,0,0,0.2);
}

/* Calendar Date Input Styles */

.wj-calendar-outer {
  display: block;
  padding: 10px;
  width: 100%;
  height: auto;
  cursor: default;
}

.wj-calendar td {
  text-align: center;
}

/* Remove background, border when in dropdown */
.wj-dropdown-panel .wj-calendar-outer {
  border: 0;
  background: none;
}

.wj-day-today {
  font-weight: bold;
}

.wj-day-othermonth {
  opacity: 0.5;
}


/* -- Date selection -- */

/* Added padding to bottom of date selection options */
.wj-calendar-header {
  display: block;
  padding: 0 0 15px 0;
  width: 100%;
}

/* Float month selection to the left */
.wj-month-select {
  display: inline-block;
  float: left;
  cursor: pointer;
}

/* Float calendar button group to the right */
.wj-calendar-header .wj-btn-group {
  display: inline-block;
  float: right;
  margin-bottom: 7px;
}

/* Size button group in calendar header */
.wj-calendar-header .wj-btn-group .wj-btn {
  padding: 0 8px 1px 8px;
  min-height: 25px;
}

/* -- Days of the month -- */

.wj-calendar-month {
  box-sizing: border-box;
  width: 100%;
  border-collapse: collapse;
  font: inherit;
}

.wj-calendar-month td {
  width: 14.29%;
  padding: 5px 0;
  border: none;
}

/* Slightly reduce size of text in calendar header */
.wj-calendar-month .wj-header {
  font-size: 90%;
}

/* -- Months of the year -- */

.wj-calendar-year {
  box-sizing: border-box;
  width: 100%;
  border-collapse: collapse;
  font: inherit;
}

.wj-calendar-year td {
  width: 25%;
  padding: 8px;
  border: none;
}

/* -- FlexGrid -- */

.wj-flexgrid {
  width: 100%;
  overflow: hidden;
}

.wj-flexgrid .wj-cell {
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 3px;
  border-right: 1px solid #c6c6c6;
  border-bottom: 1px solid #c6c6c6;
  outline: none;
}

/* Text color for nested controls in selected rows */
.wj-flexgrid .wj-cell.wj-state-selected .wj-control,
.wj-cell.wj-state-multi-selected .wj-control {
  color: #444;
}

/* Selected headers */
.wj-flexgrid .wj-header.wj-state-multi-selected {
  background-color: #e4e4e4;
  color: #444;
  font-weight: bold;
}

/* Selected column headers */
.wj-flexgrid .wj-colheaders .wj-header.wj-state-multi-selected {
  border-bottom: 2px solid #0085c7;
}

/* Selected row headers */
.wj-flexgrid .wj-rowheaders .wj-header.wj-state-multi-selected {
  border-right: 2px solid #0085c7;
}

/* Sticky headers */
.wj-flexgrid .wj-state-sticky .wj-header {
  opacity: 0.75;
}

/* Selection Marquee */
.wj-flexgrid .wj-marquee {
  position: absolute;
  box-sizing: border-box;
  border: 2px solid #0085c7;
}

/* FlexSheet Marquee */
.wj-flexsheet .wj-marquee {
  position: absolute;
  box-sizing: border-box;
  border: 2px solid #0085c7;
}

.wj-flexsheet .wj-state-multi-selected {
  background: #e6e6e6;
  color: #222;
}

/* Darken borders to make visible */
.wj-flexsheet .wj-cell.wj-state-multi-selected {
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
}


/* Cells with word-wrapping */
.wj-flexgrid .wj-cell.wj-wrap {
  white-space: normal;
  text-overflow: clip;
}

/* Default grid cell color */
.wj-flexgrid .wj-cell:not(.wj-header):not(.wj-group):not(.wj-alt):not(.wj-state-selected):not(.wj-state-multi-selected) {
  background: #fff;
}

/* Alternate grid cell color */
.wj-flexgrid .wj-alt:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected) {
  background: #f9f9f9;
}

/* Group row background */
.wj-flexgrid .wj-group:not(.wj-state-selected):not(.wj-state-multi-selected) {
  background-color: #dddddd;
}

/* Frozen area boundaries */
.wj-flexgrid .wj-cell.wj-frozen-row {
  border-bottom: 1px solid #666;
}
.wj-flexgrid .wj-cell.wj-frozen-col {
  border-right: 1px solid #666;
}

/* Grid editor */
.wj-flexgrid .wj-grid-editor {
  box-sizing: border-box;
  padding: 3px;
  border: none;
  width: 100%;
  margin: 0px;
}

/* Grid drag/resize row/col marker */
.wj-flexgrid .wj-marker {
  position: absolute;
  background-color: #0085c7;
  opacity: 0.5;
  pointer-events: none;
}

/* Switch cell borders in RTL grids */
[dir="rtl"] .wj-cell {
  border-left: 1px solid #c6c6c6;
  border-right: none;
}

/* Switch frozen borders in RTL grids */
[dir="rtl"] .wj-frozen-col {
  border-left: 1px solid #666;
  border-right: none;
}

/* FlexGrid Filter extension */

.wj-filter-on .wj-glyph-filter {
  opacity: 0.85;
}

.wj-filter-off .wj-glyph-filter {
  opacity: 0.25;
}

.wj-columnfiltereditor {
  padding: 10px;
  min-width: 230px;
  max-width: 50%;
}

.wj-columnfiltereditor .wj-control {
  margin-bottom: 6px;
  width: 100%;
}

.wj-columnfiltereditor .wj-listbox .wj-listbox-item label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* FlexGrid GroupPanel extension */
.wj-grouppanel {
  background-color: #f4f4f4;
  padding: 15px;
}

.wj-grouppanel .wj-cell {
  margin-right: 10px;
  padding: 6px 16px;
  border: 1px solid #e6e6e6;
  cursor: pointer;
}

.wj-grouppanel .wj-cell:hover {
  background: #e0e0e0;
}

/* WJ Tooltip */

.wj-tooltip {
  position: absolute;
  z-index: 1000;
  top: 0px;
  left: 0px;
  pointer-events: none;
  max-width: 400px;
  padding: 6px;
  background-color: #ffffe5;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 6px;
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  box-sizing: border-box;
}

/* Chart Styles */

.wj-flexchart {
  height: 400px;
  padding: 15px 10px;
  margin-bottom: 12px;
  background-color: white;
  border: 1px solid #e4e4e4;
}

.wj-flexchart .wj-title {
}

.wj-flexchart .wj-header {
}

.wj-flexchart .wj-header .wj-title {
  font-size: 16pt;
  fill: #666;
  font-weight: normal;
}

.wj-flexchart .wj-footer {
}

.wj-flexchart .wj-footer .wj-title {
  fill: #666;
  font-weight: normal;
}

.wj-flexchart .wj-plot-area {
}

.wj-flexchart .wj-legend .wj-label {
  fill: #666;
}

.wj-flexchart .wj-data-label {
  fill: #666;
}

.wj-flexchart .wj-data-label-border {
  stroke: rgba(128,128,128,0.5);
}

.wj-flexchart .wj-data-label-line {
  stroke: rgba(128,128,128,1);
}

.wj-flexchart .wj-axis-x .wj-title,
.wj-flexchart .wj-axis-y .wj-title {
  font-style: italic;
}

/* style for selected items on the chart */
.wj-flexchart .wj-state-selected {
  stroke-width: 3px;
  stroke-dasharray: 6;
  stroke-linecap: square;
}

/* style for selected items on the chart - smaller screens */
@media(max-width: 1025px) {
  .wj-flexchart .wj-state-selected {
    stroke-width: 2px;
    stroke-dasharray: 4;
  }
}

@media(max-width: 767px) {
  wj-flexchart .wj-state-selected {
    stroke-width: 1px;
    stroke-dasharray: 3;
  }
}

/* X Axis  */

.wj-flexchart .wj-axis-x {
}

.wj-flexchart .wj-axis-x .wj-label {
  fill: #666;
}

/* bottom line */
.wj-flexchart .wj-axis-x .wj-line {
  stroke: #aaa;
  stroke-width: 1px;
}

/* bottom tick */
.wj-flexchart .wj-axis-x .wj-tick {
  stroke: #aaa;
  stroke-width: 1px;
}

/* none */
.wj-flexchart .wj-axis-x .wj-gridline {
  stroke: black;
  stroke-width: 0.25px;
}

/* minor tick */
.wj-flexchart .wj-axis-x .wj-tick-minor {
  stroke: #aaa;
  stroke-width: 1px;
}

/* minor grid line */
.wj-flexchart .wj-axis-x .wj-gridline-minor {
  stroke: black;
  stroke-dasharray: 6;
  stroke-width: 0.25px;
}

/* Y Axis */

.wj-flexchart .wj-axis-y {
}

/* labels down y axis */
.wj-flexchart .wj-axis-y .wj-label {
  fill: #666;
}

.wj-flexchart .wj-axis-y .wj-tick {
  stroke: #aaa;
  stroke-width: 1px;
}

/* bg horizontal lines */
.wj-flexchart .wj-axis-y .wj-gridline {
  stroke: #777;
  stroke-width: 0.25px;
}

/* minor tick */
.wj-flexchart .wj-axis-y .wj-tick-minor {
  stroke: #aaa;
  stroke-width: 1px;
}

/* minor grid line */
.wj-flexchart .wj-axis-y .wj-gridline-minor {
  stroke: black;
  stroke-dasharray: 6;
  stroke-width: 0.25px;
}


/****  Range Slider Css *****/

.wj-flexchart .wj-chart-rangeslider {
  position: absolute;
  touch-action: none;
  -ms-touch-action: none;
}

.wj-flexchart .wj-chart-rangeslider button {
  position: absolute;
  text-align: center;
  vertical-align: middle;
  padding: 0px;
  line-height: 16px;
  border-radius: 2px;
}

.wj-flexchart .wj-chart-hrangeslider button {
  width: 16px;
  height: 100%;
}

.wj-flexchart .wj-chart-vrangeslider button {
  height: 16px;
  width: 100%;
}

.wj-flexchart .wj-chart-rangeslider .wj-rangeslider-content {
  background-color: #eaeaea;
  height: 100%;
  position: relative;
}

.wj-flexchart .wj-chart-rangeslider .wj-rangeslider-rangehandle {
  position: absolute;
  text-align: center;
  vertical-align: middle;
  background-color: #BDBDBD;
  height: 100%;
  width: 100%;
}

.wj-flexchart .wj-chart-rangeslider .wj-rangeslider-minhandle,
.wj-flexchart .wj-chart-rangeslider .wj-rangeslider-maxhandle {
  border: 1px solid Gray;
  display: block;
  position: absolute;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.wj-flexchart .wj-chart-hrangeslider .wj-rangeslider-minhandle,
.wj-flexchart .wj-chart-hrangeslider .wj-rangeslider-maxhandle {
  background-color: #BDBDBD;
  cursor: ew-resize;
  height: 22px;
  margin-top: -2px;
  width: 14px;
}

.wj-flexchart .wj-chart-vrangeslider .wj-rangeslider-minhandle,
.wj-flexchart .wj-chart-vrangeslider .wj-rangeslider-maxhandle {
  background-color: #BDBDBD;
  cursor: ns-resize;
  width: 22px;
  margin-left: -2px;
  height: 14px;
}

.wj-flexchart .wj-chart-rangeslider .wj-rangeslider-handle-active {
  z-index: 2;
}

.wj-flexchart .wj-chart-hrangeslider .wj-rangeslider-decbtn {
  left: 0px;
}

.wj-flexchart .wj-chart-hrangeslider .wj-rangeslider-incbtn {
  right: 0px;
}

.wj-flexchart .wj-chart-vrangeslider .wj-rangeslider-decbtn {
  bottom: 0px;
}

.wj-flexchart .wj-chart-vrangeslider .wj-rangeslider-incbtn {
  top: 0px;
}

.wj-flexchart .wj-chart-rangeslider .wj-glyph-left {
  border-top: 5px solid transparent;
  border-right: 4px solid;
  border-bottom: 4px solid transparent;
  margin-right: 2px;
}

.wj-flexchart .wj-chart-rangeslider .wj-glyph-right {
  border-bottom: 5px solid transparent;
  border-left: 4px solid;
  border-top: 4px solid transparent;
  margin-left: 2px;
}

.wj-flexchart .wj-chart-rangeslider .wj-glyph-down {
  border-top: 5px solid;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  margin-bottom: 3px;
}

.wj-flexchart .wj-chart-rangeslider .wj-glyph-up {
  border-right: 4px solid transparent;
  border-bottom: 5px solid;
  border-left: 4px solid transparent;
  margin-bottom: 4px;
}

/****  Range Selector Css *****/
.wj-flexchart .wj-chart-rangeselector-container {
  position: relative;
}

.wj-flexchart .wj-chart-rangeselector-container .wj-chart-rangeslider,
.wj-flexchart .wj-chart-rangeselector-container .wj-rangeslider-content {
  background-color: transparent;
  border-color: transparent;
}

.wj-flexchart .wj-chart-rangeselector-container .wj-rangeslider-rangehandle {
  opacity: 0.3;
}

.wj-flexchart .wj-chart-rangeselector-container .wj-rangeslider-minhandle,
.wj-flexchart .wj-chart-rangeselector-container .wj-rangeslider-maxhandle {
  background-color: transparent;
  opacity: 0.6;
  border: 2px solid Gray;
  border-radius: 0.5em;
}

.wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-minhandle,
.wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-maxhandle {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid hsla(0,0%,50.2%,0.75);
  top: 0;
  bottom: 0;
  margin: auto;
  color: hsl(0,0%,50.2%);
  background: #d3d3d3;
  opacity: 1;
}

.wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-minhandle:after,
.wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-maxhandle:after {
  content: "\2551";
  text-align: center;
  width: 100%;
  display: inline-block;
  position: absolute;
  margin: 0;
  top: 50%;
  transform: translateY(-55%);
  -webkit-transform: translateY(-55%);
  opacity: 0.75;
  font-size: 10px;
}

.wj-flexchart .wj-chart-rangeselector-container .wj-chart-vrangeslider .wj-rangeslider-minhandle,
.wj-flexchart .wj-chart-rangeselector-container .wj-chart-vrangeslider .wj-rangeslider-maxhandle {
  height: 20px;
  width: 20px;
  left: 50%;
  border-radius: 50%;
  border: 1px solid hsla(0,0%,50.2%,0.75);
  top: 0;
  bottom: 0;
  color: hsl(0,0%,50.2%);
  background: #d3d3d3;
  opacity: 1;
}

.wj-flexchart .wj-chart-rangeselector-container .wj-chart-vrangeslider .wj-rangeslider-minhandle:after,
.wj-flexchart .wj-chart-rangeselector-container .wj-chart-vrangeslider .wj-rangeslider-maxhandle:after {
  content: "\2550";
  text-align: center;
  height: 100%;
  display: inline-block;
  position: absolute;
  margin: 0;
  left: 50%;
  transform: translate(-50%,15%);
  -webkit-transform: translate(-50%,15%);
  opacity: 0.75;
  font-size: 12px;
}

.wj-flexchart .wj-chart-rangeselector-container .wj-chart-rangeslider .wj-rangeslider-minhandle.wj-rangeslider-handle-active,
.wj-flexchart .wj-chart-rangeselector-container .wj-chart-rangeslider .wj-rangeslider-maxhandle.wj-rangeslider-handle-active {
  background-color: rgba(136,189,230,0.7);
}

.wj-flexchart .wj-rangeselector .wj-scroller-center {
  background: rgba(128,128,128,0.1);
  position: absolute;
  display: block;
  touch-action: none;
}

/* Chart Gestures Css */
.wj-flexchart .wj-zoom {
  visibility: hidden;
  position: relative;
}

.wj-flexchart .wj-zoom-overlay {
  background: rgba(128,128,128,0.2);
  position: absolute;
  display: block;
  touch-action: none;
}

.wj-flexchart.wj-panable {
  cursor: pointer;
}

.wj-flexchart .wj-block-other-interaction {
  display: none;
}

/* chart marker */
.wj-flexchart-touch-disabled {
  -ms-touch-action: none;
}

.wj-flexchart .wj-chart-linemarker {
  background: rgba(128,128,128,0.3);
  position: absolute;
  padding: 2px;
}

.wj-flexchart .wj-chart-linemarker-container {
  position: relative;
}

.wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-hline {
  height: 2px;
  background: rgba(128,128,128,1);
  touch-action: none;
  position: absolute;
}

.wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-vline {
  width: 2px;
  background: rgba(128,128,128,1);
  touch-action: none;
  position: absolute;
}

.wj-flexchart.wj-chart-linemarker-draggable,
.wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-draggable {
  -khtml-user-drag: element;
  cursor: move;
}

/* Gauges */

.wj-gauge:focus {
  outline: none;
}

.wj-gauge .wj-face path {
  fill: #f5f5f5;
  stroke: #cbcbcb;
  stroke-width: 1px;
  stroke-linejoin: round;
}

.wj-gauge .wj-pointer {
  fill: #0085c7;
}

.wj-gauge .wj-min,
.wj-gauge .wj-max {
  font-size: 60%;
  opacity: .5;
}

.wj-radialgauge .wj-value {
  font-size: 150%;
}

.wj-lineargauge {
  height: 1.2em;
}

/* ColorPicker */

.wj-colorpicker {
  width: 420px;
  height: 200px;
  padding: 4px;
}

.wj-colorbox {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

/* wj-popup */
.wj-popup {
  background-color: white;
  box-shadow: 0 3px 9px rgba(0,0,0,.5);
  z-index: 1500;
  margin: 2px 0px;
}

.wj-popup-backdrop {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 1500;
  background-color: rgba(0,0,0,.5);
}

/**************************************************************************
    Glyphs
*/

.wj-glyph-up {
  position: relative;
  display: inline-block;
  border-right: .4em solid transparent;
  border-bottom: .5em solid;
  border-left: .4em solid transparent;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-down {
  position: relative;
  display: inline-block;
  border-top: .5em solid;
  border-right: .4em solid transparent;
  border-left: .4em solid transparent;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-left,
.wj-glyph-step-backward {
  position: relative;
  display: inline-block;
  border-top: .4em solid transparent;
  border-right: .5em solid;
  border-bottom: .4em solid transparent;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-step-backward {
  transform: translateX(.12em);
}

.wj-glyph-step-backward:after {
  position: absolute;
  border-left: .2em solid;
  height: .75em;
  transform: translate(-100%,-50%);
  content: "";
}

.wj-glyph-right,
.wj-glyph-step-forward {
  position: relative;
  display: inline-block;
  border-top: .4em solid transparent;
  border-bottom: .4em solid transparent;
  border-left: .5em solid;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-step-forward:after {
  position: absolute;
  border-left: .2em solid;
  height: .75em;
  transform: translateY(-50%);
  content: "";
}

.wj-glyph-down-left {
  position: relative;
  display: inline-block;
  border-top: .65em solid transparent;
  border-left: .65em solid;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-down-right {
  position: relative;
  display: inline-block;
  border-bottom: .65em solid;
  border-left: .65em solid transparent;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-up-left {
  position: relative;
  display: inline-block;
  border-bottom: .65em solid transparent;
  border-left: .65em solid;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-up-right {
  position: relative;
  display: inline-block;
  border-top: .65em solid;
  border-left: .65em solid transparent;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-circle {
  position: relative;
  display: inline-block;
  border: .25em solid;
  border-radius: 1em;
  transform: translateY(-.1em);
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-square {
  position: relative;
  display: inline-block;
  border: .25em solid;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-diamond {
  position: relative;
  display: inline-block;
  border: .25em solid;
  transform: rotate(45deg);
  transform-origin: 50% 50%;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-check {
  position: relative;
  display: inline-block;
  width: .75em;
  height: .75em;
  border-right: .3em solid;
  border-bottom: .22em solid;
  transform: rotate(35deg) scaleX(.5);
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-filter {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  top: -.1em;
  width: .5em;
  border-top: .5em solid;
  border-right: .4em solid transparent;
  border-left: .4em solid transparent;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-filter:after {
  position: absolute;
  box-sizing: border-box;
  border-left: .2em solid;
  height: .4em;
  transform: translateX(-50%);
  top: -.2em;
  content: "";
}

[dir="rtl"] .wj-glyph-filter:after {
  transform: translateX(50%);
}

.wj-glyph-plus,
.wj-glyph-minus {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  border-top: .25em solid;
  width: .9em;
  top: -.2em;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-plus:after {
  position: absolute;
  box-sizing: border-box;
  border-left: .25em solid;
  width: .25em;
  height: .85em;
  left: .32em;
  top: -.55em;
  content: "";
}

.wj-glyph-file {
  position: relative;
  display: inline-block;
  border-left: .7em solid;
  height: .85em;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-file:after {
  position: absolute;
  transform: translateX(-100%);
  border-top: .3em solid transparent;
  border-left: .3em solid white;
  content: "";
}

.wj-glyph-calendar {
  position: relative;
  display: inline-block;
  top: .2em;
  width: 1em;
  height: 1em;
  border: .1em solid;
  border-top: .3em solid;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-calendar:after {
  position: absolute;
  font-size: 50%;
  top: -.15em;
  left: .4em;
  content: '1';
}

.wj-glyph-clock {
  position: relative;
  display: inline-block;
  top: .2em;
  width: 1em;
  height: 1em;
  border: .13em solid;
  border-radius: 50%;
  opacity: 0.75;
  cursor: pointer;
}

.wj-glyph-clock:after {
  position: absolute;
  border-left: .1em solid;
  border-bottom: .1em solid;
  width: .3em;
  height: .4em;
  top: .05em;
  left: .32em;
  content: "";
}

/**************************************************************************
    wijmo.grid.sheet module
*/
.wj-flexsheet .wj-content {
  outline: none;
  border-color: #ccc;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}

.wj-flexsheet-formula-list {
  margin: 0;
  padding: 0;
  background: #fff;
  border: 1px solid rgba(0,0,0,.2);
  font-family: arial,sans-serif;
  font-size: 12px;
  line-height: 22px;
  position: absolute;
  width: 300px;
  z-index: 2001;
  -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.2);
  -moz-box-shadow: 0 2px 4px rgba(0,0,0,.2);
  box-shadow: 0 2px 4px rgba(0,0,0,.2);
}

.wj-flexsheet-formula-name {
  color: #222;
  font-size: 13px;
  font-family: inconsolata,monospace,arial,sans,sans-serif;
  margin: -2px 0;
}

.wj-flexsheet-formula-description {
  color: #666;
  display: block;
  font-size: 11px;
  margin: -2px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wj-state-selected .wj-flexsheet-formula-description {
  color: #fff;
}

/* Hides filter icons in column headers */
.wj-flexsheet div[wj-filter] {
  display: none;
}

div[wj-part='tab-holder'] {
  background: #b8b8b8;
}

span.wj-sheet-icon {
  margin: 0px 14px;
}

div.wj-sheet-page {
  padding-top: 1px;
}

div.wj-sheet-page > button {
  padding: 0px;
  padding-top: 1px;
  border-radius: 0;
  border: 0;
  background-color: #e4e5e8;
  color: #727275;
}

div.wj-sheet-page > button:hover {
  background-color: #dee0e3;
}

.wj-sheet-tab ul {
  display: inline-block;
  margin: 0px;
  padding: 0px;
  float: left;
}

.wj-sheet-tab ul li {
  float: left;
  display: block;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 1px;
  border-left: 1px solid #b8b8b8;
  min-height: 20px;
  background-color: #d2d3d8;
  text-align: center;
  padding-top: 2px;
  font-size: 11px;
  color: #727275;
}

.wj-sheet-tab ul li.active {
  border-top-color: transparent;
  background-color: white;
  cursor: default;
  height: 100%;
  margin-top: 1px;
  border-left: 1px solid #b8b8b8;
  font-weight: bold;
}

.wj-sheet-tab ul li.hidden {
  display: none;
}

.wj-sheet-tab ul li:not(.active):hover,
.wj-sheet-tab ul li:not(.hidden):hover {
  background-color: #aabcd6;
  color: #fff;
  cursor: pointer;
}

.wj-sheet-tab ul li.wj-new-sheet:hover {
  background-color: #0085c7;
}

.wj-new-sheet {
  padding: 0;
  width: 32px;
  height: 20px;
  font-size: 11px;
  text-align: center;
  background-color: #668eb9;
  color: #fff;
}

.wj-new-sheet .wj-sheet-icon {
  color: #727275;
  margin-top: 5px;
}

div.wj-sheet > div {
  display: block;
  float: left;
}

.wj-flexsheet {
  background-color: #a9a9a9;
  width: 100%;
  height: 100%;
}

.wj-context-menu {
  background-color: #fff;
  border: thin solid #808080;
  cursor: default;
}

.wj-context-menu-item {
  padding: 3px 10px;
}

.wj-context-menu-item:hover {
  background-color: #0085c7;
  color: #fff;
}

.wj-header-row {
  background-color: #4800ff !important;
  color: #ff6a00 !important;
}

/**************************************************************************
    wijmo.olap module
*/

/* PivotPanel */
.wj-pivotpanel {
  position: relative;
  padding: 3px 6px;
  overflow: auto;
  min-height: 25em;
}
.wj-pivotpanel a {
  float:right;
  margin: 6px;
}
.wj-pivotpanel table {
  table-layout: fixed;
  width: 100%;
}
.wj-pivotpanel div {
  width: 100%;
}
.wj-pivotpanel tr,
.wj-pivotpanel td {
  border: 1px none #e0e0e0;
  padding: 3px;
}
.wj-pivotpanel label {
  font-weight: bold;
  margin: 0;
}
.wj-pivotpanel .wj-glyph {
  opacity: .5;
}
.wj-pivotpanel .wj-listbox {
  flex-grow: 1;
  border: none;
  border-radius: 0;
  min-height: 8em;
  max-height: 20em;
}
.wj-pivotpanel table .wj-listbox {
  min-height: 5em;
  height: 5em;
}
.wj-pivotpanel .wj-listbox .wj-listbox-item.wj-state-selected {
  background-color: transparent;
  color: inherit;
}
.wj-pivotpanel .wj-marker {
  position: absolute;
  background-color: #0085c7;
  opacity: 0.5;
  pointer-events: none;
}
.wj-pivotpanel .wj-listbox .wj-listbox-item .wj-glyph-filter {
  cursor: default;
  opacity: 0.5;
}
.wj-pivotpanel .wj-listbox .wj-listbox-item .wj-aggregate {
  font-size: 80%;
  opacity: 0.5;
}

/* _ListContextMenu */
.context-menu {
  font-size: 90%;
  padding: 6px;
}
.menu-icon {
  display: inline-block;
  width: 1em;
  margin-right: 6px;
  opacity: .75;
  color: #0000C0;
}
.menu-icon.menu-icon-remove {
  color: #800000;
  font-weight: bold;
}

/* PivotFieldEditor */
.wj-pivotfieldeditor {
  min-width: 400px;
}
.wj-pivotfieldeditor tr.wj-separator {
  border-top: 10px solid transparent;
}
.wj-pivotfieldeditor td:first-child {
  text-align: right;
}

/* PivotFilterEditor */
.wj-pivotfiltereditor {
  padding: 10px;
  min-width: 230px;
}
.wj-pivotfiltereditor .wj-control {
  margin-bottom: 6px;
  width: 100%;
}
.wj-pivotfiltereditor .wj-listbox .wj-listbox-item label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* PivotGrid */
.wj-pivotgrid .wj-colheaders .wj-cell.wj-header {
  text-align: center;
}
.wj-pivotgrid .wj-cell.wj-aggregate {
  font-weight: bold;
}
.wj-pivotgrid .wj-aggregate.wj-cell:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected) {
  background-color: rgba(0,133,199,0.15); /* slightly highlight scrollable totals cells */
}

/* PivotChart */
.wj-pivotchart {
  position: relative;
}
.wj-pivotchart .wj-dropdown {
  position: absolute;
  margin-right: 15px;
}

/* dialogs */
.wj-detaildialog .wj-flexgrid {
  max-width: 800px;
  max-height: 400px;
}
.wj-dialog-header {
  background: rgba(0,0,0,0.05);
  font-weight: bold;
  font-size: 120%;
  padding: 1em;
}
.wj-dialog-footer {
  text-align: right;
  margin-top: 1em;
}

`