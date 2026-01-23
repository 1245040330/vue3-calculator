<template>
    <div class="custom-toolbar">
        <div class="item-box" v-for="(item, index) in customToolbar" :key="item.key || item.name" ref="itemsRef"
            @click="handleClick(item, index)">
            <div class="icon-box">
                <component v-if="item.iconComponent" :is="item.iconComponent"></component>
                <span v-if="item.latex" v-html="renderLabel(item)"></span>
            </div>

            {{ item.name }}
        </div>
        <div class="button-list" :style="popoverStyle" style="position: fixed; " >
            <KeyboardButton v-for="(itemKeyboard, itemKeyboardIndex) in acitveItemKeybord.keyboardList" v-if="acitveItemKeybord.keyboardList && acitveItemKeybord.keyboardList.length>0" :key="itemKeyboardIndex">
                <component v-if="itemKeyboard.component" :is="itemKeyboard.component"> </component>

                <div v-else v-html="renderLabel(itemKeyboard)"></div>
            </KeyboardButton>
        </div>


    </div>
</template>
<script setup>
import KeyboardButton from "./keyboardButton.vue";
import { useTemplateRef, ref } from 'vue';
import { useElementBounding } from '@vueuse/core'
import { renderLabel } from '@/utils/mathUtil'
const props = defineProps({
    customToolbar: {
        type: Array,
        default: () => []
    }
})
const itemsRef = useTemplateRef('itemsRef');

const popoverStyle = ref({
    top: '0px',
});
const acitveItemKeybord =ref({})
const handleClick = (item, index) => {
    const { x, y, top, right, bottom, left, width, height }
        = useElementBounding(itemsRef.value[index])
    popoverStyle.value = {
        left: 0 + 'px',
        top: (y.value + height.value) + 'px',
        '--row-number': acitveItemKeybord.value.rowNumber || 4,
        '--column-number': acitveItemKeybord.value.columnNumber || 4,
    }
    console.log(popoverStyle.value);
    acitveItemKeybord.value = item
    console.log(itemsRef.value[index], x.value, y.value, height.value);
}
</script>
<style lang="scss" scoped>
.custom-toolbar {
    border-top: 1px solid #36333B;
    overflow: hidden;
    display: flex;
    gap: 8px;
    font-size: 12px;

    .item-box {
        display: flex;
        align-items: center;
        gap: 16px;

        .icon-box {
            display: flex;
            align-items: center;
        }


    }

    .button-list {
        background-color: #2D2A32;
        border-radius: 8px;
        width: 80vw;
        padding: 4px;
        display: grid;
        z-index: 8;
        grid-template-columns: repeat(var(--column-number), minmax(auto, 1fr));
        grid-template-rows: repeat(var(--row-number), minmax(auto, 1fr));
        justify-content: space-evenly;
        grid-column-gap: 4px;
        grid-row-gap: 4px;

        .keyboard-button-box {
            min-height: 40px;
        }
    }
}
</style>