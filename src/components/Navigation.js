'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, User, X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { PRODUCTS } from '@/lib/products';

export default function Navigation({ onSelectCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, addToCart, decrementCart, removeFromCart, getCartCount } = useCart();

  const categories = [
    { title: "Women", sub: ["Tops", "Dresses", "Ethnic", "Bottomwear", "Active", "Loungewear", "Winter", "Maternity", "Plus Size"] },
    { title: "Men", sub: ["T-Shirts", "Jeans", "Ethnic", "Active", "Winter", "Formal", "Plus Size"] },
    { title: "Kids", sub: ["Boys", "Girls", "Baby", "School", "Party"] },
    { title: "Unisex", sub: ["Oversized", "Hoodies", "Streetwear"] },
    { title: "Special", sub: ["Sustainable", "Designer", "Vintage"] }
  ];

  // Callback to handle menu clicks and bubble up to page component
  const handleCategoryClick = (catName) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    setMenuOpen(false); // Auto close the menu drawer when a category is clicked
  };

  return (
    <nav className="store-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Menu 
          style={{ cursor: 'pointer', color: 'var(--maroon)' }} 
          onClick={() => setMenuOpen(!menuOpen)} 
        />
        <a href="/" className="nav-brand brand-font">UrbanDrip</a>
      </div>

      <div className="nav-links" style={{ display: menuOpen ? 'none' : 'flex' }}>
        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleCategoryClick("New"); }}>New Arrivals</a>
        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleCategoryClick("Trending"); }}>Best Sellers</a>
        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleCategoryClick("Sustainable"); }}>Collections</a>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Search 
          style={{ cursor: 'pointer', color: 'var(--text-main)' }} 
          size={20} 
          onClick={() => setSearchOpen(true)}
        />
        <User style={{ cursor: 'pointer', color: 'var(--text-main)' }} size={20} />
        <div style={{ position: 'relative' }} onClick={() => setCartOpen(true)}>
          <ShoppingBag style={{ cursor: 'pointer', color: 'var(--maroon)' }} size={20} />
          {getCartCount() > 0 && (
            <span style={{ 
              position: 'absolute', top: '-8px', right: '-8px', 
              background: 'var(--coral)', color: 'white', 
              borderRadius: '50%', width: '18px', height: '18px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '0.7rem', fontWeight: 800 
            }}>
              {getCartCount()}
            </span>
          )}
        </div>
      </div>

      {menuOpen && (
        <div style={{ 
          position: 'absolute', top: '100%', left: 0, width: '100vw', 
          background: 'var(--bg-warm)', borderBottom: '1px solid var(--border)',
          padding: '2rem 3rem', display: 'flex', gap: '4rem', zIndex: 99
        }}>
          {categories.map((cat) => (
            <div key={cat.title}>
              <h4 
                style={{ color: 'var(--burgundy)', marginBottom: '1rem', textTransform: 'uppercase', cursor: 'pointer' }}
                onClick={() => handleCategoryClick(cat.title)}
              >
                {cat.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {cat.sub.map(s => (
                  <li key={s}>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handleCategoryClick(s); }}
                      style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <>
          <div 
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1000 }}
            onClick={() => setCartOpen(false)}
          />
          <div style={{ 
            position: 'fixed', top: 0, right: 0, width: '400px', height: '100vh', 
            background: 'var(--bg-warm)', zIndex: 1001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
            padding: '2rem', display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 className="brand-font" style={{ color: 'var(--bg-dark-warm)', fontSize: '2rem' }}>Your Bag</h2>
              <X style={{ cursor: 'pointer', color: 'var(--text-main)' }} onClick={() => setCartOpen(false)} />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--maroon)', marginTop: '2rem' }}>Your bag is totally empty!</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ width: '60px', height: '80px', background: item.color, borderRadius: '8px' }}></div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--bg-dark-warm)', marginBottom: '0.2rem' }}>{item.name}</h4>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--burgundy)' }}>{item.price}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        
                        {/* Quantity Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--surface)', padding: '0.3rem', borderRadius: '8px' }}>
                          <Minus size={14} style={{ cursor: 'pointer', color: 'var(--maroon)' }} onClick={() => decrementCart(item.id)} />
                          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.quantity}</span>
                          <Plus size={14} style={{ cursor: 'pointer', color: 'var(--bg-dark-warm)' }} onClick={() => addToCart(item, 1)} />
                        </div>
                        
                        <Trash2 size={16} style={{ cursor: 'pointer', color: 'var(--text-main)' }} onClick={() => removeFromCart(item.id)} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <button style={{ 
                  width: '100%', padding: '1.2rem', background: 'var(--bg-dark-warm)', 
                  color: 'white', border: 'none', borderRadius: '30px', 
                  fontFamily: 'inherit', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' 
                }}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(255,249,242,0.95)', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10rem' }}>
          <X 
            size={32} 
            style={{ position: 'absolute', top: '3rem', right: '3rem', cursor: 'pointer', color: 'var(--maroon)' }} 
            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
          />
          <h2 className="brand-font" style={{ color: 'var(--bg-dark-warm)', fontSize: '3rem', marginBottom: '2rem' }}>Discover Drip</h2>
          <input 
            autoFocus
            type="text" 
            placeholder="Search for hoodies, dresses, or collections..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '50%', maxWidth: '600px', padding: '1.5rem 2rem', fontSize: '1.2rem', 
              border: '2px solid var(--border)', borderRadius: '40px', background: 'white',
              fontFamily: 'inherit', outline: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
            }}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '4rem', maxWidth: '1000px', overflowY: 'auto', padding: '0 2rem' }}>
            {searchQuery.trim().length > 0 && PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
              <Link 
                key={product.id} 
                href={`/product/${product.id}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', width: '350px', cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-5px)' } }}>
                  <div style={{ width: '80px', height: '100px', background: product.color, borderRadius: '10px' }}></div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--coral)', textTransform: 'uppercase', fontWeight: 600 }}>{product.category}</span>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--bg-dark-warm)', margin: '0.3rem 0' }}>{product.name}</h4>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--burgundy)' }}>{product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
            {searchQuery.trim().length > 0 && PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
              <p style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>No products found matching "{searchQuery}".</p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
