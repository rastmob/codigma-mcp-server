import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


import { CodigmaModel } from '../models/CodigmaModel';

const router = express.Router();

// Get token from environment variables
const FIGMA_PERSONAL_ACCESS_TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;

// Figma URL'den fileKey çıkar
const extractFileKey = (figmaUrl: string): string | null => {
  const match = figmaUrl.match(/file\/([a-zA-Z0-9]+)\//);
  return match ? match[1] : null;
};

// Figma Node'u normalize eden basit mapper
const mapFigmaNodeToCodigmaModel = (node: any): CodigmaModel => ({
  name: node.name || '',
  type: node.type || 'UNKNOWN',
  dimensions: {
    width: node.absoluteBoundingBox?.width || 0,
    height: node.absoluteBoundingBox?.height || 0,
  },
  styles: node.styles || {},
  content: node.characters || '',
  children: Array.isArray(node.children)
    ? node.children.map(mapFigmaNodeToCodigmaModel)
    : [],
});

// HTML generator
const generateHTML = (model: CodigmaModel): string => {
  const tag = model.type === 'TEXT' ? 'p' : 'div';
  const childrenHTML = model.children.map(generateHTML).join('');
  const content = model.content || '';
  return `<${tag} class="${model.name.replace(/\s+/g, '-').toLowerCase()}">${content}${childrenHTML}</${tag}>`;
};

// CSS generator
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

// Main Pipeline
router.post('/figma-to-bundle', async (req: Request, res: Response): Promise<void> => {
        const { figmaUrl } = req.body;

        if (!figmaUrl) {
            res.status(400).json({ error: 'figmaUrl is required' });
            return;
        }

        const fileKey = extractFileKey(figmaUrl);

        if (!fileKey) {
            res.status(400).json({ error: 'Invalid Figma URL' });
            return;
        }

        try {
            const response = await axios.get(`https://api.figma.com/v1/files/${fileKey}`, {
                headers: {
                    'X-Figma-Token': FIGMA_PERSONAL_ACCESS_TOKEN,
                },
            });

            const figmaData = response.data as {
                document: {
                    children: Array<{
                        children: Array<any>;
                    }>;
                };
            };

            // Örnek olarak ilk Page'in ilk Frame'ini alıyoruz (daha sonra seçilebilir yaparız)
            const firstNode = figmaData.document.children[0]?.children[0];

            if (!firstNode) {
                res.status(400).json({ error: 'No valid node found in Figma file.' });
                return;
            }

            // Mapping
            const codigmaModel = mapFigmaNodeToCodigmaModel(firstNode);

            // HTML + CSS üretimi
            const html = generateHTML(codigmaModel);
            const css = generateCSS(codigmaModel);
            const bundle = `<style>\n${css}\n</style>\n\n${html}`;

            res.json({
                codigmaModel,
                bundle,
            });

        } catch (error: any) {
            console.error(error.response?.data || error.message);
            res.status(500).json({ error: 'Failed to process Figma file' });
        }
    });

export default router;
