<template>
  <div class="keyboard-button-box" :style="{
    '--backgroundColor': backgroundColor,
    '--hoverBackgroundColor': hoverBackgroundColor,
    '--activeBackgroundColor': activeKeyboardColor
  }"
    :class="[props.isHover ? 'hover' : '', props.isActive ? 'active' : '', (props.showBeforeBorder && props.isActive) ? 'show-before-border' : '']">
    <slot></slot>
  </div>
</template>
<script setup>


const props = defineProps({
  isHover: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  showBeforeBorder: {
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
  },
  activeKeyboardColor: {
    type: String,
    default: 'var(--active-keyboard-color)'
  },
})


</script>
<style lang="scss" scoped>
.keyboard-button-box {
  border-radius: 4px;
  background-color: var(--backgroundColor);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &.show-before-border:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 40%;
    transform: translate(0%, 75%);
    background-color: var(--bg-3-color);
    border-radius: 8px;
  }


  &:hover,
  &.hover {
    background-color: var(--hoverBackgroundColor);
  }

  &.active {
    background-color: var(--activeBackgroundColor);
  }
}
</style>