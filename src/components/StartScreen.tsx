import React, { useState } from 'react';
import { Search, Users, ChevronRight, School, BookOpen } from 'lucide-react';
import { TeamInfo, CustomTopic } from '../types';
import { sounds } from '../utils/audio';

interface StartScreenProps {
  onStart: (team: TeamInfo, topic: CustomTopic) => void;
  onOpenTeacherDashboard: () => void;
}

const MASCOTS = [
  { emoji: '🦊', label: '지혜 여우' },
  { emoji: '🦉', label: '총명 올빼미' },
  { emoji: '🦁', label: '용기 사자' },
  { emoji: '🐻', label: '든든 곰' },
  { emoji: '🐬', label: '반짝 돌고래' },
];

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, onOpenTeacherDashboard }) => {
  const [topic, setTopic] = useState<CustomTopic>('wedding');
  const [groupNumber, setGroupNumber] = useState<string>('1모둠');
  const [memberCount, setMemberCount] = useState<number>(4);
  const [selectedMascot, setSelectedMascot] = useState<string>('🦊');

  const handleStart = () => {
    sounds.playSuccess();
    onStart(
      {
        name: groupNumber || '풍습 탐정단',
        memberCount,
        mascot: selectedMascot,
      },
      topic
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 md:py-6">
      {/* Top Teacher Access Link */}
      <div className="flex justify-end mb-2.5">
        <button
          onClick={onOpenTeacherDashboard}
          className="px-4 py-2 bg-amber-200/90 hover:bg-amber-300 text-amber-950 rounded-2xl text-xs sm:text-sm font-extrabold font-jua border border-amber-300 shadow-xs flex items-center gap-1.5 transition active:scale-95"
        >
          <School className="w-4 h-4 text-amber-800" />
          <span>👩‍🏫 교사 페이지 (모둠 생각 수합 보기)</span>
        </button>
      </div>

      <div className="bg-amber-50/95 border-4 border-amber-300 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden text-center">
        {/* Top Tag & Title */}
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-amber-200 text-amber-900 rounded-full font-extrabold text-xs sm:text-sm border border-amber-300 mb-2 shadow-sm font-jua">
          <Search className="w-4 h-4 text-amber-800" />
          <span>초등학교 3학년 사회과 협동 탐구</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-amber-950 font-jua tracking-tight drop-shadow-sm flex items-center justify-center gap-2">
          <span>🔎</span> 풍습 탐정단
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-800 mt-1 font-jua">
          「옛날과 오늘날의 풍습을 찾아라!」
        </h2>

        {/* 2-Column Grid on Tablet Landscape (Topic on left, Team Settings on right) */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5 text-left">
          {/* Left: Topic Selection */}
          <div className="bg-white border-3 border-amber-300 rounded-3xl p-5 shadow-md flex flex-col justify-between">
            <div>
              <label className="block text-lg md:text-xl font-extrabold text-amber-950 font-jua mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span>1. 탐구할 풍습 주제를 골라보세요:</span>
              </label>

              <div className="space-y-3">
                {/* Wedding Option */}
                <button
                  type="button"
                  onClick={() => { sounds.playPop(); setTopic('wedding'); }}
                  className={`w-full p-4 rounded-2xl border-4 text-left transition transform active:scale-95 flex items-center justify-between ${
                    topic === 'wedding'
                      ? 'border-amber-600 bg-amber-100/90 shadow-md ring-4 ring-amber-200'
                      : 'border-amber-200 bg-amber-50/50 hover:bg-amber-100/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">💍</span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-extrabold text-amber-950 font-jua">
                        결혼식 풍습 탐구
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 font-bold">
                        옛날의 전통 혼례 vs 오늘날의 예식장
                      </p>
                    </div>
                  </div>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base border-2 shrink-0 ${
                    topic === 'wedding' ? 'bg-amber-600 text-white border-amber-700' : 'border-slate-300 bg-white'
                  }`}>
                    {topic === 'wedding' ? '✓' : ''}
                  </span>
                </button>

                {/* Chuseok Option */}
                <button
                  type="button"
                  onClick={() => { sounds.playPop(); setTopic('chuseok'); }}
                  className={`w-full p-4 rounded-2xl border-4 text-left transition transform active:scale-95 flex items-center justify-between ${
                    topic === 'chuseok'
                      ? 'border-amber-600 bg-amber-100/90 shadow-md ring-4 ring-amber-200'
                      : 'border-amber-200 bg-amber-50/50 hover:bg-amber-100/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🌕</span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-extrabold text-amber-950 font-jua">
                        추석 명절 풍습 탐구
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 font-bold">
                        옛날의 송편 빚기·달맞이 vs 오늘날의 명절 휴식
                      </p>
                    </div>
                  </div>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base border-2 shrink-0 ${
                    topic === 'chuseok' ? 'bg-amber-600 text-white border-amber-700' : 'border-slate-300 bg-white'
                  }`}>
                    {topic === 'chuseok' ? '✓' : ''}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-4 bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-900 font-bold text-center">
              💡 태블릿 가로 화면으로 보면 더 넓고 시원하게 볼 수 있어요!
            </div>
          </div>

          {/* Right: Team Registration */}
          <div className="bg-amber-100/80 border-3 border-amber-300 rounded-3xl p-5 shadow-inner">
            <h3 className="text-lg md:text-xl font-extrabold text-amber-950 flex items-center gap-2 font-jua mb-3">
              <Users className="w-5 h-5 text-amber-700" />
              <span>2. 우리 모둠 탐정단 등록하기:</span>
            </h3>

            <div className="space-y-3.5">
              {/* Group Name */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-amber-800 mb-1 font-jua">
                  모둠 번호 선택:
                </label>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {['1모둠', '2모둠', '3모둠', '4모둠', '5모둠', '6모둠'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setGroupNumber(g);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-extrabold text-sm md:text-base transition font-jua ${
                        groupNumber === g
                          ? 'bg-amber-600 text-white shadow'
                          : 'bg-white text-amber-900 border-2 border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={groupNumber}
                  onChange={(e) => setGroupNumber(e.target.value)}
                  placeholder="예: 1모둠, 슬기탐정단"
                  className="w-full bg-white border-2 border-amber-300 rounded-xl px-3 py-2 text-base font-extrabold text-amber-950 focus:outline-none focus:border-amber-500 font-jua"
                  maxLength={15}
                />
              </div>

              {/* Member count */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-amber-800 mb-1 font-jua">
                  함께하는 모둠원 수 ({memberCount}명)
                </label>
                <div className="flex gap-1.5">
                  {[2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setMemberCount(num);
                      }}
                      className={`flex-1 py-2 rounded-xl font-extrabold text-base md:text-lg transition font-jua ${
                        memberCount === num
                          ? 'bg-amber-700 text-white shadow'
                          : 'bg-white text-amber-900 border-2 border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      {num}명
                    </button>
                  ))}
                </div>
              </div>

              {/* Mascot */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-amber-800 mb-1 font-jua">
                  모둠 탐정 마스코트
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {MASCOTS.map((m) => (
                    <button
                      key={m.emoji}
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        setSelectedMascot(m.emoji);
                      }}
                      className={`p-2 rounded-xl flex flex-col items-center justify-center transition border-2 ${
                        selectedMascot === m.emoji
                          ? 'bg-amber-600 text-white border-amber-700 shadow-md scale-105'
                          : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
                      }`}
                    >
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="text-[11px] font-bold mt-0.5 font-jua">{m.label.split(' ')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Big Start Button */}
        <div className="mt-6">
          <button
            onClick={handleStart}
            className="w-full max-w-xl mx-auto group relative px-8 py-4 sm:py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-2xl sm:text-3xl md:text-4xl font-extrabold rounded-3xl shadow-xl hover:shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3 font-jua border-4 border-amber-200"
          >
            <span>🚀</span>
            <span>{groupNumber} 탐정단 출동!</span>
            <ChevronRight className="w-8 h-8 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
