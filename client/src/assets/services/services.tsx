import url from '../url/url';
import Axios from 'axios';

class ArticleService {
    //////////////
    // ARTICLES
    getArticles = async (query: string) => {
        return Axios.get(`${url}${query}`).then(response => response.data);
    };

    getArticle = async (id: string) => {
        return Axios.get(`${url}/${id}`).then(response => response.data);
    };

    updateArticle = async (id: string, updatedArticle: object) => {
        return Axios.put(`${url}/${id}`, updatedArticle).then(
            response => response.data
        );
    };

    deleteArticle = async (id: string) => {
        return Axios.delete(`${url}/${id}`).then(response => response.data);
    };

    createArticle = async (newArticle: object) => {
        return Axios.post(`${url}`, newArticle).then(response => response.data);
    };

    //////////////
    // COMMENTS
    updateComments = async (
        id: string,
        comments: { author: string; content: string }[]
    ) => {
        const newComments = {
            comments: [...comments]
        };

        return Axios.patch(`${url}/${id}`, newComments).then(
            response => response.data
        );
    };

    //////////////
    // RATING
    updateRating = async (
        id: string,
        rating: { totalRating: number; ratersCount: number }
    ) => {
        const newRating = {
            rating: { ...rating }
        };

        return Axios.patch(`${url}/${id}`, newRating).then(
            response => response.data
        );
    };

    //////////////
    // LIVEFEED ITEMS
    getLivefeedItems = async () => {
        return Axios.get(`${url}/titles`).then(response => response.data);
    };
}

export let articleService = new ArticleService();
