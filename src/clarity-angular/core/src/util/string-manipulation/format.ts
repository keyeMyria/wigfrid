// import {asString} from "./asserts/asString";
// import {Globalize} from "../globalization/Globalize";
// /**
//  * Replaces each format item in a specified string with the text equivalent of an
//  * object's value.
//  *
//  * The function works by replacing parts of the <b>formatString</b> with the pattern
//  * '{name:format}' with properties of the <b>data</b> parameter. For example:
//  *
//  * <pre>
//  * var data = { name: 'Joe', amount: 123456 };
//  * var msg = wijmo.format('Hello {name}, you won {amount:n2}!', data);
//  * </pre>
//  *
//  * The optional <b>formatFunction</b> allows you to customize the content by providing
//  * context-sensitive formatting. If provided, the format function gets called for each
//  * format element and gets passed the data object, the parameter name, the format,
//  * and the value; it should return an output string. For example:
//  *
//  * <pre>
//  * var data = { name: 'Joe', amount: 123456 };
//  * var msg = wijmo.format('Hello {name}, you won {amount:n2}!', data,
//  *             function (data, name, fmt, val) {
//      *               if (wijmo.isString(data[name])) {
//      *                   val = wijmo.escapeHtml(data[name]);
//      *               }
//      *               return val;
//      *             });
//  * </pre>
//  *
//  * @param format A composite format string.
//  * @param data The data object used to build the string.
//  * @param formatFunction An optional function used to format items in context.
//  * @return The formatted string.
//  */
// export function format(format: string, data: any, formatFunction?: Function): string {
//     format = asString(format);
//     return format.replace(/\{(.*?)(:(.*?))?\}/g, function (match, name, x, fmt) {
//         var val = match;
//         if (name && name[0] != '{' && data) {
//
//             // get the value
//             val = data[name];
//
//             // apply static format
//             if (fmt) {
//                 val = Globalize.format(val, fmt);
//             }
//
//             // apply format function
//             if (formatFunction) {
//                 val = formatFunction(data, name, fmt, val);
//             }
//         }
//         return val == null ? '' : val;
//     });
// }
