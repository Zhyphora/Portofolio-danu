export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="min-h-screen px-4 lg:px-24 py-24 ">{children}</div>
    </div>
  );
}
