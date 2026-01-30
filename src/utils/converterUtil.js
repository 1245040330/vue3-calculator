import { evaluate } from "@/utils/mathUtil";
const LENGTH_RATES = {
    angstroms: 1e-10,          // 埃
    nanometers: 1e-9,         // 纳米
    microns: 1e-6,            // 微米
    millimeters: 0.001,       // 毫米
    centimeters: 0.01,        // 厘米
    meters: 1,                // 米
    kilometers: 1000,         // 千米
    inches: 0.0254,           // 英寸
    feet: 0.3048,             // 英尺
    yards: 0.9144,            // 码
    miles: 1609.344,          // 英里
    nauticalMiles: 1852       // 海里
};

/**
 * 长度单位转换
 * @param {number} value 数值
 * @param {string} fromKey 对应你数据中的 key
 * @param {string} toKey 目标单位的 key
 * @param {number} precision 精度控制，默认保留 10 位有效数字
 */
export function convertLength(value, fromKey, toKey, precision = 16) {
    if (value === null || value === undefined || isNaN(value)) return 0;

    const fromRate = LENGTH_RATES[fromKey];
    const toRate = LENGTH_RATES[toKey];

    if (!fromRate || !toRate) {
        console.error(`Unit key "${!fromRate ? fromKey : toKey}" not found.`);
        return value;
    }

    const result = evaluate("(" + value + '*' + fromRate + ")" + "/" + toRate);

    // 使用 toPrecision 处理极小或极大的科学计数法精度问题
    return result;
}