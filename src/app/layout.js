import { CartProvider } from '@/lib/CartContext';
import "./globals.css";

export const metadata = {
  title: "UrbanDrip | Wear Your Story",
  description: "A premium e-commerce clothing brand.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
