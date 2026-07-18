import { Head, useForm } from '@inertiajs/react';
import { BriefcaseBusiness, CirclePlus, ShieldCheck } from 'lucide-react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { dashboard } from '@/routes';
import {
    index as userRolesIndex,
    store as storeUserRole,
} from '@/routes/user-roles';

type Role = {
    id: number;
    role: string;
    users_count: number;
};

export default function UserRoles({ roles }: { roles: Role[] }) {
    const roleForm = useForm({ role: '' });

    const submitRole = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        roleForm.post(storeUserRole.url(), {
            preserveScroll: true,
            onSuccess: () => roleForm.reset(),
        });
    };

    return (
        <>
            <Head title="Role" />

            <main className="flex-1 bg-[#fbfaf6] p-4 text-stone-800 md:p-6">
                <div className="mx-auto max-w-[1100px]">
                    <nav className="mb-2 flex items-center gap-2 text-xs text-stone-500">
                        <span className="font-medium text-emerald-800">
                            Dashboard
                        </span>
                        <span>/</span>
                        <span>Role</span>
                    </nav>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-emerald-950 md:text-3xl">
                            Role Management
                        </h1>
                        <p className="mt-1 text-sm text-stone-500">
                            Create and review user access roles
                        </p>
                    </div>

                    <section className="mt-5 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                        <div className="grid gap-6 p-5 lg:grid-cols-[minmax(280px,380px)_minmax(0,1fr)] lg:p-6">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="flex size-11 items-center justify-center rounded-full bg-lime-50 text-emerald-800">
                                        <ShieldCheck className="size-5" />
                                    </span>
                                    <div>
                                        <h2 className="font-semibold text-emerald-950">
                                            Create Role
                                        </h2>
                                        <p className="text-xs text-stone-500">
                                            Add a role for user assignment
                                        </p>
                                    </div>
                                </div>

                                <form
                                    onSubmit={submitRole}
                                    className="mt-5 grid gap-2"
                                >
                                    <label
                                        htmlFor="role"
                                        className="text-sm font-medium text-stone-700"
                                    >
                                        Role{' '}
                                        <span className="text-amber-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            id="role"
                                            value={roleForm.data.role}
                                            onChange={(event) =>
                                                roleForm.setData(
                                                    'role',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Enter role name"
                                            className="h-11 min-w-0 flex-1 rounded-lg border border-stone-200 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
                                        />
                                        <button
                                            type="submit"
                                            disabled={roleForm.processing}
                                            className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-900 text-white transition hover:bg-emerald-800 disabled:opacity-50"
                                            aria-label="Create role"
                                        >
                                            <CirclePlus className="size-5" />
                                        </button>
                                    </div>
                                    <InputError
                                        message={roleForm.errors.role}
                                    />
                                </form>
                            </div>

                            <div className="border-t border-stone-200 pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <h2 className="font-semibold text-emerald-950">
                                            Available Roles
                                        </h2>
                                        <p className="text-xs text-stone-500">
                                            {roles.length} configured roles
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                    {roles.map((role) => (
                                        <article
                                            key={role.id}
                                            className="flex items-center justify-between gap-3 rounded-lg bg-stone-50 px-3 py-3"
                                        >
                                            <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-stone-700">
                                                <BriefcaseBusiness className="size-4 shrink-0 text-emerald-700" />
                                                <span className="truncate">
                                                    {role.role}
                                                </span>
                                            </div>
                                            <span className="shrink-0 text-xs text-stone-400">
                                                {role.users_count}{' '}
                                                {role.users_count === 1
                                                    ? 'user'
                                                    : 'users'}
                                            </span>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

UserRoles.layout = () => ({
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Role', href: userRolesIndex() },
    ],
});
