<template>
    <div class="diff-dates">
        <div class="tips-box">From</div>
        <input v-model="from" type="text">
        <div class="tips-box">To</div>
        <input v-model="to" type="text">

        <div class="tips-box">Difference</div>
        <div>{{ diffObject.years }} year; {{ diffObject.months }} months; {{ diffObject.days }} day</div>
        <div class="tips-box">{{ diffObject.totalDays }} days</div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import dayjsDuration from 'dayjs/plugin/duration';
import { evaluate } from '@/utils/mathUtil'
const from = ref('2026-03-17')
const to = ref('2027-08-18')

const diffObject = computed(() => {
    dayjs.extend(dayjsDuration);
    if (from.value && to.value) {
        let d1 = dayjs(from.value);
        let d2 = dayjs(to.value);
        const diff = dayjs.duration(d2.diff(d1));
        return {
            years: evaluate('abs(' + diff.years() + ')'),
            months: evaluate('abs(' + diff.months() + ')'),
            days: evaluate('abs(' + diff.days() + ')'),
            totalDays: evaluate('abs(' + d2.diff(d1, 'day') + ')')
        }
    } else {
        console.log("值为空");
    }
})
</script>
<style lang="scss" scoped>
.diff-dates {
    .tips-box {
        margin-top: 16px;
        margin-bottom: 8px;
        font-size: 12px;
        opacity: .70;
    }

    input {
        padding: 8px;
        border-radius: 8px;
    }
}
</style>