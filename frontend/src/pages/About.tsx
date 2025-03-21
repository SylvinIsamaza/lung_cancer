
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4">About LungCheck</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn about our mission, technology, and the team behind our lung cancer risk assessment tool.
            </p>
          </div>
          
          <Card className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              At LungCheck, our mission is to reduce the impact of lung cancer by empowering individuals with knowledge about their personal risk factors and promoting early detection.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Lung cancer is the leading cause of cancer death worldwide, but when detected early, survival rates can improve dramatically. We believe that by providing accessible, personalized risk assessments, we can help more people understand when they should consider screening and what preventive measures they can take.
            </p>
          </Card>
          
          <Card className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The LungCheck risk assessment tool is based on established risk models that have been validated in clinical studies. Our algorithm considers multiple factors known to influence lung cancer risk:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium mb-2">Demographic Factors</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Age</li>
                  <li>Gender</li>
                  <li>Race/ethnicity</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium mb-2">Smoking History</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Smoking status</li>
                  <li>Pack-years of smoking</li>
                  <li>Years since quitting</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium mb-2">Medical History</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Family history of lung cancer</li>
                  <li>Personal history of cancer</li>
                  <li>Lung diseases (COPD, emphysema)</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium mb-2">Environmental Exposures</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Radon</li>
                  <li>Asbestos</li>
                  <li>Occupational carcinogens</li>
                </ul>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300">
              Our algorithm is regularly updated to incorporate the latest research findings in lung cancer risk assessment. We work closely with medical professionals to ensure our tool remains accurate and reliable.
            </p>
          </Card>
          
          <Card className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              LungCheck was developed by a multidisciplinary team of medical professionals, data scientists, and healthcare technologists dedicated to improving lung cancer outcomes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-medical-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-medical-600 text-xl font-bold">DR</span>
                </div>
                <h3 className="font-semibold">Dr. Rebecca Martinez</h3>
                <p className="text-sm text-gray-500">Chief Medical Officer</p>
                <p className="text-sm text-gray-600 mt-2">Pulmonologist with 15 years of experience in lung cancer treatment</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-medical-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-medical-600 text-xl font-bold">JP</span>
                </div>
                <h3 className="font-semibold">James Peterson, PhD</h3>
                <p className="text-sm text-gray-500">Head of Data Science</p>
                <p className="text-sm text-gray-600 mt-2">Specializes in medical risk modeling and predictive analytics</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-medical-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-medical-600 text-xl font-bold">SK</span>
                </div>
                <h3 className="font-semibold">Sarah Kim</h3>
                <p className="text-sm text-gray-500">Patient Advocate</p>
                <p className="text-sm text-gray-600 mt-2">Lung cancer survivor and advocate for early detection</p>
              </div>
            </div>
          </Card>
          
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-4">Scientific Advisory Board</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our work is guided by a Scientific Advisory Board composed of leading experts in oncology, pulmonology, epidemiology, and public health.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Prof. Michael Johnson, MD, PhD</h3>
                <p className="text-sm text-gray-600">Director of Thoracic Oncology, University Medical Center</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold">Dr. Emily Chen, MD, MPH</h3>
                <p className="text-sm text-gray-600">Epidemiologist specializing in cancer prevention research</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold">Dr. Robert Williams, MD</h3>
                <p className="text-sm text-gray-600">Chief of Pulmonary Medicine, Memorial Hospital</p>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-gray-500 italic">
                LungCheck is committed to transparency and evidence-based risk assessment. Our tool is meant for educational purposes and does not replace consultation with healthcare providers.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;
