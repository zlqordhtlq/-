
import { PortfolioCategory, CategoryInfo, PortfolioItem } from './types';

export const CATEGORY_DETAILS: CategoryInfo[] = [
  {
    type: PortfolioCategory.WEB_VARIETY,
    description: '리듬감 있는 컷 편집과 센스있는 자막으로 유쾌한 웹 예능 영상 편집'
  },
  {
    type: PortfolioCategory.INFO_VIDEO,
    description: '복잡한 내용을 빠르게 이해시키는 정보 전달형 영상 편집'
  },
  {
    type: PortfolioCategory.SHORTS,
    description: '훅부터 마무리까지 구조가 있는 숏폼'
  },
  {
    type: PortfolioCategory.INTRO_OUTRO,
    description: '콘텐츠 정체성을 만드는 인·아웃트로'
  },
  {
    type: PortfolioCategory.THUMBNAIL,
    description: '클릭을 유도하는 시각적 썸네일 디자인'
  },
  {
    type: PortfolioCategory.SUBTITLE_DESIGN,
    description: '가독성과 무드를 모두 잡는 커스텀 자막 디자인'
  }
];

export const INITIAL_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    category: PortfolioCategory.WEB_VARIETY,
    title: '웹 예능 - [청춘여행]',
    description: '',
    media: [
      { url: 'https://images.unsplash.com/photo-1492691523567-6170c3295ed2?auto=format&fit=crop&q=80&w=800', type: 'image' },
      { url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800', type: 'image' }
    ]
  },
  {
    id: '2',
    category: PortfolioCategory.INFO_VIDEO,
    title: '금융 지식 - [머니톡]',
    description: '',
    media: [
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', type: 'image' }
    ]
  },
  {
    id: '3',
    category: PortfolioCategory.SHORTS,
    title: '데일리 룩북 #1',
    description: '',
    media: [
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', type: 'image' },
      { url: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=800', type: 'image' }
    ]
  },
  {
    id: '4',
    category: PortfolioCategory.INTRO_OUTRO,
    title: '브랜드 시그니처 인트로',
    description: '',
    media: [
      { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800', type: 'image' }
    ]
  },
  {
    id: '5',
    category: PortfolioCategory.THUMBNAIL,
    title: '유튜브 메인 썸네일',
    description: '',
    media: [
      { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', type: 'image' }
    ]
  },
  {
    id: '6',
    category: PortfolioCategory.SUBTITLE_DESIGN,
    title: '커스텀 자막 프리셋',
    description: '',
    media: [
      { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', type: 'image' }
    ]
  }
];
