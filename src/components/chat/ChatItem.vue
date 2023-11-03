<template>
    <li :class="[{ first: showNickname }, { mine: isMine }]">
        <div v-if="showNickname" class="nickname">
            <span>{{ chat.nickname }}</span>
        </div>
        <p>{{ chat.text }}</p>
        <span v-if="showDate">{{ formatCreateAt }}</span>
    </li>
</template>

<script setup>
import { defineProps, toRefs } from "vue";

import { useUser } from "../../stores";

import dayjs from "dayjs";

const props = defineProps({
    chat: {
        type: Object,
        required: true,
    },
    beforeChat: {
        type: Object,
        required: false,
    },
    afterChat: {
        type: Object,
        required: false,
    },
});

const { chat, beforeChat, afterChat } = toRefs(props);

const user = useUser();

// date formatting
const formatDate = (timestamp) => dayjs(timestamp.toDate()).format("A h:mm");

// 등록일
const formatCreateAt = formatDate(chat.value.createAt);

// 닉네임 보여줄지
const showNickname =
    beforeChat.value === null ||
    chat.value.nickname !== beforeChat.value.nickname;

// 시간 보여줄지
const showDate =
    afterChat.value === null ||
    formatCreateAt !== formatDate(afterChat.value.createAt);

// 내 채팅인지
const isMine = chat.value.nickname === user.nickname;
</script>

<style lang="scss"></style>
