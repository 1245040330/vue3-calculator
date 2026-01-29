<template>
  <div class="display-box">
    <div class="calculation-text" >{{ calculationText }}</div>
    <div class="current-text">{{ currentText }}</div>
  </div>
</template>
<script setup>
import { onMounted, computed } from "vue"
import { useCalculatorStore } from '@/store'
import { parse as mathParse } from "mathjs";
import katex from "katex";
const calculatorStore = useCalculatorStore()

const calculationText = computed({
  get: () => {
    return calculatorStore.calculationText
  },
  set: (value) => {
    calculatorStore.setCalculationText(value)
  }

})
const currentText = computed({
  get: () => {
    return calculatorStore.currentText
  },
  set: (value) => {
    calculatorStore.setCurrentText(value)
  }
})
const katexHtml = computed(() => {
  if (calculationText.value) {
    try {
      return katex.renderToString(mathParse('1 / 2').toTex(), { throwOnError: false });
    } catch (error) {
      console.error(error);
      
      return calculationText.value;
    }

  } else {
    return ""
  }
})

onMounted(() => {

})

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
    font-size: clamp(36px, 8vmin, 80px);
    text-align: right;
  }
}
</style>