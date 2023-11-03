<template>
    <p>
        <slot />
    </p>
</template>

<script setup></script>

<style lang="scss">
p {
    font-size: 1rem;
    line-height: 1.5rem;
}

@media screen and (max-width: 500px) {
    p {
        font-size: 0.5rem;
        line-height: 0.75rem;
    }
}
</style>
