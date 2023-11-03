<template>
    <div
        class="chat-new cursor-pointer absolute bottom-0 left-0 w-full z-[25] items-center h-[38px] px-[16px] backdrop-blur-[4px]"
    >
        <div class="chat-new-profile flex items-center">
            <span class="font-bold text-[11px] whitespace-pre">Guest</span>
        </div>
        <p
            class="pl-[4px] flex-1 text-[#1e1e23] overflow-hidden whitespace-nowrap text-ellipsis text-[14px]"
        >
            안녕하세요
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

<script setup></script>

<style lang="scss">
.chat-new {
    background-color: rgba(222, 225, 229, 0.9);
    display: flex;
}
</style>
