
import User, { IUser } from "../Models/UserModel";

const getUsers = async () => {
  try {
    const users = await User.find();
    console.log(users);

    if (!users) return "cant find posts";
    console.log(41);

    return users;
  } catch (error: any) {
    return `cant find mongo DB ${error}`;
  }
};
// const getPuzzelesByAuthor = async (author:string) =>{
//   try{
//     if(!author){
//       throw new Error('authorid is missing')
//     }
//     const puzzeles = await Puzzele.find({author})
//     .select('title content comments')
//     .populate('author', 'username -_id')
//       if(puzzeles.length <= 0){
//         throw new Error('this author not have puzzles')
//       }
//       return puzzeles
//   }
//   catch(err){

//   }
// }
const getOneUser = async (_id: string) => {
  try {
    console.log(_id);
    const user = await User.findById(_id);
    console.log(user);
    if (!user) return "the post is not found";
    return user;
  } catch (error: any) {
    return `cant find mongo DB ${error}`;
  }
};

const addUser = async (userData:Partial<IUser>) => {
  try {
    const newUser = new User(userData)
    return await newUser.save();
  } catch (error) {
    return `cant find the mongo DB ${error}`;
  }
};
// const addComment = async(_id:string,CommentData:IComment):Promise<IPuzzele| void> =>{
//   if(!_id || !CommentData){
//       console.error('sum data missing')
//       return 
//   }
//   const puzzele =  await Puzzele.findById(_id)
//   if(!puzzele) {
//       console.error('post dos not exsist')
//       return
//   }
//   puzzele.comments.push(CommentData)
//   await puzzele.save()
//   return puzzele
// }
const editUser = async (_id: string, newData: Partial<IUser>) => {
  try {
    const user = await User.findById(_id);
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        ...newData,
        password: user?.password,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return updateUser;
  } catch (error: any) {
    return  (`cant find the mongo DB ${error}`);
  }
};

const deleteUser = async (_id: string) => {
  try {
    const puzzele = await User.findByIdAndDelete(_id);
    return "user deleted";
  } catch (error: any) {
    return `cant find the mongo DB ${error}`;
  }
};

export {
    addUser,
    deleteUser,
    editUser,
    getOneUser,
    getUsers,

   
    // addComment,
    // getPuzzelesByAuthor
}
