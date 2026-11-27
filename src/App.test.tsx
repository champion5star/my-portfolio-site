import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

const hashRouting = import.meta.env.VITE_ROUTER_MODE === 'hash';

describe(`${hashRouting ? 'GitHub Pages hash' : 'browser'} router`, () => {
  it('opens a direct contact link and preserves its destination on remount', () => {
    const path = hashRouting ? `${import.meta.env.BASE_URL}#/contact` : '/contact';
    window.history.replaceState(null, '', path);
    const view = render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Have something in mind/ }),
    ).toBeInTheDocument();
    view.unmount();
    render(<App />);
    expect(screen.getByRole('form', { name: 'Send Ronnie a message' })).toBeInTheDocument();
    expect(hashRouting ? window.location.hash : window.location.pathname).toBe(
      hashRouting ? '#/contact' : '/contact',
    );
  });

  it('uses the correct URL shape when visitors navigate', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', import.meta.env.BASE_URL);
    render(<App />);
    await user.click(
      within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', {
        name: 'Projects',
      }),
    );
    expect(
      screen.getByRole('heading', { level: 1, name: /Built with intent/ }),
    ).toBeInTheDocument();
    expect(hashRouting ? window.location.hash : window.location.pathname).toBe(
      hashRouting ? '#/projects' : '/projects',
    );
  });
});
