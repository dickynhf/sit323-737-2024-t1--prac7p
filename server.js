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

// Define the addition operation
const add = (num1,num2) => {
  return num1+num2;
}

// Define the route for addition
app.get("/add", (req, res) => {
  try{
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if(isNaN(num1)) {
    logger.error("num1 is incorrectly defined");
    throw new Error("num1 incorrectly defined");
}
  if(isNaN(num2)) {
    logger.error("num2 is incorrectly defined");
    throw new Error("num2 incorrectly defined");
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
    if(isNaN(num1)) {
      logger.error("num1 is incorrectly defined");
      throw new Error("num1 incorrectly defined");
  }
   if(isNaN(num2)) {
      logger.error("num2 is incorrectly defined");
      throw new Error("num2 incorrectly defined");
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
    if(isNaN(num1)) {
      logger.error("num1 is incorrectly defined");
      throw new Error("num1 incorrectly defined");
  }
    if(isNaN(num2)) {
      logger.error("num2 is incorrectly defined");
      throw new Error("num2 incorrectly defined");
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
    if(isNaN(num1)) {
      logger.error("num1 is incorrectly defined");
      throw new Error("num1 incorrectly defined");
  }
    if(isNaN(num2)) {
      logger.error("num2 is incorrectly defined");
      throw new Error("num2 incorrectly defined");
  }
    if (num2 === 0) {
      logger.error("Cannot divide by zero");
      throw new Error("Cannot divide by zero");
    }

  logger.info('Parameters '+num1+' and '+num2+' received for division')
    const result = num1 / num2;
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
