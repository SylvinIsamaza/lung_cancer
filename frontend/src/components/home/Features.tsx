
import { Activity, Stethoscope, LineChart, Shield, UserCog, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Stethoscope className="h-10 w-10 text-medical-600" />,
      title: "Comprehensive Risk Analysis",
      description: "Our advanced algorithm considers over 20 different lung cancer risk factors to produce a nuanced risk assessment."
    },
    {
      icon: <Activity className="h-10 w-10 text-medical-600" />,
      title: "Personalized Health Insights",
      description: "Receive tailored recommendations based on your unique health profile and risk factors."
    },
    {
      icon: <LineChart className="h-10 w-10 text-medical-600" />,
      title: "Data-Driven Predictions",
      description: "Our system is trained on extensive medical datasets to provide accurate risk predictions."
    },
    {
      icon: <Shield className="h-10 w-10 text-medical-600" />,
      title: "Privacy First Approach",
      description: "All your health information is kept secure and confidential, with strong encryption protocols."
    },
    {
      icon: <UserCog className="h-10 w-10 text-medical-600" />,
      title: "Expert-Backed System",
      description: "Developed in consultation with oncologists and pulmonologists to ensure medical accuracy."
    },
    {
      icon: <Clock className="h-10 w-10 text-medical-600" />,
      title: "Quick Assessment Process",
      description: "Complete your risk assessment in less than 5 minutes and receive instant insights."
    }
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">
            Advanced Features for 
            <span className="text-medical-600"> Accurate Risk Assessment</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our lung cancer prediction system combines medical expertise with cutting-edge technology to provide reliable risk assessments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
