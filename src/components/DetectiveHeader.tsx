import React from 'react';
import { Volume2, VolumeX, School } from 'lucide-react';
import { sounds } from '../utils/audio';
import { TeamInfo, StepKey, CustomTopic } from '../types';
import { TOPIC_DATA } from '../data/topicData';

interface DetectiveHeaderProps {
  currentStep: StepKey;
  team: TeamInfo;
  topic: CustomTopic;
  onReset?: () => void;
  onOpenTeacherDashboard?: () => void;
}

export const DetectiveHeader: React.FC<DetectiveHeaderProps> = ({
  currentStep,
  team,
  topic,
  onReset,
  onOpenTeacherDashboard,
}) => {
  const [muted, setMuted] = React.useState(!sounds.enabled);

  const toggleSound = () => {
    sounds.enabled = muted;
    setMuted(!muted);
  };

  const topicConfig = TOPIC_DATA[topic];

  const steps: { key: StepKey; num: string; title: string; icon: string }[] = [
    { key: 'explore', num: '1단계', title: '자료 보기', icon: '🔎' },
    { key: 'whatChanged', num: '2단계', title: '달라진 점', icon: '👀' },
    { key: 'whyChanged', num: '3단계', title: '왜 달라졌을까', icon: '🤔' },
    { key: 'groupThought', num: '4단계', title: '모둠 생각', icon: '💡' },
    { key: 'whatStayed', num: '5단계', title: '변하지 않은 마음', icon: '❤️' },
  ];

  const getStepIndex = () => {
    switch (currentStep) {
      case 'start': return 0;
      case 'explore': return 1;
      case 'whatChanged':
      case 'discussChanged': return 2;
      case 'whyChanged':
      case 'discussWhy': return 3;
      case 'groupThought': return 4;
      case 'whatStayed':
      case 'discussStayed': return 5;
      case 'finalReport': return 6;
      default: return 0;
    }
  };

  const currentIdx = getStepIndex();

  return (
    <header className="sticky top-0 z-30 bg-amber-100/95 backdrop-blur-md border-b-2 border-amber-300 shadow-sm px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Logo and Group Name */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 group text-left focus:outline-none"
            title="처음으로 돌아가기"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md border-2 border-amber-400 group-hover:scale-105 transition-transform">
              🔎
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-amber-950 text-lg md:text-xl tracking-tight font-jua">
                  풍습 탐정단
                </span>
                <span className="text-xs px-2 py-0.5 bg-amber-300 text-amber-950 rounded-full font-extrabold font-jua">
                  {topicConfig.emoji} {topicConfig.name}
                </span>
              </div>
              <p className="text-xs md:text-sm text-amber-900 font-extrabold truncate max-w-[140px] md:max-w-none font-jua">
                {team.mascot} {team.name} ({team.memberCount}명)
              </p>
            </div>
          </button>
        </div>

        {/* Progress Indicator */}
        {currentStep !== 'start' && currentStep !== 'finalReport' && currentStep !== 'teacherDashboard' && (
          <div className="flex items-center gap-1 sm:gap-2 bg-amber-50/90 px-3 py-1.5 rounded-2xl border-2 border-amber-300 overflow-x-auto">
            {steps.map((st, i) => {
              const isActive = currentStep === st.key || 
                (st.key === 'whatChanged' && currentStep === 'discussChanged') ||
                (st.key === 'whyChanged' && currentStep === 'discussWhy') ||
                (st.key === 'whatStayed' && currentStep === 'discussStayed');
              const isPast = currentIdx > i + 1;
              return (
                <div
                  key={st.key}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap font-jua ${
                    isActive
                      ? 'bg-amber-600 text-white shadow scale-105 ring-2 ring-amber-300'
                      : isPast
                      ? 'text-amber-800 bg-amber-200/80'
                      : 'text-amber-400 bg-transparent'
                  }`}
                >
                  <span>{st.icon}</span>
                  <span>{st.title}</span>
                </div>
              );
            })}
          </div>
        )}

        {currentStep === 'finalReport' && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-extrabold bg-amber-700 text-white shadow font-jua">
            <span>🌱</span>
            <span>우리 모둠 탐구 결과</span>
          </div>
        )}

        {/* Controls: Teacher Dashboard Link & Sound Toggle */}
        <div className="flex items-center gap-2">
          {onOpenTeacherDashboard && (
            <button
              onClick={onOpenTeacherDashboard}
              className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-xl text-xs md:text-sm font-extrabold font-jua flex items-center gap-1 shadow-2xs border border-amber-300 transition active:scale-95"
              title="교사 페이지로 이동하여 학급 모둠 결과 모아보기"
            >
              <School className="w-4 h-4 text-amber-800" />
              <span className="hidden sm:inline">교사 페이지</span>
            </button>
          )}

          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 transition active:scale-95 shadow-2xs"
            title={muted ? "효과음 켜기" : "효과음 끄기"}
          >
            {muted ? <VolumeX className="w-5 h-5 text-slate-500" /> : <Volume2 className="w-5 h-5 text-amber-900" />}
          </button>
        </div>
      </div>
    </header>
  );
};
