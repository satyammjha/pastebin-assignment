import { nanoid } from 'nanoid';
import dbConnect from '../../../lib/dbConnect';
import Paste from '../../../models/Paste.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const { content, ttl_seconds, max_views } = req.body;

        if (!content || typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({ error: 'Content is required' });
        }

        await dbConnect();


        const id = nanoid(8);
        let expiresAt = null;
        let remainingViews = null;

        if (ttl_seconds) {
            const ttl = parseInt(ttl_seconds);
            if (isNaN(ttl) || ttl < 1) return res.status(400).json({ error: 'Invalid TTL' });
            expiresAt = new Date(Date.now() + ttl * 1000);
        }

        if (max_views) {
            const mv = parseInt(max_views);
            if (isNaN(mv) || mv < 1) return res.status(400).json({ error: 'Invalid max_views' });
            remainingViews = mv;
        }

        await Paste.create({
            _id: id,
            content,
            expiresAt,
            remainingViews
        });

        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers.host;

        return res.status(201).json({
            id,
            url: `${protocol}://${host}/p/${id}`
        });

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}