import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Reveal.jsx'
import { FAQS } from '../../data/faqs.js'

function FaqItem({ faq, open, onToggle }) {
  return (
    <div className={`sx-faq-item${open ? ' is-open' : ''}`}>
      <button type="button" className="sx-faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{faq.question}</span>
        <span className="sx-faq-icon" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="sx-faq-a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="sx-faq">
      <div className="sx-faq-inner">
        <Reveal className="sx-faq-head">
          <span className="sx-badge sx-badge--outline">FAQ</span>
          <h2>Common questions, answered.</h2>
          <p>
            Everything about pricing, timelines, and how we work. Still curious?{' '}
            <a href="mailto:support@essixx.com">Write to us</a>.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="sx-faq-list">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
