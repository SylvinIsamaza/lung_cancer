
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialSection from "@/components/home/TestimonialSection";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <TestimonialSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
