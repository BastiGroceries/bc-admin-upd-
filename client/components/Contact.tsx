import { useEffect, useRef, useState } from "react";
import { Mail, MessageSquare, User, Send, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-blood p-12">
            <CheckCircle className="w-16 h-16 text-blood-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-foreground mb-4">Message Sent!</h3>
            <p className="text-foreground/80 mb-8">
              Thank you for reaching out. Our team will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-blood"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blood-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <span className="text-foreground">Get in </span>
            <span className="blood-text">Touch</span>
          </h2>
          <p className={`text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} style={{ animationDelay: "0.2s" }}>
            Ready to unleash the power of Blood Cloud? Have questions about our hosting?
            Our expert team is here to help you dominate the Minecraft world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className={`space-y-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`} style={{ animationDelay: "0.4s" }}>
            <div className="card-blood p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Why Choose Blood Cloud?
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "Lightning Response",
                    description: "24/7 support with average response time under 30 minutes"
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: "Enterprise Security",
                    description: "Military-grade protection for your servers and data"
                  },
                  {
                    icon: <Crown className="w-6 h-6" />,
                    title: "Premium Experience", 
                    description: "White-glove service for all Blood Cloud customers"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blood-500/20 to-neon-blue/20 rounded-lg flex items-center justify-center border border-blood-500/30">
                        <div className="text-blood-400">
                          {item.icon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                      <p className="text-foreground/70 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`} style={{ animationDelay: "0.6s" }}>
            <div className="card-blood p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder-foreground/50 transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.name 
                        ? "border-destructive focus:ring-destructive/50" 
                        : "border-border focus:ring-blood-500/50 hover:border-blood-400/50"
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder-foreground/50 transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.email 
                        ? "border-destructive focus:ring-destructive/50" 
                        : "border-border focus:ring-blood-500/50 hover:border-blood-400/50"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Subject field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder-foreground/50 transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.subject 
                        ? "border-destructive focus:ring-destructive/50" 
                        : "border-border focus:ring-blood-500/50 hover:border-blood-400/50"
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="text-destructive text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder-foreground/50 transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                      errors.message 
                        ? "border-destructive focus:ring-destructive/50" 
                        : "border-border focus:ring-blood-500/50 hover:border-blood-400/50"
                    }`}
                    placeholder="Tell us about your project or question..."
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-blood w-full group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <Send className={`w-5 h-5 transition-transform ${isSubmitting ? "animate-pulse" : "group-hover:translate-x-1"}`} />
                  </span>
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blood-600 to-neon-blue animate-pulse" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
