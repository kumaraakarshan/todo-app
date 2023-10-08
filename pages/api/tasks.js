import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const uri = 'mongodb+srv://kumaraakarshan:a0xl11nbQpgrkM1H@cluster0.sas6wqa.mongodb.net/tasks?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('tasks');
      const collection = database.collection('tasks');
      const tasks = await collection.find().toArray();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Unable to fetch tasks', details: error.message });
    } finally {
      client.close();
    }
  } else if (req.method === 'POST') {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ error: 'Task text is required' });
      return;
    }

    try {
      await client.connect();
      const database = client.db('tasks');
      const collection = database.collection('tasks');
      const task = { text, completed: false };
      const result = await collection.insertOne(task);
      res.status(201).json(result.ops[0]);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Unable to create task', details: error.message });
    } finally {
      client.close();
    }
  }
}
