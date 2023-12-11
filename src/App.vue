<template>
    <Tree @onChangeTwinkle="handleChangeTwinkle" />
    <Chat :twinkle="twinkle" />
    <SpeedInsights />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getNickname } from "./utils";
import { useUser } from "./stores";
import { Tree, Chat } from "./components";
import { SpeedInsights } from "@vercel/speed-insights/vue";

const user = useUser();

const twinkle = ref(false);

function handleChangeTwinkle(state) {
    twinkle.value = state;
}

onBeforeMount(async () => {
    const nickname = await getNickname();

    if (nickname) {
        user.login(nickname);
    }
});
</script>

<style lang="scss"></style>
