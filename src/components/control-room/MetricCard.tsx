import type { ControlRoomMetric } from "@/types/control-room";

export default function MetricCard({ metric }: { metric: ControlRoomMetric }) {
  return (
    <article className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.045)] sm:p-6" title={metric.description}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">{metric.label}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="text-4xl font-bold leading-none tracking-[-0.05em] sm:text-5xl">{metric.value}</p>
        <p className={`pb-1 text-right text-xs font-semibold ${metric.trend === "up" ? "text-emerald-700" : metric.trend === "down" ? "text-red-700" : "text-gray-500"}`}>
          {metric.change}
        </p>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-gray-500">{metric.description}</p>
    </article>
  );
}
