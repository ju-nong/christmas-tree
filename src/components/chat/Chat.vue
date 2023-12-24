<template>
  <ChatButton
    :hide="twinkle"
    :isChatOpen="isChatOpen"
    @click="isChatOpen = !isChatOpen"
  />

  <Transition name="fade-slide" mode="out-in">
    <ChatContainer
      v-show="isChatOpen"
      :isOpen="isChatOpen"
      @close="isChatOpen = false"
    />
  </Transition>

  <div class="copyright" :class="twinkle ? 'hide' : ''">
    © 2023
    <a href="https://github.com/ju-nong/birthday-gift-generator" target="_blank"
      >ju-nong</a
    >. All rights reserved.
  </div>
</template>

<script setup>
import { ref, toRefs, defineProps, watch } from "vue";
import { ChatButton, ChatContainer } from "./index";

const props = defineProps({
  twinkle: {
    type: Boolean,
    default: false,
  },
});
const { twinkle } = toRefs(props);

const isChatOpen = ref(false); // 채팅 열기

watch(twinkle, (to) => {
  if (to) {
    isChatOpen.value = false;
  }
});
</script>

<style lang="scss"></style>
