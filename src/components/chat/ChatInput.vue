<template>
    <div class="chat-input">
        <div class="chat-input-container">
            <textarea placeholder="익명으로 메시지 작성" />
        </div>
        <button class="chat-input-send">작성</button>
    </div>
</template>

<script setup></script>

<style lang="scss">
.chat-input {
    display: flex;
    border-top: 0.5px solid rgba(0, 0, 0, 0.1);
    padding: 16px 0px 16px 8px;

    &-container {
        padding-left: 8px;
        flex: 1;

        > textarea {
            border: none;
            outline: none;
            width: 100%;
            resize: none;
        }
    }

    &-send {
        width: 74px;
        height: 30px;
        margin: 0px 8px;
        border-radius: 6px;
        background-color: #1a88e9;
        color: #fff;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;

        &:disabled {
            background-color: rgb(243, 244, 248);
            color: rgba(0, 0, 0, 0.1);
            cursor: auto;
        }
    }
}
</style>
