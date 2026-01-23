<template>
  <div class="keyboard-button-box" :style="{
    '--backgroundColor': backgroundColor,
    '--hoverBackgroundColor': hoverBackgroundColor
  }"
  :class="[isHover?'hover': '']"
  
  >
    <slot></slot>
  </div>
</template>
<script setup>


const prpos = defineProps({
  isHover:{
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String,
    default: '#33313B'
  },
  hoverBackgroundColor: {
    type: String,
    default: '#3C3942'
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
 
  &:hover ,&.hover {
    background-color: var(--hoverBackgroundColor);
  }
}
</style>