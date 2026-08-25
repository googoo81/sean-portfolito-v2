type StackRowProps = {
  items: string[];
};

export function StackRow({ items }: StackRowProps) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-2.5">
      {items.map((item) => (
        <span
          key={item}
          className="flex h-12 min-w-12 items-center justify-center rounded-2xl bg-white/8 px-3 text-xs font-medium tracking-tight"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
