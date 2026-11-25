import { motion, useReducedMotion } from 'framer-motion'

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  blur = false,
  once = true,
  as = 'div',
}) {
  const reduce = useReducedMotion()
  const Tag = as
  const MotionTag = motion[as]

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={blur ? { opacity: 0, y, filter: 'blur(12px)' } : { opacity: 0, y }}
      // A leftover `filter` would make this wrapper a backdrop root and stop
      // any liquid glass inside it from seeing the page behind.
      whileInView={
        blur
          ? { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }
          : { opacity: 1, y: 0 }
      }
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

export function HeroReveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(14px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function HeroMountainReveal({ side = 'left', children, className = '', delay = 0.5 }) {
  const reduce = useReducedMotion()
  const fromX = side === 'left' ? -56 : 56

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: fromX, y: 32 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function FooterRocksReveal({ children, className = '', delay = 0.12 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 56, scale: 1.1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '50% 100%' }}
    >
      {children}
    </motion.div>
  )
}
