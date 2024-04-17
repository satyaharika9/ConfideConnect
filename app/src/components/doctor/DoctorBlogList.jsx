import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import blogService from "../../services/blogService";


const DoctorBlogList = () => {

    const user = useSelector((state) => state.user);

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogsData = await blogService.getBlogsForCreator(user.user.doctorId);
                console.log("blogsData : ", blogsData);
                setBlogs(blogsData);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = () => {
        console.log('Delete button clicked');
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table aria-label="medical request table">
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
                        <TableRow key={index}>
                            <TableCell>{blog.name}</TableCell>
                            <TableCell>{blog.content}</TableCell>
                            <TableCell>{blog.createdDate}</TableCell>
                            <TableCell>
                                <Tooltip title="Delete Blog">
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

export default DoctorBlogList;