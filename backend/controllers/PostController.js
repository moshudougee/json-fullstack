import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../database/db.json');

const readDB = () => {
    try {
        const data = fs.readFileSync(dbPath);
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error reading database file' + error);
    }
};

const writeDB = (data) => {
    try {
       fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); 
    } catch (error) {
       throw new Error('Error writing to database file' + error); 
    }
};

export const getPosts = async(req, res) => {
    try {
        const db = readDB();
        res.json(db.posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getPostById = async(req, res) => {
    try {
        const db = readDB();
        const post = db.posts.find(p => p.id === parseInt(req.params.id));
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const createPost = async(req, res) => {
    try {
        const db = readDB();
        const newPost = {
            id: db.posts.length + 1,
            title: req.body.title,
            content: req.body.content
        };
        db.posts.push(newPost);
        writeDB(db);
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updatePost = async(req, res) => {
    try {
        const db = readDB();
        const post = db.posts.find(p => p.id === parseInt(req.params.id));
        if (!post) return res.status(404).json({ error: 'Post not found' });

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        writeDB(db);
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deletePost = async(req, res) => {
    try {
        const db = readDB();
        const postIndex = db.posts.findIndex(p => p.id === parseInt(req.params.id));
        if (postIndex === -1) return res.status(404).json({ error: 'Post not found' });

        const deletedPost = db.posts.splice(postIndex, 1);
        writeDB(db);
        res.json(deletedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}