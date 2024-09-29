import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "../hooks/useLogout";
import { useMsal } from "@azure/msal-react";

interface UserDrawerProps {
  open: boolean;
  toggleDrawer?: (open: boolean) => () => void;
}

export default function UserDrawer({ open, toggleDrawer }: UserDrawerProps) {
  const { handleLogout } = useLogout();
  const { accounts } = useMsal();
  const account = accounts[0];
  return (
    account && (
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List>
            <ListItem>
              <Box>
                <strong className="font-bold">{account.username}</strong>
              </Box>
            </ListItem>
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
