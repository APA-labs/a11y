import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import type { Lang, Translations } from '@/lib/i18n'

type Props = {
  lang: Lang
  content: Translations['home']['wcagIntro']
}

export default function WcagIntro({ lang, content }: Props) {
  return (
    <section
      aria-labelledby='wcag-intro-title'
      className='relative max-w-7xl mx-auto px-6 sm:px-10'>
      <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start'>
        <div>
          <div className='inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-soft mb-4'>
            <span className='inline-block h-1.5 w-1.5 rounded-full bg-violet-500' />
            {content.eyebrow}
          </div>
          <h2
            id='wcag-intro-title'
            className='text-2xl sm:text-3xl font-semibold tracking-tight text-body leading-snug'>
            {content.title}
          </h2>
          <p className='mt-5 text-[15px] text-soft leading-relaxed'>{content.body}</p>
          <Link
            href={`/${lang}/wcag`}
            className='mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 group'>
            {content.readMore}
            <ArrowRight
              size={14}
              className='transition-transform group-hover:translate-x-0.5'
            />
          </Link>
        </div>

        <ol className='grid grid-cols-1 sm:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-outline bg-outline/60'>
          {content.principles.map((p, i) => (
            <li
              key={p.id}
              className='bg-surface p-5 flex gap-4'>
              <span className='text-xs font-mono text-faint mt-0.5 tabular-nums'>0{i + 1}</span>
              <div className='min-w-0'>
                <p className='text-sm font-semibold text-body'>
                  <span className='text-violet-500 dark:text-violet-400 mr-1.5'>{p.id}</span>
                  {p.name}
                </p>
                <p className='text-[12px] text-soft mt-1 leading-relaxed'>{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
