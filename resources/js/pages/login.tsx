import { Head, router } from '@inertiajs/react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { dashboard } from '@/routes';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.visit(dashboard().url);
    };

    return (
        <>
            <Head title="Sign In" />

            <main className="grid min-h-screen bg-[#fbfaf6] lg:grid-cols-[57%_43%]">
                <section className="relative hidden overflow-hidden lg:block">
                    <img
                        src="/images/agritrack-left-pane.png"
                        alt="AGRITRACK agricultural fields"
                        className="absolute inset-0 size-full object-cover"
                    />
                </section>

                <section className="flex min-h-screen flex-col items-center justify-center px-5 py-8 sm:px-10">
                    <div className="w-full max-w-xl rounded-2xl border border-stone-200 bg-white px-6 py-8 shadow-xl shadow-stone-300/40 sm:px-12 sm:py-10">
                        <img
                            src="/images/agritrack-logo.png"
                            alt="AGRITRACK"
                            className="mx-auto h-auto w-full max-w-sm object-contain"
                        />

                        <div className="mt-5 text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
                                Welcome Back
                            </h1>
                            <p className="mt-1 text-base text-stone-500 sm:text-lg">
                                Sign in to continue to AGRITRACK
                            </p>
                        </div>

                        <form
                            onSubmit={submit}
                            className="mt-7 flex flex-col gap-4"
                        >
                            <label className="flex h-14 items-center rounded-lg border border-amber-500 bg-white px-4 focus-within:ring-2 focus-within:ring-amber-200">
                                <Mail className="size-5 shrink-0 text-stone-600" />
                                <span className="mx-3 h-8 w-px bg-amber-400" />
                                <input
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    placeholder="Email Address or Username"
                                    className="min-w-0 flex-1 border-0 bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400 sm:text-base"
                                />
                            </label>

                            <label className="flex h-14 items-center rounded-lg border border-stone-300 bg-white px-4 focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-100">
                                <LockKeyhole className="size-5 shrink-0 text-stone-600" />
                                <span className="mx-3 h-8 w-px bg-stone-300" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="min-w-0 flex-1 border-0 bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400 sm:text-base"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((visible) => !visible)
                                    }
                                    className="rounded p-1 text-stone-600 hover:bg-stone-100"
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5" />
                                    ) : (
                                        <Eye className="size-5" />
                                    )}
                                </button>
                            </label>

                            <div className="flex items-center justify-between gap-3 text-sm">
                                <label className="flex items-center gap-2 text-emerald-950">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        defaultChecked
                                        className="size-4 accent-emerald-800"
                                    />
                                    Remember me
                                </label>
                                <button
                                    type="button"
                                    className="font-medium text-emerald-900 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="mt-1 h-14 rounded-lg bg-emerald-900 text-lg font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
                            >
                                SIGN IN
                            </button>
                        </form>
                    </div>

                    <footer className="mt-7 text-center text-sm text-stone-600">
                        <p>© 2026 AGRITRACK. All rights reserved.</p>
                        <p className="mt-1 text-xs text-stone-400">
                            Version v1.18
                        </p>
                    </footer>
                </section>
            </main>
        </>
    );
}
