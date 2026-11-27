import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="page container">
      <p className="eyebrow">404 / OFF THE MAP</p>
      <h1>
        This page took
        <br />a different path.
      </h1>
      <Link className="button primary" to="/">
        Back to home
      </Link>
    </section>
  );
}
