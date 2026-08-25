export function CursorMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-[71%] w-[71%]"
    >
      <path
        fill="var(--cursor-icon-bright)"
        d="M4.8 2.6 20.6 11.8l-7.6 1.6z"
      />
      <path
        fill="var(--cursor-icon-mid)"
        d="M4.8 2.6 13 13.4 11.2 21.4z"
      />
      <path
        fill="var(--cursor-icon-dim)"
        d="M13 13.4 20.6 11.8 11.2 21.4z"
      />
    </svg>
  );
}
