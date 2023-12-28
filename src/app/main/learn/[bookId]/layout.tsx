type Props = {
  children: React.ReactNode;
};

function BookLayout({ children }: Props) {
  return <div className="w-full overflow-hidden">{children}</div>;
}

export default BookLayout;
