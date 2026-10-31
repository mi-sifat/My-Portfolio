import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Cpu,
  Briefcase,
  Video,
  Layers,
  Mail,
  ArrowUpRight,
  PlusCircle,
  CheckCircle2,
  ShieldCheck,
  Server,
  Sparkles,
} from "lucide-react";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
  // Fetch real-time metrics from the database
  const [
    projectsCount,
    skillsCount,
    experienceCount,
    educationCount,
    videosCount,
    servicesCount,
    productsCount,
    totalMessagesCount,
    unreadMessagesCount,
    recentMessages,
  ] = await Promise.all([
    db.project.count(),
    db.skill.count(),
    db.experience.count(),
    db.education.count(),
    db.video.count(),
    db.service.count(),
    db.product.count(),
    db.contactMessage.count(),
    db.contactMessage.count({ where: { isRead: false } }),
    db.contactMessage.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const STATS = [
    {
      label: "Total Projects",
      value: projectsCount,
      sub: "Active in portfolio",
      href: "/admin/projects",
      icon: FolderGit2,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      label: "Verified Skills",
      value: skillsCount,
      sub: "Development & Creative",
      href: "/admin/skills",
      icon: Cpu,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: "Experience & Roles",
      value: experienceCount,
      sub: `${educationCount} Education degrees`,
      href: "/admin/experience",
      icon: Briefcase,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      label: "YouTube Videos",
      value: videosCount,
      sub: "Food & Tour Vlogs",
      href: "/admin/youtube",
      icon: Video,
      color: "text-red-500 bg-red-500/10",
    },
    {
      label: "Services & Products",
      value: servicesCount + productsCount,
      sub: `${servicesCount} Services • ${productsCount} Products`,
      href: "/admin/services",
      icon: Layers,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      label: "Contact Inquiries",
      value: totalMessagesCount,
      sub: unreadMessagesCount > 0 ? `${unreadMessagesCount} unread message(s)` : "All messages read",
      href: "/admin/messages",
      icon: Mail,
      color: unreadMessagesCount > 0 ? "text-accent-ember bg-accent-ember/10" : "text-neutral-500 bg-neutral-500/10",
      highlight: unreadMessagesCount > 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-peach-100/70 via-white to-warm-100/60 dark:from-canvas-charcoal dark:via-neutral-900 dark:to-neutral-950 border border-neutral-200/80 dark:border-neutral-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="peach">CMS Control Center</Badge>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Database Synchronized
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
            Welcome back, Sifat! 👋
          </h1>
          <p className="text-xs sm:text-sm text-foreground/70 max-w-xl">
            This is your private administrative hub. Manage your software projects, skills, creative video logs, and respond to incoming client opportunities in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/messages">
            <Button variant={unreadMessagesCount > 0 ? "primary" : "secondary"} size="sm">
              <Mail className="h-4 w-4" />
              <span>Inquiries ({unreadMessagesCount})</span>
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm">
              <span>Public Site</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="group block">
              <Card
                variant="glass"
                className={`p-5 transition-all duration-200 group-hover:-translate-y-1 border ${
                  stat.highlight
                    ? "border-accent-ember/40 shadow-glow-peach"
                    : "border-neutral-200/80 dark:border-neutral-800 group-hover:border-neutral-300 dark:group-hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-foreground/30 group-hover:text-foreground transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold font-display text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{stat.label}</p>
                  <p className="text-[11px] font-mono text-foreground/50 mt-1">{stat.sub}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Messages & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Recent Inquiries List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent-ember" />
              <h2 className="font-display text-lg font-bold text-foreground">
                Recent Inquiries
              </h2>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs font-mono text-accent-ember hover:underline flex items-center gap-1"
            >
              View all messages ({totalMessagesCount})
            </Link>
          </div>

          <Card variant="glass" className="divide-y divide-neutral-200/70 dark:divide-neutral-800/70 border border-neutral-200/80 dark:border-neutral-800">
            {recentMessages.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-2">
                <CheckCircle2 className="h-8 w-8 text-neutral-400 mx-auto" />
                <p className="text-sm font-semibold text-foreground">No inquiries yet</p>
                <p className="text-xs text-foreground/50 max-w-sm mx-auto">
                  When visitors or recruiters send inquiries through your contact form, they will appear here instantly.
                </p>
              </div>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-4 flex items-start justify-between gap-4 hover:bg-warm-100/50 dark:hover:bg-neutral-800/40 transition-colors">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs font-bold text-foreground">
                        {msg.name}
                      </span>
                      <span className="text-[11px] font-mono text-foreground/45 truncate">
                        &lt;{msg.email}&gt;
                      </span>
                      {!msg.isRead && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-accent-ember text-white">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-foreground truncate">
                      {msg.subject}
                    </p>
                    <p className="text-xs text-foreground/60 line-clamp-1">
                      {msg.message}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-foreground/40 block">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      href="/admin/messages"
                      className="text-[11px] text-accent-ember font-medium hover:underline inline-block mt-1"
                    >
                      Inspect →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>

        {/* Quick Actions & System Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Actions */}
          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-ember" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/projects" className="block">
                <Card variant="glass" className="p-4 text-center hover:border-accent-ember/40 transition-all border border-neutral-200 dark:border-neutral-800">
                  <PlusCircle className="h-5 w-5 mx-auto text-blue-500 mb-1.5" />
                  <p className="text-xs font-bold text-foreground">Add Project</p>
                  <p className="text-[10px] text-foreground/50">Showcase work</p>
                </Card>
              </Link>
              <Link href="/admin/youtube" className="block">
                <Card variant="glass" className="p-4 text-center hover:border-accent-ember/40 transition-all border border-neutral-200 dark:border-neutral-800">
                  <Video className="h-5 w-5 mx-auto text-red-500 mb-1.5" />
                  <p className="text-xs font-bold text-foreground">Add Vlog</p>
                  <p className="text-[10px] text-foreground/50">YouTube embed</p>
                </Card>
              </Link>
              <Link href="/admin/profile" className="block">
                <Card variant="glass" className="p-4 text-center hover:border-accent-ember/40 transition-all border border-neutral-200 dark:border-neutral-800">
                  <ShieldCheck className="h-5 w-5 mx-auto text-emerald-500 mb-1.5" />
                  <p className="text-xs font-bold text-foreground">Edit Profile</p>
                  <p className="text-[10px] text-foreground/50">Bio & WhatsApp</p>
                </Card>
              </Link>
              <Link href="/admin/skills" className="block">
                <Card variant="glass" className="p-4 text-center hover:border-accent-ember/40 transition-all border border-neutral-200 dark:border-neutral-800">
                  <Cpu className="h-5 w-5 mx-auto text-purple-500 mb-1.5" />
                  <p className="text-xs font-bold text-foreground">Manage Skills</p>
                  <p className="text-[10px] text-foreground/50">Tech stack</p>
                </Card>
              </Link>
            </div>
          </div>

          {/* System & Architecture Status */}
          <Card variant="glass" className="p-5 space-y-3.5 border border-neutral-200/80 dark:border-neutral-800">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-200/70 dark:border-neutral-800/70">
              <Server className="h-4 w-4 text-emerald-500" />
              <span className="font-display text-xs font-bold text-foreground uppercase tracking-wider">
                System Infrastructure
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">Database Engine:</span>
                <span className="font-mono font-semibold text-foreground">SQLite (file:./dev.db)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">ORM:</span>
                <span className="font-mono font-semibold text-foreground">Prisma v5.22.0 LTS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">Auth System:</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  Edge JWT + Bcrypt (Active)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">App Version:</span>
                <span className="font-mono font-semibold text-foreground">Next.js 14.2 App Router</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
