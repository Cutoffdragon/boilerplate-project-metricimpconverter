const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function covertHandler.getNum(input)', function () {
      test('Whole Number Input', function (done) {
        let input = '32L';
        assert.equal(convertHandler.getNum(input), 32);
        done();
      });
  
      test('Decimal Input', function (done) {
        let input = "3.2L";
        assert.equal(convertHandler.getNum(input), 3.2);
        done();
      });
  
      test('Fractional Input', function (done) {
        let input = "6/2L";
        assert.equal(convertHandler.getNum(input), 3);
        done();
      });
  
      test('Fractional Input with Decimal', function (done) {
        let input = "3/1.5L";
        assert.equal(convertHandler.getNum(input), 2);
        done();
      });
  
      test('Invalid Input Double Fraction', function (done) {
        let input = "3/3/2L";
        assert.isNotTrue(convertHandler.getNum(input));
        done();
      });
  
      test('No Number Provided Defaults to 1', function (done) {
        let input = "L";
        assert.equal(convertHandler.getNum(input), 1);
        done();
      });
    });
  
    suite('Function convertHandler.getUnit(input)', function () {
      test('Correctly Read Each Valid Input Unit', function (done) {
        let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
        let output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        input.forEach(function(ele, i) {
          assert.equal(convertHandler.getUnit(ele), output[i]);
        })
        done();
      });
  
      test('Invalid Unit Returns an Error', function (done) {
        let input = "30Miles";
        assert.equal(convertHandler.getUnit(input), "invalid unit");
        done();
      });
    });
  
    suite('Function convertHandler.getReturnUnit(initUnit)', function() {
      test('Correctly Return Each Return Unit', function(done) {
        let inputUnit = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        let outputUnit = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
        inputUnit.forEach(function(ele, i) {
          assert.equal(convertHandler.getReturnUnit(ele), outputUnit[i]);
        })
        done();
      });
    });
  
    suite('Function convertHandler.spellOutUnit(unit)', function() {
      test('Correctly Spell Out Input Unit', function(done) {
        let inputUnit = ['gal', 'L', 'mi', 'km', 'kg', 'lbs'];
        let outputUnit = ['gallons', 'liters', 'miles', 'kilometers', 'kilograms', 'pounds'];
        inputUnit.forEach(function(ele, i) {
          assert.equal(convertHandler.spellOutUnit(ele), outputUnit[i]);
        })
        done();
      });
    });
  
    suite('Function convertHandler.convert(initNum, initUnit)', function() {
      test('Convert gal to L', function(done) {
        let input = [5, 'gal'];
        let expected = 18.9271;
        assert.approximately(convertHandler.convert(input[0], input[1], 0.1), expected, 0.1);
        done();
      });
  
      test('Convert L to gal', function(done) {
        let input = [18.9271, 'L'];
        let expected = 5;
        assert.approximately(convertHandler.convert(input[0], input[1], 0.1), expected, 0.1);
        done();
      });
  
      test('Convert mi to km', function(done) {
        let input = [5, 'mi'];
        let expected = 8.0467;
        assert.approximately(convertHandler.convert(input[0], input[1], 0.1), expected, 0.1);
        done();
      });
  
      test('Convert km to mi', function(done) {
        let input = [8.0467, 'km'];
        let expected = 5;
        assert.approximately(convertHandler.convert(input[0], input[1], 0.1), expected, 0.1);
        done();
      });
  
      test('Convert lbs to kg', function(done) {
        let input = [5, 'lbs'];
        let expected = 2.26796;
        assert.approximately(convertHandler.convert(input[0], input[1], 0.1), expected, 0.1);
        done();
      });
  
      test('Convert kg to lbs', function(done) {
        let input = [2.26796, 'kg'];
        let expected = 5;
        assert.approximately(convertHandler.convert(input[0], input[1], 0.1), expected, 0.1);
        done();
      });
    });
  
  });