import { collection, doc, setDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { GroupReportSubmission, CustomTopic } from '../types';

const STORAGE_KEY = 'customs_detective_group_reports';

export const getStoredReports = (): GroupReportSubmission[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as GroupReportSubmission[];
  } catch {
    return [];
  }
};

export const saveGroupReport = async (submission: GroupReportSubmission): Promise<void> => {
  // 1. Local storage save
  try {
    const existing = getStoredReports();
    const updated = existing.filter(
      (r) => !(r.team.name === submission.team.name && r.topic === submission.topic)
    );
    updated.push(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore local storage error
  }

  // 2. Real-time Cloud Firestore save
  try {
    const safeDocId = `${submission.team.name.replace(/[^a-zA-Z0-9가-힣]/g, '_')}_${submission.topic}`;
    const reportRef = doc(db, 'groupReports', safeDocId);
    await setDoc(reportRef, {
      id: safeDocId,
      timestamp: submission.timestamp,
      topic: submission.topic,
      teamName: submission.team.name,
      teamMascot: submission.team.mascot,
      teamMemberCount: submission.team.memberCount,
      selectedChangedItems: submission.selectedChangedItems,
      selectedWhyItems: submission.selectedWhyItems || [],
      groupReasonInput: submission.groupReasonInput,
      selectedStayedHearts: submission.selectedStayedHearts,
      groupStayedInput: submission.groupStayedInput,
      createdAt: Date.now(),
    });
  } catch (error) {
    console.warn('Firestore cloud sync failed (offline or network error):', error);
  }
};

export const subscribeToCloudReports = (
  onUpdate: (reports: GroupReportSubmission[]) => void
): (() => void) => {
  try {
    const reportsCol = collection(db, 'groupReports');
    const unsubscribe = onSnapshot(
      reportsCol,
      (snapshot) => {
        const cloudReports: GroupReportSubmission[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          cloudReports.push({
            id: data.id || docSnap.id,
            timestamp: data.timestamp || '',
            topic: data.topic as CustomTopic,
            team: {
              name: data.teamName || '모둠',
              mascot: data.teamMascot || '🦊',
              memberCount: data.teamMemberCount || 4,
            },
            selectedChangedItems: data.selectedChangedItems || [],
            selectedWhyItems: data.selectedWhyItems || [],
            groupReasonInput: data.groupReasonInput || '',
            selectedStayedHearts: data.selectedStayedHearts || [],
            groupStayedInput: data.groupStayedInput || '',
          });
        });

        if (cloudReports.length > 0) {
          // Sync with local storage
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudReports));
          } catch {
            // Ignore
          }
          onUpdate(cloudReports);
        } else {
          // If Firestore is empty, use whatever is in localStorage or notify empty
          const localList = getStoredReports();
          onUpdate(localList);
        }
      },
      (error) => {
        console.warn('Real-time listener warning (using local fallback):', error);
        onUpdate(getStoredReports());
      }
    );
    return unsubscribe;
  } catch (error) {
    console.warn('Could not establish Firestore listener:', error);
    onUpdate(getStoredReports());
    return () => {};
  }
};

export const clearAllReports = async (): Promise<void> => {
  // 1. Clear local storage
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }

  // 2. Clear Cloud Firestore documents
  try {
    const snapshot = await getDocs(collection(db, 'groupReports'));
    const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.warn('Firestore clear error:', error);
  }
};

export const seedSampleReports = async (): Promise<GroupReportSubmission[]> => {
  const sampleReports: GroupReportSubmission[] = [
    {
      id: 'sample-1',
      timestamp: '09:15',
      topic: 'wedding',
      team: { name: '1모둠 (슬기)', memberCount: 4, mascot: '🦊' },
      selectedChangedItems: ['clothes', 'place'],
      selectedWhyItems: ['people_life', 'living_method'],
      groupReasonInput: '도시와 아파트에 살면서 마당이 없어지고 편리한 예식장을 이용하게 되었기',
      selectedStayedHearts: ['together', 'happiness'],
      groupStayedInput: '가족이 건강하고 행복하게 살기를 바라는',
    },
    {
      id: 'sample-2',
      timestamp: '09:20',
      topic: 'wedding',
      team: { name: '2모둠 (용기)', memberCount: 4, mascot: '🦁' },
      selectedChangedItems: ['clothes', 'ceremony'],
      selectedWhyItems: ['choice_variety', 'new_lifestyle'],
      groupReasonInput: '자신만의 개성과 취향에 맞게 원하는 방식을 자유롭게 선택하기',
      selectedStayedHearts: ['gratitude', 'joy'],
      groupStayedInput: '부모님께 감사하고 새로운 시작을 다 함께 축하해 주는',
    },
    {
      id: 'sample-3',
      timestamp: '09:25',
      topic: 'chuseok',
      team: { name: '3모둠 (지혜)', memberCount: 3, mascot: '🦉' },
      selectedChangedItems: ['food', 'activities'],
      selectedWhyItems: ['living_method', 'choice_variety'],
      groupReasonInput: '방앗간과 마트가 생겨서 음식을 직접 빚지 않고 편리하게 살 수 있게 되었기',
      selectedStayedHearts: ['together', 'joy'],
      groupStayedInput: '오랜만에 가족이 모여 반갑게 정을 나누는',
    },
    {
      id: 'sample-4',
      timestamp: '09:30',
      topic: 'chuseok',
      team: { name: '4모둠 (반짝)', memberCount: 4, mascot: '🐬' },
      selectedChangedItems: ['clothes', 'lifestyle'],
      selectedWhyItems: ['people_life', 'new_lifestyle'],
      groupReasonInput: '가족들이 멀리 떨어져 살면서 연휴를 여행이나 휴식으로 다양하게 보내기',
      selectedStayedHearts: ['gratitude', 'happiness'],
      groupStayedInput: '한 해 동안 농사지은 은혜와 부모님께 감사하는',
    },
  ];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleReports));
  } catch {
    // Ignore
  }

  // Also seed to Firestore
  try {
    for (const report of sampleReports) {
      await saveGroupReport(report);
    }
  } catch {
    // Ignore
  }

  return sampleReports;
};
