import shortid from "shortid";

// Give every card in a list an _id and the color white UNLESS those properties already exist
const appendAttributes = list =>
  list.map(card => ({
    color: "white",
    _id: shortid.generate(),
    ...card
  }));

// Generate the initial showcase board that every user and guest gets when they first log in
const createWelcomeBoard = userId => {
  const list1 = [
    {
      name: "Motion detection isn't working for the PorchCam camera",
      description: "PorchCam camera does not seem to be responding to any motion (even those well within the range of 50 ft). Recording and all other functionality of the PorchCam device doesn't seem to be impacted at all though",
      created_by: "Mattheus Anderson",
      opened_at: "2019-08-01T10:58:50.300Z",
      status: "complete"
    },
    {
      name: "Fuzzy images from night vision recordings",
      description: `User reports that the images sometimes "fuzz out" or have a period where the image quality is low resolution`,
      created_by: "Gabriella Lily",
      opened_at: "2019-06-01T10:58:50.300Z",
      status: "Cannot reproduce"
    }
  ];

  const list2 = [
    {
      name: "Motion detection isn't working for the PorchCam camera",
      description: "PorchCam camera does not seem to be responding to any motion (even those well within the range of 50 ft). Recording and all other functionality of the PorchCam device doesn't seem to be impacted at all though",
      created_by: "Mattheus Anderson",
      opened_at: "2019-08-01T10:58:50.300Z",
      status: "complete",
      priority: "Critical"
    },
    {
      name: "Fuzzy images from night vision recordings",
      description: `User reports that the images sometimes "fuzz out" or have a period where the image quality is low resolution`,
      created_by: "Gabriella Lily",
      opened_at: "2019-06-01T10:58:50.300Z",
      status: "Cannot reproduce",
      priority: "Critical"
    },
    {
      name: "Motion detection isn't working for the PorchCam camera",
      description: "PorchCam camera does not seem to be responding to any motion (even those well within the range of 50 ft). Recording and all other functionality of the PorchCam device doesn't seem to be impacted at all though",
      created_by: "Mattheus Anderson",
      opened_at: "2019-08-01T10:58:50.300Z",
      status: "complete",
      priority: "Critical"
    },
    {
      name: "Fuzzy images from night vision recordings",
      description: `User reports that the images sometimes "fuzz out" or have a period where the image quality is low resolution`,
      created_by: "Gabriella Lily",
      opened_at: "2019-06-01T10:58:50.300Z",
      status: "Cannot reproduce",
      priority: "Critical"
    }
  ];

  const list3 = [
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
      status: "Cannot reproduce",
      priority: "High"
    },
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
      status: "Cannot reproduce",
      priority: "High"
    }
  ];

  const list4 = [
    {
      name: "Motion detection isn't working for the PorchCam camera",
      description: "PorchCam camera does not seem to be responding to any motion (even those well within the range of 50 ft). Recording and all other functionality of the PorchCam device doesn't seem to be impacted at all though",
      created_by: "Mattheus Anderson",
      opened_at: "2019-08-01T10:58:50.300Z",
      status: "complete",
      priority: "Normal"
    },
    {
      name: "Fuzzy images from night vision recordings",
      description: `User reports that the images sometimes "fuzz out" or have a period where the image quality is low resolution`,
      created_by: "Gabriella Lily",
      opened_at: "2019-06-01T10:58:50.300Z",
      status: "Cannot reproduce",
      priority: "Normal"
    },
    {
      name: "Motion detection isn't working for the PorchCam camera",
      description: "PorchCam camera does not seem to be responding to any motion (even those well within the range of 50 ft). Recording and all other functionality of the PorchCam device doesn't seem to be impacted at all though",
      created_by: "Mattheus Anderson",
      opened_at: "2019-08-01T10:58:50.300Z",
      status: "complete",
      priority: "Normal"
    },
    {
      name: "Fuzzy images from night vision recordings",
      description: `User reports that the images sometimes "fuzz out" or have a period where the image quality is low resolution`,
      created_by: "Gabriella Lily",
      opened_at: "2019-06-01T10:58:50.300Z",
      status: "Cannot reproduce",
      priority: "Normal"
    }
  ];

  const list5 = [
    {
      name: "Motion detection isn't working for the PorchCam camera",
      description: "PorchCam camera does not seem to be responding to any motion (even those well within the range of 50 ft). Recording and all other functionality of the PorchCam device doesn't seem to be impacted at all though",
      created_by: "Mattheus Anderson",
      opened_at: "2019-08-01T10:58:50.300Z",
      status: "complete",
      priority: "Low"
    },
    {
      name: "Fuzzy images from night vision recordings",
      description: `User reports that the images sometimes "fuzz out" or have a period where the image quality is low resolution`,
      created_by: "Gabriella Lily",
      opened_at: "2019-06-01T10:58:50.300Z",
      status: "Cannot reproduce",
      priority: "Low"
    },
    {
      name: "Motion detection isn't working for the PorchCam camera",
      description: "PorchCam camera does not seem to be responding to any motion (even those well within the range of 50 ft). Recording and all other functionality of the PorchCam device doesn't seem to be impacted at all though",
      created_by: "Mattheus Anderson",
      opened_at: "2019-08-01T10:58:50.300Z",
      status: "complete",
      priority: "Low"
    },
    {
      name: "Fuzzy images from night vision recordings",
      description: `User reports that the images sometimes "fuzz out" or have a period where the image quality is low resolution`,
      created_by: "Gabriella Lily",
      opened_at: "2019-06-01T10:58:50.300Z",
      status: "Cannot reproduce",
      priority: "Low"
    }
  ];

  return {
    _id: shortid.generate(),
    title: "Bugs & Issues Tracker",
    color: "blue",
    category: "priority",
    lists: [
      {
        _id: shortid.generate(),
        title: "Uncategorized",
        cards: appendAttributes(list1)
      },
      {
        _id: shortid.generate(),
        title: "Critical",
        cards: appendAttributes(list2)
      },
      {
        _id: shortid.generate(),
        title: "High",
        cards: appendAttributes(list3)
      },
      {
        _id: shortid.generate(),
        title: "Normal",
        cards: appendAttributes(list4)
      },
      {
        _id: shortid.generate(),
        title: "Low",
        cards: appendAttributes(list5)
      }
    ],
    users: userId ? [userId] : []
  };
};

export default createWelcomeBoard;
