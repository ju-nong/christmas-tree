<template>
    <p :class="`${props.twinkle ? 'star' : ''}`">🌟</p>
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

<style lang="scss" scoped>
p {
    font-size: 1.5rem;
    line-height: 2rem;
}

@media screen and (max-width: 500px) {
    p {
        font-size: 1rem;
        line-height: 1.75rem;
    }
}
</style>
