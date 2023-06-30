export const getConfigAuth = () => {

    return {        
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    }

}
