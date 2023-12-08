<template>
    <div class="chat-input">
        <div class="chat-input-container">
            <textarea
                v-model="$text"
                :placeholder="`${nickname}(으)로 메시지 작성`"
                @input="handleInput"
                @keydown="handleKeydown"
            />
        </div>
        <button class="chat-input-send" :disabled="!$trimText" @click="addChat">
            작성
        </button>
    </div>
</template>

<script setup>
import { ref, computed, defineEmits, onBeforeMount } from "vue";

import { storeToRefs } from "pinia";
import { useUser } from "../../stores";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const emit = defineEmits(["handleTriggerAddChat"]);

const user = useUser();
const { nickname, userAgent } = storeToRefs(user);
const isMobile = ref(false);

const $text = ref("");
const $trimText = computed(() => $text.value.trim());

// 채팅 추가
async function addChat() {
    emit("onTriggerAddChat");

    const cloneText = $trimText.value;
    $text.value = "";

    await addDoc(collection(db, "chat"), {
        createAt: new Date(),
        text: cloneText,
        nickname: nickname.value,
        userAgent: userAgent.value,
    });
}

// 모바일인지 확인
const handleCheckMobile = () =>
    navigator.userAgent.indexOf("IEMobile") !== -1 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
    );

// 조합문자 첫 글자 입력 때문에
const handleInput = (event) => ($text.value = event.target.value);

// Enter 입력
function handleKeydown(event) {
    const { isComposing, key, shiftKey } = event;

    // 조합문자
    if (isComposing) {
        return;
    }

    // Enter
    if (key == "Enter") {
        // [PC] Shift + Enter 줄바꿈이거나 [Mobile]일 대
        if (shiftKey || isMobile.value) {
            return;
        }

        event.preventDefault();
        addChat();
    }
}

onBeforeMount(() => {
    isMobile.value = handleCheckMobile();
});
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
        margin-left: 8px;
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
