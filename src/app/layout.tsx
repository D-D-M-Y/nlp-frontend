import '@/app/globals.css'

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html>
        <body>
          {/* Layout UI */}
          <div>{children}</div>
        </body>
      </html>
    );
  }
