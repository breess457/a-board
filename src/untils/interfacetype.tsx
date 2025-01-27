export interface DetailData {
    _id: string;
    category:string;
    countComment:number;
    createDate:string;
    userId:string
    title: string;
    detail: string;
    users:{
      firstname:string,
      lastname:string,
      phone:string,
      createDate:string,
      username:string,
      _id:string
    }
  }

 export interface BlogData {
    _id: string;
    category:string;
    countComment:number;
    createDate:string;
    userId:string
    title: string;
    detail: string;
}

export interface CommentData {
  _id:string;
  blogerId:string;
  createDate:string;
  textcomment:string;
  userId:string;
  users:{
      firstname:string,
      lastname:string,
      phone:string,
      createDate:string,
      username:string,
      _id:string
  }
}

export interface ProfileData {
  firstname:string;
  lastname:string;
  phone:string;
  createDate:string;
  username:string;
  _id:string;

}

export interface GetProfile {
  Profile:{
    firstname:string;
    lastname:string;
    phone:string;
    createDate:string;
    username:string;
    _id:string;
  }

}

export interface TypeAuthCookie {
  message:string;
  nameuser:string;
  statusCode:number;
  token:string;
}