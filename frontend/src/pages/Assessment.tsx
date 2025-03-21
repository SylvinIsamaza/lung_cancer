
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AssessmentForm from "@/components/assessment/AssessmentForm";
import ResultsDisplay from "@/components/assessment/ResultsDisplay";
import AuthRequired from "@/components/auth/AuthRequired";
import { toast } from "sonner";
import { useAuthStatus } from "@/hooks/useAuthStatus";

const Assessment = () => {
  const [showResults, setShowResults] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStatus();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to access the assessment");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  
  const handleAssessmentComplete = (score: number, factors: string[]) => {
    setRiskScore(score);
    setRiskFactors(factors);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleReset = () => {
    setShowResults(false);
    setRiskScore(0);
    setRiskFactors([]);
  };
  
  return (
    <AuthRequired>
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="heading-lg mb-4">Lung Cancer Risk Assessment</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {showResults 
                  ? "Review your personalized lung cancer risk assessment below." 
                  : "Complete the form below to receive a personalized assessment of your lung cancer risk factors."}
              </p>
            </div>
            
            {showResults ? (
              <ResultsDisplay 
                riskScore={riskScore} 
                riskFactors={riskFactors} 
                onReset={handleReset} 
              />
            ) : (
              <AssessmentForm onComplete={handleAssessmentComplete} />
            )}
            
            <div className="mt-12 p-6 glass-panel rounded-xl">
              <h3 className="text-xl font-semibold mb-4">About This Assessment</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This lung cancer risk assessment tool is designed to help identify potential risk factors based on your personal health information and lifestyle choices. It uses a machine learning model and established risk factors for lung cancer.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The primary risk factors for lung cancer include:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                <li>Smoking history (the most significant risk factor)</li>
                <li>Age (risk increases with age)</li>
                <li>Family history of lung cancer</li>
                <li>Exposure to secondhand smoke, radon, asbestos, or other carcinogens</li>
                <li>Personal history of lung disease</li>
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Disclaimer: This tool provides an estimate of risk and is for informational purposes only. It does not constitute medical advice or a diagnosis. Always consult with a healthcare professional for proper evaluation and advice regarding your health.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </AuthRequired>
  );
};

export default Assessment;
