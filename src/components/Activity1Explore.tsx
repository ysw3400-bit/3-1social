import React from 'react';
import { Search, ArrowRight, Eye, Sparkles } from 'lucide-react';
import {
  TraditionalWeddingIllustration,
  ModernWeddingIllustration,
  TraditionalChuseokIllustration,
  ModernChuseokIllustration,
} from './CustomIllustrations';
import { CustomTopic } from '../types';
import { TOPIC_DATA } from '../data/topicData';
import { sounds } from '../utils/audio';

interface Activity1ExploreProps {
  topic: CustomTopic;
  onComplete: () => void;
}

export const Activity1Explore: React.FC<Activity1ExploreProps> = ({ topic, onComplete }) => {
  const config = TOPIC_DATA[topic];

  const handleProceed = () => {
    sounds.playSuccess();
    onComplete();
  };

  const renderPastIllustration = () => {
    if (topic === 'wedding') {
      return <TraditionalWeddingIllustration className="h-48 md:h-56 mb-4" />;
    }
    return <TraditionalChuseokIllustration className="h-48 md:h-56 mb-4" />;
  };

  const renderPresentIllustration = () => {
    if (topic === 'wedding') {
      return <ModernWeddingIllustration className="h-48 md:h-56 mb-4" />;
    }
    return <ModernChuseokIllustration className="h-48 md:h-56 mb-4" />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 md:py-6">
      {/* Title Card */}
      <div className="bg-amber-100 border-4 border-amber-300 rounded-3xl p-6 shadow-md mb-6">
        <div className="flex items-center gap-3">
          <span className="p-3 bg-amber-500 text-white rounded-2xl text-3xl shadow-sm">
            🔎
          </span>
          <div>
            <span className="text-sm font-extrabold text-amber-800 bg-amber-200/90 px-3 py-1 rounded-full font-jua">
              활동 1 • 자료 살펴보기 ({config.emoji} {config.name})
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-amber-950 font-jua mt-1">
              🔎 풍습 변화 탐정
            </h2>
          </div>
        </div>

        <p className="text-amber-950 font-extrabold text-xl md:text-2xl mt-4 bg-white/80 p-4 rounded-2xl border-2 border-amber-200 font-jua leading-relaxed">
          옛날과 오늘날의 모습을 살펴보고 무엇이 달라졌는지 찾아봅시다.
        </p>
      </div>

      {/* Side-by-side Comparative Data Cards with MUCH LARGER text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Past Card */}
        <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-extrabold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-200 font-jua">
                과거의 풍습
              </span>
              <span className="text-sm font-bold text-amber-800 font-jua">{config.pastSubtitle}</span>
            </div>
            <h3 className="font-jua text-2xl md:text-3xl text-amber-950 font-extrabold mb-3 flex items-center gap-2">
              <span>{config.emoji}</span> {config.explore.past.title}
            </h3>
            
            {/* Visual Illustration */}
            {renderPastIllustration()}

            {/* 4 Feature Items with Large Readable Text */}
            <div className="space-y-3">
              {config.explore.past.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-amber-50/90 p-3.5 rounded-2xl border-2 border-amber-200">
                  <span className="text-2xl p-1 bg-white rounded-xl shadow-2xs shrink-0">{item.icon}</span>
                  <div>
                    <span className="font-extrabold text-amber-950 text-base md:text-lg font-jua">{item.label}</span>
                    <p className="text-sm md:text-base text-amber-900 font-bold leading-snug mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Present Card */}
        <div className="bg-white rounded-3xl p-6 border-4 border-pink-300 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-extrabold px-3 py-1 bg-pink-100 text-pink-900 rounded-full border border-pink-200 font-jua">
                오늘날의 풍습
              </span>
              <span className="text-sm font-bold text-pink-800 font-jua">{config.presentSubtitle}</span>
            </div>
            <h3 className="font-jua text-2xl md:text-3xl text-pink-950 font-extrabold mb-3 flex items-center gap-2">
              <span>{config.emoji}</span> {config.explore.present.title}
            </h3>

            {/* Visual Illustration */}
            {renderPresentIllustration()}

            {/* 4 Feature Items with Large Readable Text */}
            <div className="space-y-3">
              {config.explore.present.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-pink-50/90 p-3.5 rounded-2xl border-2 border-pink-200">
                  <span className="text-2xl p-1 bg-white rounded-xl shadow-2xs shrink-0">{item.icon}</span>
                  <div>
                    <span className="font-extrabold text-pink-950 text-base md:text-lg font-jua">{item.label}</span>
                    <p className="text-sm md:text-base text-pink-900 font-bold leading-snug mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Discussion prompt box */}
      <div className="bg-amber-100/90 border-3 border-amber-300 rounded-2xl p-5 text-center mb-6">
        <p className="font-jua text-amber-950 text-xl md:text-2xl font-extrabold flex items-center justify-center gap-2">
          <Eye className="w-6 h-6 text-amber-700 shrink-0" />
          <span>두 그림을 함께 보며 눈에 띄는 차이점을 손가락으로 짚어보세요!</span>
        </p>
      </div>

      {/* Big Action Button: 「🔎 다 살펴봤어요」 */}
      <div className="flex justify-center">
        <button
          onClick={handleProceed}
          className="w-full max-w-lg px-8 py-5 md:py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-2xl md:text-4xl font-extrabold rounded-3xl shadow-xl hover:shadow-2xl transition transform active:scale-95 flex items-center justify-center gap-3 font-jua border-4 border-amber-200"
        >
          <span>🔎 다 살펴봤어요</span>
          <ArrowRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
