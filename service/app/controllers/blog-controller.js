// controller for blog 
import * as blogService from '../services/blog-services.js'
import mongoose from 'mongoose';
import { setError, setResponse } from './response-handler.js';

export const getAllBlogs = async (request, response) => {
    try{
        const getParams = {...request.filter}
        const allBlogs = await blogService.getAllBlogs();
        setResponse(allBlogs,response);
    }
    catch (error){
        setError(error,response)
    }
}

export const createBlog = async (request, response) => {
    try{
        const createParams = {...request.body};
        const addBlog = await blogService.createBlog(createParams);
        setResponse(addBlog,response)
    }
    catch(error){
        setError(error,response)
    }
}

export const updateBlog = async (request, response) => {
    const { id } = request.params;
    const updatedBlogData = { ...request.body };
    try {
        const updatedBlog = await blogService.updateBlog(id, updatedBlogData);
        setResponse(updatedBlog, response);
    } catch (error) {
        setError(error, response);
    }
}


export const deleteBlog = async (request,response) =>{
    const {id} = request.params;
    try{
        await blogService.deleteBlog(id);
        response.sendStatus(204);
    }
    catch(error){
        setError(error,response)
    }
}

export const filterBlog = async (request,response) =>{
    const{blogId, createrId} = request.query;
    try{
        const filteredBlogs = await blogService.filterBlog(blogId,createrId);
        setResponse(filteredBlogs,response)
    }
    catch(error){
        setError(error,response)
    }
};

export const deleteAllBlogs = async (request, response) => {
    try {
        await blogService.deleteAllBlogs();
        response.sendStatus(204);
    } catch (error) {
        setError(error, response);
    }
};