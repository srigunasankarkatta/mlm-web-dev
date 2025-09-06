import React, { useState } from "react";
import { FAQ_DATA } from "../data/mockData";
import CustomerLayout from "../components/CustomerLayout";

const FAQPage: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our MLM platform, income
              streams, and business model
            </p>
          </div>

          {/* Business Model Explanation */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              How Our Business Model Works
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    English
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Our MLM platform operates on a multi-level marketing
                      structure where members can earn from multiple income
                      streams. The system is designed to reward both direct
                      referrals and network growth.
                    </p>
                    <p>
                      <strong>Direct Income:</strong> Earn 6%, 9%, 12%, and 15%
                      from your first 4 direct referrals. This creates immediate
                      income potential for active members.
                    </p>
                    <p>
                      <strong>Level Income:</strong> As your network grows, earn
                      2% to 10% from members at different levels, creating
                      passive income streams that compound over time.
                    </p>
                    <p>
                      <strong>Club Income:</strong> Earn ₹0.50 for every new
                      member who joins the platform, regardless of your direct
                      connection to them.
                    </p>
                    <p>
                      <strong>Auto Pool:</strong> Automatic progression through
                      pool levels (4 → 16 → 64 members) provides additional
                      rewards as the platform grows.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    తెలుగు
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      మా MLM ప్లాట్‌ఫార్మ్ బహుళ-స్థాయి మార్కెటింగ్ నిర్మాణంపై
                      పనిచేస్తుంది, ఇక్కడ సభ్యులు బహుళ ఆదాయ వనరుల నుండి
                      సంపాదించవచ్చు.
                    </p>
                    <p>
                      <strong>డైరెక్ట్ ఆదాయం:</strong> మీ మొదటి 4 డైరెక్ట్
                      రిఫరల్స్ నుండి 6%, 9%, 12%, మరియు 15% సంపాదించండి.
                    </p>
                    <p>
                      <strong>స్థాయి ఆదాయం:</strong> మీ నెట్‌వర్క్ పెరుగుదలతో,
                      వివిధ స్థాయిలలో 2% నుండి 10% వరకు సంపాదించండి.
                    </p>
                    <p>
                      <strong>క్లబ్ ఆదాయం:</strong> ప్లాట్‌ఫార్మ్‌లో చేరే ప్రతి
                      కొత్త సభ్యుడికి ₹0.50 సంపాదించండి.
                    </p>
                    <p>
                      <strong>ఆటో పూల్:</strong> పూల్ స్థాయిల ద్వారా స్వయంచాలక
                      పురోగతి (4 → 16 → 64 సభ్యులు).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-teal-600 transform transition-transform ${
                        activeFAQ === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {activeFAQ === index && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          English
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          తెలుగు
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {faq.telugu}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our support team is here to help you understand everything about
              our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200">
                Contact Support
              </button>
              <button className="border-2 border-teal-500 text-teal-600 font-semibold py-3 px-8 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-200">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default FAQPage;
