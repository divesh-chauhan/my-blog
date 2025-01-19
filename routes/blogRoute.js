const express = require('express');
const route = express.Router();
const Blog = require('../models/blogModel');

// create form
route.get('/create', (req, res) => {
    try {
        res.render('createBlog');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:'failed to create form.'});
    }
});

// create Blog
route.post('/blogs/create', async (req, res)=> {
    try {
        const {author, title, content} = req.body;
        await Blog.create({author, title, content});
        res.redirect('/api/blogs');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:'failed to create Blog.'});
    }
});

// see Blogs
route.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.render('viewBlogs', {blogs});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:'failed to see Blogs.'});
    }
});

// edit form
route.get('/blogs/:id/edit', async (req, res) => {
    try {
        const id = req.params.id.trim();
        const blog = await Blog.findById(id);
        res.render('editBlog', {blog});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:'failed to create edit form.'});
    }
});


// edit Blog
route.put('/blogs/:id', async (req, res) => {
    try {
        const id = req.params.id.trim();
        const updatedBlog = {
            author:req.body.author,
            title:req.body.title,
            content:req.body.content
        }
        await Blog.findByIdAndUpdate(id, updatedBlog, 
            {new:true, runValidators:true}
        );
        res.redirect('/api/blogs');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:'failed to edit Blog'});
    }
});

// delete Blog
route.delete('/blogs/:id', async(req, res) => {
    try {
        const blogId = req.params.id.trim();
        await Blog.findByIdAndDelete(blogId);
        res.redirect('/api/blogs');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:'failed to delete Blog.'});
    }
});


module.exports = route;
