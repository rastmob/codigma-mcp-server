import express from 'express';
import { CodigmaModel } from '../models/CodigmaModel';

const router = express.Router();

// Recursive HTML Generator Function
const generateHTML = (model: CodigmaModel): string => {
  const tag = model.type === 'TEXT' ? 'p' : 'div'; 
  const childrenHTML = model.children.map(generateHTML).join('');
  
  const content = model.content || '';
  
  return `<${tag} class="${model.name.replace(/\s+/g, '-').toLowerCase()}">${content}${childrenHTML}</${tag}>`;
};

// Endpoint
router.post('/generate-html', (req, res) => {
  const codigmaModel = req.body.codigmaModel as CodigmaModel;

  if (!codigmaModel) {
    return res.status(400).json({ error: 'codigmaModel is required' });
  }

  const html = generateHTML(codigmaModel);

  res.json({ html });
});

export default router;
