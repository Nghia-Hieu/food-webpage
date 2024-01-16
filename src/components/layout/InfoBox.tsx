export default function InfoBox({children}:{children: React.ReactNode}) {
    return(
        <div className="text-center bg-blue-100 p-4 rounded-lg border-4">
          {children}
        </div>
    )
}