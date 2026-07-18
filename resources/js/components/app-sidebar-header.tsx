import { router } from '@inertiajs/react';
import { Bell, CalendarDays, ChevronDown, LogOut, Search } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { logOff } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const displayDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date());

    return (
        <header className="sticky top-0 z-20 flex min-h-17 shrink-0 items-center gap-3 border-b border-stone-200 bg-white/95 px-4 backdrop-blur md:px-6">
            <span className="sr-only">{breadcrumbs.at(-1)?.title}</span>
            <SidebarTrigger className="size-9 shrink-0 text-stone-700" />

            <label className="relative hidden max-w-xl flex-1 lg:block">
                <span className="sr-only">Search AGRITRACK</span>
                <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-500" />
                <input
                    type="search"
                    placeholder="Search farmers, records, crops, land..."
                    className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50 pr-14 pl-10 text-sm text-stone-800 transition outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
                />
                <kbd className="absolute top-1/2 right-3 -translate-y-1/2 rounded border border-stone-200 bg-white px-2 py-0.5 text-[10px] text-stone-500">
                    ⌘ K
                </kbd>
            </label>

            <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative flex size-9 items-center justify-center rounded-full text-stone-700 hover:bg-stone-100"
                >
                    <Bell className="size-5" />
                    <span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
                        5
                    </span>
                </button>

                <div className="hidden h-8 items-center gap-2 border-x border-stone-200 px-4 text-sm text-stone-700 xl:flex">
                    <CalendarDays className="size-4" />
                    <span>{displayDate}</span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="group flex items-center gap-2 rounded-lg px-1.5 py-1 outline-none hover:bg-stone-100 focus-visible:ring-2 focus-visible:ring-emerald-700/20 data-[state=open]:bg-stone-100"
                        >
                            <span className="flex size-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-900">
                                SA
                            </span>
                            <span className="hidden max-w-40 truncate text-sm font-semibold text-emerald-950 sm:block">
                                System Administrator
                            </span>
                            <ChevronDown className="hidden size-4 text-stone-500 transition group-data-[state=open]:rotate-180 sm:block" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-56 rounded-lg border-stone-200 bg-white p-1.5 shadow-lg"
                    >
                        <DropdownMenuLabel className="px-2 py-2">
                            <span className="block text-xs font-normal text-stone-500">
                                Signed in as
                            </span>
                            <span className="block truncate text-sm font-semibold text-emerald-950">
                                System Administrator
                            </span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-stone-200" />
                        <DropdownMenuItem
                            onSelect={() => router.post(logOff.url())}
                            className="cursor-pointer rounded-md px-2 py-2 text-red-700 focus:bg-red-50 focus:text-red-800"
                        >
                            <LogOut className="size-4 text-red-600" />
                            Log Off
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
