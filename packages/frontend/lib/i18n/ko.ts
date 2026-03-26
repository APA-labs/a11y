export const ko = {
  nav: {
    home: '홈',
    wcag: 'WCAG 레퍼런스',
    aiAnalyze: 'AI 분석',
    docs: 'Docs',
    patterns: 'Patterns',
    tools: 'Tools',
    githubLabel: 'GitHub 저장소',
    menuOpen: '메뉴 열기',
    menuClose: '메뉴 닫기',
    sidebarCollapse: '사이드바 접기',
    sidebarExpand: '사이드바 펼치기',
    globalNav: '글로벌 내비게이션',
    mobileNav: '모바일 내비게이션'
  },
  home: {
    subtitle: 'WCAG 2.1 AA 기준의 공통 베이스라인과 다양한 디자인 시스템들의 구현 방식을 한눈에 비교하세요.',
    supportedDS: '지원하는 디자인시스템',
    allPatterns: '모든 패턴',
    aiAnalyze: 'AI 분석',
    searchPlaceholder: '패턴 검색...',
    searchClear: '검색어 지우기',
    filterByDS: '디자인 시스템으로 필터',
    allDS: '전체',
    noResults: '검색 결과가 없습니다.',
    filteredCount: (n: number) => `${n}개 패턴`
  },
  pattern: {
    backToAll: '모든 패턴',
    wcagHint: '관련 WCAG 기준 — 클릭하여 상세 보기',
    codeExample: '기본 코드 예시',
    baseline: '공통 베이스라인',
    appliesTo: '모든 디자인 시스템에 적용',
    dsSectionDivider: '디자인 시스템별 구현',
    references: '참고 문서',
    additionalChecks: '추가 체크포인트',
    codeSample: '코드 샘플',
    implNotes: '구현 노트',
    itemCount: (n: number) => `${n}개`,
    previewAlt: (name: string) => `${name} 미리보기`
  },
  wcag: {
    title: 'WCAG 2.1 레퍼런스',
    subtitle: 'Web Content Accessibility Guidelines — 웹 접근성 국제 표준. A → AA → AAA 순으로 요구 수준이 높아진다.',
    principles: '4대 원칙 (POUR)',
    levels: '적합성 수준',
    colCriterion: '기준 번호',
    colTitle: '제목',
    colRequirement: '요구사항',
    fullSpec: '전체 기준'
  },
  analyze: {
    title: 'AI 접근성 분석',
    subtitle: '컴포넌트를 설명하면 Claude가 WCAG 2.1 AA 기준에 따라 체크리스트, 코드 샘플, 테스트 절차를 생성합니다.'
  },
  cmd: {
    title: '패턴 검색',
    placeholder: '패턴 검색...',
    noResults: '검색 결과가 없습니다.',
    hintNavigate: '이동',
    hintOpen: '열기',
    hintClose: '닫기',
    totalPatterns: '개 패턴',
    searchLabel: '패턴 검색 (⌘K)'
  }
}

export type Translations = typeof ko
