import React, { useState } from 'react';
import { TrelloLogo } from '../common/TrelloLogo';
import { ChevronDown, Menu, X, ArrowRight, Layout, Sparkles, Sliders, Layers, Users, Zap } from 'lucide-react';

interface WebsiteHeaderProps {
  onOpenApp: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({
  onOpenApp,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            aria-label="Trello Home"
          >
            <TrelloLogo size="md" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('features')}
                className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-expanded={activeDropdown === 'features'}
              >
                Features
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {activeDropdown === 'features' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-3 grid gap-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      onNavigateSection('views');
                      setActiveDropdown(null);
                    }}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                  >
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                      <Layout className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Views</div>
                      <div className="text-xs text-slate-500">Board, Timeline, Table, Calendar & Dashboard</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigateSection('cards');
                      setActiveDropdown(null);
                    }}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                  >
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Cards & Lists</div>
                      <div className="text-xs text-slate-500">Checklists, due dates, attachments & covers</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigateSection('automation');
                      setActiveDropdown(null);
                    }}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                  >
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Butler Automation</div>
                      <div className="text-xs text-slate-500">No-code workflow rules and buttons</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigateSection('powerups');
                      setActiveDropdown(null);
                    }}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                  >
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Power-Ups</div>
                      <div className="text-xs text-slate-500">Integrate Slack, Jira, Drive & GitHub</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('solutions')}
                className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-expanded={activeDropdown === 'solutions'}
              >
                Solutions
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-3 grid gap-1 z-50">
                  <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">By Team</div>
                  <button
                    onClick={() => {
                      onNavigateSection('templates');
                      setActiveDropdown(null);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-800 text-left"
                  >
                    <Users className="w-4 h-4 text-slate-500" /> Engineering & Sprints
                  </button>
                  <button
                    onClick={() => {
                      onNavigateSection('templates');
                      setActiveDropdown(null);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-800 text-left"
                  >
                    <Sparkles className="w-4 h-4 text-slate-500" /> Product Management
                  </button>
                  <button
                    onClick={() => {
                      onNavigateSection('templates');
                      setActiveDropdown(null);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-800 text-left"
                  >
                    <Layers className="w-4 h-4 text-slate-500" /> Marketing & Content
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                onNavigateSection('templates');
                setActiveDropdown(null);
              }}
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Templates
            </button>

            <button
              onClick={() => {
                onNavigateSection('pricing');
                setActiveDropdown(null);
              }}
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Pricing
            </button>
          </nav>
        </div>

        {/* Right side CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenApp}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Log in
          </button>

          {/* Interactive Board Switcher Button */}
          <button
            onClick={onOpenApp}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer group"
            title="Open Live Trello Board Workspace"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>Go to your boards</span>
            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenApp}
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#0065FF] hover:bg-[#0747A6] rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Get Trello for free
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-150">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                onNavigateSection('views');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Views & Kanban
            </button>
            <button
              onClick={() => {
                onNavigateSection('cards');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Card Anatomy
            </button>
            <button
              onClick={() => {
                onNavigateSection('automation');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Butler Automation
            </button>
            <button
              onClick={() => {
                onNavigateSection('templates');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Templates
            </button>
            <button
              onClick={() => {
                onNavigateSection('pricing');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Pricing & Plans
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenApp();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#0065FF] hover:bg-[#0747A6] rounded-lg shadow-sm"
            >
              Launch Live Trello Board
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
