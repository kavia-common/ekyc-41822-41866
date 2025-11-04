import React from 'react';

// PUBLIC_INTERFACE
export default function RetroCard({ title, subtitle, children, actions }) {
  /** Retro-styled card with header and optional actions. */
  return (
    <section className="retro-card" aria-live="polite">
      {title && <h2 className="retro-title">{title}</h2>}
      {subtitle && <p className="retro-subtitle">{subtitle}</p>}
      <div>{children}</div>
      {actions && <div className="mt-2">{actions}</div>}
    </section>
  );
}
