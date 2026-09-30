import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, RotateCcw, MessageCircle, Users } from 'lucide-react';
import { TeamInfo } from '../types';
import { sounds } from '../utils/audio';

interface DedicatedDiscussionScreenProps {
  stage: 'whatChanged' | 'whyChanged' | 'whatStayed';
  team: TeamInfo;
  topicName: string;
  selectedItemsTitles: string[];
  onComplete: () => void;
}

export const DedicatedDiscussionScreen: React.FC<DedicatedDiscussionScreenProps> = ({
  stage,
  team,
  topicName,
  selectedItemsTitles,
  onComplete,
}) => {
  const [currentSpeaker, setCurrentSpeaker] = useState<number>(1);
  const [spokenMembers, setSpokenMembers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isRunning, setIsRunning] = useState<boolean>(true);

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

  const handleSpeakerChange = (memberNum: number) => {
    sounds.playPop();
    setCurrentSpeaker(memberNum);
    if (!spokenMembers.includes(memberNum)) {
      setSpokenMembers([...spokenMembers, memberNum]);
    }
  };

  const handleFinish = () => {
    sounds.playSuccess();
    onComplete();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const selectedSummary = selectedItemsTitles.join(', ') || '우리가 고른 항목';

  const getStageContent = () => {
    switch (stage) {
      case 'whatChanged':
        return {
          badge: '🗣️ 모둠 대화 1단계 • 변화 이야기하기',
          title: '친구와 눈을 맞추고 이야기해 봅시다!',
          subtitle: `우리 모둠이 찾은 ${topicName}의 변화: 「${selectedSummary}」`,
          sentence1: `“나는 ${selectedSummary}이/가 가장 크게 달라졌다고 생각해.”`,
          sentence2: `“옛날에는 어땠는데, 오늘날에는 어떻게 바뀌었을까?”`,
        };
      case 'whyChanged':
        return {
          badge: '🗣️ 모둠 대화 2단계 • 까닭 이야기하기',
          title: '왜 그렇게 생각했는지 친구에게 말해 보세요!',
          subtitle: `우리 모둠이 생각한 까닭: 「${selectedSummary}」`,
          sentence1: `“나는 ${selectedSummary} 때문에 풍습이 달라졌다고 생각해.”`,
          sentence2: `“왜냐하면 __________________ 하기 때문이야!”`,
        };
      case 'whatStayed':
        return {
          badge: '🗣️ 모둠 대화 3단계 • 변하지 않은 마음',
          title: '소중한 마음에 대해 친구와 이야기해 보세요!',
          subtitle: `우리 모둠이 선택한 따뜻한 마음: 「${selectedSummary}」`,
          sentence1: `“옛날이나 오늘날이나 모두 ${selectedSummary} 마음은 똑같은 것 같아.”`,
          sentence2: `“이 마음이 왜 가장 소중하다고 생각하니?”`,
        };
    }
  };

  const content = getStageContent();

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 md:py-6">
      {/* Stage Header - Compact in landscape */}
      <div className="bg-amber-100 border-4 border-amber-400 rounded-3xl p-4 md:p-6 shadow-xl mb-4 md:mb-6 text-center">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-600 text-white rounded-full text-sm md:text-base font-extrabold shadow font-jua">
            <MessageCircle className="w-4 h-4" />
            <span>{content.badge}</span>
          </span>

          <span className="text-xs md:text-sm font-extrabold text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full font-jua">
            👥 {team.name} ({team.memberCount}명 협동 대화)
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-amber-950 font-jua tracking-tight leading-tight">
          {content.title}
        </h2>

        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-base md:text-lg font-bold text-amber-800 font-jua">선택한 단서:</span>
          {selectedItemsTitles.map((title, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1 bg-white border-2 border-amber-300 text-amber-950 rounded-xl text-base md:text-lg font-extrabold shadow-2xs font-jua"
            >
              ✨ {title}
            </span>
          ))}
        </div>
      </div>

      {/* Main Discussion Console - Optimized for Tablet Landscape (2-column layout in landscape/desktop) */}
      <div className="bg-white border-4 border-amber-400 rounded-3xl p-5 md:p-8 shadow-2xl mb-4 md:mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (col-7 in landscape): Big Speech Bubbles */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-amber-100">
              <h3 className="text-xl md:text-2xl font-extrabold text-amber-950 font-jua flex items-center gap-2">
                <span>💬</span>
                <span>이렇게 큰 목소리로 말해 보세요!</span>
              </h3>
            </div>

            <div className="p-4 sm:p-5 md:p-6 bg-amber-50 rounded-3xl border-3 border-amber-300 text-left shadow-2xs">
              <span className="text-xs md:text-sm font-extrabold text-amber-800 bg-amber-200/90 px-3 py-1 rounded-full mb-2 inline-block font-jua">
                말하기 문장 ①
              </span>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-amber-950 font-jua leading-relaxed">
                {content.sentence1}
              </p>
            </div>

            <div className="p-4 sm:p-5 md:p-6 bg-orange-50 rounded-3xl border-3 border-orange-300 text-left shadow-2xs">
              <span className="text-xs md:text-sm font-extrabold text-orange-800 bg-orange-200/90 px-3 py-1 rounded-full mb-2 inline-block font-jua">
                말하기 문장 ②
              </span>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-950 font-jua leading-relaxed">
                {content.sentence2}
              </p>
            </div>
          </div>

          {/* Right Column (col-5 in landscape): Timer & Member Turn-Taking & Next Button */}
          <div className="lg:col-span-5 bg-amber-50/70 p-4 sm:p-5 rounded-3xl border-3 border-amber-300 flex flex-col justify-between h-full space-y-5">
            {/* Timer */}
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border-2 border-amber-300 shadow-2xs">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-amber-700" />
                <span className="font-mono text-2xl md:text-3xl font-extrabold text-amber-950">
                  {timeFormatted}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    sounds.playPop();
                    setIsRunning(!isRunning);
                  }}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-sm font-jua transition"
                >
                  {isRunning ? '잠깐 멈춤' : '계속'}
                </button>
                <button
                  onClick={() => {
                    sounds.playPop();
                    setTimeLeft(120);
                    setIsRunning(true);
                  }}
                  className="p-1.5 text-amber-800 hover:bg-amber-100 rounded-xl"
                  title="시간 다시 맞추기"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Turn Taking Buttons */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-base md:text-lg font-extrabold text-amber-950 font-jua flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-amber-700" />
                  <span>말하는 친구를 터치하세요:</span>
                </label>
                <span className="text-xs md:text-sm font-extrabold text-amber-800 font-jua">
                  {spokenMembers.length}/{team.memberCount}명 완료
                </span>
              </div>

              <div className={`grid ${team.memberCount <= 4 ? 'grid-cols-2' : 'grid-cols-3'} gap-2.5`}>
                {Array.from({ length: team.memberCount }, (_, i) => i + 1).map((num) => {
                  const isCurrent = currentSpeaker === num;
                  const hasSpoken = spokenMembers.includes(num);

                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleSpeakerChange(num)}
                      className={`p-3 rounded-2xl border-3 text-center transition transform active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
                        isCurrent
                          ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-102 ring-2 ring-amber-300'
                          : hasSpoken
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                          : 'bg-white border-amber-200 text-slate-700 hover:bg-amber-100/50'
                      }`}
                    >
                      <span className="text-xl">
                        {isCurrent ? '🎤' : hasSpoken ? '✅' : '👤'}
                      </span>
                      <span className="text-base md:text-lg font-extrabold font-jua">
                        {num}번 친구
                      </span>
                      <span className="text-[11px] font-bold opacity-85 font-jua">
                        {isCurrent ? '발표 중!' : hasSpoken ? '완료' : '차례'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Complete Discussion Button right in the sidebar for tablet landscape */}
            <button
              onClick={handleFinish}
              className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-xl md:text-2xl font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition transform active:scale-95 flex items-center justify-center gap-2 font-jua border-3 border-amber-200"
            >
              <span>🗣️ 친구들과 모두 이야기했어요!</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
