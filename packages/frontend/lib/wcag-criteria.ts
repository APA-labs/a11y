import type { Lang } from './i18n'

export interface WcagCriterion {
  id: string
  name: string
  level: 'A' | 'AA' | 'AAA'
  principle: string
  description: string
  url: string
}

interface WcagCriterionRaw {
  id: string
  name: string
  level: 'A' | 'AA' | 'AAA'
  principle: { ko: string; en: string }
  description: { ko: string; en: string }
  url: string
}

const WCAG_CRITERIA: Record<string, WcagCriterionRaw> = {
  '1.3.1': {
    id: '1.3.1',
    name: 'Info and Relationships',
    level: 'A',
    principle: { ko: '인식의 용이성', en: 'Perceivable' },
    description: {
      ko: '정보, 구조, 관계가 프로그래밍 방식으로 결정되거나 텍스트로 제공되어야 합니다.',
      en: 'Information, structure, and relationships must be programmatically determined or available in text.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html'
  },
  '1.4.1': {
    id: '1.4.1',
    name: 'Use of Color',
    level: 'A',
    principle: { ko: '인식의 용이성', en: 'Perceivable' },
    description: {
      ko: '색상만으로 정보를 전달하거나 동작을 나타내서는 안 됩니다. 색상 외 추가 시각적 단서가 필요합니다.',
      en: 'Color must not be the only visual means of conveying information, indicating an action, or distinguishing a visual element.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html'
  },
  '1.4.3': {
    id: '1.4.3',
    name: 'Contrast (Minimum)',
    level: 'AA',
    principle: { ko: '인식의 용이성', en: 'Perceivable' },
    description: {
      ko: '텍스트와 배경 간 최소 4.5:1(일반), 3:1(큰 텍스트)의 명도 대비를 충족해야 합니다.',
      en: 'Text must have a contrast ratio of at least 4.5:1 (normal text) or 3:1 (large text) against its background.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html'
  },
  '1.4.13': {
    id: '1.4.13',
    name: 'Content on Hover or Focus',
    level: 'AA',
    principle: { ko: '인식의 용이성', en: 'Perceivable' },
    description: {
      ko: '호버·포커스로 나타나는 콘텐츠는 해제 가능, 호버 유지 가능, 자동 사라짐 없어야 합니다.',
      en: 'Content that appears on hover or focus must be dismissible, hoverable, and persistent.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html'
  },
  '2.1.1': {
    id: '2.1.1',
    name: 'Keyboard',
    level: 'A',
    principle: { ko: '운용의 용이성', en: 'Operable' },
    description: {
      ko: '모든 기능을 키보드만으로 조작할 수 있어야 합니다. 특정 입력 경로에 의존하면 안 됩니다.',
      en: 'All functionality must be operable through a keyboard interface without requiring specific timings.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html'
  },
  '2.1.2': {
    id: '2.1.2',
    name: 'No Keyboard Trap',
    level: 'A',
    principle: { ko: '운용의 용이성', en: 'Operable' },
    description: {
      ko: '키보드 포커스가 컴포넌트에 갇히지 않아야 합니다. 표준 방법으로 빠져나올 수 있어야 합니다.',
      en: 'Keyboard focus must not become trapped in a component. Users must be able to move focus away using standard keys.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html'
  },
  '2.2.3': {
    id: '2.2.3',
    name: 'No Timing',
    level: 'AAA',
    principle: { ko: '운용의 용이성', en: 'Operable' },
    description: {
      ko: '콘텐츠에 시간 제한이 없어야 합니다. 사용자가 자신의 속도로 작업할 수 있어야 합니다.',
      en: 'Timing must not be an essential part of the activity, except for real-time events.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/no-timing.html'
  },
  '2.4.1': {
    id: '2.4.1',
    name: 'Bypass Blocks',
    level: 'A',
    principle: { ko: '운용의 용이성', en: 'Operable' },
    description: {
      ko: '반복되는 콘텐츠 블록을 건너뛸 수 있는 메커니즘(스킵 링크, 랜드마크 등)을 제공해야 합니다.',
      en: 'A mechanism must be available to bypass blocks of content that are repeated on multiple pages.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html'
  },
  '2.4.4': {
    id: '2.4.4',
    name: 'Link Purpose (In Context)',
    level: 'A',
    principle: { ko: '운용의 용이성', en: 'Operable' },
    description: {
      ko: '링크 텍스트만으로 또는 주변 문맥과 함께 링크의 목적을 파악할 수 있어야 합니다.',
      en: 'The purpose of each link must be determinable from the link text alone or from its context.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html'
  },
  '2.4.7': {
    id: '2.4.7',
    name: 'Focus Visible',
    level: 'AA',
    principle: { ko: '운용의 용이성', en: 'Operable' },
    description: {
      ko: '키보드 포커스를 받은 요소에 시각적으로 인지 가능한 포커스 표시가 있어야 합니다.',
      en: 'Any keyboard operable interface must have a mode of operation where the keyboard focus indicator is visible.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html'
  },
  '2.4.8': {
    id: '2.4.8',
    name: 'Location',
    level: 'AAA',
    principle: { ko: '운용의 용이성', en: 'Operable' },
    description: {
      ko: '사이트 내에서 현재 사용자의 위치를 알 수 있는 정보(브레드크럼 등)를 제공해야 합니다.',
      en: "Information about the user's location within a set of web pages must be available (e.g., breadcrumbs)."
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/location.html'
  },
  '3.3.1': {
    id: '3.3.1',
    name: 'Error Identification',
    level: 'A',
    principle: { ko: '이해의 용이성', en: 'Understandable' },
    description: {
      ko: '입력 오류가 자동 감지되면, 오류 항목을 식별하고 텍스트로 설명해야 합니다.',
      en: 'If an input error is automatically detected, the item in error must be identified and described to the user in text.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html'
  },
  '3.3.2': {
    id: '3.3.2',
    name: 'Labels or Instructions',
    level: 'A',
    principle: { ko: '이해의 용이성', en: 'Understandable' },
    description: {
      ko: '사용자 입력이 필요할 때 레이블 또는 안내 문구를 제공해야 합니다.',
      en: 'Labels or instructions must be provided when content requires user input.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html'
  },
  '3.3.3': {
    id: '3.3.3',
    name: 'Error Suggestion',
    level: 'AA',
    principle: { ko: '이해의 용이성', en: 'Understandable' },
    description: {
      ko: '입력 오류가 감지되고 수정 제안이 가능하면, 사용자에게 제안을 제공해야 합니다.',
      en: 'If an input error is detected and suggestions for correction are known, the suggestion must be provided to the user.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html'
  },
  '4.1.2': {
    id: '4.1.2',
    name: 'Name, Role, Value',
    level: 'A',
    principle: { ko: '견고성', en: 'Robust' },
    description: {
      ko: '모든 UI 컴포넌트의 이름, 역할, 상태가 프로그래밍 방식으로 결정 가능해야 합니다.',
      en: 'For all UI components, the name and role must be programmatically determinable and states and values must be settable.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'
  },
  '4.1.3': {
    id: '4.1.3',
    name: 'Status Messages',
    level: 'AA',
    principle: { ko: '견고성', en: 'Robust' },
    description: {
      ko: '상태 메시지는 포커스 이동 없이 보조 기술을 통해 사용자에게 전달될 수 있어야 합니다.',
      en: 'Status messages must be programmatically determined through role or property so they can be presented by assistive technologies without receiving focus.'
    },
    url: 'https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html'
  }
}

export function getWcagCriterion(criterionStr: string, lang: Lang = 'ko'): WcagCriterion | undefined {
  const match = criterionStr.match(/^(\d+\.\d+\.\d+)/)
  if (!match) return undefined
  const raw = WCAG_CRITERIA[match[1]!]
  if (!raw) return undefined
  return {
    id: raw.id,
    name: raw.name,
    level: raw.level,
    principle: raw.principle[lang],
    description: raw.description[lang],
    url: raw.url
  }
}

const LEVEL_COLORS: Record<string, string> = {
  A: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400',
  AA: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400',
  AAA: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400'
}

export function getLevelColor(level: string): string {
  return LEVEL_COLORS[level] ?? 'bg-gray-100 text-gray-800'
}
