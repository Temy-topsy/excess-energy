"use client";

import { useState } from "react";
import { 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Search,
  Filter,
  Check,
  Edit2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SalesLead, updateLeadAction } from "./actions";

interface LeadsManagerProps {
  initialLeads: SalesLead[];
  dbError?: string;
}

const STATUS_CONFIG: Record<
  SalesLead["status"],
  { label: string; bg: string; text: string; border: string }
> = {
  new: {
    label: "New Inquiry",
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/20",
  },
  contacted: {
    label: "Contacted",
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "border-amber-500/20",
  },
  quote_sent: {
    label: "Quote Sent",
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    border: "border-purple-500/20",
  },
  won: {
    label: "Won / Installed",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/20",
  },
  lost: {
    label: "Lost",
    bg: "bg-rose-500/10",
    text: "text-rose-500",
    border: "border-rose-500/20",
  },
};

export function LeadsManager({ initialLeads, dbError }: LeadsManagerProps) {
  const [leads, setLeads] = useState<SalesLead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editValue, setEditValue] = useState<number>(0);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Metrics
  const totalLeads = leads.length;
  const wonLeads = leads.filter((l) => l.status === "won");
  const totalRevenue = wonLeads.reduce((acc, curr) => acc + (Number(curr.deal_value) || 0), 0);
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads.length / totalLeads) * 100) : 0;
  const pendingLeads = leads.filter((l) => l.status === "new" || l.status === "contacted").length;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.service && lead.service.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.location && lead.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: SalesLead["status"]) => {
    // Optimistic UI update so it changes immediately with zero lag
    setSavingId(id);
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );

    try {
      const res = await updateLeadAction(id, { status: newStatus });
      if (!res.success) {
        console.error("Failed to update status on server:", res.error);
        alert(`Failed to update status: ${res.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Network error updating status.");
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveDetails = async (id: string) => {
    setSavingId(id);
    const res = await updateLeadAction(id, {
      notes: editNotes,
      deal_value: editValue,
    });
    if (res.success) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, notes: editNotes, deal_value: editValue } : l
        )
      );
      setEditingLeadId(null);
    }
    setSavingId(null);
  };

  const startEdit = (lead: SalesLead) => {
    setEditingLeadId(lead.id);
    setEditNotes(lead.notes || "");
    setEditValue(Number(lead.deal_value) || 0);
  };

  return (
    <div className="space-y-6">
      {dbError && (
        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm">
          <strong>Database Notice:</strong> {dbError}
          <div className="mt-1 text-xs text-muted-foreground">
            Make sure to run the <code className="font-mono text-foreground font-semibold">sales_leads_schema.sql</code> script in your Supabase SQL editor.
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-card border-border">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-muted-foreground">Total Inquiries</div>
            <div className="text-2xl font-bold text-foreground mt-0.5">{totalLeads}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{pendingLeads} pending response</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-card border-border">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-muted-foreground">Closed & Won</div>
            <div className="text-2xl font-bold text-foreground mt-0.5">{wonLeads.length}</div>
            <div className="text-xs text-emerald-500 font-medium mt-0.5">{conversionRate}% conversion rate</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-card border-border">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-muted-foreground">Tracked Revenue</div>
            <div className="text-2xl font-bold text-foreground mt-0.5">
              ₦{totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">from installed systems</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-card border-border">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-muted-foreground">Pipeline In-Flight</div>
            <div className="text-2xl font-bold text-foreground mt-0.5">
              {leads.filter((l) => l.status === "quote_sent").length}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">quotes awaiting decision</div>
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads by name, phone, service, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="size-4 text-muted-foreground shrink-0 ml-1" />
          <span className="text-xs font-medium text-muted-foreground shrink-0">Filter:</span>
          {["all", "new", "contacted", "quote_sent", "won", "lost"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                statusFilter === st
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {st === "all" ? "All" : STATUS_CONFIG[st as SalesLead["status"]].label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table Card */}
      <Card className="overflow-hidden border-border bg-card">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
            <Users className="size-10 text-muted-foreground/40" />
            <p className="text-base font-medium">No leads match your search or filter.</p>
            <p className="text-xs">Once someone submits a quote or inquiry on the website, they will show up here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground">Customer & Source</th>
                  <th className="p-4 font-semibold text-foreground">Service & Location</th>
                  <th className="p-4 font-semibold text-foreground">Quick Reach</th>
                  <th className="p-4 font-semibold text-foreground">Status Pipeline</th>
                  <th className="p-4 font-semibold text-foreground">Deal Value / Notes</th>
                  <th className="p-4 font-semibold text-foreground text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.map((lead) => {
                  const statusConf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                  const cleanPhone = lead.phone.replace(/[^0-9+]/g, "");
                  const waNumber = cleanPhone.startsWith("+")
                    ? cleanPhone.slice(1)
                    : cleanPhone.startsWith("0")
                    ? "234" + cleanPhone.slice(1)
                    : cleanPhone;

                  const isEditing = editingLeadId === lead.id;

                  return (
                    <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                      {/* Name & Source */}
                      <td className="p-4 align-top">
                        <div className="font-semibold text-foreground text-base">{lead.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase">
                            {lead.source} form
                          </span>
                        </div>
                      </td>

                      {/* Service & Location */}
                      <td className="p-4 align-top">
                        <div className="font-medium text-foreground">{lead.service || "General Inquiry"}</div>
                        {lead.location && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                            <MapPin className="size-3 text-muted-foreground shrink-0" />
                            <span>{lead.location}</span>
                          </div>
                        )}
                        {lead.message && (
                          <div className="mt-2 text-xs text-muted-foreground bg-muted/40 p-2 rounded border border-border/50 max-w-xs line-clamp-2" title={lead.message}>
                            &ldquo;{lead.message}&rdquo;
                          </div>
                        )}
                      </td>

                      {/* Direct Connect Buttons */}
                      <td className="p-4 align-top">
                        <div className="flex flex-col gap-1.5">
                          <a
                            href={`https://wa.me/${waNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <MessageSquare className="size-3.5" />
                            WhatsApp ({lead.phone})
                          </a>
                          <a
                            href={`tel:${cleanPhone}`}
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <Phone className="size-3.5" />
                            Call Phone
                          </a>
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground truncate max-w-[150px]"
                            >
                              <Mail className="size-3.5 shrink-0" />
                              <span className="truncate">{lead.email}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="p-4 align-top">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as SalesLead["status"])}
                          className={`text-xs font-bold uppercase rounded-lg px-2.5 py-1.5 border outline-none cursor-pointer bg-background ${statusConf.text} ${statusConf.border} focus:ring-2 focus:ring-ring`}
                        >
                          <option value="new" className="bg-card text-foreground">🟡 New Inquiry</option>
                          <option value="contacted" className="bg-card text-foreground">🔵 Contacted</option>
                          <option value="quote_sent" className="bg-card text-foreground">🟣 Quote Sent</option>
                          <option value="won" className="bg-card text-foreground">🟢 Won / Installed</option>
                          <option value="lost" className="bg-card text-foreground">🔴 Lost</option>
                        </select>
                      </td>

                      {/* Deal Value & Internal Notes */}
                      <td className="p-4 align-top">
                        {isEditing ? (
                          <div className="flex flex-col gap-2 min-w-[200px]">
                            <div>
                              <label className="text-[10px] uppercase font-semibold text-muted-foreground">Deal Value (₦)</label>
                              <input
                                type="number"
                                value={editValue}
                                onChange={(e) => setEditValue(Number(e.target.value))}
                                className="w-full p-1 text-xs border rounded bg-background text-foreground"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-semibold text-muted-foreground">Internal Notes</label>
                              <textarea
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                rows={2}
                                className="w-full p-1 text-xs border rounded bg-background text-foreground"
                                placeholder="E.g. Called, interested in 5kVA, expects callback next Tuesday"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleSaveDetails(lead.id)}
                                disabled={savingId === lead.id}
                                className="h-7 px-2.5 text-xs gap-1"
                              >
                                <Check className="size-3" /> Save
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingLeadId(null)}
                                className="h-7 px-2 text-xs"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1 max-w-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-foreground text-xs">
                                {Number(lead.deal_value) > 0 ? `₦${Number(lead.deal_value).toLocaleString()}` : "₦0"}
                              </span>
                              <button
                                onClick={() => startEdit(lead)}
                                className="text-muted-foreground hover:text-foreground text-xs inline-flex items-center gap-0.5 p-1 rounded hover:bg-muted"
                                title="Edit notes & deal value"
                              >
                                <Edit2 className="size-3" />
                              </button>
                            </div>
                            {lead.notes ? (
                              <p className="text-xs text-muted-foreground italic bg-muted/30 p-1.5 rounded">
                                {lead.notes}
                              </p>
                            ) : (
                              <span className="text-[11px] text-muted-foreground/60">No notes added</span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Date */}
                      <td className="p-4 align-top text-right text-xs text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <Calendar className="size-3" />
                          <span>{new Date(lead.created_at).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground/70">
                          {new Date(lead.created_at).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
