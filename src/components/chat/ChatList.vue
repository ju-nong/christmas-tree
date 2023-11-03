<template>
    <ul
        class="chat-list w-full h-full flex flex-col gap-y-[4px] list-none overflow-x-hidden overflow-y-scroll"
    ></ul>
</template>

<script setup></script>

<style lang="scss">
.chat-list {
    overflow-anchor: none;
    overscroll-behavior: none;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(204, 204, 204);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    > li {
        width: 100%;
        padding-left: 32px;
        display: flex;
        position: relative;
        column-gap: 6px;
        align-items: flex-end;

        &.first {
            margin-top: 16px;
            padding-top: 16px;
        }

        > p {
            max-width: 565px;
            padding: 9px 12px;
            font-size: 13px;
            line-height: 16px;
            border-radius: 21px;
            background-color: rgb(243, 244, 248);
            word-break: break-word;
            word-wrap: break-word;
            white-space: pre-wrap;
            color: rgb(30, 30, 35);
        }

        > span {
            line-height: 12px;
            font-size: 10px;
            color: rgb(118, 118, 120);
            margin-bottom: 4px;
            white-space: nowrap;
        }
    }
}
</style>
