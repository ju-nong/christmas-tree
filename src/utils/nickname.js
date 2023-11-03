import { db } from "../firebase";

import { collection, doc, getDocs, setDoc, addDoc } from "firebase/firestore";

// 닉네임 구조 "형용사 음식"

// 배열 길이
const LENGTH = 20;

// 형용사
const ADJECTIVES = [
    "근면한",
    "성실한",
    "유쾌한",
    "호기심 많은",
    "쾌활한",
    "끈기있는",
    "창의적인",
    "열정적인",
    "침착한",
    "유능한",
    "명랑한",
    "용감한",
    "정직한",
    "기발한",
    "영리한",
    "고집스러운",
    "평온한",
    "행복한",
    "신중한",
    "매력적인",
];

// 음식
const FOODS = [
    "장어",
    "초밥",
    "스테이크",
    "파스타",
    "피자",
    "라면",
    "샐러드",
    "케이크",
    "샌드위치",
    "아이스크림",
    "햄버거",
    "삼겹살",
    "빵",
    "초콜릿",
    "타코",
    "김밥",
    "소시지",
    "치즈",
    "마카롱",
    "떡볶이",
];

// 랜덤 인덱스 추출
const getRandomIndex = () => Math.floor(Math.random() * LENGTH);

// 랜덤 닉네임 추출
const getRandomNickname = () =>
    `${ADJECTIVES[getRandomIndex()]} ${FOODS[getRandomIndex()]}`;

// 등록된 닉네임 문서들 불러오기
async function getNicknameDocs() {
    const querySnapshot = await getDocs(collection(db, "nicknames")); // nicknames 컬렉션에 문서들 불러오기

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // 문서 배열 중에서 nickname 필드만 남기기
}

// 닉네임 등록
function setNickname(nickname) {
    const time = new Date();

    addDoc(collection(db, "nicknames"), {
        nickname,
        createAt: time,
        lastActive: time,
        userAgent: navigator.userAgent,
    });
}

// 로그인
function login(docId) {
    const $doc = doc(db, "nicknames", docId);

    setDoc(
        $doc,
        {
            lastActive: new Date(),
        },
        { merge: true },
    );
}

// 닉네임 추출
async function getNickname() {
    let nickname = localStorage.getItem("nickname");
    const nicknameDocs = await getNicknameDocs();

    // 로컬스토리지에 저장된 닉네임이 없을 시
    if (!nickname) {
        const nicknames = nicknameDocs.map((doc) => doc.nickname);

        for (let i = 0; i < LENGTH * LENGTH; i++) {
            nickname = getRandomNickname();

            if (!nicknames.includes(nickname)) {
                localStorage.setItem("nickname", nickname);
                setNickname(nickname);

                break;
            }
        }
    } else {
        // 닉네임과 매치되는 문서
        const matchDoc = nicknameDocs.filter(
            (doc) => doc.nickname === nickname,
        );

        // 로컬스토리지에는 저장되어 있는데 매치되는 문서가 없을 경우, 로컬스토리지 변조
        if (!matchDoc.length) {
            return "";
        }

        login(matchDoc[0].id);
    }

    return nickname;
}

export { getNickname };
