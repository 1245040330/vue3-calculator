<template>
  <div class="display-box">
    <div class="calculation-text">{{ calculationText }}</div>
    <div class="current-text">{{ formattedCurrentText }}</div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useCalculatorStore } from "@/store";
import { parse as mathParse } from "mathjs";
import katex from "katex";
const calculatorStore = useCalculatorStore();

const calculationText = computed({
  get: () => {
    return calculatorStore.calculationText;
  },
  set: (value) => {
    calculatorStore.setCalculationText(value);
  },
});
const currentText = computed({
  get: () => {
    return calculatorStore.currentText;
  },
  set: (value) => {
    calculatorStore.setCurrentText(value);
  },
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

// 格式化
const formattedCurrentText = computed(() => {
  const value = currentText.value;

  // 如果不是数字，直接返回
  if (isNaN(value) || value === "" || value === "Infinity" || value === "NaN") {
    return value;
  }

  const num = Number(value);

  // 处理0的情况
  if (num === 0) {
    return "0";
  }

  // 处理超长数字 - 专业计算器标准
  if (Math.abs(num) >= 1e10) {
    // 保留3位有效数字的科学计数法
    return num.toExponential(3);
  }

  // 处理超小数字
  if (Math.abs(num) <= 1e-10) {
    // 保留3位有效数字的科学计数法
    return num.toExponential(3);
  }

  // 处理普通数字：保留15位小数，去除末尾的0
  return num.toFixed(15).replace(/\.?0+$/, "");
});
</script>
<style lang="scss" scoped>
.display-box {
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
    font-size: clamp(36px, 8cqmin, 80px);
    text-align: right;
  }
}
</style>
