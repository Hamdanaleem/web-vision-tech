"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    title: "Global Vision, Local Expertise",
    subtitle:
      "We transform complex business challenges into elegant, scalable software solutions.",
    cta: "Explore Our Services",
    link: "/services",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    title: "Engineering Excellence",
    subtitle:
      "Powered by the MERN Stack and Next.js for high-performance enterprise applications.",
    cta: "More About Us",
    link: "/about",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    title: "People-First Innovation",
    subtitle:
      "A culture of ownership, continuous learning, and client partnership.",
    cta: "Join Our Team",
    link: "/careers",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop",
    title: "Trusted Partnership",
    subtitle:
      "Building long-term value through transparent communication and reliable 24/7 support.",
    cta: "Contact Us",
    link: "/contact",
  },
];

const LONGEST_TITLE = slides.reduce(
  (a, b) => (b.title.length > a.length ? b.title : a),
  ""
);

const LONGEST_SUBTITLE = slides.reduce(
  (a, b) => (b.subtitle.length > a.length ? b.subtitle : a),
  ""
);

function Typewriter({
  text,
  speed = 30,
  isActive,
}: {
  text: string;
  speed?: number;
  isActive: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayed("");
      setIsComplete(false);
      return;
    }

    let i = 0;
    setDisplayed("");
    setIsComplete(false);

    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isActive]);

  return (
    <>
      {displayed}
      {isActive && !isComplete && (
        <span
          className="animate-pulse text-vision-blue font-light"
          aria-hidden="true"
        >
          |
        </span>
      )}
    </>
  );
}

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeIndex) return;

      setIsTransitioning(true);
      setActiveIndex(index);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    },
    [activeIndex, isTransitioning]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-white pt-20 overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        const isEven = slide.id % 2 === 0;

        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 flex flex-col-reverse ${
              isEven ? "md:flex-row-reverse" : "md:flex-row"
            } transition-opacity duration-700 ease-in-out ${
              isActive
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="relative w-full h-1/2 overflow-hidden md:h-full md:w-1/2">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={slide.id === 1}
                loading={slide.id === 1 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black/5 md:bg-transparent" />
            </div>

            <div className="flex h-1/2 w-full items-center justify-center bg-white p-8 md:h-full md:w-1/2 md:p-16">
              <div className="max-w-xl w-full space-y-6 text-left">
                <div
                  aria-hidden="true"
                  className={`h-1.5 rounded-full bg-gradient-to-r from-vision-blue to-vision-purple transition-all duration-1000 ${
                    isActive ? "w-16 opacity-100" : "w-0 opacity-0"
                  }`}
                />

                <h1 className="relative text-4xl font-bold leading-tight text-vision-dark md:text-5xl">
                  <span
                    aria-hidden="true"
                    className="block whitespace-pre-wrap opacity-0 select-none"
                  >
                    {LONGEST_TITLE}
                  </span>
                  <span className="absolute inset-0">
                    <Typewriter
                      text={slide.title}
                      speed={40}
                      isActive={isActive}
                    />
                  </span>
                </h1>

                <p className="relative text-lg font-light leading-relaxed text-gray-600">
                  <span
                    aria-hidden="true"
                    className="block whitespace-pre-wrap opacity-0 select-none"
                  >
                    {LONGEST_SUBTITLE}
                  </span>
                  <span className="absolute inset-0">
                    <Typewriter
                      text={slide.subtitle}
                      speed={20}
                      isActive={isActive}
                    />
                  </span>
                </p>

                <div
                  className={`pt-2 transition-all duration-700 delay-500 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                  style={{ willChange: "opacity, transform" }}
                >
                  <Link
                    href={slide.link}
                    className="group inline-flex items-center gap-3 text-lg font-bold text-vision-blue transition-colors hover:text-vision-purple"
                  >
                    {slide.cta}
                    <span className="rounded-full bg-blue-50 p-2 transition-colors group-hover:bg-purple-50">
                      <MoveRight size={20} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "h-3 w-8 bg-vision-blue"
                : "h-3 w-3 bg-vision-blue/30 hover:bg-vision-blue/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}