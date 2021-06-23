import express from 'express';
const app = express();
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const result = bmiCalculator(height, weight);
  res.send(result);
});

app.post('/exercises', (req, res) => {
  const target = req.body.target
  const dailyValues = req.body.daily_exercises
  if (!req.body.target || !req.body.daily_exercises) {
    return res.status(400).json({
      error: "parameters missing"
    })
  } else if (isNaN(target) || !Array.isArray(dailyValues)) {
    return res.status(400).json({
      error: "malformated parameters"
    })
  }
  const result = exerciseCalculator(target, dailyValues)
  res.send(result)
  return 
})


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
