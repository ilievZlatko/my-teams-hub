const TeamDetailsPage = ({
  params: { id }
}: {
  params: { id: string }
}) => {
  return (
    <div>
      <h1 className="text-3xl">Team Details Page</h1>
      <p>Team ID: {id}</p>
    </div>
  )
}

export default TeamDetailsPage
