import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, Tooltip, Button, Modal, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import blogService from "../../services/blogService";


const BlogList = ({fetchData, blogs, user}) => {

    const [openModal, setOpenModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        if (user.user.role == "doctor") {
            fetchData('doctor_blogs');
        }
        else if(user.user.role == "lab"){
            fetchData('lab_blogs');
        }
    }, []);

    const handleDeleteClick = async (e, blogId) => {
        console.log('Delete button clicked');
        e.stopPropagation();
        try {
            const resp = await blogService.deleteBlog(blogId);
            console.log("delete resp : ", resp);
            if (user.user.role == "doctor") {
                fetchData('doctor_blogs');
            }
            else if(user.user.role == "lab"){
                fetchData('lab_blogs');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
        setOpenModal(false);
    };

    const handleRowClick = (event) => {
        setSelectedBlog(event);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedBlog(null);
    };

    return (
        <>
        <TableContainer component={Paper} sx={{ marginTop: '30px', maxHeight: '430px'  }}>
            <Table aria-label="blog table">
                <TableHead>
                    <TableRow>
                        <TableCell>Blog</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {blogs.map((blog, index) => (
                        <TableRow 
                            key={index}
                            hover
                            onClick={() => handleRowClick(blog)}
                            style={{ cursor: 'pointer' }}
                        >
                            <TableCell>{blog.name}</TableCell>
                            <TableCell>
                                <Typography noWrap sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {blog.content}
                                </Typography>
                            </TableCell>
                            <TableCell>{blog.createdDate}</TableCell>
                            <TableCell>
                                <Tooltip title="Delete Blog">
                                    <Button onClick={(e) => handleDeleteClick(e, blog._id)}><DeleteIcon /></Button>
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
                        {console.log("selectedBlog:",selectedBlog)}
                            {selectedBlog ? selectedBlog.name : Event} Details
                        </Typography>
                        <IconButton aria-label="close" onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {selectedBlog && (
                        <>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">{selectedBlog.description}</Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">On {selectedBlog.createdDate}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={(e) => handleDeleteClick(e, selectedBlog._id)}
                                >
                                    Delete Blog
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default BlogList;