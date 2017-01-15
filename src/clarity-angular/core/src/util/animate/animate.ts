import {asFunction} from "../asserts/asFunction";
import {asNumber} from "../asserts/asNumber";


/**
 * Calls a function on a timer with a parameter varying between zero and one.
 *
 * Use this function to create animations by modifying document properties
 * or styles on a timer.
 *
 * For example, the code below changes the opacity of an element from zero
 * to one in one second:
 * <pre>var element = document.getElementById('someElement');
 * animate(function(pct) {
     *   element.style.opacity = pct;
     * }, 1000);</pre>
 *
 * The function returns an interval ID that you can use to stop the
 * animation. This is typically done when you are starting a new animation
 * and wish to suspend other on-going animations on the same element.
 * For example, the code below keeps track of the interval ID and clears
 * if before starting a new animation:
 * <pre>var element = document.getElementById('someElement');
 * if (this._animInterval) {
     *   clearInterval(this._animInterval);
     * }
 * var self = this;
 * self._animInterval = animate(function(pct) {
     *   element.style.opacity = pct;
     *   if (pct == 1) {
     *     self._animInterval = null;
     *   }
     * }, 1000);</pre>
 *
 * @param apply Callback function that modifies the document.
 * The function takes a single parameter that represents a percentage.
 * @param duration The duration of the animation, in milliseconds.
 * @param step The interval between animation frames, in milliseconds.
 * @return An interval id that you can use to suspend the animation.
 */
export function animate(apply: Function, duration = 400, step = 35): number {
    asFunction(apply);
    asNumber(duration, false, true);
    asNumber(step, false, true);
    const t     = 0;
    const timer = setInterval(function () {
                                  let pct = t / duration; // linear easing
                                  pct     = Math.sin(pct * Math.PI / 2); // easeOutSin easing
                                  pct *= pct; // swing easing
                                  apply(pct);
                                  t += step;
                                  if (t >= duration) {
                                      if (pct < 1) apply(1); // ensure apply(1) is called to finish
                                      clearInterval(timer);
                                  }
                              }, step
    );
    return timer;
}
