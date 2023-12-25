class Distance {
  static conversions = {
    inches: 2.54,
    feet: 30.48,
    yards: 91.44,
    miles: 160934.4,
    centimeters: 1,
    meters: 100,
    kilometers: 100000,
  };

  constructor(cm) {
    this.cm = cm;
  }
}

Object.entries(Distance.conversions).forEach(([unit, conversion]) => {
  Object.defineProperty(
    Distance,
    `from${unit.charAt(0).toUpperCase() + unit.slice(1)}`,
    {
      get: function () {
        return value => new Distance(value * conversion);
      },
    }
  );

  Object.defineProperty(Distance.prototype, unit, {
    get: function () {
      return this.cm / conversion;
    },
  });
});

const distance = Distance.fromMeters(10);

distance.feet; // 32.808398950131235
distance.centimeters; // 1000



const createUnitConverter = unitCoversions => {
  // Create function that will act as the data structure
  const UnitConverter = function (unit) {
    this.unit = unit;
  };

  // Add static methods
  Object.entries(unitCoversions).forEach(([unit, conversion]) => {
    Object.defineProperty(
      UnitConverter,
      `from${unit.charAt(0).toUpperCase() + unit.slice(1)}`,
      {
        get: function () {
          return value => new UnitConverter(value * conversion);
        },
      }
    );

    // Add instance methods
    Object.defineProperty(UnitConverter.prototype, unit, {
      get: function () {
        return this.unit / conversion;
      },
    });
  });

  return UnitConverter;
};

const Data = createUnitConverter({
  bits: 1,
  bytes: 8,
  kilobits: 1000,
  kilobytes: 8000,
  megabits: 1000000,
  megabytes: 8000000,
  gigabits: 1000000000,
  gigabytes: 8000000000,
  terabits: 1000000000000,
  terabytes: 8000000000000,
  petabits: 1000000000000000,
  petabytes: 8000000000000000,
});



const data = Data.fromBytes(2000);

data.kilobytes; // 2
data.bits; // 16000


const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true

const any = (arr, fn = Boolean) => arr.some(fn);

any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true



import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'


//routes declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register

export { app }