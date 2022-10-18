function Car () {this.fuelConsumption = arguments[0]; this.engineType = arguments[1]; this.engineVolume = arguments[2]; this.modelName = arguments[3]; this.madeYear = arguments[4]; this.curbWeight = arguments[5]; this.carCondition = 100; this.carStatus = false;}
Car.prototype.startRide = function () {
    if (this.carCondition === 0) return `Car is broken. You can't start new ride.`
    if (!this.carStatus) {
        const currentCondition = this.carCondition - (Math.random() * (2.5 - 0.1) + 0.1).toFixed(1);
        this.carCondition = currentCondition < 0 ? 0 : currentCondition;
        this.carStatus = true;
        return 'Starting ride.';
    } return 'Already riding.'
}
Car.prototype.endRide = function () {
    this.carStatus = false;
    return 'Ending ride.'
}
function Sedan () {
    Car.call(this, ...arguments);
    this.carType = 'sedan';
}
function HatchBack () {
    Car.call(this, ...arguments);
    this.carType = 'hatchback';
}
function Wagon () {
    Car.call(this, ...arguments);
    this.carType = 'wagon';
}
Sedan.prototype = Object.create(Car.prototype);
HatchBack.prototype = Object.create(Car.prototype);
Wagon.prototype = Object.create(Car.prototype);
const myWagon = new Wagon(7, 'gas', 1.6, 'Focus', 2010, 1300);
const myWifeHatchBack = new HatchBack (6, 'gas', 1.4, 'Cadet', 2010, 1750);
const myFriendsSedan = new Sedan (7, 'diesel', 1.6, 'Rio', 2011, 1250);
myWagon.startRide();
myWagon.endRide();
myWifeHatchBack.startRide();
myWifeHatchBack.endRide();
myFriendsSedan.startRide();
myFriendsSedan.endRide();
const dealerPriceList = {hatchback: {basicRate: 110, yearCoef: {veryNew: 1.2, new: 1.4, old: 1.7, veryOld: 2,}, engineCoef: {diesel: 2.2, gas: 1.8,}, weightCoef: {lightWeight: 1.5, mediumWeight: 1.7, heavyWeight: 2,},}, sedan: {basicRate: 125, yearCoef: {veryNew: 1.5, new: 1.8, old: 2, veryOld: 2.6,}, engineCoef: {diesel: 2.5, gas: 2,}, weightCoef: {lightWeight: 1.6, mediumWeight: 1.8, heavyWeight: 2.1,},}, wagon: {basicRate: 130, yearCoef: {veryNew: 2, new: 2.2, old: 2.5, veryOld: 3,}, engineCoef: {diesel: 2.9, gas: 2.4,}, weightCoef: {lightWeight: 1.7, mediumWeight: 1.9, heavyWeight: 2.2,},}}
const dealer = (car) => {
    const carDamageRate = Math.round((100 - car.carCondition) * 10);
    const dealerPrices = dealerPriceList[car.carType];
    const carBasicRate = dealerPrices.basicRate;
    if (car.carCondition >= 100) return 'Car is OK. No need to maintenance. But you can buy accessories or order interior cleaning.';
    if (car.carCondition === 0) return 'Car is fully broken. Maintenance is impossible.';
    const carYearCoef = getYearCoef(dealerPrices.yearCoef, car.madeYear);
    if (!carYearCoef) return `We don't support car ${car.madeYear} year maded.`;
    const carEngineCoef = getEngineCoef(dealerPrices.engineCoef, car.engineType);
    if (!carEngineCoef) return 'We specialized only on gas or diesel fuel engines.';
    const carWeightCoef = getWeightCoef(dealerPrices.weightCoef, car.curbWeight);
    if (!carWeightCoef) return 'Sory, but we dont work with toy cars.';
    const maintenanceCost = Math.round(carDamageRate * (carBasicRate * (carYearCoef + carEngineCoef + carWeightCoef)));
    car.carCondition = 100;
    return `Ваше авто будо пошкоджене на ${carDamageRate / 10}. Після ремонту та сервісного обслуговування його стан відновлено до ${car.carCondition}. Вартість послуг складає ${maintenanceCost} грн.`
}   
function getYearCoef (dealerCoef, year) {
    if (year >= 2019 && year <= 2022) return dealerCoef.veryNew;
    if (year >= 2010 && year <= 2018) return dealerCoef.new;
    if (year >= 2000 && year <= 2009) return dealerCoef.old;
    if (year >= 1990 && year <= 1999) return dealerCoef.veryOld;   
    return null
}
function getEngineCoef (dealerCoef, engine) {
    if (engine === 'gas') return dealerCoef.gas;
    if (engine === 'diesel') return dealerCoef.diesel;
    return null
}
function getWeightCoef (dealerCoef, weight) {
    if (weight >= 800 && weight <= 1100) return dealerCoef.lightWeight;
    if (weight >= 1101 && weight <= 1400) return dealerCoef.mediumWeight;
    if (weight > 1400) return dealerCoef.heavyWeight;
    return null
}
console.log(dealer(myWifeHatchBack))