import CollectorBoard from "../../components/Collector/CollectorBoard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Collectors = () => {
  const router = useRouter()
  const admin = useSelector((state) => state.admin.admin)
  useEffect(() => {
    if(!admin.success) {
      router.push("/")
    }
  },[])

  return <CollectorBoard />;
}

export default Collectors;