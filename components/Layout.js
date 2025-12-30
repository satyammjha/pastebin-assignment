import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Github, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Head from 'next/head';

export default function Layout({ children }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased selection:bg-blue-100 dark:selection:bg-blue-900">


      <Head>
        <title>Pastebin-Lite | Satyam Jha</title>
        <meta name="description" content="Secure, ephemeral text sharing application." />

        <link rel="icon" href="/favicon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        <link rel="manifest" href="/site.webmanifest" />
      </Head>


      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between relative">

          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">Pastebin-Lite</span>
          </div>

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <a href='https://satyamm.in' target="_blank" className="hover:opacity-80 transition-opacity">
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                Submitted by <span className="font-bold italic underline decoration-wavy decoration-primary/30 underline-offset-4 text-red-600 cursor-pointer">satyammjha</span>
              </p>
            </a>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://github.com/satyammjha/pastebin-assignment"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon" className="h-9 w-9 cursor-pointer">
                <Github className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </a>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 cursor-pointer"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}