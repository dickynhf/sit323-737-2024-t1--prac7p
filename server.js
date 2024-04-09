// Import necessary modules
const express = require("express");
const app = express();
const port = 3040;
const winston = require('winston');

// Configure Winston for logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Log to console in non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

//Function 
//
// Define the addition operation
const add = (num1,num2) => {
  return num1+num2;
}

// Function to perform exponentiation
const exponentiate = (base, exponent) => {
  return Math.pow(base, exponent);
};

// Function to calculate the square root of a number
const sqrt = (num) => {
  return Math.sqrt(num);
};

// Function to find the remainder of division of one number by another
const modulo = (num1, num2) => {
  return num1 % num2;
};

//Route
//
// Define the route for addition
app.get("/add", (req, res) => {
  try{
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if(isNaN(num1) || isNaN(num2)) {
    const errorMsg = isNaN(num1) ? "num1 is incorrectly defined" : "num2 is incorrectly defined";
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }

logger.info('Parameters '+num1+' and '+num2+' received for addition');
  const result = add(num1,num2);
  res.status(200).json({statuscocde:200, data: result });
  } catch(error) {
    console.log(error)
    res.status(500).json({statuscocde:500, msg: error.toString()});
  }
});

//Define the route for subtraction
app.get("/sub", (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(isNaN(num1) || isNaN(num2)) {
      const errorMsg = isNaN(num1) ? "num1 is incorrectly defined" : "num2 is incorrectly defined";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

  logger.info('Parameters '+num1+' and '+num2+' received for subtraction')
    const result = num1 - num2;
    res.status(200).json({ statusCode: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, msg: error.toString() });
  }
});

//Define the route for multiplication
app.get("/multi", (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(isNaN(num1) || isNaN(num2)) {
      const errorMsg = isNaN(num1) ? "num1 is incorrectly defined" : "num2 is incorrectly defined";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

  logger.info('Parameters '+num1+' and '+num2+' received for multiplication')
    const result = num1 * num2;
    res.status(200).json({ statusCode: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, msg: error.toString() });
  }
});

//Define the route for division
app.get("/divide", (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(isNaN(num1) || isNaN(num2)) {
      const errorMsg = isNaN(num1) ? "num1 is incorrectly defined" : "num2 is incorrectly defined";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
    if (num2 === 0) {
      logger.error("Cannot divide by zero");
      throw new Error("Cannot divide by zero");
    }

    logger.info(`Parameters ${num1} and ${num2} received for division`);
    const result = num1 / num2;
    res.status(200).json({ statusCode: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, msg: error.toString() });
  }
});

// Exponentiation route
app.get("/exp", (req, res) => {
  try {
    const base = parseFloat(req.query.base);
    const exponent = parseFloat(req.query.exponent);
    if(isNaN(base) || isNaN(exponent)) {
      const errorMsg = isNaN(base) ? "Base is incorrectly defined" : "Exponent is incorrectly defined";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    logger.info(`Parameters ${base} and ${exponent} received for exponentiation`);
    const result = exponentiate(base, exponent);
    res.status(200).json({ statusCode: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, msg: error.toString() });
  }
});

// Square root route
app.get("/sqrt", (req, res) => {
  try {
    const num = parseFloat(req.query.num);
    if(isNaN(num)) {
      logger.error("Number is incorrectly defined for square root");
      throw new Error("Number incorrectly defined for square root");
    }

    logger.info(`Parameter ${num} received for square root`);
    const result = sqrt(num);
    res.status(200).json({ statusCode: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, msg: error.toString() });
  }
});

// Modulo route
app.get("/mod", (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(isNaN(num1) || isNaN(num2)) {
      const errorMsg = isNaN(num1) ? "num1 is incorrectly defined" : "num2 is incorrectly defined";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    logger.info(`Parameters ${num1} and ${num2} received for modulo`);
    const result = modulo(num1, num2);
    res.status(200).json({ statusCode: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, msg: error.toString() });
  }
});

// Serve the static HTML file from the public directory at the root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Serve static files from the public directory
app.use(express.static(__dirname + "/public"));

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
