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

describe("insert", () => {
    beforeAll(async () => {
        const url = "mongodb://localhost:27017/testing";

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(async () => {
        await Article.deleteMany();
        await mongoose.connection.close();
    });

    it("should insert a doc into collection", async done => {
        await Article.create(mockArticle);

        const insertedArticle = await Article.findOne({ title: "Overskrift" });
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
    }, 30000);

    it("should contain two documents after insert, one documents after delete", async done => {
        const mockArticleUniqueTitle = {
            ...mockArticle,
            title: "Title"
        };
        await Article.create(mockArticleUniqueTitle);

        let articleCount = await Article.countDocuments();

        // Har ett dokument fra første test, så skal ha 2 nå, og 1 etter delete
        expect(articleCount).toBe(2);

        await Article.deleteOne({ title: "Title" });
        articleCount = await Article.countDocuments();

        expect(articleCount).toBe(1);

        done();
    }, 30000);

    it("should throw error on invalid data", async done => {
        expect.assertions(1);
        try {
            await Article.create(invalidMockArticle);
        } catch (e) {
            expect(e.message).toMatch(/article validation failed/i);
        }
        done();
    }, 30000);

    it("should throw error on duplicate titles", async done => {
        expect.assertions(1);

        try {
            await Article.create(mockArticle);
        } catch (e) {
            expect(e.message).toMatch(/duplicate key error/i);
        }

        done();
    }, 30000);
});
