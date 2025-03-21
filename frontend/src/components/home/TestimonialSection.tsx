
import { Separator } from "@/components/ui/separator";
import { QuoteIcon } from "lucide-react";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "The assessment helped me understand my risk factors and motivated me to make important lifestyle changes. My doctor was impressed with the detailed report.",
      author: "Sarah Johnson",
      role: "Former Smoker, 45"
    },
    {
      quote: "As a physician, I appreciate the scientific rigor behind this tool. I've recommended it to several patients to help them visualize their risk factors.",
      author: "Dr. Michael Chen",
      role: "Pulmonologist"
    },
    {
      quote: "Having lost my father to lung cancer, I was worried about my own risk. This tool provided clarity and actionable steps I could take.",
      author: "James Wilson",
      role: "Family History of Lung Cancer"
    }
  ];
  
  return (
    <section className="py-20 bg-medical-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">What People Are Saying</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Hear from individuals who have used our lung cancer risk assessment tool.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-8 rounded-xl">
              <QuoteIcon className="h-10 w-10 text-medical-300 mb-6" />
              <p className="mb-6 text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              <Separator className="mb-4" />
              <div>
                <h4 className="font-semibold">{testimonial.author}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
