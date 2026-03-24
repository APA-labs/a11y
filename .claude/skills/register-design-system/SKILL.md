# register-design-system

**Name:** `register-design-system`
**Description:** spec-harvester에서 추가한 디자인 시스템을 트랜스포머와 프론트엔드 타입에 등록하는 스킬. `/add-design-system` 실행 후 출력된 DS 등록 정보를 붙여넣으면 필요한 파일을 일괄 업데이트.

---

## 실행 방법

### Step 1 — DS 등록 정보 입력

사용자에게 spec-harvester의 `/add-design-system` 출력 결과를 붙여넣게 한다.

```
id:     {ds-id}
name:   {DS 표시명}
domain: {domain}
color:  {HEX}

pattern mappings:
  button       → {url-path-or-none}
  text-input   → {url-path-or-none}
  ...
```

`none`인 패턴은 매핑에서 제외한다.

### Step 2 — 수정할 파일 (3개)

#### 2-1. SOURCE_URL_MAP 추가

`tools/spec-transformer/src/patterns-cli.ts`

`SOURCE_URL_MAP`에 새 도메인 항목 추가 (`none`인 패턴 제외):

```typescript
'{domain}': {
  'button':       '{url-path}',
  'tabs':         '{url-path}',
  // ...
}
```

`DS_DOMAIN_MAP`에 추가:

```typescript
'{domain}': '{ds-id}'
```

#### 2-2. DS_META 추가

`tools/spec-transformer/src/ds-extractor.ts`

```typescript
const DS_META: Record<DsId, { name: string; color: string }> = {
  // 기존 항목 유지
  '{ds-id}': { name: '{DS 표시명}', color: '{HEX}' }
}
```

`DsId` import 타입이 업데이트되면 자동으로 타입 안전성이 보장된다.

#### 2-3. 프론트엔드 타입 확장

`packages/frontend/lib/types.ts`

`DsId` 타입에 추가:

```typescript
export type DsId = 'material' | 'radix' | 'antd' | '{ds-id}'
```

`Pattern` 인터페이스 `designSystems`에 추가:

```typescript
designSystems: {
  material: DesignSystemVariant
  radix: DesignSystemVariant
  antd: DesignSystemVariant
  '{ds-id}': DesignSystemVariant
}
```

### Step 3 — 타입 체크

```bash
pnpm --filter @a11y/spec-transformer type-check
pnpm --filter @a11y/frontend type-check
```

오류가 있으면 수정 후 재확인한다.

### Step 4 — 완료 안내

수정된 파일 목록과 다음 단계를 안내한다:

```bash
# 크롤 결과로 패턴 생성 (크롤 완료 후)
pnpm transform:pattern -- \
  --input {spec-harvester-storage-dir} \
  --output packages/frontend/lib/patterns.ts \
  --pattern tabs
```
