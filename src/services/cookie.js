export default {
    set_cookie: (name, value, expire_day, domain_name) => {
        let cookie = `${name}=${value};`
        let day = new Date()
        day.setTime(day.getTime() + (expire_day * 24 * 60 * 60 * 1000))
        day = `expires=${day.toUTCString()};`
        let domain = (domain_name) ? `domain=${domain_name};` : ''
        document.cookie = `${cookie}${day}path=/;${domain}`
    },
    get_cookie: (name) => {
        let cookie = name + "="
        let list_cookie = document.cookie.split(';')
        for (let i = 0; i < list_cookie.length; i++) {
            let item = list_cookie[i]
            while (item.charAt(0) == ' ') {
                item = item.substring(1)
            }
            if (item.indexOf(cookie) == 0) {
                return item.substring(cookie.length, item.length)
            }
        }
        return ''
    },
    delete_cookie: (name) => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
}