import { Redirect } from "expo-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Index() {
  const { user, loading } = useContext(UserContext);
  if (loading) return null;
  return <Redirect href={user ? "/rooms" : "/login"} />;
}