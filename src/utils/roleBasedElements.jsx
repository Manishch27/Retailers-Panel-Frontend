import { useSelector } from "react-redux";

const RoleBasedElement = ({ adminComponent, retailerComponent }) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  return isAdmin ? adminComponent : retailerComponent;
};

export default RoleBasedElement;