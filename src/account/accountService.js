
class AccountService {
    constructor() {
        this.signUp = this.signUp.bind(this);
        this.logIn = this.logIn.bind(this);
    }
    signUp(user) {
         return user;
    }
    logIn(username, password) {
        return {
            username: username,
            password: password
        }
    }

}

module.exports = AccountService;

