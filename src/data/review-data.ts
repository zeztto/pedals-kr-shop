import type { Review } from '@/lib/types';

export const reviews: Review[] = [
  {
    id: 'r1',
    name: { ko: '김재현', en: 'Jaehyun Kim' },
    role: { ko: '세션 기타리스트', en: 'Session Guitarist' },
    comment: {
      ko: 'Hellfire의 게인 구조가 마샬 플렉시 느낌이 확 나요. 이 가격에 이 정도 톤을 내는 부띠끄 페달은 처음입니다. 라이브에서 매일 쓰고 있어요.',
      en: 'The gain structure of the Hellfire nails that Marshall Plexi feel. First boutique pedal at this price point that delivers this tone. I use it every gig.',
    },
    avatar: '/images/avatars/avatar-1.jpg',
  },
  {
    id: 'r2',
    name: { ko: '박수진', en: 'Sujin Park' },
    role: { ko: '인디 밴드 기타리스트', en: 'Indie Band Guitarist' },
    comment: {
      ko: 'Analog Chorus의 BBD 톤이 진짜 따뜻해요. 클린 톤에 걸면 사운드가 입체적으로 살아나는 게 느껴집니다. 녹음할 때도 라이브 때도 빠지지 않는 페달이에요.',
      en: 'The BBD tone on the Analog Chorus is genuinely warm. When applied to a clean tone, you can feel the sound come alive in three dimensions. Never leaves my board, studio or stage.',
    },
    avatar: '/images/avatars/avatar-2.jpg',
  },
  {
    id: 'r3',
    name: { ko: '이동훈', en: 'Donghun Lee' },
    role: { ko: '프로듀서 겸 기타리스트', en: 'Producer & Guitarist' },
    comment: {
      ko: 'Tape Echo를 걸고 녹음하면 진짜 빈티지 테이프 머신 앞에 앉아 있는 것 같아요. 플러그인으로는 절대 못 내는 질감이 있습니다. 프로덕션 퀄리티가 확 달라져요.',
      en: 'Recording with the Tape Echo feels like sitting in front of a real vintage tape machine. There\'s a texture that plugins simply can\'t replicate. Completely elevates the production quality.',
    },
    avatar: '/images/avatars/avatar-3.jpg',
  },
  {
    id: 'r4',
    name: { ko: '최민석', en: 'Minseok Choi' },
    role: { ko: '메탈 밴드 리드 기타', en: 'Metal Band Lead Guitarist' },
    comment: {
      ko: 'Fuzz War의 거친 톤이 저희 밴드 사운드에 딱 맞습니다. 드롭 튜닝에서도 저음이 뭉치지 않고 단단하게 잡혀요. 게인을 올려도 피킹 뉘앙스가 살아있는 게 인상적이에요.',
      en: 'The raw tone of the Fuzz War fits our band\'s sound perfectly. Low end stays tight even in drop tuning. Impressive how picking nuances come through even at high gain.',
    },
    avatar: '/images/avatars/avatar-4.jpg',
  },
];
