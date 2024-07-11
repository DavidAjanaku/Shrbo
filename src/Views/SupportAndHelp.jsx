import React from "react";
import BottomNavigation from "../Component/Navigation/BottomNavigation";
import HelpNavigation from "../Component/HelpNavigation";
import Footer from "../Component/Navigation/Footer";

export default function SupportAndHelp() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BottomNavigation />
      <HelpNavigation />
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="l rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Support and Help</h1>
            
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Support</h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:info@shortletbooking.com"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                >
                  Email Support
                </a>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                >
                  Call Support
                </a>
              </div>
            </section>
            
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">FAQs</h2>
              <p className="text-gray-600 mb-2">Browse Frequently Asked Questions</p>
              <a href="/FAQAccordion" className="text-orange-500 hover:text-orange-600 font-medium">Browse all FAQs →</a>
            </section>
            
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Report an Issue</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">Describe the Issue:</label>
                  <textarea
                    id="issue"
                    rows="4"
                    className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                    placeholder="Enter your issue description here"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">Attach Screenshots (if applicable)</label>
                  <input
                    id="file-upload"
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                </div>
              </div>
            </section>
            
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback and Suggestions</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Provide Feedback:</label>
                  <textarea
                    id="feedback"
                    rows="4"
                    className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                    placeholder="Enter your feedback here"
                  ></textarea>
                </div>
                <div>
                  <a
                    href="/submit-suggestions"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                  >
                    Submit suggestions
                  </a>
                </div>
              </div>
            </section>
            
            <div className="flex items-center justify-between mt-8">
              <a href="/settings" className="text-orange-500 hover:text-orange-600 font-medium">← Back to Settings</a>
              <button
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
