import CollectionBoard from "../../components/Collections/CollectionBoard"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Collections = () => {
  const router = useRouter()
  const admin = useSelector((state) => state.admin.admin)
  useEffect(() => {
    if(!admin.success) {
      router.push("/")
    }
  },[])

  return <CollectionBoard />;
}

export default Collections;