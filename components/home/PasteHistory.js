import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Copy, Link as LinkIcon, Trash2, History } from 'lucide-react';

export default function PasteHistory({ pastes, onDismiss }) {

    const copyToClipboard = (url) => {
        if (!url) return;
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard');
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
                <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                    <History className="h-5 w-5 text-muted-foreground" />
                    History
                </h2>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {pastes.length} Session
                </span>
            </div>

            {pastes.length === 0 ? (
                <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground">
                    <p className="text-sm">No pastes created in this session.</p>
                </div>
            ) : (
                <div className="grid gap-3 animate-in slide-in-from-right-4 duration-500">
                    {pastes.map((paste, index) => (
                        <Card key={paste.id} className="overflow-hidden border shadow-none hover:border-primary/50 transition-colors group">
                            <div className="p-4 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none flex items-center gap-2">
                                            Paste #{paste.id}
                                            {index === 0 && (
                                                <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                                                    New
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {paste.createdAt.toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 cursor-pointer"
                                        onClick={() => onDismiss(paste.id)}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>

                                <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-md border">
                                    <div className="flex-1 truncate text-xs text-muted-foreground px-1 font-mono">
                                        {paste.url}
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 shrink-0 hover:bg-background shadow-sm cursor-pointer"
                                        onClick={() => copyToClipboard(paste.url)}
                                    >
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>

                                <a
                                    href={paste.url}
                                    target="_blank"
                                    className="inline-flex items-center text-xs text-primary hover:underline font-medium"
                                >
                                    Open Link <LinkIcon className="ml-1 h-3 w-3" />
                                </a>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}