// interface exerciseValues {
//   target: number,
//   dailyValues: Array<number>
// }

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean, 
  rating: number, 
  ratingDescription: string, 
  target: number,
  average: number
}

//this is for the earlier exercises where inputs are read from the command line
const parseExerciseArgs = (args: Array<string>) => {
  if (isNaN(Number(args[2]))) {
    throw new Error(`Value provided in position 1 is not a number`);
  }
  let dailyValues: Array<number> = [];
  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      dailyValues = dailyValues.concat(Number(args[i]));
    } else {
      throw new Error(`Value provided in position ${i} is not a number`);
    }
  }
  return {
    target: Number(args[2]),
    dailyValues
  };
};

const calculateExercises = (dailyTarget: number, actualFigures: Array<number>): Result => {
  const periodLength = actualFigures.length;
  let trainingDays = 0;
  actualFigures.forEach(x => x > 0 ? trainingDays += 1 : trainingDays += 0);
  const sum = actualFigures.reduce((s, p) => s + p, 0);
  const average = sum / periodLength;
  const success = average > dailyTarget;
  const gapFromTarget = average - dailyTarget;
  const rating = gapFromTarget < -0.5 ? 1 : -0.5 < gapFromTarget && gapFromTarget < 0 ? 2 : 3;
  const ratingDescription = rating === 1 ? "You are lazy!" 
                          : rating === 2 ? "not too bad but could be better" 
                          : "You hit your target good work!";
  return {
    periodLength, 
    trainingDays,
    success, 
    rating,
    ratingDescription, 
    target: dailyTarget,
    average
  };                
};

//this only applies to command line usage
try {
  const {target, dailyValues} = parseExerciseArgs(process.argv);
  console.log(calculateExercises(target, dailyValues));
} catch (e) {
  console.log('Error, something bad happened, message:', e.message);
}

export default calculateExercises;