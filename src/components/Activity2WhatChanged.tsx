import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CustomTopic } from '../types';
import { TOPIC_DATA } from '../data/topicData';
import { sounds } from '../utils/audio';

interface Activity2WhatChangedProps {
  topic: CustomTopic;
  initialSelected: string[];
  onComplete: (selectedItems: string[]) => void;
}

export const Activity2WhatChanged: React.FC<Activity2WhatChangedProps> = ({
  topic,
  initialSelected,
  onComplete,
}) => {
  const config = TOPIC_DATA[topic];
  const [selected, setSelected] = useState<string[]>(
    initialSelected.length > 0 ? initialSelected : [config.changedCards[0].id, config.changedCards[1].id]
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
    onComplete(selected);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 md:py-6">
      {/* Title */}
      <div className="bg-amber-100 border-4 border-amber-300 rounded-3xl p-5 md:p-6 shadow-md mb-4 md:mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="p-2.5 md:p-3 bg-amber-500 text-white rounded-2xl text-2xl md:text-3xl shadow-sm">
              👀
            </span>
            <div>
              <span className="text-xs md:text-sm font-extrabold text-amber-800 bg-amber-200/90 px-3 py-0.5 rounded-full font-jua">
                활동 2 • 변화 찾기 ({config.emoji} {config.name})
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-amber-950 font-jua mt-0.5">
                👀 무엇이 달라졌을까요?
              </h2>
            </div>
          </div>
          <span className="px-4 py-1.5 bg-white text-amber-900 rounded-2xl font-extrabold text-sm md:text-base border-2 border-amber-300 font-jua">
            복수 선택 가능 ({selected.length}개 선택됨)
          </span>
        </div>

        <p className="text-amber-950 font-extrabold text-lg sm:text-xl md:text-2xl mt-3 bg-white/80 p-3.5 rounded-2xl border-2 border-amber-200 font-jua leading-relaxed">
          달라졌다고 생각하는 것을 <strong>모두 골라보세요</strong>! (여러 개를 고를 수 있어요)
        </p>
      </div>

      {/* 4 Multi-Select Cards - Optimized for Landscape (4 columns on lg/landscape tablets) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
        {config.changedCards.map((card) => {
          const isSelected = selected.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => toggleItem(card.id)}
              className={`cursor-pointer rounded-3xl p-4 sm:p-5 border-4 transition-all duration-200 transform text-left relative bg-white select-none flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-600 bg-amber-50/90 ring-4 ring-amber-200 shadow-xl scale-[1.02]'
                  : 'border-amber-200 hover:border-amber-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl p-2.5 bg-amber-100 rounded-2xl border-2 border-amber-300 shadow-2xs">
                    {card.icon}
                  </span>

                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-extrabold text-xl border-3 transition ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-700 shadow-md scale-105'
                        : 'border-slate-300 text-slate-400 bg-white'
                    }`}
                  >
                    {isSelected ? '✓' : ''}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-950 font-jua">
                  {card.title}
                </h3>

                {/* Sub description */}
                <div className="mt-3 bg-amber-50/60 p-3 rounded-2xl border-2 border-amber-200/90 text-xs sm:text-sm text-slate-800 space-y-1.5 font-bold">
                  <p>
                    <span className="text-amber-800 font-extrabold font-jua">옛날:</span> {card.past}
                  </p>
                  <p>
                    <span className="text-pink-700 font-extrabold font-jua">오늘날:</span> {card.present}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="mt-3 pt-2 border-t-2 border-amber-200 text-right">
                  <span className="text-xs font-extrabold text-amber-800 bg-amber-200/90 px-3 py-1 rounded-full font-jua">
                    선택 완료 ✨
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Button to proceed to dedicated discussion screen */}
      <div className="flex justify-center">
        <button
          onClick={handleNext}
          className="w-full max-w-lg px-8 py-4 sm:py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-xl sm:text-2xl md:text-3xl font-extrabold rounded-3xl shadow-xl hover:shadow-2xl transition transform active:scale-95 flex items-center justify-center gap-3 font-jua border-4 border-amber-200"
        >
          <span>🗣️ 친구와 대화하러 가기</span>
          <ArrowRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
