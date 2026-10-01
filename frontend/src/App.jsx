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
import api from './services/api';
import {
  CATEGORIES as FALLBACK_CATEGORIES,
  NEW_ARRIVALS as FALLBACK_NEW_ARRIVALS,
  BEST_SELLERS as FALLBACK_BEST_SELLERS,
} from './data/products';

export default function App() {
  const [cart, setCart] = useState([
    {
      id: 'amethyst-empress-bracelet',
      name: 'Amethyst Empress Bracelet',
      price: 2450,
      quantity: 1,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCXwTIdyOQUnvoR4dB86w_yZmnJnPOsXzVy2joNf_glxxI29C0oy6z-HaNHL7h3audY9HFQbBjqCH6Y4P8bYI7FX7jBZk9AIjiYpe_QX1eb2tM4wX1uF5WOvtT198LRKCPIquyzpQux1wdYZwOrVfsceNH1XB6_8lprnNmadGEi4HYYsIvB_On19cg5HygJtV7UkvSvlu1wSeBhNcvEyrgPzl5x1emPKx6fkYr1zT1Onpbjg9OmxcJW',
    },
  ]);
  const [wishlist, setWishlist] = useState(['violet-sapphire-chandelier']);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('atelier');
  const [toastMessage, setToastMessage] = useState(null);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');

  // Backend data state
  const [newArrivals, setNewArrivals] = useState(FALLBACK_NEW_ARRIVALS);
  const [bestSellers, setBestSellers] = useState(FALLBACK_BEST_SELLERS);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Fetch initial data from backend API
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
        console.warn('Backend connection falling back to local dataset:', err);
      }
    }
    loadData();
  }, []);

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
    showToast(`Order ${order.orderNumber} successfully registered!`);
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

  // Intersection Observer for silky fade-in transitions
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

    const sections = document.querySelectorAll('main > section');
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
        cartCount={totalCartCount}
      />

      {/* Side Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCategory={() => scrollToSection('categories')}
        onBookConsultation={() => setIsConsultationOpen(true)}
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
      />

      {/* VIP Salon Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        showToast={showToast}
      />

      {/* Toast Alert */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Main Content Sections */}
      <main className="pt-20 pb-28">
        <Hero onShopNow={() => scrollToSection('new-arrivals')} />
        <Categories
          items={categories}
          onSelectCategory={() => scrollToSection('best-sellers')}
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
          if (tab === 'wishlist') showToast(`You have ${wishlist.length} items saved.`);
          if (tab === 'atelier') scrollToSection('collection');
          if (tab === 'profile') setIsMenuOpen(true);
        }}
        wishlistCount={wishlist.length}
      />
    </div>
  );
}
