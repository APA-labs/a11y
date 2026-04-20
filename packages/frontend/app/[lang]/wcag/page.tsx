export const dynamic = 'force-static'

import { CheckCircle, Info, AlertTriangle } from 'lucide-react'

import { WcagInfoCard } from './_components/WcagInfoCard'
import { WcagLevelCard } from './_components/WcagLevelCard'
import { WcagPageShell } from './_components/WcagPageShell'
import { WcagSection } from './_components/WcagSection'

import type { Lang } from '@/lib/i18n'

import { getTranslations, SUPPORTED_LANGS } from '@/lib/i18n'


export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

const PRINCIPLES = {
  ko: [
    { id: '1', name: 'Perceivable', local: '인식 가능', desc: '정보와 UI 컴포넌트를 사용자가 인식할 수 있게 제공' },
    { id: '2', name: 'Operable', local: '운용 가능', desc: 'UI 컴포넌트와 내비게이션을 운용할 수 있어야 함' },
    { id: '3', name: 'Understandable', local: '이해 가능', desc: '정보와 UI 동작을 이해할 수 있어야 함' },
    { id: '4', name: 'Robust', local: '견고성', desc: '보조 기술을 포함한 다양한 에이전트로 해석할 수 있어야 함' }
  ],
  en: [
    { id: '1', name: 'Perceivable', local: '', desc: 'Information and UI components must be presentable to users in ways they can perceive.' },
    { id: '2', name: 'Operable', local: '', desc: 'UI components and navigation must be operable.' },
    { id: '3', name: 'Understandable', local: '', desc: 'Information and the operation of the user interface must be understandable.' },
    {
      id: '4',
      name: 'Robust',
      local: '',
      desc: 'Content must be robust enough to be reliably interpreted by a wide variety of user agents, including assistive technologies.'
    }
  ]
}

const LEVEL_STYLES = {
  A: {
    color: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-900/50',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400',
    icon: CheckCircle
  },
  AA: {
    color: 'text-indigo-700 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-indigo-200 dark:border-indigo-900/50',
    badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400',
    icon: Info
  },
  AAA: {
    color: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-900/50',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400',
    icon: AlertTriangle
  }
}

