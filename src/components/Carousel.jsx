import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import './Carousel.css'

const CarouselContext = createContext(null)

function useCarousel() {
  const ctx = useContext(CarouselContext)
  if (!ctx) {
    throw new Error('Carousel sub-components must be used inside <Carousel />')
  }
  return ctx
}

const Carousel = forwardRef(function Carousel(
  {
    opts = { loop: true, align: 'center' },
    autoplay = true,
    autoplayDelay = 5000,
    className = '',
    ariaLabel = 'Carousel',
    children,
    ...rest
  },
  ref,
) {
  const plugins = autoplay
    ? [
        Autoplay({
          delay: autoplayDelay,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]
    : []

  const [emblaRef, emblaApi] = useEmblaCarousel(opts, plugins)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        emblaRef,
        emblaApi,
        canPrev,
        canNext,
        selected,
        snaps,
        scrollPrev,
        scrollNext,
        scrollTo,
        loop: !!opts.loop,
      }}
    >
      <section
        ref={ref}
        className={`carousel ${className}`.trim()}
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  )
})

const CarouselContent = forwardRef(function CarouselContent(
  { className = '', children, ...rest },
  ref,
) {
  const { emblaRef } = useCarousel()
  return (
    <div className="carousel-viewport" ref={emblaRef}>
      <div ref={ref} className={`carousel-container ${className}`.trim()} {...rest}>
        {children}
      </div>
    </div>
  )
})

const CarouselItem = forwardRef(function CarouselItem(
  { className = '', children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`carousel-slide ${className}`.trim()}
      role="group"
      aria-roledescription="slide"
      {...rest}
    >
      {children}
    </div>
  )
})

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

const CarouselPrevious = forwardRef(function CarouselPrevious(
  { className = '', ...rest },
  ref,
) {
  const { scrollPrev, canPrev, loop } = useCarousel()
  return (
    <button
      ref={ref}
      type="button"
      onClick={scrollPrev}
      disabled={!canPrev && !loop}
      aria-label="Previous slide"
      className={`carousel-btn carousel-btn--prev ${className}`.trim()}
      {...rest}
    >
      <ArrowIcon direction="left" />
    </button>
  )
})

const CarouselNext = forwardRef(function CarouselNext(
  { className = '', ...rest },
  ref,
) {
  const { scrollNext, canNext, loop } = useCarousel()
  return (
    <button
      ref={ref}
      type="button"
      onClick={scrollNext}
      disabled={!canNext && !loop}
      aria-label="Next slide"
      className={`carousel-btn carousel-btn--next ${className}`.trim()}
      {...rest}
    >
      <ArrowIcon direction="right" />
    </button>
  )
})

function CarouselDots({ className = '' }) {
  const { snaps, selected, scrollTo } = useCarousel()
  if (snaps.length <= 1) return null
  return (
    <div
      className={`carousel-dots ${className}`.trim()}
      role="tablist"
      aria-label="Slide navigation"
    >
      {snaps.map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === selected}
          aria-label={`Go to slide ${i + 1}`}
          className={`carousel-dot ${i === selected ? 'is-active' : ''}`.trim()}
          onClick={() => scrollTo(i)}
        />
      ))}
    </div>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}
