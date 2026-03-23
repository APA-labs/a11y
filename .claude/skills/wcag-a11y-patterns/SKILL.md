# wcag-a11y-patterns

**Name:** `wcag-a11y-patterns`
**Description:** WCAG 2.1 AA 기준의 접근성 패턴 가이드. React/Next.js 컴포넌트 구현 시 ARIA, 키보드, 스크린리더, 폼 접근성을 올바르게 적용하기 위한 규칙 모음.

---

## Rule Categories

| Prefix | Category | Priority |
|--------|----------|----------|
| `aria-` | ARIA 속성 올바른 사용 | CRITICAL |
| `keyboard-` | 키보드 네비게이션 | CRITICAL |
| `form-` | 폼 접근성 | HIGH |
| `sr-` | 스크린리더 호환성 | HIGH |
| `interactive-` | 인터랙티브 컴포넌트 패턴 | HIGH |
| `visual-` | 시각적 접근성 | MEDIUM |

---

## Rules Index

### ARIA (CRITICAL)
- [`aria-label`](./rules/aria-label.md) — 모든 인터랙티브 요소에 접근 가능한 이름 제공
- [`aria-live`](./rules/aria-live.md) — 동적 콘텐츠 변경 알림
- [`aria-expanded`](./rules/aria-expanded.md) — 열림/닫힘 상태 전달
- [`aria-required`](./rules/aria-required.md) — 필수 입력 필드 표시
- [`aria-invalid`](./rules/aria-invalid.md) — 유효성 오류 상태 전달
- [`aria-describedby`](./rules/aria-describedby.md) — 추가 설명 연결

### Keyboard (CRITICAL)
- [`keyboard-focus-trap`](./rules/keyboard-focus-trap.md) — 모달/다이얼로그 포커스 가두기
- [`keyboard-focus-visible`](./rules/keyboard-focus-visible.md) — 포커스 표시 항상 노출
- [`keyboard-escape`](./rules/keyboard-escape.md) — Escape로 오버레이 닫기
- [`keyboard-roving-tabindex`](./rules/keyboard-roving-tabindex.md) — 복합 위젯의 roving tabindex
- [`keyboard-tab-order`](./rules/keyboard-tab-order.md) — 논리적 탭 순서 유지

### Form (HIGH)
- [`form-label`](./rules/form-label.md) — 모든 입력 필드에 레이블 연결
- [`form-error`](./rules/form-error.md) — 오류 메시지 접근 가능하게 전달
- [`form-fieldset`](./rules/form-fieldset.md) — 관련 필드 그룹화

### Screen Reader (HIGH)
- [`sr-only`](./rules/sr-only.md) — 시각적으로 숨긴 텍스트 올바른 사용
- [`sr-heading`](./rules/sr-heading.md) — 헤딩 계층 구조 유지
- [`sr-link-text`](./rules/sr-link-text.md) — 의미 있는 링크 텍스트
- [`sr-image-alt`](./rules/sr-image-alt.md) — 이미지 대체 텍스트

### Interactive Patterns (HIGH)
- [`interactive-button-link`](./rules/interactive-button-link.md) — button vs link 올바른 선택
- [`interactive-dialog`](./rules/interactive-dialog.md) — 다이얼로그 패턴
- [`interactive-tooltip`](./rules/interactive-tooltip.md) — 툴팁 패턴
- [`interactive-disclosure`](./rules/interactive-disclosure.md) — 열고 닫는 콘텐츠 패턴
- [`interactive-tabs`](./rules/interactive-tabs.md) — 탭 컴포넌트 패턴

### Visual (MEDIUM)
- [`visual-color-contrast`](./rules/visual-color-contrast.md) — 색상 대비율 기준
- [`visual-not-color-only`](./rules/visual-not-color-only.md) — 색상만으로 정보 전달 금지
- [`visual-motion`](./rules/visual-motion.md) — 애니메이션 접근성
