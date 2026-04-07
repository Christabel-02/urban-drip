'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ThreeBackground from '@/components/ThreeBackground';
import { PRODUCTS } from '@/lib/products';

export default function Store() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayText, setDisplayText] = useState('');
  const fullText = "Wear Your Story";

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <Navigation onSelectCategory={(cat) => setActiveCategory(cat)} />
      
      {activeCategory === "All" && (
        <section className="store-hero">
          <div className="hero-3d">
            {/* Re-using the 3D canvas but covering the hero section */}
            <ThreeBackground />
          </div>
          <div className="hero-content">
            <style>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
            `}</style>
            <h1 className="brand-font">
              {displayText}
              <span style={{ borderRight: '2px solid var(--text-main)', animation: 'blink 1s step-end infinite' }}></span>
            </h1>
            <p>Curated threads. Unspoken expressions.</p>
            <button 
              className="btn-primary" 
              style={{ width: 'auto', padding: '1rem 3rem', marginTop: '2rem', borderRadius: '30px' }}
              onClick={() => {
                document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Shop New Arrivals
            </button>
          </div>
        </section>
      )}

      <main className="container" id="catalog">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="brand-font" style={{ fontSize: '2.5rem', color: 'var(--bg-dark-warm)' }}>
            {activeCategory === "All" ? "Trending Now" : activeCategory + " Collection"}
          </h2>
          <div className="category-filters" style={{ margin: 0, background: 'none' }}>
            {["All", "Women", "Men", "Sustainable", "Kids", "Unisex"].map(cat => (
              <span 
                key={cat}
                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--bg-dark-warm)', fontSize: '1.2rem' }}>
            No products found matching <strong>"{activeCategory}"</strong> just yet!
          </p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <Link href={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-card">
                  <div className="product-image">
                    {/* Aesthetic placeholder mimicking clothing */}
                    <div style={{ 
                      width: '60%', height: '70%', 
                      background: product.color, 
                      borderRadius: '10px 10px 40px 10px',
                      boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.2)'
                    }}></div>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-title">{product.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <span className="product-price">{product.price}</span>
                      <div className="color-swatches">
                        <div className="swatch" style={{ background: product.color }}></div>
                        <div className="swatch" style={{ background: 'var(--bg-dark-warm)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
