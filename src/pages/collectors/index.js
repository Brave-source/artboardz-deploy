import CollectorBoard from "../../components/Collector/CollectorBoard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Collectors = () => {
  const router = useRouter()
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated)
  
  useEffect(() => {
    if(!isAuthenticated) {
      router.push("/")
    }
  },[isAuthenticated]);
  
  return <CollectorBoard />;
}

export default Collectors;