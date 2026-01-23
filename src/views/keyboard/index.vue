<template>
  <div class="keyboard-box" :style="{ '--row-number': rowNumber, '--column-number': columnNumber }">
    <CustomToolbar class="custom-toolbar-box" v-if="customToolbar && customToolbar.length > 0" :custom-toolbar="customToolbar"></CustomToolbar>
    <div class="keyboard-list">
      <KeyboardButton v-for="item in keyboardList" :is-hover="activeKeyboardObject[item.keyboard]"
        @click="handleKeyPress(item)">
        <component v-if="item.component" :is="item.component"> </component>

        <div v-else v-html="renderLabel(item)"></div>
      </KeyboardButton>
    </div>

  </div>
</template>
<script setup>


import KeyboardButton from "./keyboardButton.vue";
import CustomToolbar from "./customToolbar.vue";

import { onMounted, onBeforeUnmount, computed, h, watchEffect, ref } from "vue";
import {
  useMagicKeys,
  useKeyModifier
} from '@vueuse/core'
import { useCalculatorStore, } from '@/store'
import {renderLabel, backspace, inputDot, evaluate, generateCalculationText, clearEntry, clear, negate, percent, enter, reciprocal, sqr, sqrt } from '@/utils/mathUtil'
import { keynoardConfig } from '@/config/calculator'
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

const magicKeys = useMagicKeys();
const keyModifier = useKeyModifier()

const keyboardList = computed(() => {
  return keynoardConfig[calculatorStore.activeMenu]?.keyboardList || []
})
const rowNumber = computed(() => {
  return keynoardConfig[calculatorStore.activeMenu]?.rowNumber || 0
})
const columnNumber = computed(() => {
  return keynoardConfig[calculatorStore.activeMenu]?.columnNumber || 0
})
const customToolbar = computed(() => {
  return keynoardConfig[calculatorStore.activeMenu]?.customToolbar || []
})
const activeKeyboardObject = ref({})
watchEffect(() => {
  keyboardList.value.forEach(item => {
    if (item.keyboard && typeof item.keyboard == 'string' && item.keyboard.split(",").length > 0) {
      let keyboards = item.keyboard.split(",");
      if (keyboards.some(key => magicKeys[key].value)) {
        activeKeyboardObject.value[item.keyboard] = true
      } else {
        activeKeyboardObject.value[item.keyboard] = false
      }

    }
  });
});

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyPress)
})



const handleKeyPress = (key) => {
  console.log(key);

  const { label, key: keyValue } = key;
  const value = keyValue || label;

  if (value == '+' || value == '-' || value == '*' || value == '/') {
    calculationText.value = generateCalculationText(calculationText.value, currentText.value, value)
    currentText.value = ""
  } else if (value == 'Enter') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = enter(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == '.') {
    currentText.value = inputDot(currentText.value)
  } else if (value == 'Backspace') {
    currentText.value = backspace(currentText.value)
  } else if (value == 'Negate') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = negate(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Delete') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = clearEntry(calculationText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Clear') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = clear(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == "%") {
    currentText.value = percent(currentText.value)
  } else if (value == 'Reciprocal') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = reciprocal(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == 'Sqr') {
    const { calculationText: newCalculationText, currentText: newCurrentText } = sqr(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  } else if (value == "Sqrt") {
    const { calculationText: newCalculationText, currentText: newCurrentText } = sqrt(calculationText.value, currentText.value)
    calculationText.value = newCalculationText
    currentText.value = newCurrentText
  }
  else if (!isNaN(Number(value)) && typeof Number(value) == 'number') {
    if (currentText.value === "0") {
      currentText.value = value;
    } else if (currentText.value === "Error" || currentText.value == 'Infinity') {
      calculationText.value = "";
      currentText.value = value;

    } else {
      if (currentText.value.length < 16) {
        currentText.value += value;
      }

    }
  }
  if (!currentText.value || currentText.value.length == 0) {
    currentText.value = "0"
  }
};
</script>
<style lang="scss" scoped>
.keyboard-box {

  display: flex;
  flex-direction: column;

  .custom-toolbar-box {
    height: 40px;
  }

  .keyboard-list {
    flex: 1;
    height: 1px;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(var(--column-number), minmax(auto, 1fr));
    grid-template-rows: repeat(var(--row-number), minmax(auto, 1fr));
    justify-content: space-evenly;
    grid-column-gap: 4px;
    grid-row-gap: 4px;
  }
}
</style>