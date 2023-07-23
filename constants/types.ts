export type Postprops = {
    id:string,
    title:string,
    userId:string,
    likes:Like[],
    comments:Commentprops[],
    user?:{
        id:string,
        name:string,
        image:string,
        email:string
    }
}

export type Like = {
    id:string,
    userId:string,
    postId:string
}

export type Comment = {
    id:string,
    text:string,
    userId:string,
    postId:string
}


export type Commentprops = {
    id:string,
    text:string,
    userId:string,
    postId:number,
    user?:{
        id:string,
        name:string,
        image:string,
        email:string
    }
}
