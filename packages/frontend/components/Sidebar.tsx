'use client'

import {
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronsUpDown,
  CircleDot,
  GalleryHorizontal,
  Info,
  LayoutGrid,
  Link2,
  ListCollapse,
  MessageCircle,
  Minus,
  MousePointer2,
  Navigation,
  PanelRight,
  PanelTop,
  Search,
  ShieldCheck,
  Slash,
  Sliders,
  Sparkles,
  SquareCheck,
  Table,
  ToggleLeft,
  Type
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { patterns } from '../lib/patterns'

const ICON_MAP: Record<string, React.ReactNode> = {
  button: <MousePointer2 size={14} />,
  'text-input': <Type size={14} />,
  'modal-dialog': <BookOpen size={14} />,
  toggle: <ToggleLeft size={14} />,
  disclosure: <ChevronDown size={14} />,
  tabs: <PanelTop size={14} />,
  tooltip: <Info size={14} />,
  accordion: <ListCollapse size={14} />,
  combobox: <Search size={14} />,
  checkbox: <SquareCheck size={14} />,
  'radio-group': <CircleDot size={14} />,
  link: <Link2 size={14} />,
  alert: <Bell size={14} />,
  select: <ChevronsUpDown size={14} />,
  breadcrumb: <Slash size={14} />,
  pagination: <GalleryHorizontal size={14} />,
  'navigation-menu': <Navigation size={14} />,
  'form-validation': <ShieldCheck size={14} />,
  popover: <MessageCircle size={14} />,
  drawer: <PanelRight size={14} />,
  'date-picker': <Calendar size={14} />,
  slider: <Sliders size={14} />,
  table: <Table size={14} />,
  'menu-button': <LayoutGrid size={14} />,
  toolbar: <Minus size={14} />
}

export default function Sidebar({ aiEnabled = true }: { aiEnabled?: boolean }) {
  const pathname = usePathname()

  return (
    <aside className='w-[240px] shrink-0 bg-navy-900 text-mist-300 flex flex-col h-full overflow-y-auto scrollbar-thin'>
      {/* Logo */}
      <div className='px-5 py-5 border-b border-navy-800'>
        <Link
          href='/'
          className='flex items-center gap-2.5 group'>
          <div className='w-7 h-7 rounded-md bg-violet-600 flex items-center justify-center text-white font-bold text-sm'>A</div>
          <span className='font-semibold text-white text-sm tracking-tight'>A11y Patterns</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className='flex-1 px-3 py-4 space-y-6'>
        <div>
          <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-600'>Docs</p>
          <ul className='space-y-0.5'>
            <li>
              <Link
                href='/wcag'
                className={`
                  flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                  ${pathname === '/wcag' ? 'bg-violet-600 text-white' : 'text-mist-400 hover:bg-navy-800 hover:text-white'}
                `}>
                <ShieldCheck
                  size={14}
                  className={pathname === '/wcag' ? 'text-white' : 'text-mist-600'}
                />
                WCAG 레퍼런스
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-600'>Patterns</p>
          <ul className='space-y-0.5'>
            {patterns.map((pattern) => {
              const href = `/patterns/${pattern.slug}`
              const isActive = pathname === href
              return (
                <li key={pattern.slug}>
                  <Link
                    href={href}
                    className={`
                      flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                      ${isActive ? 'bg-violet-600 text-white' : 'text-mist-400 hover:bg-navy-800 hover:text-white'}
                    `}>
                    <span className={isActive ? 'text-white' : 'text-mist-600'}>{ICON_MAP[pattern.slug] ?? <MousePointer2 size={14} />}</span>
                    {pattern.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {aiEnabled && (
          <div>
            <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-600'>Tools</p>
            <ul className='space-y-0.5'>
              <li>
                <Link
                  href='/analyze'
                  className={`
                    flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                    ${pathname === '/analyze' ? 'bg-violet-600 text-white' : 'text-mist-400 hover:bg-navy-800 hover:text-white'}
                  `}>
                  <Sparkles
                    size={14}
                    className={pathname === '/analyze' ? 'text-white' : 'text-mist-600'}
                  />
                  AI 분석
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <div className='h-4 shrink-0' />
    </aside>
  )
}
