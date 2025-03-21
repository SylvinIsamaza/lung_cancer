
import { ArrowRight, ShieldCheck, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with subtle pattern/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 opacity-50"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-medical-200 opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-[5%] w-72 h-72 rounded-full bg-medical-300 opacity-10 blur-3xl animate-pulse-subtle"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex animate-fade-in">
              <span className="inline-flex items-center gap-2 bg-medical-100 text-medical-700 px-3 py-1 rounded-full text-sm font-medium">
                <ShieldCheck size={14} />
                <span>Advanced Risk Assessment</span>
              </span>
            </div>
            
            <h1 className="heading-xl animate-fade-in">
              Early Detection for 
              <span className="text-medical-600 block">Better Health Outcomes</span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in animate-delay-100">
              LungCheck uses advanced analytics to provide personalized lung cancer risk assessments. Early awareness of risk factors can significantly improve survival rates through timely detection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animate-delay-200">
              <NavLink to="/assessment">
                <Button size="lg" className="w-full sm:w-auto bg-medical-600 hover:bg-medical-700 button-effect">
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </NavLink>
              <NavLink to="/education">
                <Button variant="outline" size="lg" className="w-full sm:w-auto button-effect">
                  Learn More
                </Button>
              </NavLink>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 animate-fade-in animate-delay-300">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medical-100 text-medical-600 mb-2">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Trusted by medical professionals</p>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medical-100 text-medical-600 mb-2">
                  <Users size={20} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Over 10,000 assessments</p>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medical-100 text-medical-600 mb-2">
                  <Award size={20} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">95% accuracy rate</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in animate-delay-200">
            <div className="absolute inset-0 bg-gradient-to-r from-medical-200 to-medical-300 opacity-20 rounded-3xl blur-xl transform rotate-3"></div>
            <div className="glass-card rounded-3xl p-1">
              <div className="relative rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1579154341098-e4e158cc7f49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80" 
                  alt="Medical professional with patient"
                  className="w-full h-auto object-cover rounded-3xl aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-bold text-xl mb-2">Personalized Analysis</h3>
                  <p className="text-sm text-gray-200">Our system analyzes multiple risk factors to provide tailored insights about your lung cancer risk profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
