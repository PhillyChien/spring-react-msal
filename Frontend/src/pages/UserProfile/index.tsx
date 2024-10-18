import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hook";
import { AdminRoles } from "../../constants/role-enum";

const UserProfilePage = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <Box className="flex justify-center items-center h-screen p-8">
      <Card className="w-full max-w-xl p-6">
        <CardContent>
          <Typography variant="h6" className="mb-4">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="h6">
            <strong>Roles:</strong>{" "}
            {user.roles.map((role) => (
              <Chip
                key={role}
                label={role}
                color={AdminRoles.includes(role) ? "primary" : "success"}
                className="m-1"
              />
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfilePage;
