import React from 'react';
import HelpNavigation from "../Component/HelpNavigation";
import BottomNavigation from '../Component/Navigation/BottomNavigation';
import Footer from '../Component/Navigation/Footer';

const ContactSupport = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BottomNavigation />
      <HelpNavigation />
      <div className="max-w-4xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
        <div className=" rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Hi Welcome, how can we help?
            </h1>
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Contact and Support Information
                </h2>
                <p className="text-gray-600 mb-6">
                  If you have any questions or require assistance, our dedicated support team is here to help you.
                </p>
              </section>

              <section className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600">
                    For inquiries, you can reach us at{' '}
                    <a href="mailto:info@shortletbooking.com" className="text-orange-500 hover:text-orange-600">
                      info@shortletbooking.com
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Telephone</h3>
                  <p className="text-gray-600">
                    Our phone support is available at{' '}
                    <a href="tel:+2347080646809" className="text-orange-500 hover:text-orange-600">
                      +2347080646809
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Address</h3>
                  <p className="text-gray-600">
                    You can also reach us at our physical address:
                    <br />
                    18, Akpera Oshi Close, Works And Housing Estate,
                    <br />
                    3rd Avenue Gwarinpa, Abuja, FCT, Nigeria.
                  </p>
                </div>
              </section>

              <div className="pt-6">
                <a
                  href="/support"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                >
                  Get More Help
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactSupport;
