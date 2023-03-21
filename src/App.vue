<template>
    <div
        class="container w-[100vw] h-[100vh] grid place-items-center text-white text-center"
    >
        <div class="tree flex flex-col items-center w-[320px] m-6">
            <div class="body-container flex flex-col items-center" :key="timer">
                <p class="star text-2xl">🌟</p>
                <p v-for="(count, index) in emptyArray" :key="index">
                    <span
                        v-for="(word, wordIndx) in words.slice(
                            0 + index * 4,
                            index * 6 + 1,
                        )"
                        :key="wordIndx"
                        :class="`${getColor(word)}`"
                        >{{ word }}</span
                    >
                </p>
            </div>
            <div
                class="pillar-container text-yellow-300 w-[100px] h-[90px] overflow-hidden"
            >
                {{ getRandomBinary(24) }}
            </div>
            <div class="text-container font-black">
                <p class="text-5xl">MERRY</p>
                <p class="text-[1.75rem] leading-4">CHRISTMAS</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

function getRandomBinary(size) {
    const UNIT = 6;
    let binary = "";
    for (let i = 1; i <= size; i++) {
        if (i % UNIT === 0) {
            binary += "-";
        } else {
            binary += Math.round(Math.random());
        }
    }
    return binary;
}

function getColor(word) {
    let color = "text-white";
    if (word === "0") {
        color = "text-emerald-400";
    } else if (word === "1") {
        color = "text-red-400";
    }

    return color;
}

const emptyArray = ref(Array.from({ length: 17 }).fill(0));
const words = ref(getRandomBinary(1000));
const timer = ref(0);

setInterval(() => {
    timer.value = timer.value + 1;
    words.value = getRandomBinary(1000);
}, 1000);
</script>

<style lang="postcss">
.star {
    animation-name: Sparkle;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}
</style>
