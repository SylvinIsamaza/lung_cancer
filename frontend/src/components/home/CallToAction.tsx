
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-medical-600 to-medical-800"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-1/3 translate-y-1/3 blur-2xl"></div>
          
          <div className="relative z-10 py-16 px-6 md:px-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex mb-6">
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  <Heart size={14} />
                  <span>Take Control of Your Health</span>
                </span>
              </div>
              
              <h2 className="heading-lg mb-6">Ready to Assess Your Lung Cancer Risk?</h2>
              
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Early detection is crucial for effectively treating lung cancer. Our assessment helps identify your personal risk factors so you can take proactive steps.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NavLink to="/assessment">
                  <Button size="lg" className="bg-white text-medical-700 hover:bg-gray-100 w-full sm:w-auto button-effect">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </NavLink>
                <NavLink to="/education">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 w-full sm:w-auto button-effect">
                    Learn About Risk Factors
                    <Shield className="ml-2 h-4 w-4" />
                  </Button>
                </NavLink>
              </div>
              
              <p className="text-sm text-white/60 mt-6">
                This tool is for informational purposes only and is not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
