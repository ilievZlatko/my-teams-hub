
import { GetOrganizationDetails } from "@/components/get-organization-details";

const OrganizationDetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div>
      <GetOrganizationDetails id={id} />
    </div>
  )
}

export default OrganizationDetailsPage;
