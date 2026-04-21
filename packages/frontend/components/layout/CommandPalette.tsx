'use client'

import { MousePointer2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import type { Lang } from '@/lib/i18n'
import type { Pattern } from '@/lib/types'

import { getTranslations } from '@/lib/i18n'
import { ICON_MAP } from '@/lib/patterns/icons'

interface Props {
  patterns: Pattern[]
  lang: Lang
  open: boolean
  onClose: () => void
}

export default function CommandPalette({ patterns, lang, open, onClose }: Props) {
  const t = getTranslations(lang)
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const filtered = query.trim()
    ? patterns.filter((p) => {
        const q = query.trim().toLowerCase()
        return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((tag) => tag.toLowerCase().includes(q))
      })
    : patterns

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  function navigate(pattern: Pattern) {
    router.push(`/${lang}/patterns/${pattern.slug}`)
    onClose()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (filtered[activeIndex]) navigate(filtered[activeIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!open) return null

  return (
    <div
      className='fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4'
      onClick={onClose}
      aria-modal='true'
      role='dialog'
      aria-label={t.cmd.title}>
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

      <div
        className='relative w-full max-w-xl bg-surface rounded-xl shadow-2xl border border-outline overflow-hidden'
        onClick={(e) => e.stopPropagation()}>
        <div className='flex items-center gap-3 px-4 py-3 border-b border-outline'>
          <Search
            size={16}
            className='text-faint shrink-0'
          />
          <input
            ref={inputRef}
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.cmd.placeholder}
            className='flex-1 bg-transparent text-sm text-body placeholder:text-faint outline-none'
            autoComplete='off'
          />
        </div>

        <ul
          ref={listRef}
          className='max-h-80 overflow-y-auto py-1.5'
          role='listbox'>
          {filtered.length === 0 ? (
            <li className='px-4 py-8 text-center text-sm text-soft'>{t.cmd.noResults}</li>
          ) : (
            filtered.map((pattern, i) => (
              <li
                key={pattern.slug}
                role='option'
                aria-selected={i === activeIndex}
                onClick={() => navigate(pattern)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                  i === activeIndex ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300' : 'text-body hover:bg-inset'
                }`}>
                <span className={`shrink-0 ${i === activeIndex ? 'text-violet-500' : 'text-faint'}`}>
                  {ICON_MAP[pattern.slug] ?? <MousePointer2 size={14} />}
                </span>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium leading-tight'>{pattern.name}</p>
                  <p className='text-[11px] text-soft truncate mt-0.5'>{pattern.description}</p>
                </div>
                {i === activeIndex && (
                  <kbd className='shrink-0 hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-faint bg-surface border border-outline'>
                    ↵
                  </kbd>
                )}
              </li>
            ))
          )}
        </ul>

        {filtered.length > 0 && (
          <div className='px-4 py-2 border-t border-outline flex items-center gap-3 text-[10px] text-faint'>
            <span>
              <kbd className='font-mono'>↑↓</kbd> {t.cmd.hintNavigate}
            </span>
            <span>
              <kbd className='font-mono'>↵</kbd> {t.cmd.hintOpen}
            </span>
            <span>
              <kbd className='font-mono'>esc</kbd> {t.cmd.hintClose}
            </span>
            <span className='ml-auto'>
              {filtered.length === patterns.length ? `${patterns.length} ${t.cmd.totalPatterns}` : `${filtered.length} / ${patterns.length}`}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
