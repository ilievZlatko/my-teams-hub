export default function Details({
  params: { id },
}: {
  params: { id: string }
}) {
  return (
    // Add details code here
    <>
      <div>Organization Details Page</div>
      <p>{id}</p>
    </>
  )
}
