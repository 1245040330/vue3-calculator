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

const calculatorStore = useCalculatorStore();

const calculationText = computed({
  get: () => calculatorStore.calculationText,
  set: (value) => calculatorStore.setCalculationText(value),
});

const formatNumber = (num) => {
  // 检查是否包含'i'
  if (num.includes("i")) {
    return "无效输入";
  }
  if (num === "Error" || num === "Infinity" || num === "NaN") {
    return num;
  }

  if (!num || typeof num !== "string") return num;

  // 1. 科学计数法直接返回（不加逗号）
  if (num.includes("e") || num.includes("E")) {
    return num;
  }

  // 2. 处理负号（仅保留开头的负号）
  const isNegative = num.startsWith("-");
  let cleanNum = isNegative ? num.slice(1) : num;

  // 3. 仅保留第一个小数点
  let decimalCount = 0;
  cleanNum = cleanNum.replace(/[^0-9.]/g, (char) => {
    if (char === "." && decimalCount === 0) {
      decimalCount++;
      return char;
    }
    return "";
  });

  // 4. 清理开头/结尾的小数点
  if (cleanNum.startsWith(".")) {
    cleanNum = cleanNum.slice(1);
  }
  if (cleanNum.endsWith(".")) {
    cleanNum = cleanNum.slice(0, -1);
  }

  // 5. 如果没有有效数字，返回空（但保留负号）
  if (!cleanNum) {
    return isNegative ? "-" : "";
  }

  // 6. 仅对整数部分添加逗号（小数部分不加）
  const [integerPart, fractionalPart] = cleanNum.split(".");

  // 仅处理整数部分（如果存在）
  const formattedInteger = integerPart
    ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "0";

  // 7. 组合格式化结果
  const formatted = fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;

  return isNegative ? `-${formatted}` : formatted;
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
    white-space: nowrap; /* 阻止换行 */
  }
}
</style>
