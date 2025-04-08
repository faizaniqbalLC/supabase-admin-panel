import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import supabase from './supabase-client';
import './App.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon

const App = () => {
  const [content, setContent] = useState({
    title: '',
    description: '',
    titleUpdatedAt: '',
    descriptionUpdatedAt: ''
  });
  const [loading, setLoading] = useState(false);
  const [newContent, setNewContent] = useState({ title: '', description: '' });

  const fetchContent = async () => {
    const { data, error } = await supabase.from('content').select('*').single();
    if (error) {
      console.error(error);
      return;
    }
    setContent(data);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('content')
      .upsert([
        {
          id: 1, // Assuming one content record
          title: newContent.title,
          description: newContent.description,
          titleUpdatedAt: new Date().toISOString(),
          descriptionUpdatedAt: new Date().toISOString(),
        }
      ]);
    setLoading(false);

    if (error) {
      console.error(error);
    } else {
      setNewContent({ title: '', description: '' });
      fetchContent(); // Refresh content after saving
    }
  };

  const handleEdit = () => {
    setNewContent({ title: content.title, description: content.description });
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this content?');
    if (!isConfirmed) {
      return;
    }

    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', 1);

    if (error) {
      console.error(error);
    } else {
      setContent({
        title: '',
        description: '',
        titleUpdatedAt: '',
        descriptionUpdatedAt: ''
      });
    }
  };

  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh', backgroundColor: '#e0f7fa' }}>
      <Grid item xs={8} sx={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', color: '#333' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Admin Panel
          </Typography>
          <IconButton onClick={handleEdit} color="primary" aria-label="edit">
            <EditIcon fontSize="large" />
          </IconButton>
        </Box>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={newContent.title}
          onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newContent.description}
          onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
          margin="normal"
        />
        <Button onClick={handleSave} variant="contained" color="primary" 
        disabled={loading || !newContent.title || !newContent.description} fullWidth
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Grid>

      <Grid item xs={4} sx={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', color: '#333' }}>
        {content.title && content.description ? (
          <>
            <Typography variant="h5" gutterBottom>
              Title
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {content.title || 'N/A'}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {content.description || 'N/A'}
            </Typography>

            <Typography variant="body1" color="textSecondary" marginTop={2}>
              Title Last Updated: {content.titleUpdatedAt ? new Date(content.titleUpdatedAt).toLocaleString() : 'N/A'}
            </Typography>
            <Typography variant="body1" color="textSecondary" marginTop={2}>
              Description Last Updated: {content.descriptionUpdatedAt ? new Date(content.descriptionUpdatedAt).toLocaleString() : 'N/A'}
            </Typography>

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <IconButton onClick={handleDelete} color="error" aria-label="delete">
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Box>
          </>
        ) : (
          <Typography variant="h5" gutterBottom>
            No Content Available
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
