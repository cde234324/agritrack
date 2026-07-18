import { Head, useHttp } from '@inertiajs/react';
import {
    Bell,
    BriefcaseBusiness,
    Check,
    CircleCheck,
    ClipboardList,
    CloudUpload,
    Globe2,
    LockKeyhole,
    MapPin,
    Monitor,
    Moon,
    RefreshCcw,
    Settings,
    ShieldCheck,
    Sun,
    Upload,
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

const navigationItems = [
    { title: 'General Settings', icon: Settings, active: true },
    { title: 'Location & Mapping', icon: MapPin },
    { title: 'Notifications', icon: Bell },
    { title: 'Security & Access', icon: LockKeyhole },
    { title: 'Backup & Maintenance', icon: CloudUpload },
    { title: 'Audit Logs', icon: ClipboardList },
];

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
        palette: ['#0c1f16', '#15803d', '#f4b942'],
    },
] as const;

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
        <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-700 dark:bg-stone-900">
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
            className={`grid min-w-0 gap-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 ${className}`}
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
            className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-green-700' : 'bg-stone-300'}`}
        >
            <span
                className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition ${checked ? 'left-6' : 'left-1'}`}
            />
        </button>
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
        'block h-10 w-full min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-emerald-500 dark:disabled:bg-stone-800';

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

            <main className="flex-1 bg-[#fbfaf6] p-4 text-stone-800 transition-colors md:p-6 dark:bg-stone-950 dark:text-stone-100 dark:[&_h1]:text-emerald-200 dark:[&_h2]:text-stone-100">
                <div className="mx-auto max-w-[1500px]">
                    <nav
                        className="mb-2 flex items-center gap-2 text-xs text-stone-500"
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
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                        Configure system preferences, security, notifications,
                        and data management
                    </p>

                    <div className="mt-5 grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
                        <aside className="h-fit rounded-xl border border-stone-200 bg-white p-2 shadow-sm dark:border-stone-700 dark:bg-stone-900">
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
                                                ? 'bg-lime-50 font-medium text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                                                : 'text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'
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
                                        <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg border border-stone-200 bg-white">
                                            <img
                                                src="/images/agritrack-logo.png"
                                                alt="AGRITRACK logo"
                                                className="size-full object-contain"
                                            />
                                        </div>
                                        <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-amber-500 text-xs font-medium text-amber-600 transition hover:bg-amber-50">
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
                                                className="min-h-14 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm transition outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
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
                                        <div className="grid h-10 grid-cols-2 rounded-lg border border-stone-200 p-1">
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
                                                        className={`rounded-md text-xs ${settings.measurementUnit === unit ? 'bg-green-700 text-white' : 'text-stone-600'}`}
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
                                    <div className="grid content-start gap-2 text-xs font-medium text-stone-700">
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
                                    <div className="grid content-start gap-2 text-xs font-medium text-stone-700">
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
                                        <div className="grid grid-cols-2 gap-1 rounded-lg border border-stone-200 p-1 dark:border-stone-700">
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
                                                    className={`flex min-h-12 items-center justify-center gap-2 rounded-md px-2 text-xs transition ${settings.theme === theme.label ? 'bg-green-700 text-white shadow-sm dark:bg-green-600' : 'text-stone-600 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'}`}
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

                            <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-3 sm:flex-row sm:items-center dark:border-amber-900 dark:bg-amber-950/30">
                                <div className="flex flex-1 items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
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
                                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-amber-500 px-6 text-xs font-medium text-amber-600 hover:bg-amber-50"
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
