export const dynamic = 'force-static'

import { CheckCircle, Info, AlertTriangle } from 'lucide-react'

const LEVELS = [
  {
    level: 'A',
    label: 'Level A',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800',
    icon: CheckCircle,
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
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    badge: 'bg-indigo-100 text-indigo-800',
    icon: Info,
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
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    icon: AlertTriangle,
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
]

const PRINCIPLES = [
  { id: '1', name: 'Perceivable', ko: '인식 가능', desc: '정보와 UI 컴포넌트를 사용자가 인식할 수 있게 제공' },
  { id: '2', name: 'Operable', ko: '운용 가능', desc: 'UI 컴포넌트와 내비게이션을 운용할 수 있어야 함' },
  { id: '3', name: 'Understandable', ko: '이해 가능', desc: '정보와 UI 동작을 이해할 수 있어야 함' },
  { id: '4', name: 'Robust', ko: '견고성', desc: '보조 기술을 포함한 다양한 에이전트로 해석할 수 있어야 함' }
]

export default function WcagPage() {
  return (
    <div className='max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-14'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-navy mb-2'>WCAG 2.1 레퍼런스</h1>
        <p className='text-mist-600 text-sm leading-relaxed'>
          Web Content Accessibility Guidelines — 웹 접근성 국제 표준. A → AA → AAA 순으로 요구 수준이 높아진다.
        </p>
      </div>

      {/* 4 Principles */}
      <section className='mb-10'>
        <h2 className='text-sm font-semibold text-mist-600 uppercase tracking-wider mb-3'>4대 원칙 (POUR)</h2>
        <div className='grid grid-cols-2 gap-3'>
          {PRINCIPLES.map((p) => (
            <div
              key={p.id}
              className='bg-white border border-mist-200 rounded-xl p-4'>
              <div className='flex items-center gap-2 mb-1'>
                <span className='text-xs font-mono text-mist-400'>{p.id}</span>
                <span className='font-semibold text-navy text-sm'>{p.name}</span>
                <span className='text-mist-400 text-sm'>· {p.ko}</span>
              </div>
              <p className='text-xs text-mist-600 leading-relaxed'>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Levels */}
      <section className='space-y-6'>
        <h2 className='text-sm font-semibold text-mist-600 uppercase tracking-wider'>적합성 수준</h2>
        {LEVELS.map(({ level, label, color, bg, border, badge, icon: Icon, description, principles }) => (
          <div
            key={level}
            className={`rounded-xl border ${border} ${bg} overflow-hidden`}>
            <div className='px-5 py-4 flex items-start gap-3'>
              <Icon
                size={18}
                className={`${color} mt-0.5 shrink-0`}
              />
              <div>
                <div className='flex items-center gap-2 mb-1'>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badge}`}>{label}</span>
                </div>
                <p className='text-sm text-mist-700 leading-relaxed'>{description}</p>
              </div>
            </div>
            <div className='bg-white/70 border-t border-mist-200/60'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-mist-200/60'>
                    <th className='text-left px-5 py-2.5 text-xs font-semibold text-mist-500 w-24'>기준 번호</th>
                    <th className='text-left px-4 py-2.5 text-xs font-semibold text-mist-500 w-36'>제목</th>
                    <th className='text-left px-4 py-2.5 text-xs font-semibold text-mist-500'>요구사항</th>
                  </tr>
                </thead>
                <tbody>
                  {principles.map((item, i) => (
                    <tr
                      key={item.id}
                      className={i < principles.length - 1 ? 'border-b border-mist-100' : ''}>
                      <td className='px-5 py-2.5 font-mono text-xs text-mist-400'>{item.id}</td>
                      <td className='px-4 py-2.5 text-xs font-medium text-navy-700'>{item.title}</td>
                      <td className='px-4 py-2.5 text-xs text-mist-600 leading-relaxed'>{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <p className='mt-8 text-xs text-mist-400'>
        전체 기준:{' '}
        <a
          href='https://www.w3.org/TR/WCAG21/'
          target='_blank'
          rel='noreferrer'
          className='underline hover:text-mist-700'>
          W3C WCAG 2.1
        </a>
      </p>
    </div>
  )
}
