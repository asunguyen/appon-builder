import API from './base.js'

export default {
    post(path, body, next) {
        API
            .post(path, body)
            .then(r => {
                if (r && r.data) return next(null, r.data)
                next(null, r)
            })
            .catch(e => {
                if (e && e.response && e.response.data) return next(e.response.data)
                if (e && e.response) return next(e.response)
                console.log("error:: ", e);
                next(e)
            })
    },
    get(path, params, next) {
        API
            .get(path, { params })
            .then(r => {
                if (r && r.data) return next(null, r.data)
                next(null, r)
            })
            .catch(e => {
                if (e && e.response && e.response.data) return next(e.response.data)
                if (e && e.response) return next(e.response)
                console.log("error:: ", e);
                next(e)
            })
    }
}