import { useNavigate } from "react-router-dom";
import { Role } from "../constants/role-enum";
import { useAppSelector } from "../redux/hook";
import { useEffect } from "react";

const useRequireRoles = (roles: Role[], redirectUri: string) => {
  const navigate = useNavigate();
  const userRoles = useAppSelector((state) => state.user?.roles);

  useEffect(() => {
    const anyMatchRoles = roles.some((role) => userRoles?.includes(role));
    console.log("anyMatchRoles", anyMatchRoles);
    if (!anyMatchRoles) {
      navigate(redirectUri);
    }
  }, [userRoles, navigate, redirectUri, roles]);
};

export default useRequireRoles;
