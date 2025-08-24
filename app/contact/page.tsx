'use client'

import { useState } from 'react'
import { useForm } from '@formspree/react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react'
import AdSpace from '@/components/ads/AdSpace'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  travelInterests: string[]
}

const travelInterests = [
  'Adventure Travel',
  'Cultural Experiences',
  'Beach Destinations',
  'Mountain Hiking',
  'City Exploration',
  'Food & Cuisine',
  'Photography Tours',
  'Budget Travel',
  'Luxury Travel',
  'Solo Travel'
]

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    travelInterests: []
  })

  // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      travelInterests: prev.travelInterests.includes(interest)
        ? prev.travelInterests.filter(i => i !== interest)
        : [...prev.travelInterests, interest]
    }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Create form data for Formspree
    const formDataForSubmit = new FormData()
    formDataForSubmit.append('name', formData.name)
    formDataForSubmit.append('email', formData.email)
    formDataForSubmit.append('subject', formData.subject)
    formDataForSubmit.append('message', formData.message)
    formDataForSubmit.append('travelInterests', formData.travelInterests.join(', '))

    await handleSubmit(e)
  }

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Message Sent Successfully! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out! We'll get back to you within 24 hours with personalized travel recommendations.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-travel-primary to-travel-secondary text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Let's Plan Your Next Adventure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-2xl mx-auto"
          >
            Get in touch for personalized travel recommendations, tips, and insider knowledge from fellow travelers.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-travel-dark mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-3 text-travel-primary" />
                Send Us a Message
              </h2>

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Your Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email Address *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Subject *</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="trip-planning">Trip Planning Assistance</option>
                    <option value="destination-advice">Destination Advice</option>
                    <option value="collaboration">Content Collaboration</option>
                    <option value="feedback">Website Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Travel Interests */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Travel Interests (Optional)</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {travelInterests.map((interest) => (
                      <label key={interest} className="cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary checkbox-sm mr-2"
                          checked={formData.travelInterests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                        />
                        <span className="text-sm">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Your Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered h-32 w-full"
                    placeholder="Tell us about your travel plans, questions, or how we can help..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    We'll respond within 24 hours
                  </p>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="btn btn-primary btn-lg"
                  >
                    {state.submitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {state.errors && Object.keys(state.errors).length > 0 && (
                  <div className="alert alert-error">
                    <AlertCircle className="w-5 h-5" />
                    <div>
                      {/* Display all error messages */}
                      {Object.values(state.errors).map((error, i) => (
                        <p key={i}>{error?.message}</p>
                      ))}
                    </div>
                  </div>
                )}
                
              </form>
            </motion.div>

            {/* Ad Space */}
            <div className="mt-8">
              <AdSpace 
                id="contact-banner"
                className="w-full h-32"
                placeholder="Contact Page Advertisement"
              />
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-travel-dark mb-6">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-travel-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-travel-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Us</h4>
                    <p className="text-gray-600 text-sm">hello@justembracechaos.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-travel-secondary/10 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle className="w-5 h-5 text-travel-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Response Time</h4>
                    <p className="text-gray-600 text-sm">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-travel-accent/10 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-travel-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Coverage</h4>
                    <p className="text-gray-600 text-sm">Worldwide destinations</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-travel-dark mb-6">
                Quick Answers
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Do you offer trip planning services?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Yes! We provide personalized recommendations and tips based on your interests and budget.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Is the advice free?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Basic travel advice and recommendations are completely free. We're passionate about helping fellow travelers!
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Can I contribute content?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Absolutely! We welcome guest posts and travel stories from our community. Get in touch to learn more.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sidebar Ad */}
            <AdSpace 
              id="contact-sidebar"
              className="w-full h-64"
              placeholder="Sidebar Advertisement"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
