function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let unit = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], unit];
}

function checkDivision(possibleFraction) {
  let division = possibleFraction.split("/");
  if (division.length > 2) {
    return false
  }
  return division;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let possibleFraction = checkDivision(result);
    if (!possibleFraction) {
      return "invalid number";
    }
    let num1 = possibleFraction[0];
    let num2 = possibleFraction[1] || "1";

    result = parseFloat(num1) / parseFloat(num2);

    if (isNaN(num1) || isNaN(num2)) {
      return "invalid number";
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase();

    switch (result) {
      case "gal":
        return "gal";
      case "l":
        return "L";
      case "mi":
        return "mi";
      case "km":
        return "km";
      case "lbs":
        return "lbs";
      case "kg":
        return "kg";
      default:
        return "invalid unit";
    }
    
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = initUnit.toLowerCase();

    switch (result) {
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return "invalid unit";
    }

  };

  this.spellOutUnit = function(unit) {
    let result = unit.toLowerCase();

    switch (result) {
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "km":
        return "kilometers";
      case "mi":
        return "miles";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return "invalid unit";
    }
    
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }

    return parseFloat(result.toFixed(5));
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
