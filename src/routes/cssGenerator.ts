import express from 'express';
import { CodigmaModel } from '../models/CodigmaModel';

const router = express.Router();

// Helper: Convert JS style key to CSS key (camelCase -> kebab-case)
const toKebabCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

// Recursive CSS Generator Function
const generateCSS = (model: CodigmaModel): string => {
  const className = model.name.replace(/\s+/g, '-').toLowerCase();
  let css = `.${className} {`;

  for (const [key, value] of Object.entries(model.styles)) {
    css += `${toKebabCase(key)}: ${value}; `;
  }

  css += `width: ${model.dimensions.width}px; height: ${model.dimensions.height}px;`;
  css += '} ';

  // Children'ı da CSS üretmek için dolaş
  const childrenCSS = model.children.map(generateCSS).join(' ');

  return css + childrenCSS;
};

// Endpoint
router.post('/generate-css', (req, res) => {
  const codigmaModel = req.body.codigmaModel as CodigmaModel;

  if (!codigmaModel) {
    return res.status(400).json({ error: 'codigmaModel is required' });
  }

  const css = generateCSS(codigmaModel);

  res.json({ css });
});

export default router;
