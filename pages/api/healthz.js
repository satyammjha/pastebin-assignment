import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
  try {
    await dbConnect(); // Verify DB connection works
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
}