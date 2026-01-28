
export interface MediaItem {
  url: string;
  type: 'image' | 'video' | 'youtube';
}

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  title: string;
  description: string;
  media: MediaItem[];
}

export enum PortfolioCategory {
  WEB_VARIETY = '웹 예능',
  INFO_VIDEO = '정보 영상',
  SHORTS = 'Shorts',
  INTRO_OUTRO = '인·아웃트로',
  THUMBNAIL = '썸네일',
  SUBTITLE_DESIGN = '자막 디자인'
}

export interface CategoryInfo {
  type: PortfolioCategory;
  description: string;
}