const LEVELS = {
  ko: [
    {
      level: 'A',
      label: 'Level A',
      ...LEVEL_STYLES.A,
      description: '최소 기준. 이 기준을 충족하지 못하면 일부 사용자가 콘텐츠에 전혀 접근할 수 없다.',
      principles: [
        { id: '1.1.1', title: '텍스트 대체', desc: '모든 비텍스트 콘텐츠(이미지, 아이콘)에 alt 속성 제공' },
        { id: '1.3.1', title: '정보와 관계', desc: 'HTML 구조(heading, list, table)로 시각적 구조를 코드로 표현' },
        { id: '2.1.1', title: '키보드 접근', desc: '모든 기능을 키보드만으로 사용 가능' },
        { id: '2.4.2', title: '페이지 제목', desc: '각 페이지에 주제를 설명하는 고유한 title 제공' },
        { id: '3.1.1', title: '페이지 언어', desc: 'html[lang] 속성으로 문서 언어 명시' },
        { id: '4.1.1', title: '파싱', desc: 'HTML 마크업 오류 없음 (중복 ID, 잘못 닫힌 태그 등)' },
        { id: '4.1.2', title: '이름·역할·값', desc: 'UI 컴포넌트의 role, aria-label, aria-expanded 등 상태 노출' }
      ]
    },
    {
      level: 'AA',
      label: 'Level AA',
      ...LEVEL_STYLES.AA,
      description: '사실상의 표준. 대부분의 법규 및 기업 정책이 AA 준수를 요구한다. 이 프로젝트의 기준.',
      principles: [
        { id: '1.4.3', title: '명도 대비 (텍스트)', desc: '일반 텍스트 4.5:1, 큰 텍스트 3:1 이상' },
        { id: '1.4.4', title: '텍스트 크기 조절', desc: '200%까지 확대해도 콘텐츠·기능 유지' },
        { id: '1.4.11', title: '비텍스트 대비', desc: '아이콘·포커스 링·폼 테두리 등 UI 컴포넌트 3:1 이상' },
        { id: '1.4.12', title: '텍스트 간격', desc: '줄높이·자간·단어간격·단락간격 변경 시 기능 손실 없음' },
        { id: '1.4.13', title: '호버/포커스 콘텐츠', desc: '툴팁 등 hover·focus로 나타나는 콘텐츠를 닫거나 유지할 수 있어야 함' },
        { id: '2.4.6', title: '제목과 레이블', desc: '제목·레이블이 주제·목적을 설명해야 함' },
        { id: '2.4.7', title: '포커스 표시', desc: '키보드 포커스 시 시각적 인디케이터 제공' },
        { id: '3.2.3', title: '일관된 내비게이션', desc: '반복되는 네비게이션 순서 일관성 유지' },
        { id: '3.3.1', title: '오류 식별', desc: '입력 오류 시 어느 항목이 왜 잘못됐는지 텍스트로 설명' },
        { id: '3.3.2', title: '레이블 또는 지시사항', desc: '사용자 입력에 레이블이나 안내 지시사항 제공' }
      ]
    },
    {
      level: 'AAA',
      label: 'Level AAA',
      ...LEVEL_STYLES.AAA,
      description: '최상위 기준. 모든 콘텐츠에 일괄 적용하기 어려우므로, 특정 상황에서 선택적으로 적용한다.',
      principles: [
        { id: '1.4.6', title: '명도 대비 (강화)', desc: '일반 텍스트 7:1, 큰 텍스트 4.5:1 이상' },
        { id: '2.1.3', title: '키보드 (예외 없음)', desc: '모든 기능을 키보드로 사용. 경로 의존적 동작 포함' },
        { id: '2.2.3', title: '시간 제한 없음', desc: '시간 제한이 요구되지 않는 한 모든 기능에 시간 제한 없음' },
        { id: '2.4.9', title: '링크 목적 (링크만으로)', desc: '"자세히 보기" 같은 모호한 링크 텍스트 금지' },
        { id: '3.1.3', title: '이례적 단어', desc: '전문용어·은어·관용구에 정의 제공' },
        { id: '3.3.6', title: '오류 예방 (전체)', desc: '모든 입력 폼에 검토·확인·취소 중 하나 이상 제공' }
      ]
    }
  ],
  en: [
    {
      level: 'A',
      label: 'Level A',
      ...LEVEL_STYLES.A,
      description: 'The minimum level. Failing to meet these criteria means some users cannot access content at all.',
      principles: [
        { id: '1.1.1', title: 'Non-text Content', desc: 'Provide alt text for all non-text content (images, icons).' },
        { id: '1.3.1', title: 'Info and Relationships', desc: 'Use HTML structure (headings, lists, tables) to convey visual structure in code.' },
        { id: '2.1.1', title: 'Keyboard', desc: 'All functionality must be accessible using only a keyboard.' },
        { id: '2.4.2', title: 'Page Titled', desc: 'Each page must have a unique title that describes its topic.' },
        { id: '3.1.1', title: 'Language of Page', desc: 'Specify the document language using the html[lang] attribute.' },
        { id: '4.1.1', title: 'Parsing', desc: 'No HTML markup errors (duplicate IDs, unclosed tags, etc.).' },
        { id: '4.1.2', title: 'Name, Role, Value', desc: 'Expose role, aria-label, aria-expanded, and other states for UI components.' }
      ]
    },
    {
      level: 'AA',
      label: 'Level AA',
      ...LEVEL_STYLES.AA,
      description: 'The de-facto standard. Most laws and corporate policies require AA conformance. This project targets AA.',
      principles: [
        { id: '1.4.3', title: 'Contrast (Minimum)', desc: 'Normal text 4.5:1, large text 3:1 minimum contrast ratio.' },
        { id: '1.4.4', title: 'Resize Text', desc: 'Content and functionality must be maintained when zoomed to 200%.' },
        { id: '1.4.11', title: 'Non-text Contrast', desc: 'UI components (icons, focus rings, form borders) must meet 3:1 contrast.' },
        {
          id: '1.4.12',
          title: 'Text Spacing',
          desc: 'No loss of content when line height, letter spacing, word spacing, or paragraph spacing is changed.'
        },
        {
          id: '1.4.13',
          title: 'Content on Hover or Focus',
          desc: 'Content that appears on hover or focus (like tooltips) must be dismissible and persistent.'
        },
        { id: '2.4.6', title: 'Headings and Labels', desc: 'Headings and labels must describe topic or purpose.' },
        { id: '2.4.7', title: 'Focus Visible', desc: 'A visible focus indicator must be shown when navigating by keyboard.' },
        { id: '3.2.3', title: 'Consistent Navigation', desc: 'Repeated navigation must appear in the same order across pages.' },
        { id: '3.3.1', title: 'Error Identification', desc: 'When an error occurs, describe which item is wrong and why, in text.' },
        { id: '3.3.2', title: 'Labels or Instructions', desc: 'Provide labels or instructions for user input.' }
      ]
    },
    {
      level: 'AAA',
      label: 'Level AAA',
      ...LEVEL_STYLES.AAA,
      description: 'The highest level. Difficult to apply to all content universally — applied selectively in specific contexts.',
      principles: [
        { id: '1.4.6', title: 'Contrast (Enhanced)', desc: 'Normal text 7:1, large text 4.5:1 minimum contrast ratio.' },
        { id: '2.1.3', title: 'Keyboard (No Exception)', desc: 'All functionality usable by keyboard, including path-dependent interactions.' },
        { id: '2.2.3', title: 'No Timing', desc: 'No time limits on any functionality, unless the timing is essential.' },
        {
          id: '2.4.9',
          title: 'Link Purpose (Link Only)',
          desc: 'Avoid ambiguous link text like "Read more" — link purpose must be clear from the link alone.'
        },
        { id: '3.1.3', title: 'Unusual Words', desc: 'Provide definitions for jargon, idioms, and specialized terminology.' },
        { id: '3.3.6', title: 'Error Prevention (All)', desc: 'All input forms must provide review, confirmation, or reversal of submissions.' }
      ]
    }
  ]
}

