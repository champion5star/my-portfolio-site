import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ContactForm from './ContactForm';

describe('contact form', () => {
  it('blocks empty required fields before attempting delivery', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByRole('form', { name: 'Send Ronnie a message' })).toBeInvalid();
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('rejects a malformed visitor email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByRole('textbox', { name: /Your name/ }), 'Test visitor');
    await user.type(screen.getByRole('textbox', { name: /Your email/ }), 'invalid-email');
    await user.type(screen.getByRole('textbox', { name: /Subject/ }), 'An interesting project');
    await user.type(
      screen.getByRole('textbox', { name: /Your message/ }),
      'I would like to discuss an engineering project.',
    );
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByRole('textbox', { name: /Your email/ })).toBeInvalid();
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  });

  it('prepares the correct delivery payload and recovers when the visitor returns', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const form = screen.getByRole('form', { name: 'Send Ronnie a message' }) as HTMLFormElement;
    // Prevent native navigation to the provider. Tests must never send email.
    form.addEventListener('submit', (event) => event.preventDefault());
    await user.type(screen.getByRole('textbox', { name: /Your name/ }), 'Test visitor');
    await user.type(screen.getByRole('textbox', { name: /Your email/ }), 'visitor@example.com');
    await user.type(screen.getByRole('textbox', { name: /Subject/ }), 'Collaboration');
    await user.type(
      screen.getByRole('textbox', { name: /Your message/ }),
      'Let’s discuss a new engineering project.',
    );
    expect(form).toBeValid();
    expect(form).toHaveAttribute('action', 'https://formsubmit.co/ronygal78412@gmail.com');
    expect(form).toHaveAttribute('method', 'POST');
    const payload = new FormData(form);
    expect(Object.fromEntries(payload)).toMatchObject({
      name: 'Test visitor',
      email: 'visitor@example.com',
      subject: 'Collaboration',
      message: 'Let’s discuss a new engineering project.',
      _honey: '',
    });
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByRole('button', { name: 'Opening delivery…' })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Opening FormSubmit to complete message delivery.',
    );
    fireEvent(window, new Event('pageshow'));
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
    expect(screen.getByRole('textbox', { name: /Your message/ })).toHaveValue(
      'Let’s discuss a new engineering project.',
    );
  });
});
