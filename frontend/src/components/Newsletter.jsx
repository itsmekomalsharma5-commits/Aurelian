import React, { useState } from 'react';

export default function Newsletter({ onSubscribe }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    onSubscribe?.(email);
  };

  return (
    <section className="mt-section-gap px-margin-mobile max-w-container-max mx-auto">
      <div className="bg-surface-container py-16 px-6 sm:px-12 rounded-sm text-center border border-outline-variant/20 shadow-[0_4px_24px_rgba(46,7,63,0.3)]">
        <h3 className="font-headline-md text-headline-md mb-4">
          Join the Inner Circle
        </h3>
        <p className="text-on-surface-variant font-body-md max-w-md mx-auto mb-8">
          Be the first to discover limited collections and private trunk shows.
        </p>

        {subscribed ? (
          <div className="p-6 bg-surface-container-high/60 border border-secondary/30 rounded-sm max-w-md mx-auto">
            <span className="material-symbols-outlined text-secondary filled text-[32px] mb-2 block mx-auto">
              mark_email_read
            </span>
            <p className="font-headline-sm text-[18px] text-white">
              Welcome to the Inner Circle
            </p>
            <p className="text-on-surface-variant text-[13px] mt-1">
              An invitation with exclusive privileges has been dispatched to {email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant text-center focus:outline-none focus:ring-0 focus:border-secondary transition-colors font-body-md py-3 placeholder:text-on-surface-variant/40 text-on-surface"
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email Address for newsletter"
            />
            <button
              type="submit"
              className="w-full bg-secondary text-on-secondary py-4 font-label-caps text-label-caps tracking-widest mt-4 hover:shadow-[0_0_20px_rgba(233,195,73,0.4)] active:scale-98 transition-all duration-300 rounded-sm cursor-pointer"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
