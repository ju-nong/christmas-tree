<template>
    <div
        class="w-[100vw] h-[100vh] flex justify-center items-center text-white text-center overflow-hidden"
    >
        <div class="tree flex flex-col items-center p-6">
            <div class="tree-header flex flex-col items-center">
                <Star :twinkle="glitter" />
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
            <div class="tree-body text-yellow-300 w-[75px] break-all">
                {{ pillar }}
            </div>
            <div class="tree-footer font-black mt-[-6px]">
                <div
                    class="tree-footer-main cursor-pointer"
                    :class="`${glitter ? 'on' : ''}`"
                    @click="glitter = !glitter"
                >
                    <p class="text-5xl">MERRY</p>
                    <p class="text-[1.75rem] leading-4">CHRISTMAS</p>
                </div>
                <span
                    class="tree-footer-guide absolute top-[50%] right-0 pointer-events-none"
                    >👈 Click me!</span
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

import { Star } from "./components";

const UNIT = 6; // 2진수 단위
const HEADER_FLOOR = 17; // 이파리 층 수
const HEADER_BINARY_LENGTH = HEADER_FLOOR * HEADER_FLOOR; // 이파리 2진수 길이
const FOOTER_BINARY_LENGTH = 28; // 기둥 2진수 길이

const rows = ref(Array.from({ length: HEADER_FLOOR }).fill(0)); // 몸통 길이만큼 반복할 빈배열
const binarys = ref(getRandomBinary(HEADER_BINARY_LENGTH));
const pillar = ref(getRandomBinary(FOOTER_BINARY_LENGTH));

const glitter = ref(false); // 반짝임 여부
const interval = ref(); // interval 저장 변수

// 2진수 문자열 생성
function getRandomBinary(len) {
    let binary = "";

    for (let i = 1; i <= len; i++) {
        binary += Math.round(Math.random());

        if (i % UNIT === 0) {
            binary += "-";
            len--;
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
            binarys.value = binarys.value
                .split("")
                .map((binary) =>
                    binary === "-" ? "-" : binary === "0" ? "1" : "0",
                )
                .join(""); // on/off
            // binarys.value = getRandomBinary(SIZE);   // new binarys
        }, 1000);
    } else {
        clearInterval(interval.value);
    }
});
</script>

<style lang="scss">
.tree {
    &-footer {
        position: relative;

        &-main {
            transition: all 0.3s;

            *.on {
                text-shadow: 0 0 10px #ffffff;
            }
        }

        &-guide {
            transform: translate(130%, -50%);
            animation: ClickMe;
            animation-duration: 2.5s;
            animation-iteration-count: infinite;
        }
    }
}
</style>
