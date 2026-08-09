export default function SunIdliMark({ className = "h-10 w-10" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/icon-mark.png" alt="The Steam Craft" className={`${className} object-contain`} />;
}
