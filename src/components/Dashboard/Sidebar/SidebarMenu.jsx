import { Home, Mail, Search, Bookmark } from 'lucide-react';
import SidebarItem from './SidebarItem';

const SidebarMenu = () => (
  <div className="flex flex-col gap-4 px-4 py-6 flex-1 geist">
    <SidebarItem icon={<Home />} label="Scroll" to="/dashboard" />
    <SidebarItem icon={<Mail />} label="Inbox" to="/inbox" />
    <SidebarItem icon={<Search />} label="Search" to="/search" />
    <SidebarItem icon={<Bookmark />} label="Bookmarks" to="/bookmarks" />
  </div>
);

export default SidebarMenu;
