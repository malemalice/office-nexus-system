
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Menu as MenuIcon, 
  Building2, 
  Settings, 
  ChevronDown, 
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
}

interface SubMenuProps {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  children: React.ReactNode;
}

const NavItem = ({ to, icon: Icon, label, isOpen }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      "flex items-center text-sm py-3 px-4 rounded-md transition-all",
      isActive 
        ? "bg-admin-primary text-white font-medium shadow-md" 
        : "text-gray-700 hover:bg-gray-100",
      !isOpen && "justify-center px-2"
    )}
  >
    <Icon size={20} className={cn(!isOpen && "mx-auto")} />
    {isOpen && <span className="ml-3">{label}</span>}
  </NavLink>
);

const SubMenu = ({ title, icon: Icon, isOpen, children }: SubMenuProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex items-center w-full text-sm py-3 px-4 rounded-md transition-all text-gray-700 hover:bg-gray-100",
          !isOpen && "justify-center px-2"
        )}
      >
        <Icon size={20} className={cn(!isOpen && "mx-auto")} />
        {isOpen && (
          <>
            <span className="ml-3 flex-1 text-left">{title}</span>
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </>
        )}
      </button>
      {isOpen && expanded && (
        <div className="pl-10 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "fixed h-full bg-white border-r border-admin-border shadow-sm z-30 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-center h-16 border-b px-4">
        {isOpen ? (
          <h1 className="text-xl font-bold text-admin-primary">Office Nexus</h1>
        ) : (
          <h1 className="text-xl font-bold text-admin-primary">ON</h1>
        )}
      </div>
      
      <div className="py-4 px-2 space-y-1">
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" isOpen={isOpen} />
        <NavItem to="/users" icon={Users} label="Users" isOpen={isOpen} />
        <NavItem to="/roles" icon={ShieldCheck} label="Roles" isOpen={isOpen} />
        <NavItem to="/menus" icon={MenuIcon} label="Menus" isOpen={isOpen} />
        
        <SubMenu title="Master Data" icon={Building2} isOpen={isOpen}>
          <NavLink 
            to="/master/offices"
            className={({ isActive }) => cn(
              "flex items-center text-sm py-2 px-4 rounded-md transition-all",
              isActive 
                ? "bg-admin-primary/10 text-admin-primary font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-admin-primary"
            )}
          >
            Offices
          </NavLink>
          <NavLink 
            to="/master/departments"
            className={({ isActive }) => cn(
              "flex items-center text-sm py-2 px-4 rounded-md transition-all",
              isActive 
                ? "bg-admin-primary/10 text-admin-primary font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-admin-primary"
            )}
          >
            Departments
          </NavLink>
          <NavLink 
            to="/master/positions"
            className={({ isActive }) => cn(
              "flex items-center text-sm py-2 px-4 rounded-md transition-all",
              isActive 
                ? "bg-admin-primary/10 text-admin-primary font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-admin-primary"
            )}
          >
            Positions
          </NavLink>
          <NavLink 
            to="/master/assets"
            className={({ isActive }) => cn(
              "flex items-center text-sm py-2 px-4 rounded-md transition-all",
              isActive 
                ? "bg-admin-primary/10 text-admin-primary font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-admin-primary"
            )}
          >
            Assets
          </NavLink>
        </SubMenu>
        
        <NavItem to="/settings" icon={Settings} label="Settings" isOpen={isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
