export function Header() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const dateString = today.toLocaleDateString("zh-CN", options);

  return (
    <header className="pt-8 sm:pt-14 pb-8">
      <p className="mb-3 inline-flex items-center rounded-full border border-[#eadacc] bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9b7155] shadow-sm backdrop-blur-sm">
        Today Tips
      </p>
      <h1 className="mb-3 max-w-xl font-[var(--font-display)] text-4xl font-black leading-[0.95] text-[#2f241f] sm:text-5xl">
        打工摸鱼指北 🦦
      </h1>
      <p className="max-w-lg text-[15px] leading-7 text-[#6f6259] mb-3">
        今天不用重新做人，先给自己一个更容易执行的版本。
      </p>
      <p className="text-sm text-[#8b7a6d] font-medium tracking-wide">
        {dateString}
      </p>
    </header>
  );
}
