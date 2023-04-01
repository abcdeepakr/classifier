const createUser = async (supabase, reqbody) => {
    const { data, error } = await supabase
        .from('users')
        .insert([{
            id: reqbody.user.id,
            email: reqbody.user.email,
            role: 'user'
        }])

    if (error) {
        return { status: 400, error: error }
    } else {
        return { status: 200, data: data }
    }
}

const findUser = async (supabase, id) => {

    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', id)
    if (error) {
        console.log(error)
        return {
            status: 400,
            message: error
        }
    }
    if (data.length == 0) {
        return {
            status: 404,
            message: "user not found"
        }
    }
    return {
        status: 200,
        user: data[0]
    }
}

module.exports = { findUser, createUser }