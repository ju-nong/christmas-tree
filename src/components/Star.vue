<template>
    <p class="text-2xl" :class="`${props.twinkle ? 'star' : ''}`">🌟</p>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    twinkle: {
        type: Boolean,
        required: true,
    },
});
</script>

<style lang="scss"></style>
