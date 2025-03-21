import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cigarette, Wind, Users, Stethoscope, Activity, AlertTriangle } from "lucide-react";

const Education = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4">Understanding Lung Cancer Risk</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn about the factors that contribute to lung cancer risk and steps you can take to reduce your risk.
            </p>
          </div>
          
          <Tabs defaultValue="risk-factors" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
              <TabsTrigger value="screening">Screening</TabsTrigger>
            </TabsList>
            
            <TabsContent value="risk-factors" className="animate-fade-in">
              <Card className="glass-card p-6">
                <h2 className="text-2xl font-semibold mb-4">Major Lung Cancer Risk Factors</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  While anyone can develop lung cancer, certain factors significantly increase the risk. Understanding these factors can help you assess your personal risk level.
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <Cigarette className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Tobacco Smoking</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Smoking is the leading risk factor for lung cancer, responsible for about 80-90% of lung cancer deaths. The risk increases with:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Number of cigarettes smoked per day</li>
                        <li>Duration of smoking (in years)</li>
                        <li>Age at which smoking began</li>
                        <li>Depth of inhalation</li>
                      </ul>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Risk decreases gradually after quitting, with significant reduction after 10-15 years.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                      <Wind className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Environmental Exposures</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Several environmental factors can increase lung cancer risk:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Radon gas (the second leading cause of lung cancer)</li>
                        <li>Secondhand smoke exposure</li>
                        <li>Asbestos exposure</li>
                        <li>Air pollution</li>
                        <li>Workplace exposures to carcinogens (arsenic, chromium, nickel)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Genetic and Personal Factors</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Other factors that contribute to lung cancer risk include:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Family history of lung cancer</li>
                        <li>Personal history of lung disease (COPD, tuberculosis)</li>
                        <li>Age (risk increases with age, especially after 65)</li>
                        <li>Previous radiation therapy to the chest</li>
                        <li>HIV infection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="prevention" className="animate-fade-in">
              <Card className="glass-card p-6">
                <h2 className="text-2xl font-semibold mb-4">Preventing Lung Cancer</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  While not all lung cancers can be prevented, there are steps you can take to significantly reduce your risk.
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Avoid Tobacco</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        The most important preventive measure is to never smoke or to quit if you currently smoke. Resources that can help include:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Nicotine replacement therapy</li>
                        <li>Prescription medications</li>
                        <li>Counseling and support groups</li>
                        <li>Quitlines (1-800-QUIT-NOW)</li>
                        <li>Mobile apps and online programs</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Wind className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Reduce Environmental Exposure</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Steps to reduce harmful environmental exposures include:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Test your home for radon and take action if levels are high</li>
                        <li>Avoid secondhand smoke</li>
                        <li>Follow safety guidelines when working with carcinogens</li>
                        <li>Use air purifiers and proper ventilation</li>
                        <li>Consider air quality when choosing where to live</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <Activity className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Healthy Lifestyle</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        General healthy habits that may reduce lung cancer risk:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Maintain a diet rich in fruits and vegetables</li>
                        <li>Exercise regularly</li>
                        <li>Limit alcohol consumption</li>
                        <li>Maintain a healthy weight</li>
                        <li>Get adequate sleep and manage stress</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="screening" className="animate-fade-in">
              <Card className="glass-card p-6">
                <h2 className="text-2xl font-semibold mb-4">Lung Cancer Screening</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Early detection through screening can significantly improve lung cancer survival rates for high-risk individuals.
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-medical-100 dark:bg-medical-900/30 rounded-full flex items-center justify-center">
                      <Stethoscope className="h-6 w-6 text-medical-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Who Should Get Screened</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        The U.S. Preventive Services Task Force recommends annual lung cancer screening with low-dose computed tomography (LDCT) for people who:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Are aged 50-80 years</li>
                        <li>Have a 20 pack-year smoking history (e.g., 1 pack/day for 20 years)</li>
                        <li>Currently smoke or have quit within the past 15 years</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                      <Activity className="h-6 w-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Benefits of Screening</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Lung cancer screening offers several important benefits:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Can detect lung cancer at an early stage when it's more treatable</li>
                        <li>Reduces lung cancer mortality by up to 20% in high-risk individuals</li>
                        <li>Provides opportunity for less invasive treatment options</li>
                        <li>May detect other lung conditions that need medical attention</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Considerations and Limitations</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Important considerations about lung cancer screening:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>False positives may lead to unnecessary additional testing</li>
                        <li>Small radiation exposure from LDCT scans</li>
                        <li>Not recommended for people with poor health who couldn't undergo treatment</li>
                        <li>Screening is not a substitute for quitting smoking</li>
                        <li>Insurance coverage varies; check with your provider</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Talk to your doctor</strong> about whether lung cancer screening is right for you based on your personal risk factors and health status.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Education;
