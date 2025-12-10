import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  FlaskConical, 
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Overview' },
  { path: '/explorer', icon: Search, label: 'Explorer' },
  { path: '/simulator', icon: FlaskConical, label: 'Simulator' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">RiskPulse</span>
          </div>
        )}
        {collapsed && <Activity className="h-6 w-6 text-primary mx-auto" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'nav-item',
                isActive && 'nav-item-active'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <div className={cn(
          'glass-panel p-3',
          collapsed && 'flex items-center justify-center'
        )}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Acme Corp</p>
                <p className="text-xs text-muted-foreground">Enterprise</p>
              </div>
            </div>
          ) : (
            <Building2 className="h-4 w-4 text-primary" />
          )}
        </div>
      </div>
    </aside>
  );
}
