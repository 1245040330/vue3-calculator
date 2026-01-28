<template>
    <div class="custom-toolbar" ref="toolbarRef">
        <div class="item-box" v-for="(item, index) in customToolbar" :key="item.key || item.name" ref="itemsRef"
            @click="handleClick(item, index)">
            <div class="icon-box">
                <component v-if="item.iconComponent" :is="item.iconComponent"></component>
                <span v-if="item.latex" v-html="renderKeyboardLabel(item)"></span>
            </div>

            {{ $t(item.name) }}
        </div>
        <div class="button-list" :style="popoverStyle" style="position: fixed; " v-if="showPopover">
            <KeyboardButton v-for="(itemKeyboard, itemKeyboardIndex) in acitveItemKeybord.keyboardList"
                v-if="acitveItemKeybord.keyboardList && acitveItemKeybord.keyboardList.length > 0"
                :is-active="activeKeyboardObject[itemKeyboard.key]" :key="itemKeyboardIndex"
                @click="handleClickKeyboard(itemKeyboard, index)">
                <component v-if="renderComponents(itemKeyboard, activeKeyboardObject)"
                    :is="renderComponents(itemKeyboard, activeKeyboardObject)"> </component>
                <div v-else v-html="renderKeyboardLabel(itemKeyboard, activeKeyboardObject)"></div>
            </KeyboardButton>
        </div>


    </div>
</template>
<script setup>
import KeyboardButton from "./keyboardButton.vue";
import { useTemplateRef, ref, nextTick } from 'vue';
import { useElementBounding, onClickOutside } from '@vueuse/core'
import { renderKeyboardLabel, renderComponents, getActiveKeyboardList } from '@/utils/mathUtil'
const emits = defineEmits(['handle-key-press'])
const props = defineProps({
    customToolbar: {
        type: Array,
        default: () => []
    },
    popoverHeight: {
        type: String,
        default: '100px'
    }
})
const itemsRef = useTemplateRef('itemsRef');
const toolbarRef = useTemplateRef('toolbarRef');

const activeKeyboardObject = ref({})

const popoverStyle = ref({
    top: '0px',
});
const showPopover = ref(false)
const acitveItemKeybord = ref({})
//点击元素以外的盒子
onClickOutside(toolbarRef, event => {
    showPopover.value = false;
})
const handleClick = (item, index) => {
    showPopover.value = false;
    if(item.key== acitveItemKeybord.value.key){
        acitveItemKeybord.value = {}
        return;
    }
    acitveItemKeybord.value = item
    nextTick(() => {
        acitveItemKeybord.value.keyboardList.forEach(keyboardItem => {
            if (keyboardItem.isActiveButton) {
                activeKeyboardObject.value[keyboardItem.key || keyboardItem.label] = false
            }

        });
        const { x, y, top, right, bottom, left, width, height }
            = useElementBounding(itemsRef.value[index])
        popoverStyle.value = {
            left: 0 + 'px',
            top: (y.value + height.value) + 'px',
            '--row-number': acitveItemKeybord.value.rowNumber || 4,
            '--column-number': acitveItemKeybord.value.columnNumber || 4,
            height: props.popoverHeight,
        }
        console.log(popoverStyle.value);

        console.log(itemsRef.value[index], x.value, y.value, height.value);
        showPopover.value = true;
    })

}
const handleClickKeyboard = (item, index) => {
    let { label, key: keyValue } = item;
    Object.keys(activeKeyboardObject.value).forEach(activeKeyboardKey => {
        if (activeKeyboardObject.value[activeKeyboardKey] && item[activeKeyboardKey]) {
            label = item[activeKeyboardKey].label;
            keyValue = item[activeKeyboardKey].key;
        }
    })
    let selectKeyboardList = getActiveKeyboardList(activeKeyboardObject.value);
    if (item[selectKeyboardList.join("")]) {
        label = item[selectKeyboardList.join("")].label
        keyValue = item[selectKeyboardList.join("")].key
    }
    const value = keyValue || label;
    if (Object.keys(activeKeyboardObject.value).includes(value)) {
        activeKeyboardObject.value[value] = !activeKeyboardObject.value[value]
    }
    emits("handle-key-press", { ...{ label, key: value }, prefix: 'custom-toolbar-' + acitveItemKeybord.value.key })
}
</script>
<style lang="scss" scoped>
.custom-toolbar {
    border-top: 1px solid var(--line-color);
    overflow: hidden;
    display: flex;
    gap: 8px;
    font-size: 12px;
    padding: 4px 0;

    .item-box {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 0 8px;
        border-radius: 4px;

        &:hover {
            background-color: var(--bg-2-color);
        }

        .icon-box {
            display: flex;
            align-items: center;
        }


    }

    .button-list {
        background-color: var(--popover-bg-color);
        border-radius: 8px;
        width: 90vw;
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