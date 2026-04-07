import "./globals.css";

export const metadata = {
  title: "UrbanDrip | Wear Your Story",
  description: "A premium e-commerce clothing brand.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
