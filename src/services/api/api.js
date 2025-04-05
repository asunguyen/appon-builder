import API from './methods.js'

export default {
    app: {
        page(body, next) {
            API.post('/app/page', body, (e, r) => (e) ? next(e) : next(null, r))
        },
        me(params, next) {
            API.get('/app/me', params, next)
        },
        functions(body, next) {
            API.post('/app/functions', body, next)
        },
        api(body, next) {
            API.post('/app/api', body, next)
        }
    },
    auth: {

    },
    public: {
        dataAppReadPublic(body, next) {
            API.post('/public/data-app_read_public', body, next)
        }
    }
}