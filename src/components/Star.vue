<template>
    <p class="text-2xl" :class="`${twinkle ? 'star' : ''}`">🌟</p>
</template>

<script setup>
import { defineProps } from "vue";

const { twinkle } = defineProps({
    twinkle: {
        type: Boolean,
        required: true,
    },
});
</script>

<style lang="scss"></style>
