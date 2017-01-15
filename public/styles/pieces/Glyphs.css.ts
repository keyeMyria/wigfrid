export default `/**************************************************************************
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
  transform: translateX(0.12em);
}
.wj-glyph-step-backward:after {
  position: absolute;
  border-left: .2em solid;
  height: .75em;
  transform: translate(-100%, -50%);
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
  transform: translateY(-0.1em);
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
  transform: rotate(35deg) scaleX(0.5);
  opacity: 0.75;
  cursor: pointer;
}
.wj-glyph-filter {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  top: -0.1em;
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
  top: -0.2em;
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
  top: -0.2em;
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
  top: -0.55em;
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
  top: -0.15em;
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
`