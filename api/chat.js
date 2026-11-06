export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'الرقم مطلوب' });
    }

    try {
        const response = await fetch('https://sin-osint.wasmer.app/api/ai/chat', {
            method: 'POST',
            headers: {
                'authority': 'sin-osint.wasmer.app',
                'accept': 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'origin': 'https://sin-osint.wasmer.app',
                'referer': 'https://sin-osint.wasmer.app/',
                'Cookie': 'sin_user_id=0e3d6d8838c7f7143fdbc5b7876a2792159918450458f3bc',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'فشل الاتصال بالخادم المستهدف' });
    }
}