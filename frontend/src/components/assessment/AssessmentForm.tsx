
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { calculateRisk } from "@/utils/riskCalculator";
import { ArrowRight, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { predictRisk, RiskFactorData } from "@/services/api";

// Define the form schema with all PatientData fields
const formSchema = z.object({
  AGE: z.number().min(18, "Age must be at least 18").max(120, "Age must be less than 120"),
  GENDER: z.number().min(0).max(1),
  SMOKING: z.number().min(0).max(3),
  FINGER_DISCOLORATION: z.number().min(0).max(1),
  MENTAL_STRESS: z.number().min(0).max(3),
  EXPOSURE_TO_POLLUTION: z.number().min(0).max(1),
  LONG_TERM_ILLNESS: z.number().min(0).max(1),
  ENERGY_LEVEL: z.number().min(0).max(10),
  IMMUNE_WEAKNESS: z.number().min(0).max(1),
  BREATHING_ISSUE: z.number().min(0).max(3),
  ALCOHOL_CONSUMPTION: z.number().min(0).max(3),
  THROAT_DISCOMFORT: z.number().min(0).max(1),
  OXYGEN_SATURATION: z.number().min(70).max(100),
  CHEST_TIGHTNESS: z.number().min(0).max(1),
  FAMILY_HISTORY: z.number().min(0).max(2),
  SMOKING_FAMILY_HISTORY: z.number().min(0).max(1),
  STRESS_IMMUNE: z.number().min(0).max(1),
  RECORDED_BY: z.string().min(1, "Recorder name is required"),
  RECORDED_DATE: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const AssessmentForm = ({ onComplete }: { onComplete: (riskScore: number, riskFactors: string[]) => void }) => {
  const [formStep, setFormStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [useAPI, setUseAPI] = useState(true);
  const totalSteps = 4;
  
  // Get current user from localStorage
  const getUserInfo = () => {
    try {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
      return null;
    }
  };
  
  const user = getUserInfo();
  const currentDate = new Date().toISOString().split('T')[0];
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      AGE: 40,
      GENDER: 1, // Male by default
      SMOKING: 0,
      FINGER_DISCOLORATION: 0,
      MENTAL_STRESS: 0,
      EXPOSURE_TO_POLLUTION: 0,
      LONG_TERM_ILLNESS: 0,
      ENERGY_LEVEL: 7,
      IMMUNE_WEAKNESS: 0,
      BREATHING_ISSUE: 0,
      ALCOHOL_CONSUMPTION: 0,
      THROAT_DISCOMFORT: 0,
      OXYGEN_SATURATION: 98,
      CHEST_TIGHTNESS: 0,
      FAMILY_HISTORY: 0,
      SMOKING_FAMILY_HISTORY: 0,
      STRESS_IMMUNE: 0,
      RECORDED_BY: user?.name || "",
      RECORDED_DATE: currentDate,
    },
  });
  
  // Calculate progress based on form step
  const progress = (formStep / totalSteps) * 100;
  
  const nextStep = () => {
    if (formStep < totalSteps) {
      setFormStep(formStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    
    try {
      let riskScore = 0;
      let riskFactors: string[] = [];
      
      const riskData: RiskFactorData = {
        AGE: data.AGE,
        GENDER: data.GENDER,
        SMOKING: data.SMOKING>1?1:data.SMOKING,
        FINGER_DISCOLORATION: data.FINGER_DISCOLORATION>1?1:data.FINGER_DISCOLORATION,
        MENTAL_STRESS: data.MENTAL_STRESS>1?1:data.MENTAL_STRESS,
        EXPOSURE_TO_POLLUTION: data.EXPOSURE_TO_POLLUTION>1?1:data.EXPOSURE_TO_POLLUTION,
        LONG_TERM_ILLNESS: data.LONG_TERM_ILLNESS>1?1:data.LONG_TERM_ILLNESS,
        ENERGY_LEVEL: data.ENERGY_LEVEL>1?1:data.ENERGY_LEVEL,
        IMMUNE_WEAKNESS: data.IMMUNE_WEAKNESS>1?1:data.IMMUNE_WEAKNESS,
        BREATHING_ISSUE: data.BREATHING_ISSUE>1?1:data.BREATHING_ISSUE,
        ALCOHOL_CONSUMPTION: data.ALCOHOL_CONSUMPTION > 1 ? 1 : data.ALCOHOL_CONSUMPTION, 
        THROAT_DISCOMFORT: data.THROAT_DISCOMFORT>1?1:data.THROAT_DISCOMFORT,
        OXYGEN_SATURATION: data.OXYGEN_SATURATION,
        CHEST_TIGHTNESS: data.CHEST_TIGHTNESS>1?1:data.CHEST_TIGHTNESS,
 
        FAMILY_HISTORY: data.FAMILY_HISTORY>1?1:data.FAMILY_HISTORY,
        SMOKING_FAMILY_HISTORY: data.SMOKING_FAMILY_HISTORY>1?1:data.SMOKING_FAMILY_HISTORY,
        STRESS_IMMUNE: data.STRESS_IMMUNE>1?1:data.STRESS_IMMUNE
       
      };
      
      if (useAPI) {
        const response = await predictRisk(riskData);
        
        if (response.success && response.data) {
          riskScore = response.data.riskScore;
          riskFactors = response.data.riskFactors;
        } else {
          toast.error("API prediction failed. Using local calculation instead.");
          const result = calculateRisk(data);
          riskScore = result.riskScore;
          riskFactors = result.riskFactors;
        }
      } else {
        const result = calculateRisk(data);
        riskScore = result.riskScore;
        riskFactors = result.riskFactors;
      }
      
      // Save assessment to localStorage for history
      const assessmentHistory = JSON.parse(localStorage.getItem("assessmentHistory") || "[]");
      assessmentHistory.push({
        date: new Date().toISOString(),
        data,
        riskScore,
        riskFactors
      });
      localStorage.setItem("assessmentHistory", JSON.stringify(assessmentHistory));
      
      onComplete(riskScore, riskFactors);
      toast.success("Assessment completed successfully");
    } catch (error) {
      console.error("Error calculating risk:", error);
      toast.error("There was an error processing your assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <FormField
              control={form.control}
              name="AGE"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        className="w-full input-effect"
                      />
                      <Slider
                        min={18}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Your current age in years</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="GENDER"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value.toString()}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Male</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Your biological sex at birth is a factor in lung cancer risk assessment
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="FAMILY_HISTORY"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family History of Lung Cancer</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value.toString()}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      className="space-y-2"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">None</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Distant relatives (grandparents, aunts, uncles)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="2" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Immediate family (parents, siblings)</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Family history can indicate genetic predisposition to lung cancer
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <FormField
              control={form.control}
              name="SMOKING"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Smoking Status</FormLabel>
                  <FormControl>
                    <Select 
                      value={field.value.toString()} 
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select smoking status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Never smoked</SelectItem>
                        <SelectItem value="1">Occasional smoker</SelectItem>
                        <SelectItem value="2">Regular smoker</SelectItem>
                        <SelectItem value="3">Heavy smoker</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Smoking is the leading risk factor for lung cancer
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="SMOKING_FAMILY_HISTORY"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Family history of smoking</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value === 1}
                        onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Do you have close family members who smoke/smoked?
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="FINGER_DISCOLORATION"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Finger discoloration</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value === 1}
                        onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Yellow staining on fingers from smoking
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="EXPOSURE_TO_POLLUTION"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Exposure to pollution or carcinogens</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value === 1}
                        onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Regular exposure to air pollution, radon, asbestos, or other carcinogens
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ALCOHOL_CONSUMPTION"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alcohol Consumption</FormLabel>
                  <FormControl>
                    <Select 
                      value={field.value.toString()} 
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select alcohol consumption level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="1">Occasional (social drinking)</SelectItem>
                        <SelectItem value="2">Moderate (weekly)</SelectItem>
                        <SelectItem value="3">Heavy (daily)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Your alcohol consumption pattern
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <FormField
              control={form.control}
              name="ENERGY_LEVEL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Energy Level (0-10)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Very Low</span>
                        <span>Average</span>
                        <span>Very High</span>
                      </div>
                      <Slider
                        min={0}
                        max={10}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                      <div className="text-center font-medium">
                        {field.value}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>Your typical daily energy level</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="OXYGEN_SATURATION"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oxygen Saturation (%)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        min={70}
                        max={100}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 98)}
                        className="w-full input-effect"
                      />
                      <Slider
                        min={70}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Typical oxygen saturation level (if known, otherwise leave at default 98%)
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="BREATHING_ISSUE"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breathing Difficulty</FormLabel>
                  <FormControl>
                    <Select 
                      value={field.value.toString()} 
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select breathing difficulty level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="1">Mild - Only with heavy exertion</SelectItem>
                        <SelectItem value="2">Moderate - With light activity</SelectItem>
                        <SelectItem value="3">Severe - Even at rest</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Level of difficulty breathing</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="THROAT_DISCOMFORT"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Persistent throat discomfort</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value === 1}
                        onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Chronic sore throat, hoarseness, or discomfort
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="CHEST_TIGHTNESS"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Chest tightness or discomfort</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value === 1}
                        onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Recurring chest pain, pressure, or discomfort
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <FormField
              control={form.control}
              name="MENTAL_STRESS"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mental Stress Level</FormLabel>
                  <FormControl>
                    <Select 
                      value={field.value.toString()} 
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stress level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="1">Mild - Occasional stress</SelectItem>
                        <SelectItem value="2">Moderate - Regular stress</SelectItem>
                        <SelectItem value="3">Severe - Constant stress</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Your typical level of mental stress</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="STRESS_IMMUNE"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Stress affecting immune system</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value === 1}
                        onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Frequent illness when under stress
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="LONG_TERM_ILLNESS"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>History of long-term illness</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value === 1}
                        onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Chronic conditions lasting more than 3 months
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="IMMUNE_WEAKNESS"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Weakened immune system</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value === 1}
                        onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Known issues with immune function
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <Separator className="my-4" />
            
            <FormField
              control={form.control}
              name="RECORDED_BY"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment recorded by</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full input-effect"
                    />
                  </FormControl>
                  <FormDescription>Name of person recording this assessment</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="RECORDED_DATE"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Record date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="w-full input-effect"
                    />
                  </FormControl>
                  <FormDescription>Date of this assessment</FormDescription>
                </FormItem>
              )}
            />
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mt-8">
              <h4 className="font-medium mb-2">Ready to complete your assessment?</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click submit to receive your personalized lung cancer risk assessment. This assessment is for informational purposes only and is not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card className="glass-card border border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Lung Cancer Risk Assessment</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Step {formStep} of {totalSteps}: {
              formStep === 1 ? "Basic Information" : 
              formStep === 2 ? "Smoking & Environmental Factors" : 
              formStep === 3 ? "Health Indicators" : 
              "Additional Factors"
            }
          </p>
          <Progress value={progress} className="h-2 bg-gray-100 dark:bg-gray-700" />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-6 flex items-center space-x-2">
             
            </div>
            
            {renderFormStep()}
            
            <div className="flex justify-between mt-8">
              {formStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {formStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-medical-600 hover:bg-medical-700"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-medical-600 hover:bg-medical-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default AssessmentForm;
