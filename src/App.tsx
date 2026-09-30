/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DetectiveHeader } from './components/DetectiveHeader';
import { StartScreen } from './components/StartScreen';
import { Activity1Explore } from './components/Activity1Explore';
import { Activity2WhatChanged } from './components/Activity2WhatChanged';
import { Activity3WhyChanged } from './components/Activity3WhyChanged';
import { Activity4GroupThought } from './components/Activity4GroupThought';
import { Activity5WhatStayed } from './components/Activity5WhatStayed';
import { Activity6FinalReport } from './components/Activity6FinalReport';
import { DedicatedDiscussionScreen } from './components/DedicatedDiscussionScreen';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AppState, TeamInfo, StepKey, CustomTopic } from './types';
import { TOPIC_DATA } from './data/topicData';
import { sounds } from './utils/audio';

const INITIAL_STATE: AppState = {
  currentStep: 'start',
  topic: 'wedding',
  team: {
    name: '1모둠',
    memberCount: 4,
    mascot: '🦊',
  },
  selectedChangedItems: ['clothes', 'place'],
  selectedWhyItems: ['people_life'],
  groupReasonInput: '도시와 아파트에 살면서 마당이 없어지고 편리한 예식장을 이용하게 되었기',
  groupThoughtSaved: false,
  selectedStayedHearts: ['together', 'happiness'],
  groupStayedInput: '가족이 건강하고 행복하게 살기를 바라는',
};

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const topicConfig = TOPIC_DATA[state.topic];

  // 1. Start -> Explore (Topic and team registered)
  const handleStart = (team: TeamInfo, topic: CustomTopic) => {
    const config = TOPIC_DATA[topic];
    setState((prev) => ({
      ...prev,
      team,
      topic,
      selectedChangedItems: [config.changedCards[0].id, config.changedCards[1].id],
      selectedWhyItems: [config.whyCards[0].id],
      groupReasonInput: config.quickReasons[0],
      selectedStayedHearts: [config.stayedHearts[0].id, config.stayedHearts[2].id],
      groupStayedInput: config.quickStayedSentences[0],
      currentStep: 'explore',
    }));
  };

  // 2. Explore -> WhatChanged
  const handleCompleteExplore = () => {
    setState((prev) => ({
      ...prev,
      currentStep: 'whatChanged',
    }));
  };

  // 3. WhatChanged -> Dedicated Discussion 1 (discussChanged)
  const handleCompleteWhatChanged = (selectedItems: string[]) => {
    setState((prev) => ({
      ...prev,
      selectedChangedItems: selectedItems,
      currentStep: 'discussChanged',
    }));
  };

  // 4. Dedicated Discussion 1 -> WhyChanged
  const handleCompleteDiscussChanged = () => {
    setState((prev) => ({
      ...prev,
      currentStep: 'whyChanged',
    }));
  };

  // 5. WhyChanged -> Dedicated Discussion 2 (discussWhy)
  const handleCompleteWhyChanged = (selectedWhyItems: string[]) => {
    setState((prev) => ({
      ...prev,
      selectedWhyItems,
      currentStep: 'discussWhy',
    }));
  };

  // 6. Dedicated Discussion 2 -> GroupThought
  const handleCompleteDiscussWhy = () => {
    setState((prev) => ({
      ...prev,
      currentStep: 'groupThought',
    }));
  };

  // 7. GroupThought -> WhatStayed
  const handleCompleteGroupThought = (reason: string) => {
    setState((prev) => ({
      ...prev,
      groupReasonInput: reason,
      groupThoughtSaved: true,
      currentStep: 'whatStayed',
    }));
  };

  // 8. WhatStayed -> Dedicated Discussion 3 (discussStayed)
  const handleCompleteWhatStayed = (selectedHearts: string[], stayedInput: string) => {
    setState((prev) => ({
      ...prev,
      selectedStayedHearts: selectedHearts,
      groupStayedInput: stayedInput,
      currentStep: 'discussStayed',
    }));
  };

  // 9. Dedicated Discussion 3 -> FinalReport
  const handleCompleteDiscussStayed = () => {
    setState((prev) => ({
      ...prev,
      currentStep: 'finalReport',
    }));
  };

  // 10. Complete Reset for Next Team
  const handleReset = () => {
    sounds.playPop();
    setState({
      ...INITIAL_STATE,
      team: {
        name: '다음 모둠',
        memberCount: 4,
        mascot: '🦁',
      },
      currentStep: 'start',
    });
  };

  // Switch to Teacher Dashboard
  const handleOpenTeacherDashboard = () => {
    sounds.playPop();
    setState((prev) => ({
      ...prev,
      currentStep: 'teacherDashboard',
    }));
  };

  // Return from Teacher Dashboard
  const handleBackFromTeacherDashboard = () => {
    sounds.playPop();
    setState((prev) => ({
      ...prev,
      currentStep: 'start',
    }));
  };

  // Jump to specific step for editing
  const handleEditSection = (step: 'whatChanged' | 'whyChanged' | 'groupThought' | 'whatStayed') => {
    setState((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

  // Get readable titles of selected changed items for the discussion screen
  const selectedChangedTitles = topicConfig.changedCards
    .filter((c) => state.selectedChangedItems.includes(c.id))
    .map((c) => c.title);

  // Get readable titles of selected why items
  const selectedWhyTitles = topicConfig.whyCards
    .filter((c) => state.selectedWhyItems.includes(c.id))
    .map((c) => c.title.replace(' 달라졌어요.', '').replace(' 다양해졌어요.', '').replace(' 생겼어요.', ''));

  // Get readable titles of selected stayed hearts
  const selectedStayedTitles = topicConfig.stayedHearts
    .filter((c) => state.selectedStayedHearts.includes(c.id))
    .map((c) => c.title);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/50 font-gothic selection:bg-amber-200 text-slate-900">
      {/* Header with step progress, topic badge, sound toggle, and teacher dashboard button */}
      <DetectiveHeader
        currentStep={state.currentStep}
        team={state.team}
        topic={state.topic}
        onReset={handleReset}
        onOpenTeacherDashboard={handleOpenTeacherDashboard}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center py-4">
        {state.currentStep === 'start' && (
          <StartScreen
            onStart={handleStart}
            onOpenTeacherDashboard={handleOpenTeacherDashboard}
          />
        )}

        {state.currentStep === 'explore' && (
          <Activity1Explore
            topic={state.topic}
            onComplete={handleCompleteExplore}
          />
        )}

        {state.currentStep === 'whatChanged' && (
          <Activity2WhatChanged
            topic={state.topic}
            initialSelected={state.selectedChangedItems}
            onComplete={handleCompleteWhatChanged}
          />
        )}

        {/* Dedicated Discussion Screen 1: What Changed */}
        {state.currentStep === 'discussChanged' && (
          <DedicatedDiscussionScreen
            stage="whatChanged"
            team={state.team}
            topicName={topicConfig.name}
            selectedItemsTitles={selectedChangedTitles}
            onComplete={handleCompleteDiscussChanged}
          />
        )}

        {state.currentStep === 'whyChanged' && (
          <Activity3WhyChanged
            topic={state.topic}
            initialSelected={state.selectedWhyItems}
            onComplete={handleCompleteWhyChanged}
          />
        )}

        {/* Dedicated Discussion Screen 2: Why Changed */}
        {state.currentStep === 'discussWhy' && (
          <DedicatedDiscussionScreen
            stage="whyChanged"
            team={state.team}
            topicName={topicConfig.name}
            selectedItemsTitles={selectedWhyTitles}
            onComplete={handleCompleteDiscussWhy}
          />
        )}

        {state.currentStep === 'groupThought' && (
          <Activity4GroupThought
            topic={state.topic}
            selectedChangedItems={state.selectedChangedItems}
            initialReason={state.groupReasonInput}
            onComplete={handleCompleteGroupThought}
          />
        )}

        {state.currentStep === 'whatStayed' && (
          <Activity5WhatStayed
            topic={state.topic}
            initialSelected={state.selectedStayedHearts}
            initialStayedInput={state.groupStayedInput}
            onComplete={handleCompleteWhatStayed}
          />
        )}

        {/* Dedicated Discussion Screen 3: What Stayed */}
        {state.currentStep === 'discussStayed' && (
          <DedicatedDiscussionScreen
            stage="whatStayed"
            team={state.team}
            topicName={topicConfig.name}
            selectedItemsTitles={selectedStayedTitles}
            onComplete={handleCompleteDiscussStayed}
          />
        )}

        {state.currentStep === 'finalReport' && (
          <Activity6FinalReport
            topic={state.topic}
            team={state.team}
            selectedChangedItems={state.selectedChangedItems}
            groupReasonInput={state.groupReasonInput}
            selectedStayedHearts={state.selectedStayedHearts}
            groupStayedInput={state.groupStayedInput}
            onReset={handleReset}
            onOpenTeacherDashboard={handleOpenTeacherDashboard}
            onEditSection={handleEditSection}
          />
        )}

        {state.currentStep === 'teacherDashboard' && (
          <TeacherDashboard onBackToApp={handleBackFromTeacherDashboard} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs md:text-sm text-amber-900/80 border-t border-amber-200 bg-amber-100/50">
        <p className="font-extrabold font-jua">
          🔎 초등학교 3학년 사회과 협동형 탐구 웹앱 「풍습 탐정단」
        </p>
        <p className="text-xs text-amber-800 mt-0.5 font-bold">
          자료 살펴보기 → 변화 찾기 → 친구와 대화하기 → 왜 달라졌을까 → 모둠 생각 만들기 → 변하지 않은 마음 → 교사 수합
        </p>
      </footer>
    </div>
  );
}
