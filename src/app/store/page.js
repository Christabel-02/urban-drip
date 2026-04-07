'use client';
import Navigation from '@/components/Navigation';
import ThreeBackground from '@/components/ThreeBackground';

export default function Store() {
  const dummyProducts = [
    { id: 1, name: "Sunset Maxi Dress", price: "$89", category: "Women / Dresses", color: "var(--coral)" },
    { id: 2, name: "Vintage Maroon Hoodie", price: "$65", category: "Unisex / Vintage", color: "var(--maroon)" },
    { id: 3, name: "Classic Amber Tee", price: "$35", category: "Men / T-Shirts", color: "var(--amber)" },
    { id: 4, name: "Burgundy Silk Saree", price: "$120", category: "Traditional", color: "var(--burgundy)" },
    { id: 5, name: "Warm Gym Co-ords", price: "$55", category: "Activewear", color: "var(--coral)" },
    { id: 6, name: "Desert Sand Overcoat", price: "$140", category: "Winterwear", color: "var(--bg-dark-warm)" },
    { id: 7, name: "Streetwear Cargo Palazzos", price: "$75", category: "Women / Bottomwear", color: "var(--maroon)" },
    { id: 8, name: "Eco-Linen Blazer", price: "$110", category: "Sustainable", color: "var(--amber)" },
  ];

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <Navigation />
      
      <section className="store-hero">
        <div className="hero-3d">
          {/* Re-using the 3D canvas but covering the hero section */}
          <ThreeBackground />
        </div>
        <div className="hero-content">
          <h1 className="brand-font">Wear Your Story</h1>
          <p>Curated threads. Unspoken expressions.</p>
          <button className="btn-primary" style={{ width: 'auto', padding: '1rem 3rem', marginTop: '2rem', borderRadius: '30px' }}>
            Shop New Arrivals
          </button>
        </div>
      </section>

      <main className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4rem' }}>
          <h2 className="brand-font" style={{ fontSize: '2.5rem', color: 'var(--bg-dark-warm)' }}>Trending Now</h2>
          <div className="category-filters" style={{ margin: 0, background: 'none' }}>
            <span className="filter-tab active">All</span>
            <span className="filter-tab">Women</span>
            <span className="filter-tab">Men</span>
            <span className="filter-tab">Sustainable</span>
          </div>
        </div>

        <div className="product-grid">
          {dummyProducts.map(product => (
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
      </main>
    </div>
  );
}
