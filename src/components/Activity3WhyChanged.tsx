import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CustomTopic } from '../types';
import { TOPIC_DATA } from '../data/topicData';
import { sounds } from '../utils/audio';

interface Activity3WhyChangedProps {
  topic: CustomTopic;
  initialSelected: string[];
  onComplete: (selectedWhyItems: string[]) => void;
}

export const Activity3WhyChanged: React.FC<Activity3WhyChangedProps> = ({
  topic,
  initialSelected,
  onComplete,
}) => {
  const config = TOPIC_DATA[topic];
  const [selected, setSelected] = useState<string[]>(
    initialSelected.length > 0 ? initialSelected : [config.whyCards[0].id]
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
        <div className="flex items-center gap-3">
          <span className="p-2.5 md:p-3 bg-amber-500 text-white rounded-2xl text-2xl md:text-3xl shadow-sm">
            🤔
          </span>
          <div>
            <span className="text-xs md:text-sm font-extrabold text-amber-800 bg-amber-200/90 px-3 py-0.5 rounded-full font-jua">
              활동 3 • 까닭 생각하기 ({config.emoji} {config.name})
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-amber-950 font-jua mt-0.5">
              🤔 왜 달라졌을까요?
            </h2>
          </div>
        </div>

        <p className="text-amber-950 font-extrabold text-lg sm:text-xl md:text-2xl mt-3 bg-white/80 p-3.5 rounded-2xl border-2 border-amber-200 font-jua leading-relaxed">
          옛날과 오늘날의 풍습이 달라진 까닭을 생각해 봅시다.
        </p>

        <div className="mt-2.5 text-xs sm:text-sm md:text-base text-amber-900 flex items-center gap-2 font-bold font-jua">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            이 활동에는 <strong>정답과 오답이 없어요!</strong> 왜 그렇게 생각하는지 친구들과 나누는 것이 가장 중요합니다.
          </span>
        </div>
      </div>

      {/* 4 Cards - Optimized for Landscape (4 columns on lg/landscape tablets) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
        {config.whyCards.map((card) => {
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
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-3xl sm:text-4xl p-2.5 bg-amber-100 rounded-2xl border-2 border-amber-300 shadow-2xs shrink-0">
                    {card.icon}
                  </span>

                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-extrabold text-xl border-3 shrink-0 transition ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-700 shadow-md scale-105'
                        : 'border-slate-300 text-slate-400 bg-white'
                    }`}
                  >
                    {isSelected ? '✓' : ''}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-jua mt-2 leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 mt-2.5 leading-relaxed font-bold">
                  {card.explanation}
                </p>
              </div>

              {isSelected && (
                <div className="mt-3 pt-2.5 border-t-2 border-amber-200 flex items-center justify-between text-xs font-extrabold text-amber-800 font-jua">
                  <span>✨ 우리 모둠 선택</span>
                  <span>선택됨</span>
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
          <span>🗣️ 친구와 까닭 이야기하러 가기</span>
          <ArrowRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
