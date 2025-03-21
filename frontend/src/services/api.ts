
import { toast } from "sonner";

const API_BASE_URL = 'http://127.0.0.1:8000/v1';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    email: string;
    name: string;
  };
}

export interface UserProfile {
  email: string;
  name: string;
  role: string;
}

export interface RiskFactorData {
  AGE: number;
  GENDER: number;
  SMOKING: number;
  FINGER_DISCOLORATION: number;
  MENTAL_STRESS: number;
  EXPOSURE_TO_POLLUTION: number;
  LONG_TERM_ILLNESS: number;
  ENERGY_LEVEL: number;
  IMMUNE_WEAKNESS: number;
  BREATHING_ISSUE: number;
  ALCOHOL_CONSUMPTION: number;
  THROAT_DISCOMFORT: number;
  OXYGEN_SATURATION: number;
  CHEST_TIGHTNESS: number;
  FAMILY_HISTORY: number;
  SMOKING_FAMILY_HISTORY: number;
  STRESS_IMMUNE: number;
}

export interface RiskPredictionResponse {
  riskScore: number;
  riskFactors: string[];
}

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// Function to handle API errors
const handleApiError = (error: any): string => {
  console.error('API Error:', error);
  if (error.message) return error.message;
  return 'An unexpected  error occurred. Please try again.';
};

// Register a new user
export const registerUser = async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
  try {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', email);
    formData.append('password', password);
    formData.append('client_id', 'string');
    formData.append('client_secret', 'string');

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formData
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.detail || 'Registration failed' };
    }

    // Save auth token
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('isLoggedIn', 'true');
    
    return { success: true, data };
  } catch (error) {
    return { success: false, error: handleApiError(error) };
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
  try {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', email);
    formData.append('password', password);
    formData.append('client_id', 'string');
    formData.append('client_secret', 'string');

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formData
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.detail || 'Login failed' };
    }

    localStorage.setItem('token', data.access_token);
    localStorage.setItem('isLoggedIn', 'true');
  
    
    return { success: true, data };
  } catch (error) {
    return { success: false, error: handleApiError(error) };
  }
};

export const getCurrentUser = async (): Promise<ApiResponse<UserProfile>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();
    
    if (!response.ok) {

      return { success: false, error: data.detail || 'Failed to get user profile' };
    }
    
    return { success: true, data };
  } catch (error) {
    return { success: false, error: handleApiError(error) };
  }
};

export const predictRisk = async (riskData: RiskFactorData): Promise<ApiResponse<RiskPredictionResponse>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(riskData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.detail || 'Prediction failed' };
    }
  
    const riskScore = Math.round(data.probability * 100);
    const isAtRisk = data.risk_level === "YES";
    
    const riskFactors = determineRiskFactors(riskData, isAtRisk);
    
    return { 
      success: true, 
      data: {
        riskScore,
        riskFactors
      }
    };
  } catch (error) {
    return { success: false, error: handleApiError(error) };
  }
};

const determineRiskFactors = (data: RiskFactorData, isAtRisk: boolean): string[] => {
  const factors: string[] = [];
  
  if (data.AGE > 60) factors.push("Age above 60");
  if (data.SMOKING > 1) factors.push("Regular smoking habit");
  if (data.FINGER_DISCOLORATION === 1) factors.push("Finger discoloration (potential indicator of long-term smoking)");
  if (data.MENTAL_STRESS > 1) factors.push("Moderate to high mental stress levels");
  if (data.EXPOSURE_TO_POLLUTION === 1) factors.push("Exposure to environmental pollution or carcinogens");
  if (data.LONG_TERM_ILLNESS === 1) factors.push("History of long-term illness");
  if (data.ENERGY_LEVEL < 5) factors.push("Low energy levels");
  if (data.IMMUNE_WEAKNESS === 1) factors.push("Weakened immune system");
  if (data.BREATHING_ISSUE > 1) factors.push("Moderate to severe breathing difficulties");
  if (data.ALCOHOL_CONSUMPTION > 1) factors.push("Regular alcohol consumption");
  if (data.THROAT_DISCOMFORT === 1) factors.push("Persistent throat discomfort");
  if (data.OXYGEN_SATURATION < 95) factors.push("Lower oxygen saturation levels");
  if (data.CHEST_TIGHTNESS === 1) factors.push("Recurring chest tightness or discomfort");
  if (data.FAMILY_HISTORY > 0) factors.push(
    data.FAMILY_HISTORY === 1 
      ? "Family history of lung cancer in distant relatives" 
      : "Family history of lung cancer in immediate family"
  );
  if (data.SMOKING_FAMILY_HISTORY === 1) factors.push("Family history of smoking");
  if (data.STRESS_IMMUNE === 1) factors.push("Stress affecting immune function");
  
  // If the API indicates risk but we didn't identify specific factors
  if (isAtRisk && factors.length === 0) {
    factors.push("Risk identified by prediction algorithm");
  }
  
  return factors;
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem('token');
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('user');
  
  // Force refresh of login status across tabs
  window.dispatchEvent(new Event("storage"));
};
