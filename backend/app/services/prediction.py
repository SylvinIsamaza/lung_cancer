import joblib
import numpy as np
from app.models.patient import PatientData

class PredictionService:
    def __init__(self, model_path: str = "models/lung_cancer_model_rf.pkl"):
        try:
            self.model = joblib.load(model_path)
        except Exception as e:
            raise Exception(f"Error loading model: {str(e)}")

    def predict(self, data: PatientData) -> dict:
        
        input_data = [
            data.AGE, data.GENDER, data.SMOKING, data.FINGER_DISCOLORATION,
            data.MENTAL_STRESS, data.EXPOSURE_TO_POLLUTION, data.LONG_TERM_ILLNESS,
            data.ENERGY_LEVEL, data.IMMUNE_WEAKNESS, data.BREATHING_ISSUE,
            data.ALCOHOL_CONSUMPTION, data.THROAT_DISCOMFORT, data.OXYGEN_SATURATION,
            data.CHEST_TIGHTNESS, data.FAMILY_HISTORY, data.SMOKING_FAMILY_HISTORY,
            data.STRESS_IMMUNE
        ]
        input_array = np.array([input_data])
        # Predict
        prediction = self.model.predict(input_array)[0]
        probability = self.model.predict_proba(input_array)[0][1]
        return {
            "risk_level": "YES" if prediction == 1 else "NO",
            "probability": float(probability)
        }

# Singleton instance
predictor = PredictionService()