import { useQuery } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"

const useUserInfo = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const accessToken = localStorage.getItem("accessToken")
      return jwtDecode(accessToken!)
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!localStorage.getItem("accessToken"),
  })
}

export default useUserInfo
