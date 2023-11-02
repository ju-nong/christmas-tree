<template>
    <button class="fixed p-[8px] rounded-[24px] bg-white z-[10]">
        <img
            v-if="props.isChatOpen"
            src="/images/ic-chat-close.svg"
            alt="채팅 닫기 아이콘"
        />
        <img v-else src="/images/ic-chat.svg" alt="채팅 아이콘" />
    </button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    isChatOpen: {
        type: Boolean,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
button {
    right: 50px;
    bottom: 50px;

    &:active {
        transform: scale(0.9);
    }
}

@media screen and (max-width: 500px) {
    button {
        bottom: 25px;
        right: 25px;
    }
}
</style>
