# create-svg-preview

**Name:** `create-svg-preview`
**Description:** 패턴 카드 썸네일용 SVG 프리뷰 컴포넌트를 생성한다. `packages/frontend/components/previews/<Slug>Preview.tsx`에 스키매틱 일러스트를 작성하고 `index.ts` 레지스트리에 배선한다. 기존 PNG 캡처(`capture-pattern-preview`)를 대체한다. "SVG 프리뷰 만들어줘", "<패턴> 카드 일러스트 생성", "프리뷰 컴포넌트 추가" 같은 요청에 트리거.

---

## 언제 이 스킬을 쓰는가

- 신규 패턴을 추가했고 카드 썸네일이 필요할 때
- 특정 썸네일 품질이 낮아 재디자인이 필요할 때

이 스킬은 **벡터 SVG**를 만든다. 실제 컴포넌트 렌더 캡처가 아니라, 썸네일 크기에서 한눈에 식별 가능한 **스키매틱 아이콘 스타일**을 지향한다. `PatternCardFancy`의 썸네일 경로는 **SVG 전용**이며, 등록되지 않은 slug는 텍스트 fallback으로 렌더된다.

---

## 파일 구조 (SSOT)

```
packages/frontend/components/previews/
├── index.ts                 # previewRegistry (slug → 컴포넌트)
├── <Slug>Preview.tsx        # 개별 SVG 컴포넌트 (default export)
└── ...
```

`PatternCardFancy`가 `getPreview(slug)`를 자동 호출한다 — 카드 쪽 코드는 건드리지 않는다. 레지스트리 키는 **패턴 파일 `slug`와 정확히 일치**하는 kebab-case여야 한다.

---

## 디자인 규칙 (반드시 준수)

### 1. 캔버스

- `viewBox="0 0 320 180"` 고정 (카드 이미지 영역 비율 ~1.78:1)
- `<svg>` 루트에 `className='w-full h-full'`, `aria-hidden='true'`, `xmlns='http://www.w3.org/2000/svg'` 필수
- 배경 `<rect>` **금지** — 부모 카드가 `bg-canvas`를 이미 제공 (이중 배경은 다크모드에서 톤이 어긋남)

### 2. 색상은 CSS 변수로만

다크모드 자동 대응을 위해 **인라인 HEX 금지**(브랜드 액센트 제외). 아래 토큰만 사용:

| 토큰             | 용도                               |
| ---------------- | ---------------------------------- |
| `var(--surface)` | 주요 면 (카드/컨테이너 배경)       |
| `var(--divider)` | 헤더/섹션 구분용 면 (한 단계 강조) |
| `var(--outline)` | 경계선 / stroke                    |
| `var(--body)`    | 주요 텍스트/아이콘                 |
| `var(--soft)`    | 보조 텍스트/아이콘                 |
| `var(--faint)`   | 가장 약한 요소                     |

> **중요:** `--inset`은 쓰지 말 것. 다크모드에서 canvas보다 더 어두워 "구멍"으로 보인다. 강조 면은 `--divider`를 사용한다.

`fill`/`stroke`에 CSS 변수를 쓰려면 반드시 **style prop**으로 작성한다. 프레젠테이션 속성(`fill="var(--x)"`)은 브라우저가 파싱하지 못한다.

```tsx
// ✅ 올바른 사용
<rect style={{ fill: 'var(--surface)', stroke: 'var(--outline)' }} />

// ❌ 동작 안 함
<rect fill='var(--surface)' />
```

### 3. 액센트 컬러 (HEX 허용)

브랜드/시맨틱 강조에만 직접 HEX를 쓴다. **한 요소**에만 (활성 상태, 강조 아이콘, 스트라이프 등).

| 용도             | 값        |
| ---------------- | --------- |
| Primary (violet) | `#8b5cf6` |
| Success          | `#10b981` |
| Info             | `#3b82f6` |
| Warning          | `#f59e0b` |
| Danger           | `#ef4444` |

### 4. 라운드 클리핑

라운드 컨테이너(`rx`) 안에 헤더 스트립 같은 직사각형 자식이 걸릴 때는 **반드시 `clipPath`로 부모 형태에 맞춰 클리핑**한다. 그렇지 않으면 상단이 각지게 렌더된다.

