import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';
import useAuth from '../hooks/useAuth';

const faqs = [
  {
    question: "Is MiniCRM free to use?",
    answer: "Yes, MiniCRM offers a free plan tailored for small teams. Premium features are available for growing businesses."
  },
  {
    question: "Can I import my existing customer data?",
    answer: "Absolutely! You can easily import your customer data from CSV or Excel files with just a few clicks."
  },
  {
    question: "Is my data secure?",
    answer: "Your data security is our top priority. We use industry-standard security practices to ensure your data is safe."
  },
  {
    question: "How long does setup take?",
    answer: "You can get started in minutes. Our intuitive interface makes onboarding a breeze."
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, we offer 24/7 customer support via email and chat for all paid plans."
  }
];

const features = [
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ), 
    title: "Customer Management", 
    desc: "Add, edit, and organize your customers with ease." 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ), 
    title: "Activity Tracking", 
    desc: "Track visits and interactions to stay ahead." 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ), 
    title: "Simple & Secure", 
    desc: "Your data is safe and the interface is easy for everyone." 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ), 
    title: "Lightning Fast", 
    desc: "Enjoy instant access and real-time updates." 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ), 
    title: "Data Integration", 
    desc: "Seamlessly connect with your existing tools and platforms." 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ), 
    title: "Compliance Ready", 
    desc: "Built with privacy regulations in mind." 
  }
];

