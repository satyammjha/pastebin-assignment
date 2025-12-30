import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export async function getServerSideProps(context) {
    const { id } = context.params;

    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host;
    const apiUrl = `${protocol}://${host}/api/pastes/${id}`;

    try {
        const res = await fetch(apiUrl, {
            headers: context.req.headers
        });

        if (res.status === 404) {
            return { notFound: true };
        }

        if (!res.ok) {
            const text = await res.text();
            return { notFound: true };
        }

        const data = await res.json();

        return {
            props: {
                content: data.content,
                id
            }
        };

    } catch (error) {
        return { notFound: true };
    }
}

export default function PasteView({ content, id }) {
    const [copied, setCopied] = useState(false);

    const copyContent = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        toast.success('Content copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto mt-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle>Paste #{id}</CardTitle>
                            <CardDescription>
                                This paste is publicly visible.
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={copyContent}>
                            {copied ? (
                                <><Check className="mr-2 h-4 w-4" /> Copied</>
                            ) : (
                                <><Copy className="mr-2 h-4 w-4" /> Copy Content</>
                            )}
                        </Button>
                    </CardHeader>
                    <CardContent className="mt-4">
                        <div className="relative rounded-md bg-muted p-4 overflow-x-auto">
                            <pre className="text-sm font-mono whitespace-pre-wrap wrap-break-word text-foreground">
                                {content}
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}