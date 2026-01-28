import { PortfolioCategory, CategoryInfo, PortfolioItem } from './types';

export const CATEGORY_DETAILS: CategoryInfo[] = [
  {
    type: PortfolioCategory.WEB_VARIETY,
    description: '리듬감 있는 컷 편집과 센스있는 자막으로 유쾌한 웹 예능 영상'
  },
  {
    type: PortfolioCategory.INFO_VIDEO,
    description: '복잡한 내용을 빠르게 이해시키는 정보 전달형 영상'
  },
  {
    type: PortfolioCategory.SHORTS,
    description: '훅부터 마무리까지 구성 있는 숏폼'
  },
  {
    type: PortfolioCategory.INTRO_OUTRO,
    description: '콘텐츠 정체성을 만드는 인·아웃트로'
  },
  {
    type: PortfolioCategory.THUMBNAIL,
    description: '클릭을 유도하는 썸네일 디자인'
  },
  {
    type: PortfolioCategory.SUBTITLE_DESIGN,
    description: '가독성과 분위기를 모두 잡는 커스텀 자막 디자인'
  }
];

export const INITIAL_ITEMS: PortfolioItem[] = [
  // 웹 예능
  { id: 'wv1', category: PortfolioCategory.WEB_VARIETY, title: '[경북도청] 보이소TV - 상주 차박 편', description: '', media: [{ url: 'https://youtu.be/z6y3UDyh3uw', type: 'youtube' }] },
  { id: 'wv2', category: PortfolioCategory.WEB_VARIETY, title: '[수영] 비대면 토크쇼 - 광희 편', description: '', media: [{ url: 'https://youtu.be/7wSv4GHjv1s', type: 'youtube' }] },
  { id: 'wv3', category: PortfolioCategory.WEB_VARIETY, title: '[정호연] 호여니의 호주머니 - 제작진 편', description: '', media: [{ url: 'https://youtu.be/ehBpOmsLI2Q', type: 'youtube' }] },
  { id: 'wv4', category: PortfolioCategory.WEB_VARIETY, title: '[SK에코플랜트] 지구소녀 - 전자폐기물 편', description: '', media: [{ url: 'https://youtu.be/_xha4aebt0c', type: 'youtube' }] },
  { id: 'wv5', category: PortfolioCategory.WEB_VARIETY, title: '[국가인적자원개발컨소시엄] 미래공작소 - 현대중공업 기술교육원 편', description: '', media: [{ url: 'https://youtu.be/2TF0VK-Ynk4', type: 'youtube' }] },
  { id: 'wv6', category: PortfolioCategory.WEB_VARIETY, title: '[대성마이맥] 문이 없는 스튜디오 - 이명학 T 편', description: '', media: [{ url: 'https://youtu.be/0YkpyxD4y-M', type: 'youtube' }] },

  // 정보영상
  { id: 'iv1', category: PortfolioCategory.INFO_VIDEO, title: '[KOTRA] 디지털 마케팅 플랫폼', description: '', media: [{ url: 'https://youtu.be/U3TRrDpgugI', type: 'youtube' }] },
  { id: 'iv2', category: PortfolioCategory.INFO_VIDEO, title: '[경기도 GSEEK] 디지털 성범죄', description: '', media: [{ url: 'https://youtu.be/NJ4GUX8efx0', type: 'youtube' }] },
  { id: 'iv3', category: PortfolioCategory.INFO_VIDEO, title: '[경기도 GSEEK] 인구 교육', description: '', media: [{ url: 'https://youtu.be/k_G39evGElY', type: 'youtube' }] },
  { id: 'iv4', category: PortfolioCategory.INFO_VIDEO, title: '[경기도 GSEEK] 생애주기별 안전교육', description: '', media: [{ url: 'https://youtu.be/U3CA2QsNb4c', type: 'youtube' }] },
  { id: 'iv5', category: PortfolioCategory.INFO_VIDEO, title: '[KOTRA] 신북방지역 소비시장 변화', description: '', media: [{ url: 'https://youtu.be/DLrxveYFzDM', type: 'youtube' }] },
  { id: 'iv6', category: PortfolioCategory.INFO_VIDEO, title: '[한신대학교] 전공 소개 영상 - 영미문화학 전공', description: '', media: [{ url: 'https://youtu.be/2aFduLApiBs', type: 'youtube' }] },
  { id: 'iv7', category: PortfolioCategory.INFO_VIDEO, title: '[에이스병원] 뼈 때리는 이야기 - 수술 vs 비수술 편', description: '', media: [{ url: 'https://youtu.be/lu5aSTYBW6g', type: 'youtube' }] },

  // Shorts
  { id: 'sh1', category: PortfolioCategory.SHORTS, title: '[SSG] 산지직송 - 사과 편', description: '', media: [{ url: 'https://youtube.com/shorts/E1orhjPxU8Y', type: 'youtube' }] },
  { id: 'sh2', category: PortfolioCategory.SHORTS, title: '[SSG] 산지직송 - 새우 편', description: '', media: [{ url: 'https://youtube.com/shorts/3RUZg4ZTPGY', type: 'youtube' }] },
  { id: 'sh3', category: PortfolioCategory.SHORTS, title: '[건물주 성공학] 합본', description: '', media: [{ url: 'https://youtube.com/shorts/uPuArbXSMUk', type: 'youtube' }] },
  { id: 'sh4', category: PortfolioCategory.SHORTS, title: '[스킬즈퓨처] 합본', description: '', media: [{ url: 'https://youtube.com/shorts/9iq7TmMWlLU', type: 'youtube' }] },
  { id: 'sh5', category: PortfolioCategory.SHORTS, title: '빵빵덕 Reels', description: '', media: [{ url: 'https://youtube.com/shorts/j5cNPlYRdQo', type: 'youtube' }] },

  // 인아웃트로
  { id: 'io1', category: PortfolioCategory.INTRO_OUTRO, title: '[인·아웃트로] 합본', description: '', media: [{ url: 'https://youtu.be/h5a__yadWAU', type: 'youtube' }] },

  // 썸네일 (구글 드라이브)
  { id: 'th1', category: PortfolioCategory.THUMBNAIL, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/1EyP1Z1cI-NXlZXH0_dtHMOuW95Swfhqq/view', type: 'image' }] },
  { id: 'th2', category: PortfolioCategory.THUMBNAIL, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/1wsmYh3Z2Ld5d39-xQRobmc86J_kiYsnk/view', type: 'image' }] },
  { id: 'th3', category: PortfolioCategory.THUMBNAIL, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/1qzyBUBKySWnb40UKkGN8or6V4qU6FDHM/view', type: 'image' }] },
  { id: 'th4', category: PortfolioCategory.THUMBNAIL, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/1ssIieAgs2dRgDaLMx_DUEyL_Dl1o6z7r/view', type: 'image' }] },

  // 자막 디자인 (구글 드라이브)
  { id: 'sd1', category: PortfolioCategory.SUBTITLE_DESIGN, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/1FVDj6exwdDPUs4oFc5a06Pb3v1dYcOsM/view', type: 'image' }] },
  { id: 'sd2', category: PortfolioCategory.SUBTITLE_DESIGN, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/16i1ZGgpf-1aEScFTWC_mlOSBwy-02yxL/view', type: 'image' }] },
  { id: 'sd3', category: PortfolioCategory.SUBTITLE_DESIGN, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/1rq_2hZyAvq92NHnGayET8gjE9MQwNv1O/view', type: 'image' }] },
  { id: 'sd4', category: PortfolioCategory.SUBTITLE_DESIGN, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/16WQHS0vqEYhtKTp4N9clUYnDK5_PPHV7/view', type: 'image' }] },
  { id: 'sd5', category: PortfolioCategory.SUBTITLE_DESIGN, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/1jghJu0O5G6eOcTyJOo00GDYPQEE5l8r1/view', type: 'image' }] },
  { id: 'sd6', category: PortfolioCategory.SUBTITLE_DESIGN, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/1hqc0GbEoVKfS868uCx8fsvjM3EUT-LQW/view', type: 'image' }] },
  { id: 'sd7', category: PortfolioCategory.SUBTITLE_DESIGN, title: ' ', description: '', media: [{ url: 'https://drive.google.com/file/d/13pNAkAwwK3p74nlH1wd1sfI3uZ8o347_/view', type: 'image' }] },
];