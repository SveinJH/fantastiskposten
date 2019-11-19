import * as express from "express";
const articleController = require("./../controllers/articleController");

const router = express.Router();

router
    .route("/")
    .get(articleController.getAllArticles)
    .post(articleController.createArticle);

router.route("/titles").get(articleController.getAllTitles);

router
    .route("/:id")
    .get(articleController.getArticle)
    .put(articleController.updateArticle)
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle);

module.exports = router;
