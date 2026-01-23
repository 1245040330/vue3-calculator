<template>
  <div class="keyboard-button-box" :style="{
    '--backgroundColor': backgroundColor,
    '--hoverBackgroundColor': hoverBackgroundColor
  }" :class="[isHover ? 'hover' : '', isActive ? 'active' : '']">
    <slot></slot>
  </div>
</template>
<script setup>


const prpos = defineProps({
  isHover: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String,
    default: 'var(--btn-bg)'
  },
  hoverBackgroundColor: {
    type: String,
    default: 'var(--btn-hover)'
  }
})


</script>
<style lang="scss" scoped>
.keyboard-button-box {
  border-radius: 4px;
  background-color: var(--backgroundColor);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &.hover {
    background-color: var(--hoverBackgroundColor);
  }

  &.active {
    background-color: var(--active-keyboard-color);
  }
}
</style>