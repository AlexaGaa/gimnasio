import "./globals.css";
import { Providers } from "@/components/Providers";
import AccessibilityPanel from "@/components/AccessibilityPanel";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>

        <AccessibilityPanel />
      </body>
    </html>
  );
}