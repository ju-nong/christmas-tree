<template>
    <div
        class="chat-new cursor-pointer absolute bottom-0 left-0 w-full z-[25] items-center h-[38px] px-[16px] backdrop-blur-[4px]"
        @click="emits('onScrollToBottom')"
    >
        <div class="chat-new-profile flex items-center">
            <span class="font-bold text-[11px] whitespace-pre">{{
                chat.nickname
            }}</span>
        </div>
        <p
            class="pl-[4px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis text-[14px]"
        >
            {{ chat.text }}
        </p>
        <button class="bg-none text-[#636369] rotate-90">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.793 4.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414-1.414L15.086 12 8.793 5.707a1 1 0 0 1 0-1.414Z"
                />
            </svg>
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
    chat: {
        type: Object,
        required: true,
    },
});
const chat = computed(() => props.chat);

const emits = defineEmits(["onScrollToBottom"]);
</script>

<style lang="scss">
.chat-new {
    background-color: rgba(103, 105, 114, 0.9);
    display: flex;
    color: #dbdee1;
}
</style>
