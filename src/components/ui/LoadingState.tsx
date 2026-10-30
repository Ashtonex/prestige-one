import React from "react";
import { Loader2 } from "lucide-react";

export function LoadingState({ message = "Loading authoritative records..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] p-8 text-center" role="status">
      <Loader2 className="w-8 h-8 text-flectere-gold animate-spin mb-3" />
      <p className="text-sm font-medium text-flectere-navy">{message}</p>
      <span className="sr-only">Loading</span>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-flectere-slateLight animate-pulse">
      <div className="w-10 h-10 rounded-full bg-flectere-slateLight/60 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-flectere-slateLight/60 rounded w-1/3" />
        <div className="h-3 bg-flectere-slateLight/40 rounded w-1/4" />
      </div>
      <div className="h-6 bg-flectere-slateLight/40 rounded w-16" />
    </div>
  );
}
