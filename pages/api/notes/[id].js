export default async function handler(req, res) {
    const { id } = req.query;  // Dynamic route parameter

    if (req.method === 'GET') {
        // Handle GET request for a specific note
        try {
            const response = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch note' });
        }
    } else if (req.method === 'PATCH') {
        // Handle PATCH request to update a note
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        try {
            const response = await fetch(`https://service.pace-unv.cloud/api/notes/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update note' });
        }
    } else if (req.method === 'DELETE') {
        // Handle DELETE request to remove a note
        try {
            const response = await fetch(`https://service.pace-unv.cloud/api/notes/delete/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete note' });
        }
    } else {
        // Method not allowed for other HTTP methods
        res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
