import Link from 'next/link';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home } from 'lucide-react';

export default function Custom404() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">

                <div className="p-6 bg-muted/30 rounded-full">
                    <FileQuestion className="h-20 w-20 text-muted-foreground/50" />
                </div>

                <div className="space-y-2 max-w-md">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        404
                    </h1>
                    <h2 className="text-xl font-semibold text-foreground/80">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground">
                        The paste you are looking for does not exist, has expired, or the view limit was reached.
                    </p>
                </div>

                <Link href="/">
                    <Button size="lg" className="gap-2 font-semibold">
                        <Home className="h-4 w-4" />
                        Go Back Home
                    </Button>
                </Link>
            </div>
        </Layout>
    );
}