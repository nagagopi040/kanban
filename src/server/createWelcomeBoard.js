import shortid from "shortid";

// Give every card in a list an _id and the color white UNLESS those properties already exist
const defaultCard = {
    color: "white",
    _id: shortid.generate()
  }

// Generate the initial showcase board that every user and guest gets when they first log in
const createWelcomeBoard = userId => {
  return {
    _id: shortid.generate(),
    title: "Bug & Issue Tracker",
    color: "blue",
    lists: [
      {
        name: "Motion detection isn't working for the PorchCam camera",
        description: "PorchCam camera does not seem to be responding to any motion (even those well within the range of 50 ft). Recording and all other functionality of the PorchCam device doesn't seem to be impacted at all though",
        created_by: "Mattheus Anderson",
        opened_at: "2019-08-01T10:58:50.300Z",
        status: "complete",
        priority: "High"
      },
      {
        name: "Fuzzy images from night vision recordings",
        description: `User reports that the images sometimes "fuzz out" or have a period where the image quality is low resolution`,
        created_by: "Gabriella Lily",
        opened_at: "2019-06-01T10:58:50.300Z",
        status: "Can't reproduce",
        priority: "High"
      },
      {
        ...defaultCard,
        name: "Supports GitHub flavored markdown Featuring cutting edge HTML features like"
      },
      {
        ...defaultCard,
        name: `Works on mobile devices Unlike a certain other website...`
      }
    ],
    users: userId ? [userId] : []
  };
};

export default createWelcomeBoard;