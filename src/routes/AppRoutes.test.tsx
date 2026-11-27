import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderRoute } from '../test/renderRoute';

describe('portfolio routes', () => {
  it('loads the interactive Earth on the home page', async () => {
    renderRoute('/');
    expect(
      await screen.findByRole('group', {
        name: 'Interactive Earth showing illustrative AI connections',
      }),
    ).toBeInTheDocument();
  });
  it.each([
    ['/', /Human ideas\. Intelligent execution\./, 'AI & Full Stack Engineer'],
    ['/about', /A builder’s mind\. A curious spirit\./, 'About'],
    ['/projects', /Built with intent\. Made to work\./, 'Projects'],
    ['/experience', /Complex problems\. Practical impact\./, 'Experience'],
    ['/contact', /Have something in mind\?/, 'Contact'],
  ])('renders %s within the shared layout', (path, heading, title) => {
    renderRoute(path as string);
    expect(screen.getByRole('heading', { level: 1, name: heading as RegExp })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByText('Thoughtfully built. Always evolving.')).toBeInTheDocument();
    expect(document.title).toBe(`${title} — Ronnie Galindo`);
  });

  it.each([
    ['object-detection', 'Seeing beyond the frame.', 'Object_detection_tracking'],
    ['music-recognition', 'A sound. A fingerprint. A match.', 'Music-Recognition-App'],
    ['enotifier', 'The right message. Delivered.', 'eNotifier'],
    ['image-classification', 'Teaching machines to see.', 'classification_by_image'],
    ['cyber-safely', 'A safer space to learn.', 'cyber_safely_frontend'],
    ['system-flow', 'From a graph to a working system.', 'system_flow_designer'],
    ['soccer-data', 'Better data. A clearer game.', 'SoccerData'],
  ])('opens %s with the corresponding source repository', (slug, title, repository) => {
    renderRoute(`/projects/${slug}`);
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View source on GitHub' })).toHaveAttribute(
      'href',
      `https://github.com/champion5star/${repository}`,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('recovers from an unknown page through the home link', async () => {
    const user = userEvent.setup();
    renderRoute('/unknown');
    expect(screen.getByRole('heading', { level: 1, name: /This page took/ })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Back to home' }));
    expect(screen.getByRole('heading', { level: 1, name: /Human ideas/ })).toBeInTheDocument();
  });

  it('recovers from an unknown project through the project list', async () => {
    const user = userEvent.setup();
    renderRoute('/projects/unknown');
    expect(screen.getByRole('heading', { name: 'Project not found.' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Browse projects' }));
    expect(
      screen.getByRole('heading', { level: 1, name: /Built with intent/ }),
    ).toBeInTheDocument();
  });

  it('closes the mobile menu after navigation and updates the active link', async () => {
    const user = userEvent.setup();
    renderRoute();
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    await user.click(within(navigation).getByRole('link', { name: 'Projects' }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(within(navigation).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(within(navigation).getByRole('link', { name: 'Home' })).not.toHaveAttribute(
      'aria-current',
    );
    expect(document.title).toBe('Projects — Ronnie Galindo');
  });

  it('lets keyboard users skip navigation without changing the route', async () => {
    const user = userEvent.setup();
    renderRoute('/contact');
    await user.click(screen.getByRole('link', { name: 'Skip to content' }));
    expect(screen.getByRole('main')).toHaveFocus();
    expect(screen.getByRole('heading', { level: 1, name: /Have something/ })).toBeInTheDocument();
  });

  it('keeps the resume download under the deployment base path', () => {
    renderRoute('/contact');
    const download = screen.getByRole('link', { name: /Resume The experience/ });
    expect(download).toHaveAttribute(
      'href',
      `${import.meta.env.BASE_URL}ronnie-galindo-resume.pdf`,
    );
    expect(download).toHaveAttribute('download');
  });
});
