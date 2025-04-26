import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


const router = express.Router();

// Get token from environment variables
const FIGMA_PERSONAL_ACCESS_TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;

// Check if token exists
if (!FIGMA_PERSONAL_ACCESS_TOKEN) {
  console.error('Error: FIGMA_PERSONAL_ACCESS_TOKEN is not set in environment variables');
}

const extractFileKey = (figmaUrl: string): string | null => {
  const match = figmaUrl.match(/file\/([a-zA-Z0-9]+)\//);
  return match ? match[1] : null;
};

router.post('/fetch-figma-data', async (req, res) => {
  const { figmaUrl } = req.body;

  if (!figmaUrl) {
    return res.status(400).json({ error: 'figmaUrl is required' });
  }

  const fileKey = extractFileKey(figmaUrl);

  if (!fileKey) {
    return res.status(400).json({ error: 'Invalid Figma URL' });
  }

  try {
    const response = await axios.get(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': FIGMA_PERSONAL_ACCESS_TOKEN,
      },
    });

    const figmaData = response.data;
    res.json({ figmaData });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Figma data' });
  }
});

export default router;
