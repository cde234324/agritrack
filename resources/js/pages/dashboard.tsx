import { Head } from '@inertiajs/react';
import {
    ArrowUp,
    ExternalLink,
    FileText,
    Map,
    MapPin,
    Package,
    Plus,
    Sprout,
    UserPlus,
    Users,
    Wheat,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { dashboard } from '@/routes';

type StatCardProps = {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    accent?: boolean;
};

const cropData = [
    { name: 'Rice', value: 35, color: '#3d8b2f' },
    { name: 'Corn', value: 25, color: '#e69a00' },
    { name: 'Coconut', value: 15, color: '#109a9a' },
    { name: 'Banana', value: 10, color: '#8ab73d' },
    { name: 'Cacao', value: 8, color: '#8a4b23' },
    { name: 'Coffee', value: 7, color: '#b8322b' },
];

const activities = [
    {
        title: 'New farmer registered',
        detail: 'Juan Dela Cruz from San Miguel, Bulacan',
        time: '2 hours ago',
        icon: UserPlus,
    },
    {
        title: 'Crop planting recorded',
        detail: '5.2 ha Rice in Barangay Magsaysay',
        time: '5 hours ago',
        icon: Sprout,
    },
    {
        title: 'Inputs inventory updated',
        detail: 'Urea Fertilizer - 320 bags added',
        time: '1 day ago',
        icon: Package,
    },
    {
        title: 'Production record added',
        detail: 'Corn harvest - 12.5 MT in Barangay Sta. Rosa',
        time: '2 days ago',
        icon: FileText,
    },
];

const knowledgeUpdates = [
    {
        title: 'Best Practices for Rice Farming',
        detail: 'Learn modern techniques to improve rice yield',
        date: 'May 20, 2025',
        category: 'Farming Guide',
        position: 'center 30%',
    },
    {
        title: 'Corn Pest Management Strategies',
        detail: 'Effective ways to control common corn pests',
        date: 'May 18, 2025',
        category: 'Crop Management',
        position: 'center 55%',
    },
    {
        title: 'Soil Health Improvement',
        detail: 'Tips for maintaining and improving soil fertility',
        date: 'May 15, 2025',
        category: 'Soil Management',
        position: 'center 80%',
    },
];

function StatCard({ title, value, change, icon: Icon, accent }: StatCardProps) {
    return (
        <article className="flex min-w-0 items-center gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <div
                className={`flex size-14 shrink-0 items-center justify-center rounded-full ${
                    accent
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-lime-50 text-emerald-800'
                }`}
            >
                <Icon className="size-7" strokeWidth={1.7} />
            </div>
            <div className="min-w-0">
                <p className="truncate text-sm text-stone-600">{title}</p>
                <p className="mt-0.5 text-2xl font-bold tracking-tight text-stone-900">
                    {value}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-stone-500">
                    <ArrowUp className="size-3 text-green-700" />
                    <span className="font-semibold text-green-700">
                        {change}
                    </span>
                    <span>from last month</span>
                </p>
            </div>
        </article>
    );
}

function ResourceMap() {
    const markers = [
        { left: '27%', top: '20%', color: 'bg-lime-500' },
        { left: '43%', top: '13%', color: 'bg-amber-500' },
        { left: '78%', top: '33%', color: 'bg-cyan-600' },
        { left: '58%', top: '53%', color: 'bg-lime-500' },
        { left: '36%', top: '65%', color: 'bg-amber-800' },
        { left: '66%', top: '71%', color: 'bg-red-600' },
    ];

    return (
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between px-4 py-3">
                <h2 className="font-semibold text-emerald-950">
                    Agricultural Resource Map
                </h2>
                <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-800"
                >
                    View Full Map <ExternalLink className="size-3.5" />
                </button>
            </div>
            <div className="relative mx-3 mb-3 h-72 overflow-hidden rounded-lg bg-emerald-900 sm:h-80 xl:h-72">
                <img
                    src="/images/agritrack-fields.png"
                    alt="Aerial agricultural resource map"
                    className="size-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-emerald-950/15" />
                <svg
                    className="absolute inset-0 size-full opacity-75"
                    viewBox="0 0 900 340"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        d="M30 260 L180 225 L245 85 L390 55 L470 220 L610 170 L700 55 L870 95"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    />
                    <path
                        d="M100 20 L150 130 L310 170 L360 330"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    />
                    <path
                        d="M510 10 L540 115 L690 230 L850 275"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    />
                    <path
                        d="M25 285 L225 300 L405 260 L590 315 L865 275"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    />
                </svg>

                <div className="absolute top-4 left-4 rounded-lg bg-white/95 p-3 text-xs shadow-lg">
                    {cropData.slice(0, 5).map((crop) => (
                        <div
                            key={crop.name}
                            className="flex items-center gap-2 py-1"
                        >
                            <span
                                className="size-2.5 rounded-full"
                                style={{ backgroundColor: crop.color }}
                            />
                            {crop.name}
                        </div>
                    ))}
                </div>

                {markers.map((marker) => (
                    <span
                        key={`${marker.left}-${marker.top}`}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: marker.left, top: marker.top }}
                    >
                        <span
                            className={`flex size-10 items-center justify-center rounded-full border-2 border-white text-white shadow-lg ${marker.color}`}
                        >
                            <MapPin className="size-5" />
                        </span>
                    </span>
                ))}
            </div>
        </section>
    );
}

