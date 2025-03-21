
import { RiskFactors, calculateRiskScore } from "@/utils/riskCalculator";

export interface SavedAssessment extends RiskFactors {
  id: string;
  score: number;
  riskFactors: string[];
}

// Save a new assessment
export const saveAssessment = (data: RiskFactors): SavedAssessment => {
  try {
    // Generate unique ID for the assessment
    const id = `assessment-${Date.now()}`;
    
    // Calculate the risk score
    const { score, riskFactors } = calculateRiskScore(data);
    
    // Create the full assessment object
    const assessment: SavedAssessment = {
      ...data,
      id,
      score,
      riskFactors
    };
    
    // Get existing assessments
    const existingData = localStorage.getItem("assessments");
    const assessments: SavedAssessment[] = existingData 
      ? JSON.parse(existingData) 
      : [];
    
    // Add new assessment at the beginning (newest first)
    assessments.unshift(assessment);
    
    // Save back to localStorage
    localStorage.setItem("assessments", JSON.stringify(assessments));
    
    return assessment;
  } catch (error) {
    console.error("Failed to save assessment:", error);
    throw new Error("Failed to save your assessment data");
  }
};

// Get all assessments
export const getAssessments = (): SavedAssessment[] => {
  try {
    const data = localStorage.getItem("assessments");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to retrieve assessments:", error);
    return [];
  }
};

// Get a single assessment by ID
export const getAssessmentById = (id: string): SavedAssessment | null => {
  try {
    const assessments = getAssessments();
    return assessments.find(assessment => assessment.id === id) || null;
  } catch (error) {
    console.error("Failed to retrieve assessment:", error);
    return null;
  }
};

// Delete an assessment
export const deleteAssessment = (id: string): boolean => {
  try {
    const assessments = getAssessments();
    const updatedAssessments = assessments.filter(assessment => assessment.id !== id);
    localStorage.setItem("assessments", JSON.stringify(updatedAssessments));
    return true;
  } catch (error) {
    console.error("Failed to delete assessment:", error);
    return false;
  }
};
