type TagTone = "cream" | "blue" | "red" | "brown";

const toneClass: Record<TagTone, string> = {
  cream: "bg-cream-soft text-brown",
  blue: "bg-blue-soft text-blue",
  red: "bg-red-soft text-red",
  brown: "bg-brown-soft text-brown",
};

export function Tag({
  children,
  tone = "cream",
}: {
  children: React.ReactNode;
  tone?: TagTone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}
