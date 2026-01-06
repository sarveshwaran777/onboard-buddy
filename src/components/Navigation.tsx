import { useState, useEffect } from 'react';
import { ChevronRight, FileText, Layers, GitBranch, Wrench, MessageSquare, Shield, AlertTriangle, Rocket, Lock, Menu, X } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Problem Statement', icon: FileText },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'workflow', label: 'Workflow Specification', icon: GitBranch },
  { id: 'tooling', label: 'Tooling & Contracts', icon: Wrench },
  { id: 'interactions', label: 'NL Interactions', icon: MessageSquare },
  { id: 'audit', label: 'On-Chain Audit', icon: Shield },
  { id: 'errors', label: 'Error Handling', icon: AlertTriangle },
  { id: 'deployment', label: 'Deployment', icon: Rocket },
  { id: 'security', label: 'Security & Governance', icon: Lock },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-screen w-72 bg-sidebar border-r border-sidebar-border z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">Icarus</h1>
                <p className="text-xs text-muted-foreground">Onboarding Copilot</p>
              </div>
            </div>
          </div>

          {/* Navigation items */}
          <div className="flex-1 overflow-y-auto scrollbar-thin py-4">
            <div className="px-3 mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3">
                Specification
              </span>
            </div>
            <div className="space-y-1 px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary border-l-2 border-primary -ml-[2px]'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="glass rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                Built on <span className="text-primary font-medium">WeilChain</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Weil-SDK v2.0
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