const testimonials = [
  {
    quote: "MiniCRM helped us organize our customer data and grow our sales. Super easy to use!",
    name: "Priya",
    role: "Startup Owner",
    company: "TechStart Inc.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "The dashboard is beautiful and the features are just what we need.",
    name: "Ahmed",
    role: "Retail Manager",
    company: "Urban Retail",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "I love the simplicity and security. Highly recommended for small teams.",
    name: "Sarah",
    role: "Consultant",
    company: "Strategy Plus",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    quote: "MiniCRM has transformed how we interact with customers. The analytics are incredibly insightful.",
    name: "Michael",
    role: "Marketing Director",
    company: "Growth Co.",
    image: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    quote: "We tried several CRMs but MiniCRM is the only one that our team actually enjoys using.",
    name: "Emma",
    role: "Operations Manager",
    company: "Streamline Inc.",
    image: "https://randomuser.me/api/portraits/women/90.jpg"
  },
  {
    quote: "The customer support is exceptional. They helped us customize the system to fit our unique needs.",
    name: "David",
    role: "CEO",
    company: "Innovate Solutions",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    quote: "MiniCRM streamlined our sales process and helped us close deals 30% faster.",
    name: "Lisa",
    role: "Sales Director",
    company: "SalesPro",
    image: "https://randomuser.me/api/portraits/women/26.jpg"
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$9.99",
    period: "per month",
    features: ["Up to 500 contacts", "Basic analytics", "Email support", "3 users"],
    popular: false
  },
  {
    name: "Professional",
    price: "$29.99",
    period: "per month",
    features: ["Up to 5,000 contacts", "Advanced analytics", "Priority support", "10 users", "API access"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99.99",
    period: "per month",
    features: ["Unlimited contacts", "Full analytics suite", "24/7 dedicated support", "Unlimited users", "API access", "Custom integrations"],
    popular: false
  }
];

const benefits = [
  {
    title: "Save Time",
    desc: "Automate routine tasks and focus on what matters most - your customers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Increase Sales",
    desc: "Convert more leads with our intelligent sales pipeline management.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    title: "Improve Retention",
    desc: "Keep customers happy with personalized service and timely follow-ups.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  }
];

const stats = [
  { value: "98%", label: "Customer Satisfaction" },
  { value: "40%", label: "Increased Productivity" },
  { value: "24/7", label: "Support Availability" },
  { value: "5min", label: "Average Setup Time" }
];

export default function LandingPage() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  useEffect(() => {
    
    setIsVisible(true);
    
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-12 md:py-24 gap-8 md:gap-12 bg-gradient-to-r from-indigo-50 to-blue-50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          <div className="mb-4">
            <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Get a Grip on Your Business Future with MiniCRM
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Unify customer engagement across every channel. Track, manage, and grow-seamlessly.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-10">
            <a
              href="#"
              className="bg-indigo-600 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg shadow hover:bg-indigo-700 transition text-center transform hover:-translate-y-1 hover:shadow-lg"
            >
              Get Started
            </a>
            <a
              href="#"
              className="bg-white text-indigo-600 font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg shadow hover:bg-indigo-50 transition border border-indigo-100 text-center transform hover:-translate-y-1 hover:shadow-lg"
            >
              Learn more
            </a>
          </div>
          
          <div className="flex flex-wrap gap-6 md:gap-8">
            <div className="flex items-center">
              <div className="text-xl md:text-2xl font-bold text-indigo-700 mr-2">120+</div>
              <div className="text-sm md:text-base text-gray-600">Companies use</div>
            </div>
            <div className="flex items-center">
              <div className="text-xl md:text-2xl font-bold text-indigo-700 mr-2">85</div>
              <div className="text-sm md:text-base text-gray-600">Countries Available</div>
            </div>
          </div>
        </div>
        
        {/* Right Image */}
        <div className="flex-1 flex justify-center mt-8 md:mt-0">
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-200 rounded-2xl opacity-30 blur-xl"></div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="CRM Dashboard"
              className="relative rounded-2xl shadow-xl w-full max-w-md transform transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className={`py-12 md:py-16 px-4 md:px-8 bg-white transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-4 md:p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                <div className="text-2xl md:text-3xl font-bold text-indigo-700 mb-1 md:mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className={`py-16 md:py-20 px-4 md:px-8 bg-gray-50 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Everything you need to manage customer relationships effectively</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 hover:shadow-xl">
                <div className="text-indigo-600 mb-4 md:mb-6">{feature.icon}</div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className={`py-16 md:py-20 px-4 md:px-8 bg-white transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Choose MiniCRM</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Discover the benefits that set us apart from the competition</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-indigo-50 p-6 md:p-8 rounded-xl hover:bg-indigo-100 transition-colors duration-300">
                <div className="text-indigo-600 mb-4 md:mb-6">{benefit.icon}</div>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3">{benefit.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className={`py-16 md:py-20 px-4 md:px-8 bg-gray-50 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-3 ${plan.popular ? 'ring-2 ring-indigo-500 relative' : ''}`}>
                {plan.popular && (
                  <div className="bg-indigo-600 text-white text-center py-2 md:py-3 text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">{plan.name}</h3>
                  <div className="text-center mb-4 md:mb-6">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <ul className="mb-6 md:mb-8 space-y-2 md:space-y-3">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        <span className="text-sm md:text-base text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold transition transform hover:scale-105 text-sm md:text-base ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className={`py-16 md:py-20 px-4 md:px-8 bg-white transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-base md:text-lg text-gray-600">Join thousands of satisfied businesses using MiniCRM</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-indigo-50 rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center mb-6">
                <img 
                  src={testimonials[activeTestimonial].image} 
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg md:text-xl">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-sm md:text-base text-gray-600">{testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}</p>
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-700 italic">"{testimonials[activeTestimonial].quote}"</p>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full ${activeTestimonial === idx ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handlePrevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={handleNextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className={`py-16 md:py-20 px-4 md:px-8 bg-gray-50 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-base md:text-lg text-gray-600">Everything you need to know about MiniCRM</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                <button
                  className="w-full flex justify-between items-center text-left p-4 md:p-6 font-semibold text-gray-900 focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span className="text-sm md:text-base">{faq.question}</span>
                  <span className={`ml-4 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-4 md:px-6 pb-4 md:pb-6 text-sm md:text-base text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 md:px-8 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">MiniCRM</h4>
              <p className="text-sm">The customer management platform designed for modern businesses.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} MiniCRM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}