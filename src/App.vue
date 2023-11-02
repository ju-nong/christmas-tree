<template>
    <div
        class="w-[100vw] h-[100vh] flex justify-center items-center text-white text-center overflow-hidden"
    >
        <div class="tree flex flex-col items-center p-6">
            <div class="tree-header flex flex-col items-center">
                <Star :twinkle="twinkle" />
                <Floor v-for="(_, floor) in HEADER_FLOOR" :key="floor">
                    <Binary
                        v-for="(binary, index) in headerBinarys.slice(
                            floor * floor,
                            (floor + 1) * (floor + 1),
                        )"
                        :key="index"
                        :data="binary"
                    />
                </Floor>
            </div>
            <div class="tree-body text-yellow-300 w-[75px] break-all">
                {{ bodyBinarys }}
            </div>
            <div class="tree-footer font-black mt-[-6px]">
                <div
                    class="tree-footer-main cursor-pointer"
                    :class="{ on: twinkle }"
                    @click="handleTwinkle"
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
import { ref } from "vue";

import { Star, Floor, Binary } from "./components";

const UNIT = 6; // 2진수 단위
const HEADER_FLOOR = 17; // 이파리 층 수
const HEADER_BINARY_LENGTH = HEADER_FLOOR * HEADER_FLOOR; // 이파리 2진수 길이
const FOOTER_BINARY_LENGTH = 28; // 기둥 2진수 길이

const headerBinarys = ref(getRandomBinary(HEADER_BINARY_LENGTH));
const cloneHeaderBinarys = headerBinarys.value;
const bodyBinarys = ref(getRandomBinary(FOOTER_BINARY_LENGTH));

const twinkle = ref(false); // 반짝임 여부
const $interval = ref(); // interval 저장 변수

// 반짝반짝
function handleTwinkle() {
    const cloneTwinkle = twinkle.value;

    if (cloneTwinkle) {
        clearInterval($interval.value);

        headerBinarys.value = cloneHeaderBinarys; // 반짝일 때 중지할 수 있으니, 초기값으로 변경
    } else {
        $interval.value = setInterval(() => {
            headerBinarys.value = headerBinarys.value
                .split("")
                .map((binary) =>
                    binary === "-" ? "-" : binary === "0" ? "1" : "0",
                )
                .join("");
        }, 1000);
    }

    twinkle.value = !cloneTwinkle;
}

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
</script>

<style lang="scss">
.tree {
    &-footer {
        position: relative;

        &-main {
            transition: all 0.3s;

            &.on {
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
