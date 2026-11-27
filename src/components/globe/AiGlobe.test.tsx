import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AiGlobe from './AiGlobe';

describe('interactive global AI illustration', () => {
  it('filters the network by AI capability and explains the selected layer', async () => {
    const user = userEvent.setup();
    render(<AiGlobe />);
    expect(screen.getByRole('button', { name: 'All AI' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Vision' }));
    expect(screen.getByRole('button', { name: 'Vision' })).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByText('Turning images into understanding, wherever life happens.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Explore London AI connections' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Explore Nairobi AI connections' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Language' }));
    expect(
      screen.getByText('Understanding language. Sharing knowledge across borders.'),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Automation' }));
    expect(
      screen.getByText('Connecting intelligent services to everyday work.'),
    ).toBeInTheDocument();
  });

  it('focuses a region and lets keyboard users explore a hub', async () => {
    const user = userEvent.setup();
    render(<AiGlobe />);
    await user.selectOptions(screen.getByRole('combobox', { name: 'Explore a region' }), 'asia');
    expect(screen.getByRole('combobox', { name: 'Explore a region' })).toHaveValue('asia');
    const hub = screen.getByRole('button', { name: 'Explore Tokyo AI connections' });
    fireEvent.keyDown(hub, { key: 'Enter' });
    expect(screen.getByText(/Tokyo · Explore how AI connects people/)).toBeInTheDocument();
    expect(hub).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Language' }));
    fireEvent.keyDown(screen.getByRole('button', { name: 'Explore Tokyo AI connections' }), {
      key: ' ',
    });
    expect(screen.getByText(/Tokyo · Explore how language AI/)).toBeInTheDocument();
  });

  it('rotates with keyboard controls and disables autoplay for reduced motion', async () => {
    const user = userEvent.setup();
    const { container } = render(<AiGlobe />);
    const scene = screen.getByRole('group', {
      name: 'Interactive Earth showing illustrative AI connections',
    });
    const initial = container.querySelector('.ai-land')?.getAttribute('d');
    fireEvent.keyDown(scene, { key: 'ArrowRight' });
    expect(container.querySelector('.ai-land')?.getAttribute('d')).not.toBe(initial);
    fireEvent.keyDown(scene, { key: 'ArrowLeft' });
    expect(container.querySelector('.ai-land')?.getAttribute('d')).toBe(initial);
    await user.click(screen.getByRole('button', { name: 'Rotate globe west' }));
    expect(container.querySelector('.ai-land')?.getAttribute('d')).not.toBe(initial);
    await user.click(screen.getByRole('button', { name: 'Rotate globe east' }));
    expect(container.querySelector('.ai-land')?.getAttribute('d')).toBe(initial);
    expect(screen.getByRole('button', { name: 'Play globe animation' })).toBeDisabled();
    expect(screen.getByText('REDUCED MOTION · MANUAL ROTATION')).toBeInTheDocument();
  });

  it('allows visitors to pause and resume automatic motion', async () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);
    const user = userEvent.setup();
    render(<AiGlobe />);
    await user.click(screen.getByRole('button', { name: 'Pause globe animation' }));
    expect(screen.getByRole('button', { name: 'Play globe animation' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'Play globe animation' }));
    expect(screen.getByRole('button', { name: 'Pause globe animation' })).toBeEnabled();
  });
});
