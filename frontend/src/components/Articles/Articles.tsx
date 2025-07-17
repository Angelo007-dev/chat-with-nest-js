
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'

import { IArticle } from '../../modules/Article/model/article';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


const INITIAL_STATE = {
    nom: "",
    quantity: 0,
};

export default function Article() {

    //states
    const [newArticle, setNewArticle] = useState<IArticle>(INITIAL_STATE);
    const [errors, setErrors] = useState<Partial<IArticle>>({});
    const navigate = useNavigate();

    //Handler
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewArticle((prev) => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) : value }));
    };


    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            try {
                const response = await API.post("/article/new", newArticle);
                if (response) {
                    toast.success("Article create successful!");
                    // Stock the user token
                    localStorage.setItem("token", response.data.access_token);
                    navigate("/");
                    setErrors({});

                }
                else {
                    toast.error("Error")
                    setErrors({});
                }

            } catch (err: any) {
                const message = err.response?.data?.message || "Add Failed";

                toast.error(message);
            }
        }, [newArticle]
    )
    return (
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                <Avatar sx={{
                    mx: "auto",
                    bgColor: "primary.main",
                    textAlign: "center",
                    mb: 1
                }}
                >
                    <AddIcon></AddIcon>
                </Avatar>
                <Typography component={"h1"} variant='h5' sx={{ textAlign: "center" }}>Add new article</Typography>
                <Box component={"form"} noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField
                        placeholder='Enter the article name'
                        name="nom"
                        type='text'
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        //value={email}
                        onChange={handleInputChange}
                    //error={!!errors.email}
                    //helperText={errors.email}
                    />
                    <TextField
                        placeholder='quantity'
                        name="quantity"
                        type="number"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        //value={password}
                        onChange={handleInputChange}
                    //error={!!errors.password}
                    //helperText={errors.password}
                    />
                    <Button type='submit' variant='contained' fullWidth sx={{ mt: 1 }}>Add</Button>
                </Box>
            </Paper>
        </Container>
    )
}
