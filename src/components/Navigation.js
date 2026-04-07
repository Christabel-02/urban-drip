'use client';
import { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('urbanDripUserEmail');
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const categories = [
    { title: "Women", sub: ["Tops", "Dresses", "Ethnic", "Bottomwear", "Active", "Loungewear", "Winter", "Maternity", "Plus Size"] },
    { title: "Men", sub: ["T-Shirts", "Jeans", "Ethnic", "Active", "Winter", "Formal", "Plus Size"] },
    { title: "Kids", sub: ["Boys", "Girls", "Baby", "School", "Party"] },
    { title: "Unisex", sub: ["Oversized", "Hoodies", "Streetwear"] },
    { title: "Special", sub: ["Sustainable", "Designer", "Vintage"] }
  ];

  return (
    <nav className="store-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Menu 
          style={{ cursor: 'pointer', color: 'var(--maroon)' }} 
          onClick={() => setMenuOpen(!menuOpen)} 
        />
        <a href="/store" className="nav-brand brand-font">UrbanDrip</a>
      </div>

      <div className="nav-links" style={{ display: menuOpen ? 'none' : 'flex' }}>
        <a href="#" className="nav-link">New Arrivals</a>
        <a href="#" className="nav-link">Best Sellers</a>
        <a href="#" className="nav-link">Collections</a>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Search style={{ cursor: 'pointer', color: 'var(--text-main)' }} size={20} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User style={{ cursor: 'pointer', color: 'var(--text-main)' }} size={20} />
          {userEmail && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600 }}>
              {userEmail}
            </span>
          )}
        </div>

        <ShoppingBag style={{ cursor: 'pointer', color: 'var(--maroon)' }} size={20} />
      </div>

      {menuOpen && (
        <div style={{ 
          position: 'absolute', top: '100%', left: 0, width: '100vw', 
          background: 'var(--bg-warm)', borderBottom: '1px solid var(--border)',
          padding: '2rem 3rem', display: 'flex', gap: '4rem', zIndex: 99
        }}>
          {categories.map((cat) => (
            <div key={cat.title}>
              <h4 style={{ color: 'var(--burgundy)', marginBottom: '1rem', textTransform: 'uppercase' }}>{cat.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {cat.sub.map(s => (
                  <li key={s}><a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>{s}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
