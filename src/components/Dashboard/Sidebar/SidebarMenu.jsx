import { Home, Search, Bookmark, MessageCircle } from 'lucide-react';
import SidebarItem from './SidebarItem';

// const SidebarMenu = () => (
//   <div className="flex flex-col gap-4 px-4 py-6 flex-1 geist">
//     <SidebarItem icon={<Home />} label="Scroll" to="/dashboard" />
//     <SidebarItem icon={<Search />} label="Search" to="/search" />
//     <SidebarItem icon={<Bookmark />} label="Bookmarks" to="/bookmarks" />
//     <SidebarItem icon={<MessageCircle />} label="Chat" to="/chat" />
//   </div>
// );

const SidebarMenu = ({ onChatClick }) => (
  <div className="flex flex-col gap-4 px-4 py-6 flex-1 geist">
    <SidebarItem icon={<Home />} label="Scroll" to="/dashboard" />
    <SidebarItem icon={<Search />} label="Search" to="/search" />
    <SidebarItem icon={<Bookmark />} label="Bookmarks" to="/bookmarks" />
    <SidebarItem icon={<MessageCircle />} label="Chat" onClick={onChatClick} />
  </div>
);

export default SidebarMenu;
