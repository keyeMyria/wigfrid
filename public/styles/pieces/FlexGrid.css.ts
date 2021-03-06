export default `/* -- FlexGrid -- */
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
`