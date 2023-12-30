type Props = {
  children: React.ReactNode;
};

function TestLayout({ children }: Props) {
  return (
    <main className="flex-rows top-0 w-full bg-gray-800">
      {/* overflow-y-scroll for child to show scrollbar */}
      <nav className="flex"></nav>
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="w-full">{children}</div>
    </main>
  );
}

export default TestLayout;
