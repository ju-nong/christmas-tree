<template>
    <span
        :class="
            isDash ? 'text-white' : isZERO ? 'text-emerald-400' : 'text-red-400'
        "
        >{{ data }}</span
    >
</template>

<script setup>
import { defineProps, computed } from "vue";

const { data } = defineProps({
    data: {
        type: String, // "-" or "0" or "1"
        required: true,
    },
});

const isDash = computed(() => data === "-");
const isZERO = computed(() => data === "0");
</script>

<style lang="scss"></style>
