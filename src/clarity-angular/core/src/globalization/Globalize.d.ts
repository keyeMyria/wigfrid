/**
 * Class that implements formatting and parsing of numbers and Dates.
 *
 * By default, @see:Globalize uses the American English culture.
 * To switch cultures, include the appropriate <b>wijmo.culture.*.js</b>
 * file after the wijmo files.
 */
export declare class Globalize {
    /**
     * Formats a number or a date.
     *
     * The format strings used with the @see:format function are similar to
     * the ones used by <b>Globalize.js</b> and by the .NET Globalization
     * library. The tables below contains links that describe the formats
     * available:
     *
     * <ul>
     * <li><a href="http://msdn.microsoft.com/en-us/library/dwhawy9k(v=vs.110).aspx">
     *      Standard Numeric Format Strings</a></li>
     * <li><a href="http://msdn.microsoft.com/en-us/library/az4se3k1(v=vs.110).aspx">
     *      Standard Date and Time Format Strings</a></li>
     * <li><a href="http://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx">
     *      Custom Date and Time Format Strings</a></li>
     * </ul>
     *
     * @param value Number or Date to format (all other types are converted to strings).
     * @param format Format string to use when formatting numbers or dates.
     * @param trim Whether to remove trailing zeros from numeric results.
     * @param truncate Whether to truncate the numeric values rather than round them.
     * @return A string representation of the given value.
     */
    static format(value: any, format: string, trim?: boolean, truncate?: boolean): string;
    /**
     * Formats a number using the current culture.
     *
     * The @see:formatNumber method accepts most .NET-style
     * <a href="http://msdn.microsoft.com/en-us/library/dwhawy9k(v=vs.110).aspx">
     * Standard Numeric Format Strings</a>, except for the 'e' and 'x' formats
     * (scientific notation and hexadecimal) which are not supported.
     *
     * Numeric format strings takes the form <i>Axxccss</i>, where:
     * <ul>
     * <li>
     *  <i>A</i> is a single case-insensitive alphabetic character called the
     *  format specifier.</i>
     * <li>
     *  <i>xx</i> is an optional integer called the precision specifier.
     *  The precision specifier affects the number of digits in the result.</li>
     * <li>
     *  <i>cc</i> is an optional string used to override the currency symbol
     *  when formatting currency values. This is useful when formatting
     *  currency values for cultures different than the current default
     *  (for example, when formatting Euro or Yen values in applications
     *  that use the English culture).</li>
     * <li>
     *  <i>ss</i> is an optional string used to scale the number. If provided,
     *  it must consist of commas. The number is divided by 1000 for each comma
     *  specified.</li>
     * </ul>
     *
     * The following table describes the standard numeric format specifiers and
     * displays sample output produced by each format specifier for the default
     * culture.
     *
     * <b>n</b> Number: <code>formatNumber(1234.5, 'n2') => '1,234.50'</code><br/>
     * <b>f</b> Fixed-point: <code>formatNumber(1234.5, 'f2') => '1234.50'</code><br/>
     * <b>g</b> General (no trailing zeros): <code>formatNumber(1234.5, 'g2') => '1,234.5'</code><br/>
     * <b>d</b> Decimal (integers): <code>formatNumber(-1234, 'd6') => '-001234'</code><br/>
     * <b>x</b> Hexadecimal (integers): <code>formatNumber(1234, 'x6') => '0004d2'</code><br/>
     * <b>c</b> Currency: <code>formatNumber(1234, 'c') => '$ 1,234.00'</code><br/>
     * <b>p</b> Percent: <code>formatNumber(0.1234, 'p2') => '12.34 %'</code>
     *
     * The scaling specifier is especially useful when charting large values. For
     * example, the markup below creates a chart that plots population versus GDP.
     * The raw data expresses the population is units and the GDP in millions.
     * The scaling specified in the axes formats causes the chart to show population
     * in millions and GDP in trillions:
     *
     * <pre>&lt;wj-flex-chart
     *   items-source="countriesGDP" binding-x="pop" chart-type="Scatter"&gt;
     *   &lt;wj-flex-chart-series
     *     name="GDP" binding="gdp"&gt;&lt;/wj-flex-chart-series&gt;
     *   &lt;wj-flex-chart-axis
     *     wj-property="axisX" title="Population (millions)"
     *     format="n0,,"&gt;
     *   &lt;/wj-flex-chart-axis&gt;
     *   &lt;wj-flex-chart-axis
     *     wj-property="axisY" title="GDP (US$ trillions)"
     *     format="c0,,"&gt;
     *   &lt;/wj-flex-chart-axis&gt;
     * &lt;/wj-flex-chart&gt;</pre>
     *
     * @param value Number to format.
     * @param format .NET-style standard numeric format string (e.g. 'n2', 'c4', 'p0', 'g2', 'd2').
     * @param trim Whether to remove trailing zeros from the result.
     * @param truncate Whether to truncate the value rather than round it.
     * @return A string representation of the given number.
     */
    static formatNumber(value: number, format: string, trim?: boolean, truncate?: boolean): string;
    /**
     * Formats a date using the current culture.
     *
     * The @see:format parameter contains a .NET-style
     * <a href="http://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx">Date format string</a>
     * with the following additions:
     * <ul>
     * <li>
     *  <i>Q, q</i> Calendar quarter.</li>
     *  <i>U</i> Fiscal quarter (government).</li>
     *  <i>u</i> Fiscal quarter (private sector).</li>
     *  <i>EEEE, EEE, EE, E</i> Fiscal year (government).</li>
     *  <i>eeee, eee, ee, e</i> Fiscal year (private sector).</li>
     * </ul>
     *
     * For example:
     * <code>
     * var d = new Date(2015, 9, 1); // Oct 1, 2015
     * console.log(wijmo.Globalize.format(d, '"FY"EEEE"Q"U') + ' (US culture)');
     * &gt; <b>FY2016Q1 (US culture)</b>
     * </code>
     *
     * @param value Number or Date to format.
     * @param format .NET-style Date format string</a>.
     * @return A string representation of the given date.
     */
    static formatDate(value: Date, format: string): string;
    /**
     * Parses a string into an integer.
     *
     * @param value String to convert to an integer.
     * @param format Format to use when parsing the number.
     * @return The integer represented by the given string,
     * or <b>NaN</b> if the string cannot be parsed into an integer.
     */
    static parseInt(value: string, format?: string): number;
    /**
     * Parses a string into a floating point number.
     *
     * @param value String to convert to a number.
     * @param format Format to use when parsing the number.
     * @return The floating point number represented by the given string,
     * or <b>NaN</b> if the string cannot be parsed into a floating point number.
     */
    static parseFloat(value: string, format?: string): number;
    /**
     * Parses a string into a Date.
     *
     * @param value String to convert to a Date.
     * @param format Format string used to parse the date.
     * @return The date represented by the given string, or null if the string
     * cannot be parsed into a Date.
     */
    static parseDate(value: string, format: string): Date;
    static _CJK: string;
    /**
     * Gets the first day of the week according to the current culture.
     *
     * The value returned is between zero (Sunday) and six (Saturday).
     */
    static getFirstDayOfWeek(): number;
    /**
     * Gets the symbol used as a decimal separator in numbers.
     */
    static getNumberDecimalSeparator(): string;
    private static _unquote(s);
    private static _dateFomatParts;
    private static _parseDateFormat(format);
    private static _formatDatePart(d, format, part);
    private static _getEra(d, cal);
    private static _expandFormat(format);
    private static _zeroPad(num, places);
    private static _h12(d);
}
