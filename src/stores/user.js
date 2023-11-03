import { defineStore } from "pinia";

export default defineStore("userStore", {
    state: () => ({
        nickname: "익명",
        userAgent: "",
    }),
    actions: {
        login(nickname) {
            this.nickname = nickname;
            this.userAgent = navigator.userAgent;
        },
    },
});
