<template>
    <ul
        class="chat-list w-full h-full flex flex-col gap-y-[4px] list-none overflow-x-hidden overflow-y-scroll pb-[8px]"
        ref="$list"
        @scroll="handleScroll"
    >
        <ChatLoader v-if="config.isTop" />
        <ChatItem
            v-for="(chat, index) in chats"
            :key="[chat.id, chats[index + 1]]"
            :chat="chat"
            :beforeChat="chats[index - 1] || null"
            :afterChat="chats[index + 1] || null"
        />
    </ul>

    <ChatNewNotice
        v-if="!!newChat"
        :chat="newChat"
        @onScrollToBottom="handleScrollToBottom"
    />
</template>

<script setup>
import {
    ref,
    reactive,
    onBeforeMount,
    onBeforeUnmount,
    watch,
    defineProps,
    toRefs,
    nextTick,
} from "vue";

import { ChatItem, ChatLoader, ChatNewNotice } from "./index";

import { db } from "../../firebase";
import {
    query,
    collection,
    orderBy,
    startAfter,
    limit,
    onSnapshot,
    getDocs,
} from "firebase/firestore";

const LIMIT = 30;

const props = defineProps({
    triggerAddChat: {
        type: Number,
        required: true,
    },
    isOpen: {
        type: Boolean,
        required: true,
    },
});
const { triggerAddChat, isOpen } = toRefs(props);

// 채팅 스냅샷
const unsubscribe = ref(null);

// 이전 채팅 문서
const beforeDoc = ref(null);

// 채팅
const chats = ref([]);
const newChat = ref(null);

// 채팅 리스트 엘리먼트
const $list = ref();

// config
const config = reactive({
    init: true, // 최초 실행
    isTop: false, // 스크롤이 맨 상단인지
    isBottom: false, // 스크롤이 맨 하단인지
    isEnd: false, // 마지막 채팅인지
    cloneTriggerAddChat: false, // 채팅 추가 Trigger
    prevScrollHeight: 0, // 이전 ScrollHeight
});

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

// 이전 채팅 가져오기
async function getBeforeChat() {
    const { docs } = await getDocs(getQuery("before"));

    if (docs.length) {
        const reversedBeforeChat = docs.reverse();

        chats.value = [
            ...reversedBeforeChat.map((chat) => ({
                id: chat.id,
                ...chat.data(),
            })),
            ...chats.value,
        ];

        beforeDoc.value = reversedBeforeChat[0];
    } else {
        config.isEnd = true;
        config.isTop = false;

        alert("마지막입니다");
    }
}

function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = $list.value;

    config.isBottom = scrollHeight - clientHeight - 50 <= scrollTop;

    if (config.isBottom) {
        newChat.value = null;
    }

    // 맨 위
    if (!scrollTop && !config.init && !config.isEnd) {
        config.isTop = true;
        config.prevScrollHeight = scrollHeight;

        getBeforeChat();
    }
}

// 스크롤 맨 하단으로 이동
function handleScrollToBottom() {
    if ($list.value) {
        $list.value.scrollTop = $list.value.scrollHeight;
    }
}

watch(chats, async (to) => {
    if (to.length && $list.value) {
        const { init, isTop, isBottom, cloneTriggerAddChat, prevScrollHeight } =
            config;

        // init이거나 직접 추가 했을 때
        if (init || cloneTriggerAddChat || isBottom) {
            if (init || cloneTriggerAddChat) {
                config.init = false;
                config.cloneTriggerAddChat = false;
            }

            await nextTick();
            $list.value.scrollTop = $list.value.scrollHeight;

            newChat.value = null;
        } else if (isTop) {
            // 맨 상단일 때
            config.isTop = false;

            await nextTick();
            $list.value.scrollTop = $list.value.scrollHeight - prevScrollHeight;
        } else if (!isBottom) {
            newChat.value = chats.value.at(-1) || null;
        }
    }
});

watch(triggerAddChat, () => {
    config.cloneTriggerAddChat = true;
});

watch(isOpen, async (to) => {
    if (to) {
        await nextTick();
        $list.value.scrollTop = $list.value.scrollHeight;
    }
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
    unsubscribe.value();
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
        display: flex;
        position: relative;
        column-gap: 6px;
        align-items: flex-end;

        &.first {
            margin-top: 16px;
            padding-top: 16px;
        }

        &.mine {
            padding-left: 0px;
            justify-content: flex-end;

            > div {
                display: none;
            }

            > p {
                order: 2;
            }

            > span {
                order: 1;
            }
        }

        .nickname {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;

            > span {
                font-size: 11px;
                line-height: 13px;
                color: rgb(30, 30, 35);
            }
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
