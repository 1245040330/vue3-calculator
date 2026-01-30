<template>
  <div class="number-display-box">{{ modelValue }}</div>
</template>
<script setup>
const modelValue = defineModel();
</script>
<style lang="scss" scoped>
.number-display-box {
  padding: 8px;
  user-select: text;
  font-size: clamp(36px, 8cqmin, 80px);
  text-align: left;
  min-height: 50px;
}
</style>
