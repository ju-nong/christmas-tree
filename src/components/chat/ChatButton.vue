<template>
    <button
        class="fixed p-[8px] rounded-[24px] bg-[#313338] z-[10]"
        :class="{ hide: hide }"
    >
        <img
            v-if="isChatOpen"
            src="/images/ic-chat-close.svg"
            alt="채팅 닫기 아이콘"
        />
        <img v-else src="/images/ic-chat.svg" alt="채팅 아이콘" />
    </button>
</template>

<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
    hide: {
        type: Boolean,
        default: false,
    },
    isChatOpen: {
        type: Boolean,
        required: true,
    },
});

const { hide, isChatOpen } = toRefs(props);
</script>

<style lang="scss" scoped>
button {
    right: 50px;
    bottom: 50px;
    transition: opacity 0.5s;

    &:active {
        transform: scale(0.9);
    }

    &.hide {
        pointer-events: none;
        opacity: 0;
    }
}

@media screen and (max-width: 500px) {
    button {
        bottom: 25px;
        right: 25px;
    }
}
</style>
