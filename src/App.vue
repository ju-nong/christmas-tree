<template>
    <Tree />
    <Chat />
</template>

<script setup>
import { onBeforeMount } from "vue";
import { getNickname } from "./utils";
import { useUser } from "./stores";
import { Tree, Chat } from "./components";

const user = useUser();

onBeforeMount(async () => {
    const nickname = await getNickname();

    if (nickname) {
        user.login(nickname);
    }
});
</script>

<style lang="scss"></style>
