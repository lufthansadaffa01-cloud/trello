import React from 'react';
import { TrelloLogo } from '../common/TrelloLogo';
import { Globe } from 'lucide-react';

interface WebsiteFooterProps {
  onOpenApp: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const WebsiteFooter: React.FC<WebsiteFooterProps> = ({
  onOpenApp,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-[#091E42] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand col */}
          <div className="col-span-2 space-y-4">
            <TrelloLogo variant="white" size="md" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Trello makes it easy for your team to get work done. Collaborate, manage projects, and reach new productivity peaks.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenApp}
                className="px-4 py-2 bg-[#0065FF] hover:bg-[#0747A6] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Launch Trello Board App
              </button>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('views')} className="hover:text-white transition-colors">
                  Views & Kanban
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('cards')} className="hover:text-white transition-colors">
                  Card Features
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('automation')} className="hover:text-white transition-colors">
                  Butler Automation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('powerups')} className="hover:text-white transition-colors">
                  Power-Ups & Apps
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('pricing')} className="hover:text-white transition-colors">
                  Pricing Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Templates
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('templates')} className="hover:text-white transition-colors">
                  Agile Sprint
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('templates')} className="hover:text-white transition-colors">
                  Project Management
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('templates')} className="hover:text-white transition-colors">
                  Content Marketing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('templates')} className="hover:text-white transition-colors">
                  Remote Team Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Atlassian
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><span className="hover:text-white cursor-pointer">About Atlassian</span></li>
              <li><span className="hover:text-white cursor-pointer">Careers</span></li>
              <li><span className="hover:text-white cursor-pointer">Community</span></li>
              <li><span className="hover:text-white cursor-pointer">Trust & Security</span></li>
              <li><span className="hover:text-white cursor-pointer">Contact Us</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <span>English (US)</span>
            <span className="mx-2">·</span>
            <span>Privacy Policy</span>
            <span className="mx-2">·</span>
            <span>Terms of Service</span>
          </div>

          <div>
            © 2026 Atlassian. All rights reserved. Built with love for team collaboration.
          </div>
        </div>
      </div>
    </footer>
  );
};
