<template>
    <ul
        class="chat-list w-full h-full flex flex-col gap-y-[4px] list-none overflow-x-hidden overflow-y-scroll"
    ></ul>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount, watch } from "vue";

import { db } from "../../firebase";
import {
    query,
    collection,
    orderBy,
    startAfter,
    limit,
    onSnapshot,
} from "firebase/firestore";

const LIMIT = 30;

// 채팅 스냅샷
const unsubscribe = ref(null);

// 이전 채팅 문서
const beforeDoc = ref(null);

// 채팅
const chats = ref([]);

// 최신 및 이전 채팅가져오는 쿼리 추출
function getQuery(type) {
    switch (type) {
        case "basic":
            return query(
                collection(db, "chat"),
                orderBy("createAt", "desc"),
                limit(LIMIT),
            );
        case "before":
            return query(
                collection(db, "chat"),
                orderBy("createAt", "desc"),
                startAfter(beforeDoc.value),
                limit(LIMIT),
            );
    }
}

watch(chats, (to, from) => {
    console.log(to);
});

onBeforeMount(() => {
    unsubscribe.value = onSnapshot(getQuery("basic"), (snapshot) => {
        const changes = snapshot.docChanges();
        const reversedChanges = changes.reverse();

        // init
        if (!beforeDoc.value) {
            chats.value = [
                ...chats.value,
                ...reversedChanges.map((chat) => ({
                    id: chat.doc.id,
                    ...chat.doc.data(),
                })),
            ];

            beforeDoc.value = reversedChanges[0].doc;
        } else {
            // new chat
            const newChatDocs = [];

            for (let i = 0; i < reversedChanges.length; i++) {
                const { type, doc } = reversedChanges[i];

                if (type === "added") {
                    newChatDocs.push(doc);
                }
            }

            chats.value = [
                ...chats.value,
                ...newChatDocs.map((chat) => ({ id: chat.id, ...chat.data() })),
            ];
        }
    });
});

onBeforeUnmount(() => {
    unsubscribe();
});
</script>

<style lang="scss">
.chat-list {
    overflow-anchor: none;
    overscroll-behavior: none;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(204, 204, 204);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    > li {
        width: 100%;
        padding-left: 32px;
        display: flex;
        position: relative;
        column-gap: 6px;
        align-items: flex-end;

        &.first {
            margin-top: 16px;
            padding-top: 16px;
        }

        > p {
            max-width: 565px;
            padding: 9px 12px;
            font-size: 13px;
            line-height: 16px;
            border-radius: 21px;
            background-color: rgb(243, 244, 248);
            word-break: break-word;
            word-wrap: break-word;
            white-space: pre-wrap;
            color: rgb(30, 30, 35);
        }

        > span {
            line-height: 12px;
            font-size: 10px;
            color: rgb(118, 118, 120);
            margin-bottom: 4px;
            white-space: nowrap;
        }
    }
}
</style>
