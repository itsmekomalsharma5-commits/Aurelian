import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MenuDrawer from './components/MenuDrawer';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import Categories from './components/Categories';
import NewArrivals from './components/NewArrivals';
import FeaturedCollection from './components/FeaturedCollection';
import BestSellers from './components/BestSellers';
import PromoBanner from './components/PromoBanner';
import Testimonials from './components/Testimonials';
import InstagramGallery from './components/InstagramGallery';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import CheckoutModal from './components/CheckoutModal';
import ConsultationModal from './components/ConsultationModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import api from './services/api';
import {
  CATEGORIES as FALLBACK_CATEGORIES,
  NEW_ARRIVALS as FALLBACK_NEW_ARRIVALS,
  BEST_SELLERS as FALLBACK_BEST_SELLERS,
} from './data/products';

const CART_STORAGE_KEY = 'aurelian_cart';
const WISHLIST_STORAGE_KEY = 'aurelian_wishlist';

export default function App() {
  // Cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'amethyst-empress-bracelet',
        name: 'Amethyst Empress Bracelet',
        price: 2450,
        quantity: 1,
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCXwTIdyOQUnvoR4dB86w_yZmnJnPOsXzVy2joNf_glxxI29C0oy6z-HaNHL7h3audY9HFQbBjqCH6Y4P8bYI7FX7jBZk9AIjiYpe_QX1eb2tM4wX1uF5WOvtT198LRKCPIquyzpQux1wdYZwOrVfsceNH1XB6_8lprnNmadGEi4HYYsIvB_On19cg5HygJtV7UkvSvlu1wSeBhNcvEyrgPzl5x1emPKx6fkYr1zT1Onpbjg9OmxcJW',
      },
    ];
  });

  // Wishlist state with localStorage persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['violet-sapphire-chandelier'];
  });

  // UI Modal & Drawer States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // VIP User State
  const [currentUser, setCurrentUser] = useState(null);

  const [activeTab, setActiveTab] = useState('atelier');
  const [toastMessage, setToastMessage] = useState(null);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');

  // Backend product & category data state
  const [newArrivals, setNewArrivals] = useState(FALLBACK_NEW_ARRIVALS);
  const [bestSellers, setBestSellers] = useState(FALLBACK_BEST_SELLERS);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Restore VIP User session if token exists
  useEffect(() => {
    async function restoreSession() {
      if (api.getToken()) {
        try {
          const user = await api.getCurrentUser();
          if (user) {
            setCurrentUser(user);
          }
        } catch (err) {
          console.warn('Unable to restore session:', err);
        }
      }
    }
    restoreSession();
  }, []);

  // Fetch initial catalog data from backend API
  useEffect(() => {
    async function loadData() {
      try {
        const [arrivals, best, cats] = await Promise.all([
          api.getProducts({ type: 'new-arrivals' }),
          api.getProducts({ type: 'best-sellers' }),
          api.getCategories(),
        ]);
        if (arrivals && arrivals.length > 0) setNewArrivals(arrivals);
        if (best && best.length > 0) setBestSellers(best);
        if (cats && cats.length > 0) setCategories(cats);
      } catch (err) {
        console.warn('Backend catalog connection falling back to local dataset:', err);
      }
    }
    loadData();
  }, []);

  // Auth Handlers
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
  };

  const handleLogout = async () => {
    await api.logout();
    setCurrentUser(null);
    setIsProfileOpen(false);
    showToast('You have been securely signed out of the Maison Aurelian portal.');
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    showToast(`Added ${product.name} to your shopping bag.`);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order) => {
    setCart([]);
    showToast(`Acquisition ${order.orderNumber} successfully registered!`);
  };

  // Wishlist operations
  const handleToggleWishlist = (id) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from your personal Wishlist.');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your personal Wishlist.');
        return [...prev, id];
      }
    });
  };

  const handleRedeemOffer = async () => {
    try {
      const res = await api.validatePromo('AURELIAN15');
      if (res.valid) {
        setAppliedPromoCode('AURELIAN15');
        showToast('Code AURELIAN15 validated! 15% discount has been activated.');
      } else {
        showToast(res.message || 'Code could not be applied.');
      }
    } catch {
      setAppliedPromoCode('AURELIAN15');
      showToast('Code AURELIAN15 applied! 15% discount has been activated.');
    }
  };

  const handleSubscribe = async (email) => {
    try {
      const res = await api.subscribeNewsletter(email);
      showToast(res.message || `Private invitation dispatched to ${email}.`);
    } catch (err) {
      showToast(err.message || `Private invitation dispatched to ${email}.`);
    }
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = async (categorySlug) => {
    scrollToSection('best-sellers');
    if (!categorySlug || categorySlug === 'all') {
      try {
        const best = await api.getProducts({ type: 'best-sellers' });
        if (best && best.length > 0) setBestSellers(best);
      } catch {
        setBestSellers(FALLBACK_BEST_SELLERS);
      }
      return;
    }

    try {
      const filtered = await api.getProducts({ category: categorySlug });
      if (filtered && filtered.length > 0) {
        setBestSellers(filtered);
        showToast(`Viewing ${filtered.length} piece${filtered.length === 1 ? '' : 's'} in ${categorySlug.toUpperCase()}.`);
      }
    } catch {
      // Keep existing list on network issue
    }
  };

  // Intersection Observer for silky fade-in transitions on below-the-fold sections
  useEffect(() => {
    const observerOptions = {
      threshold: 0.08,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('main > section:not(:first-child)');
    sections.forEach((section) => {
      section.classList.add(
        'transition-all',
        'duration-1000',
        'ease-[cubic-bezier(0.4,0,0.2,1)]',
        'opacity-0',
        'translate-y-10'
      );
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md selection:bg-secondary/30 relative">
      {/* Top Navbar */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        currentUser={currentUser}
        cartCount={totalCartCount}
      />

      {/* Side Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCategory={handleCategorySelect}
        onBookConsultation={() => setIsConsultationOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        currentUser={currentUser}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* VIP Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        appliedPromoCode={appliedPromoCode}
        onOrderSuccess={handleOrderSuccess}
        showToast={showToast}
        currentUser={currentUser}
      />

      {/* VIP Salon Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        showToast={showToast}
        currentUser={currentUser}
      />

      {/* VIP Auth Modal (Sign In / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        showToast={showToast}
      />

      {/* VIP Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
        showToast={showToast}
      />

      {/* Toast Alert */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Main Content Sections */}
      <main className="pt-20 pb-28">
        <Hero onShopNow={() => scrollToSection('new-arrivals')} />
        <Categories
          items={categories}
          onSelectCategory={handleCategorySelect}
        />
        <NewArrivals
          items={newArrivals}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />
        <FeaturedCollection onDiscoverMore={() => scrollToSection('best-sellers')} />
        <BestSellers
          items={bestSellers}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />
        <PromoBanner onRedeemOffer={handleRedeemOffer} />
        <Testimonials />
        <InstagramGallery />
        <Newsletter onSubscribe={handleSubscribe} />
        <Footer />
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'collections') scrollToSection('categories');
          if (tab === 'wishlist') showToast(`You have ${wishlist.length} item${wishlist.length === 1 ? '' : 's'} saved to your Wishlist.`);
          if (tab === 'atelier') scrollToSection('collection');
          if (tab === 'profile') {
            if (currentUser) {
              setIsProfileOpen(true);
            } else {
              setIsAuthOpen(true);
            }
          }
        }}
        wishlistCount={wishlist.length}
      />
    </div>
  );
}
