<template>
  <svg
    aria-hidden="true"
    :style="{
      width: size,
      height: size,
      'box-sizing': 'content-box',
    }"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
  
  <script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon",
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#333",
    },
    size: {
      type: String,
      default: "20px",
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  },
});
</script>