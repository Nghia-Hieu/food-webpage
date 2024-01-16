export default function SuccessBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-center bg-green-100 p-4 rounded-lg border-4">
      {children}
    </div>
  );
}