```tsx
<defs>
  <clipPath id='<slug>-clip'>
    <rect x={x} y={y} width={w} height={h} rx={10} />
  </clipPath>
</defs>

<rect x={x} y={y} width={w} height={h} rx={10}
  style={{ fill: 'var(--surface)' }} />

<g clipPath='url(#<slug>-clip)'>
  {/* 헤더 스트립, 내부 요소 등 */}
</g>
```

`clipPath` id는 slug를 prefix로 붙여 충돌을 방지한다 (`<slug>-clip`).

### 5. 스키매틱 우선

실제 컴포넌트의 정확한 모습 ≠ 목표. 썸네일(~300×168px)에서 **3초 안에 식별 가능**한가가 기준.

- 텍스트 대신 **rounded bar**로 추상화 (`height={5~6}`, `rx={2.5~3}`)
- 아이콘은 **작은 원/도형**으로 대표
- 전체 목록 대신 **3~5개 요소**만 (주연 + 주변 맥락)
- 요소 크기를 과감히 키운다 — 버튼 높이 32~40px가 "보기 좋은" 선

### 6. 타이포그래피 (필요 시)

SVG 안에 실제 텍스트가 필요하면 (페이지 번호 등):

- `fontFamily='system-ui, -apple-system, sans-serif'`
- `fontSize={14}`, `fontWeight={600}`
- `fill`은 `style={{ fill: 'var(--body)' }}`

---

## 레시피 — 실제 구현 파일 참조

공통 빌딩 블록은 기존 파일에 이미 잘 구현되어 있다. 새 프리뷰를 만들 때는 가장 가까운 레퍼런스를 복제하고 변형하라.

| 레시피                 | 레퍼런스 파일                                                           | 요점                                         |
| ---------------------- | ----------------------------------------------------------------------- | -------------------------------------------- |
| Pill Button Row        | `PaginationPreview.tsx`, `BreadcrumbPreview.tsx`                        | 균등 간격, 활성 아이템 1개만 액센트          |
| Stacked Notification   | `ToastPreview.tsx`, `AlertPreview.tsx`                                  | stripe + 아이콘 원 + 2줄 bar                 |
| Table / Data Grid      | `TablePreview.tsx`                                                      | `clipPath`로 헤더 라운드 처리                |
| Form Controls          | `TextInputPreview.tsx`, `FormValidationPreview.tsx`                     | 라벨 bar + 입력 박스 + helper text bar       |
| Toggle / Radio / Check | `TogglePreview.tsx`, `RadioGroupPreview.tsx`, `CheckboxPreview.tsx`     | 일부 on(violet), 일부 off                    |
| Listbox / Menu         | `SelectPreview.tsx`, `ComboboxPreview.tsx`, `NavigationMenuPreview.tsx` | 트리거 + 펼쳐진 옵션 리스트, 선택 항목 강조  |
| Overlay / Panel        | `DrawerPreview.tsx`, `ModalDialogPreview.tsx`, `AlertDialogPreview.tsx` | 오버레이 + 패널(헤더 + 본문 bar + 액션 버튼) |
| Anchored Popup         | `TooltipPreview.tsx`, `PopoverPreview.tsx`                              | 앵커 요소 + 꼬리 있는 말풍선                 |
| Tab Strip              | `TabsPreview.tsx`                                                       | 활성 탭 하단에 violet 언더라인               |
| Expand / Collapse      | `AccordionPreview.tsx`, `DisclosurePreview.tsx`                         | 3개 섹션, 하나만 펼쳐진 상태                 |
| Badge / Chip           | `BadgePreview.tsx`, `ChipPreview.tsx`                                   | 3~4개 가로 배치, variant 다양화              |

---

## 실행 절차

### Step 1 — 대상 수집

사용자에게 받는다 (인자로 이미 지정되었으면 생략):

- **slug** (kebab-case): `accordion`, `modal-dialog` 등. `lib/patterns/<slug>.ts`에 존재해야 함
- 여러 개 동시 생성 가능

### Step 2 — 파일 생성

slug → PascalCase 변환 후 `components/previews/<PascalCase>Preview.tsx` 작성.

