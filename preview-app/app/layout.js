import './globals.css';

export const metadata = {
  title: 'Dynamic Preview Generator',
  description: 'White-label website preview tool for pitching personalized websites to local businesses.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Muli:wght@300;400;500;600;700;800;900&family=Oswald:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/gym/css/flaticon.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
