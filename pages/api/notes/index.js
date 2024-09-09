export default async function handler(req, res) {
  if (req.method === 'GET') {
      // Handle GET request for all notes
      try {
          const response = await fetch('https://service.pace-unv.cloud/api/notes');
          const data = await response.json();
          res.status(200).json(data);
      } catch (error) {
          res.status(500).json({ error: 'Failed to fetch notes' });
      }
  } else if (req.method === 'POST') {
      // Handle POST request for creating a new note
      const { title, description } = req.body;
      if (!title || !description) {
          return res.status(400).json({ error: 'Title and description are required' });
      }

      try {
          const response = await fetch('https://service.pace-unv.cloud/api/notes', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title, description }),
          });
          const data = await response.json();
          res.status(201).json(data);
      } catch (error) {
          res.status(500).json({ error: 'Failed to create note' });
      }
  } else {
      // Method not allowed for other HTTP methods
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
