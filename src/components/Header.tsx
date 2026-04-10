export function Header() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  };
  const dateString = today.toLocaleDateString('zh-CN', options);

  return (
    <header className="pt-6 sm:pt-10 pb-6">
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 mb-2">
        打工摸鱼指北 🦦
      </h1>
      <p className="text-sm text-gray-500 font-medium tracking-wide">
        {dateString}
      </p>
    </header>
  );
}
