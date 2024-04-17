import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';

import labRequestService from "../../services/labrequestService";
import labService from "../../services/labService";


const LabRequestList = () => {

    const user = useSelector((state) => state.user);

    const [labRequests, setLabRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const labrequests = await labRequestService.getLabRequestsForLab(user.user.labId);
                const labRequestsWithLabDetails = await Promise.all(
                  labrequests.map(async labrequest => {
                        const lab = await labService.getLab(labrequest.labId);
                        return { labrequest, lab };
                    })
                );
                console.log("labRequestsWithLabDetails : ", labRequestsWithLabDetails);
                setLabRequests(labRequestsWithLabDetails);
            } catch (error) {
                console.error('Error fetching medical requests or doctors:', error);
            }
        };

        fetchData();
    }, []);

    const handleChatClick = () => {
        console.log('Chat button clicked');
    };

    const handleDeleteClick = () => {
        console.log('Delete button clicked');
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table aria-label="medical request table">
                <TableHead>
                    <TableRow>
                        <TableCell>Request</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {labRequests.map((request, index) => (
                        <TableRow key={index}>
                            <TableCell>{request.labrequest.requestName}</TableCell>
                            <TableCell>{request.labrequest.requestDescription}</TableCell>
                            <TableCell>{request.labrequest.createdDate}</TableCell>
                            <TableCell>{request.labrequest.status}</TableCell>
                            <TableCell>
                                <Tooltip title={`Chat with patient`}>
                                    <Button onClick={() => handleChatClick()}><ChatIcon /></Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Delete Request">
                                    <Button onClick={() => handleDeleteClick()}><DeleteIcon /></Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LabRequestList;