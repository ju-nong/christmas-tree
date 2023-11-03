<template>
    <ChatButton :isChatOpen="isChatOpen" @click="isChatOpen = !isChatOpen" />

    <Transition name="fade-slide" mode="out-in">
        <ChatContainer v-show="isChatOpen" @close="isChatOpen = false" />
    </Transition>
</template>

<script setup>
import { ref } from "vue";
import { ChatButton, ChatContainer } from "./index";

const isChatOpen = ref(false); // 채팅 열기
</script>

<style lang="scss"></style>
