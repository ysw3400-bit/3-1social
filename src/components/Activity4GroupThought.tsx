import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Edit3 } from 'lucide-react';
import { CustomTopic } from '../types';
import { TOPIC_DATA } from '../data/topicData';
import { sounds } from '../utils/audio';

interface Activity4GroupThoughtProps {
  topic: CustomTopic;
  selectedChangedItems: string[];
  initialReason: string;
  onComplete: (reason: string) => void;
}

export const Activity4GroupThought: React.FC<Activity4GroupThoughtProps> = ({
  topic,
  selectedChangedItems,
  initialReason,
  onComplete,
}) => {
  const config = TOPIC_DATA[topic];
  const [reasonInput, setReasonInput] = useState<string>(
    initialReason || config.quickReasons[0]
  );
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const changedTitles = config.changedCards
    .filter((c) => selectedChangedItems.includes(c.id))
    .map((c) => c.title)
    .join(', ') || '여러 모습';

  const handleSave = () => {
    if (!reasonInput.trim()) return;
    sounds.playSuccess();
    setIsSaved(true);
  };

  const handleProceed = () => {
    sounds.playSuccess();
    onComplete(reasonInput.trim());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 md:py-6">
      {/* Title */}
      <div className="bg-amber-100 border-4 border-amber-300 rounded-3xl p-5 md:p-6 shadow-md mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <span className="p-2.5 md:p-3 bg-amber-500 text-white rounded-2xl text-2xl md:text-3xl shadow-sm">
            💡
          </span>
          <div>
            <span className="text-xs md:text-sm font-extrabold text-amber-800 bg-amber-200/90 px-3 py-0.5 rounded-full font-jua">
              활동 4 • 생각 모으기 ({config.emoji} {config.name})
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-amber-950 font-jua mt-0.5">
              💡 우리 모둠의 생각
            </h2>
          </div>
        </div>

        <p className="text-amber-950 font-extrabold text-lg sm:text-xl md:text-2xl mt-3 bg-white/80 p-3.5 rounded-2xl border-2 border-amber-200 font-jua leading-relaxed">
          친구들과 이야기한 내용을 모아, 우리 모둠의 결론 문장을 완성해 보세요.
        </p>
      </div>

      {/* Main Sentence Cards - Side-by-side on Landscape Tablets (lg:grid-cols-2) */}
      <div className="bg-white border-4 border-amber-400 rounded-3xl p-5 md:p-8 shadow-2xl mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 text-center">
          {/* Sentence 1 */}
          <div className="p-5 md:p-6 bg-amber-50 rounded-3xl border-3 border-amber-300 flex flex-col justify-center">
            <span className="text-xs md:text-sm font-extrabold text-amber-800 bg-amber-200/90 px-4 py-1 rounded-full mb-2 inline-block font-jua self-center">
              우리가 발견한 변화
            </span>
            <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-950 font-jua leading-relaxed">
              &ldquo;옛날과 오늘날의 {config.name}은{' '}
              <span className="text-amber-800 bg-amber-200/90 px-2.5 py-0.5 rounded-xl underline decoration-amber-500 decoration-wavy">
                {changedTitles}
              </span>
              이/가 달라졌습니다.&rdquo;
            </p>
          </div>

          {/* Sentence 2 */}
          <div className="p-5 md:p-6 bg-orange-50 rounded-3xl border-3 border-orange-300 flex flex-col justify-center">
            <span className="text-xs md:text-sm font-extrabold text-orange-800 bg-orange-200/90 px-4 py-1 rounded-full mb-2 inline-block font-jua self-center">
              우리 모둠이 생각한 까닭
            </span>
            <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-orange-950 font-jua leading-relaxed">
              &ldquo;그 까닭은{' '}
              <span className="text-orange-900 bg-orange-200/90 px-2.5 py-0.5 rounded-xl underline decoration-orange-500 decoration-wavy">
                {reasonInput || '__________________'}
              </span>{' '}
              때문이라고 생각합니다.&rdquo;
            </p>
          </div>
        </div>

        {/* Input Box Section */}
        {!isSaved ? (
          <div className="mt-6 pt-5 border-t-2 border-amber-200">
            <label className="block text-base md:text-lg font-extrabold text-amber-950 mb-2 font-jua">
              ✏️ 까닭을 직접 쓰거나 아래 도움 문장을 터치해 보세요:
            </label>

            {/* Quick helper buttons in grid for landscape */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
              {config.quickReasons.map((reason, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setReasonInput(reason);
                  }}
                  className="text-left text-xs sm:text-sm font-extrabold p-3 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-2xl border-2 border-amber-300 transition active:scale-95 font-jua leading-snug"
                >
                  💡 {reason}
                </button>
              ))}
            </div>

            {/* Large text input */}
            <textarea
              value={reasonInput}
              onChange={(e) => setReasonInput(e.target.value)}
              placeholder="친구들과 이야기한 까닭을 적어보세요..."
              rows={2}
              className="w-full text-lg sm:text-xl md:text-2xl font-extrabold text-amber-950 bg-amber-50/50 border-3 border-amber-300 rounded-2xl p-4 focus:outline-none focus:border-amber-500 placeholder:text-amber-300 font-jua"
            />

            {/* Big button: 📣 우리 모둠 생각 저장하기 */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleSave}
                disabled={!reasonInput.trim()}
                className="w-full max-w-lg px-8 py-4 sm:py-5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:opacity-40 text-white text-xl sm:text-2xl font-extrabold rounded-2xl shadow-xl transition transform active:scale-95 flex items-center justify-center gap-3 font-jua border-4 border-amber-300"
              >
                <span>📣 우리 모둠 생각 저장하기</span>
              </button>
            </div>
          </div>
        ) : (
          /* Saved view */
          <div className="mt-6 pt-5 border-t-2 border-amber-200 text-center animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-100 text-emerald-900 rounded-full font-extrabold text-base md:text-lg mb-4 border-2 border-emerald-300 font-jua">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>우리 모둠의 생각이 멋지게 저장되었어요!</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsSaved(false)}
                className="w-full sm:w-auto px-6 py-3.5 bg-white border-3 border-amber-300 text-amber-900 text-base md:text-lg font-extrabold rounded-2xl hover:bg-amber-50 flex items-center justify-center gap-2 font-jua"
              >
                <Edit3 className="w-5 h-5" />
                <span>까닭 다시 고치기</span>
              </button>

              <button
                onClick={handleProceed}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-xl sm:text-2xl font-extrabold rounded-2xl shadow-xl transition transform active:scale-95 flex items-center justify-center gap-3 font-jua border-4 border-amber-200"
              >
                <span>❤️ 다음: 변하지 않은 마음 생각하기</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
