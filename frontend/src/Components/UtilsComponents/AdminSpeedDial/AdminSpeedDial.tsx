import "./AdminSpeedDial.css";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';
import { useState } from "react";

function AdminSpeedDial(): JSX.Element {

    const actions = [
        { icon: <AddLocationAltRoundedIcon />, name: 'Add Vacation' },
        { icon: <AssessmentRoundedIcon />, name: 'Report' },
        { icon: <TableViewRoundedIcon />, name: 'CSV Download' },
        { icon: <LogoutRoundedIcon />, name: 'Logout' },
      ];
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
      
    return (
        <div className="AdminSpeedDial">
			<Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />} 
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open} 
                    FabProps={{
                        sx: {
                          bgcolor: 'rgb(93,76,56)',
                          '&:hover': {
                            bgcolor: 'rgb(146,156,122)',
                          }
                        }
                    }}                                    
                >
                    {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                    />
                    ))}
                </SpeedDial>
            </Box>
        </div>
    );
}

export default AdminSpeedDial;
