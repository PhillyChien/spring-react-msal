import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" to="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const last = index === pathnames.length - 1;

        return last ? (
          <Typography color="textPrimary" key={to}>
            {value.replace(/-/g, " ")}
          </Typography>
        ) : (
          <Link key={to} to={to} color="inherit">
            {value.replace(/-/g, " ")}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
