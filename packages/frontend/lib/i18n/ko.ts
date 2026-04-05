export const ko = {
  nav: {
    home: '홈',
    wcag: 'WCAG 레퍼런스',
    wcagWhy: '접근성이 중요한 이유',
    wcagAria: 'ARIA 속성 가이드',
    wcagDom: 'DOM 구조 권장사항',
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
  why: {
    title: '접근성이 중요한 이유',
    subtitle: '웹 접근성은 장애인만을 위한 것이 아니다. 더 많은 사람이 더 나은 방식으로 사용할 수 있는 웹을 만드는 일이다.',
    sectionLegal: '법적 의무',
    sectionUsers: '사용자 규모',
    sectionBusiness: '비즈니스 이점',
    sectionQuality: '개발 품질',
    legal: [
      {
        id: 'KR',
        title: '장애인차별금지법 (한국)',
        desc: '2008년 시행. 웹사이트·앱의 접근성 준수를 의무화하며, 위반 시 시정 명령 및 손해배상 청구 가능.'
      },
      { id: 'US', title: 'ADA (미국)', desc: '미국 장애인법. 공공 서비스 및 기업 웹사이트에 접근성 요구. 미준수 시 집단 소송 사례 다수.' },
      { id: 'EU', title: 'EN 301 549 (EU)', desc: '유럽 공공기관 및 일부 민간 기업에 WCAG 2.1 AA 준수 의무화. EAA 2025년부터 민간 확대.' }
    ],
    users: [
      { id: '1B+', title: '전 세계 10억+ 장애인', desc: '시각·청각·운동·인지 장애를 가진 사용자가 직접 접근성에 의존한다.' },
      {
        id: '상황적',
        title: '상황적 장애',
        desc: '밝은 햇빛(화면 반사), 한 손 사용(아이 안기), 느린 네트워크 등 일시적 제약도 접근성 혜택을 받는다.'
      },
      { id: '노화', title: '고령 사용자', desc: '전 세계 인구 고령화로 시력 저하, 운동 능력 감소 사용자가 급증하고 있다.' }
    ],
    business: [
      { id: 'SEO', title: '검색 엔진 최적화', desc: '시맨틱 HTML, alt 텍스트, 제목 계층 구조는 SEO에도 직접 기여한다.' },
      { id: '기기', title: '다양한 기기 호환', desc: '스마트 TV, 스크린 리더, 음성 인터페이스 등 다양한 환경에서 동작한다.' },
      { id: '평판', title: '브랜드 평판', desc: '접근성은 포용적 가치관을 보여주며, 다양성을 중시하는 기업 이미지에 기여한다.' }
    ],
    quality: [
      { id: '구조', title: '시맨틱 마크업', desc: '접근성을 고려하면 자연스럽게 올바른 HTML 구조를 사용하게 된다.' },
      { id: '테스트', title: '테스트 용이성', desc: '명확한 role, label이 있는 컴포넌트는 자동화 테스트에서도 찾고 검증하기 쉽다.' },
      { id: '유지보수', title: '유지보수 효율', desc: '접근성 기준을 따른 코드는 구조가 명확해 팀 전체의 이해도와 유지보수 효율이 높아진다.' }
    ]
  },
  aria: {
    title: 'ARIA 속성 가이드',
    subtitle: 'Accessible Rich Internet Applications — 시맨틱 HTML만으로 표현할 수 없는 UI 상태·역할·관계를 보조 기술에 전달하는 표준.',
    sectionPrinciples: 'ARIA 사용 3원칙',
    sectionRoles: '역할 (role)',
    sectionStates: '상태 및 속성 (aria-*)',
    sectionLive: '라이브 영역 (aria-live)',
    principles: [
      { id: '1', title: 'HTML 우선', desc: '시맨틱 HTML로 표현 가능하면 ARIA를 쓰지 않는다. <button>이 role="button"보다 낫다.' },
      { id: '2', title: '네이티브 의미 변경 금지', desc: '<h1 role="button">처럼 기본 의미를 덮어쓰지 않는다.' },
      {
        id: '3',
        title: '인터랙티브 요소는 키보드 지원 필수',
        desc: 'role을 추가했다면 그에 맞는 키보드 동작(Enter, Space, Arrow 등)도 반드시 구현한다.'
      }
    ],
    landmarkRoles: [
      { id: 'banner', title: 'banner', desc: '페이지 상단 헤더 영역. <header>와 동일.' },
      { id: 'navigation', title: 'navigation', desc: '내비게이션 링크 그룹. <nav>와 동일.' },
      { id: 'main', title: 'main', desc: '페이지의 주요 콘텐츠. <main>과 동일.' },
      { id: 'complementary', title: 'complementary', desc: '보조 콘텐츠 (사이드바 등). <aside>와 동일.' },
      { id: 'contentinfo', title: 'contentinfo', desc: '페이지 하단 푸터. <footer>와 동일.' },
      { id: 'region', title: 'region', desc: '특정 이름이 붙은 섹션. aria-label과 함께 사용.' }
    ],
    widgetRoles: [
      { id: 'dialog', title: 'dialog', desc: '모달 대화상자. aria-modal="true" + 포커스 트랩 필수.' },
      { id: 'tablist/tab/tabpanel', title: 'tablist / tab / tabpanel', desc: '탭 UI 구성. 3개 role이 세트.' },
      { id: 'combobox', title: 'combobox', desc: '검색 + 드롭다운 조합. aria-expanded, aria-controls 필요.' },
      { id: 'listbox/option', title: 'listbox / option', desc: '선택 목록. <select> 커스텀 구현 시 사용.' },
      { id: 'alert', title: 'alert', desc: '즉시 읽어야 할 메시지. 자동으로 aria-live="assertive" 동작.' },
      { id: 'status', title: 'status', desc: '비긴급 상태 메시지. aria-live="polite" 동작.' }
    ],
    states: [
      { id: 'aria-expanded', title: 'aria-expanded', desc: '요소가 펼쳐진 상태인지 표시. 아코디언, 드롭다운에 사용.' },
      { id: 'aria-checked', title: 'aria-checked', desc: '체크 상태 표시. true / false / mixed 값.' },
      { id: 'aria-disabled', title: 'aria-disabled', desc: '비활성 상태 표시. disabled와 달리 포커스는 유지.' },
      { id: 'aria-selected', title: 'aria-selected', desc: '선택된 상태 표시. 탭, 리스트박스 옵션에 사용.' },
      { id: 'aria-pressed', title: 'aria-pressed', desc: '토글 버튼의 눌린 상태 표시.' },
      { id: 'aria-hidden', title: 'aria-hidden', desc: '보조 기술에서 완전히 숨김. 장식용 요소에 사용.' }
    ],
    relations: [
      { id: 'aria-label', title: 'aria-label', desc: '요소에 직접 접근 가능한 이름 제공. 텍스트가 없는 버튼 등에 사용.' },
      { id: 'aria-labelledby', title: 'aria-labelledby', desc: '다른 요소의 ID를 참조하여 이름 제공. 텍스트가 화면에 이미 있을 때 우선.' },
      { id: 'aria-describedby', title: 'aria-describedby', desc: '추가 설명 텍스트 연결. 입력 필드 오류 메시지, 힌트 텍스트에 사용.' },
      { id: 'aria-controls', title: 'aria-controls', desc: '이 요소가 제어하는 대상 ID 참조. 탭→패널, 버튼→드롭다운.' },
      { id: 'aria-owns', title: 'aria-owns', desc: 'DOM 구조상 부모-자식 관계가 아닌 논리적 소유 관계 표현.' }
    ],
    live: [
      {
        id: 'aria-live="polite"',
        title: 'aria-live="polite"',
        desc: '현재 읽는 내용이 끝난 후 변경 내용을 읽어준다. 검색 결과 카운트, 성공 메시지 등.'
      },
      { id: 'aria-live="assertive"', title: 'aria-live="assertive"', desc: '즉시 끊고 변경 내용을 읽어준다. 오류 메시지 등 긴급한 알림에만 사용.' },
      { id: 'aria-atomic', title: 'aria-atomic="true"', desc: '영역 내 변경 시 전체 내용을 다시 읽는다. 부분 업데이트보다 전체 맥락이 필요할 때.' },
      { id: 'aria-relevant', title: 'aria-relevant', desc: '어떤 변경(additions/removals/text)을 알릴지 지정. 기본값은 additions text.' }
    ]
  },
  dom: {
    title: 'DOM 구조 권장사항',
    subtitle: '올바른 DOM 구조는 스크린 리더 탐색 효율, 포커스 순서, 접근성 트리 품질에 직접 영향을 준다.',
    sectionSemantic: '시맨틱 마크업',
    sectionHeading: '제목 계층 구조',
    sectionNesting: '중첩 깊이',
    sectionDomSize: 'DOM 크기',
    sectionFocus: '포커스 순서',
    semantic: [
      {
        id: '<header>',
        title: 'header / footer / main',
        desc: 'header, footer, main 같은 랜드마크 요소를 쓰면 스크린 리더 사용자가 단축키로 섹션 간을 빠르게 이동할 수 있다.'
      },
      { id: '<nav>', title: 'nav', desc: '내비게이션 링크 묶음에 사용한다. 같은 페이지에 여러 개가 있다면 aria-label로 각각을 구분해야 한다.' },
      {
        id: '<article>',
        title: 'article / section',
        desc: '독립적으로 의미가 통하는 콘텐츠에는 article을, 주제별 묶음에는 section을 쓴다. div보다 훨씬 많은 맥락을 전달한다.'
      },
      {
        id: '<button>',
        title: 'button vs div',
        desc: '<div onclick>으로 버튼을 흉내 내려면 키보드 접근, role 지정, 상태 관리를 모두 직접 구현해야 한다. <button>을 쓰면 이 모든 게 기본으로 제공된다.'
      },
      {
        id: '<ul>/<ol>',
        title: 'ul / ol / li',
        desc: '목록을 리스트 요소로 만들면 스크린 리더가 전체 항목 수와 현재 몇 번째인지를 자동으로 알려준다.'
      }
    ],
    heading: [
      {
        id: '순서',
        title: 'h1 → h2 → h3 순서 유지',
        desc: '제목 레벨을 건너뛰면 스크린 리더 사용자가 페이지 구조를 잘못 파악할 수 있다. h1 바로 다음에 h3를 쓰는 것은 허용되지 않는다.'
      },
      {
        id: 'h1',
        title: '페이지당 h1 하나',
        desc: '페이지 전체의 주제를 나타내는 h1은 하나만 둔다. 이후 섹션에는 h2를, 그 안의 소제목에는 h3를 쓴다.'
      },
      {
        id: '건너뛰기',
        title: '제목 건너뛰기 금지',
        desc: '스크린 리더 사용자는 헤딩 목록을 훑어보며 원하는 섹션으로 바로 이동한다. 레벨이 건너뛰어지면 목차가 엉킨 것처럼 느껴진다. 글자 크기를 바꾸고 싶다면 제목 레벨이 아닌 CSS로 조절하면 된다.'
      }
    ],
    nesting: [
      {
        id: '깊이',
        title: '권장 중첩 깊이 ≤ 7~8단계',
        desc: '중첩이 너무 깊어지면 접근성 트리가 복잡해지고, 스크린 리더 사용자가 현재 어느 맥락에 있는지 파악하기 어려워진다.'
      },
      {
        id: '레이아웃',
        title: '레이아웃 전용 div 최소화',
        desc: 'CSS Grid나 Flexbox로 해결할 수 있는 레이아웃이라면 래퍼 div를 따로 추가하지 않아도 된다.'
      },
      {
        id: '컴포넌트',
        title: '컴포넌트 추상화 중첩 주의',
        desc: '컴포넌트를 여러 겹 쌓다 보면 실제 DOM에 불필요한 div가 쌓인다. 래퍼가 필요 없다면 Fragment를 활용하자.'
      }
    ],
    domSize: [
      {
        id: '1500',
        title: 'Lighthouse 권장 ≤ 1,500 노드',
        desc: 'DOM 노드가 많아질수록 접근성 트리를 만드는 비용도 커지고, 스크린 리더가 페이지를 처음 읽는 데 걸리는 시간도 늘어난다.'
      },
      {
        id: '트리',
        title: '접근성 트리 = DOM의 서브셋',
        desc: 'aria-hidden이나 display:none으로 숨긴 요소는 접근성 트리에서 제외된다. 반대로 숨기지 않은 요소는 모두 트리에 포함된다는 뜻이기도 하다.'
      },
      {
        id: '가상화',
        title: '긴 목록은 가상화 고려',
        desc: '아이템이 수백 개 이상인 목록은 react-virtual 같은 라이브러리로 가상화하면 DOM 크기와 접근성 트리를 동시에 줄일 수 있다.'
      }
    ],
    focus: [
      {
        id: 'DOM순서',
        title: 'DOM 순서 = 포커스 순서',
        desc: 'Tab 키 포커스는 화면에 보이는 순서가 아니라 HTML에 작성된 DOM 순서를 따른다. CSS로 시각적 배치를 바꿔도 포커스 순서는 변하지 않기 때문에, 시각 순서와 탭 순서가 어긋나면 키보드 사용자가 혼란을 겪는다.'
      },
      {
        id: 'tabindex',
        title: 'tabindex 양수 사용 금지',
        desc: 'tabindex="0"은 자연스러운 탭 순서에 포함시키고, tabindex="-1"은 JavaScript로만 포커스가 가능하게 한다. 양수 값을 쓰면 해당 숫자 기준으로 페이지 전체 탭 순서가 재편되어, 포커스가 엉뚱한 요소로 튀어버린다. 컴포넌트가 하나라도 추가되면 전체 숫자를 다시 맞춰야 해서 사실상 유지보수가 불가능하다.'
      },
      {
        id: '포커스트랩',
        title: '모달 내 포커스 트랩 필수',
        desc: '모달이 열린 동안에는 포커스가 모달 내부에서만 순환해야 한다. 모달을 닫으면 포커스는 모달을 열었던 버튼으로 돌아와야 한다.'
      }
    ],
    glossaryLabel: '용어 참고',
    glossary: [
      {
        term: '프로그래매틱 포커스',
        desc: 'JavaScript에서 .focus()를 직접 호출해 특정 요소로 포커스를 옮기는 것을 말한다. 사용자 조작 없이 코드가 포커스를 제어한다. 모달을 열거나 닫을 때, 폼 오류 발생 시 해당 필드로 이동할 때 주로 쓰인다.'
      },
      {
        term: '접근성 트리 (Accessibility Tree)',
        desc: '브라우저가 DOM을 바탕으로 만드는 별도의 트리 구조다. 스크린 리더 같은 보조 기술은 DOM이 아닌 이 트리를 읽는다. role, aria-* 속성, 텍스트 내용이 담기며, aria-hidden이나 display:none으로 숨긴 요소는 여기서 제외된다.'
      },
      {
        term: '포커스 트랩 (Focus Trap)',
        desc: 'Tab 키가 특정 영역, 주로 모달 안에서만 순환하도록 막는 패턴이다. 모달이 열린 동안 배경 콘텐츠로 포커스가 넘어가지 않게 한다. @radix-ui나 react-focus-lock 같은 라이브러리가 이 기능을 제공한다.'
      },
      {
        term: '랜드마크 (Landmark)',
        desc: 'header, nav, main, aside, footer처럼 페이지의 구조를 나타내는 시맨틱 HTML 요소나 ARIA role을 가리킨다. 스크린 리더 사용자는 단축키로 랜드마크 사이를 점프 탐색할 수 있어, 긴 페이지에서도 원하는 영역으로 빠르게 이동할 수 있다.'
      },
      {
        term: '가상화 (Virtualization)',
        desc: '화면에 보이는 항목만 실제 DOM에 렌더링하고 나머지는 메모리에서 제거하는 기법이다. 1,000개 목록이 있어도 화면에 보이는 20개만 DOM에 존재한다. DOM 크기와 접근성 트리를 줄여 성능과 보조 기술의 응답 속도를 모두 개선할 수 있다.'
      }
    ]
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
