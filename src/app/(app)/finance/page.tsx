import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { formatMZN, formatDate } from "@/lib/utils";
import { CreditCard, CheckCircle2, Clock, AlertCircle, Receipt, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FinancePage() {
  const user = await requireAuth(["ADMIN", "DIRECTOR", "FINANCE"]);

  const [invoices, payments] = await Promise.all([
    prisma.invoice.findMany({
      where: { institutionId: user.institutionId },
      include: {
        student: true,
        term: true,
        payments: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.findMany({
      where: {
        invoice: { institutionId: user.institutionId },
      },
      include: {
        invoice: {
          include: { student: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalPending = totalInvoiced - totalPaid;
  const collectionRate = totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-flectere-navy tracking-tight">
          Tuition & Fee Operations
        </h1>
        <p className="text-xs sm:text-sm text-flectere-slate mt-0.5">
          Auditable billing schedules, payment reconciliation, and institutional collections (MZN)
        </p>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <p className="text-xs font-semibold text-flectere-slate uppercase tracking-wider">Total Assessed</p>
          <p className="text-xl sm:text-2xl font-extrabold text-flectere-navy mt-1 truncate">
            {formatMZN(totalInvoiced)}
          </p>
          <p className="text-[11px] text-flectere-slate mt-1">2026 Academic Year Invoices</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <p className="text-xs font-semibold text-flectere-slate uppercase tracking-wider">Reconciled Collections</p>
          <p className="text-xl sm:text-2xl font-extrabold text-flectere-green mt-1 truncate">
            {formatMZN(totalPaid)}
          </p>
          <p className="text-[11px] text-flectere-green mt-1 font-medium">{collectionRate}% collection ratio</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <p className="text-xs font-semibold text-flectere-slate uppercase tracking-wider">Outstanding Dues</p>
          <p className="text-xl sm:text-2xl font-extrabold text-flectere-crimson mt-1 truncate">
            {formatMZN(totalPending)}
          </p>
          <p className="text-[11px] text-flectere-slate mt-1">Pending Term installments</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-flectere-slateLight shadow-sm">
          <p className="text-xs font-semibold text-flectere-slate uppercase tracking-wider">Payment Channels</p>
          <p className="text-sm font-bold text-flectere-navy mt-2">M-Pesa &bull; e-Mola &bull; Wire</p>
          <p className="text-[11px] text-flectere-slate mt-1">Direct bank reconciliation</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-flectere-slateLight shadow-sm overflow-hidden">
        <div className="p-4 border-b border-flectere-slateLight flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-flectere-navy">
            Authoritative Student Invoices ({invoices.length} Records)
          </h2>
          <span className="text-[11px] text-flectere-slate">All figures recorded in Mozambican Meticais</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-flectere-light text-flectere-slate uppercase text-[10px] font-semibold border-b border-flectere-slateLight tracking-wider">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-flectere-slateLight/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-flectere-light/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-flectere-navy">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3 px-4 font-bold text-flectere-navy">
                    <Link href={`/students/${inv.student.id}`} className="hover:text-flectere-gold transition-colors">
                      {inv.student.firstName} {inv.student.lastName}
                    </Link>
                    <span className="block text-[10px] font-mono text-flectere-slate font-normal">
                      {inv.student.admissionNumber}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-flectere-slate font-medium">
                    {inv.term.name}
                  </td>
                  <td className="py-3 px-4 font-bold text-flectere-navy">
                    {formatMZN(inv.amount)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-flectere-green">
                    {formatMZN(inv.paidAmount)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        inv.status === "PAID"
                          ? "bg-flectere-greenLight text-flectere-green border-flectere-green/30"
                          : "bg-flectere-gold/15 text-flectere-navy border-flectere-gold/30"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-flectere-slate">
                    {formatDate(inv.dueDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
