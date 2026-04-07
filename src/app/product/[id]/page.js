'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/CartContext';
import { Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Find the exact product by parsing the string parameter from Next router
  const product = PRODUCTS.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div style={{ background: 'var(--bg-warm)', minHeight: '100vh', padding: '5rem', textAlign: 'center' }}>
        <h1 className="brand-font" style={{ color: 'var(--maroon)' }}>Product not found.</h1>
        <button className="btn-primary" style={{ width: 'auto', marginTop: '2rem' }} onClick={() => router.push('/')}>
          Return to Store
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div style={{ background: 'var(--bg-warm)', minHeight: '100vh' }}>
      <Navigation />
      
      <main className="container" style={{ paddingTop: '4rem' }}>
        <button 
          onClick={() => router.push('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--maroon)', cursor: 'pointer', marginBottom: '2rem', fontSize: '1rem', fontFamily: 'inherit' }}
        >
          <ArrowLeft size={20} /> Back to Catalog
        </button>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Left Side: Product Imagery Overlay */}
          <div style={{ flex: '1 1 400px', background: 'var(--surface)', borderRadius: '24px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '600px', border: '1px solid var(--border)' }}>
            <div style={{ 
              width: '50%', height: '60%', 
              background: product.color, 
              borderRadius: '20px 20px 60px 20px',
              boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.2), 0 20px 40px rgba(0,0,0,0.1)'
            }}></div>
          </div>

          {/* Right Side: Product Details & Cart Box */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: 'var(--coral)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: 600 }}>
              {product.category}
            </span>
            <h1 className="brand-font" style={{ fontSize: '3.5rem', color: 'var(--bg-dark-warm)', lineHeight: 1.1, margin: '1rem 0' }}>
              {product.name}
            </h1>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--burgundy)', marginBottom: '1.5rem' }}>
              {product.price}
            </div>

            <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '3rem' }}>
              {product.details}
            </p>

            {/* Cart Interaction Layer */}
            <div style={{ background: '#fff', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border)', boxShadow: '0 10px 30px rgba(128,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--bg-dark-warm)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Quantity</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--surface)', borderRadius: '12px', padding: '0.5rem' }}>
                    <button 
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      style={{ background: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Minus size={16} color="var(--bg-dark-warm)"/>
                    </button>
                    <span style={{ fontWeight: 800, color: 'var(--burgundy)', width: '20px', textAlign: 'center' }}>{qty}</span>
                    <button 
                      onClick={() => setQty(qty + 1)}
                      style={{ background: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Plus size={16} color="var(--bg-dark-warm)"/>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 style={{ color: 'var(--bg-dark-warm)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Color</h4>
                  <div className="color-swatches" style={{ marginTop: '0.8rem' }}>
                    <div className="swatch" style={{ background: product.color, width: '30px', height: '30px', border: '2px solid white', boxShadow: '0 0 0 2px var(--amber)' }}></div>
                    <div className="swatch" style={{ background: 'var(--bg-dark-warm)', width: '30px', height: '30px' }}></div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                style={{ 
                  width: '100%', 
                  padding: '1.2rem', 
                  borderRadius: '16px', 
                  border: 'none', 
                  background: isAdded ? 'var(--coral)' : 'linear-gradient(135deg, var(--maroon), var(--burgundy))', 
                  color: 'white', 
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {isAdded ? (
                  <>Added into Bag! ✓</>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
