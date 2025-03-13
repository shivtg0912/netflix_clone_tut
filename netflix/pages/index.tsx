import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import UseCurrentUser from '@/hooks/useCurrentUser';
import Navbar from "./navbar";
import Billboard from "@/components/Billboard";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
export default function Home() {
  const { data:user } = UseCurrentUser();
  return (
    <>
      <Navbar/>
      <Billboard/>
    </>
  );
}
