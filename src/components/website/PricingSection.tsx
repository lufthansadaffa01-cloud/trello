import React, { useState } from 'react';
import { PRICING_PLANS } from '../../data/initialData';
import { Check, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onOpenApp: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenApp }) => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is Trello really free?',
      a: 'Yes! Trello’s Free plan gives you unlimited cards, up to 10 boards per Workspace, unlimited Power-Ups, and up to 250 automation command runs per month—free forever with no credit card required.',
    },
    {
      q: 'What is the difference between Standard and Premium?',
      a: 'Standard gives you unlimited boards and advanced checklists with assignees and due dates. Premium unlocks all Trello Views (Calendar, Timeline, Table, and Dashboard) plus unlimited Butler automation runs and workspace-wide templates.',
    },
    {
      q: 'Can I switch or cancel my plan at any time?',
      a: 'Absolutely. You can upgrade, downgrade, or cancel your subscription whenever you want from your Workspace billing settings.',
    },
    {
      q: 'What are Power-Ups and how do they work?',
      a: 'Power-Ups are integrations that connect external tools like Slack, Jira, Google Drive, and GitHub directly to your Trello boards. On all plans, you get unlimited Power-Up integrations!',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            PLANS & PRICING
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091E42] tracking-tight">
            Trello priced your way
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Trusted by millions. Simple transparent pricing for individuals and teams of any size.
          </p>

          {/* Billing frequency toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                annualBilling
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annual Billing <span className="ml-1 text-emerald-600 font-extrabold">Save ~20%</span>
            </button>
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !annualBilling
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PRICING_PLANS.map((plan) => {
            const price = annualBilling ? plan.priceAnnually : plan.priceMonthly;
            return (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl border transition-all p-6 flex flex-col justify-between relative ${
                  plan.popular
                    ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/30'
                    : 'border-slate-200 shadow-xs hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <div className="mt-4 mb-2 flex items-baseline">
                    <span className="text-4xl font-extrabold text-[#091E42] tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 ml-1.5">
                      USD / user / month
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 min-h-[36px]">{plan.headline}</p>

                  <button
                    onClick={onOpenApp}
                    className={`w-full mt-6 py-2.5 px-4 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    {plan.buttonText}
                  </button>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
                      Features included:
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