```
accordion       → AccordionPreview.tsx
modal-dialog    → ModalDialogPreview.tsx
radio-group     → RadioGroupPreview.tsx
```

- **default export** 필수
- 디자인 규칙 §1~§6 준수
- 가장 가까운 레시피 파일을 레퍼런스로 복제 후 변형

### Step 3 — 레지스트리 등록

`components/previews/index.ts`에 import + 키 추가:

```tsx
import AccordionPreview from './AccordionPreview'

export const previewRegistry: Record<string, ComponentType> = {
  accordion: AccordionPreview
  // ...
}
```

**키는 kebab-case slug** (패턴 파일 `slug` 필드와 정확히 일치해야 함 — 틀리면 PNG fallback 유지됨).

### Step 4 — 타입 체크

```bash
pnpm --filter @a11y/frontend type-check
```

> 프로젝트 포매터는 **사용하지 않는 import를 자동 제거**한다. import 추가와 사용을 같은 edit에서 함께 해야 한다 (CLAUDE.md Frontend 섹션 참고).

### Step 5 — 육안 확인 (다크모드 필수)

```bash
pnpm --filter @a11y/frontend dev
```

`http://localhost:3000` 접속 → 해당 카드 썸네일 확인.

**다크모드 확인 필수** — 라이트에서 좋아 보여도 다크에서 안 보이는 경우가 잦다. 브라우저 테마 토글 또는 `html.dark` 강제 후 재확인.

---

## 완료 체크리스트

```
완료 체크리스트
─────────────────────────────────────────────────────
 □ FILE   components/previews/<PascalCase>Preview.tsx 생성
          (default export, viewBox 320×180, aria-hidden)
 □ REG    components/previews/index.ts 등록
          (kebab-case slug 키, 패턴 파일과 일치)
 □ STYLE  §1~§6 준수
          - 배경 rect 없음 / inset 미사용
          - CSS 변수는 style prop으로만
          - 액센트 HEX는 한 요소에만
          - 라운드 컨테이너는 clipPath
 □ TYPE   pnpm --filter @a11y/frontend type-check 통과
 □ LIGHT  라이트 모드 육안 확인
 □ DARK   다크 모드 육안 확인 (구멍/대비 없음)
─────────────────────────────────────────────────────
```

---

## 자주 하는 실수

1. **background `<rect>` 추가** — 부모 카드가 이미 `bg-canvas`. 이중 배경은 다크모드에서 톤이 어긋난다.
2. **`fill="var(--x)"` 속성 사용** — 파싱 실패. 반드시 `style={{ fill: 'var(--x)' }}`.
3. **`--inset` 사용** — 다크모드에서 canvas보다 어두워 "구멍"처럼 보인다. 강조 면은 `--divider`.
4. **clipPath 누락** — 라운드 컨테이너 안의 직사각형 자식이 상단 모서리를 각지게 덮는다.
5. **레지스트리 미등록** — 파일만 만들고 `index.ts`에 추가 안 하면 PNG fallback 유지.
6. **slug 불일치** — 레지스트리 키가 패턴 파일 slug와 다르면 매칭 실패.
7. **너무 많은 요소** — 3~5개로 줄여야 썸네일 크기에서 읽힌다. 디테일 집착 금지.
8. **인라인 HEX 남용** — 액센트 1곳 외에는 전부 CSS 변수.
9. **사용하지 않는 import 자동 삭제** — 포매터가 import를 제거한다. 사용과 같은 edit에 묶어라.

---

## 참고 파일 (핵심 구현)

- `packages/frontend/components/previews/index.ts` — 레지스트리 (27개 패턴 등록 상태)
- `packages/frontend/components/previews/PaginationPreview.tsx` — Pill Button Row 레퍼런스
- `packages/frontend/components/previews/ToastPreview.tsx` — Stacked Cards + stripe
- `packages/frontend/components/previews/TablePreview.tsx` — clipPath 헤더 처리
- `packages/frontend/components/home/PatternCardFancy.tsx` — 카드 측 소비 로직 (`getPreview` 호출부)
- `packages/frontend/app/globals.css` — CSS 변수 SSOT (light + `.dark`)
