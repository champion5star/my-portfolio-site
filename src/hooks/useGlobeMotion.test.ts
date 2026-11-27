import { act, renderHook } from '@testing-library/react';
import { useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useGlobeMotion from './useGlobeMotion';

describe('globe animation lifecycle', () => {
  let pending: Map<number, FrameRequestCallback>;
  let frameId: number;
  let mediaChange: () => void;
  let intersectionChange: IntersectionObserverCallback;
  let preference: MediaQueryList;

  function advanceFrame(time: number) {
    act(() => {
      const callbacks = [...pending.values()];
      pending.clear();
      callbacks.forEach((callback) => callback(time));
    });
  }

  beforeEach(() => {
    pending = new Map();
    frameId = 0;
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      pending.set(++frameId, callback);
      return frameId;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      pending.delete(id);
    });
    preference = {
      matches: false,
      addEventListener: vi.fn((_, callback) => {
        mediaChange = callback;
      }),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList;
    vi.spyOn(window, 'matchMedia').mockReturnValue(preference);
    vi.spyOn(window, 'IntersectionObserver').mockImplementation(
      class {
        root = null;
        rootMargin = '';
        thresholds = [];
        constructor(callback: IntersectionObserverCallback) {
          intersectionChange = callback;
        }
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
        takeRecords = () => [];
      },
    );
  });

  it('advances smoothly, pauses without background frames, and cleans up on unmount', () => {
    const { result, unmount } = renderHook(useGlobeMotion);
    expect(result.current.playing).toBe(true);
    advanceFrame(100);
    advanceFrame(120);
    expect(result.current.frame.rotation).toBe(-15);
    advanceFrame(160);
    expect(result.current.frame.rotation).toBeCloseTo(-14.64);
    advanceFrame(1000);
    expect(result.current.frame.time).toBeCloseTo(0.16);
    act(() => result.current.setPaused(true));
    expect(result.current.playing).toBe(false);
    expect(pending.size).toBe(0);
    act(() => result.current.setPaused(false));
    expect(pending.size).toBe(1);
    unmount();
    expect(pending.size).toBe(0);
    expect(preference.removeEventListener).toHaveBeenCalled();
  });

  it('respects a changed reduced-motion preference while allowing manual rotation', () => {
    const { result } = renderHook(useGlobeMotion);
    act(() => {
      Object.defineProperty(preference, 'matches', { value: true, configurable: true });
      mediaChange();
    });
    expect(result.current.reducedMotion).toBe(true);
    expect(result.current.playing).toBe(false);
    expect(pending.size).toBe(0);
    act(() => result.current.rotateTo(95));
    expect(result.current.frame.rotation).toBe(95);
    act(() => {
      Object.defineProperty(preference, 'matches', { value: false });
      mediaChange();
    });
    expect(result.current.playing).toBe(true);
  });

  it('stops work offscreen, in background tabs, and while dragging', () => {
    const { result } = renderHook(useGlobeMotion);
    const intersect = (isIntersecting: boolean) =>
      act(() =>
        intersectionChange(
          [{ isIntersecting } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        ),
      );
    intersect(false);
    expect(result.current.playing).toBe(false);
    expect(pending.size).toBe(0);
    intersect(true);
    expect(result.current.playing).toBe(true);
    act(() => result.current.setDragging(true));
    expect(result.current.playing).toBe(false);
    act(() => result.current.setDragging(false));
    expect(result.current.playing).toBe(true);
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(result.current.playing).toBe(false);
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(result.current.playing).toBe(true);
  });

  it('starts on the first visit if the tab becomes visible before effects subscribe', () => {
    let hidden = true;
    vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
    const { result } = renderHook(useGlobeMotion, {
      wrapper: function ActivateTab({ children }: { children: ReactNode }) {
        useLayoutEffect(() => {
          hidden = false;
        }, []);
        return children;
      },
    });
    expect(result.current.playing).toBe(true);
    advanceFrame(100);
    advanceFrame(160);
    expect(result.current.frame.rotation).toBeGreaterThan(-15);
  });

  it.each(['pageshow', 'focus', 'prerenderingchange'])(
    'resynchronizes visibility on %s without a refresh',
    (eventName) => {
      let hidden = true;
      vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
      const { result } = renderHook(useGlobeMotion);
      expect(result.current.playing).toBe(false);
      expect(pending.size).toBe(0);
      hidden = false;
      act(() => {
        const target = eventName === 'prerenderingchange' ? document : window;
        target.dispatchEvent(new Event(eventName));
      });
      expect(result.current.playing).toBe(true);
      advanceFrame(100);
      advanceFrame(160);
      expect(result.current.frame.rotation).toBeGreaterThan(-15);
    },
  );

  it('preserves manual pause and reduced motion when a page is activated', () => {
    const { result } = renderHook(useGlobeMotion);
    act(() => result.current.setPaused(true));
    act(() => window.dispatchEvent(new Event('pageshow')));
    expect(result.current.playing).toBe(false);
    expect(result.current.paused).toBe(true);
    act(() => {
      Object.defineProperty(preference, 'matches', { value: true, configurable: true });
      mediaChange();
      result.current.setPaused(false);
      window.dispatchEvent(new Event('focus'));
    });
    expect(result.current.reducedMotion).toBe(true);
    expect(result.current.playing).toBe(false);
    expect(pending.size).toBe(0);
  });

  it('does not restart after its component has unmounted', () => {
    const { unmount } = renderHook(useGlobeMotion);
    unmount();
    act(() => {
      window.dispatchEvent(new Event('pageshow'));
      window.dispatchEvent(new Event('focus'));
      document.dispatchEvent(new Event('prerenderingchange'));
    });
    expect(pending.size).toBe(0);
  });
});
