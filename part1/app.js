const express = require('express');
const insertSampleData = require('./insertSampleData');
const dogsRoutes = require('./routes/dogs');
const walkRequestsRoutes = require('./routes/walkrequests');
const walkersRoutes = require('./routes/walkers');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', dogsRoutes);
app.use('/api', walkRequestsRoutes);
app.use('/api', walkersRoutes);

app.listen(PORT, async () => {
  await insertSampleData();
  console.log(`Server running at http://localhost:${PORT}`);
});
