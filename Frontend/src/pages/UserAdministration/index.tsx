import { Role } from "../../constants/role-enum";
import useRequireRoles from "../../hooks/useRequireRoles";

const UserAdministrationPage = () => {
  useRequireRoles([Role.SUPER_ADMIN, Role.ADMIN], "/");

  return <h1>User Administration</h1>;
};

export default UserAdministrationPage;
