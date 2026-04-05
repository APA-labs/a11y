import type { Translations } from './ko'

export const en: Translations = {
  nav: {
    home: 'Home',
    wcag: 'WCAG Reference',
    wcagWhy: 'Why Accessibility Matters',
    wcagAria: 'ARIA Attributes Guide',
    wcagDom: 'DOM Structure Best Practices',
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
  why: {
    title: 'Why Accessibility Matters',
    subtitle: 'Web accessibility is not just for people with disabilities. It is about building a web that more people can use in better ways.',
    sectionLegal: 'Legal obligations',
    sectionUsers: 'Scale of users',
    sectionBusiness: 'Business benefits',
    sectionQuality: 'Development quality',
    legal: [
      {
        id: 'KR',
        title: 'Act on Prohibition of Discrimination Against Disabled Persons (Korea)',
        desc: 'Enacted in 2008. Mandates web and app accessibility compliance; violations may result in corrective orders or damages claims.'
      },
      {
        id: 'US',
        title: 'ADA (United States)',
        desc: 'Americans with Disabilities Act. Requires accessibility for public services and business websites. Non-compliance has led to many class-action lawsuits.'
      },
      {
        id: 'EU',
        title: 'EN 301 549 (EU)',
        desc: 'Mandates WCAG 2.1 AA compliance for EU public bodies and some private enterprises. European Accessibility Act expands to private sector from 2025.'
      }
    ],
    users: [
      {
        id: '1B+',
        title: 'Over 1 billion people with disabilities worldwide',
        desc: 'Users with visual, hearing, motor, and cognitive disabilities directly rely on accessibility.'
      },
      {
        id: 'Situational',
        title: 'Situational disabilities',
        desc: 'Bright sunlight (screen glare), one-handed use (holding a child), slow networks — temporary limitations also benefit from accessibility.'
      },
      {
        id: 'Aging',
        title: 'Aging users',
        desc: 'Global population aging is rapidly increasing the number of users with reduced vision or motor ability.'
      }
    ],
    business: [
      { id: 'SEO', title: 'Search engine optimization', desc: 'Semantic HTML, alt text, and heading hierarchy directly contribute to SEO.' },
      {
        id: 'Devices',
        title: 'Multi-device compatibility',
        desc: 'Works across smart TVs, screen readers, voice interfaces, and other environments.'
      },
      {
        id: 'Brand',
        title: 'Brand reputation',
        desc: 'Accessibility demonstrates inclusive values and contributes to a corporate image that prioritizes diversity.'
      }
    ],
    quality: [
      { id: 'Structure', title: 'Semantic markup', desc: 'Designing for accessibility naturally leads to using correct HTML structure.' },
      { id: 'Testing', title: 'Testability', desc: 'Components with clear roles and labels are easier to find and verify in automated tests.' },
      {
        id: 'Maintenance',
        title: 'Maintenance efficiency',
        desc: 'Code following accessibility standards has clearer structure, improving team comprehension and maintenance efficiency.'
      }
    ]
  },
  aria: {
    title: 'ARIA Attributes Guide',
    subtitle:
      'Accessible Rich Internet Applications — the standard for conveying UI state, roles, and relationships that semantic HTML alone cannot express to assistive technologies.',
    sectionPrinciples: '3 Rules of ARIA Use',
    sectionRoles: 'Roles (role)',
    sectionStates: 'States and properties (aria-*)',
    sectionLive: 'Live regions (aria-live)',
    principles: [
      { id: '1', title: 'HTML first', desc: 'If semantic HTML can express it, do not use ARIA. A <button> is better than role="button".' },
      { id: '2', title: 'Do not change native semantics', desc: 'Do not override built-in meaning, like <h1 role="button">.' },
      {
        id: '3',
        title: 'Interactive elements must support keyboard',
        desc: 'If you add a role, you must also implement the corresponding keyboard behavior (Enter, Space, Arrow keys, etc.).'
      }
    ],
    landmarkRoles: [
      { id: 'banner', title: 'banner', desc: 'Page header area. Equivalent to <header>.' },
      { id: 'navigation', title: 'navigation', desc: 'Navigation link group. Equivalent to <nav>.' },
      { id: 'main', title: 'main', desc: "Page's primary content. Equivalent to <main>." },
      { id: 'complementary', title: 'complementary', desc: 'Supporting content (like a sidebar). Equivalent to <aside>.' },
      { id: 'contentinfo', title: 'contentinfo', desc: 'Page footer area. Equivalent to <footer>.' },
      { id: 'region', title: 'region', desc: 'A named section. Use with aria-label.' }
    ],
    widgetRoles: [
      { id: 'dialog', title: 'dialog', desc: 'Modal dialog. Requires aria-modal="true" and focus trapping.' },
      { id: 'tablist/tab/tabpanel', title: 'tablist / tab / tabpanel', desc: 'Tab UI composition. These three roles work as a set.' },
      { id: 'combobox', title: 'combobox', desc: 'Search + dropdown combination. Requires aria-expanded and aria-controls.' },
      { id: 'listbox/option', title: 'listbox / option', desc: 'Selection list. Used for custom <select> implementations.' },
      { id: 'alert', title: 'alert', desc: 'Message that must be read immediately. Automatically acts as aria-live="assertive".' },
      { id: 'status', title: 'status', desc: 'Non-urgent status message. Acts as aria-live="polite".' }
    ],
    states: [
      { id: 'aria-expanded', title: 'aria-expanded', desc: 'Indicates whether an element is expanded. Used for accordions, dropdowns.' },
      { id: 'aria-checked', title: 'aria-checked', desc: 'Indicates checked state. Values: true / false / mixed.' },
      { id: 'aria-disabled', title: 'aria-disabled', desc: 'Indicates disabled state. Unlike disabled, focus is maintained.' },
      { id: 'aria-selected', title: 'aria-selected', desc: 'Indicates selected state. Used for tabs, listbox options.' },
      { id: 'aria-pressed', title: 'aria-pressed', desc: 'Indicates the pressed state of a toggle button.' },
      { id: 'aria-hidden', title: 'aria-hidden', desc: 'Completely hides from assistive technologies. Used for decorative elements.' }
    ],
    relations: [
      { id: 'aria-label', title: 'aria-label', desc: 'Provides an accessible name directly on the element. Used for buttons without visible text.' },
      {
        id: 'aria-labelledby',
        title: 'aria-labelledby',
        desc: 'References another element by ID to provide a name. Preferred when text is already on screen.'
      },
      {
        id: 'aria-describedby',
        title: 'aria-describedby',
        desc: 'Connects additional description text. Used for input field error messages and hint text.'
      },
      { id: 'aria-controls', title: 'aria-controls', desc: 'References the ID of the element this element controls. Tab→panel, button→dropdown.' },
      { id: 'aria-owns', title: 'aria-owns', desc: 'Expresses a logical ownership relationship that is not a DOM parent-child relationship.' }
    ],
    live: [
      {
        id: 'aria-live="polite"',
        title: 'aria-live="polite"',
        desc: 'Reads changes after the current content finishes. Used for search result counts, success messages.'
      },
      {
        id: 'aria-live="assertive"',
        title: 'aria-live="assertive"',
        desc: 'Interrupts and reads changes immediately. Use only for urgent notifications like error messages.'
      },
      {
        id: 'aria-atomic',
        title: 'aria-atomic="true"',
        desc: 'Reads the entire region content when any part changes. Used when full context is needed over partial updates.'
      },
      {
        id: 'aria-relevant',
        title: 'aria-relevant',
        desc: 'Specifies which changes (additions/removals/text) to announce. Default is additions text.'
      }
    ]
  },
  dom: {
    title: 'DOM Structure Best Practices',
    subtitle: 'Proper DOM structure directly affects screen reader navigation efficiency, focus order, and accessibility tree quality.',
    sectionSemantic: 'Semantic markup',
    sectionHeading: 'Heading hierarchy',
    sectionNesting: 'Nesting depth',
    sectionDomSize: 'DOM size',
    sectionFocus: 'Focus order',
    semantic: [
      {
        id: '<header>',
        title: 'header / footer / main',
        desc: 'Landmark elements allow screen readers to jump between sections using keyboard shortcuts.'
      },
      { id: '<nav>', title: 'nav', desc: 'Navigation link group. Use aria-label to distinguish multiple nav elements.' },
      {
        id: '<article>',
        title: 'article / section',
        desc: 'Independent content units and topic divisions. Conveys more meaning than overusing div.'
      },
      {
        id: '<button>',
        title: 'button vs div',
        desc: '<div onclick> requires manually implementing keyboard access, role, and state. Use native elements.'
      },
      {
        id: '<ul>/<ol>',
        title: 'ul / ol / li',
        desc: 'Use list elements for lists. Screen readers automatically announce item count and current position.'
      }
    ],
    heading: [
      {
        id: 'Order',
        title: 'Maintain h1 → h2 → h3 order',
        desc: 'Skipping heading levels can cause screen reader users to misunderstand structure. h3 after h1 is prohibited.'
      },
      { id: 'h1', title: 'One h1 per page', desc: 'Only one h1 to represent the page topic. Use h2 for sections, h3 for subsections.' },
      { id: 'Skip', title: 'Do not skip heading levels', desc: 'Adjust visual emphasis with CSS font-size. Never skip heading levels.' }
    ],
    nesting: [
      {
        id: 'Depth',
        title: 'Recommended nesting depth ≤ 7–8 levels',
        desc: 'Excessive nesting complicates the accessibility tree and makes it harder for screen reader users to understand context.'
      },
      { id: 'Layout', title: 'Minimize layout-only divs', desc: 'Do not add wrapper divs for layouts solvable with CSS Grid/Flex.' },
      {
        id: 'Component',
        title: 'Watch for component abstraction nesting',
        desc: 'Many stacked components produce unnecessary divs in the actual DOM. Prefer Fragment.'
      }
    ],
    domSize: [
      {
        id: '1500',
        title: 'Lighthouse recommends ≤ 1,500 nodes',
        desc: 'More DOM nodes increase the cost of building the accessibility tree and slow screen reader initial load time.'
      },
      {
        id: 'Tree',
        title: 'Accessibility tree = subset of DOM',
        desc: 'Elements hidden via aria-hidden or display:none are excluded from the accessibility tree, but all visible elements are included.'
      },
      {
        id: 'Virtual',
        title: 'Consider virtualizing long lists',
        desc: 'Virtualize hundreds of list items with react-virtual to reduce both DOM size and the accessibility tree.'
      }
    ],
    focus: [
      {
        id: 'DOMOrder',
        title: 'DOM order = focus order',
        desc: 'Tab key focus follows DOM order. Even if CSS changes the visual order, focus order is still based on the DOM.'
      },
      {
        id: 'tabindex',
        title: 'Avoid overusing tabindex',
        desc: 'tabindex="0" allows focus, tabindex="-1" is for programmatic focus. Positive tabindex values should almost never be used.'
      },
      {
        id: 'FocusTrap',
        title: 'Focus trap required inside modals',
        desc: 'When a modal opens, focus must be trapped inside. On close, return focus to the trigger element.'
      }
    ],
    glossaryLabel: 'Glossary',
    glossary: [
      {
        term: 'Programmatic focus',
        desc: 'Moving focus to a specific element by calling .focus() directly in JavaScript code, without user input. Used when opening or closing modals, and when navigating to an error field after form validation.'
      },
      {
        term: 'Accessibility Tree',
        desc: 'A separate tree structure built by the browser from the DOM. Assistive technologies like screen readers read this tree, not the DOM directly. It includes role, aria-* attributes, and text content. Elements hidden with aria-hidden or display:none are excluded.'
      },
      {
        term: 'Focus Trap',
        desc: 'A pattern that keeps Tab key navigation cycling within a specific container (e.g., a modal), preventing focus from reaching background content while the modal is open. Libraries like @radix-ui and react-focus-lock implement this.'
      },
      {
        term: 'Landmark',
        desc: 'Semantic HTML elements or ARIA roles (header, nav, main, aside, footer) that divide the page structure. Screen reader users can jump between landmarks using keyboard shortcuts, allowing fast navigation to desired sections in long pages.'
      },
      {
        term: 'Virtualization',
        desc: 'A technique that renders only the visible items in the DOM, removing the rest. Even with 1000 items, only the ~20 visible ones exist in the DOM. Reduces DOM node count and accessibility tree size, improving performance and assistive technology response time.'
      }
    ]
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
