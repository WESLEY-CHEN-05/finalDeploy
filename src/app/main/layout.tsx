import Navbar from "./_components/Navbar";

type Props = {
  children: React.ReactNode;
};

function DocsLayout({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex-rows overflow-scroll-y top-0 w-full overflow-hidden">
      {/* overflow-y-scroll for child to show scrollbar */}
      <nav className="flex">
        <Navbar />
      </nav>
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="w-full">{children}</div>
    </main>
  );
}

export default DocsLayout;
