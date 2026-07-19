import { Link, usePage } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import {
    BarChart3,
    BookOpen,
    Boxes,
    ChevronDown,
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
import type { LucideIcon } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { edit as editSystemSettings } from '@/routes/system-settings';
import { index as userRolesIndex } from '@/routes/user-roles';
import { index as usersIndex } from '@/routes/users';

type SidebarItem = {
    title: string;
    icon: LucideIcon;
    page?: string;
    href?: NonNullable<InertiaLinkProps['href']>;
};

type SidebarSection = {
    title: string;
    icon: LucideIcon;
    items: SidebarItem[];
};

const menuSections: SidebarSection[] = [
    {
        title: 'Registry & Mapping',
        icon: MapPinned,
        items: [
            { title: 'Farmer Registry', icon: Users },
            { title: 'Farm & Land Records', icon: Map },
            { title: 'GIS Map', icon: MapPinned },
        ],
    },
    {
        title: 'Farm Operations',
        icon: Sprout,
        items: [
            { title: 'Crop Management', icon: Sprout },
            { title: 'Production Records', icon: ClipboardList },
            { title: 'Inventory & Inputs', icon: Boxes },
        ],
    },
    {
        title: 'Insights & Knowledge',
        icon: BarChart3,
        items: [
            { title: 'Market & Price Analysis', icon: BarChart3 },
            { title: 'Knowledge Hub', icon: BookOpen },
            { title: 'Reports & Analytics', icon: FileChartColumn },
        ],
    },
    {
        title: 'Administration',
        icon: ShieldCheck,
        items: [
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
        ],
    },
];

function isMenuItemActive(component: string, item: SidebarItem): boolean {
    if (!item.page) {
        return false;
    }

    if (item.page === 'users' || item.page === 'user-roles') {
        return component.startsWith(`${item.page}/`);
    }

    return component === item.page;
}

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
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={page.component === 'dashboard'}
                                    tooltip="Dashboard"
                                    className="h-10 rounded-md px-3 text-[13px] text-white data-[active=true]:bg-[#3d8c35] data-[active=true]:font-normal data-[active=true]:text-white data-[active=true]:shadow-sm"
                                >
                                    <Link href={dashboard()} prefetch>
                                        <LayoutDashboard className="size-[18px]" />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {menuSections.map((section) => {
                                const hasActiveItem = section.items.some(
                                    (item) =>
                                        isMenuItemActive(page.component, item),
                                );

                                return (
                                    <Collapsible
                                        key={`${section.title}-${page.component}`}
                                        asChild
                                        defaultOpen={hasActiveItem}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    type="button"
                                                    tooltip={section.title}
                                                    className="h-9 rounded-md px-3 text-[11px] font-semibold tracking-[0.08em] text-white/70 uppercase hover:bg-white/10 hover:text-white data-[state=open]:bg-white/5 data-[state=open]:text-white"
                                                >
                                                    <section.icon className="size-[17px]" />
                                                    <span>{section.title}</span>
                                                    <ChevronDown className="ml-auto size-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>

                                            <CollapsibleContent>
                                                <SidebarMenuSub className="mx-4 gap-0.5 border-white/15 px-2 py-1">
                                                    {section.items.map(
                                                        (item) => {
                                                            const isActive =
                                                                isMenuItemActive(
                                                                    page.component,
                                                                    item,
                                                                );

                                                            return (
                                                                <SidebarMenuSubItem
                                                                    key={
                                                                        item.title
                                                                    }
                                                                >
                                                                    <SidebarMenuSubButton
                                                                        asChild
                                                                        isActive={
                                                                            isActive
                                                                        }
                                                                        className="h-9 text-[12px] text-white/90 data-[active=true]:bg-[#3d8c35] data-[active=true]:text-white data-[active=true]:shadow-sm"
                                                                    >
                                                                        {item.href ? (
                                                                            <Link
                                                                                href={
                                                                                    item.href
                                                                                }
                                                                                prefetch
                                                                            >
                                                                                <item.icon className="size-4" />
                                                                                <span>
                                                                                    {
                                                                                        item.title
                                                                                    }
                                                                                </span>
                                                                            </Link>
                                                                        ) : (
                                                                            <button type="button">
                                                                                <item.icon className="size-4" />
                                                                                <span>
                                                                                    {
                                                                                        item.title
                                                                                    }
                                                                                </span>
                                                                            </button>
                                                                        )}
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            );
                                                        },
                                                    )}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                );
                            })}
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
