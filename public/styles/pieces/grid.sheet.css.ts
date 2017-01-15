export default `/**************************************************************************
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
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-family: arial, sans-serif;
  font-size: 12px;
  line-height: 22px;
  position: absolute;
  width: 300px;
  z-index: 2001;
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.wj-flexsheet-formula-name {
  color: #222;
  font-size: 13px;
  font-family: inconsolata, monospace, arial, sans, sans-serif;
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
`