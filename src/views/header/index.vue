<template>
  <div class="header-box">
    <SvgIcon @click="emits('more-click',true)" class="svg-box" name="more" :size="14" color="#fff"
      style="padding: 10px 12px" />
    {{ name }}
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  name:{
    type:String,
    default:'标准'
  },
})
const emits = defineEmits(['more-click'])
</script>
<style lang="scss" scoped>
.header-box {
  display: flex;
  font-size: 18px;
  align-items: center;
  gap: 4px;

  .svg-box {
    border-radius: 4px;

    &:hover {
      background-color: #2e2b36;
    }
  }
}
</style>