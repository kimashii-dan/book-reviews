import { redirect } from "next/navigation";
import { getServerSession } from "@/app/actions";
import dynamic from "next/dynamic";
const ProfileComponent = dynamic(
  () => import("../../../components/pages/ProfileComponent")
);
export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/sign-in");

  return <ProfileComponent userId={session.user.id} />;
}
