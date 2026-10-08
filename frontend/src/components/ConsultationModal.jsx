import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function ConsultationModal({ isOpen, onClose, showToast, currentUser }) {
  const [boutiques, setBoutiques] = useState([
    {
      id: 'paris-place-vendome',
      name: 'Aurelian Maison Place Vendôme',
      city: 'Paris',
    },
    {
      id: 'ny-fifth-avenue',
      name: 'Aurelian Salon Fifth Avenue',
      city: 'New York',
    },
    {
      id: 'london-bond-street',
      name: 'Aurelian Mayfair',
      city: 'London',
    },
    {
      id: 'geneva-rue-rhone',
      name: 'Aurelian Rue du Rhône',
      city: 'Geneva',
    },
  ]);

  const [formData, setFormData] = useState({
    clientName: currentUser ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim() : '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    boutiqueId: 'paris-place-vendome',
    date: '',
    timeSlot: '14:00 - 15:30',
    interest: 'Bespoke High Jewelry Commission',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        clientName: prev.clientName || `${currentUser.firstName} ${currentUser.lastName || ''}`.trim(),
        email: prev.email || currentUser.email || '',
        phone: prev.phone || currentUser.phone || '',
      }));
    }
  }, [currentUser, isOpen]);

  useEffect(() => {
    if (isOpen) {
      api.getBoutiques().then((data) => {
        if (data && data.length > 0) setBoutiques(data);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email) {
      showToast?.('Please enter your name and email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.bookConsultation(formData);
      if (res.success && res.data) {
        setConfirmation(res.data);
        showToast?.('Salon consultation booked successfully.');
      }
    } catch (err) {
      showToast?.(err.message || 'Unable to schedule appointment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-container-lowest/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-surface-container-low border border-secondary/30 rounded-sm shadow-[0_20px_50px_rgba(46,7,63,0.9)] max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 text-on-surface">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-secondary p-1 transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[26px]">close</span>
        </button>

        {confirmation ? (
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full bg-secondary/10 border border-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[32px] filled">
                event_available
              </span>
            </div>
            <div>
              <p className="font-label-caps text-secondary text-[11px] tracking-widest uppercase">
                SALON APPOINTMENT CONFIRMED
              </p>
              <h3 className="font-headline-md text-white text-[24px] mt-2">
                We Await Your Visit, {confirmation.clientName}
              </h3>
              <p className="text-on-surface-variant text-sm mt-2">
                Your private session at <span className="text-white font-medium">{confirmation.boutiqueName}</span> is reserved for {confirmation.date} at {confirmation.timeSlot}.
              </p>
            </div>
            <div className="bg-surface-container p-4 rounded-sm border border-outline-variant/30 text-xs text-on-surface-variant space-y-2 text-left">
              <div className="flex justify-between">
                <span>Appointment Ref</span>
                <span className="text-secondary font-mono font-semibold">{confirmation.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Subject</span>
                <span className="text-white">{confirmation.interest}</span>
              </div>
              <div className="flex justify-between">
                <span>Liaison</span>
                <span className="text-white">Aurelian Private Client Concierge</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full bg-secondary text-on-secondary py-3.5 font-label-caps text-label-caps tracking-widest hover:shadow-[0_0_15px_rgba(233,195,73,0.4)] transition-all"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-outline-variant/20 pb-4 mb-6">
              <span className="font-label-caps text-secondary text-[11px] tracking-widest uppercase">
                PRIVATE ATELIER
              </span>
              <h3 className="font-headline-md text-white text-[24px]">
                Book Salon Consultation
              </h3>
              <p className="text-on-surface-variant text-xs mt-1">
                Receive one-on-one guidance from our master gemologists in an intimate, discreet salon setting.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                  Select Flagship Salon *
                </label>
                <select
                  value={formData.boutiqueId}
                  onChange={(e) => setFormData({ ...formData, boutiqueId: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                >
                  {boutiques.map((b) => (
                    <option key={b.id} value={b.id} className="bg-surface-container-high text-white">
                      {b.city} — {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                    Your Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Countess Caroline"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="caroline@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                    Direct Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+33 1 42 68 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                  Area of Interest
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                >
                  <option value="Bespoke High Jewelry Commission" className="bg-surface-container-high">
                    Bespoke High Jewelry Commission
                  </option>
                  <option value="Rare Diamond & Gemstone Viewing" className="bg-surface-container-high">
                    Rare Diamond & Gemstone Viewing
                  </option>
                  <option value="Haute Horlogerie Timepiece Acquisition" className="bg-surface-container-high">
                    Haute Horlogerie Timepiece Acquisition
                  </option>
                  <option value="Heritage Restoration & Servicing" className="bg-surface-container-high">
                    Heritage Restoration & Servicing
                  </option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-on-secondary py-3.5 font-label-caps text-label-caps tracking-widest hover:shadow-[0_0_20px_rgba(233,195,73,0.4)] active:scale-98 transition-all mt-4 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'CONFIRMING WITH CONCIERGE...' : 'CONFIRM PRIVATE RESERVATION'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
