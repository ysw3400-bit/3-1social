import React, { useState, useEffect } from 'react';
import {
  Users,
  Eye,
  BookOpen,
  Heart,
  RotateCcw,
  Sparkles,
  Printer,
  ChevronLeft,
  ChevronRight,
  Tv,
  LayoutGrid,
  BarChart3,
  Trash2,
  Download,
  PlusCircle,
} from 'lucide-react';
import { GroupReportSubmission, CustomTopic } from '../types';
import {
  getStoredReports,
  clearAllReports,
  seedSampleReports,
  subscribeToCloudReports,
} from '../utils/storage';
import { TOPIC_DATA } from '../data/topicData';
import { sounds } from '../utils/audio';

interface TeacherDashboardProps {
  onBackToApp: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onBackToApp }) => {
  const [reports, setReports] = useState<GroupReportSubmission[]>([]);
  const [filterTopic, setFilterTopic] = useState<'all' | CustomTopic>('all');
  const [activeTab, setActiveTab] = useState<'cards' | 'summary' | 'presenter'>('cards');
  const [presenterIndex, setPresenterIndex] = useState<number>(0);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);
  const [showSyncInfo, setShowSyncInfo] = useState<boolean>(false);
  const [isCloudLive, setIsCloudLive] = useState<boolean>(true);

  useEffect(() => {
    // 1. Initial cached load
    const cached = getStoredReports();
    if (cached.length > 0) {
      setReports(cached);
    }

    // 2. Real-time live subscription across all classroom tablets
    const unsubscribe = subscribeToCloudReports((updatedReports) => {
      setReports(updatedReports);
      setIsCloudLive(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSeedSamples = async () => {
    sounds.playSuccess();
    const seeded = await seedSampleReports();
    setReports(seeded);
  };

  const handleConfirmClear = async () => {
    sounds.playPop();
    await clearAllReports();
    setReports([]);
    setShowClearConfirm(false);
  };

  const handlePrint = () => {
    sounds.playPop();
    window.print();
  };

  const filteredReports = reports.filter((r) => {
    if (filterTopic === 'all') return true;
    return r.topic === filterTopic;
  });

  // Calculate overall statistics
  const changedItemsCount: Record<string, number> = {};
  const whyCount: Record<string, number> = {};
  const heartCount: Record<string, number> = {};

  filteredReports.forEach((r) => {
    r.selectedChangedItems.forEach((item) => {
      changedItemsCount[item] = (changedItemsCount[item] || 0) + 1;
    });
    r.selectedWhyItems.forEach((item) => {
      whyCount[item] = (whyCount[item] || 0) + 1;
    });
    r.selectedStayedHearts.forEach((item) => {
      heartCount[item] = (heartCount[item] || 0) + 1;
    });
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Header for Teacher Dashboard */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-orange-800 text-white rounded-3xl p-6 shadow-xl mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30">
              👩‍🏫
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 bg-amber-400 text-amber-950 font-extrabold rounded-full text-xs font-jua">
                  교사용 모둠 생각 수합 보드
                </span>
                <span className="px-3 py-0.5 bg-emerald-400 text-emerald-950 font-extrabold rounded-full text-xs font-jua flex items-center gap-1 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-800 animate-pulse"></span>
                  <span>실시간 클라우드 DB 연동됨</span>
                </span>
                <span className="text-amber-200 text-xs font-semibold">
                  사회 3학년 「옛날과 오늘날의 풍습」
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-jua mt-0.5 tracking-tight">
                학급 모둠 탐구 결과 모아보기
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onBackToApp}
              className="px-5 py-3 bg-white text-amber-950 font-extrabold rounded-2xl shadow hover:bg-amber-50 transition active:scale-95 font-jua flex items-center gap-2 text-base md:text-lg"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>학생 화면으로 돌아가기</span>
            </button>
          </div>
        </div>

        {/* View Switcher & Action bar */}
        <div className="mt-6 pt-5 border-t border-white/20 flex items-center justify-between flex-wrap gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { sounds.playPop(); setActiveTab('cards'); }}
              className={`px-4 py-2 rounded-xl font-bold font-jua text-sm md:text-base transition flex items-center gap-1.5 ${
                activeTab === 'cards'
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>모둠별 카드 ({filteredReports.length}개)</span>
            </button>

            <button
              onClick={() => { sounds.playPop(); setActiveTab('summary'); }}
              className={`px-4 py-2 rounded-xl font-bold font-jua text-sm md:text-base transition flex items-center gap-1.5 ${
                activeTab === 'summary'
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>학급 생각 통계 비교</span>
            </button>

            <button
              onClick={() => { sounds.playPop(); setActiveTab('presenter'); }}
              className={`px-4 py-2 rounded-xl font-bold font-jua text-sm md:text-base transition flex items-center gap-1.5 ${
                activeTab === 'presenter'
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>빔프로젝터 발표 모드</span>
            </button>
          </div>

          {/* Topic Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-200 font-bold">주제:</span>
            <button
              onClick={() => setFilterTopic('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filterTopic === 'all' ? 'bg-white text-amber-950' : 'bg-white/10 text-white'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilterTopic('wedding')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filterTopic === 'wedding' ? 'bg-white text-amber-950' : 'bg-white/10 text-white'
              }`}
            >
              💍 결혼식
            </button>
            <button
              onClick={() => setFilterTopic('chuseok')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filterTopic === 'chuseok' ? 'bg-white text-amber-950' : 'bg-white/10 text-white'
              }`}
            >
              🌕 추석
            </button>
          </div>
        </div>
      </div>

      {/* Control Buttons (Seed & Clear & Print) */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {reports.length === 0 && (
            <button
              onClick={handleSeedSamples}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-sm font-jua"
            >
              <PlusCircle className="w-4 h-4" />
              <span>수업 시연용 샘플 모둠 4개 불러오기</span>
            </button>
          )}

          {reports.length > 0 && (
            <button
              onClick={handleSeedSamples}
              className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs"
              title="샘플 데이터를 추가로 불러옵니다"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>샘플 데이터 추가</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white border border-amber-300 text-amber-900 rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-sm hover:bg-amber-50"
          >
            <Printer className="w-4 h-4" />
            <span>전체 모둠 결과 인쇄/PDF</span>
          </button>

          <button
            onClick={() => setShowSyncInfo(true)}
            className="px-4 py-2 bg-sky-50 border border-sky-300 text-sky-900 rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-sm hover:bg-sky-100 font-jua"
          >
            <span>🌐 실시간 연동 안내</span>
          </button>
        </div>

        {reports.length > 0 && (
          <button
            onClick={() => {
              sounds.playPop();
              setShowClearConfirm(true);
            }}
            className="px-4 py-2 bg-rose-100 border-2 border-rose-300 text-rose-800 hover:bg-rose-200 rounded-xl text-sm font-extrabold flex items-center gap-1.5 shadow-xs font-jua transition active:scale-95"
          >
            <Trash2 className="w-4 h-4 text-rose-700" />
            <span>데이터 비우기 (새 수업)</span>
          </button>
        )}
      </div>

      {/* In-app Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-4 border-rose-400 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-3xl mx-auto mb-4 border-2 border-rose-300">
              🗑️
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 font-jua">
              모든 모둠 결과를 비울까요?
            </h3>
            <p className="text-sm md:text-base text-slate-600 mt-2 font-bold leading-relaxed">
              지금까지 저장된 {reports.length}개의 모둠 탐구 결과가 모두 지워집니다.<br />
              다음 차시나 새 학급 수업을 시작할 때 비워주세요!
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-base rounded-2xl transition font-jua"
              >
                취소
              </button>
              <button
                onClick={handleConfirmClear}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base rounded-2xl shadow-lg transition active:scale-95 font-jua"
              >
                네, 모두 비울래요
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Sync & Netlify Information Modal */}
      {showSyncInfo && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-4 border-sky-400 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl text-left">
            <div className="flex items-center justify-between border-b-2 border-sky-100 pb-3 mb-4">
              <h3 className="text-2xl font-extrabold text-slate-900 font-jua flex items-center gap-2">
                <span>🌐</span> Netlify 발행 및 실시간 모둠 수합 안내
              </h3>
              <button
                onClick={() => setShowSyncInfo(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-sm md:text-base text-slate-700 leading-relaxed font-medium">
              <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200">
                <p className="font-extrabold text-amber-950 font-jua text-base md:text-lg">
                  📌 Netlify에 그대로 배포하면 어떻게 되나요?
                </p>
                <p className="mt-1 text-amber-900 text-sm font-bold">
                  Netlify는 화면(HTML/JS)을 띄워주는 <strong>정적 호스팅</strong> 서비스입니다. 따라서 각 태블릿이 독립된 <strong>로컬 브라우저 저장소(localStorage)</strong>에 각자 저장되므로, 다른 기기끼리는 무선으로 내용이 서로 전달되지 않습니다.
                </p>
              </div>

              <div className="p-3.5 bg-sky-50 rounded-2xl border-2 border-sky-200">
                <p className="font-extrabold text-sky-950 font-jua text-base md:text-lg">
                  ✨ 모둠 태블릿에서 제출한 것을 교사 화면에서 실시간으로 보려면?
                </p>
                <p className="mt-1 text-sky-900 text-sm font-bold">
                  각 모둠 태블릿에서 누른 결과가 인터넷을 통해 선생님 화면으로 즉시 전송되려면 <strong>공유 클라우드 데이터베이스(예: Firebase Firestore)</strong>가 연결되어야 합니다.
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border-2 border-emerald-200 text-emerald-950 text-sm font-bold">
                💡 <strong>현재 교실 활용 팁:</strong><br />
                1. 한 태블릿을 모둠끼리 넘겨받아 사용하는 경우 현재 상태로도 완벽히 저장·수합됩니다.<br />
                2. 여러 대의 개별 태블릿에서 선생님 컴퓨터로 실시간 원격 수합을 원하시면 말씀해 주시면 클라우드 DB 연동을 진행해 드립니다!
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowSyncInfo(false)}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl font-jua"
              >
                확인했습니다
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No reports notice */}
      {filteredReports.length === 0 && (
        <div className="bg-white border-3 border-amber-300 rounded-3xl p-12 text-center shadow-lg">
          <div className="text-5xl mb-3">📋</div>
          <h3 className="text-2xl font-extrabold text-amber-950 font-jua">
            아직 제출된 모둠 탐구 결과가 없습니다
          </h3>
          <p className="text-amber-800 text-base mt-2 font-medium">
            학생들이 태블릿에서 탐구를 완료하고 「우리 모둠 탐구 결과」를 확인하면 이곳에 자동으로 모아집니다.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSeedSamples}
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-2xl shadow-lg transition font-jua flex items-center gap-2 text-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span>수업 시연용 샘플 모둠 4개 불러오기</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. Cards View (Grid of Group Results) */}
      {filteredReports.length > 0 && activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => {
            const topicCfg = TOPIC_DATA[report.topic];
            return (
              <div
                key={report.id}
                className="bg-white border-3 border-amber-300 rounded-3xl p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b-2 border-amber-100 pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{report.team.mascot}</span>
                      <div>
                        <h4 className="text-xl md:text-2xl font-extrabold text-amber-950 font-jua">
                          {report.team.name}
                        </h4>
                        <span className="text-xs text-amber-800 font-bold">
                          {report.team.memberCount}명 탐구단 • {report.timestamp}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-extrabold text-xs font-jua border border-amber-300">
                      {topicCfg.emoji} {topicCfg.name}
                    </span>
                  </div>

                  {/* Section 1: Changed Items */}
                  <div className="mb-4">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border border-amber-200">
                      <Eye className="w-3 h-3" />
                      <span>우리가 찾은 변화</span>
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {report.selectedChangedItems.map((id) => (
                        <span
                          key={id}
                          className="px-3 py-1 bg-amber-100 text-amber-900 rounded-xl text-xs md:text-sm font-extrabold font-jua"
                        >
                          {id === 'clothes' ? '👕 옷' : id === 'place' ? '🏠 장소' : id === 'ceremony' ? '💍 방법' : id === 'food' ? '🥟 음식' : id === 'activities' ? '🌕 놀이' : '👨‍👩‍👧 생활'}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Section 2: Why Changed */}
                  <div className="mb-4">
                    <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border border-orange-200">
                      <BookOpen className="w-3 h-3" />
                      <span>우리가 생각한 까닭</span>
                    </span>
                    <p className="mt-1.5 text-sm md:text-base font-extrabold text-orange-950 font-jua bg-orange-50/70 p-3 rounded-2xl border border-orange-200 leading-snug">
                      &ldquo;{report.groupReasonInput} 때문이라고 생각합니다.&rdquo;
                    </p>
                  </div>

                  {/* Section 3: Stayed Heart */}
                  <div>
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border border-rose-200">
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      <span>변하지 않은 마음</span>
                    </span>
                    <p className="mt-1.5 text-sm md:text-base font-extrabold text-rose-950 font-jua bg-rose-50/70 p-3 rounded-2xl border border-rose-200 leading-snug">
                      &ldquo;풍습의 모습은 달라졌지만, <span className="text-rose-700 underline">{report.groupStayedInput}</span> 마음은 비슷합니다.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Summary View (Classroom Comparison) */}
      {filteredReports.length > 0 && activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Changed Elements Stats */}
          <div className="bg-white border-3 border-amber-300 rounded-3xl p-6 shadow-md">
            <h3 className="text-xl md:text-2xl font-extrabold text-amber-950 font-jua flex items-center gap-2 mb-4">
              <Eye className="w-6 h-6 text-amber-700" />
              <span>학급 모둠들이 가장 많이 발견한 변화</span>
            </h3>

            <div className="space-y-3">
              {Object.entries(changedItemsCount)
                .sort((a, b) => b[1] - a[1])
                .map(([item, count]) => {
                  const percentage = Math.round((count / filteredReports.length) * 100);
                  const itemName = item === 'clothes' ? '👕 옷' : item === 'place' ? '🏠 장소' : item === 'ceremony' ? '💍 결혼하는 방법' : item === 'food' ? '🥟 음식' : item === 'activities' ? '🌕 놀이와 활동' : '👨‍👩‍👧 생활 모습';
                  return (
                    <div key={item} className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
                      <div className="flex items-center justify-between mb-1 text-sm md:text-base font-bold font-jua">
                        <span className="text-amber-950">{itemName}</span>
                        <span className="text-amber-700">{count}개 모둠 ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-amber-200/60 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-600 h-full rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Group Reasons Side-by-Side Comparison */}
          <div className="bg-white border-3 border-orange-300 rounded-3xl p-6 shadow-md">
            <h3 className="text-xl md:text-2xl font-extrabold text-orange-950 font-jua flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-orange-700" />
              <span>모둠별 변화의 까닭 한눈에 비교하기</span>
            </h3>

            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200 flex items-start gap-3"
                >
                  <span className="px-2.5 py-1 bg-orange-200 text-orange-900 rounded-xl font-extrabold text-xs font-jua shrink-0">
                    {report.team.name}
                  </span>
                  <p className="text-base md:text-lg font-extrabold text-orange-950 font-jua leading-relaxed">
                    &ldquo;{report.groupReasonInput} 때문이라고 생각합니다.&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stayed Hearts Comparison */}
          <div className="bg-white border-3 border-rose-300 rounded-3xl p-6 shadow-md">
            <h3 className="text-xl md:text-2xl font-extrabold text-rose-950 font-jua flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-rose-600 fill-rose-500" />
              <span>모둠별 변하지 않은 소중한 마음</span>
            </h3>

            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 flex items-start gap-3"
                >
                  <span className="px-2.5 py-1 bg-rose-200 text-rose-900 rounded-xl font-extrabold text-xs font-jua shrink-0">
                    {report.team.name}
                  </span>
                  <p className="text-base md:text-lg font-extrabold text-rose-950 font-jua leading-relaxed">
                    &ldquo;{report.groupStayedInput} 마음은 옛날이나 지금이나 똑같습니다.&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Beam Projector / Large Screen Presentation Mode */}
      {filteredReports.length > 0 && activeTab === 'presenter' && (
        <div className="space-y-4">
          {/* Navigation for presenter */}
          <div className="flex items-center justify-between bg-amber-100 p-3 rounded-2xl border-2 border-amber-300">
            <button
              onClick={() => {
                sounds.playPop();
                setPresenterIndex((prev) => (prev > 0 ? prev - 1 : filteredReports.length - 1));
              }}
              className="px-4 py-2 bg-white text-amber-950 font-bold rounded-xl shadow-xs hover:bg-amber-50 flex items-center gap-1 font-jua text-base"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>이전 모둠</span>
            </button>

            <span className="font-extrabold text-amber-950 text-lg font-jua">
              모둠 발표 {presenterIndex + 1} / {filteredReports.length}
            </span>

            <button
              onClick={() => {
                sounds.playPop();
                setPresenterIndex((prev) => (prev < filteredReports.length - 1 ? prev + 1 : 0));
              }}
              className="px-4 py-2 bg-white text-amber-950 font-bold rounded-xl shadow-xs hover:bg-amber-50 flex items-center gap-1 font-jua text-base"
            >
              <span>다음 모둠</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Huge Fullscreen Presenter Card */}
          {filteredReports[presenterIndex] && (
            <div className="bg-white border-4 border-amber-400 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500 text-white rounded-full text-base font-extrabold font-jua mb-4">
                <span>{filteredReports[presenterIndex].team.mascot}</span>
                <span>{filteredReports[presenterIndex].team.name}의 탐정 발표</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-amber-950 font-jua tracking-tight mb-6">
                &ldquo;우리 모둠의 탐구 결과&rdquo;
              </h3>

              <div className="space-y-6 text-left max-w-3xl mx-auto">
                {/* 1. What changed */}
                <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-200">
                  <span className="text-xs font-bold text-amber-700 bg-amber-200 px-3 py-1 rounded-full font-jua">
                    우리가 찾은 변화
                  </span>
                  <p className="text-2xl md:text-3xl font-extrabold text-amber-950 font-jua mt-2">
                    {filteredReports[presenterIndex].selectedChangedItems.map((id) => (id === 'clothes' ? '👕 옷' : id === 'place' ? '🏠 장소' : id === 'ceremony' ? '💍 방법' : id === 'food' ? '🥟 음식' : id === 'activities' ? '🌕 놀이' : '👨‍👩‍👧 생활 모습')).join(', ')}
                  </p>
                </div>

                {/* 2. Why changed */}
                <div className="p-5 bg-orange-50 rounded-2xl border-2 border-orange-200">
                  <span className="text-xs font-bold text-orange-700 bg-orange-200 px-3 py-1 rounded-full font-jua">
                    우리가 생각한 까닭
                  </span>
                  <p className="text-2xl md:text-3xl font-extrabold text-orange-950 font-jua mt-2 leading-relaxed">
                    &ldquo;{filteredReports[presenterIndex].groupReasonInput} 때문입니다.&rdquo;
                  </p>
                </div>

                {/* 3. Stayed heart */}
                <div className="p-5 bg-rose-50 rounded-2xl border-2 border-rose-200">
                  <span className="text-xs font-bold text-rose-700 bg-rose-200 px-3 py-1 rounded-full font-jua">
                    달라졌지만 변하지 않은 마음
                  </span>
                  <p className="text-2xl md:text-3xl font-extrabold text-rose-950 font-jua mt-2 leading-relaxed">
                    &ldquo;{filteredReports[presenterIndex].groupStayedInput} 마음은 변함없습니다.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
