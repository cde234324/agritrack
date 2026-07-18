import { Head, Link, useForm } from '@inertiajs/react';
import {
    Building2,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    UserRound,
    UserRoundPlus,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import InputError from '@/components/input-error';
import { dashboard } from '@/routes';
import { create, index, store } from '@/routes/users';

type Role = {
    id: number;
    role: string;
};

type UserFormData = {
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    gender: string;
    date_of_birth: string;
    contact_number: string;
    email: string;
    username: string;
    user_role_id: string;
    office_organization: string;
    province: string;
    municipality: string;
    barangay: string;
    password: string;
    password_confirmation: string;
    account_status: 'Active' | 'Inactive';
};

function Field({
    label,
    required = false,
    error,
    className = '',
    children,
}: {
    label: string;
    required?: boolean;
    error?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <label
            className={`grid gap-1.5 text-xs font-medium text-stone-700 ${className}`}
        >
            <span>
                {label} {required && <span className="text-amber-500">*</span>}
            </span>
            {children}
            <InputError message={error} className="text-xs" />
        </label>
    );
}

const inputClassName =
    'h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10';

export default function RegisterUser({ roles }: { roles: Role[] }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const form = useForm<UserFormData>({
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        gender: '',
        date_of_birth: '',
        contact_number: '',
        email: '',
        username: '',
        user_role_id: '',
        office_organization: '',
        province: '',
        municipality: '',
        barangay: '',
        password: '',
        password_confirmation: '',
        account_status: 'Active',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store.url(), {
            preserveScroll: true,
            onError: () => form.reset('password', 'password_confirmation'),
        });
    };

    const updateEmail = (email: string) => {
        form.setData({
            ...form.data,
            email,
            username: email,
        });
    };

    return (
        <>
            <Head title="Register User" />

            <main className="flex-1 bg-[#fbfaf6] p-4 text-stone-800 md:p-6">
                <div className="mx-auto max-w-[1500px]">
                    <nav className="mb-2 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                        <span className="font-medium text-emerald-800">
                            Dashboard
                        </span>
                        <span>/</span>
                        <span className="font-medium text-emerald-800">
                            User Management
                        </span>
                        <span>/</span>
                        <span>Register User</span>
                    </nav>

                    <h1 className="text-2xl font-bold tracking-tight text-emerald-950 md:text-3xl">
                        User Registration
                    </h1>
                    <p className="mt-1 text-sm text-stone-500">
                        Create a new account and assign access permissions
                    </p>

                    <form onSubmit={submit} className="mt-5 grid gap-4">
                        <section className="grid overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm xl:grid-cols-2">
                            <div className="border-b border-stone-200 p-4 md:p-5 xl:border-r xl:border-b-0">
                                <div className="mb-5 flex items-center gap-3 text-emerald-900">
                                    <span className="flex size-9 items-center justify-center rounded-full bg-lime-50">
                                        <UserRound className="size-5" />
                                    </span>
                                    <h2 className="font-semibold">
                                        Personal Information
                                    </h2>
                                </div>

                                <div className="grid gap-4 md:grid-cols-[150px_minmax(0,1fr)]">
                                    <div className="grid content-start justify-items-center gap-3">
                                        <span className="w-full text-left text-xs font-medium text-stone-700">
                                            Profile Photo
                                        </span>
                                        <div className="flex size-24 items-center justify-center rounded-full border border-dashed border-stone-300 bg-stone-50 text-stone-400">
                                            <UserRound className="size-9" />
                                        </div>
                                        <span className="text-[11px] text-stone-400">
                                            No photo uploaded
                                        </span>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <Field
                                            label="First Name"
                                            required
                                            error={form.errors.first_name}
                                        >
                                            <input
                                                value={form.data.first_name}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'first_name',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Enter first name"
                                                className={inputClassName}
                                            />
                                        </Field>
                                        <Field
                                            label="Middle Name"
                                            error={form.errors.middle_name}
                                        >
                                            <input
                                                value={form.data.middle_name}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'middle_name',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Enter middle name"
                                                className={inputClassName}
                                            />
                                        </Field>
                                        <Field
                                            label="Last Name"
                                            required
                                            error={form.errors.last_name}
                                        >
                                            <input
                                                value={form.data.last_name}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'last_name',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Enter last name"
                                                className={inputClassName}
                                            />
                                        </Field>
                                        <Field
                                            label="Suffix"
                                            error={form.errors.suffix}
                                        >
                                            <select
                                                value={form.data.suffix}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'suffix',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClassName}
                                            >
                                                <option value="">
                                                    Select suffix
                                                </option>
                                                <option>Jr.</option>
                                                <option>Sr.</option>
                                                <option>II</option>
                                                <option>III</option>
                                                <option>IV</option>
                                            </select>
                                        </Field>
                                        <Field
                                            label="Gender"
                                            required
                                            error={form.errors.gender}
                                        >
                                            <select
                                                value={form.data.gender}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'gender',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClassName}
                                            >
                                                <option value="">
                                                    Select gender
                                                </option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </Field>
                                        <Field
                                            label="Date of Birth"
                                            required
                                            error={form.errors.date_of_birth}
                                        >
                                            <input
                                                type="date"
                                                value={form.data.date_of_birth}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'date_of_birth',
                                                        event.target.value,
                                                    )
                                                }
                                                className={inputClassName}
                                            />
                                        </Field>
                                        <Field
                                            label="Contact Number"
                                            required
                                            error={form.errors.contact_number}
                                            className="sm:col-span-2"
                                        >
                                            <div className="relative">
                                                <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                                                <input
                                                    value={
                                                        form.data.contact_number
                                                    }
                                                    onChange={(event) =>
                                                        form.setData(
                                                            'contact_number',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="09XX XXX XXXX"
                                                    className={`${inputClassName} pl-10`}
                                                />
                                            </div>
                                        </Field>
                                        <Field
                                            label="Email Address"
                                            required
                                            error={form.errors.email}
                                            className="sm:col-span-2"
                                        >
                                            <div className="relative">
                                                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                                                <input
                                                    type="email"
                                                    value={form.data.email}
                                                    onChange={(event) =>
                                                        updateEmail(
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="Enter email address"
                                                    className={`${inputClassName} pl-10`}
                                                />
                                            </div>
                                        </Field>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 md:p-5">
                                <div className="mb-5 flex items-center gap-3 text-emerald-900">
                                    <span className="flex size-9 items-center justify-center rounded-full bg-lime-50">
                                        <LockKeyhole className="size-5" />
                                    </span>
                                    <h2 className="font-semibold">
                                        Account & Access
                                    </h2>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field
                                        label="Username"
                                        required
                                        error={form.errors.username}
                                        className="sm:col-span-2"
                                    >
                                        <div className="relative">
                                            <UserRound className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                                            <input
                                                value={form.data.username}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'username',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Copied from email address"
                                                className={`${inputClassName} pl-10`}
                                            />
                                        </div>
                                    </Field>
                                    <Field
                                        label="User Role"
                                        required
                                        error={form.errors.user_role_id}
                                    >
                                        <select
                                            value={form.data.user_role_id}
                                            onChange={(event) =>
                                                form.setData(
                                                    'user_role_id',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClassName}
                                        >
                                            <option value="">
                                                Select role
                                            </option>
                                            {roles.map((role) => (
                                                <option
                                                    key={role.id}
                                                    value={role.id}
                                                >
                                                    {role.role}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field
                                        label="Office / Organization"
                                        required
                                        error={form.errors.office_organization}
                                    >
                                        <div className="relative">
                                            <Building2 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                                            <input
                                                value={
                                                    form.data
                                                        .office_organization
                                                }
                                                onChange={(event) =>
                                                    form.setData(
                                                        'office_organization',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Enter office or organization"
                                                className={`${inputClassName} pl-10`}
                                            />
                                        </div>
                                    </Field>
                                    <Field
                                        label="Assign Province"
                                        required
                                        error={form.errors.province}
                                    >
                                        <div className="relative">
                                            <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                                            <input
                                                value={form.data.province}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'province',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Enter province"
                                                className={`${inputClassName} pl-10`}
                                            />
                                        </div>
                                    </Field>
                                    <Field
                                        label="Assign Municipality"
                                        required
                                        error={form.errors.municipality}
                                    >
                                        <input
                                            value={form.data.municipality}
                                            onChange={(event) =>
                                                form.setData(
                                                    'municipality',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Enter municipality"
                                            className={inputClassName}
                                        />
                                    </Field>
                                    <Field
                                        label="Assign Barangay"
                                        required
                                        error={form.errors.barangay}
                                    >
                                        <input
                                            value={form.data.barangay}
                                            onChange={(event) =>
                                                form.setData(
                                                    'barangay',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Enter barangay"
                                            className={inputClassName}
                                        />
                                    </Field>
                                    <Field
                                        label="Password"
                                        required
                                        error={form.errors.password}
                                    >
                                        <div className="relative">
                                            <LockKeyhole className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                                            <input
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                value={form.data.password}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'password',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Enter password"
                                                className={`${inputClassName} pr-10 pl-10`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (visible) => !visible,
                                                    )
                                                }
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                                                aria-label="Toggle password visibility"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="size-4" />
                                                ) : (
                                                    <Eye className="size-4" />
                                                )}
                                            </button>
                                        </div>
                                    </Field>
                                    <Field
                                        label="Confirm Password"
                                        required
                                        error={
                                            form.errors.password_confirmation
                                        }
                                    >
                                        <div className="relative">
                                            <LockKeyhole className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                                            <input
                                                type={
                                                    showConfirmation
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                value={
                                                    form.data
                                                        .password_confirmation
                                                }
                                                onChange={(event) =>
                                                    form.setData(
                                                        'password_confirmation',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Confirm password"
                                                className={`${inputClassName} pr-10 pl-10`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmation(
                                                        (visible) => !visible,
                                                    )
                                                }
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                                                aria-label="Toggle confirmation visibility"
                                            >
                                                {showConfirmation ? (
                                                    <EyeOff className="size-4" />
                                                ) : (
                                                    <Eye className="size-4" />
                                                )}
                                            </button>
                                        </div>
                                    </Field>
                                    <div className="grid content-start gap-2 text-xs font-medium text-stone-700 sm:col-span-2">
                                        Account Status
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={
                                                    form.data.account_status ===
                                                    'Active'
                                                }
                                                onClick={() =>
                                                    form.setData(
                                                        'account_status',
                                                        form.data
                                                            .account_status ===
                                                            'Active'
                                                            ? 'Inactive'
                                                            : 'Active',
                                                    )
                                                }
                                                className={`relative h-6 w-11 rounded-full transition ${form.data.account_status === 'Active' ? 'bg-green-700' : 'bg-stone-300'}`}
                                            >
                                                <span
                                                    className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition ${form.data.account_status === 'Active' ? 'left-6' : 'left-1'}`}
                                                />
                                            </button>
                                            <span className="text-sm font-normal text-stone-700">
                                                {form.data.account_status}
                                            </span>
                                        </div>
                                        <InputError
                                            message={form.errors.account_status}
                                            className="text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col gap-3 rounded-xl border border-lime-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
                            <div className="flex flex-1 items-center gap-3 text-xs text-stone-500">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime-50 text-emerald-800">
                                    <ShieldCheck className="size-5" />
                                </span>
                                <div>
                                    <p className="font-semibold text-emerald-900">
                                        Secure Account
                                    </p>
                                    Ensure all information is accurate before
                                    registering this account.
                                </div>
                            </div>
                            <Link
                                href={index()}
                                className="flex h-10 items-center justify-center rounded-lg border border-amber-500 px-7 text-xs font-semibold text-amber-600 hover:bg-amber-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-900 px-7 text-xs font-semibold text-white shadow-sm hover:bg-emerald-800 disabled:opacity-50"
                            >
                                {form.processing ? (
                                    'Registering...'
                                ) : (
                                    <>
                                        <UserRoundPlus className="size-4" />
                                        Register User
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

RegisterUser.layout = () => ({
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'User Management', href: index() },
        { title: 'Register User', href: create() },
    ],
});
