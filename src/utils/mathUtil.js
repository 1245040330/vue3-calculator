import { create, all } from "mathjs";
import katex from "katex";
import { useCalculatorStore } from '@/store'

const math = create(all,{ number: 'BigNumber', precision: 64 });
const rawNegate = math.unaryMinus;
// 将函数注册到解析器
math.import({
    negate: function (x) {
        return rawNegate(x);
    },
    sqr: function (x) {
        return math.pow(x, 2);
    },
    fact: function (x) {
        return math.factorial(x);
    },
    ln: function (x) {
        return math.log(x);
    },
    cuberoot: function (x) {
        return math.cbrt(x);
    },

});

//随机数
export function random() {
    return math.random() + ""
}
/**
 * 将十进制角度转换为 D.MMSS 格式
 * 示例: 125.725 -> 125.4330
 */
export function toDMMSS(decimalDegrees) {
    const sign = decimalDegrees < 0 ? -1 : 1;
    const absDeg = Math.abs(decimalDegrees);

    const d = Math.floor(absDeg);
    const m = Math.floor((absDeg - d) * 60);
    const s = Math.round((absDeg - d - m / 60) * 3600);

    // 拼接成 D.MMSS
    // m / 100 占据小数点后两位，s / 10000 占据之后两位
    const result = d + (m / 100) + (s / 10000);

    return (result * sign).toFixed(4); // 强制保留四位小数，确保秒位显示
};

/**
 * D.MMSS 格式转十进制 (模仿计算器 →deg 功能)
 * 示例: 0.3000 -> 0.5
 * 示例: 1.1500 -> 1.25
 */
export function fromDMMSS(dmmss) {
    const sign = dmmss < 0 ? -1 : 1;
    const absVal = Math.abs(dmmss);

    // 1. 提取度 (D)
    const d = Math.floor(absVal);

    // 2. 提取分 (MM) 
    // 技巧：(1.1500 - 1) * 100 = 15.00
    const m = Math.floor((absVal - d) * 100 + 0.0001);

    // 3. 提取秒 (SS)
    // 技巧：((1.1500 - 1) * 100 - 15) * 100 = 0
    const s = Math.round(((absVal - d) * 100 - m) * 100);

    // 4. 计算最终十进制值
    const result = d + (m / 60) + (s / 3600);

    return (result * sign) + "";
};
/**
 * 退位
 * @param {*} text 
 * @returns 
 */
export function backspace(text) {
    if (typeof text == "string") {
        return text.slice(0, -1);
    } else {
        return '';
    }

}
/**
 * 清除末位输入
 */
export function clearEntry(calculationText) {
    if (calculationText && calculationText.toString().endsWith("=")) {
        return clear();
    }
    return { calculationText: calculationText, currentText: "0" }
}

/**
 * 全部清除
 * 
 * @returns 
 */
export function clear() {
    return { calculationText: "", currentText: "0" }
}

/**
 * 当前值的百分比
 * @param {*} currentText 
 * @returns 
 */
export function percent(currentText) {
    return evaluate(currentText + "/100")
}

/**
 * 数值的相反数
 */
export function negate(calculationText, currentText) {
    if (calculationText.endsWith("=")) {
        calculationText = "negate(" + calculationText.slice(0, -1) + ")"
        currentText = evaluate(calculationText)
    } else if (calculationText.endsWith(")")) {
        calculationText = "negate(" + calculationText + ")"
        currentText = evaluate(calculationText)
    } else {
        if (currentText.startsWith("-")) {
            currentText = currentText.slice(1)
        } else {
            currentText = "-" + currentText
        }
    }
    return { calculationText: calculationText, currentText: currentText }
}

/**
 * 回车
 * @param {*} calculationText 
 * @param {*} currentText 
 */
export function enter(calculationText, currentText) {
    if (calculationText && calculationText.includes('{_}')) {
        calculationText = calculationText.replace("{_}", currentText)
    }
    if (calculationText.endsWith("=")) {
    } else if (calculationText.endsWith(")")) {
        calculationText = calculationText + '='
    } else {
        calculationText = calculationText + currentText + '='
    }
    currentText = evaluate(calculationText)
    return { calculationText: calculationText, currentText: currentText }
}

/**
 * 输入小数点
 * @param {*} text 
 * @returns 
 */
export function inputDot(text) {
    if (text.includes(".")) {
        return text;
    }
    if (text.length < 16) {
        text += '.';
    }
    return text;
}

/**
 * 倒数
 */
export function reciprocal(calculationText, currentText) {
    return unaryOperation("1/(", calculationText, currentText)
}

export function sqr(calculationText, currentText) {
    return unaryOperation("sqr(", calculationText, currentText)
}

export function sqrt(calculationText, currentText) {
    return unaryOperation("sqrt(", calculationText, currentText)
}

//绝对值
export function abs(calculationText, currentText) {
    return unaryOperation("abs(", calculationText, currentText)
}

export function unaryOperation(op, calculationText, currentText, endOp = ")") {
    let lastChar = calculationText.slice(-1);
    if (calculationText.endsWith("=")) {
        calculationText = op + calculationText.slice(0, -1) + endOp
        currentText = evaluate(calculationText)
    } else if (calculationText.endsWith(")")) {
        calculationText = op + calculationText + endOp
        currentText = evaluate(calculationText)
    } else if (operatorList.includes(lastChar)) {
        calculationText = calculationText + op + currentText + endOp
        currentText = evaluate(calculationText)
    } else if (!calculationText) {
        calculationText = op + currentText + endOp
        currentText = evaluate(calculationText)
    }
    return { calculationText: calculationText, currentText: currentText }
}

