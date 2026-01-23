<template>
    <div class="more-box">
        <SvgIcon class="svg-box" name="more" @click="emits('more-click', false)" :size="14" color="#fff"
            style="padding: 10px 12px" />
        <div class="menu-list">
            <div class="sub-menu" v-for="item in moreList" :key="item.name">
                <div class="menu-item group-name"> {{ item.name }}</div>
                <div class="menu-item" v-for="child in item.children" :key="child.name" :class="getMenuItemClass(child)"
                    @click="handleClick(child)"> {{ child.name }}</div>
            </div>
        </div>
        <div class="setting-box">

            <div class="button">
                <SvgIcon class="svg-box" name="setting" :size="14" color="#fff" style="padding: 2px 8px" />
                <div>设置</div>
            </div>

        </div>

    </div>
</template>
<script setup>
import { defineModel } from 'vue'



const emits = defineEmits(['more-click'])
const activeMenu = defineModel('activeMenu')
const moreList = [
    {
        name: '计算器',
        children: [
            {
                name: '标准',
                key: "standard"
            },
            {
                name: '科学',
                key: 'scientific'
            },
            {
                name: '绘图',
                disabled: true,
            },
            {
                name: '程序员',
                disabled: true,
            },
            {
                name: '日期计算',
                disabled: true,
            }
        ]
    },
    {
        name: '转换器',
        children: [
            {
                name: '货币',
                disabled: true,
            },
            {
                name: '体积',
                disabled: true,
            },
            {
                name: '长度',
                disabled: true,
            },
            {
                name: '重量',
                disabled: true,
            },
            {
                name: '温度',
                disabled: true,
            },
            {
                name: '能量',
                disabled: true,
            },
            {
                name: '面积',
                disabled: true,
            },
            {
                name: '速度',
                disabled: true,
            },
            {
                name: '时间',
                disabled: true,
            },
            {
                name: '功率',
                disabled: true,
            },
            {
                name: '数据',
                disabled: true,
            },
            {
                name: '压强',
                disabled: true,
            },
            {
                name: '角度',
                disabled: true,
            },

        ]
    }
]

/**
 *  动态获取class
 * @param item 
 */
const getMenuItemClass = (item) => {
    return [activeMenu.value == (item.key || item.name) ? 'active' : '', item.disabled ? 'disabled' : 'menu-item-content']
}
/**
 *  点击事件
 * @param item 
 */
const handleClick = (item) => {
    activeMenu.value = item.key || item.name;
    emits('more-click', false)
}
</script>

<style lang="scss" scoped>
.more-box {
    background-color: #2D2A32;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 8px 0;
    font-size: 14px;

    .menu-list {
        height: calc(100% - 90px);
        overflow: auto;
        padding: 4px;
        position: relative;

        .group-name {
            opacity: .70;
        }

        .menu-item {
            position: relative;
            padding: 8px;
            margin-bottom: 4px;
            border-radius: 4px;

        }

        .menu-item-content {

            &:hover,
            &.active {
                background-color: #36333B;



            }

            &.active {
                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 3px;
                    height: 40%;
                    transform: translate(0%, 65%);
                    background-color: #fff;
                    border-radius: 8px;
                }
            }
        }
    }

    .setting-box {
        border-top: 1px solid #36333B;
        height: 56px;
        padding: 12px 4px 4px 4px;

        .button {
            align-items: center;
            display: flex;
            padding: 8px;
            border-radius: 4px;

            &:hover {
                background-color: #36333B;
            }
        }
    }

}
</style>