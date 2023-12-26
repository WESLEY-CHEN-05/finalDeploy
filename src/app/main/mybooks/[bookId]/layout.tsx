type Props = {
  children: React.ReactNode;
};

function BookLayout({ children }: Props) {
  return <div className="w-full">{children}</div>;
}

export default BookLayout;
