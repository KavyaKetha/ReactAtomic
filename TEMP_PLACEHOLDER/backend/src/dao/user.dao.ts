import { User } from "../models/User.model";

export const signIn = async (email: string, password: string): Promise<any> => {
    return await User.findOne({
        where: {
            email: email
        },
        attributes: ['id', 'email', 'password','role'],
        raw: false
    })
}
export const findUser = async (email: string): Promise<any> => {
    return await User.findOne({
        where: {
            email: email,
        },
        attributes: ['id', 'email'],
        raw: false
    })
}
export const signUp = async (email: string, encriptedPassword: string): Promise<any> => {
    let result = await User.create({
        email: email,
        password: encriptedPassword
    }, { raw: false })

    return result.get({ plain: true });

}
export const updateToken = async (email: string, token: string | null): Promise<any> => {
    return await User.update(
        { token: token },
        {
            where: {
                email: email,
            },
        },
    );
}
export const findToken = async (token: string): Promise<any> => {
    return await User.findOne(
        {
            where: {
                token: token
            },
        }
    );
}