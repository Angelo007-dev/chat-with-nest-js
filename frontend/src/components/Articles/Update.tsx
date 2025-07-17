
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

import { IArticle } from '../../modules/Article/model/article';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import UpdateIcon from '@mui/icons-material/Update';


const INITIAL_STATE = {
    nom: "",
    quantity: 0,
};

export default function Article() {
    const { id } = useParams();

    //states
    const [newArticle, setNewArticle] = useState<IArticle>(INITIAL_STATE);
    const [errors, setErrors] = useState<Partial<IArticle>>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            API.get(`/article/${id}`)
                .then((res) => {
                    console.log("Article récupéré :", res.data);
                    setNewArticle({
                        nom: res.data.nom,
                        quantity: res.data.quantity,
                    });
                })
                .catch((err) => {
                    toast.error("Error on load data.");
                    console.error(err);
                });
        }
    }, [id]);


    //Handler
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewArticle((prev) => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) : value }));
    };


    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            try {
                if (id) {
                    await API.patch(`/article/${id}`, newArticle);
                    toast.success("Article update successfully!");
                }

                navigate("/");
                setErrors({});
            } catch (err: any) {
                const message = err.response?.data?.message || "Erreur";
                toast.error(message);
            }
        },
        [newArticle, id]
    );

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
                    <UpdateIcon></UpdateIcon>
                </Avatar>
                <Typography component={"h1"} variant='h5' sx={{ textAlign: "center" }}>Update article</Typography>
                <Box component={"form"} noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField
                        placeholder="Enter the new article name"
                        name="nom"
                        type="text"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        value={newArticle.nom}
                        onChange={handleInputChange}
                    />

                    <TextField
                        placeholder="quantity"
                        name="quantity"
                        type="number"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        value={newArticle.quantity}
                        onChange={handleInputChange}
                    />

                    <Button type='submit' variant='contained' fullWidth sx={{ mt: 1 }}>Update</Button>
                </Box>
            </Paper>
        </Container>
    )
}
