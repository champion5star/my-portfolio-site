import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderRoute } from '../test/renderRoute';

describe('project discovery', () => {
  it('combines category and case-insensitive search, then resets both', async () => {
    const user = userEvent.setup();
    renderRoute('/projects');
    expect(screen.getByText('7 projects')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Computer vision' }));
    expect(screen.getByText('2 projects')).toBeInTheDocument();
    await user.type(screen.getByRole('textbox', { name: 'Search projects' }), 'yOlOv5');
    expect(screen.getByText('1 projects')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Seeing beyond the frame.' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Teaching machines to see.' }),
    ).not.toBeInTheDocument();
    await user.clear(screen.getByRole('textbox', { name: 'Search projects' }));
    await user.type(screen.getByRole('textbox', { name: 'Search projects' }), 'not-a-project');
    expect(screen.getByText('0 projects')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'No projects found.' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Reset filters' }));
    expect(screen.getByText('7 projects')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search projects' })).toHaveValue('');
    expect(screen.getByRole('button', { name: 'All projects' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('searches project descriptions as well as technology names', async () => {
    const user = userEvent.setup();
    renderRoute('/projects');
    await user.type(screen.getByRole('textbox', { name: 'Search projects' }), 'microphone');
    expect(screen.getByText('1 projects')).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /A sound\. A fingerprint\. A match\./ }));
    expect(
      screen.getByRole('heading', { level: 1, name: 'A sound. A fingerprint. A match.' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View source on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/champion5star/Music-Recognition-App',
    );
  });
});
