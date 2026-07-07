export function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.max(0, Math.min(1, current / total)) * 100;
  return (
    <div className="mb-6">
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full bg-green-500 transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-[13px] text-gray-500">
        Step {current} of {total}
      </p>
    </div>
  );
}
