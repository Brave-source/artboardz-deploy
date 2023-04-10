import CollectionBoard from "../../components/Collections/CollectionBoard"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Collections = () => {
  const router = useRouter()
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated)
  
  useEffect(() => {
    if(!isAuthenticated) {
      router.push("/")
    }
  },[isAuthenticated])

  if(isAuthenticated) return <CollectionBoard />;
}

export default Collections;