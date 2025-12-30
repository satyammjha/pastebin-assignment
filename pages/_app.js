import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Component {...pageProps} />
            <Toaster position="top-center" richColors />
        </ThemeProvider>
    );
}