import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
        Paper, Tooltip, Button, Typography, Modal, Box, IconButton, Input } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import medicalRequestService from '../../services/medicalrequestService';


const DoctorMedicalRequestList = ({fetchData, medicalRequests}) => {

    const [openModal, setOpenModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetchData('doctor_medical_requests');
    }, []);

    const handleChatClick = (e) => {
        console.log('Chat button clicked');
        e.stopPropagation();
    };

    const handleDeleteClick = async (e, medicalRequestId) => {
        console.log('Delete button clicked');
        e.stopPropagation();
        try {
            const resp = await medicalRequestService.deleteMedicalRequest(medicalRequestId);
            console.log("delete resp : ", resp);
            fetchData('doctor_medical_requests');
        } catch (error) {
            console.error('Error deleting medical request:', error);
        }
        setOpenModal(false);
    };

    // Function to handle file upload
    const handleFileUpload = (event) => {
        if (event.target.type === "file") {
            const file = event.target.files?.[0];
            if (file) {
                if (file.type !== "application/pdf") {
                    console.log("Invalid file type: ", file.type);
                    alert("Please upload a PDF file.");
                    return; // Stop the function if the file is not a PDF
                }

                console.log("File uploaded: ", file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
    
                reader.onload = () => {
                    // This function runs after the file is read successfully
                    console.log("File as Data URL: ", reader.result);
    
                    // Copy the current state of selectedRequest to avoid mutating the state directly
                    const updatedRequest = {
                        ...selectedRequest,
                        medicalrequest: {
                            ...selectedRequest.medicalrequest,
                            doctorPrescription: reader.result
                        }
                    };
    
                    // Update the state with the new prescription
                    setSelectedRequest(updatedRequest);
                    console.log("Updated prescription:", updatedRequest.medicalrequest.doctorPrescription);
                    const requestId = updatedRequest.medicalrequest._id
                    medicalRequestService.updateMedicalRequest(requestId, updatedRequest.medicalrequest);
                };
    
                reader.onerror = (error) => {
                    console.log("Error reading file: ", error);
                };
                
            }
        }
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
                    {medicalRequests.map((request, index) => (
                        <TableRow 
                                key={index}
                                hover
                                onClick={() => handleRowClick(request)}
                                style={{ cursor: 'pointer' }}
                            >
                            <TableCell>{request.medicalrequest.requestName}</TableCell>
                            <TableCell>
                                <Typography noWrap sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {request.medicalrequest.requestDescription}
                                </Typography>
                            </TableCell>
                            <TableCell>{request.medicalrequest.creationTime}</TableCell>
                            <TableCell>{request.medicalrequest.status}</TableCell>
                            <TableCell>
                                <Tooltip title={`Chat with patient`}>
                                    <Button onClick={(e) => handleChatClick(e)}><ChatIcon /></Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Delete Request">
                                    <Button onClick={(e) => handleDeleteClick(e, request.medicalrequest._id)}><DeleteIcon /></Button>
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
                            {selectedRequest? selectedRequest.medicalrequest.requestName: Request} Details
                        </Typography>
                        <IconButton aria-label="close" onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {selectedRequest && (
                        <>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">{selectedRequest.medicalrequest.requestDescription}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">On {selectedRequest.medicalrequest.creationTime}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">Status: {selectedRequest.medicalrequest.status}</Typography>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Input type="file" accept="application/pdf" onChange={handleFileUpload} />
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
                                onClick={(e) => handleDeleteClick(e, selectedRequest.medicalrequest._id)}
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

export default DoctorMedicalRequestList;