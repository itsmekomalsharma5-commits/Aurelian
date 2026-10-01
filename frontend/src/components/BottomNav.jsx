import React from 'react';

export default function BottomNav({ activeTab, onSelectTab, wishlistCount = 0 }) {
  const tabs = [
    { id: 'atelier', label: 'Atelier', icon: 'diamond', fill: true },
    { id: 'collections', label: 'Collections', icon: 'auto_awesome_motion', fill: false },
    { id: 'wishlist', label: 'Wishlist', icon: 'favorite', fill: false, count: wishlistCount },
    { id: 'profile', label: 'Profile', icon: 'person', fill: false },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 rounded-t-full bg-surface-container-highest/90 dark:bg-surface-container-highest/90 backdrop-blur-2xl border-t border-secondary/10 shadow-[0_-10px_40px_rgba(46,7,63,0.6)] flex justify-around items-center pt-3 pb-4 px-6 max-w-lg left-1/2 -translate-x-1/2 md:max-w-md">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`relative flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isActive
                ? 'text-secondary dark:text-secondary-fixed scale-110'
                : 'text-on-surface-variant/60 dark:text-on-surface-variant/60 hover:text-secondary/80'
            }`}
            aria-label={tab.label}
          >
            <span
              className={`material-symbols-outlined ${
                isActive || tab.fill ? 'filled' : ''
              }`}
            >
              {tab.icon}
            </span>
            <span className="font-label-caps text-[10px] mt-1 tracking-wider">
              {tab.label}
            </span>
            {tab.count !== undefined && tab.count > 0 && (
              <span className="absolute -top-1 -right-2 bg-secondary text-on-secondary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
