import '@/app/ui/global.css';
import '~/styles/fonts.css';
import { JSX } from 'solid-js';

export const routeData = () => {
  return {
    title: 'Acme Dashboard',
    description: 'The Dashboard built with SolidStart'
  };
};

export default function RootLayout(props: { children: JSX.Element }) {
  return (
    <html lang="en">
      <body class="font-inter antialiased">{props.children}</body>
    </html>
  );
}