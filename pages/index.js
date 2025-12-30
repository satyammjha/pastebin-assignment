import { useState } from 'react';
import Layout from '@/components/Layout';
import PasteForm from '@/components/Home/PasteForm';
import PasteHistory from '@/components/Home/PasteHistory';

export default function Home() {
    const [createdPastes, setCreatedPastes] = useState([]);

    const handlePasteCreated = (newPasteData) => {
        setCreatedPastes(prev => [{
            ...newPasteData,
            createdAt: new Date()
        }, ...prev]);
    };

    const dismissPaste = (id) => {
        setCreatedPastes(prev => prev.filter(p => p.id !== id));
    };

    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-2 mb-8">
                        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                            Create Secure Paste
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Share text ephemerally. Set limits on views or time.
                        </p>
                    </div>

                    <PasteForm onPasteCreated={handlePasteCreated} />
                </div>

                <div className="lg:col-span-1 space-y-4">
                    <PasteHistory
                        pastes={createdPastes}
                        onDismiss={dismissPaste}
                    />
                </div>

            </div>
        </Layout>
    );
}