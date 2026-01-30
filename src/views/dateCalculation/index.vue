<template>
  <div class="date-calculation">
    <Select
      class="select-box"
      v-model="activePopoverButton"
      :options="keyboardList"
      value-field="key"
      popover-height="80px"
      popover-width="fit-content"
    ></Select>
    <div class="content-box">
      <AddSubDays v-if="activePopoverButton == 'AddSubDays'"></AddSubDays>
      <DiffDates v-if="activePopoverButton == 'DiffDates'"></DiffDates>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { useCalculatorStore } from "@/store";
import { keynoardConfig } from "@/config/calculator";
import AddSubDays from "@/views/dateCalculation/addSubDays.vue";
import DiffDates from "@/views/dateCalculation/diffDates.vue";
import Select from "@/components/select/index.vue";
const calculatorStore = useCalculatorStore();
const activePopoverButton = ref("");

const activeKeynoard = computed(() => {
  return keynoardConfig[calculatorStore.activeMenu.key] || {};
});
const keyboardList = computed(() => {
  return activeKeynoard.value.keyboardList || [];
});
onMounted(() => {
  activePopoverButton.value = keyboardList.value[0]?.key || "";
});
</script>
<style lang="scss" scoped>
.date-calculation {
  overflow: auto;
  padding: 8px 0;
  .select-box {
    width: fit-content;
  }

  .content-box {
    height: calc(100% - 32px);
    padding: 8px;
  }
}
</style>