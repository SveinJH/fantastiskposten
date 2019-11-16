class APIFeatures {
    query : any;
    queryString : any;

    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    importify () {
        if (this.queryString.importance) {
            this.query = this.query.find({ importance: this.queryString.importance });
        } else {
            this.query = this.query;
        }

        return this;
    }

    categorise () {
        if (this.queryString.category) {
            this.query = this.query.find({ category: this.queryString.category });
        } else {
            this.query = this.query;
        }

        return this;
    }
}

export default APIFeatures;