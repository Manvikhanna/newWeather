import ThemeToggle from "../components/themeToggle/themeToggle";
import "./globals.css";

export const metadata = {
  title: "Weather App",
  description: "Weather Forecast Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeToggle />
        <main className="app-container">{children}</main>
      </body>
    </html>
  );
}
