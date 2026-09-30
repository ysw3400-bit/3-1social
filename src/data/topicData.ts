import { CustomTopic } from '../types';

export interface TopicConfig {
  id: CustomTopic;
  name: string;
  emoji: string;
  badgeText: string;
  pastSubtitle: string;
  presentSubtitle: string;
  explore: {
    past: {
      title: string;
      items: { icon: string; label: string; detail: string }[];
    };
    present: {
      title: string;
      items: { icon: string; label: string; detail: string }[];
    };
  };
  changedCards: {
    id: string;
    icon: string;
    title: string;
    past: string;
    present: string;
  }[];
  whyCards: {
    id: string;
    icon: string;
    title: string;
    explanation: string;
  }[];
  quickReasons: string[];
  stayedHearts: {
    id: string;
    icon: string;
    title: string;
    detail: string;
  }[];
  quickStayedSentences: string[];
}

export const TOPIC_DATA: Record<CustomTopic, TopicConfig> = {
  wedding: {
    id: 'wedding',
    name: '결혼식',
    emoji: '💍',
    badgeText: '사회 3학년 • 옛날과 오늘날의 결혼식',
    pastSubtitle: '집 마당 전통 혼례',
    presentSubtitle: '현대 예식장',
    explore: {
      past: {
        title: '옛날 결혼식',
        items: [
          { icon: '👕', label: '옷', detail: '신랑은 사모관대, 신부는 활옷과 족두리, 연지곤지' },
          { icon: '🏠', label: '장소', detail: '집 마당에 멍석을 깔고 차린 초례청' },
          { icon: '💍', label: '결혼하는 방법', detail: '신랑이 나무 기러기를 전하고, 신랑 신부가 맞절을 함' },
          { icon: '👨‍👩‍👧', label: '생활 모습', detail: '온 마을 사람들과 일가친척이 함께 모여 잔치함' },
        ],
      },
      present: {
        title: '오늘날 결혼식',
        items: [
          { icon: '👕', label: '옷', detail: '신랑은 멋진 턱시도, 신부는 순백의 웨딩드레스와 면사포' },
          { icon: '🏠', label: '장소', detail: '전문 예식장(웨딩홀), 호텔, 야외 공원 등' },
          { icon: '💍', label: '결혼하는 방법', detail: '사회자의 진행, 축가, 결혼반지 교환, 행진' },
          { icon: '👨‍👩‍👧', label: '생활 모습', detail: '가족, 친척, 친한 친구와 지인을 초대하여 축하함' },
        ],
      },
    },
    changedCards: [
      {
        id: 'clothes',
        icon: '👕',
        title: '옷',
        past: '사모관대, 활옷과 족두리',
        present: '턱시도 양복, 하얀 웨딩드레스',
      },
      {
        id: 'place',
        icon: '🏠',
        title: '장소',
        past: '집 마당의 전통 초례청',
        present: '전문 예식장이나 호텔',
      },
      {
        id: 'ceremony',
        icon: '💍',
        title: '결혼하는 방법',
        past: '기러기 전하기, 맞절, 표주박 잔',
        present: '사회자 진행, 축가, 반지 교환',
      },
      {
        id: 'lifestyle',
        icon: '👨‍👩‍👧',
        title: '생활 모습',
        past: '온 동네 사람들과 친척 잔치',
        present: '초대받은 가족과 친구들의 축하',
      },
    ],
    whyCards: [
      {
        id: 'people_life',
        icon: '👨‍👩‍👧',
        title: '사람들의 생활 모습이 달라졌어요.',
        explanation: '도시나 아파트에 살게 되고, 집 마당보다 편리한 예식장을 쓰게 되었어요.',
      },
      {
        id: 'choice_variety',
        icon: '🙋',
        title: '사람들이 선택하는 방법이 다양해졌어요.',
        explanation: '자신만의 개성과 취향에 맞게 원하는 방식을 자유롭게 고를 수 있어요.',
      },
      {
        id: 'living_method',
        icon: '🏠',
        title: '생활하는 방법이 달라졌어요.',
        explanation: '교통과 시설이 편리해지고, 더 편리하고 빠른 방법을 찾게 되었어요.',
      },
      {
        id: 'new_lifestyle',
        icon: '💡',
        title: '새로운 생활 모습이 생겼어요.',
        explanation: '새로운 옷(웨딩드레스, 양복)과 문화가 널리 퍼져 익숙해졌어요.',
      },
    ],
    quickReasons: [
      '도시와 아파트에 살면서 마당이 없어지고 편리한 예식장을 이용하게 되었기',
      '사람들의 직업과 생활 방식이 다양해지고 더 편리한 방법을 찾기',
      '자신만의 개성과 취향에 맞게 원하는 방식을 자유롭게 선택하기',
      '새로운 문화와 편리한 시설이 널리 생겨났기',
    ],
    stayedHearts: [
      {
        id: 'together',
        icon: '❤️',
        title: '가족과 함께하고 싶은 마음',
        detail: '가장 소중한 사람들과 하나가 되어 서로를 아끼고 사랑해요.',
      },
      {
        id: 'gratitude',
        icon: '🙏',
        title: '가족과 조상에게 감사하는 마음',
        detail: '나를 낳아주시고 길러주신 부모님과 어른들께 고마움을 전해요.',
      },
      {
        id: 'happiness',
        icon: '😊',
        title: '가족이 행복하기를 바라는 마음',
        detail: '새로운 가정을 이루는 두 사람이 앞으로 기쁨 가득하길 빌어요.',
      },
      {
        id: 'joy',
        icon: '🎉',
        title: '함께 즐거운 시간을 보내고 싶은 마음',
        detail: '이웃과 친척들이 다 함께 모여 축하하고 웃음을 나누어요.',
      },
    ],
    quickStayedSentences: [
      '가족이 행복하고 건강하게 살기를 바라는',
      '새로운 시작을 함께 축하하고 축복해 주는',
      '부모님과 소중한 분들께 감사를 드리는',
      '서로 사랑하고 곁에서 힘이 되어주는',
    ],
  },
  chuseok: {
    id: 'chuseok',
    name: '추석',
    emoji: '🌕',
    badgeText: '사회 3학년 • 옛날과 오늘날의 추석 풍습',
    pastSubtitle: '달맞이와 온 가족 송편 빚기',
    presentSubtitle: '가족 모임과 명절 휴식',
    explore: {
      past: {
        title: '옛날 추석',
        items: [
          { icon: '👕', label: '옷', detail: '추석 빔으로 곱게 지은 한복을 차려입음' },
          { icon: '🥟', label: '음식 (송편)', detail: '온 가족이 둘러앉아 솔잎을 깔고 직접 송편을 빚음' },
          { icon: '🌕', label: '장소와 놀이', detail: '마당에서 보름달 보며 소원 빌기, 강강술래, 씨름' },
          { icon: '👨‍👩‍👧', label: '생활 모습', detail: '고향 마을에 온 일가친척이 모여 며칠 동안 잔치함' },
        ],
      },
      present: {
        title: '오늘날 추석',
        items: [
          { icon: '👕', label: '옷', detail: '활동하기 편한 일상복이나 깔끔한 나들이 옷을 입음' },
          { icon: '🥟', label: '음식 (송편)', detail: '떡집·마트에서 사거나 간편식·밀키트를 활용함' },
          { icon: '🚗', label: '장소와 활동', detail: '거실에서 모여 대화, 가족 여행, 영화 관람, 화상 통화' },
          { icon: '👨‍👩‍👧', label: '생활 모습', detail: '가족 방문, 짧은 연휴 휴식, 여행 등 다양하게 보냄' },
        ],
      },
    },
    changedCards: [
      {
        id: 'clothes',
        icon: '👕',
        title: '옷',
        past: '곱게 차려입은 전통 한복',
        present: '편안한 일상복과 나들이 옷',
      },
      {
        id: 'food',
        icon: '🥟',
        title: '음식 (송편)',
        past: '솔잎을 따서 온 가족이 직접 빚음',
        present: '떡집·마트에서 사거나 간편식 이용',
      },
      {
        id: 'activities',
        icon: '🌕',
        title: '장소와 놀이',
        past: '달맞이, 강강술래, 동네 씨름',
        present: '거실 모임, 가족 여행, 영화, 여가',
      },
      {
        id: 'lifestyle',
        icon: '👨‍👩‍👧',
        title: '생활 모습',
        past: '온 친척이 고향 집에 며칠간 모임',
        present: '가족 방문, 짧은 휴식, 여행 등 다양함',
      },
    ],
    whyCards: [
      {
        id: 'people_life',
        icon: '👨‍👩‍👧',
        title: '사람들의 생활 모습이 달라졌어요.',
        explanation: '가족 수가 줄어들고(핵가족), 도시에 흩어져 살게 되었어요.',
      },
      {
        id: 'choice_variety',
        icon: '🙋',
        title: '명절을 보내는 방법이 다양해졌어요.',
        explanation: '고향 방문뿐만 아니라 가족 여행이나 휴식을 자유롭게 선택해요.',
      },
      {
        id: 'living_method',
        icon: '🏠',
        title: '생활하는 방법이 편리해졌어요.',
        explanation: '방앗간, 떡집, 마트가 생겨 음식을 쉽게 구입할 수 있게 되었어요.',
      },
      {
        id: 'new_lifestyle',
        icon: '💡',
        title: '새로운 명절 문화와 여가가 생겼어요.',
        explanation: '연휴 동안 재충전을 위해 휴식과 문화생활을 즐기는 문화가 생겼어요.',
      },
    ],
    quickReasons: [
      '방앗간과 마트가 생겨서 음식을 직접 빚지 않고 편리하게 살 수 있게 되었기',
      '가족들이 멀리 떨어져 살면서 연휴를 여행이나 휴식으로 다양하게 보내기',
      '바쁜 일상 속에서 가족들이 서로 부담 없이 편안하게 쉬고 싶기',
      '생활 방식과 교통이 편리해져서 명절을 보내는 모습이 달라졌기',
    ],
    stayedHearts: [
      {
        id: 'together',
        icon: '❤️',
        title: '가족과 함께하고 싶은 마음',
        detail: '오랜만에 가족과 친척이 만나 따뜻한 정을 나누어요.',
      },
      {
        id: 'gratitude',
        icon: '🙏',
        title: '조상과 부모님께 감사하는 마음',
        detail: '한 해 동안 풍성한 곡식을 얻고 건강하게 자라게 해주신 은혜에 감사해요.',
      },
      {
        id: 'happiness',
        icon: '😊',
        title: '가족이 건강하고 평안하기를 바라는 마음',
        detail: '보름달을 보며 우리 가족 모두가 아프지 않고 행복하길 빌어요.',
      },
      {
        id: 'joy',
        icon: '🎉',
        title: '함께 맛있는 음식을 나누며 즐거운 마음',
        detail: '송편과 과일을 서로 나누어 먹으며 즐겁게 웃어요.',
      },
    ],
    quickStayedSentences: [
      '오랜만에 가족이 모여 반갑게 정을 나누는',
      '한 해 동안 농사지은 은혜와 부모님께 감사하는',
      '가족 모두가 아프지 않고 건강하게 지내기를 바라는',
      '맛있는 음식을 나누며 함께 웃고 즐거워하는',
    ],
  },
};
