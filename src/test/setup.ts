import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// JSDOM has no viewport or scroll implementation. Keep layout-only APIs inert;
// the actual routing, form state, and filtering logic run without mocks.
vi.stubGlobal(
  'IntersectionObserver',
  class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  },
);
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
// Keep motion deterministic in page tests; motion lifecycle tests override this.
window.matchMedia = vi.fn().mockImplementation((media: string) => ({
  matches: media === '(prefers-reduced-motion: reduce)',
  media,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

afterEach(() => {
  cleanup();
  window.history.replaceState(null, '', import.meta.env.BASE_URL);
  vi.clearAllMocks();
});
