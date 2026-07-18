import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    BookOpen,
    Boxes,
    ClipboardList,
    FileChartColumn,
    LayoutDashboard,
    Map,
    MapPinned,
    Settings,
    ShieldCheck,
    Sprout,
    UserCog,
    Users,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { edit as editSystemSettings } from '@/routes/system-settings';
import { index as userRolesIndex } from '@/routes/user-roles';
import { index as usersIndex } from '@/routes/users';

const menuItems = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        page: 'dashboard',
        href: dashboard(),
    },
    { title: 'Farmer Registry', icon: Users },
    { title: 'Farm & Land Records', icon: Map },
    { title: 'GIS Map', icon: MapPinned },
    { title: 'Crop Management', icon: Sprout },
    { title: 'Production Records', icon: ClipboardList },
    { title: 'Inventory & Inputs', icon: Boxes },
    { title: 'Market & Price Analytics', icon: BarChart3 },
    { title: 'Knowledge Hub', icon: BookOpen },
    { title: 'Reports & Analytics', icon: FileChartColumn },
    {
        title: 'User Management',
        icon: UserCog,
        page: 'users',
        href: usersIndex(),
    },
    {
        title: 'Role',
        icon: ShieldCheck,
        page: 'user-roles',
        href: userRolesIndex(),
    },
    {
        title: 'System Settings',
        icon: Settings,
        page: 'system-settings',
        href: editSystemSettings(),
    },
];

export function AppSidebar() {
    const page = usePage();

    return (
        <Sidebar
            collapsible="icon"
            variant="sidebar"
            className="border-r-0 [--sidebar-accent-foreground:#ffffff] [--sidebar-accent:rgb(255_255_255/0.11)] [--sidebar-border:rgb(255_255_255/0.12)] [--sidebar-foreground:#f7fff9] [--sidebar:#07572f] [&_[data-sidebar=sidebar]]:[background:radial-gradient(circle_at_45%_12%,#126d3d_0%,#07572f_48%,#034526_100%)]"
        >
            <SidebarHeader className="px-4 pt-3 pb-1 group-data-[collapsible=icon]:px-1">
                <Link
                    href={dashboard()}
                    className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white shadow-md group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:bg-white/10"
                    prefetch
                >
                    <img
                        src="/images/agritrack-logo.png"
                        alt="AGRITRACK"
                        className="absolute top-[-5px] left-1/2 w-[214px] max-w-none -translate-x-1/2 group-data-[collapsible=icon]:hidden"
                    />
                    <Sprout className="hidden size-7 text-amber-400 group-data-[collapsible=icon]:block" />
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-1 py-1">
                <SidebarGroup className="p-2">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {item.page ? (
                                        <SidebarMenuButton
                                            asChild
                                            isActive={
                                                item.page === 'users' ||
                                                item.page === 'user-roles'
                                                    ? page.component.startsWith(
                                                          `${item.page}/`,
                                                      )
                                                    : page.component ===
                                                      item.page
                                            }
                                            tooltip={item.title}
                                            className="h-10 rounded-md px-3 text-[13px] text-white data-[active=true]:bg-[#3d8c35] data-[active=true]:font-normal data-[active=true]:text-white data-[active=true]:shadow-sm"
                                        >
                                            <Link href={item.href} prefetch>
                                                <item.icon className="size-[18px]" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    ) : (
                                        <SidebarMenuButton
                                            type="button"
                                            tooltip={item.title}
                                            className="h-10 rounded-md px-3 text-[13px] font-normal text-white/95 hover:bg-white/10 hover:text-white"
                                        >
                                            <item.icon className="size-[18px]" />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="gap-1 px-3 pb-3">
                <SidebarSeparator className="mx-0" />
                <div className="px-3 py-1 text-center text-[10px] tracking-wider text-white/55 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:text-[8px]">
                    <span className="group-data-[collapsible=icon]:hidden">
                        AGRITRACK{' '}
                    </span>
                    {page.props.version}
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
