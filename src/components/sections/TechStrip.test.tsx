import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import TechStrip from './TechStrip';

describe('scrolling skills band', () => {
  it('includes the broader resume skillset without exposing the repeated animation copy to screen readers', () => {
    render(<TechStrip />);
    const band = screen.getByRole('region', { name: 'Technical skills' });
    expect(within(band).getAllByRole('list')).toHaveLength(1);
    const skills = within(within(band).getByRole('list'));
    for (const skill of [
      'Python',
      'React',
      'TypeScript',
      'TensorFlow',
      'Angular',
      'MLflow',
      'OAuth',
      'Data Pipelines',
    ]) {
      expect(skills.getByText(skill)).toBeInTheDocument();
    }
    const copies = within(band).getAllByRole('list', { hidden: true });
    expect(copies).toHaveLength(2);
    expect(copies[1]).toHaveAttribute('aria-hidden', 'true');
  });

  it('lets visitors pause and resume the movement', async () => {
    const user = userEvent.setup();
    render(<TechStrip />);
    await user.click(screen.getByRole('button', { name: 'Pause skills animation' }));
    expect(screen.getByRole('region', { name: 'Technical skills' })).toHaveAttribute(
      'data-paused',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Play skills animation' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await user.click(screen.getByRole('button', { name: 'Play skills animation' }));
    expect(screen.getByRole('region', { name: 'Technical skills' })).toHaveAttribute(
      'data-paused',
      'false',
    );
  });
});
