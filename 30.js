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