export function joinOperation(operationList, calculationText, currentText, joinCurrentText = false, joinSpace = true) {
    calculationText = calculationText + (joinCurrentText ? currentText : '') + (joinSpace ? " " : "") + operationList.join(' ') + (joinSpace ? " " : "");
    currentText = "";
    return { calculationText: calculationText, currentText: currentText }
}


/**
 * 计算表达式
 * @param {*} expression 
 * @returns 
 */
export function evaluate(expression) {
    const calculatorStore = useCalculatorStore()
    expression = expression.replace(/sin\(([^)]+)\)/g, `sin($1 ${angleUnitObject[calculatorStore.angleUnit]})`);
    expression = expression.replace(/cos\(([^)]+)\)/g, `cos($1 ${angleUnitObject[calculatorStore.angleUnit]})`);
    expression = expression.replace(/tan\(([^)]+)\)/g, `tan($1 ${angleUnitObject[calculatorStore.angleUnit]})`);
    expression = expression.replace(/sec\(([^)]+)\)/g, `sec($1 ${angleUnitObject[calculatorStore.angleUnit]})`);
    expression = expression.replace(/csc\(([^)]+)\)/g, `csc($1 ${angleUnitObject[calculatorStore.angleUnit]})`);
    expression = expression.replace(/cot\(([^)]+)\)/g, `cot($1 ${angleUnitObject[calculatorStore.angleUnit]})`);
    // console.log("expression", expression);

    //如果存在{_} 占位符，则返回空字符串
    if (expression && expression.includes("{_}")) {
        return ''
    }
    if (expression.endsWith("=")) {
        expression = expression.replace("=", "")
    }
    try {
        let value =math.evaluate(expression);
        let result = formatOutput(value)
        return result + ""
    } catch (error) {
        console.error("表达式错误", expression, error);

        return 'error'
    }


}

const formatOutput = (value) => {
    try {
        // 检查是否为大数字或特殊类型
        if (value && value.e && Math.abs(value.e) > 10000) {
            // 对于非常大的数字，使用科学计数法
            return math.format(value, {
                notation: 'exponential',
                precision: 10
            });
        }
        
        // 正常数字格式化
        const formatted = math.format(value, {
            notation: 'fixed',
            precision: 15,
            upperExp: 16, // 超过 10^16 才使用科学计数法
            lowerExp: -16 // 小于 10^-16 才使用科学计数法
        });
        
        // 移除末尾的零和小数点
        return formatted.replace(/\.?0+$/, "");
    } catch (error) {
        console.error('格式化错误:', error);
        return value.toString();
    }
};

/**
 * 生成计算表达式
 * @param {*} historyCalculationText 历史计算表达式
 * @param {*} currentText 当前输入的文本
 * @param {*} operator 运算符
 * @param {*} updateCurremtText 文本是否更新
 * @returns 
 */
export function generateCalculationText(historyCalculationText, currentText, operator, updateCurremtText) {
    let lastChar = historyCalculationText.slice(-1);
    if (historyCalculationText.endsWith("=")) {
        return historyCalculationText = currentText + operator
    }
    if (historyCalculationText.endsWith(")")) {
        return historyCalculationText = historyCalculationText + operator
    }
    //检查最后一个字符是否为运算符
    // console.log(operatorList.includes(lastChar) && !updateCurremtText, updateCurremtText);

    if (operatorList.includes(lastChar) && !updateCurremtText) {
        return historyCalculationText = historyCalculationText.slice(0, -1) + operator;
    }

    return historyCalculationText + currentText + operator
}

/**
 * 渲染键盘文字
 * @param {*} keyboardItem 
 * @param {*} activeKeyboardObject 激活的键盘对象
 * @returns 
 */
export function renderKeyboardLabel(keyboardItem, activeKeyboardObject = {}) {
    let item = Object.assign({}, keyboardItem);

    Object.keys(activeKeyboardObject).forEach(key => {
        if (activeKeyboardObject[key] && item[key]) {
            item = Object.assign({}, item[key]);
        }
    })
    let selectKeyboardList = getActiveKeyboardList(activeKeyboardObject);
    if (keyboardItem[selectKeyboardList.join("")]) {
        item = Object.assign({}, keyboardItem[selectKeyboardList.join("")]);
    }
    if (item.latex) {
        return katex.renderToString(item.latex, { throwOnError: false });
    } else {
        return item.label || "未设置label";
    }
};

/**
 * 渲染键盘组件
 * @param {*} keyboardItem 
 * @param {*} activeKeyboardObject 激活的键盘对象
 * @returns 
 */
export function renderComponents(item, activeKeyboardObject = {}) {
    let itemData = Object.assign({}, item);

    Object.keys(activeKeyboardObject).forEach(key => {
        if (activeKeyboardObject[key] && itemData[key]) {
            itemData = Object.assign({}, itemData[key]);
        }
    })
    let selectKeyboardList = getActiveKeyboardList(activeKeyboardObject);
    // console.log(selectKeyboardList, itemData);

    if (item[selectKeyboardList.join("")]) {
        itemData = Object.assign({}, item[selectKeyboardList.join("")]);
    }
    return itemData.component
}

export function getActiveKeyboardList(activeKeyboardObject) {
    return Object.keys(activeKeyboardObject).filter(key => {
        return activeKeyboardObject[key]
    })
}

export const operatorList = ["+", "-", "*", "/", "^"];
export const angleUnitObject = {
    DEG: "deg",
    RAD: "",
    GRAD: "grad",
};