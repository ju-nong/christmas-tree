<template>
    <span
        :class="
            isDash ? 'text-white' : isZERO ? 'text-emerald-400' : 'text-red-400'
        "
        >{{ data }}</span
    >
</template>

<script setup>
import { defineProps, computed, toRefs } from "vue";

const props = defineProps({
    data: {
        type: String, // "-" or "0" or "1"
        required: true,
    },
});
const { data } = toRefs(props);

const isDash = computed(() => data.value === "-");
const isZERO = computed(() => data.value === "0");
</script>

<style lang="scss"></style>
