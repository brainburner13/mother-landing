"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "./OfficeCarousel.module.css";

export type OfficeSlide = {
  src: StaticImageData;
  alt: string;
};

type Props = {
  slides: OfficeSlide[];
  variant?: "default" | "hero";
};

export function OfficeCarousel({ slides, variant = "default" }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const rootClass = variant === "hero" ? `${styles.root} ${styles.rootHero}` : styles.root;
  const viewportClass = variant === "hero" ? `${styles.viewport} ${styles.viewportHero}` : styles.viewport;

  return (
    <div className={rootClass}>
      <div className={viewportClass} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((slide, index) => (
            <div className={styles.slide} key={index}>
              <div className={variant === "hero" ? `${styles.frame} ${styles.frameHero}` : styles.frame}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className={styles.img}
                  sizes={
                    variant === "hero"
                      ? "(max-width: 900px) 100vw, 50vw"
                      : "(max-width: 768px) 100vw, min(960px, 90vw)"
                  }
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={scrollPrev} aria-label="Предыдущее фото">
          ‹
        </button>
        <div className={styles.dots} role="tablist" aria-label="Выбор слайда">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Слайд ${i + 1}`}
              className={styles.dot}
              data-active={i === selectedIndex ? "true" : "false"}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
        <button type="button" className={styles.arrow} onClick={scrollNext} aria-label="Следующее фото">
          ›
        </button>
      </div>
    </div>
  );
}
