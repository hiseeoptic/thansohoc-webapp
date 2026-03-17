import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import ConnectionTool from './components/ConnectionTool';
import { Calculator as CalcIcon, Layers, Globe } from 'lucide-react'; // Thêm Globe cho toggle ngôn ngữ
import { fetchMeanings } from './services/googleSheetService';
import { SheetMeaning, CalculationResult } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'calc' | 'connect'>('calc');
  const [sheetData, setSheetData] = useState<SheetMeaning[]>([]);
  const [sharedResults, setSharedResults] = useState<CalculationResult | null>(null);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi'); // State ngôn ngữ cho toàn app

  useEffect(() => {
    fetchMeanings().then(setSheetData);
  }, []);

  // Hàm toggle ngôn ngữ
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2c] via-[#2d1b33] to-[#0f172a] text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <header className="p-6 text-center border-b border-white/5 bg-black/10 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 tracking-tight">
          Mystic Numerology
        </h1>
        <button 
          onClick={toggleLanguage}
          className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 flex items-center gap-1"
          title={language === 'vi' ? 'Chuyển sang English' : 'Switch to Vietnamese'}
        >
          <Globe size={16} />
          {language === 'vi' ? 'EN' : 'VI'}
        </button>
        <p className="text-gray-400 text-sm mt-1">
          {language === 'vi' ? 'Khám phá bản thân & Kết nối năng lượng' : 'Discover yourself & Connect energy'}
        </p>
      </header>

      {/* Navigation */}
      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={() => setActiveTab('calc')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 border ${
            activeTab === 'calc' 
              ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/30' 
              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
          }`}
        >
          <CalcIcon size={18} /> {language === 'vi' ? 'Tra Cứu' : 'Query'}
        </button>
        <button
          onClick={() => setActiveTab('connect')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 border ${
            activeTab === 'connect' 
              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30' 
              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Layers size={18} /> {language === 'vi' ? 'Phân Tích Liên Kết' : 'Connection Analysis'}
        </button>
      </div>

      {/* Content */}
      <main className="container mx-auto">
        <div className={`transition-opacity duration-300 ${activeTab === 'calc' ? 'block' : 'hidden'}`}>
            <Calculator setSharedResults={setSharedResults} language={language} sheetData={sheetData} /> {/* Truyền language và sheetData để dùng getMeaning theo lang */}
        </div>
        <div className={`transition-opacity duration-300 ${activeTab === 'connect' ? 'block' : 'hidden'}`}>
            <ConnectionTool sheetData={sheetData} sharedResults={sharedResults} language={language} /> {/* Truyền language để dùng trong phân tích và UI */}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 text-gray-600 text-xs border-t border-white/5 mt-auto">
        <p>© {new Date().getFullYear()} Numerology Master. {language === 'vi' ? 'Designed with Mystical Energy.' : 'Designed with Mystical Energy.'}</p>
        {/* Thêm phần liên hệ: Nhúng link Messenger và Zalo */}
        <div className="mt-2 flex justify-center gap-4">
          <a 
            href="https://m.me/nguyenduchoa87" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            {language === 'vi' ? 'Liên hệ Messenger' : 'Contact Messenger'}
          </a>
          <a 
            href="https://zalo.me/0931767767" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            {language === 'vi' ? 'Liên hệ Zalo' : 'Contact Zalo'}
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;