import { useEffect, useState } from "react";
import API from "../api/axios";

export interface Article {
    id: string;
    nom: string;
    quantity: number;
}


//Fetch Articles
export default function useArticle() {
    const [articles, setArticles] = useState<Article[]>([]);



    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await API.get('/article');
                setArticles(response.data);
            } catch (error) {
                console.log('Error on ferthing data');
            }
        };
        fetchArticles();

    }, []);
    return articles;
}
