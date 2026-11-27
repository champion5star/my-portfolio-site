import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { email } from '../../data/site';

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  // Reset the button when visitors return from the delivery provider via Back.
  useEffect(() => {
    const reset = () => setSubmitting(false);
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);

  return (
    <form
      className="contact-form"
      action={`https://formsubmit.co/${email}`}
      method="POST"
      onSubmit={() => setSubmitting(true)}
      aria-label="Send Ronnie a message"
    >
      <input type="hidden" name="_subject" value="New message from Ronnie’s portfolio" />
      <input type="hidden" name="_template" value="table" />
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name">
            Your name <span>(required)</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="How should I call you?"
            required
            maxLength={100}
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">
            Your email <span>(required)</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Where can I reply?"
            required
            maxLength={254}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contact-subject">
          Subject <span>(required)</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          placeholder="What would you like to talk about?"
          required
          maxLength={200}
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">
          Your message <span>(required)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell me a little about your idea, project, or opportunity…"
          rows={6}
          required
          minLength={10}
          maxLength={10000}
        />
      </div>

      <div className="form-submit-row">
        <button className="button primary" type="submit" disabled={submitting}>
          {submitting ? 'Opening delivery…' : 'Send message'} <Send size={17} />
        </button>
        <p className="form-note">
          Your message is sent to Ronnie through{' '}
          <a href="https://formsubmit.co/" target="_blank" rel="noreferrer">
            FormSubmit
          </a>
          . You’ll complete a spam check and see confirmation on their site.
        </p>
      </div>
      <p className="sr-only" role="status">
        {submitting ? 'Opening FormSubmit to complete message delivery.' : ''}
      </p>
    </form>
  );
}
