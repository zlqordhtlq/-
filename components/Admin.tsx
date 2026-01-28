
import React, { useState } from 'react';
import { PortfolioItem, PortfolioCategory, CategoryInfo, MediaItem } from '../types';

interface AdminProps {
  isOpen: boolean;
  onClose: () => void;
  items: PortfolioItem[];
  categories: CategoryInfo[];
  onUpdateItems: (updater: PortfolioItem[] | ((prev: PortfolioItem[]) => PortfolioItem[])) => void;
  onUpdateCategories: (categories: CategoryInfo[]) => void;
}

const Admin: React.FC<AdminProps> = ({ isOpen, onClose, items, categories, onUpdateItems, onUpdateCategories }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'items' | 'categories'>('items');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<PortfolioCategory | 'ALL'>('ALL');
  const [editingItem, setEditingItem] = useState<Partial<PortfolioItem> | null>(null);

  const transformGoogleDriveLink = (url: string) => {
    if (!url || !url.includes('drive.google.com')) return url;
    const idMatch = url.match(/(?:id=|\/d\/|file\/d\/|open\?id=)([\w-]{25,})/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1200`;
    }
    return url;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1598') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // 삭제 기능 강화: 즉시 필터링 후 부모 상태 및 로컬 스토리지 강제 동기화
  const handleDeleteItem = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까? 삭제 즉시 데이터가 영구적으로 제거됩니다.')) {
      // Functional Update를 사용하여 최신 상태 기반으로 삭제 처리
      onUpdateItems((currentItems) => {
        // id를 문자열로 변환하여 안전하게 비교
        const updatedList = currentItems.filter(item => String(item.id) !== String(id));
        
        // 브라우저 저장소(LocalStorage)에 즉시 강제 저장하여 "되살아남" 방지
        localStorage.setItem('ahyun_portfolio_items', JSON.stringify(updatedList));
        
        return updatedList;
      });
    }
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    onUpdateItems((prevItems) => {
      const index = prevItems.findIndex(item => item.id === id);
      if (index === -1) return prevItems;
      
      const nextItems = [...prevItems];
      if (direction === 'up' && index > 0) {
        [nextItems[index], nextItems[index - 1]] = [nextItems[index - 1], nextItems[index]];
      } else if (direction === 'down' && index < nextItems.length - 1) {
        [nextItems[index], nextItems[index + 1]] = [nextItems[index + 1], nextItems[index]];
      } else {
        return prevItems;
      }
      localStorage.setItem('ahyun_portfolio_items', JSON.stringify(nextItems));
      return nextItems;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 0.3 * 1024 * 1024) {
        alert("파일 용량 초과 (300KB 제한). 구글 드라이브 링크를 권장합니다.");
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleMediaChange(index, 'url', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaChange = (index: number, field: keyof MediaItem, value: string) => {
    if (!editingItem) return;
    const currentMedia = [...(editingItem.media || [])];
    let processedValue = value;
    let newType = currentMedia[index]?.type || 'image';
    
    if (field === 'url' && !value.startsWith('data:')) {
      processedValue = transformGoogleDriveLink(value);
      if (value.includes('drive.google.com')) newType = 'image';
      else if (value.includes('youtube.com') || value.includes('youtu.be')) newType = 'youtube';
    }
    
    currentMedia[index] = { ...currentMedia[index], [field]: processedValue, type: newType };
    setEditingItem({ ...editingItem, media: currentMedia });
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.category || !editingItem?.media) return;

    onUpdateItems((prevItems) => {
      let nextItems;
      if (editingItem.id) {
        nextItems = prevItems.map(i => i.id === editingItem.id ? { ...i, ...editingItem } as PortfolioItem : i);
      } else {
        const newItem: PortfolioItem = {
          id: Date.now().toString(),
          title: editingItem.title,
          category: editingItem.category as PortfolioCategory,
          media: editingItem.media as MediaItem[],
          description: editingItem.description || '',
        };
        nextItems = [newItem, ...prevItems];
      }
      localStorage.setItem('ahyun_portfolio_items', JSON.stringify(nextItems));
      return nextItems;
    });
    
    setEditingItem(null);
  };

  if (!isOpen) return null;

  const filteredItems = (selectedFilterCategory === 'ALL' ? items : items.filter(i => i.category === selectedFilterCategory));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 text-black">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col">
        {!isAuthenticated ? (
          <div className="p-20 text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter uppercase">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4 max-w-xs mx-auto">
              <input type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border rounded-2xl text-center text-xl outline-none focus:border-[#ffa04d]" placeholder="••••" />
              <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-[#ffa04d] transition-colors">접속하기</button>
            </form>
          </div>
        ) : (
          <>
            <div className="border-b px-8 py-6 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold">Portfolio Management</h2>
              <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-xl text-sm font-bold hover:bg-gray-300">닫기</button>
            </div>

            <div className="flex bg-white px-8 border-b">
              <button onClick={() => setActiveTab('items')} className={`px-6 py-4 text-sm font-bold ${activeTab === 'items' ? 'text-[#ffa04d] border-b-2 border-[#ffa04d]' : 'text-gray-400'}`}>아이템 리스트</button>
              <button onClick={() => setActiveTab('categories')} className={`px-6 py-4 text-sm font-bold ${activeTab === 'categories' ? 'text-[#ffa04d] border-b-2 border-[#ffa04d]' : 'text-gray-400'}`}>설명 수정</button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-white custom-scrollbar-admin">
              {activeTab === 'items' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-gray-400">FILTER</span>
                      <select className="p-3 text-sm bg-gray-50 border rounded-xl outline-none" value={selectedFilterCategory} onChange={(e) => setSelectedFilterCategory(e.target.value as any)}>
                        <option value="ALL">전체 보기</option>
                        {Object.values(PortfolioCategory).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <button onClick={() => setEditingItem({ category: PortfolioCategory.WEB_VARIETY, media: [{ url: '', type: 'image' }] })} className="px-8 py-3 bg-black text-white rounded-2xl text-sm font-bold hover:bg-[#ffa04d] transition-all">+ 추가</button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-6 p-5 bg-white border rounded-2xl hover:border-[#ffa04d]/40 transition-all shadow-sm">
                        <div className="w-24 aspect-video bg-gray-100 rounded-lg overflow-hidden shrink-0 border">
                          {item.media?.[0]?.url && <img src={transformGoogleDriveLink(item.media[0].url)} className="w-full h-full object-cover" alt="" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base truncate">{item.title}</h4>
                          <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col gap-1">
                            <button onClick={() => moveItem(item.id, 'up')} className="p-1.5 bg-gray-50 hover:bg-black hover:text-white rounded text-gray-400 transition-colors">↑</button>
                            <button onClick={() => moveItem(item.id, 'down')} className="p-1.5 bg-gray-50 hover:bg-black hover:text-white rounded text-gray-400 transition-colors">↓</button>
                          </div>
                          <button onClick={() => setEditingItem(item)} className="px-5 py-2.5 bg-gray-100 rounded-xl text-xs font-bold hover:bg-gray-200">편집</button>
                          <button onClick={() => handleDeleteItem(item.id)} className="px-5 py-2.5 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-colors">삭제</button>
                        </div>
                      </div>
                    ))}
                    {filteredItems.length === 0 && (
                      <div className="text-center py-20 text-gray-400 italic">표시할 항목이 없습니다.</div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="space-y-6 max-w-2xl">
                  {categories.map((cat) => (
                    <div key={cat.type} className="space-y-2">
                      <label className="text-xs font-extrabold text-[#ffa04d] uppercase tracking-tighter">{cat.type}</label>
                      <textarea className="w-full p-4 border rounded-2xl min-h-[120px] text-sm leading-relaxed outline-none focus:border-[#ffa04d]" value={cat.description} onChange={(e) => onUpdateCategories(categories.map(c => c.type === cat.type ? { ...c, description: e.target.value } : c))} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {editingItem && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingItem(null)}></div>
                <form onSubmit={handleSaveItem} className="relative bg-white w-full max-w-lg p-10 rounded-[2.5rem] shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
                  <h4 className="font-bold text-2xl tracking-tight">작업물 정보</h4>
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400">제목</label>
                      <input className="w-full p-4 bg-gray-50 rounded-2xl border outline-none focus:border-[#ffa04d]" value={editingItem.title || ''} placeholder="영상 제목을 입력하세요" onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400">카테고리</label>
                      <select className="w-full p-4 bg-gray-50 rounded-2xl border outline-none" value={editingItem.category} onChange={(e) => setEditingItem({...editingItem, category: e.target.value as PortfolioCategory})}>
                        {Object.values(PortfolioCategory).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400">소스 (유튜브/드라이브/업로드)</label>
                      {editingItem.media?.map((m, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-2xl space-y-3 border">
                          <div className="flex gap-2">
                            <input className="flex-1 p-3 text-xs bg-white border rounded-xl outline-none" value={m.url.startsWith('data:') ? '파일이 업로드되었습니다' : m.url} placeholder="URL 주소 붙여넣기" onChange={(e) => handleMediaChange(idx, 'url', e.target.value)} />
                            <label className="px-5 py-2 bg-black text-white rounded-xl text-xs flex items-center cursor-pointer hover:bg-[#ffa04d] transition-colors">
                              FILE
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, idx)} />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="submit" className="flex-1 py-4 bg-black text-white rounded-2xl font-bold shadow-xl hover:bg-[#ffa04d] transition-all">저장하기</button>
                    <button type="button" onClick={() => setEditingItem(null)} className="px-8 py-4 bg-gray-100 rounded-2xl font-bold hover:bg-gray-200">취소</button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
      <style>{`
        .custom-scrollbar-admin::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-admin::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Admin;
