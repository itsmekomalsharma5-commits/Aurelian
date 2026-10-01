import React, { useState } from 'react';
import api from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, showToast }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [boutiqueId, setBoutiqueId] = useState('paris-place-vendome');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setMode('login');
    setEmail('eleanor@aurelian-maison.com');
    setPassword('AurelianVIP2026!');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const data = await api.login(email, password);
        showToast?.(`Welcome back to the Maison, ${data.user.firstName}.`);
        onAuthSuccess?.(data.user);
        onClose();
      } else {
        if (!agreeTerms) {
          setErrorMsg('Please agree to the Maison Aurelian VIP privileges terms.');
          setIsLoading(false);
          return;
        }
        const data = await api.register({
          firstName,
          lastName,
          email,
          password,
          phone,
          boutiqueId,
        });
        showToast?.(`Welcome to the Maison Aurelian, ${data.user.firstName}!`);
        onAuthSuccess?.(data.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-container-lowest/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-surface-container-low border border-secondary/30 rounded-sm shadow-[0_20px_50px_rgba(46,7,63,0.9)] max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 text-on-surface">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-secondary p-1 transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-secondary/10 border border-secondary/40 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-secondary text-[26px]">
              diamond
            </span>
          </div>
          <span className="font-label-caps text-secondary text-[11px] tracking-widest uppercase">
            MAISON AURELIAN
          </span>
          <h3 className="font-headline-md text-white text-[24px] mt-1">
            {mode === 'login' ? 'Sign In to Your Salon' : 'Become a VIP Patron'}
          </h3>
          <p className="text-on-surface-variant text-xs mt-1">
            {mode === 'login'
              ? 'Access bespoke acquisitions, vault archives, and dedicated concierge.'
              : 'Receive 500 welcome vault points and private salon privileges.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-outline-variant/30 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 pb-3 text-xs font-label-caps tracking-widest transition-all ${
              mode === 'login'
                ? 'text-secondary border-b-2 border-secondary font-bold'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
            className={`flex-1 pb-3 text-xs font-label-caps tracking-widest transition-all ${
              mode === 'register'
                ? 'text-secondary border-b-2 border-secondary font-bold'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            JOIN THE MAISON
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-error-container/20 border border-error/30 text-error rounded-sm text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Demo Account Quick-Fill Pill (Visible on Login) */}
        {mode === 'login' && (
          <div className="mb-5 p-3 bg-secondary/10 border border-secondary/20 rounded-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-white">VIP Sovereign Demo</p>
              <p className="text-[10px] text-on-surface-variant">Eleanor Vance (Imperial Patron)</p>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-3 py-1 bg-secondary text-on-secondary font-label-caps text-[10px] rounded-sm hover:shadow-[0_0_10px_rgba(233,195,73,0.4)] transition-all cursor-pointer"
            >
              QUICK FILL
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                    First Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Lady Catherine"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Beaufort"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                  Direct Telephone
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-8822"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                  Preferred Flagship Salon
                </label>
                <select
                  value={boutiqueId}
                  onChange={(e) => setBoutiqueId(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                >
                  <option value="paris-place-vendome" className="bg-surface-container-high">
                    Paris — Place Vendôme
                  </option>
                  <option value="ny-fifth-avenue" className="bg-surface-container-high">
                    New York — Fifth Avenue
                  </option>
                  <option value="london-bond-street" className="bg-surface-container-high">
                    London — New Bond Street
                  </option>
                  <option value="geneva-rue-rhone" className="bg-surface-container-high">
                    Geneva — Rue du Rhône
                  </option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
              Email Address *
            </label>
            <input
              required
              type="email"
              placeholder="client@luxury.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-on-surface-variant font-label-caps">
                Password *
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => showToast?.('Please contact your dedicated concierge for password recovery.')}
                  className="text-[10px] text-secondary hover:underline"
                >
                  Forgot Key?
                </button>
              )}
            </div>
            <input
              required
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
            />
          </div>

          {mode === 'register' && (
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-secondary focus:ring-0 accent-[#e9c349]"
                />
                <span className="text-[11px] text-on-surface-variant leading-tight">
                  I wish to receive private collection previews and bespoke invitations under the Maison Aurelian VIP Charter.
                </span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary text-on-secondary py-3.5 font-label-caps text-label-caps tracking-widest hover:shadow-[0_0_20px_rgba(233,195,73,0.4)] active:scale-98 transition-all mt-6 disabled:opacity-50 cursor-pointer"
          >
            {isLoading
              ? 'ACCESSING VAULT...'
              : mode === 'login'
              ? 'SIGN IN TO SALON'
              : 'REGISTER AS VIP PATRON'}
          </button>
        </form>
      </div>
    </div>
  );
}
