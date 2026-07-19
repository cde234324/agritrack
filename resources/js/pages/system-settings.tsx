import { Head, useHttp } from '@inertiajs/react';
import {
    Bell,
    BriefcaseBusiness,
    Check,
    CircleCheck,
    ClipboardList,
    Clock3,
    CloudUpload,
    Globe2,
    LockKeyhole,
    Mail,
    MapPin,
    MessageCircle,
    Monitor,
    Moon,
    RefreshCcw,
    Settings,
    ShieldCheck,
    SlidersHorizontal,
    Sun,
    Upload,
    UsersRound,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { dashboard } from '@/routes';
import {
    barangays as barangaysRoute,
    citiesMunicipalities as citiesMunicipalitiesRoute,
    provinces as provincesRoute,
    regions as regionsRoute,
} from '@/routes/psgc';
import { edit as editSystemSettings } from '@/routes/system-settings';

type SettingsSection = 'general' | 'notifications';

const navigationItems = [
    { title: 'General Settings', icon: Settings, section: 'general' },
    { title: 'Location & Mapping', icon: MapPin },
    { title: 'Notifications', icon: Bell, section: 'notifications' },
    { title: 'Security & Access', icon: LockKeyhole },
    { title: 'Backup & Maintenance', icon: CloudUpload },
    { title: 'Audit Logs', icon: ClipboardList },
] as const;

const initialSettings = {
    systemName: 'AGRITRACK',
    organizationName: 'Municipal Agriculture Office',
    description:
        'Agricultural Geographic Resource Information and Tracking System',
    administratorEmail: 'admin@agritrack.gov.ph',
    province: '',
    region: '',
    cityMunicipality: '',
    barangay: '',
    timeZone: '(UTC+08:00) Asia/Manila',
    dateFormat: 'MM/DD/YYYY',
    measurementUnit: 'Metric',
    mapView: 'Satellite',
    recordsPerPage: '25',
    dashboardAnalytics: true,
    weatherInformation: true,
    theme: 'Light',
};

const themeOptions = [
    {
        label: 'Light',
        mode: 'light',
        icon: Sun,
        palette: ['#fbfaf6', '#166534', '#e5a000'],
    },
    {
        label: 'Dark',
        mode: 'dark',
        icon: Moon,
        palette: ['#061b12', '#22c55e', '#f4b942'],
    },
] as const;

type NotificationChannelKey = 'email' | 'inApp' | 'sms' | 'push';
type AlertDeliveryKey = 'inApp' | 'email' | 'sms';
type AlertPriority = 'Normal' | 'High' | 'Critical';

type AlertPreference = {
    type: string;
    inApp: boolean;
    email: boolean;
    sms: boolean;
    priority: AlertPriority;
};

type NotificationSettingsState = {
    channels: Record<NotificationChannelKey, boolean>;
    alerts: AlertPreference[];
    administratorEmail: string;
    recipientGroup: string;
    dailySummaryTime: string;
    frequency: string;
    sendDailySummary: boolean;
    muteAfterHours: boolean;
};

const initialNotificationSettings: NotificationSettingsState = {
    channels: {
        email: true,
        inApp: true,
        sms: false,
        push: true,
    },
    alerts: [
        {
            type: 'New Farmer Registration',
            inApp: true,
            email: true,
            sms: false,
            priority: 'Normal',
        },
        {
            type: 'Farm Record Updates',
            inApp: true,
            email: true,
            sms: false,
            priority: 'Normal',
        },
        {
            type: 'Crop Production Alerts',
            inApp: true,
            email: true,
            sms: true,
            priority: 'High',
        },
        {
            type: 'Inventory Low Stock',
            inApp: true,
            email: true,
            sms: false,
            priority: 'High',
        },
        {
            type: 'Market Price Changes',
            inApp: true,
            email: false,
            sms: false,
            priority: 'Normal',
        },
        {
            type: 'System & Security Alerts',
            inApp: true,
            email: true,
            sms: true,
            priority: 'Critical',
        },
    ],
    administratorEmail: 'admin@agritrack.gov.ph',
    recipientGroup: 'System Administrators',
    dailySummaryTime: '17:00',
    frequency: 'Real-time',
    sendDailySummary: true,
    muteAfterHours: true,
};

type PsgcLocation = {
    code: string;
    name: string;
    regionName?: string;
    isCity?: boolean;
    isMunicipality?: boolean;
};

type LocationLevel =
    'regions' | 'provinces' | 'citiesMunicipalities' | 'barangays';

const romanToNumber = (roman: string): number => {
    const values: Record<string, number> = { I: 1, V: 5, X: 10 };

    return [...roman].reduce((total, numeral, index, numerals) => {
        const value = values[numeral] ?? 0;
        const nextValue = values[numerals[index + 1]] ?? 0;

        return total + (value < nextValue ? -value : value);
    }, 0);
};

const regionLabel = (region: PsgcLocation): string => {
    const regionName = region.regionName ?? '';
    const numberedRegion = regionName.replace(
        /^Region ([IVX]+)/,
        (_, roman: string) => `Region ${romanToNumber(roman)}`,
    );

    return numberedRegion && numberedRegion !== region.name
        ? `${numberedRegion} - ${region.name}`
        : region.name;
};

type SettingsState = typeof initialSettings;

function SectionCard({
    icon: Icon,
    title,
    children,
}: {
    icon: typeof Settings;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-emerald-800/60 dark:bg-[#0b281b]">
            <div className="mb-4 flex items-center gap-2 text-emerald-900 dark:text-emerald-300">
                <span className="flex size-8 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950">
                    <Icon className="size-4.5" />
                </span>
                <h2 className="font-semibold">{title}</h2>
            </div>
            {children}
        </section>
    );
}

function Field({
    label,
    children,
    className = '',
}: {
    label: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <label
            className={`grid min-w-0 gap-1.5 text-xs font-medium text-stone-700 dark:text-emerald-100/80 ${className}`}
        >
            {label}
            {children}
        </label>
    );
}

function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-green-700 dark:bg-emerald-500' : 'bg-stone-300 dark:bg-emerald-950'}`}
        >
            <span
                className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition ${checked ? 'left-6' : 'left-1'}`}
            />
        </button>
    );
}

function NotificationCheckbox({
    checked,
    label,
    disabled = false,
    onChange,
}: {
    checked: boolean;
    label: string;
    disabled?: boolean;
    onChange: () => void;
}) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            aria-label={label}
            disabled={disabled}
            onClick={onChange}
            className={`mx-auto flex size-5 items-center justify-center rounded border transition disabled:cursor-not-allowed disabled:opacity-70 ${checked ? 'border-green-700 bg-green-700 text-white dark:border-emerald-500 dark:bg-emerald-600' : 'border-stone-300 bg-white text-transparent hover:border-green-600 dark:border-emerald-800 dark:bg-[#071f15]'}`}
        >
            <Check className="size-3.5" strokeWidth={3} />
        </button>
    );
}

function PriorityBadge({ priority }: { priority: AlertPriority }) {
    const className = {
        Normal:
            'border-green-200 bg-green-50 text-green-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
        High: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300',
        Critical:
            'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300',
    }[priority];

    return (
        <span
            className={`inline-flex rounded-md border px-2.5 py-1 text-[11px] font-medium ${className}`}
        >
            {priority}
        </span>
    );
}

const notificationChannels = [
    {
        key: 'email',
        title: 'Email Notifications',
        description: 'Send alerts and reports through email',
        icon: Mail,
    },
    {
        key: 'inApp',
        title: 'In-App Notifications',
        description: 'Display alerts inside the AGRITRACK dashboard',
        icon: Monitor,
    },
    {
        key: 'sms',
        title: 'SMS Notifications',
        description: 'Send urgent alerts through text message',
        icon: MessageCircle,
    },
    {
        key: 'push',
        title: 'Push Notifications',
        description: 'Deliver browser and device notifications',
        icon: Bell,
    },
] as const;

const notificationInputClassName =
    'block h-10 w-full min-w-0 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 dark:border-emerald-800/70 dark:bg-[#071f15] dark:text-emerald-50 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20';

function NotificationSettingsPanel() {
    const [notificationSettings, setNotificationSettings] =
        useState<NotificationSettingsState>(initialNotificationSettings);
    const [saved, setSaved] = useState(false);

    const updateChannel = (channel: NotificationChannelKey, value: boolean) => {
        setNotificationSettings((current) => ({
            ...current,
            channels: { ...current.channels, [channel]: value },
        }));
        setSaved(false);
    };

    const updateAlertDelivery = (
        alertIndex: number,
        delivery: AlertDeliveryKey,
    ) => {
        setNotificationSettings((current) => ({
            ...current,
            alerts: current.alerts.map((alert, index) =>
                index === alertIndex
                    ? { ...alert, [delivery]: !alert[delivery] }
                    : alert,
            ),
        }));
        setSaved(false);
    };

    const updateNotificationSetting = <
        Key extends keyof NotificationSettingsState,
    >(
        key: Key,
        value: NotificationSettingsState[Key],
    ) => {
        setNotificationSettings((current) => ({ ...current, [key]: value }));
        setSaved(false);
    };

    const resetNotifications = () => {
        setNotificationSettings({
            ...initialNotificationSettings,
            channels: { ...initialNotificationSettings.channels },
            alerts: initialNotificationSettings.alerts.map((alert) => ({
                ...alert,
            })),
        });
        setSaved(false);
    };

    const saveNotifications = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaved(true);
    };

    return (
        <form onSubmit={saveNotifications} className="grid gap-4">
            <div className="grid gap-4 xl:grid-cols-[minmax(300px,0.8fr)_minmax(520px,1.2fr)]">
                <SectionCard icon={Mail} title="Notification Channels">
                    <div className="grid gap-2">
                        {notificationChannels.map((channel) => (
                            <div
                                key={channel.key}
                                className="flex items-center gap-3 rounded-lg px-1 py-1.5"
                            >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-green-100 bg-green-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                    <channel.icon className="size-5" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-medium text-stone-800 dark:text-emerald-50">
                                        {channel.title}
                                    </span>
                                    <span className="mt-0.5 block text-xs leading-5 text-stone-500 dark:text-emerald-100/60">
                                        {channel.description}
                                    </span>
                                </span>
                                <Toggle
                                    label={`Toggle ${channel.title}`}
                                    checked={
                                        notificationSettings.channels[
                                            channel.key
                                        ]
                                    }
                                    onChange={(value) =>
                                        updateChannel(channel.key, value)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="mt-4 flex h-10 items-center justify-center gap-2 rounded-lg border border-amber-500 px-4 text-xs font-medium text-amber-600 transition hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40"
                    >
                        <SlidersHorizontal className="size-4" /> Configure
                        Channels
                    </button>
                </SectionCard>

                <SectionCard icon={Bell} title="Alert Preferences">
                    <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-emerald-800/60">
                        <table className="w-full min-w-[620px] border-collapse text-left text-xs">
                            <thead className="bg-stone-50 text-stone-600 dark:bg-[#123c29] dark:text-emerald-100/70">
                                <tr>
                                    <th className="px-3 py-2.5 font-medium">
                                        Notification Type
                                    </th>
                                    <th className="w-16 px-2 py-2.5 text-center font-medium">
                                        In-App
                                    </th>
                                    <th className="w-16 px-2 py-2.5 text-center font-medium">
                                        Email
                                    </th>
                                    <th className="w-16 px-2 py-2.5 text-center font-medium">
                                        SMS
                                    </th>
                                    <th className="w-24 px-3 py-2.5 text-center font-medium">
                                        Priority
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-200 dark:divide-emerald-900/70">
                                {notificationSettings.alerts.map(
                                    (alert, alertIndex) => (
                                        <tr
                                            key={alert.type}
                                            className="text-stone-700 dark:text-emerald-100/80"
                                        >
                                            <td className="px-3 py-2.5 font-medium">
                                                {alert.type}
                                            </td>
                                            {(
                                                [
                                                    'inApp',
                                                    'email',
                                                    'sms',
                                                ] as AlertDeliveryKey[]
                                            ).map((delivery) => {
                                                const isProtected =
                                                    alert.type ===
                                                        'System & Security Alerts' &&
                                                    delivery === 'inApp';

                                                return (
                                                    <td
                                                        key={delivery}
                                                        className="px-2 py-2.5 text-center"
                                                    >
                                                        <NotificationCheckbox
                                                            checked={
                                                                alert[delivery]
                                                            }
                                                            disabled={
                                                                isProtected
                                                            }
                                                            label={`${alert.type} ${delivery}`}
                                                            onChange={() =>
                                                                updateAlertDelivery(
                                                                    alertIndex,
                                                                    delivery,
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                );
                                            })}
                                            <td className="px-3 py-2.5 text-center">
                                                <PriorityBadge
                                                    priority={alert.priority}
                                                />
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>
            </div>

            <SectionCard icon={UsersRound} title="Recipients & Schedule">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Field label="Default Administrator Email">
                        <input
                            type="email"
                            className={notificationInputClassName}
                            value={notificationSettings.administratorEmail}
                            onChange={(event) =>
                                updateNotificationSetting(
                                    'administratorEmail',
                                    event.target.value,
                                )
                            }
                        />
                    </Field>
                    <Field label="Alert Recipient Group">
                        <select
                            className={notificationInputClassName}
                            value={notificationSettings.recipientGroup}
                            onChange={(event) =>
                                updateNotificationSetting(
                                    'recipientGroup',
                                    event.target.value,
                                )
                            }
                        >
                            <option>System Administrators</option>
                            <option>Municipal Agriculture Officers</option>
                            <option>All Staff</option>
                        </select>
                    </Field>
                    <Field label="Daily Summary Time">
                        <div className="relative">
                            <input
                                type="time"
                                className={`${notificationInputClassName} pr-9`}
                                value={notificationSettings.dailySummaryTime}
                                onChange={(event) =>
                                    updateNotificationSetting(
                                        'dailySummaryTime',
                                        event.target.value,
                                    )
                                }
                            />
                            <Clock3 className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-stone-400 dark:text-emerald-300/60" />
                        </div>
                    </Field>
                    <Field label="Notification Frequency">
                        <select
                            className={notificationInputClassName}
                            value={notificationSettings.frequency}
                            onChange={(event) =>
                                updateNotificationSetting(
                                    'frequency',
                                    event.target.value,
                                )
                            }
                        >
                            <option>Real-time</option>
                            <option>Hourly digest</option>
                            <option>Daily digest</option>
                        </select>
                    </Field>
                </div>

                <div className="mt-4 grid gap-3 text-xs text-stone-700 sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr_auto] dark:text-emerald-100/80">
                    <div className="flex items-center gap-3">
                        <Toggle
                            label="Send daily summary"
                            checked={notificationSettings.sendDailySummary}
                            onChange={(value) =>
                                updateNotificationSetting(
                                    'sendDailySummary',
                                    value,
                                )
                            }
                        />
                        <span>Send Daily Summary</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Toggle
                            label="Mute non-critical alerts after office hours"
                            checked={notificationSettings.muteAfterHours}
                            onChange={(value) =>
                                updateNotificationSetting(
                                    'muteAfterHours',
                                    value,
                                )
                            }
                        />
                        <span>Mute Non-Critical Alerts After Office Hours</span>
                    </div>
                    <button
                        type="button"
                        className="text-left font-medium text-amber-600 underline decoration-amber-300 underline-offset-4 sm:col-span-2 xl:col-span-1 dark:text-amber-400"
                    >
                        Manage recipient groups
                    </button>
                </div>
            </SectionCard>

            <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-3 sm:flex-row sm:items-center dark:border-amber-700/60 dark:bg-[#123c29]">
                <div className="flex flex-1 items-center gap-3 text-xs text-stone-600 dark:text-emerald-100/75">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                        <Bell className="size-5" />
                    </span>
                    Critical security and system alerts cannot be completely
                    disabled.
                </div>
                {saved && (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-700 dark:text-emerald-300">
                        <Check className="size-4" /> Notification settings saved
                    </span>
                )}
                <button
                    type="button"
                    onClick={resetNotifications}
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-amber-500 px-6 text-xs font-medium text-amber-600 transition hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40"
                >
                    <RefreshCcw className="size-4" /> Reset
                </button>
                <button
                    type="submit"
                    className="flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-900 px-7 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                    <CircleCheck className="size-4" /> Save Notification Settings
                </button>
            </div>
        </form>
    );
}

export default function SystemSettings() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const { get: getLocations } = useHttp<
        Record<string, never>,
        PsgcLocation[]
    >();
    const [settings, setSettings] = useState<SettingsState>(() => ({
        ...initialSettings,
        theme: resolvedAppearance === 'dark' ? 'Dark' : 'Light',
    }));
    const [saved, setSaved] = useState(false);
    const [regionOptions, setRegionOptions] = useState<PsgcLocation[]>([]);
    const [provinceOptions, setProvinceOptions] = useState<PsgcLocation[]>([]);
    const [cityMunicipalityOptions, setCityMunicipalityOptions] = useState<
        PsgcLocation[]
    >([]);
    const [barangayOptions, setBarangayOptions] = useState<PsgcLocation[]>([]);
    const [loadingLocation, setLoadingLocation] =
        useState<LocationLevel | null>('regions');
    const [locationError, setLocationError] = useState<string | null>(null);
    const inputClassName =
        'block h-10 w-full min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400 dark:border-emerald-800/70 dark:bg-[#071f15] dark:text-emerald-50 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20 dark:disabled:bg-[#123c29] dark:disabled:text-emerald-200/40';

    const update = <Key extends keyof SettingsState>(
        key: Key,
        value: SettingsState[Key],
    ) => {
        setSettings((current) => ({ ...current, [key]: value }));
        setSaved(false);
    };

    const loadLocations = useCallback(
        async (
            url: string,
            level: LocationLevel,
            setOptions: (locations: PsgcLocation[]) => void,
        ) => {
            setLoadingLocation(level);
            setLocationError(null);

            try {
                setOptions(await getLocations(url));
            } catch {
                setOptions([]);
                setLocationError(
                    'Unable to load PSGC locations. Please try again.',
                );
            } finally {
                setLoadingLocation(null);
            }
        },
        [getLocations],
    );

    useEffect(() => {
        const request = window.setTimeout(() => {
            void loadLocations(regionsRoute().url, 'regions', setRegionOptions);
        });

        return () => window.clearTimeout(request);
    }, [loadLocations]);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaved(true);
    };

    const updateTheme = (theme: 'Light' | 'Dark') => {
        update('theme', theme);
        updateAppearance(theme === 'Dark' ? 'dark' : 'light');
    };

    const updateRegion = (region: string) => {
        setSettings((current) => ({
            ...current,
            region,
            province: '',
            cityMunicipality: '',
            barangay: '',
        }));
        setProvinceOptions([]);
        setCityMunicipalityOptions([]);
        setBarangayOptions([]);
        setSaved(false);

        if (region) {
            void loadLocations(
                provincesRoute(region).url,
                'provinces',
                setProvinceOptions,
            );
        }
    };

    const updateProvince = (province: string) => {
        setSettings((current) => ({
            ...current,
            province,
            cityMunicipality: '',
            barangay: '',
        }));
        setCityMunicipalityOptions([]);
        setBarangayOptions([]);
        setSaved(false);

        if (province) {
            void loadLocations(
                citiesMunicipalitiesRoute(province).url,
                'citiesMunicipalities',
                setCityMunicipalityOptions,
            );
        }
    };

    const updateCityMunicipality = (cityMunicipality: string) => {
        setSettings((current) => ({
            ...current,
            cityMunicipality,
            barangay: '',
        }));
        setBarangayOptions([]);
        setSaved(false);

        if (cityMunicipality) {
            void loadLocations(
                barangaysRoute(cityMunicipality).url,
                'barangays',
                setBarangayOptions,
            );
        }
    };

    const reset = () => {
        setSettings(initialSettings);
        updateAppearance('light');
        setSaved(false);
    };

    return (
        <>
            <Head title="System Settings" />

            <main className="flex-1 bg-[#fbfaf6] p-4 text-stone-800 transition-colors md:p-6 dark:bg-[#061b12] dark:text-emerald-50 dark:[&_h1]:text-emerald-200 dark:[&_h2]:text-emerald-50">
                <div className="mx-auto max-w-[1500px]">
                    <nav
                        className="mb-2 flex items-center gap-2 text-xs text-stone-500 dark:text-emerald-100/60"
                        aria-label="Breadcrumb"
                    >
                        <span className="font-medium text-emerald-800">
                            Dashboard
                        </span>
                        <span>/</span>
                        <span>System Settings</span>
                    </nav>

                    <h1 className="text-2xl font-bold tracking-tight text-emerald-950 md:text-3xl">
                        System Settings
                    </h1>
                    <p className="mt-1 text-sm text-stone-500 dark:text-emerald-100/65">
                        Configure system preferences, security, notifications,
                        and data management
                    </p>

                    <div className="mt-5 grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
                        <aside className="h-fit rounded-xl border border-stone-200 bg-white p-2 shadow-sm dark:border-emerald-800/60 dark:bg-[#0b281b]">
                            <nav
                                className="grid gap-1"
                                aria-label="System settings sections"
                            >
                                {navigationItems.map((item) => (
                                    <button
                                        key={item.title}
                                        type="button"
                                        className={`flex h-12 items-center gap-3 rounded-lg px-3 text-left text-sm transition ${
                                            item.active
                                                ? 'bg-lime-50 font-medium text-emerald-900 dark:bg-emerald-900/80 dark:text-emerald-200'
                                                : 'text-stone-700 hover:bg-stone-50 dark:text-emerald-100/75 dark:hover:bg-emerald-900/50'
                                        }`}
                                    >
                                        <item.icon
                                            className="size-5"
                                            strokeWidth={1.7}
                                        />
                                        {item.title}
                                    </button>
                                ))}
                            </nav>
                        </aside>

                        <form onSubmit={submit} className="grid gap-4">
                            <SectionCard
                                icon={BriefcaseBusiness}
                                title="System Information"
                            >
                                <div className="grid gap-4 xl:grid-cols-[180px_minmax(0,1fr)]">
                                    <div className="grid content-start gap-2">
                                        <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-emerald-800/60">
                                            <img
                                                src="/images/agritrack-logo.png"
                                                alt="AGRITRACK logo"
                                                className="size-full object-contain"
                                            />
                                        </div>
                                        <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-amber-500 text-xs font-medium text-amber-600 transition hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40">
                                            <Upload className="size-4" /> Change
                                            Logo
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="sr-only"
                                            />
                                        </label>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <Field label="System Name">
                                            <input
                                                className={inputClassName}
                                                value={settings.systemName}
                                                onChange={(event) =>
                                                    update(
                                                        'systemName',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </Field>
                                        <Field label="Organization Name">
                                            <input
                                                className={inputClassName}
                                                value={
                                                    settings.organizationName
                                                }
                                                onChange={(event) =>
                                                    update(
                                                        'organizationName',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </Field>
                                        <Field
                                            label="System Description"
                                            className="sm:col-span-2"
                                        >
                                            <textarea
                                                className="min-h-14 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm transition outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 dark:border-emerald-800/70 dark:bg-[#071f15] dark:text-emerald-50 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20"
                                                value={settings.description}
                                                onChange={(event) =>
                                                    update(
                                                        'description',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </Field>
                                        <Field
                                            label="Administrator Email"
                                            className="sm:col-span-2"
                                        >
                                            <input
                                                type="email"
                                                className={inputClassName}
                                                value={
                                                    settings.administratorEmail
                                                }
                                                onChange={(event) =>
                                                    update(
                                                        'administratorEmail',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </Field>
                                    </div>
                                </div>
                            </SectionCard>

                            <SectionCard
                                icon={Globe2}
                                title="Regional Preferences"
                            >
                                <div className="grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)]">
                                    <Field label="Region">
                                        <select
                                            className={inputClassName}
                                            value={settings.region}
                                            onChange={(event) =>
                                                updateRegion(event.target.value)
                                            }
                                        >
                                            <option value="">
                                                {loadingLocation === 'regions'
                                                    ? 'Loading regions...'
                                                    : 'Select region'}
                                            </option>
                                            {regionOptions.map((region) => (
                                                <option
                                                    key={region.code}
                                                    value={region.code}
                                                >
                                                    {regionLabel(region)}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field label="Province">
                                        <select
                                            className={inputClassName}
                                            value={settings.province}
                                            disabled={!settings.region}
                                            onChange={(event) =>
                                                updateProvince(
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                {loadingLocation === 'provinces'
                                                    ? 'Loading provinces...'
                                                    : 'Select province'}
                                            </option>
                                            {provinceOptions.map((province) => (
                                                <option
                                                    key={province.code}
                                                    value={province.code}
                                                >
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field label="City / Municipality">
                                        <select
                                            className={inputClassName}
                                            value={settings.cityMunicipality}
                                            disabled={!settings.province}
                                            onChange={(event) =>
                                                updateCityMunicipality(
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                {loadingLocation ===
                                                'citiesMunicipalities'
                                                    ? 'Loading cities and municipalities...'
                                                    : 'Select city or municipality'}
                                            </option>
                                            {cityMunicipalityOptions.map(
                                                (location) => (
                                                    <option
                                                        key={location.code}
                                                        value={location.code}
                                                    >
                                                        {location.name}{' '}
                                                        {location.isCity
                                                            ? '(City)'
                                                            : '(Municipality)'}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </Field>
                                    <Field label="Barangay">
                                        <select
                                            className={inputClassName}
                                            value={settings.barangay}
                                            disabled={
                                                !settings.cityMunicipality
                                            }
                                            onChange={(event) =>
                                                update(
                                                    'barangay',
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                {loadingLocation === 'barangays'
                                                    ? 'Loading barangays...'
                                                    : 'Select barangay'}
                                            </option>
                                            {barangayOptions.map((barangay) => (
                                                <option
                                                    key={barangay.code}
                                                    value={barangay.code}
                                                >
                                                    {barangay.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field label="Time Zone">
                                        <select
                                            className={inputClassName}
                                            value={settings.timeZone}
                                            onChange={(event) =>
                                                update(
                                                    'timeZone',
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            <option>
                                                (UTC+08:00) Asia/Manila
                                            </option>
                                        </select>
                                    </Field>
                                    <Field label="Date Format">
                                        <select
                                            className={inputClassName}
                                            value={settings.dateFormat}
                                            onChange={(event) =>
                                                update(
                                                    'dateFormat',
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            <option>MM/DD/YYYY</option>
                                            <option>DD/MM/YYYY</option>
                                            <option>YYYY-MM-DD</option>
                                        </select>
                                    </Field>
                                    <Field label="Measurement Unit">
                                        <div className="grid h-10 grid-cols-2 rounded-lg border border-stone-200 p-1 dark:border-emerald-800/70 dark:bg-[#071f15]">
                                            {['Metric', 'Imperial'].map(
                                                (unit) => (
                                                    <button
                                                        key={unit}
                                                        type="button"
                                                        onClick={() =>
                                                            update(
                                                                'measurementUnit',
                                                                unit,
                                                            )
                                                        }
                                                        className={`rounded-md text-xs ${settings.measurementUnit === unit ? 'bg-green-700 text-white dark:bg-emerald-600' : 'text-stone-600 dark:text-emerald-100/65'}`}
                                                    >
                                                        {unit}
                                                    </button>
                                                ),
                                            )}
                                        </div>
                                    </Field>
                                </div>
                                {locationError && (
                                    <p className="mt-3 text-xs font-medium text-red-600 dark:text-red-400">
                                        {locationError}
                                    </p>
                                )}
                            </SectionCard>

                            <SectionCard
                                icon={Monitor}
                                title="Interface Preferences"
                            >
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                                    <Field label="Default Map View">
                                        <select
                                            className={inputClassName}
                                            value={settings.mapView}
                                            onChange={(event) =>
                                                update(
                                                    'mapView',
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            <option>Satellite</option>
                                            <option>Street</option>
                                            <option>Terrain</option>
                                        </select>
                                    </Field>
                                    <Field label="Records Per Page">
                                        <select
                                            className={inputClassName}
                                            value={settings.recordsPerPage}
                                            onChange={(event) =>
                                                update(
                                                    'recordsPerPage',
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            <option>10</option>
                                            <option>25</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </Field>
                                    <div className="grid content-start gap-2 text-xs font-medium text-stone-700 dark:text-emerald-100/80">
                                        Enable Dashboard Analytics
                                        <Toggle
                                            label="Enable dashboard analytics"
                                            checked={
                                                settings.dashboardAnalytics
                                            }
                                            onChange={(value) =>
                                                update(
                                                    'dashboardAnalytics',
                                                    value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="grid content-start gap-2 text-xs font-medium text-stone-700 dark:text-emerald-100/80">
                                        Show Weather Information
                                        <Toggle
                                            label="Show weather information"
                                            checked={
                                                settings.weatherInformation
                                            }
                                            onChange={(value) =>
                                                update(
                                                    'weatherInformation',
                                                    value,
                                                )
                                            }
                                        />
                                    </div>
                                    <Field label="Theme">
                                        <div className="grid grid-cols-2 gap-1 rounded-lg border border-stone-200 p-1 dark:border-emerald-800/70 dark:bg-[#071f15]">
                                            {themeOptions.map((theme) => (
                                                <button
                                                    key={theme.label}
                                                    type="button"
                                                    onClick={() =>
                                                        updateTheme(theme.label)
                                                    }
                                                    aria-pressed={
                                                        settings.theme ===
                                                        theme.label
                                                    }
                                                    className={`flex min-h-12 items-center justify-center gap-2 rounded-md px-2 text-xs transition ${settings.theme === theme.label ? 'bg-green-700 text-white shadow-sm dark:bg-emerald-600' : 'text-stone-600 hover:bg-stone-50 dark:text-emerald-100/70 dark:hover:bg-emerald-900/50'}`}
                                                >
                                                    <theme.icon className="size-3.5" />
                                                    <span>{theme.label}</span>
                                                    <span
                                                        className="flex"
                                                        aria-label={`${theme.label} color palette`}
                                                    >
                                                        {theme.palette.map(
                                                            (color) => (
                                                                <span
                                                                    key={color}
                                                                    className="size-2.5 rounded-full border border-white/60 not-first:-ml-0.5 first:ml-0"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                />
                                                            ),
                                                        )}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </Field>
                                </div>
                            </SectionCard>

                            <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-3 sm:flex-row sm:items-center dark:border-amber-700/60 dark:bg-[#123c29]">
                                <div className="flex flex-1 items-center gap-3 text-xs text-stone-600 dark:text-emerald-100/75">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                        <ShieldCheck className="size-5" />
                                    </span>
                                    Only system administrators can modify these
                                    settings.
                                </div>
                                {saved && (
                                    <span className="flex items-center gap-1 text-xs font-medium text-green-700">
                                        <Check className="size-4" /> Changes
                                        saved
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-amber-500 px-6 text-xs font-medium text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40"
                                >
                                    <RefreshCcw className="size-4" /> Reset
                                </button>
                                <button
                                    type="submit"
                                    className="flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-900 px-7 text-xs font-semibold text-white shadow-sm hover:bg-emerald-800"
                                >
                                    <CircleCheck className="size-4" /> Save
                                    Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

SystemSettings.layout = () => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'System Settings',
            href: editSystemSettings(),
        },
    ],
});
