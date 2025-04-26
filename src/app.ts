import express from 'express';
import figmaFetcherRoutes from './routes/figmaFetcher';
import figmaMapperRoutes from './routes/figmaMapper';
import htmlGeneratorRoutes from './routes/htmlGenerator';
import cssGeneratorRoutes from './routes/cssGenerator';
import bundleGeneratorRoutes from './routes/bundleGenerator';
import pipelineRoutes from './routes/pipeline';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api', figmaFetcherRoutes);
app.use('/api', figmaMapperRoutes);
app.use('/api', htmlGeneratorRoutes);
app.use('/api', cssGeneratorRoutes);
app.use('/api', bundleGeneratorRoutes);
app.use('/api', pipelineRoutes);

app.listen(port, () => {
  console.log(`Codigma MCP Server listening at http://localhost:${port}`);
});
