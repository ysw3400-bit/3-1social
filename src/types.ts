export type CustomTopic = 'wedding' | 'chuseok';

export interface TeamInfo {
  name: string;
  memberCount: number;
  mascot: string;
}

export type StepKey =
  | 'start'
  | 'explore'
  | 'whatChanged'
  | 'discussChanged'
  | 'whyChanged'
  | 'discussWhy'
  | 'groupThought'
  | 'whatStayed'
  | 'discussStayed'
  | 'finalReport'
  | 'teacherDashboard';

export interface WhatChangedItem {
  id: string;
  icon: string;
  label: string;
  pastDetail: string;
  presentDetail: string;
}

export interface WhyChangedCard {
  id: string;
  icon: string;
  title: string;
  explanation: string;
  example: string;
}

export interface StayedHeartCard {
  id: string;
  icon: string;
  title: string;
  detail: string;
}

export interface GroupReportSubmission {
  id: string;
  timestamp: string;
  topic: CustomTopic;
  team: TeamInfo;
  selectedChangedItems: string[];
  selectedWhyItems: string[];
  groupReasonInput: string;
  selectedStayedHearts: string[];
  groupStayedInput: string;
}

export interface AppState {
  currentStep: StepKey;
  topic: CustomTopic;
  team: TeamInfo;
  // Step 2 & 3: What changed (multi-select)
  selectedChangedItems: string[];
  // Step 4: Why changed (multi-select)
  selectedWhyItems: string[];
  // Step 5: Group thought sentence & input
  groupReasonInput: string;
  groupThoughtSaved: boolean;
  // Step 6: What stayed (multi-select & input)
  selectedStayedHearts: string[];
  groupStayedInput: string;
}
