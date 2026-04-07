'use client';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ThreeBackground from '@/components/ThreeBackground';

export default function Store() {
  const [activeCategory, setActiveCategory] = useState("All");

  const dummyProducts = [
    { id: 1, name: "Sunset Maxi Dress", price: "$89", category: "Women / Dresses", color: "var(--coral)" },
    { id: 2, name: "Vintage Maroon Hoodie", price: "$65", category: "Unisex / Vintage", color: "var(--maroon)" },
    { id: 3, name: "Classic Amber Tee", price: "$35", category: "Men / T-Shirts", color: "var(--amber)" },
    { id: 4, name: "Burgundy Silk Saree", price: "$120", category: "Women / Traditional", color: "var(--burgundy)" },
    { id: 5, name: "Warm Gym Co-ords", price: "$55", category: "Women / Activewear", color: "var(--coral)" },
    { id: 6, name: "Desert Sand Overcoat", price: "$140", category: "Men / Winterwear", color: "var(--bg-dark-warm)" },
    { id: 7, name: "Streetwear Cargo Palazzos", price: "$75", category: "Women / Bottomwear", color: "var(--maroon)" },
    { id: 8, name: "Eco-Linen Blazer", price: "$110", category: "Sustainable", color: "var(--amber)" },
    { id: 9, name: "Coral Summer Top", price: "$45", category: "Women / Tops", color: "var(--coral)" },
    { id: 10, name: "Burgundy Men's Blazer", price: "$180", category: "Men / Formal", color: "var(--burgundy)" },
    { id: 11, name: "Kids Amber Tracksuit", price: "$50", category: "Kids / Boys", color: "var(--amber)" }
  ];

  const filteredProducts = activeCategory === "All" 
    ? dummyProducts 
    : dummyProducts.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <Navigation onSelectCategory={(cat) => setActiveCategory(cat)} />
      
      <section className="store-hero">
        <div className="hero-3d">
          {/* Re-using the 3D canvas but covering the hero section */}
          <ThreeBackground />
        </div>
        <div className="hero-content">
          <h1 className="brand-font">Wear Your Story</h1>
          <p>Curated threads. Unspoken expressions.</p>
          <button 
            className="btn-primary" 
            style={{ width: 'auto', padding: '1rem 3rem', marginTop: '2rem', borderRadius: '30px' }}
            onClick={() => {
              document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
              setActiveCategory('All');
            }}
          >
            Shop New Arrivals
          </button>
        </div>
      </section>

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
              <div key={product.id} className="product-card">
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
