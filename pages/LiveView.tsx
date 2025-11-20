
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CAMERAS } from '../services/mockData';
import { analyzeCameraFrame } from '../services/geminiService';
import { 
  ChevronLeft, Settings, Mic, Camera as CameraIcon, 
  Search, Flashlight, Phone, Video, Square, Activity, Check,
  Move, Plus, Minus, ChevronUp, ChevronDown, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LiveView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const camera = MOCK_CAMERAS.find(c => c.id === id);
  const { t, language } = useLanguage();
  
  const [isTalking, setIsTalking] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // PTZ States
  const [showPtz, setShowPtz] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Simulate "Live" feel
  const [liveIndicator, setLiveIndicator] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setLiveIndicator(p => !p), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      // Auto analyze on load for demo purposes
      if(camera) handleAIAnalyze();
  }, [camera]);

  const handleAIAnalyze = async () => {
    if (!camera) return;
    setIsAnalyzing(true);
    const result = await analyzeCameraFrame(camera.name, language);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const adjustZoom = (delta: number) => {
    setZoom(prev => {
      const newZoom = prev + delta;
      return Math.min(Math.max(newZoom, 1), 4); // Clamp between 1x and 4x
    });
  };

  if (!camera) return <div className="p-10 text-center text-slate-400">{t.live.notFound}</div>;

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 z-30">
        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-white font-medium">{camera.name}</h1>
        <button className="text-slate-400 hover:text-white transition">
          <Settings size={24} />
        </button>
      </div>

      {/* Video Area */}
      <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden group">
        <img 
          src={camera.thumbnailUrl} 
          alt="Live Feed" 
          className="w-full h-full object-contain transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `scale(${zoom})` }}
        />
        
        {/* Status Overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs text-white z-10">
           <div className={`w-2 h-2 rounded-full bg-green-500 ${liveIndicator ? 'opacity-100' : 'opacity-50'}`} />
           <span>{t.live.live}</span>
        </div>
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs text-white flex items-center gap-1 z-10">
           <Video size={12} /> <span>REC</span>
        </div>

        {/* Bounding Box Sim */}
        <div className="absolute top-1/3 left-1/4 w-24 h-48 border-2 border-brand-500/70 rounded opacity-40 animate-pulse pointer-events-none z-0">
            <div className="absolute -top-6 left-0 bg-brand-500 text-white text-[10px] px-1 py-0.5 rounded">{t.live.person} 98%</div>
        </div>

        {/* PTZ Controls Overlay */}
        {showPtz && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-6 z-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* D-PAD */}
              <div className="w-36 h-36 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-2xl relative grid grid-cols-3 grid-rows-3 p-2">
                  <div /> 
                  <button className="flex items-center justify-center hover:bg-white/10 rounded-full text-white active:scale-95 transition"><ChevronUp size={28}/></button> 
                  <div />
                  
                  <button className="flex items-center justify-center hover:bg-white/10 rounded-full text-white active:scale-95 transition"><ChevronLeft size={28}/></button>
                  <div className="bg-white/10 rounded-full m-2 flex items-center justify-center">
                      <Move size={16} className="text-white/50"/>
                  </div>
                  <button className="flex items-center justify-center hover:bg-white/10 rounded-full text-white active:scale-95 transition"><ChevronRight size={28}/></button>
                  
                  <div /> 
                  <button className="flex items-center justify-center hover:bg-white/10 rounded-full text-white active:scale-95 transition"><ChevronDown size={28}/></button> 
                  <div />
              </div>

              {/* Zoom Control */}
              <div className="h-36 w-12 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-2xl flex flex-col justify-between p-1">
                  <button onClick={() => adjustZoom(0.5)} className="h-10 w-full flex items-center justify-center hover:bg-white/10 rounded-full text-white active:scale-95 transition"><Plus size={24}/></button>
                  <div className="flex-1 flex items-center justify-center">
                       <span className="text-xs font-mono font-bold text-brand-400 rotate-90 whitespace-nowrap">{zoom.toFixed(1)}x</span>
                  </div>
                  <button onClick={() => adjustZoom(-0.5)} className="h-10 w-full flex items-center justify-center hover:bg-white/10 rounded-full text-white active:scale-95 transition"><Minus size={24}/></button>
              </div>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="bg-slate-900 border-t border-slate-800 p-2 flex justify-around items-center z-30">
         <button className="p-3 text-slate-400 hover:text-white active:bg-slate-800 rounded-full transition">
            <Mic size={24} />
         </button>
         <button 
            onClick={() => setShowPtz(!showPtz)}
            className={`p-3 rounded-full transition ${showPtz ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white active:bg-slate-800'}`}
         >
            <Move size={24} />
         </button>
         <button onClick={handleAIAnalyze} className={`p-3 rounded-full transition ${isAnalyzing ? 'text-brand-400 animate-pulse' : 'text-slate-400 hover:text-white active:bg-slate-800'}`}>
            <Search size={24} />
         </button>
         <button className="p-3 text-slate-400 hover:text-white active:bg-slate-800 rounded-full transition">
            <Flashlight size={24} />
         </button>
         <button className="p-3 text-slate-400 hover:text-white active:bg-slate-800 rounded-full transition">
            <CameraIcon size={24} />
         </button>
      </div>

      {/* AI Results Panel */}
      <div className="bg-slate-950 border-b border-slate-900 p-4 z-30">
          <h3 className="text-xs text-slate-500 uppercase font-medium mb-2 tracking-wider">{t.live.aiAnalysis}</h3>
          <div className="flex items-start gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <Activity className="text-brand-500 shrink-0 mt-0.5" size={18} />
              <div className="flex-1">
                  {isAnalyzing ? (
                      <span className="text-sm text-slate-400 animate-pulse">{t.live.analyzing}</span>
                  ) : (
                      <div className="text-sm text-slate-200 leading-snug">
                          {t.live.detected} 1 {t.live.person} ({t.family.members}) <br/>
                          {aiAnalysis}
                      </div>
                  )}
              </div>
              {!isAnalyzing && <Check size={16} className="text-green-500" />}
          </div>
      </div>

      {/* Quick Actions Bottom */}
      <div className="bg-slate-900 p-6 pb-8 z-30">
          <div className="grid grid-cols-3 gap-4">
             <button 
                onClick={() => setIsTalking(!isTalking)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${isTalking ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
             >
                <Phone size={18} /> {t.live.intercom}
             </button>
             
             <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-colors">
                <Video size={18} /> {t.live.record}
             </button>

             <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-400 font-medium border border-red-500/20 hover:bg-red-500/20 transition-colors">
                <Square size={18} /> {t.live.stop}
             </button>
          </div>
      </div>
    </div>
  );
};
