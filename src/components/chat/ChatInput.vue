<template>
    <div class="chat-input">
        <div class="chat-input-container">
            <textarea
                v-model="$text"
                :placeholder="`${nickname}(으)로 메시지 작성`"
                @keydown="handleKeydown"
            />
        </div>
        <button class="chat-input-send" :disabled="!$trimText" @click="addChat">
            작성
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

import { storeToRefs } from "pinia";
import { useUser } from "../../stores";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const user = useUser();
const { nickname, userAgent } = storeToRefs(user);

const $text = ref("");
const $trimText = computed(() => $text.value.trim());

// 채팅 추가
async function addChat() {
    await addDoc(collection(db, "chat"), {
        createAt: new Date(),
        text: $trimText.value,
        nickname: nickname.value,
        userAgent: userAgent.value,
    });

    $text.value = "";
}

// Enter 입력
function handleKeydown(event) {
    const { isComposing, key, shiftKey } = event;

    // 조합문자
    if (isComposing) {
        return;
    }

    // 줄바꿈
    if (key === "Enter" && shiftKey) {
        return;
    }

    if (event.key === "Enter" && $trimText.value) {
        event.preventDefault();
        addChat();
    }
}
</script>

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
