import { redirect } from "next/navigation";
import { getServerSession } from "@/app/actions";
import dynamic from "next/dynamic";

const Profile = dynamic(() => import("../../../components/pages/Profile"));
export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/sign-in");

  return <Profile userId={session.user.id} />;
}
