import { create, all } from "mathjs";
import katex from "katex";

const math = create(all);
const rawNegate = math.unaryMinus;
// 将函数注册到解析器
math.import({
    negate: function (x) {
        return rawNegate(x);
    },
    sqr: function (x) {
        return math.pow(x, 2);
    }
});

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
    if (calculationText.endsWith("=")) {
        currentText = evaluate(calculationText)
    } else if (calculationText.endsWith(")")) {
        calculationText = calculationText + '='
    } else {
        calculationText = calculationText + currentText + '='
    }

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

function unaryOperation(op, calculationText, currentText) {
    let lastChar = calculationText.slice(-1);
    if (calculationText.endsWith("=")) {
        calculationText = op + calculationText.slice(0, -1) + ")"
        currentText = evaluate(calculationText)
    } else if (calculationText.endsWith(")")) {
        calculationText = op + calculationText + ")"
        currentText = evaluate(calculationText)
    } else if (operatorList.includes(lastChar)) {
        calculationText = calculationText + op + currentText + ")"
        currentText = evaluate(calculationText)
    } else if (!calculationText) {
        calculationText = op + currentText + ")"
        currentText = evaluate(calculationText)
    }
    return { calculationText: calculationText, currentText: currentText }
}


/**
 * 计算表达式
 * @param {*} expression 
 * @returns 
 */
export function evaluate(expression) {
    if (expression.endsWith("=")) {
        expression = expression.replace("=", "")
    }
    return math.evaluate(expression) + ""
}

/**
 * 生成计算表达式
 * @param {*} historyCalculationText 历史计算表达式
 * @param {*} currentText 当前输入的文本
 * @param {*} operator 运算符
 * @returns 
 */
export function generateCalculationText(historyCalculationText, currentText, operator) {
    let lastChar = historyCalculationText.slice(-1);
    if (historyCalculationText.endsWith("=")) {
        return historyCalculationText = currentText + operator
    }
    if (historyCalculationText.endsWith(")")) {
        return historyCalculationText = historyCalculationText + operator
    }
    //检查最后一个字符是否为运算符
    if (operatorList.includes(lastChar)) {
        return historyCalculationText = historyCalculationText.slice(0, -1) + operator;
    }

    return historyCalculationText + currentText + operator
}

export function renderLabel (keyboardItem)  {
  if (keyboardItem.latex) {
    return katex.renderToString(keyboardItem.latex, { throwOnError: false });
  } else {
    return keyboardItem.label || "未设置label";
  }
};



export const operatorList = ["+", "-", "*", "/"]