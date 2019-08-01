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
    }
  ];

  const list2 = [{
      name: `### Supports GitHub flavored markdown
Featuring cutting edge HTML features like
* Headings
* Bullet points
* **Bold** and *italic* text
* Links
* Images
* \`\`\`
() => {
    // Code blocks
}
\`\`\`

Watch out, Netscape navigator 2.0!`
    },
    {
      name: `### Works on mobile devices
Unlike a certain other website...`
    },
    {
      name: `### And more!
[x] Colors
[x] Deadlines
[x] Checkboxes`,
      color: "#ff6",
      date: new Date()
    }
  ];

  const list3 = [{
      name: `### Edit a card
You can edit the contents of a card by clicking on it. Remember to use Shift + Enter to create a newline.`
    },
    {
      name: `### Drag a card or list
Reposition cards and lists by dragging them with a mouse or touch gesture.`
    },
    {
      name: `### Create a card or list
Add a new card to an existing list by clicking the + button below each list. You can add a new list by clicking the "Add a list"-button to the right`
    },
    {
      name: `### Add a checklist
For a task that has many sub-tasks, you can create a checklist with markdown.
[x] Like this
[ ] Click me`
    },
    {
      name: `### Change the board
You can edit the title of the board by clicking it. You can also change the color of the board by clicking the button in the top right corner.`
    }
  ];

  // Append a warning message to the top of list3 for guest users only
  if (!userId) {
    list3.unshift({
      name: `### Sign in to save changes
Since you are not signed in, your changes will not persist after you leave the website. Go back to the login screen by pressing the 'Sign in' button in the top right corner.`
    });
  }

  return {
    _id: shortid.generate(),
    title: "Bug & Issue Tracker",
    color: "blue",
    lists: [
      {
        _id: shortid.generate(),
        title: "Uncategorized!",
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
      }
    ],
    users: userId ? [userId] : []
  };
};

export default createWelcomeBoard;