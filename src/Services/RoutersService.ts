import Router, { IRoutes } from "../Models/RoutesModel";

const getRouter = async () => {
  try {
    const router = await Router.find();
    console.log(router);

    if (!router) return "cant find router";

    return router;
  } catch (error: any) {
    return `cant find mongo DB ${error}`;
  }
};

const getOneRouter = async (_id: string) => {
  try {
    console.log(_id);
    const router = await Router.findById(_id);
    console.log(router);
    if (!router) return "the router is not found";
    return router;
  } catch (error: any) {
    return `cant find mongo DB ${error}`;
  }
};

const addRouter = async (routerData: Partial<IRoutes>) => {
  try {
    const newRouter = new Router(routerData);
    return await newRouter.save();
  } catch (error) {
    return `cant find the mongo DB ${error}`;
  }
};

const editRouter = async (_id: string, newData: Partial<IRoutes>) => {
  try {
    const router = await Router.findById(_id);
    const updateRouter = await Router.findByIdAndUpdate(
      _id,
      {
        ...newData,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return updateRouter;
  } catch (error: any) {
    return `cant find the mongo DB ${error}`;
  }
};

const deleteRouter = async (_id: string) => {
  try {
    const router = await Router.findByIdAndDelete(_id);
    return "router deleted";
  } catch (error: any) {
    return `cant find the mongo DB ${error}`;
  }
};

export {
     addRouter,
     deleteRouter,
     editRouter,
     getOneRouter,
     getRouter

 };
