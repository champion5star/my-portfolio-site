import { useEffect, useRef, useState } from 'react';

export default function useGlobeMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [frame, setFrame] = useState({ rotation: -15, time: 0 });

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (containerRef.current) observer.observe(containerRef.current);
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  const playing = !paused && !dragging && !reducedMotion && visible && pageVisible;
  useEffect(() => {
    if (!playing) return;
    let request: number;
    let previous = 0;
    const animate = (now: number) => {
      if (!previous) previous = now;
      const elapsed = now - previous;
      if (elapsed >= 40) {
        const delta = Math.min(elapsed, 100);
        setFrame((current) => ({
          rotation: (current.rotation + delta * 0.006) % 360,
          time: current.time + delta / 1000,
        }));
        previous = now;
      }
      request = requestAnimationFrame(animate);
    };
    request = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(request);
  }, [playing]);

  const rotateTo = (rotation: number) => setFrame((current) => ({ ...current, rotation }));
  return { containerRef, frame, playing, paused, setPaused, reducedMotion, setDragging, rotateTo };
}
