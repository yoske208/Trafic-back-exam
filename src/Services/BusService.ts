import Bus, { IBus } from "../Models/BusModel";

const getBuses = async () => {
  try {
    const buses = await Bus.find();
    console.log(buses);

    if (!buses) return "cant find posts";

    return buses;
  } catch (error: any) {
    return `cant find mongo DB ${error}`;
  }
};

const getOneBus = async (_id: string) => {
  try {
    console.log(_id);
    const bus = await Bus.findById(_id);
    console.log(bus);
    if (!bus) return "the post is not found";
    return bus;
  } catch (error: any) {
    return `cant find mongo DB ${error}`;
  }
};

const addBus = async (busData: Partial<IBus>) => {
  try {
    const newBus = new Bus(busData);
    return await newBus.save();
  } catch (error) {
    return `cant find the mongo DB ${error}`;
  }
};

const editBus = async (_id: string, newData: Partial<IBus>) => {
  try {
    const bus = await Bus.findById(_id);
    const updateBus = await Bus.findByIdAndUpdate(
      _id,
      {
        ...newData,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return updateBus;
  } catch (error: any) {
    return `cant find the mongo DB ${error}`;
  }
};

const deleteBus = async (_id: string) => {
  try {
    const bus = await Bus.findByIdAndDelete(_id);
    return "bus deleted";
  } catch (error: any) {
    return `cant find the mongo DB ${error}`;
  }
};

export { addBus, deleteBus, editBus, getBuses, getOneBus };
