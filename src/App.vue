<template>
    <div
        class="w-[100vw] h-[100vh] flex justify-center items-center text-white text-center overflow-hidden"
    >
        <div class="tree flex flex-col items-center p-6">
            <div class="body-container flex flex-col items-center">
                <p class="text-2xl" :class="`${glitter ? 'star' : ''}`">🌟</p>
                <p v-for="(_, row) in rows" :key="row">
                    <span
                        v-for="(binary, index) in binarys.slice(
                            row * row,
                            (row + 1) * (row + 1),
                        )"
                        :key="index"
                        :class="`${getColor(binary)} `"
                        >{{ binary }}</span
                    >
                </p>
            </div>
            <div
                class="pillar-container text-yellow-300 w-[75px] h-[90px] break-all"
            >
                {{ pillar }}
            </div>
            <div class="text-container font-black">
                <div
                    class="text-content cursor-pointer"
                    :class="`${glitter ? 'on' : ''}`"
                    @click="glitter = !glitter"
                >
                    <p class="text-5xl">MERRY</p>
                    <p class="text-[1.75rem] leading-4">CHRISTMAS</p>
                </div>
                <span
                    class="click-over-guide absolute top-[50%] right-0 pointer-events-none"
                    >👈 Click me!</span
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const UNIT = 6; // 2진수 단위
const LENGTH = 17; // 몸통 길이
const SIZE = LENGTH * LENGTH; // 2진수 길이

const rows = ref(Array.from({ length: LENGTH }).fill(0)); // 몸통 길이만큼 반복할 빈배열
const pillar = ref(getRandomBinary(28)); // 기둥
const binarys = ref(getRandomBinary(SIZE)); // 몸통에 쓰일 2진수 문자열

const glitter = ref(false); // 반짝임 여부
const interval = ref(); // interval 저장 변수

// 2진수 문자열 생성
function getRandomBinary(size) {
    let binary = "";

    for (let i = 1; i <= size; i++) {
        binary += Math.round(Math.random());

        if (i % UNIT === 0) {
            binary += "-";
            i += 1;
        }
    }
    return binary;
}

// -(하얀색), 0(초록색), 1(빨간색)
function getColor(word) {
    let color = "text-white";

    if (word === "0") {
        color = "text-emerald-400";
    } else if (word === "1") {
        color = "text-red-400";
    }

    return color;
}

watch(glitter, (to, from) => {
    if (to) {
        interval.value = setInterval(() => {
            binarys.value = getRandomBinary(SIZE);
        }, 1000);
    } else {
        clearInterval(interval.value);
    }
});
</script>

<style lang="postcss">
.star {
    animation-name: Shining;
    animation-duration: 1s;
    animation-iteration-count: infinite;

    text-shadow: #fc0 0 0 10px;
}

.text-container {
    position: relative;
}

.text-container .text-content {
    transition: all 0.3s;
}

.text-container .text-content.on {
    text-shadow: 0 0 10px #ffffff;
}

.text-container .click-over-guide {
    transform: translate(130%, -50%);

    animation: ClickMe;
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
}
</style>
