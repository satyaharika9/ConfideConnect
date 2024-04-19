import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, Tooltip, Button, Typography, Modal, Box, IconButton , Input} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import labRequestService from "../../services/labrequestService";


const LabRequestList = ({fetchData, labRequests}) => {

    const [openModal, setOpenModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetchData("lab_lab_requests");
    }, []);

    const handleChatClick = (e) => {
        console.log('Chat button clicked');
        e.stopPropagation();
    };

    const handleDeleteClick = async (e, labRequestId) => {
        console.log('Delete button clicked');
        e.stopPropagation();
        try {
            const resp = await labRequestService.deleteLabRequest(labRequestId);
            console.log("delete resp : ", resp);
            fetchData("lab_lab_requests");
        } catch (error) {
            console.error('Error deleting lab request:', error);
        }
        setOpenModal(false);
    };

    const handleFileUpload = () => {
        console.log('File Upload ');
    };

    const handleRowClick = (request) => {
        setSelectedRequest(request);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRequest(null);
    };

    return (
        <>
        <TableContainer component={Paper} sx={{ marginTop: '30px', maxHeight: '430px' }}>
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
                        <TableRow 
                            key={index}
                            hover
                            onClick={() => handleRowClick(request)}
                            style={{ cursor: 'pointer' }}
                            >
                            <TableCell>{request.labrequest.requestName}</TableCell>
                            <TableCell>
                                <Typography noWrap sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {request.labrequest.requestDescription}
                                </Typography>
                            </TableCell>
                            <TableCell>{request.labrequest.createdDate}</TableCell>
                            <TableCell>{request.labrequest.status}</TableCell>
                            <TableCell>
                                <Tooltip title={`Chat with patient`}>
                                    <Button onClick={() => handleChatClick()}><ChatIcon /></Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Delete Request">
                                    <Button onClick={() => handleDeleteClick(request.labrequest._id)}><DeleteIcon /></Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {selectedRequest? selectedRequest.labrequest.requestName: Request} Details
                        </Typography>
                        <IconButton aria-label="close" onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {selectedRequest && (
                        <>
                        {console.log("selectedRequest:",selectedRequest)}
                        <Box sx={{mt: 2}}>
                            <Typography variant="body1">Assigned to physician Dr. {selectedRequest.lab.name}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">{selectedRequest.labrequest.requestDescription}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">On {selectedRequest.labrequest.creationTime}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">Status: {selectedRequest.labrequest.status}</Typography>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Input type="file" onChange={handleFileUpload} />
                        </Box>
                        <Box sx={{mt: 4}}>
                            <Button
                                variant="contained"
                                startIcon={<ChatIcon />}
                                onClick={(e) => handleChatClick(e)}
                            >
                                Chat with patient
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={(e) => handleDeleteClick(e, selectedRequest.labrequest._id)}
                            >
                                Delete Request
                            </Button>
                        </Box>
                    </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default LabRequestList;