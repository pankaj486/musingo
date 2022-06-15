class User
{
    constructor(id, email, remember, jwt_access=undefined, jwt_refresh=undefined) {
        this.id = id;
        this.email = email;
        this.remember = remember
        if (jwt_access)
            this.jwt_access = jwt_access
        if (jwt_refresh)
            this.jwt_refresh = jwt_refresh
    }

    get jwt_access() {
        if (this.remember)
        {
            return localStorage.getItem('jwt_access')
        } else {
            return sessionStorage.getItem('jwt_access')
        }
    }

    set jwt_access(value) {
        if (this.remember)
        {
            localStorage.setItem('jwt_access', value)
        } else {
            sessionStorage.setItem('jwt_access', value)
        }
    }

    get jwt_refresh() {
        if (this.remember)
        {
            return localStorage.getItem('jwt_refresh')
        } else {
            return sessionStorage.getItem('jwt_refresh')
        }
    }

    set jwt_refresh(value) {
        if (this.remember)
        {
            localStorage.setItem('jwt_refresh', value)
        } else {
            sessionStorage.setItem('jwt_refresh', value)
        }
    }
}

export default User