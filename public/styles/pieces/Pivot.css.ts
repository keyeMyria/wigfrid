export default `/**************************************************************************
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
  float: right;
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
  background-color: rgba(0, 133, 199, 0.15);
  /* slightly highlight scrollable totals cells */
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
  background: rgba(0, 0, 0, 0.05);
  font-weight: bold;
  font-size: 120%;
  padding: 1em;
}
.wj-dialog-footer {
  text-align: right;
  margin-top: 1em;
}
`