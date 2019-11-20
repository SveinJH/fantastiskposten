const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
const request = supertest(app);
import Article from "../models/articleModel";
import mockArticles from "../test_data";

describe("testing database", () => {
    beforeAll(async () => {
        jest.setTimeout(10000);
        let url;
        if (process.env.TEST === "external") {
            url = "mongodb://mongo:27017/testing";
        } else {
            url = "mongodb://localhost:27017/testing";
        }

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        });
    });

    afterEach(async () => {
        await Article.deleteMany();
    });

    afterAll(async () => {
        await Article.deleteMany();
        await mongoose.connection.close();
    });

    it("returns all articles on getArticles endpoint and one on getArticle", async done => {
        await Article.create(mockArticles);
        let res = await request.get("/api/v1/articles");

        const articles = res.body.data.articles;

        expect(res.status).toBe(200);
        expect(articles.length).toBe(4);

        res = await request.get(`/api/v1/articles/${articles[0]._id}`);
        const article = res.body.data.article;

        expect(article.title).toBe("Overskrift");

        done();
    });

    it("should save article to database", async done => {
        const res = await request
            .post("/api/v1/articles")
            .send(mockArticles[0]);

        const articleCount = await Article.countDocuments();

        expect(res.status).toBe(201);
        expect(articleCount).toBe(1);
        done();
    });

    it("should delete an article given ID", async done => {
        await Article.create(mockArticles[0]);
        const article = await Article.find({ title: "Overskrift" }, { _id: 1 });
        const articleID = article[0]._id;
        let articleCount = await Article.countDocuments();

        expect(articleCount).toBe(1);

        const res = await request.delete(`/api/v1/articles/${articleID}`);
        articleCount = await Article.countDocuments();

        expect(articleCount).toBe(0);
        expect(res.status).toBe(204);
        done();
    });
});
