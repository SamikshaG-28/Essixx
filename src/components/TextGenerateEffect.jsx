import { useEffect } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '../lib/utils.js'

/**
 * Word-by-word fade-in with blur-to-clear transition.
 *
 * Props:
 *  - lines:  Array<{ words: string[], accentFrom?: number }>
 *            One render block per line. `accentFrom` is the index from which
 *            words inside that line get the `accentClassName` applied.
 *  - className:           class for the outer wrapper
 *  - wordClassName:       class applied to every word span
 *  - accentClassName:     class applied to "accent" words
 *  - duration:            per-word transition duration in seconds
 *  - staggerDelay:        delay between words in seconds
 *  - filter:              apply a blur(10px) → blur(0) filter transition
 */
export default function TextGenerateEffect({
  lines = [],
  className,
  wordClassName,
  accentClassName,
  duration = 0.6,
  staggerDelay = 0.12,
  filter = true,
}) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      'span.tge-word',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
        y: 0,
      },
      {
        duration,
        delay: stagger(staggerDelay),
        ease: [0.22, 1, 0.36, 1],
      }
    )
  }, [animate, duration, staggerDelay, filter])

  return (
    <div ref={scope} className={cn('tge', className)}>
      {lines.map((line, lineIdx) => (
        <span className="tge-line" key={`line-${lineIdx}`}>
          {line.words.map((word, wordIdx) => {
            const isAccent =
              typeof line.accentFrom === 'number' && wordIdx >= line.accentFrom
            return (
              <motion.span
                key={`word-${lineIdx}-${wordIdx}`}
                className={cn(
                  'tge-word',
                  wordClassName,
                  isAccent && accentClassName
                )}
                style={{
                  opacity: 0,
                  filter: filter ? 'blur(10px)' : 'none',
                  y: 6,
                  display: 'inline-block',
                }}
              >
                {word}
                {wordIdx < line.words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            )
          })}
        </span>
      ))}
    </div>
  )
}
