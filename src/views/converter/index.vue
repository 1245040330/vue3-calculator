<template>
  <div class="converter-box">
    <NumberDisplay :class="[(activeDisplay == 'from' ? 'active' : '')]" @click="activeDisplay = 'from'"
      style="flex: 1; height: 1px" v-model="fromValue"></NumberDisplay>
    <Select class="select-box" :options="unitOptions" v-model="fromUnitValue" value-field="key"
      popover-width="fit-content"></Select>
    <NumberDisplay :class="[(activeDisplay == 'to' ? 'active' : '')]" @click="activeDisplay = 'to'"
      style="flex: 1; height: 1px" v-model="toValue"></NumberDisplay>
    <Select class="select-box" :options="unitOptions" v-model="toUnitValue" value-field="key"
      popover-width="fit-content"></Select>
    <Keyboard style="flex: 5" :handle-key-press="handleKeyPress"></Keyboard>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import Select from "@/components/Select/index.vue";
import NumberDisplay from "@/views/display/number.vue";
import Keyboard from "@/views/keyboard/index.vue";
import { keynoardConfig } from "@/config/calculator";
import { inputDot, backspace } from "@/utils/mathUtil";
import { convertLength } from "@/utils/converterUtil";
import { useCalculatorStore } from "@/store";
const calculatorStore = useCalculatorStore();
const activeKeynoard = computed(() => {
  return keynoardConfig[calculatorStore.activeMenu.key] || {};
});
const unitOptions = computed(() => {
  return activeKeynoard.value.unitOptions || [];
});

const fromUnitValue = ref(activeKeynoard.value.fromDefaultUnit || "");
const toUnitValue = ref(activeKeynoard.value.toDefaultUnit || "");
const fromValue = ref("0");
const toValue = ref("0");
watch(fromUnitValue, () => {
  calculate();
});
watch(toUnitValue, () => {
  calculate();
});
const activeDisplay = ref("from");
const handleKeyPress = (value) => {
  let currentText =
    activeDisplay.value == "from" ? fromValue.value : toValue.value;
  if (value == ".") {
    currentText = inputDot(currentText);
  } else if (value == "Backspace") {
    currentText = backspace(currentText);
  } else if (value == "Delete") {
    fromValue.value = "0";
    toValue.value = "0";
    currentText = "0";
  } else if (!isNaN(Number(value)) && typeof Number(value) == "number") {
    if (currentText === "0") {
      currentText = value;
    } else if (currentText === "Error" || currentText == "Infinity") {
      currentText = value;
    } else {
      if (currentText.length < 16) {
        currentText += value;
      }
    }
  }
  //   console.log(value);
  if (activeDisplay.value == "from") {
    fromValue.value = currentText;
  } else {
    toValue.value = currentText;
  }
  calculate();

};
const calculate = () => {
  if (calculatorStore.activeMenu.key == 'length') {
    calculateLength();
  }
}

const calculateLength = () => {
  if (activeDisplay.value == "from") {
    toValue.value = convertLength(
      Number(fromValue.value),
      fromUnitValue.value,
      toUnitValue.value
    );
  } else {
    fromValue.value = convertLength(
      Number(toValue.value),
      toUnitValue.value,
      fromUnitValue.value
    );
  }
};
</script>
<style lang="scss" scoped>
.converter-box {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .active {
    font-weight: bold;
  }

  .select-box {
    width: fit-content;
  }
}
</style>
