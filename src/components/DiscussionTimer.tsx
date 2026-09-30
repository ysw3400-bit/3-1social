import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/audio';

interface DiscussionTimerProps {
  promptText?: string;
  defaultSeconds?: number;
}

export const DiscussionTimer: React.FC<DiscussionTimerProps> = ({
  promptText = "친구와 생각이 같았나요, 달랐나요? 왜 그렇게 생각했는지 친구에게 말해 보세요.",
  defaultSeconds = 120,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      sounds.playBell();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const toggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-amber-500 text-white rounded-xl shadow-sm text-lg animate-bounce">
            💬
          </span>
          <div>
            <h4 className="font-bold text-amber-950 text-base md:text-lg flex items-center gap-1.5 font-jua">
              모둠 대화 타임!
              <span className="text-xs px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full font-normal">
                친구 목소리에 귀 기울여요
              </span>
            </h4>
            <p className="text-amber-900 font-semibold text-sm md:text-base mt-0.5">
              {promptText}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs md:text-sm font-bold rounded-xl transition shadow-sm active:scale-95"
            title="토의 타이머 열기"
          >
            <Clock className="w-4 h-4" />
            <span>{timeFormatted}</span>
            <span className="text-amber-200 text-xs">타이머</span>
          </button>
          
          <button
            onClick={toggleSound}
            className="p-1.5 bg-white border border-amber-300 text-amber-800 rounded-xl hover:bg-amber-50"
            title={soundEnabled ? "소리 끄기" : "소리 켜기"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-amber-200/80 flex items-center justify-between flex-wrap gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-mono text-amber-950 px-3 py-1 bg-white rounded-xl border border-amber-300">
              ⏱️ {timeFormatted}
            </span>
            <button
              onClick={() => {
                sounds.playPop();
                setIsRunning(!isRunning);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-sm text-white shadow transition ${
                isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isRunning ? <><Pause className="w-4 h-4" /> 잠깐 멈춤</> : <><Play className="w-4 h-4" /> 이야기 시작!</>}
            </button>
            <button
              onClick={() => {
                sounds.playPop();
                setIsRunning(false);
                setTimeLeft(defaultSeconds);
              }}
              className="p-1.5 text-amber-800 hover:text-amber-950 bg-white border border-amber-300 rounded-xl"
              title="시간 다시 맞추기"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => { setTimeLeft(60); setIsRunning(false); sounds.playPop(); }}
              className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-amber-900 font-bold hover:bg-amber-50"
            >
              1분
            </button>
            <button
              onClick={() => { setTimeLeft(120); setIsRunning(false); sounds.playPop(); }}
              className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-amber-900 font-bold hover:bg-amber-50"
            >
              2분
            </button>
            <button
              onClick={() => { setTimeLeft(180); setIsRunning(false); sounds.playPop(); }}
              className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-amber-900 font-bold hover:bg-amber-50"
            >
              3분
            </button>
          </div>
        </div>
      )}

      {/* Speaking Starter Tip for 3rd Graders */}
      <div className="mt-2.5 bg-amber-50/90 rounded-xl p-2.5 border border-amber-200/70 text-xs md:text-sm text-amber-900 flex items-start gap-2">
        <MessageCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <div className="leading-relaxed">
          <span className="font-bold text-amber-800">💡 이렇게 친구에게 말해 볼까요?</span>
          <p className="mt-0.5">
            &ldquo;나는 <span className="font-bold text-amber-950 bg-amber-200/70 px-1 py-0.5 rounded">______</span> 때문이라고 생각해. 왜냐하면 <span className="font-bold text-amber-950 bg-amber-200/70 px-1 py-0.5 rounded">______</span> 거든! 친구야, 너의 생각은 어때?&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
