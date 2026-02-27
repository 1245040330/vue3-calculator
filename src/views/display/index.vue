<template>
  <div class="display-box" ref="displayBoxRef">
    <div class="calculation-text">{{ calculationText }}</div>
    <div
      class="current-text"
      :style="{ fontSize: currentFontSize + 'px' }"
      ref="currentTextRef"
    >
      {{ currentText }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useCalculatorStore } from "@/store";
import { parse as mathParse } from "mathjs";
import katex from "katex";

const calculatorStore = useCalculatorStore();

const calculationText = computed({
  get: () => calculatorStore.calculationText,
  set: (value) => calculatorStore.setCalculationText(value),
});

const formatNumber = (num) => {
  if (!num || typeof num !== "string") return num;

  // 处理负数
  const isNegative = num.startsWith("-");
  let cleanNum = isNegative ? num.slice(1) : num;

  // 仅保留数字字符（移除非数字字符）
  cleanNum = cleanNum.replace(/[^0-9]/g, "");

  // 计算数字位数
  const digitCount = cleanNum.length;

  // 32以上：使用准确科学计数法
  if (digitCount > 32) {
    const exponent = digitCount - 1;

    // 保留10位有效数字（1位整数 + 9位小数）
    const significantDigits = cleanNum.substring(0, 10);

    // 提取整数部分和小数部分
    const integerPart = significantDigits[0];
    const fractionalPart = significantDigits.substring(1);

    // 检查小数部分是否全为0
    if (fractionalPart === "000000000") {
      // 简化显示：1.e+31
      return isNegative
        ? `-${integerPart}.e+${exponent}`
        : `${integerPart}.e+${exponent}`;
    } else {
      // 保留9位小数
      return isNegative
        ? `${integerPart}.${fractionalPart}e+${exponent}`
        : `${integerPart}.${fractionalPart}e+${exponent}`;
    }
  }

  // 31位及以下：逗号分隔格式（每3位加逗号）
  const formatted = cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return isNegative ? "-" + formatted : formatted;
};

const currentText = computed({
  get: () => formatNumber(calculatorStore.currentText),
  set: (value) => calculatorStore.setCurrentText(value),
});

const displayBoxRef = ref(null);
const currentTextRef = ref(null);
// 存储当前字体大小
const currentFontSize = ref(80);

// 计算文本宽度
// 创建一个临时的 <span> 元素，模拟文本在 80px 字体下的宽度
const getTextWidth = (text) => {
  if (!text) return 0;

  const span = document.createElement("span");
  span.style.position = "absolute";
  span.style.visibility = "hidden";
  span.style.whiteSpace = "nowrap";
  span.style.fontSize = "80px"; // 使用80px字体计算原始宽度
  span.style.fontFamily = getComputedStyle(currentTextRef.value).fontFamily;
  span.textContent = text;

  document.body.appendChild(span);
  const width = span.offsetWidth;
  document.body.removeChild(span);
  return width;
};

// 根据容器宽度动态计算最佳字体大小
const adjustFontSize = () => {
  if (!displayBoxRef.value || !currentTextRef.value) return;

  const containerWidth = displayBoxRef.value.clientWidth;
  const text = currentText.value;

  // 空文本时恢复默认大小
  if (!text) {
    currentFontSize.value = 80;
    return;
  }

  // 获取原始宽度（80px字体下）
  const originalWidth = getTextWidth(text);

  // 计算缩放比例
  const ratio = containerWidth / originalWidth;

  // 应用最小/最大字体限制
  currentFontSize.value = Math.min(Math.max(12, 80 * ratio * 0.995), 80);
};

// 监听文本变化
watch(
  () => currentText.value,
  () => {
    adjustFontSize();
  }
);

// 监听窗口大小变化
const handleResize = () => {
  adjustFontSize();
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  // 初始调整字体大小
  adjustFontSize();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const katexHtml = computed(() => {
  if (calculationText.value) {
    try {
      return katex.renderToString(mathParse("1 / 2").toTex(), {
        throwOnError: false,
      });
    } catch (error) {
      console.error(error);
      return calculationText.value;
    }
  } else {
    return "";
  }
});
</script>

<style lang="scss" scoped>
.display-box {
  min-width: 320px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  user-select: text;

  .calculation-text {
    font-size: 16px;
    text-align: right;
  }

  .current-text {
    text-align: right;
  }
}
</style>
