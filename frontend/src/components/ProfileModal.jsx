import React from 'react';

export default function ProfileModal({ isOpen, onClose, user, onLogout, showToast }) {
  if (!isOpen || !user) return null;

  const handleLogout = async () => {
    onLogout();
    onClose();
    showToast?.('You have been securely logged out.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-container-lowest/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-surface-container-low border border-secondary/30 rounded-sm shadow-[0_20px_50px_rgba(46,7,63,0.9)] max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 text-on-surface">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-secondary p-1 transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-outline-variant/20">
          <div className="w-16 h-16 rounded-full bg-secondary/15 border-2 border-secondary flex items-center justify-center text-secondary font-display-lg-mobile text-[22px] font-bold">
            {user.firstName ? user.firstName[0] : 'A'}
          </div>
          <div>
            <div className="inline-block bg-secondary/20 text-secondary text-[10px] font-label-caps px-2.5 py-0.5 rounded-sm tracking-wider uppercase mb-1">
              {user.tier || 'Imperial Sovereign Member'}
            </div>
            <h3 className="font-headline-md text-white text-[22px]">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-on-surface-variant text-xs">{user.email}</p>
          </div>
        </div>

        <div className="py-6 space-y-6">
          {/* Vault Points & Boutique Card */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container p-4 rounded-sm border border-outline-variant/30">
              <span className="text-[10px] font-label-caps text-on-surface-variant tracking-wider uppercase block">
                VAULT PATRONAGE POINTS
              </span>
              <p className="font-headline-sm text-secondary text-[24px] mt-1">
                {(user.loyaltyPoints || 14850).toLocaleString()}
              </p>
              <p className="text-[10px] text-secondary-fixed/80 mt-0.5">Tier: Sovereign</p>
            </div>
            <div className="bg-surface-container p-4 rounded-sm border border-outline-variant/30">
              <span className="text-[10px] font-label-caps text-on-surface-variant tracking-wider uppercase block">
                PREFERRED SALON
              </span>
              <p className="font-body-md font-semibold text-white text-[13px] mt-1 truncate">
                {user.preferredBoutique || 'Paris — Place Vendôme'}
              </p>
              <p className="text-[10px] text-on-surface-variant/80 mt-0.5">VIP Private Suite</p>
            </div>
          </div>

          {/* Dedicated Liaison */}
          <div className="bg-surface-container/60 p-4 rounded-sm border border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                support_agent
              </span>
              <span className="font-label-caps text-secondary text-xs tracking-widest uppercase">
                Dedicated Maison Liaison
              </span>
            </div>
            <p className="font-body-md font-semibold text-white text-sm">
              Henri de Montmirail
            </p>
            <p className="text-on-surface-variant text-xs">
              Senior High Jewelry Concierge &bull; concierge@aurelian-maison.com
            </p>
            <p className="text-xs text-secondary mt-2 font-mono">
              Direct Telephone: +33 1 42 68 00 12
            </p>
          </div>

          {/* Privileges */}
          <div className="space-y-2">
            <h4 className="font-label-caps text-secondary text-xs tracking-widest uppercase">
              Your Sovereign Privileges
            </h4>
            <div className="space-y-1.5 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="diamond-bullet flex-shrink-0" />
                <span>Complimentary Armored Courier Delivery worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="diamond-bullet flex-shrink-0" />
                <span>Private viewing access 48h prior to public collection release</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="diamond-bullet flex-shrink-0" />
                <span>Annual ultrasonic gemological polishing & appraisal dossier</span>
              </div>
            </div>
          </div>

          {/* Recent Orders / Acquisitions */}
          {user.recentOrders && user.recentOrders.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-label-caps text-secondary text-xs tracking-widest uppercase">
                Recent Acquisitions
              </h4>
              <div className="space-y-2">
                {user.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 bg-surface-container rounded-sm border border-outline-variant/20 flex justify-between items-center text-xs"
                  >
                    <div>
                      <span className="font-mono text-white font-medium">{order.orderNumber}</span>
                      <p className="text-on-surface-variant text-[11px]">
                        {order.items?.length || 1} piece(s) &bull; ${order.pricing?.total?.toLocaleString()}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-secondary/15 text-secondary text-[10px] rounded-sm font-label-caps">
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-outline-variant/20 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-outline-variant/40 text-on-surface font-label-caps text-[11px] tracking-widest hover:border-secondary hover:text-secondary transition-colors"
          >
            RETURN TO SALON
          </button>
          <button
            onClick={handleLogout}
            className="py-3 px-4 bg-error-container/20 text-error hover:bg-error/20 border border-error/30 font-label-caps text-[11px] tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
