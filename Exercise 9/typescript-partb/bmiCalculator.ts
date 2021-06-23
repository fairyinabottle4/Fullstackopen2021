interface BmiValues {
  height: number,
  weight: number
}


const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number) => {
  const heightMetres = height/100;
  const bmi = weight / (heightMetres * heightMetres);
  if (bmi < 18.5) {
    return {
      weight,
      height,
      bmi: "Underweight"
    };
  } else if (18.5 < bmi && bmi < 25) {
    return {
      weight,
      height,
      bmi: "Normal (healthy weight)"
    };
  } else if (25 < bmi && bmi < 30) {  
    return {
      weight,
      height,
      bmi: "Overweight"
    };
  } else if (bmi > 30) {
    return {
      weight,
      height,
      bmi: "Obese"
    };
  } else {
    return {
      error: "malformatted parameters"
    };
  }
};

try {
  const {height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad haappend, message:', e.message);
}

export default calculateBmi;