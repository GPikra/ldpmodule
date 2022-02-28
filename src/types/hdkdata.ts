export enum HDKdataAttribute {
    height = 'height',
    bodyMass = 'bodyMass',
    bodyMassIndex = 'bodyMassIndex',
    leanBodyMass = 'leanBodyMass',
    bodyFatPercentage = 'bodyFatPercentage',
    heartRate = 'heartRate',
    restingHeartRate = 'restingHeartRate',
    walkingHeartRateAverage = 'walkingHeartRateAverage',
    heartRateVariabilitySDN = 'heartRateVariabilitySDN',
    oxygenSaturation = 'oxygenSaturation',
    bodyTemperature = 'bodyTemperature',
    bloodPressureDiastolic = 'bloodPressureDiastolic',
    bloodPressureSystolic = 'bloodPressureSystolic',
    respiratoryRate = 'respiratoryRate',
    stepCount = 'stepCount',
    distanceWalkingRunning = 'distanceWalkingRunning',
    basalEnergyBurned = 'basalEnergyBurned',
    activeEnergyBurned = 'activeEnergyBurned',
    appleExerciseTime = 'appleExerciseTime',
    vo2Max = 'vo2Max',
    bloodGlucoseA = 'bloodGlucoseA',
    bloodGlucoseB = 'bloodGlucoseB',
    forcedExpiratoryVolume = 'forcedExpiratoryVolume',
    forcedVitalCapacity = 'forcedVitalCapacity',
    peakExpiratoryFlowRate = 'peakExpiratoryFlowRate',
    numberOfTimesFallen = 'numberOfTimesFallen',
    peripheralPerfusionIndex = 'peripheralPerfusionIndex',
}

export enum Units {
    cm = 'cm',
    gr = 'gr',
    unit = 'unit',
    percentage = 'percentage',
    beatPerMinute = 'beat per minute',
    ms = 'ms',
    saturation = 'saturation',
    celsius = 'celsius',
    mmHG = 'mmHG',
    respPerMinute = 'respPerMinute',
    kCal = 'kCal',
    steps = 'steps',
    milesPerTime = 'milesPerTime',
    mins = 'minutes',
    mlPerKg = 'mlPerKg',
    mgPerDl = 'mgPerDl',
    mmolPerL = 'mmolPerL',
    lPerMin = 'lPerMin',
}

export interface Interval {
    min: number;
    max: number;
}

export interface IHardCodedBins {
    bins: Interval[];
}

export interface IAutoBins {
    interval: Interval;
    buckets: number;
}

export interface INumericalAttributeConfig {
    attribute: HDKdataAttribute;
    bins: IHardCodedBins | IAutoBins;
    legalMin: number;
    legalMax: number;
    unit: Units;
}

export type IHistogramValue = {
    attribute: HDKdataAttribute;
    value: number | null;
};

export type IHistogramConfig = {
    attribute: HDKdataAttribute;
    config: INumericalAttributeConfig;
};
