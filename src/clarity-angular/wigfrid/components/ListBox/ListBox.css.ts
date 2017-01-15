export default `/* Primary wj control style - applies to all controls */
.wj-content {
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.2);
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
/* ListBox Styles */
.wj-listbox {
  overflow: auto;
  cursor: default;
}
.wj-listbox .wj-listbox-item label {
  font-weight: normal;
  margin: 0px;
}
.wj-listbox-item {
  padding: 3px 10px;
}
.wj-listbox-item.wj-separator {
  height: 1px;
  margin: 3px 0px;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0.1);
}
.wj-listbox-item:not(.wj-state-selected):not(.wj-state-disabled):not(.wj-separator):hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.wj-listbox-item.wj-state-selected input[type=checkbox]:focus {
  outline: none;
}
.wj-listbox-item.wj-state-selected .wj-control {
  background: #fff;
  color: #444;
}
.wj-dropdown .wj-listbox {
  padding: 0;
  white-space: nowrap;
}
`