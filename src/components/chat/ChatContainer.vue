<template>
    <div class="chat-container fixed bg-[#313338] z-[20] flex flex-col">
        <button
            class="chat-container-close fixed top-[20px] right-[16px] z-[30] w-[32px] h-[32px] items-center justify-center rounded-full"
            @click="emit('close')"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="#959595"
                viewBox="0 0 24 24"
                foundation="[object Object]"
                class="Iconstyled__Icon-sc-1iqwu2g-0 pJGcx"
                data-testid="bezier-react-icon"
                color="txt-black-darker"
                margintop="0"
                marginright="0"
                marginbottom="0"
                marginleft="0"
                aria-hidden="true"
            >
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M16.95 8.464a1 1 0 1 0-1.414-1.414L12 10.586 8.465 7.051A1 1 0 0 0 7.05 8.464L10.586 12 7.05 15.535a1 1 0 1 0 1.414 1.414L12 13.414l3.536 3.536a1 1 0 0 0 1.414-1.415L13.414 12l3.536-3.536Z"
                    clip-rule="evenodd"
                ></path>
            </svg>
        </button>

        <div class="chat-container-list relative overflow-hidden flex-1 w-full">
            <ChatList :triggerAddChat="triggerAddChat" :isOpen="props.isOpen" />
        </div>
        <ChatInput @onTriggerAddChat="triggerAddChat += 1" />
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

import { ChatList, ChatInput } from "./index";

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["close"]);

const triggerAddChat = ref(0);
</script>

<style lang="scss">
.chat-container {
    width: 390px;
    right: 50px;
    bottom: 116px;
    max-height: 690px;
    height: calc(100% - 136px);
    font-family: "Noto Sans";
    padding: 16px 8px 0px 8px;

    &-close {
        display: none;
        background-color: #313338;
    }
}

@media screen and (max-width: 500px) {
    .chat-container {
        bottom: 0;
        right: 0;
        width: 100%;
        max-height: 100%;
        height: 100%;
        border-radius: 0;

        &-close {
            display: flex;
        }
    }
}
</style>