export default async function WcagPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params
  const t = getTranslations(lang)
  const principles = PRINCIPLES[lang]
  const levels = LEVELS[lang]

  return (
    <WcagPageShell
      title={t.wcag.title}
      subtitle={t.wcag.subtitle}>
      <WcagSection
        label={t.wcag.principles}
        className='mb-10'>
        <div className='grid grid-cols-2 gap-3'>
          {principles.map((p) => (
            <WcagInfoCard key={p.id}>
              <div className='flex items-center gap-2 mb-1'>
                <span className='text-xs font-mono text-faint'>{p.id}</span>
                <span className='font-semibold text-body text-sm'>{p.name}</span>
                {p.local && <span className='text-faint text-sm'>· {p.local}</span>}
              </div>
              <p className='text-xs text-soft leading-relaxed'>{p.desc}</p>
            </WcagInfoCard>
          ))}
        </div>
      </WcagSection>

      <WcagSection
        label={t.wcag.levels}
        className='space-y-6'>
        {levels.map(({ level, label, color, bg, border, badge, icon, description, principles: criterions }) => (
          <WcagLevelCard
            key={level}
            color={color}
            bg={bg}
            border={border}
            badge={badge}
            icon={icon}
            label={label}
            description={description}
            rows={criterions}
            colHeaders={[t.wcag.colCriterion, t.wcag.colTitle, t.wcag.colRequirement]}
          />
        ))}
      </WcagSection>

      <p className='mt-8 text-xs text-faint'>
        {t.wcag.fullSpec}:{' '}
        <a
          href='https://www.w3.org/TR/WCAG21/'
          target='_blank'
          rel='noreferrer'
          className='underline hover:text-body'>
          W3C WCAG 2.1
        </a>
      </p>
    </WcagPageShell>
  )
}
