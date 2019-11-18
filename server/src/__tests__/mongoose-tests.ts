const mongoose = require("mongoose");
import Article from "../models/articleModel";

const mockArticle = {
    title: "Overskrift",
    description: "Innhold",
    category: "Nyheter",
    importance: 1,
    image: "URL"
};

const invalidMockArticle = {
    title: "Feil",
    description: "Innhold"
};

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
            useUnifiedTopology: true
        });
    });

    afterEach(async () => {
        await Article.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should insert a doc into collection", async done => {
        await Article.create(mockArticle);

        const insertedArticle = await Article.findOne({
            title: "Overskrift"
        });
        const {
            title,
            description,
            category,
            importance,
            image
        } = insertedArticle;
        expect(title).toEqual("Overskrift");
        expect(description).toEqual("Innhold");
        expect(category).toEqual("Nyheter");
        expect(importance).toEqual(1);
        expect(image).toEqual("URL");
        done();
    });

    it("should contain one document after insert, zero documents after delete", async done => {
        const mockArticleUniqueTitle = {
            ...mockArticle,
            title: "Title"
        };
        await Article.create(mockArticleUniqueTitle);

        let articleCount = await Article.countDocuments();

        expect(articleCount).toBe(1);

        await Article.deleteOne({ title: "Title" });
        articleCount = await Article.countDocuments();

        expect(articleCount).toBe(0);

        done();
    });

    it("should correctly update a document", async done => {
        await Article.create(mockArticle);
        const updatedArticle = await Article.findOneAndUpdate(
            {
                title: "Overskrift"
            },
            { $set: { title: "Oppdatert" } },
            { new: true }
        );

        expect(updatedArticle.title).toMatch("Oppdatert");

        done();
    });

    it("should return zero elements on mismatching data", async done => {
        await Article.create(mockArticle);
        const data = await Article.find({ title: "Ukjent" });

        expect(data.length).toBe(0);
        done();
    });

    it("should throw error on invalid data", async done => {
        expect.assertions(1);
        try {
            await Article.create(invalidMockArticle);
        } catch (e) {
            expect(e.message).toMatch(/article validation failed/i);
        }
        done();
    });

    it("should throw error on duplicate titles", async done => {
        expect.assertions(1);

        try {
            await Article.create(mockArticle);
            await Article.create(mockArticle);
        } catch (e) {
            expect(e.message).toMatch(/duplicate key error/i);
        }

        done();
    });
});
