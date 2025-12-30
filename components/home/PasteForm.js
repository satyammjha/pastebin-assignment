import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Clock, Eye, Sparkles } from 'lucide-react';

export default function PasteForm({ onPasteCreated }) {
    const [content, setContent] = useState('');
    const [ttl, setTtl] = useState('');
    const [maxViews, setMaxViews] = useState('');
    const [loading, setLoading] = useState(false);

    const ttlOptions = [
        { label: '30s', value: 30 },
        { label: '1m', value: 60 },
        { label: '10m', value: 600 },
        { label: '1h', value: 3600 },
        { label: '24h', value: 86400 },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/pastes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    ttl_seconds: ttl ? parseInt(ttl) : undefined,
                    max_views: maxViews ? parseInt(maxViews) : undefined,
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Something went wrong');

            onPasteCreated(data);

            setContent('');
            setTtl('');
            setMaxViews('');
            toast.success('Paste created successfully!');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-muted shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    New Paste
                </CardTitle>

            </CardHeader>
            <CardContent>
                <form id="paste-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-sm font-medium">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Paste your code, logs, or secret text here..."
                            className="min-h-24 font-mono text-sm resize-y focus-visible:ring-primary"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="ttl" className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" /> Time to Live (Seconds)
                            </Label>
                            <div className="relative">
                                <Input
                                    id="ttl"
                                    type="number"
                                    placeholder="e.g. 3600 (1 Hour)"
                                    min="1"
                                    value={ttl}
                                    onChange={(e) => setTtl(e.target.value)}
                                    className="pl-3"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {ttlOptions.map((opt) => (
                                    <button
                                        key={opt.label}
                                        type="button"
                                        onClick={() => setTtl(opt.value)}
                                        className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${parseInt(ttl) === opt.value
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-background hover:bg-muted text-muted-foreground'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="views" className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Eye className="h-4 w-4" /> Max Views
                            </Label>
                            <Input
                                id="views"
                                type="number"
                                placeholder="e.g. 5"
                                min="1"
                                value={maxViews}
                                onChange={(e) => setMaxViews(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="bg-muted/30 py-4 flex justify-end border-t">
                <Button type="submit" form="paste-form" disabled={loading} size="lg" className="w-full md:w-auto font-semibold cursor-pointer">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? 'Creating...' : 'Create Paste'}
                </Button>
            </CardFooter>
        </Card>
    );
}