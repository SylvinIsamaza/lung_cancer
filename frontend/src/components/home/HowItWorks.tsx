
import { ArrowRight, FileText, BarChart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FileText className="h-8 w-8 text-white" />,
      title: "Complete the Assessment",
      description: "Answer a series of questions about your health, lifestyle, and family history to help us understand your unique risk profile.",
      color: "bg-medical-600"
    },
    {
      icon: <BarChart className="h-8 w-8 text-white" />,
      title: "Get Your Risk Score",
      description: "Our algorithm analyzes your responses and calculates a personalized risk score based on established medical research.",
      color: "bg-medical-700"
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-white" />,
      title: "Review Recommendations",
      description: "Receive tailored recommendations for risk reduction and next steps, including when to consider consulting a healthcare professional.",
      color: "bg-medical-800"
    }
  ];
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our simple three-step process provides you with valuable insights about your lung cancer risk factors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0`}>
                {step.icon}
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[4rem] right-0 h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 z-0"></div>
              )}
              
              <h3 className="text-xl font-semibold mb-3 text-center md:text-left">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center md:text-left">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <NavLink to="/assessment">
            <Button size="lg" className="bg-medical-600 hover:bg-medical-700 button-effect">
              Start Your Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
