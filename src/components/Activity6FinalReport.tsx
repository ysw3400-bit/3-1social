import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Award, Printer, RotateCcw, Sparkles, BookOpen, Heart, Eye, School } from 'lucide-react';
import { TeamInfo, CustomTopic, GroupReportSubmission } from '../types';
import { TOPIC_DATA } from '../data/topicData';
import { saveGroupReport } from '../utils/storage';
import { sounds } from '../utils/audio';

interface Activity6FinalReportProps {
  topic: CustomTopic;
  team: TeamInfo;
  selectedChangedItems: string[];
  groupReasonInput: string;
  selectedStayedHearts: string[];
  groupStayedInput: string;
  onReset: () => void;
  onOpenTeacherDashboard: () => void;
  onEditSection: (step: 'whatChanged' | 'whyChanged' | 'groupThought' | 'whatStayed') => void;
}

export const Activity6FinalReport: React.FC<Activity6FinalReportProps> = ({
  topic,
  team,
  selectedChangedItems,
  groupReasonInput,
  selectedStayedHearts,
  groupStayedInput,
  onReset,
  onOpenTeacherDashboard,
  onEditSection,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const config = TOPIC_DATA[topic];

  // Save submission automatically to localStorage for the Teacher Dashboard
  useEffect(() => {
    const submission: GroupReportSubmission = {
      id: `${team.name}-${topic}-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      topic,
      team,
      selectedChangedItems,
      selectedWhyItems: [],
      groupReasonInput,
      selectedStayedHearts,
      groupStayedInput,
    };
    saveGroupReport(submission);
  }, [topic, team, selectedChangedItems, groupReasonInput, selectedStayedHearts, groupStayedInput]);

  const handlePrint = () => {
    sounds.playPop();
    window.print();
  };

  const handleCheer = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.4 },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 md:py-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white rounded-3xl p-6 md:p-8 shadow-xl mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/30">
            🏅
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-400 text-amber-950 font-extrabold rounded-full text-xs font-jua">
                탐구 완료 보고서
              </span>
              <span className="text-amber-200 text-sm font-bold font-jua">
                사회 3학년 • {config.emoji} {config.name} 풍습 탐구
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-jua mt-1 tracking-tight">
              🔎 우리 모둠 탐구 결과
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCheer}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold rounded-2xl text-base md:text-lg transition shadow-md flex items-center gap-2 font-jua active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
            <span>축하 폭죽 터뜨리기!</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-3 bg-white/20 hover:bg-white/30 text-white font-extrabold rounded-2xl text-sm md:text-base transition shadow flex items-center gap-2 font-jua"
            title="인쇄하거나 PDF로 저장하기"
          >
            <Printer className="w-5 h-5" />
            <span className="hidden sm:inline">보고서 인쇄</span>
          </button>
        </div>
      </div>

      {/* Unified Single Result Card with HUGE TEXT */}
      <div
        ref={reportRef}
        className="bg-amber-50/95 border-4 border-amber-300 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden mb-6"
      >
        {/* Notebook Header */}
        <div className="border-b-2 border-dashed border-amber-300 pb-5 mb-8 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{team.mascot}</span>
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-amber-950 font-jua">
                {team.name} 탐구 결과 보고서
              </h3>
              <p className="text-sm md:text-base text-amber-900 font-bold font-jua mt-0.5">
                함께한 탐정단원: {team.memberCount}명 | 탐구 주제: 옛날과 오늘날의 {config.name}
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white border-2 border-amber-300 rounded-2xl text-sm font-extrabold text-amber-950 shadow-2xs font-jua">
            ⭐ 공인 풍습 탐정단 인증
          </div>
        </div>

        {/* 3 Core Results */}
        <div className="space-y-6">
          {/* 1. 우리가 찾은 변화 */}
          <div className="bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs md:text-sm font-extrabold text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full flex items-center gap-1.5 font-jua">
                <Eye className="w-4 h-4" />
                <span>우리가 찾은 변화</span>
              </span>
              <button
                onClick={() => onEditSection('whatChanged')}
                className="text-xs md:text-sm text-amber-700 hover:underline font-extrabold font-jua"
              >
                수정하기
              </button>
            </div>

            <h4 className="text-2xl md:text-3xl font-extrabold text-amber-950 font-jua mb-3">
              우리가 찾은 변화
            </h4>

            {/* List of chosen changes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedChangedItems.map((id) => {
                const found = config.changedCards.find((c) => c.id === id);
                return (
                  <div
                    key={id}
                    className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 shadow-2xs"
                  >
                    <span className="text-3xl">{found?.icon || '✨'}</span>
                    <span className="font-extrabold text-amber-950 text-lg md:text-xl font-jua">
                      {found?.title || id}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. 우리가 생각한 변화의 까닭 */}
          <div className="bg-white rounded-3xl p-6 border-3 border-orange-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs md:text-sm font-extrabold text-orange-800 bg-orange-100 px-3.5 py-1 rounded-full flex items-center gap-1.5 font-jua">
                <BookOpen className="w-4 h-4" />
                <span>우리가 생각한 변화의 까닭</span>
              </span>
              <button
                onClick={() => onEditSection('groupThought')}
                className="text-xs md:text-sm text-orange-700 hover:underline font-extrabold font-jua"
              >
                수정하기
              </button>
            </div>

            <h4 className="text-2xl md:text-3xl font-extrabold text-orange-950 font-jua mb-3">
              우리가 생각한 변화의 까닭
            </h4>

            <div className="p-5 bg-orange-50 rounded-2xl border-2 border-orange-200">
              <p className="text-xl md:text-2xl font-extrabold text-orange-950 font-jua leading-relaxed">
                &ldquo;{groupReasonInput || '생활 환경이 달라졌기'} 때문이라고 생각합니다.&rdquo;
              </p>
            </div>
          </div>

          {/* 3. 달라졌지만 변하지 않은 마음 */}
          <div className="bg-white rounded-3xl p-6 border-3 border-rose-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs md:text-sm font-extrabold text-rose-800 bg-rose-100 px-3.5 py-1 rounded-full flex items-center gap-1.5 font-jua">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>달라졌지만 변하지 않은 마음</span>
              </span>
              <button
                onClick={() => onEditSection('whatStayed')}
                className="text-xs md:text-sm text-rose-700 hover:underline font-extrabold font-jua"
              >
                수정하기
              </button>
            </div>

            <h4 className="text-2xl md:text-3xl font-extrabold text-rose-950 font-jua mb-3">
              달라졌지만 변하지 않은 마음
            </h4>

            {/* List of chosen hearts */}
            <div className="flex flex-wrap gap-2.5 mb-4">
              {selectedStayedHearts.map((id) => {
                const found = config.stayedHearts.find((h) => h.id === id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 border-2 border-rose-200 text-rose-950 rounded-2xl text-sm md:text-base font-extrabold font-jua shadow-2xs"
                  >
                    <span>{found?.icon || '❤️'}</span>
                    <span>{found?.title || id}</span>
                  </span>
                );
              })}
            </div>

            <div className="p-5 bg-rose-50 rounded-2xl border-2 border-rose-200">
              <p className="text-xl md:text-2xl font-extrabold text-rose-950 font-jua leading-relaxed">
                &ldquo;풍습의 모습은 달라졌지만,{' '}
                <span className="text-rose-700 underline decoration-rose-400">
                  {groupStayedInput || '가족을 사랑하는'}
                </span>{' '}
                마음은 비슷합니다.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Presentation Script Box for Class Sharing */}
        <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 border-3 border-amber-300 rounded-3xl p-6 text-center">
          <span className="text-sm font-extrabold px-4 py-1.5 bg-amber-600 text-white rounded-full inline-block mb-3 font-jua">
            📢 우리 모둠 발표 대본
          </span>
          <p className="text-xl md:text-3xl font-extrabold text-amber-950 font-jua leading-relaxed">
            &ldquo;우리 모둠은 {config.name}에서{' '}
            <span className="text-amber-800 underline decoration-amber-500">
              {selectedChangedItems.map((id) => config.changedCards.find((c) => c.id === id)?.title || id).join(', ')}
            </span>
            이/가 달라진 것을 찾았습니다.<br />
            그 까닭은 <span className="text-orange-800 underline decoration-orange-500">{groupReasonInput}</span> 때문이라고 생각합니다.<br />
            하지만 <span className="text-rose-700 underline decoration-rose-400">{groupStayedInput}</span> 마음은 옛날이나 오늘날이나 변함없이 이어지고 있습니다!&rdquo;
          </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Reset button: 🔄 처음부터 다시하기 */}
        <button
          onClick={() => {
            sounds.playPop();
            onReset();
          }}
          className="px-6 py-4 bg-white border-3 border-amber-400 hover:bg-amber-100 text-amber-950 font-extrabold text-lg md:text-xl rounded-2xl shadow-md transition flex items-center gap-2.5 font-jua active:scale-95"
        >
          <RotateCcw className="w-6 h-6 text-amber-700" />
          <span>🔄 처음부터 다시하기</span>
        </button>

        {/* Link to Teacher Dashboard */}
        <button
          onClick={onOpenTeacherDashboard}
          className="px-6 py-4 bg-amber-200 hover:bg-amber-300 border-2 border-amber-400 text-amber-950 font-extrabold text-lg md:text-xl rounded-2xl shadow-md transition flex items-center gap-2.5 font-jua active:scale-95"
        >
          <School className="w-6 h-6 text-amber-800" />
          <span>👩‍🏫 선생님 화면에서 우리 모둠 생각 확인하기</span>
        </button>

        <button
          onClick={handleCheer}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xl md:text-2xl rounded-2xl shadow-lg transition transform active:scale-95 font-jua flex items-center gap-2 border-2 border-amber-300"
        >
          <span>🎉 탐구 대성공!</span>
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
