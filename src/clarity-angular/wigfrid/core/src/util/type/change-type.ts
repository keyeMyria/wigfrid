// import {isString} from "./lang/is-string";
// import {DataType} from "./enum/DataType";
// import {Globalize} from "../globalization/Globalize";
// /**
//  * Changes the type of a value.
//  *
//  * If the conversion fails, the original value is returned. To check if a
//  * conversion succeeded, you should check the type of the returned value.
//  *
//  * @param value Value to convert.
//  * @param type @see:DataType to convert the value to.
//  * @param format Format to use when converting to or from strings.
//  * @return The converted value, or the original value if a conversion was not possible.
//  */
// export function changeType(value: any, type: DataType, format: string): any {
//     if (value != null) {
//
//         // convert strings to numbers, dates, or booleans
//         if (isString(value)) {
//             switch (type) {
//
//                 case DataType.Number:
//                     var num = Globalize.parseFloat(value, format);
//                     return isNaN(num) ? value : num;
//
//                 case DataType.Date:
//                     var date = Globalize.parseDate(value, format);
//                     if (!date && !format && value) {
//                         date = new Date(value); // fallback on JavaScript parser
//                     }
//                     return date && isFinite(date.getTime()) ? date : value;
//
//                 case DataType.Boolean:
//                     switch ((<string>value).toLowerCase()) {
//                         case 'true': return true;
//                         case 'false': return false;
//                     }
//                     return value;
//             }
//         }
//
//         // convert anything to string
//         if (type == DataType.String) {
//             return Globalize.format(value, format);
//         }
//     }
//
//     // did not convert...
//     //console.log('did not convert "' + value + '" to type ' + DataType[type]);
//     return value;
// }
