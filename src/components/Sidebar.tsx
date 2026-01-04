import React, { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onItemClick?: (itemId: string) => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose, onItemClick }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [items, setItems] = useState<SidebarItem[]>([
    { id: 'messages', label: 'Messages', icon: '💬', badge: 0 },
    { id: 'contacts', label: 'Contacts', icon: '👥', badge: 0 },
    { id: 'groups', label: 'Groups', icon: '👫', badge: 0 },
    { id: 'settings', label: 'Settings', icon: '⚙️', badge: 0 },
  ]);

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Messenger</h2>
        {onClose && (
          <button
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            {item.icon && <span className="sidebar-icon">{item.icon}</span>}
            <span className="sidebar-label">{item.label}</span>
            {item.badge > 0 && (
              <span className="sidebar-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-action-btn">Help</button>
        <button className="sidebar-action-btn">Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
