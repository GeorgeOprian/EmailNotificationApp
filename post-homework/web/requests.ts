 export const createUser = async (
    name: string,
    email: string
 ) => {

    const res = await fetch(
        'api/user/createUser',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email
            }),
            method: 'POST'
        }
    )

    const { resUser } = await res.json();

    return resUser;
}

export const getUser = async (
    email: string
 ) => {

    const res = await fetch(
        'api/user/getUser',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            }),
            method: 'POST'
        }
    )

    const { foundUser } = await res.json();

    return foundUser;
}

export const getPosts = async (

) => {
    const res = await fetch(
        'api/post/getPosts',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }
    )

    const { posts } = await res.json();

    return posts;
}

export const createPost = async (
    userId: string,
    text: string
) => {
    await fetch(
        'api/post/createPost',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                text: text
            }),
            method: 'POST'
        }
    )
}

export const updateUser = async (
    name: string,
    email: string
 ) => {

    await fetch(
        'api/user/editUser',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email
            }),
            method: 'POST'
        }
    )
}

export const fetchEmails = async (
    userRefId: number,
) : Promise<any> => {

    const data  = await fetch(
        `http://host.docker.internal:8080/email/?user=${userRefId}`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            
            method: 'GET'
        }
    )

    return data.json();
}