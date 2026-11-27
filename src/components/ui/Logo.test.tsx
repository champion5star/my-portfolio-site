import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Logo from './Logo';
import AboutPage from '../../pages/AboutPage';

// JSDOM does not implement the native dialog lifecycle or top-layer focus.
// Browser checks cover the native Escape key and focus containment.
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
    this.querySelector<HTMLElement>('[autofocus]')?.focus();
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    queueMicrotask(() => this.dispatchEvent(new Event('close')));
  });
});

function renderLogo(showName = true) {
  return render(
    <StrictMode>
      <MemoryRouter initialEntries={['/projects']}>
        <Logo showName={showName} />
      </MemoryRouter>
    </StrictMode>,
  );
}

describe('portrait logo and full-image modal', () => {
  it('shows the About-page photo as a noninteractive image', async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      </StrictMode>,
    );
    expect(screen.queryByText(/^rg$/i)).not.toBeInTheDocument();
    const portrait = screen.getByRole('img', { name: 'Ronnie Galindo in a modern office' });
    expect(portrait.closest('button, a')).toBeNull();
    expect(
      screen.queryByRole('button', { name: 'View Ronnie Galindo’s full portrait' }),
    ).not.toBeInTheDocument();
    await user.click(portrait);
    expect(portrait).toHaveAttribute(
      'src',
      `${import.meta.env.BASE_URL}images/ronnie-office-portrait.png`,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('opens the full image and restores focus and scrolling after closing', async () => {
    const user = userEvent.setup();
    renderLogo();
    const trigger = screen.getByRole('button', { name: 'View Ronnie Galindo’s full portrait' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Ronnie Galindo' });
    expect(within(dialog).getByRole('img')).toHaveAttribute(
      'src',
      `${import.meta.env.BASE_URL}images/ronnie-office-portrait.png`,
    );
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(within(dialog).getByRole('button', { name: 'Close image' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    expect(trigger).toHaveFocus();
    expect(screen.getByRole('link', { name: 'Ronnie Galindo home' })).toHaveAttribute('href', '/');
  });

  it('handles the native Escape cancellation event', async () => {
    const user = userEvent.setup();
    renderLogo();
    await user.click(screen.getByRole('button', { name: 'View Ronnie Galindo’s full portrait' }));
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });

  it('dismisses the backdrop but keeps the modal open when the image is clicked', async () => {
    const user = userEvent.setup();
    renderLogo(false);
    await user.click(screen.getByRole('button', { name: 'View Ronnie Galindo’s full portrait' }));
    const dialog = screen.getByRole('dialog');
    await user.click(within(dialog).getByRole('img'));
    expect(dialog).toBeInTheDocument();
    fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('restores the previous body scroll setting if navigation unmounts the logo', async () => {
    const user = userEvent.setup();
    document.body.style.overflow = 'auto';
    const view = renderLogo();
    await user.click(screen.getByRole('button', { name: 'View Ronnie Galindo’s full portrait' }));
    view.unmount();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('auto');
    document.body.style.overflow = '';
  });
});
