class User {
    setUser = ({name, email, avatar}) => {
        this.name = name
        this.email = email
        this.avatar = avatar
    }    
}


export const user = new User()