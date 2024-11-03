import { JSX } from 'solid-js';
import '~/styles/fonts.css';

export default function RootLayout(props: { children: JSX.Element }) {
  console.log("Root layout rendering");
  return props.children;
}