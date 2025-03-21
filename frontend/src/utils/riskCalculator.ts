
import { z } from "zod";

// Define the PatientData interface
export interface RiskFactors {
  AGE: number;
  GENDER: number; // 0: Female, 1: Male
  SMOKING: number; // 0: Never, 1: Occasional, 2: Regular, 3: Heavy
  FINGER_DISCOLORATION: number; // 0: No, 1: Yes
  MENTAL_STRESS: number; // 0: None, 1: Mild, 2: Moderate, 3: Severe
  EXPOSURE_TO_POLLUTION: number; // 0: No, 1: Yes
  LONG_TERM_ILLNESS: number; // 0: No, 1: Yes
  ENERGY_LEVEL: number; // 0-10 scale
  IMMUNE_WEAKNESS: number; // 0: No, 1: Yes
  BREATHING_ISSUE: number; // 0: None, 1: Mild, 2: Moderate, 3: Severe
  ALCOHOL_CONSUMPTION: number; // 0: None, 1: Occasional, 2: Moderate, 3: Heavy
  THROAT_DISCOMFORT: number; // 0: No, 1: Yes
  OXYGEN_SATURATION: number; // 70-100 percentage
  CHEST_TIGHTNESS: number; // 0: No, 1: Yes
  FAMILY_HISTORY: number; // 0: None, 1: Distant relatives, 2: Immediate family
  SMOKING_FAMILY_HISTORY: number; // 0: No, 1: Yes
  STRESS_IMMUNE: number; // 0: No, 1: Yes
}

export interface RiskResult {
  riskScore: number;
  riskFactors: string[];
}

// Calculate risk score and identify risk factors
export const calculateRisk = (data: RiskFactors): RiskResult => {
  let score = 0;
  const riskFactors: string[] = [];
  
  // Age factor (0-20 points)
  if (data.AGE < 40) {
    score += 0;
  } else if (data.AGE < 50) {
    score += 5;
  } else if (data.AGE < 60) {
    score += 10;
  } else if (data.AGE < 70) {
    score += 15;
  } else {
    score += 20;
    riskFactors.push("Age above 70");
  }
  
  // Gender factor (0-5 points) - males have slightly higher risk
  if (data.GENDER === 1) {
    score += 5;
  }
  
  // Smoking factor (0-30 points) - most significant risk factor
  switch (data.SMOKING) {
    case 0: // Never smoked
      score += 0;
      break;
    case 1: // Occasional
      score += 10;
      riskFactors.push("Occasional smoking");
      break;
    case 2: // Regular
      score += 20;
      riskFactors.push("Regular smoking habit");
      break;
    case 3: // Heavy
      score += 30;
      riskFactors.push("Heavy smoking");
      break;
  }
  
  // Finger discoloration (0-5 points) - indicator of long-term smoking
  if (data.FINGER_DISCOLORATION === 1) {
    score += 5;
    riskFactors.push("Finger discoloration (potential indicator of long-term smoking)");
  }
  
  // Mental stress (0-10 points)
  switch (data.MENTAL_STRESS) {
    case 0: // None
      score += 0;
      break;
    case 1: // Mild
      score += 3;
      break;
    case 2: // Moderate
      score += 6;
      riskFactors.push("Moderate mental stress levels");
      break;
    case 3: // Severe
      score += 10;
      riskFactors.push("Severe mental stress levels");
      break;
  }
  
  // Exposure to pollution (0-10 points)
  if (data.EXPOSURE_TO_POLLUTION === 1) {
    score += 10;
    riskFactors.push("Exposure to environmental pollution or carcinogens");
  }
  
  // Long-term illness (0-5 points)
  if (data.LONG_TERM_ILLNESS === 1) {
    score += 5;
    riskFactors.push("History of long-term illness");
  }
  
  // Energy level (0-10 points) - inverse scale: lower energy = higher risk
  const energyScore = Math.max(0, 10 - data.ENERGY_LEVEL);
  score += energyScore;
  if (data.ENERGY_LEVEL < 4) {
    riskFactors.push("Low energy levels");
  }
  
  // Immune weakness (0-5 points)
  if (data.IMMUNE_WEAKNESS === 1) {
    score += 5;
    riskFactors.push("Weakened immune system");
  }
  
  // Breathing issues (0-15 points)
  switch (data.BREATHING_ISSUE) {
    case 0: // None
      score += 0;
      break;
    case 1: // Mild
      score += 5;
      riskFactors.push("Mild breathing difficulties");
      break;
    case 2: // Moderate
      score += 10;
      riskFactors.push("Moderate breathing difficulties");
      break;
    case 3: // Severe
      score += 15;
      riskFactors.push("Severe breathing difficulties");
      break;
  }
  
  // Alcohol consumption (0-10 points)
  switch (data.ALCOHOL_CONSUMPTION) {
    case 0: // None
      score += 0;
      break;
    case 1: // Occasional
      score += 2;
      break;
    case 2: // Moderate
      score += 5;
      riskFactors.push("Regular alcohol consumption");
      break;
    case 3: // Heavy
      score += 10;
      riskFactors.push("Heavy alcohol consumption");
      break;
  }
  
  // Throat discomfort (0-10 points)
  if (data.THROAT_DISCOMFORT === 1) {
    score += 10;
    riskFactors.push("Persistent throat discomfort");
  }
  
  // Oxygen saturation (0-10 points) - lower oxygen = higher risk
  const oxygenScore = Math.max(0, Math.min(10, Math.round((100 - data.OXYGEN_SATURATION) / 3)));
  score += oxygenScore;
  if (data.OXYGEN_SATURATION < 92) {
    riskFactors.push("Lower oxygen saturation levels");
  }
  
  // Chest tightness (0-10 points)
  if (data.CHEST_TIGHTNESS === 1) {
    score += 10;
    riskFactors.push("Recurring chest tightness or discomfort");
  }
  
  // Family history (0-15 points)
  switch (data.FAMILY_HISTORY) {
    case 0: // None
      score += 0;
      break;
    case 1: // Distant relatives
      score += 5;
      riskFactors.push("Family history of lung cancer in distant relatives");
      break;
    case 2: // Immediate family
      score += 15;
      riskFactors.push("Family history of lung cancer in immediate family");
      break;
  }
  
  // Family smoking history (0-5 points)
  if (data.SMOKING_FAMILY_HISTORY === 1) {
    score += 5;
    riskFactors.push("Family history of smoking");
  }
  
  // Stress affecting immune system (0-5 points)
  if (data.STRESS_IMMUNE === 1) {
    score += 5;
    riskFactors.push("Stress affecting immune function");
  }
  
  // Normalize score to 0-100 range (from max possible 150)
  const normalizedScore = Math.min(100, Math.round((score / 150) * 100));
  
  return {
    riskScore: normalizedScore,
    riskFactors: riskFactors
  };
};
