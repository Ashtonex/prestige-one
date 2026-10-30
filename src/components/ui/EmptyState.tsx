import React from "react";
import Link from "next/link";
import { FolderSearch, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyState({ title, description, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-flectere-slateLight bg-white my-6">
      <div className="w-14 h-14 rounded-full bg-flectere-light flex items-center justify-center text-flectere-slate mb-4">
        <FolderSearch className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-flectere-navy">{title}</h3>
      <p className="text-sm text-flectere-slate max-w-sm mt-1 mb-6">{description}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-flectere-navy text-white text-sm font-medium hover:bg-flectere-navyLight transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
