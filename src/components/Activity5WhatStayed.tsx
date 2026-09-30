import React, { useState } from 'react';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { CustomTopic } from '../types';
import { TOPIC_DATA } from '../data/topicData';
import { sounds } from '../utils/audio';

interface Activity5WhatStayedProps {
  topic: CustomTopic;
  initialSelected: string[];
  initialStayedInput: string;
  onComplete: (selectedHearts: string[], stayedInput: string) => void;
}

export const Activity5WhatStayed: React.FC<Activity5WhatStayedProps> = ({
  topic,
  initialSelected,
  initialStayedInput,
  onComplete,
}) => {
  const config = TOPIC_DATA[topic];
  const [selected, setSelected] = useState<string[]>(
    initialSelected.length > 0 ? initialSelected : [config.stayedHearts[0].id, config.stayedHearts[2].id]
  );
  const [stayedInput, setStayedInput] = useState<string>(
    initialStayedInput || config.quickStayedSentences[0]
  );

  const toggleItem = (id: string) => {
    sounds.playPop();
    if (selected.includes(id)) {
      if (selected.length === 1) return;
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleNext = () => {
    sounds.playSuccess();
    onComplete(selected, stayedInput.trim());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 md:py-6">
      {/* Title */}
      <div className="bg-amber-100 border-4 border-amber-300 rounded-3xl p-5 md:p-6 shadow-md mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <span className="p-2.5 md:p-3 bg-rose-500 text-white rounded-2xl text-2xl md:text-3xl shadow-sm">
            ❤️
          </span>
          <div>
            <span className="text-xs md:text-sm font-extrabold text-rose-700 bg-rose-100 px-3 py-0.5 rounded-full font-jua">
              활동 5 • 변하지 않은 가치 찾기 ({config.emoji} {config.name})
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-amber-950 font-jua mt-0.5">
              ❤️ 달라졌지만 변하지 않은 것은 무엇일까요?
            </h2>
          </div>
        </div>

        <p className="text-amber-950 font-extrabold text-lg sm:text-xl md:text-2xl mt-3 bg-white/80 p-3.5 rounded-2xl border-2 border-amber-200 font-jua leading-relaxed">
          풍습의 모습은 달라졌지만, 옛날 사람들의 마음과 오늘날 사람들의 마음 중 비슷한 것은 무엇일까요?
        </p>

        <div className="mt-2.5 text-xs sm:text-sm md:text-base text-rose-800 flex items-center gap-2 font-bold font-jua">
          <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
          <span>
            여러 개를 고를 수 있어요! <strong>하나의 정답만 존재하는 것이 아니랍니다.</strong>
          </span>
        </div>
      </div>

      {/* 4 Value Cards (Multi-Select) - Optimized for Landscape (4 columns on lg/landscape tablets) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
        {config.stayedHearts.map((card) => {
          const isSelected = selected.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => toggleItem(card.id)}
              className={`cursor-pointer rounded-3xl p-4 sm:p-5 border-4 transition-all duration-200 transform text-left relative bg-white select-none flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-500 bg-rose-50/80 ring-4 ring-rose-200 shadow-xl scale-[1.02]'
                  : 'border-amber-200 hover:border-rose-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-3xl sm:text-4xl p-2.5 bg-rose-100 rounded-2xl border-2 border-rose-300 shadow-2xs shrink-0">
                    {card.icon}
                  </span>

                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-extrabold text-xl border-3 shrink-0 transition ${
                      isSelected
                        ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-105'
                        : 'border-slate-300 text-slate-400 bg-white'
                    }`}
                  >
                    {isSelected ? '✓' : ''}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-jua mt-2 leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed font-bold">
                  {card.detail}
                </p>
              </div>

              {isSelected && (
                <div className="mt-3 pt-2 border-t-2 border-rose-200 flex items-center gap-1.5 text-xs font-extrabold text-rose-700 font-jua">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>우리 모둠 선택</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Complete the sentence Card */}
      <div className="bg-white border-4 border-rose-300 rounded-3xl p-5 md:p-8 shadow-2xl mb-6 md:mb-8">
        <div className="p-5 md:p-6 bg-amber-50 rounded-3xl border-3 border-amber-300 text-center mb-5">
          <span className="text-xs md:text-sm font-extrabold text-amber-800 bg-amber-200/90 px-4 py-1 rounded-full mb-2 inline-block font-jua">
            우리 모둠의 완성 문장
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-950 font-jua leading-relaxed">
            &ldquo;풍습의 모습은 달라졌지만,{' '}
            <span className="text-rose-800 bg-rose-100 px-3 py-1 rounded-2xl underline decoration-rose-500 decoration-wavy">
              {stayedInput || '____________________'}
            </span>{' '}
            마음은 비슷합니다.&rdquo;
          </p>
        </div>

        {/* Quick chip options & Large Input Area in Landscape */}
        <div>
          <label className="block text-base md:text-lg font-extrabold text-slate-900 mb-2 font-jua">
            💡 빈칸에 넣을 문장을 누르거나 직접 적어보세요:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
            {config.quickStayedSentences.map((sent, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setStayedInput(sent);
                }}
                className="text-left text-xs sm:text-sm font-extrabold p-3 bg-rose-50 hover:bg-rose-100 text-rose-950 rounded-2xl border-2 border-rose-200 transition active:scale-95 font-jua leading-snug"
              >
                ❤️ {sent}
              </button>
            ))}
          </div>

          <textarea
            value={stayedInput}
            onChange={(e) => setStayedInput(e.target.value)}
            placeholder="어떤 마음이 비슷한지 적어보세요..."
            rows={2}
            className="w-full text-lg sm:text-xl md:text-2xl font-extrabold text-amber-950 bg-amber-50/40 border-3 border-amber-300 rounded-3xl p-4 focus:outline-none focus:border-amber-500 placeholder:text-amber-300 font-jua"
          />
        </div>
      </div>

      {/* Button to proceed to dedicated discussion screen */}
      <div className="flex justify-center">
        <button
          onClick={handleNext}
          disabled={!stayedInput.trim()}
          className="w-full max-w-lg px-8 py-4 sm:py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 disabled:opacity-40 text-white text-xl sm:text-2xl md:text-3xl font-extrabold rounded-3xl shadow-xl hover:shadow-2xl transition transform active:scale-95 flex items-center justify-center gap-3 font-jua border-4 border-amber-200"
        >
          <span>🗣️ 친구와 소중한 마음 이야기하기</span>
          <ArrowRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
