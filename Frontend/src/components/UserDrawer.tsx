import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { useLogout } from "../hooks/msalFlow";
import { useAppSelector } from "../redux/hook";
import { Role } from "../constants/role-enum";
import { useNavigate } from "react-router-dom";

interface UserDrawerProps {
  open: boolean;
  toggleDrawer?: (open: boolean) => void;
}

export default function UserDrawer({ open, toggleDrawer }: UserDrawerProps) {
  const { handleLogout } = useLogout();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    user.userId && (
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List>
            <ListItem>
              <div className="flex flex-col items-center justify-center w-full py-6">
                <Avatar
                  alt={`${user.email}'s avatar`}
                  src="/static/images/avatar/1.jpg"
                />
                <strong className="font-bold pt-2">{user.email}</strong>
              </div>
            </ListItem>

            {user.roles.includes(Role.USER) && (
              <ListItem>
                <ListItemButton
                  onClick={() => navigate("/user-profile")}
                  aria-label="Go to user profile"
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="User Profile" />
                </ListItemButton>
              </ListItem>
            )}
            {[Role.ADMIN, Role.SUPER_ADMIN].some((role) =>
              user.roles.includes(role)
            ) && (
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate("/user-administration");
                  }}
                >
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="User Administration" />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    )
  );
}
