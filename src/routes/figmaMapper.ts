import express from 'express';
import { CodigmaModel } from '../models/CodigmaModel';

const router = express.Router();

// Simple Figma Node Mapper
router.post('/map-figma-node', (req, res) => {
  const figmaNode = req.body;

  const codigmaModel: CodigmaModel = {
    name: figmaNode.name || '',
    type: figmaNode.type || 'UNKNOWN',
    dimensions: {
      width: figmaNode.absoluteBoundingBox?.width || 0,
      height: figmaNode.absoluteBoundingBox?.height || 0,
    },
    styles: figmaNode.styles || {},
    content: figmaNode.characters || '',
    children: Array.isArray(figmaNode.children)
      ? figmaNode.children.map((child: any) => ({
          name: child.name || '',
          type: child.type || 'UNKNOWN',
          dimensions: {
            width: child.absoluteBoundingBox?.width || 0,
            height: child.absoluteBoundingBox?.height || 0,
          },
          styles: child.styles || {},
          content: child.characters || '',
          children: [],
        }))
      : [],
  };

  res.json({ codigmaModel });
});

export default router;
