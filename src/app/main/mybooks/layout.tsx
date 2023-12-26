type Props = {
  children: React.ReactNode;
};

function DocsLayout({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex-rows top-0 w-full bg-gray-800">
      {/* overflow-y-scroll for child to show scrollbar */}
      <nav className="flex"></nav>
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="w-full">{children}</div>
    </main>
  );
}

export default DocsLayout;
