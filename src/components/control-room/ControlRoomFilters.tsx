import Link from "next/link";

export type FilterField = {
  name: string;
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
};

export default function ControlRoomFilters({ action, fields }: { action: string; fields: readonly FilterField[] }) {
  return (
    <form action={action} method="get" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.035)] sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {fields.map((field) => (
          <label key={field.name} className="text-sm font-semibold text-gray-700">
            {field.label}
            <select name={field.name} defaultValue={field.value} className="mt-2 min-h-11 w-full rounded-xl border border-black/12 bg-white px-3 text-sm font-normal text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">
              <option value="">All</option>
              {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit" className="min-h-11 rounded-xl bg-black px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">Apply filters</button>
        <Link href={action} className="inline-flex min-h-11 items-center rounded-xl border border-black/12 px-5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">Reset</Link>
      </div>
    </form>
  );
}
