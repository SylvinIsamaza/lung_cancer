
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Download, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ResultsDisplayProps {
  riskScore: number;
  riskFactors: string[];
  onReset: () => void;
}

const ResultsDisplay = ({ riskScore, riskFactors, onReset }: ResultsDisplayProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getRiskCategory = (score: number) => {
    if (score < 30) return { category: "Low", color: "bg-green-500" };
    if (score < 60) return { category: "Moderate", color: "bg-yellow-500" };
    if (score < 80) return { category: "High", color: "bg-orange-500" };
    return { category: "Very High", color: "bg-red-500" };
  };
  
  const { category, color } = getRiskCategory(riskScore);
  
  // Prepare data for donut chart
  const safeRiskScore = Math.min(Math.max(riskScore, 0), 100); // Ensure score is between 0-100
  const donutData = [
    { name: "Risk", value: safeRiskScore },
    { name: "Safe", value: 100 - safeRiskScore }
  ];
  
  // Colors for the donut chart
  const COLORS = ['#22c55e',"#ef4444"];
  if (safeRiskScore < 50) {
    COLORS.reverse(); // Switch colors if risk is low
  }
  
  const getRecommendations = (category: string) => {
    switch (category) {
      case "Low":
        return [
          "Continue maintaining a healthy lifestyle",
          "Avoid smoking and secondhand smoke",
          "Consider routine check-ups every 1-2 years"
        ];
      case "Moderate":
        return [
          "Schedule a consultation with your primary care physician",
          "Discuss your risk factors and potential screening options",
          "Modify lifestyle factors that contribute to risk"
        ];
      case "High":
        return [
          "Consult with a pulmonologist or oncologist promptly",
          "Discuss lung cancer screening with low-dose CT scan",
          "Make immediate lifestyle changes to reduce risk"
        ];
      case "Very High":
        return [
          "Seek immediate consultation with a specialist",
          "Implement regular screening protocol as recommended by doctor",
          "Make significant lifestyle changes to reduce risk factors"
        ];
      default:
        return [];
    }
  };
  
  const recommendations = getRecommendations(category);
  
  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a PDF report
    console.log("Downloading PDF report");
    alert("This would download a detailed PDF report of your assessment in a real implementation.");
  };
  
  return (
    <div className="animate-fade-in">
      <Card className="glass-card border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Your Lung Cancer Risk Assessment</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Based on the information you provided, we've calculated your estimated risk profile.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Risk Score</span>
                  <span className="font-bold text-lg">{riskScore}%</span>
                </div>
                <div className={color}>
                  <Progress value={riskScore} className="h-3 rounded-full" />
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>Low Risk</span>
                  <span>Moderate Risk</span>
                  <span>High Risk</span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg" style={{ backgroundColor: `rgb(var(--${color.split('-')[1]}-100))` }}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`h-6 w-6 flex-shrink-0 text-${color.split('-')[1]}-600`} />
                  <div>
                    <h3 className="font-semibold mb-1">Your Risk Category: {category}</h3>
                    <p className="text-sm">
                      {category === "Low" && "Your risk factors suggest a lower than average risk of developing lung cancer."}
                      {category === "Moderate" && "Your risk is moderate, indicating some concerning factors that should be discussed with a healthcare provider."}
                      {category === "High" && "Your risk factors indicate a higher than average risk of developing lung cancer. Consultation with a specialist is recommended."}
                      {category === "Very High" && "Your risk factors suggest a significantly elevated risk of lung cancer. Immediate consultation with a specialist is strongly recommended."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => ` ${(percent * 100).toFixed(0)}%`}
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className={`h-5 w-5 rounded-full ${color} flex-shrink-0 mt-0.5`} />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Collapsible open={showDetails} onOpenChange={setShowDetails}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between items-center">
                <span>Risk Factors Details</span>
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h4 className="font-medium mb-3">Your Identified Risk Factors</h4>
                {riskFactors.length === 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-300">No significant risk factors identified.</p>
                ) : (
                  <ul className="space-y-2">
                    {riskFactors.map((factor, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-medical-600">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="grid grid-cols-1 ">
            <Button variant="outline" onClick={onReset} className="flex items-center">
              <RefreshCw className="mr-2 h-4 w-4" />
              Start New Assessment
            </Button>
   
          </div>
          
          <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
            <p>
              <strong>Disclaimer:</strong> This assessment is for informational purposes only and does not constitute medical advice. Please consult with a healthcare professional for a proper evaluation.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
