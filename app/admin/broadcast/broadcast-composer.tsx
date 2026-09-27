"use client";

import { useState, useActionState, useTransition } from "react";
import {
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  Edit3,
  Users,
  MailCheck,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EMAIL_TEMPLATES, DEFAULT_SENDER_NAME, DEFAULT_SENDER_EMAIL } from "@/lib/mailer/templates";
import { sendBroadcastAction, Subscriber } from "./actions";

interface BroadcastComposerProps {
  subscribers: Subscriber[];
  dbError?: string;
}

export function BroadcastComposer({ subscribers, dbError }: BroadcastComposerProps) {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<keyof typeof EMAIL_TEMPLATES>("welcome");
  const [subject, setSubject] = useState(EMAIL_TEMPLATES.welcome.subject);
  const [body, setBody] = useState(EMAIL_TEMPLATES.welcome.body);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [targetMode, setTargetMode] = useState<"test" | "all">("test");
  const [testEmail, setTestEmail] = useState("info.xsenergy1@gmail.com");

  const [state, formAction, isPending] = useActionState(sendBroadcastAction, null);

  const handleSelectTemplate = (key: keyof typeof EMAIL_TEMPLATES) => {
    setSelectedTemplateKey(key);
    setSubject(EMAIL_TEMPLATES[key].subject);
    setBody(EMAIL_TEMPLATES[key].body);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Sender Identity & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 flex items-start gap-4 bg-card border-border">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs uppercase font-semibold text-muted-foreground">Default Sender</div>
            <div className="text-base font-bold text-foreground mt-0.5">{DEFAULT_SENDER_NAME}</div>
            <div className="text-xs font-mono text-muted-foreground">{DEFAULT_SENDER_EMAIL}</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4 bg-card border-border">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs uppercase font-semibold text-muted-foreground">Subscribers Audience</div>
            <div className="text-2xl font-bold text-foreground mt-0.5">{subscribers.length}</div>
            <div className="text-xs text-muted-foreground">Active email recipients</div>
          </div>
        </Card>

        <Card className="p-5 flex items-start gap-4 bg-card border-border">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs uppercase font-semibold text-muted-foreground">Automated Flow</div>
            <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Welcome Email ON</div>
            <div className="text-xs text-muted-foreground">Auto-sent upon website subscription</div>
          </div>
        </Card>
      </div>

      {dbError && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-800 dark:text-amber-200 text-sm">
          <strong>Database note:</strong> The `newsletter_subscribers` table is not detected yet in Supabase.
          Please run the SQL snippet in Supabase SQL editor so subscribers are stored properly!
        </div>
      )}

      {/* Main Mail Composer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5 mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Compose Broadcast</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pick a pre-designed template or write custom content to send.
                </p>
              </div>

              {/* Edit vs Preview Toggle */}
              <div className="flex items-center gap-1 rounded-lg bg-muted p-1 border border-border">
                <button
                  type="button"
                  onClick={() => setActiveTab("edit")}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === "edit"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === "preview"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  Live Preview
                </button>
              </div>
            </div>

            {/* Template Selection Pills */}
            <div className="mb-6 space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Select Template
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(EMAIL_TEMPLATES).map(([key, template]) => {
                  const isSelected = selectedTemplateKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelectTemplate(key as keyof typeof EMAIL_TEMPLATES)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400 font-semibold"
                          : "border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {template.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <form action={formAction} className="space-y-5">
              {/* Hidden or read-only sender display */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Sender (Locked)</label>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-input bg-muted/50 px-3.5 py-2 text-sm text-muted-foreground font-mono">
                  <span>{DEFAULT_SENDER_NAME} &lt;{DEFAULT_SENDER_EMAIL}&gt;</span>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Subject Line</label>
                <input
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="e.g. Exclusive Solar Offer from Excess Energy"
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 font-medium"
                />
              </div>

              {/* Body */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Email Message Content {activeTab === "edit" ? "(HTML / Text)" : "(Previewing)"}
                  </label>
                  <span className="text-[11px] text-muted-foreground">HTML formatting supported</span>
                </div>

                {activeTab === "edit" ? (
                  <textarea
                    name="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={12}
                    required
                    className="w-full rounded-lg border border-input bg-background p-3.5 text-xs sm:text-sm font-mono text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    placeholder="Enter your email message here..."
                  />
                ) : (
                  <div className="rounded-lg border border-border bg-slate-50 dark:bg-slate-900/60 p-5 overflow-auto max-h-[400px]">
                    <div className="max-w-[500px] mx-auto bg-white dark:bg-slate-950 p-6 rounded-lg border border-border/80 shadow-xs">
                      <div className="border-b-2 border-amber-500 pb-3 mb-4 text-center">
                        <div className="font-bold text-base text-slate-900 dark:text-white">EXCESS ENERGY</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                          Clean, Reliable & Uninterrupted Power
                        </div>
                      </div>
                      <div
                        className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3 prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: body }}
                      />
                      <div className="border-t border-border mt-6 pt-3 text-center text-[10px] text-muted-foreground">
                        <strong>Excess Energy</strong> · excessenergy.app
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Send Audience Selection */}
              <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Audience & Destination
                </label>

                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="target"
                      value="test"
                      checked={targetMode === "test"}
                      onChange={() => setTargetMode("test")}
                      className="accent-amber-500"
                    />
                    <span className="font-medium text-foreground">Send Test Email</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="target"
                      value="all"
                      checked={targetMode === "all"}
                      onChange={() => setTargetMode("all")}
                      className="accent-amber-500"
                    />
                    <span className="font-medium text-foreground">
                      Blast to All Subscribers ({subscribers.length})
                    </span>
                  </label>
                </div>

                {targetMode === "test" && (
                  <div>
                    <label className="text-xs text-muted-foreground">Test Recipient Email Address</label>
                    <input
                      type="email"
                      name="testEmail"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="e.g. info.excessenergy@gmail.com"
                      className="mt-1 w-full max-w-md rounded-lg border border-input bg-background px-3.5 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button & Feedback */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-6 py-2.5 cursor-pointer"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Mail...
                    </>
                  ) : targetMode === "test" ? (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Test Mail
                    </>
                  ) : (
                    <>
                      <MailCheck className="mr-2 h-4 w-4" />
                      Send Broadcast ({subscribers.length} recipients)
                    </>
                  )}
                </Button>

                {state?.error && (
                  <div className="flex items-center gap-2 text-xs text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{state.error}</span>
                  </div>
                )}

                {state?.success && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{state.message}</span>
                  </div>
                )}
              </div>
            </form>
          </Card>
        </div>

        {/* Right Side: Subscribers List */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-500" />
                <span>Subscribers List ({subscribers.length})</span>
              </h3>
            </div>

            {subscribers.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground text-xs">
                <p>No subscribers registered yet.</p>
                <p className="mt-1 text-[11px]">Subscribers from your website footer will appear here automatically.</p>
              </div>
            ) : (
              <div className="divide-y divide-border max-h-[480px] overflow-y-auto pr-1">
                {subscribers.map((sub) => (
                  <div key={sub.id || sub.email} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="truncate max-w-[200px]">
                      <p className="font-medium text-foreground truncate">{sub.email}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      active
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
