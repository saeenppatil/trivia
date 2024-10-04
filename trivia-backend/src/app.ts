import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('BACKEND');
});

app.get('/api/trivia/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    let url;
    if (categoryId === '0') {
      url = 'https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple';
    } else {
      url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=medium&type=multiple`;
    }

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Error!! Couldn't get the trivia questions :(", error);
    res.status(500).json({ error: "Couldn't get the trivia questions :(" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});