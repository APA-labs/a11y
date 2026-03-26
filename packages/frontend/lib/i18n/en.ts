import type { Translations } from './ko'

export const en: Translations = {
  nav: {
    home: 'Home',
    wcag: 'WCAG Reference',
    aiAnalyze: 'AI Analysis',
    docs: 'Docs',
    patterns: 'Patterns',
    tools: 'Tools',
    githubLabel: 'GitHub repository',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    sidebarCollapse: 'Collapse sidebar',
    sidebarExpand: 'Expand sidebar',
    globalNav: 'Global navigation',
    mobileNav: 'Mobile navigation'
  },
  home: {
    subtitle: 'Compare WCAG 2.1 AA common baselines and design system implementations at a glance.',
    supportedDS: 'Supported design systems',
    allPatterns: 'All patterns',
    aiAnalyze: 'AI Analysis',
    searchPlaceholder: 'Search patterns...',
    searchClear: 'Clear search',
    filterByDS: 'Filter by design system',
    allDS: 'All',
    noResults: 'No patterns found.',
    filteredCount: (n: number) => `${n} patterns`
  },
  pattern: {
    backToAll: 'All patterns',
    wcagHint: 'Related WCAG criteria — click to view details',
    codeExample: 'Code example',
    baseline: 'Common baseline',
    appliesTo: 'Applies to all design systems',
    dsSectionDivider: 'Design system implementations',
    references: 'References',
    additionalChecks: 'Additional checks',
    codeSample: 'Code sample',
    implNotes: 'Implementation notes',
    itemCount: (n: number) => `${n}`,
    previewAlt: (name: string) => `${name} preview`
  },
  wcag: {
    title: 'WCAG 2.1 Reference',
    subtitle: 'Web Content Accessibility Guidelines — the international web accessibility standard. Requirements increase from A → AA → AAA.',
    principles: '4 Principles (POUR)',
    levels: 'Conformance levels',
    colCriterion: 'Criterion',
    colTitle: 'Title',
    colRequirement: 'Requirement',
    fullSpec: 'Full specification'
  },
  analyze: {
    title: 'AI Accessibility Analysis',
    subtitle: 'Describe a component and Claude will generate a checklist, code samples, and test procedures based on WCAG 2.1 AA.'
  },
  cmd: {
    title: 'Search patterns',
    placeholder: 'Search patterns...',
    noResults: 'No patterns found.',
    hintNavigate: 'navigate',
    hintOpen: 'open',
    hintClose: 'close',
    totalPatterns: 'patterns',
    searchLabel: 'Search patterns (⌘K)'
  }
}
