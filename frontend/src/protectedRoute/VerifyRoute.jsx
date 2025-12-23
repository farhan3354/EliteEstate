import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/routeapi";

const ProtectRoute = ({ allowedRoles }) => {
  const token = useSelector((state) => state.auth.token);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      console.log("No token found");
      setStatus("denied");
      return;
    }

    const verifyUser = async () => {
      try {
        console.log("Verifying token:", token);
        const res = await api.get("/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Verify response:", res.data);
        console.log("Full response structure:", {
          data: res.data,
          user: res.data.user,
          dataUser: res.data.data?.user,
          message: res.data.message,
        });

        // Check different possible locations for user data
        const userData = res.data.data?.user || res.data.user;

        if (!userData) {
          console.error("No user data found in response");
          setStatus("denied");
          return;
        }

        const userRole = userData.role;
        console.log("User role found:", userRole);

        if (allowedRoles && !allowedRoles.includes(userRole)) {
          console.log(
            `Access denied. Role ${userRole} not in allowed roles:`,
            allowedRoles
          );
          setStatus("denied");
        } else {
          console.log("Access granted for role:", userRole);
          setStatus("allowed");
        }
      } catch (err) {
        console.error(
          "Token verification failed:",
          err.response?.data || err.message
        );
        setStatus("denied");
      }
    };

    verifyUser();
  }, [token, allowedRoles]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking access permissions...</p>
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default ProtectRoute;

// const ProtectRoute = ({ allowedRoles }) => {
//   const token = useSelector((state) => state.auth.token);
//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     if (!token) {
//       setStatus("denied");
//       return;
//     }

//     const verifyUser = async () => {
//       try {
//         const res = await api.get("/verify", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const userRole = res.data.user.role;

//         if (allowedRoles && !allowedRoles.includes(userRole)) {
//           setStatus("denied");
//         } else {
//           setStatus("allowed");
//         }
//       } catch (err) {
//         console.error("Token verification failed:", err);
//         setStatus("denied");
//       }
//     };

//     verifyUser();
//   }, [token, allowedRoles]);

//   if (status === "loading") {
//     return <div className="text-center">Checking access...</div>;
//   }

//   if (status === "denied") {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectRoute;
