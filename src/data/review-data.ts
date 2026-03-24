import type { Review } from '@/lib/types';

export const reviews: Review[] = [
  {
    id: 'r1',
    name: { ko: '김재현', en: 'Jaehyun Kim' },
    role: { ko: '세션 기타리스트', en: 'Session Guitarist' },
    comment: {
      ko: 'Hellfire의 게인 구조가 정말 마샬 플렉시와 닮았어요. 부띠끄 페달 중 이 가격대에서는 최고입니다.',
      en: 'The gain structure of the Hellfire really resembles a Marshall Plexi. Best in this price range among boutique pedals.',
    },
    avatar: '/images/avatars/avatar-1.svg',
  },
  {
    id: 'r2',
    name: { ko: '박수진', en: 'Sujin Park' },
    role: { ko: '인디 밴드 기타리스트', en: 'Indie Band Guitarist' },
    comment: {
      ko: 'Analog Chorus의 BBD 톤이 너무 좋아요. 라이브에서 쓰면 사운드가 한 단계 올라갑니다.',
      en: 'The BBD tone of the Analog Chorus is incredible. Using it live takes the sound to another level.',
    },
    avatar: '/images/avatars/avatar-2.svg',
  },
  {
    id: 'r3',
    name: { ko: '이동훈', en: 'Donghun Lee' },
    role: { ko: '프로듀서 & 기타리스트', en: 'Producer & Guitarist' },
    comment: {
      ko: 'Tape Echo로 녹음하면 빈티지 테이프 머신 느낌이 그대로 납니다. 프로덕션 퀄리티가 확 달라져요.',
      en: 'Recording with the Tape Echo captures the exact feel of a vintage tape machine. It completely changes the production quality.',
    },
    avatar: '/images/avatars/avatar-3.svg',
  },
  {
    id: 'r4',
    name: { ko: '최민석', en: 'Minseok Choi' },
    role: { ko: '메탈 밴드 리드 기타', en: 'Metal Band Lead Guitarist' },
    comment: {
      ko: 'Fuzz War의 거친 사운드가 우리 밴드 톤에 딱 맞아요. 튜닝을 내려도 저음이 뭉치지 않습니다.',
      en: 'The raw sound of the Fuzz War fits our band\'s tone perfectly. Even with dropped tuning, the low end stays tight.',
    },
    avatar: '/images/avatars/avatar-4.svg',
  },
];
