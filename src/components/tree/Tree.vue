<template>
    <div
        class="w-full h-full flex justify-center items-center text-white text-center overflow-hidden"
    >
        <div class="tree flex flex-col items-center">
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
            <div class="tree-body text-yellow-300">
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
                <div
                    class="tree-footer-guide absolute top-[50%] right-0 pointer-events-none"
                >
                    <span class="tree-footer-guide-click">👈 Click me!</span>
                    <span class="tree-footer-guide-touch">👈 Touch me!</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

import { Star, Floor, Binary } from "./index";

const UNIT = 6; // 2진수 단위
const HEADER_FLOOR = 17; // 이파리 층 수
const HEADER_BINARY_LENGTH = HEADER_FLOOR * HEADER_FLOOR; // 이파리 2진수 길이
const FOOTER_BINARY_LENGTH = UNIT * 4 + 4; // 기둥 2진수 길이

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
    &-body {
        width: 75px;
        font-size: 1rem;
        line-height: 1.5rem;
    }

    &-footer {
        position: relative;

        &-main {
            transition: all 0.3s;

            &.on {
                text-shadow: 0 0 10px #ffffff;
            }

            p {
                &:nth-child(1) {
                    font-size: 3rem;
                    line-height: 1;
                }

                &:nth-child(2) {
                    font-size: 1.75rem;
                    line-height: 1rem;
                }
            }
        }

        &-guide {
            transform: translate(130%, -50%);
            animation: FooterGuide;
            animation-duration: 2.5s;
            animation-iteration-count: infinite;
            font-size: 1rem;
            line-height: 1.5rem;
        }
    }
}

@media screen and (max-width: 500px) {
    .tree {
        &-body {
            width: 33.6px;
            font-size: 0.5rem;
            line-height: 0.75rem;
        }

        &-footer {
            &-main {
                p {
                    &:nth-child(1) {
                        font-size: 1.5rem;
                        line-height: 1.75rem;
                    }

                    &:nth-child(2) {
                        font-size: 0.875rem;
                        line-height: 0.25rem;
                    }
                }
            }

            &-guide {
                font-size: 0.5rem;
                line-height: 0.75rem;
            }
        }
    }
}

// 마우스가 있을 때
@media (pointer: fine) {
    .tree-footer-guide {
        &-click {
            display: block;
        }

        &-touch {
            display: none;
        }
    }
}

// 터치스크린일 때
@media (pointer: coarse) {
    .tree-footer-guide {
        &-click {
            display: none;
        }

        &-touch {
            display: block;
        }
    }
}
</style>
