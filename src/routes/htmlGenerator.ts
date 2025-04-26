import express, { Request, Response } from 'express';
import { CodigmaModel } from '../models/CodigmaModel';

const router = express.Router();

// Recursive HTML Generator Function
const generateHTML = (model: CodigmaModel): string => {
  const tag = model.type === 'TEXT' ? 'p' : 'div'; // Şimdilik TEXT ise <p> yapıyoruz
  const childrenHTML = model.children.map(generateHTML).join('');
  
  const content = model.content || '';
  
  return `<${tag} class="${model.name.replace(/\s+/g, '-').toLowerCase()}">${content}${childrenHTML}</${tag}>`;
};

// Endpoint
router.post('/generate-html', (req: Request, res: Response): void => {
  const codigmaModel = req.body.codigmaModel as CodigmaModel;

  if (!codigmaModel) {
    res.status(400).json({ error: 'codigmaModel is required' });
    return;
  }

  const html = generateHTML(codigmaModel);

  res.json({ html });
});

export default router;
