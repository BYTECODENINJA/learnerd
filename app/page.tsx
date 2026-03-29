import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

const Page = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a1a] text-white selection:bg-cyan-500/30">
            {/* 1. MESH GRADIENT BACKGROUND (Inspired by Nicolai) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/20 blur-[120px]" />
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-pink-500/10 blur-[100px]" />
            </div>

            <div className="container relative z-10 mx-auto px-6 py-12 lg:py-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">

                    {/* LEFT COLUMN: HERO TEXT */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-cyan-400 font-medium tracking-widest uppercase text-sm">
                                <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                                YOUR LIBRARY
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-none">
                                LEARN<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">ERD</span>
                            </h1>
                            <p className="text-lg text-slate-400 max-w-md leading-relaxed">
                               Convert your books into knowledge with AI-powered summaries, notes, and more.
                                Listen, read, and learn with ease.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                            <Link href="/books/new" className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold transition-all hover:bg-cyan-400">
                                Add new book
                                <div className="bg-black text-white rounded-full p-1 group-hover:rotate-45 transition-transform">
                                    <HugeiconsIcon icon={Add01Icon} size={16} />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* CENTER COLUMN: MAIN ILLUSTRATION */}
                    <div className="lg:col-span-7 relative flex justify-center">
                        <div className="relative w-full aspect-square max-w-lg">
                            {/* Floating Glow Effects */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-cyan-400/30 rounded-full blur-3xl animate-blob" />
                            <Image
                                src="/assets/hero-illustration.png"
                                alt="AI Avatar"
                                fill
                                className="object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.5)]"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: GLASSMORPHISM CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                    {[
                        { title: "Upload PDF", desc: "Add your PDF book file." },
                        { title: "AI Processing", desc: "AI analyzes and summarizes your book content." },
                        { title: "Voice Chat", desc: "Listen to your book summaries and notes with voice chat." }
                    ].map((step, i) => (
                        <div key={i} className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer">
                            <div className="absolute top-4 right-4 text-white/20 group-hover:text-cyan-400 transition-colors">
                                <HugeiconsIcon icon={ArrowRight02Icon} size={24} className="-rotate-45" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Page
