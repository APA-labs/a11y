import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A11y Pattern Agent',
  description: 'AI-powered accessibility design assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
