<template>
    <li class="justify-center !pl-0">
        <span class="w-[30px] h-[30px] rounded-[50%] relative"></span>
    </li>
</template>

<script setup></script>

<style lang="scss" scoped>
li {
    span {
        animation: rotate 1s linear infinite;

        &::before {
            content: "";
            box-sizing: border-box;
            position: absolute;
            inset: 0px;
            border-radius: 50%;
            border: 3px solid rgb(222, 225, 229);
            animation: prixClipFix 2s linear infinite;
        }
    }
}
</style>
