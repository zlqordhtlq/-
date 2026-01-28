
import React, { useRef } from 'react';
import { CategoryInfo, PortfolioItem, PortfolioCategory } from '../types';

interface PortfolioSectionProps {
  categoryInfo: CategoryInfo;
  items: PortfolioItem[];
  index: number;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ categoryInfo, items }) => {
  const isShorts = categoryInfo.type === PortfolioCategory.SHORTS;
  const isVisual = categoryInfo.type === PortfolioCategory.THUMBNAIL || categoryInfo.type === PortfolioCategory.SUBTITLE_DESIGN;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const transformGoogleDriveLink = (url: string) => {
    if (!url || !url.includes('drive.google.com')) return url;
    const idMatch = url.match(/(?:id=|\/d\/|file\/d\/|open\?id=)([\w-]{25,})/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1200`;
    }
    return url;
  };

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const flattenedMedia = items.flatMap(item => 
    (item.media || []).map((m, idx) => ({
      id: `${item.id}-${idx}`,
      parentItem: item,
      title: item.title,
      url: m.url, // Original URL for clicking
      displayUrl: transformGoogleDriveLink(m.url),
      type: m.type
    }))
  ).filter(m => m.url);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = isShorts ? 320 : (isVisual ? 400 : 560);
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id={categoryInfo.type} className="group/section space-y-8 scroll-mt-32 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight text-white">{categoryInfo.type}</h3>
          <p className="text-gray-400 text-base max-w-xl font-light">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      <div className="relative group/scroll">
        {/* 네비게이션 화살표: 클릭으로 부드럽게 이동 */}
        {flattenedMedia.length > 0 && (
          <>
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover/section:opacity-100 transition-all hover:bg-[#ffa04d] hover:border-[#ffa04d] focus:outline-none hidden md:flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover/section:opacity-100 transition-all hover:bg-[#ffa04d] hover:border-[#ffa04d] focus:outline-none hidden md:flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </>
        )}

        {flattenedMedia.length > 0 ? (
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 orange-scrollbar snap-x scroll-smooth"
          >
            {flattenedMedia.map((media) => {
              const youtubeId = media.type === 'youtube' ? getYoutubeId(media.url) : null;
              const isVideoType = media.type === 'youtube' || media.type === 'video';
              const cardWidth = isShorts ? 'w-[240px] md:w-[320px]' : (isVisual ? 'w-[300px] md:w-[400px]' : 'w-[320px] md:w-[560px]');

              return (
                <div 
                  key={media.id} 
                  className={`group/card flex-none snap-start cursor-pointer ${cardWidth}`}
                  onClick={() => handleCardClick(media.url)}
                >
                  <div className={`relative ${isShorts ? 'aspect-[9/16]' : 'aspect-[16/9]'} overflow-hidden bg-[#141414] rounded-sm group shadow-2xl transition-all duration-300`}>
                    <div className="w-full h-full relative">
                      {media.type === 'youtube' && youtubeId ? (
                        <img 
                          src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`; }}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                          alt={media.title}
                        />
                      ) : (
                        <img 
                          src={media.displayUrl} 
                          alt={media.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                          onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             target.src = 'https://via.placeholder.com/800x450/141414/666666?text=Check+Link+Sharing+Status';
                          }}
                        />
                      )}
                      {isVideoType && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                          <div className="w-12 h-12 rounded-full bg-[#ffa04d] flex items-center justify-center shadow-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                          </div>
                        </div>
                      )}
                      {/* 카드 클릭 유도 오버레이 */}
                      <div className="absolute inset-0 bg-[#ffa04d]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                  <div className="mt-4 px-1">
                    <h4 className="text-lg font-semibold text-white group-hover/card:text-[#ffa04d] transition-colors truncate">{media.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-white/5 rounded-sm">
            <p className="text-gray-600 font-light text-sm italic">업로드된 포트폴리오가 없습니다.</p>
          </div>
        )}
      </div>
      <style>{`
        /* 커스텀 스크롤바 */
        .orange-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .orange-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }
        .orange-scrollbar::-webkit-scrollbar-thumb {
          /* 반투명 주황색 */
          background: rgba(255, 160, 77, 0.45);
          border-radius: 10px;
          transition: background 0.3s;
        }
        .orange-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 160, 77, 0.8);
        }
        
        /* [핵심] 브라우저 기본 스크롤바 화살표 버튼을 강제로 숨김 */
        .orange-scrollbar::-webkit-scrollbar-button {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .orange-scrollbar::-webkit-scrollbar-button:start:decrement,
        .orange-scrollbar::-webkit-scrollbar-button:end:increment {
          display: none !important;
        }

        .orange-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 160, 77, 0.45) transparent;
        }
      `}</style>
    </section>
  );
};

export default PortfolioSection;
