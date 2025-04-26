import express from 'express';
import { CodigmaModel } from '../models/CodigmaModel';

// HTML Generator (aynısını kullanıyoruz)
const generateHTML = (model: CodigmaModel): string => {
  const tag = model.type === 'TEXT' ? 'p' : 'div';
  const childrenHTML = model.children.map(generateHTML).join('');
  const content = model.content || '';
  
  return `<${tag} class="${model.name.replace(/\s+/g, '-').toLowerCase()}">${content}${childrenHTML}</${tag}>`;
};

// CSS Generator (aynısını kullanıyoruz)
const toKebabCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const generateCSS = (model: CodigmaModel): string => {
  const className = model.name.replace(/\s+/g, '-').toLowerCase();
  let css = `.${className} {`;

  for (const [key, value] of Object.entries(model.styles)) {
    css += `${toKebabCase(key)}: ${value}; `;
  }

  css += `width: ${model.dimensions.width}px; height: ${model.dimensions.height}px;`;
  css += '} ';

  const childrenCSS = model.children.map(generateCSS).join(' ');

  return css + childrenCSS;
};

const router = express.Router();

// Endpoint
router.post('/generate-bundle', (req, res) => {
  const codigmaModel = req.body.codigmaModel as CodigmaModel;

  if (!codigmaModel) {
    return res.status(400).json({ error: 'codigmaModel is required' });
  }

  const html = generateHTML(codigmaModel);
  const css = generateCSS(codigmaModel);

  const bundle = `<style>\n${css}\n</style>\n\n${html}`;

  res.json({ bundle });
});

export default router;
