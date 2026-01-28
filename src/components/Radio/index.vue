<template>
    <div class="radio-box" :class="[checked?'checked':'']" @click="handleChange">
        <div class="custom-radio"></div>
        {{ $t(props.label) }}
    </div>
</template>
<script setup>

const emits = defineEmits(['change'])
const props = defineProps({
    value: {
        ype: [String, Number, Boolean],
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    checked: {
        type: Boolean,
        default: false

    },
})



const handleChange = () => {
    emits('change', props.value)
}

</script>
<style lang="scss" scoped>
.radio-box {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 30px;
    /* 为圆圈留出空间 */
    user-select: none;

    /* 自定义大圆圈 */
    .custom-radio {
        position: absolute;
        left: 0;
        height: 24px;
        /* 控制圆圈高度 */
        width: 24px;
        /* 控制圆圈宽度 */
        background-color: var(--radio-bg-color);
        border-radius: 50%;
        border: 1px solid var(--bg-3-color);
        transition: all 0.3s;

        &:after {
            content: "";
            position: absolute;
            display: none;
        }
    }


    /* 鼠标悬停效果 */
    &:hover .custom-radio {
        background-color: var(--radio-check-bg-color);
    }

    /* 选中时的外圈样式 */
    &.checked .custom-radio {
        background-color: var(--bg-3-color);
        /* 选中颜色 */
        border-color: var(--bg-3-color);
    }

    /* 内点的样式：中心圆 */
    &.checked .custom-radio:after {
        display: block;
        content: "";
        position: absolute;
        left: 4px;
        top: 4px;
        height: calc(100% - 8px);
        width: calc(100% - 8px);
        border-radius: 50%;
        background: var(--radio-bg-color);
        transition: all 0.2s;
    }
}
</style>