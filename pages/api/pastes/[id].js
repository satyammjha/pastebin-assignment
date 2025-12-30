import dbConnect from '../../../lib/dbConnect';
import Paste from '../../../models/Paste';
import { getCurrentTime } from '../../../lib/timeHelper';
export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const { id } = req.query;
    await dbConnect();

    const now = getCurrentTime(req);
    const paste = await Paste.findOne({
        _id: id,
        $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }]
    });

    if (!paste) {
        return res.status(404).json({ error: 'Not found or expired' });
    }

    if (paste.remainingViews === null) {
        return res.status(200).json({
            content: paste.content,
            remaining_views: null,
            expires_at: paste.expiresAt
        });
    }


    if (paste.remainingViews <= 0) {
        return res.status(404).json({ error: 'View limit exceeded' });
    }

    const updatedPaste = await Paste.findOneAndUpdate(
        {
            _id: id,
            remainingViews: { $gt: 0 }
        },
        { $inc: { remainingViews: -1 } },
        { new: true }
    );

    if (!updatedPaste) {
        return res.status(404).json({ error: 'View limit exceeded' });
    }

    return res.status(200).json({
        content: updatedPaste.content,
        remaining_views: updatedPaste.remainingViews,
        expires_at: updatedPaste.expiresAt
    });
}