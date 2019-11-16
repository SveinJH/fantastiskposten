import Article from './../models/articleModel';
import APIFeatures from './../utils/APIFeatures';


exports.getAllArticles = async (req: any, res: any) => {
    try {
        // Execute query
        const features = new APIFeatures(Article.find(), req.query).sort().importify().categorise();
        
        const articles = await features.query;
        

        // Send response
        res.status(200).json({
            status: 'success',
            results: articles.length,
            data: {
                articles
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getArticle = async (req: any, res: any) => {
    try {
        const article = await Article.findById(req.params.id);
        // Tour.findOne({ _id: req.params.id })

        res.status(200).json({
            status: 'success',
            data: {
                article
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createArticle = async (req: any, res: any) => {
    try {
        const newArticle : any = await Article.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                article: newArticle
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateArticle = async (req: any, res: any) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                article
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteArticle = async (req: any, res: any) => {
    try {
        await Article.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};