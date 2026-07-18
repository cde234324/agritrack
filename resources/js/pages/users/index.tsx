import { Head, Link } from '@inertiajs/react';
import {
    BadgeCheck,
    Search,
    ShieldCheck,
    UserRoundPlus,
    Users,
} from 'lucide-react';
import { dashboard } from '@/routes';
import { create, index } from '@/routes/users';

type Role = {
    id: number;
    role: string;
    users_count: number;
};

type User = {
    id: number;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
    account_status: 'Active' | 'Inactive';
    office_organization: string;
    user_role: {
        id: number;
        role: string;
    };
};

export default function UserManagement({
    users,
    roles,
}: {
    users: User[];
    roles: Role[];
}) {
    const activeUsers = users.filter(
        (user) => user.account_status === 'Active',
    ).length;

    return (
        <>
            <Head title="User Management" />

            <main className="flex-1 bg-[#fbfaf6] p-4 text-stone-800 md:p-6">
                <div className="mx-auto max-w-[1500px]">
                    <nav className="mb-2 flex items-center gap-2 text-xs text-stone-500">
                        <span className="font-medium text-emerald-800">
                            Dashboard
                        </span>
                        <span>/</span>
                        <span>User Management</span>
                    </nav>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-emerald-950 md:text-3xl">
                                User Management
                            </h1>
                            <p className="mt-1 text-sm text-stone-500">
                                Manage user accounts, access roles, and account
                                status
                            </p>
                        </div>
                        <Link
                            href={create()}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                        >
                            <UserRoundPlus className="size-4.5" /> Register User
                        </Link>
                    </div>

                    <section className="mt-5 grid gap-3 sm:grid-cols-3">
                        {[
                            {
                                label: 'Total Users',
                                value: users.length,
                                icon: Users,
                            },
                            {
                                label: 'Active Accounts',
                                value: activeUsers,
                                icon: BadgeCheck,
                            },
                            {
                                label: 'User Roles',
                                value: roles.length,
                                icon: ShieldCheck,
                            },
                        ].map((item) => (
                            <article
                                key={item.label}
                                className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
                            >
                                <span className="flex size-11 items-center justify-center rounded-full bg-lime-50 text-emerald-800">
                                    <item.icon className="size-5" />
                                </span>
                                <div>
                                    <p className="text-xs text-stone-500">
                                        {item.label}
                                    </p>
                                    <p className="text-2xl font-bold text-emerald-950">
                                        {item.value}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </section>

                    <div className="mt-4">
                        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                            <div className="flex flex-col gap-3 border-b border-stone-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="font-semibold text-emerald-950">
                                        Registered Users
                                    </h2>
                                    <p className="text-xs text-stone-500">
                                        Account directory and assigned roles
                                    </p>
                                </div>
                                <div className="flex h-9 items-center gap-2 rounded-lg border border-stone-200 px-3 text-stone-400">
                                    <Search className="size-4" />
                                    <span className="text-xs">
                                        Search users
                                    </span>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px] text-left text-sm">
                                    <thead className="bg-stone-50 text-xs font-medium text-stone-500">
                                        <tr>
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Role</th>
                                            <th className="px-4 py-3">
                                                Office / Organization
                                            </th>
                                            <th className="px-4 py-3">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100">
                                        {users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-stone-50/70"
                                            >
                                                <td className="px-4 py-3">
                                                    <p className="font-medium text-stone-800">
                                                        {user.first_name}{' '}
                                                        {user.middle_name
                                                            ? `${user.middle_name} `
                                                            : ''}
                                                        {user.last_name}
                                                    </p>
                                                    <p className="text-xs text-stone-500">
                                                        {user.email}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="rounded-full bg-lime-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                                                        {user.user_role.role}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-stone-600">
                                                    {user.office_organization}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${user.account_status === 'Active' ? 'text-green-700' : 'text-stone-500'}`}
                                                    >
                                                        <span
                                                            className={`size-2 rounded-full ${user.account_status === 'Active' ? 'bg-green-600' : 'bg-stone-400'}`}
                                                        />
                                                        {user.account_status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {users.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-4 py-12 text-center text-stone-500"
                                                >
                                                    No users have been
                                                    registered yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

UserManagement.layout = () => ({
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'User Management', href: index() },
    ],
});
