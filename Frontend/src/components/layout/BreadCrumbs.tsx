import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  const renderBreadcrumbItem = (value: string, index: number) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    const formattedValue = value.replace(/-/g, " ");

    return isLast ? (
      <Typography color="textPrimary" key={to}>
        {formattedValue}
      </Typography>
    ) : (
      <Link key={to} to={to} color="inherit">
        {formattedValue}
      </Link>
    );
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" to="/">
        Home
      </Link>
      {pathnames.map(renderBreadcrumbItem)}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
