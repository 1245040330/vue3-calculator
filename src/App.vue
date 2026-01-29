<template>
  <Main></Main>
</template>
<script setup>
import { onMounted, watch } from "vue";
import Main from "@/views/main.vue";
import { useColorMode } from "@vueuse/core";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
import { useCalculatorStore } from "@/store";
import { keynoardConfig } from "@/config/calculator";
import { treeToArray } from "@/utils/treeUtil";
import { calculationResultBus } from "@/eventBus";
const emits = defineEmits([
  "mode-change",
  "language-change",
  "theme-change",
  "calculation",
]);
const props = defineProps({
  language: {
    type: String,
    default: undefined,
  },
  theme: {
    type: String,
    default: undefined,
  },
  angleUnit: {
    type: String,
    default: undefined,
  },
  initialMode: {
    type: String,
    default: undefined,
  },
});

const calculatorStore = useCalculatorStore();
const mode = useColorMode({
  emitAuto: true,
});
watch(
  () => calculatorStore.language,
  (value) => {
    emits("language-change", value);
    locale.value = value;
  },
  { immediate: true }
);
watch(
  () => calculatorStore.activeMenu,
  (value) => {
    emits("mode-change", value.key);
  }
);
watch(mode, (value) => {
  emits("theme-change", value);
});
calculationResultBus.on(({ expression, result }) => {
  // console.log("expression", expression, "result", result);
  emits("calculation", { expression, result });
});

if (props.initialMode) {
  let moreMenuList = treeToArray(keynoardConfig.moreMenuList);
  let activeMenu = moreMenuList.find((element) => {
    return element.key == props.initialMode;
  });
  if (!activeMenu && props.initialMode == "settings") {
    activeMenu = { name: "calculator.settings", key: "settings" };
  }
  if (activeMenu) {
    calculatorStore.setActiveMenu(activeMenu);
  }
}
if (props.language) {
  calculatorStore.setLanguage(props.language);
}
if (props.theme) {
  mode.value = props.theme;
}
if (props.angleUnit) {
  calculatorStore.setAngleUnit(props.angleUnit);
}
</script>


<style lang="scss" scoped></style>
