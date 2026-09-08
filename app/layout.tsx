import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"HashCode Learning Experiences",description:"Interactive learning experiences by HashCode"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}