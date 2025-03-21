from pydantic import BaseModel
from datetime import datetime
class PatientData(BaseModel):
    AGE: int
    GENDER: int
    SMOKING: int
    FINGER_DISCOLORATION: int
    MENTAL_STRESS: int
    EXPOSURE_TO_POLLUTION: int
    LONG_TERM_ILLNESS: int
    ENERGY_LEVEL: float
    IMMUNE_WEAKNESS: int
    BREATHING_ISSUE: int
    ALCOHOL_CONSUMPTION: int
    THROAT_DISCOMFORT: int
    OXYGEN_SATURATION: float
    CHEST_TIGHTNESS: int
    FAMILY_HISTORY: int
    SMOKING_FAMILY_HISTORY: int
    STRESS_IMMUNE: int
    RECORDED_BY: str
    RECORDED_DATE: str
    CREATED_AT: datetime
    RESULT:float
    def __init__(self, data: dict):
        self.AGE = data.get("AGE")
        self.GENDER = data.get("GENDER")
        self.SMOKING = data.get("SMOKING")
        self.FINGER_DISCOLORATION = data.get("FINGER_DISCOLORATION")
        self.MENTAL_STRESS = data.get("MENTAL_STRESS")
        self.EXPOSURE_TO_POLLUTION = data.get("EXPOSURE_TO_POLLUTION")
        self.LONG_TERM_ILLNESS = data.get("LONG_TERM_ILLNESS")
        self.ENERGY_LEVEL = data.get("ENERGY_LEVEL")
        self.IMMUNE_WEAKNESS = data.get("IMMUNE_WEAKNESS")
        self.BREATHING_ISSUE = data.get("BREATHING_ISSUE")
        self.ALCOHOL_CONSUMPTION = data.get("ALCOHOL_CONSUMPTION")  
        self.THROAT_DISCOMFORT = data.get("THROAT_DISCOMFORT")  
        self.OXYGEN_SATURATION = data.get("OXYGEN_SATURATION")
        self.CHEST_TIGHTNESS = data.get("CHEST_TIGHTNESS")
        self.FAMILY_HISTORY = data.get("FAMILY_HISTORY")
        self.SMOKING_FAMILY_HISTORY = data.get("SMOKING_FAMILY_HISTORY")
        self.STRESS_IMMUNE = data.get("STRESS_IMMUNE")
        self.RECORDED_BY = data.get("RECORDED_BY")
        self.RECORDED_DATE = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        super().__init__(**data)