function CropDistribution() {
    return (
        <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <h2 className="font-semibold text-emerald-950">
                Crop Distribution
            </h2>
            <div className="mt-3 flex flex-col items-center gap-5 sm:flex-row sm:justify-around xl:flex-col 2xl:flex-row">
                <div className="relative size-52 shrink-0 rounded-full [background:conic-gradient(#3d8b2f_0_35%,#e69a00_35%_60%,#109a9a_60%_75%,#8ab73d_75%_85%,#8a4b23_85%_93%,#b8322b_93%_100%)]">
                    <div className="absolute inset-12 flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
                        <span className="text-2xl font-bold text-stone-900">
                            1,276
                        </span>
                        <span className="text-xs text-stone-500">
                            Total Plantings
                        </span>
                    </div>
                </div>
                <div className="w-full max-w-48 space-y-2.5 text-sm">
                    {cropData.map((crop) => (
                        <div
                            key={crop.name}
                            className="flex items-center gap-2"
                        >
                            <span
                                className="size-2.5 rounded-full"
                                style={{ backgroundColor: crop.color }}
                            />
                            <span>{crop.name}</span>
                            <span className="ml-auto font-semibold">
                                {crop.value}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <p className="mt-3 text-xs text-stone-400">
                Data as of July 18, 2026
            </p>
        </section>
    );
}

function ProductionTrend() {
    return (
        <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-emerald-950">
                    Production Trend
                </h2>
                <select className="rounded-md border border-stone-200 bg-white px-2 py-1 text-xs text-stone-600">
                    <option>MT (Metric Tons)</option>
                </select>
            </div>
            <div className="mt-3 flex gap-4 text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                    <i className="size-2 rounded-full bg-green-700" />
                    This Year (MT)
                </span>
                <span className="flex items-center gap-1.5">
                    <i className="size-2 rounded-full bg-amber-500" />
                    Last Year (MT)
                </span>
            </div>
            <svg
                viewBox="0 0 520 220"
                className="mt-2 h-52 w-full"
                role="img"
                aria-label="Monthly production trend line chart"
            >
                {[35, 80, 125, 170].map((y) => (
                    <line
                        key={y}
                        x1="35"
                        y1={y}
                        x2="505"
                        y2={y}
                        stroke="#e7e5e4"
                        strokeWidth="1"
                    />
                ))}
                <path
                    d="M35 167 L78 132 L121 118 L164 91 L207 92 L250 65 L293 57 L336 70 L379 86 L422 112 L465 126 L505 151 L505 170 L35 170 Z"
                    fill="#6aaa4d"
                    opacity=".14"
                />
                <path
                    d="M35 167 L78 132 L121 118 L164 91 L207 92 L250 65 L293 57 L336 70 L379 86 L422 112 L465 126 L505 151"
                    fill="none"
                    stroke="#2f7d27"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />
                <path
                    d="M35 196 L78 177 L121 169 L164 159 L207 151 L250 126 L293 109 L336 103 L379 120 L422 145 L465 158 L505 177"
                    fill="none"
                    stroke="#e69a00"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />
                {[
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ].map((month, index) => (
                    <text
                        key={month}
                        x={35 + index * 42.7}
                        y="216"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#78716c"
                    >
                        {month}
                    </text>
                ))}
            </svg>
        </section>
    );
}

function RecentActivities() {
    return (
        <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-emerald-950">
                    Recent Activities
                </h2>
                <button
                    type="button"
                    className="text-xs font-semibold text-emerald-800"
                >
                    View All
                </button>
            </div>
            <div className="mt-2 divide-y divide-stone-100">
                {activities.map((activity) => (
                    <article
                        key={activity.title}
                        className="flex items-center gap-3 py-3"
                    >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime-50 text-emerald-800">
                            <activity.icon className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-semibold text-stone-800">
                                {activity.title}
                            </h3>
                            <p className="truncate text-xs text-stone-500">
                                {activity.detail}
                            </p>
                        </div>
                        <time className="shrink-0 text-[11px] text-stone-400">
                            {activity.time}
                        </time>
                    </article>
                ))}
            </div>
        </section>
    );
}

function KnowledgeUpdates() {
    return (
        <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-emerald-950">
                    Knowledge Updates
                </h2>
                <button
                    type="button"
                    className="text-xs font-semibold text-emerald-800"
                >
                    View All
                </button>
            </div>
            <div className="mt-2 divide-y divide-stone-100">
                {knowledgeUpdates.map((update) => (
                    <article key={update.title} className="flex gap-3 py-3">
                        <img
                            src="/images/agritrack-fields.png"
                            alt=""
                            className="h-14 w-20 shrink-0 rounded-md object-cover"
                            style={{ objectPosition: update.position }}
                        />
                        <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-stone-800">
                                {update.title}
                            </h3>
                            <p className="truncate text-xs text-stone-500">
                                {update.detail}
                            </p>
                            <p className="mt-1 text-[11px] text-stone-400">
                                {update.date}{' '}
                                <span className="mx-1 text-green-600">•</span>
                                <span className="text-green-700">
                                    {update.category}
                                </span>
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default function Dashboard() {
    return (
        <>
            <Head title="Agricultural Overview" />

            <main className="flex-1 bg-[#fbfaf6] p-4 text-stone-800 md:p-6">
                <div className="mx-auto max-w-[1700px]">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-emerald-950 md:text-3xl">
                                Agricultural Overview
                            </h1>
                            <p className="mt-1 max-w-2xl text-sm leading-5 text-stone-600">
                                AGRITRACK: An Agricultural Geographic Resource
                                Information and Tracking System for Recording,
                                Analytics, Crops, and Knowledge Management
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="flex h-11 items-center gap-2 rounded-lg bg-amber-500 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
                            >
                                <Plus className="size-5" /> Add Record
                            </button>
                            <button
                                type="button"
                                className="flex h-11 items-center gap-2 rounded-lg bg-emerald-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                            >
                                <Map className="size-5" /> View GIS Map
                            </button>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            title="Registered Farmers"
                            value="2,548"
                            change="8.6%"
                            icon={Users}
                        />
                        <StatCard
                            title="Total Farm Area"
                            value="8,420 ha"
                            change="5.3%"
                            icon={Map}
                        />
                        <StatCard
                            title="Active Crop Plantings"
                            value="1,276"
                            change="7.2%"
                            icon={Sprout}
                        />
                        <StatCard
                            title="Season Production"
                            value="14,680 MT"
                            change="9.4%"
                            icon={Wheat}
                            accent
                        />
                    </div>

                    <div className="mt-4 grid gap-4 xl:grid-cols-3">
                        <ResourceMap />
                        <CropDistribution />
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                        <ProductionTrend />
                        <RecentActivities />
                        <KnowledgeUpdates />
                    </div>
                </div>
            </main>
        </>
    );
}

Dashboard.layout = () => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
});
