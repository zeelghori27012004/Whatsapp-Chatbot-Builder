export const NODE_TYPES = {
  start: "User Message",
  message: "Send Text",
  askaQuestion: "Ask a Question",
  buttons: "Decision Buttons",
  apiCall: "API Call",
  keywordMatch: "Keyword Match",
  end: "End Flow",
};

export function getNodeLabel(type) {
  return NODE_TYPES[type] || type;
}

export const NODE_CATEGORY_MAP = {
  TriggerUserMessage: "start",

  ActionSendText: "message",
  ActionAskaQuestion: "askaQuestion",
  ActionButtons: "buttons",
  ActionApiCall: "apiCall",

  ConditionKeyword: "keywordMatch",

  ControlEndFlow: "end",
};

export function getNodeCategory(type) {
  return NODE_CATEGORY_MAP[type] || type;
}

export const nodeFieldMap = {
  start: {
    quickReply: "",
    waitForUserReply: false,
  },
  message: {
    message: "",
    waitForUserReply: false,
  },
  buttons: {
    message: "",
    buttons: [""],
    waitForUserReply: false,
  },
  keywordMatch: {
    keywords: [""],
    waitForUserReply: false,
  },
  apiCall: {
    requestName: "",
    method: "GET",
    url: "",
    authType: "none",
    headers: [],
    username: "",
    password: "",
    bearerToken: "",
    accessToken: "",
    waitForUserReply: false,
  },
  askaQuestion: {
    question: "",
    validationType: "none",
    numberOfRepeats: "1",
    saveTheAnswerAsContactProperty: "false",
    propertyName: "",
    waitForUserReply: false,
  },
  end: {
    waitForUserReply: false,
  },
};

export function getInitialFields(type) {
  const fields = nodeFieldMap[type];
  return fields ? structuredClone(fields) : {};
}

export const TriggerNodes = ["start"];

export const ConditionNodes = ["keywordMatch", "end"];

export const ActionNodes = ["message", "askaQuestion", "buttons", "apiCall"];

export const dummyData = {
    Select: [
      {
        Id: "2",
        Name: "Riya Patel",
        City: "2",
        Gender: "1",
        Password: "12345678",
        Hobbies: "cricket",
        PhoneNumber: "1234123412",
        Image: "image/2410231259min-cat-headphone-new.jpg",
        CityName: "Bardoli",
      },
      {
        Id: "3",
        Name: "teat",
        City: "3",
        Gender: "0",
        Password: "12345678",
        Hobbies: "cricket,dance",
        PhoneNumber: "9574099524",
        Image: "image/2409070342min-Screenshot 2023-11-23 230132.png",
        CityName: "Baroda",
      },
      {
        Id: "5",
        Name: "Jon Stewart Doe",
        City: "3",
        Gender: "0",
        Password: "12345678",
        Hobbies: "cricket",
        PhoneNumber: "6019521325",
        Image: "image/2409070435min-Screenshot 2023-11-23 230132.png",
        CityName: "Baroda",
      },
      {
        Id: "6",
        Name: "kiii",
        City: "2",
        Gender: "0",
        Password: "12345678",
        Hobbies: "cricket,dance",
        PhoneNumber: "1234567891",
        Image: "image/ledger.pdf",
        CityName: "Bardoli",
      },
      {
        Id: "7",
        Name: "darshan",
        City: "6",
        Gender: "0",
        Password: "12345678",
        Hobbies: "true",
        PhoneNumber: "123456789",
        Image: "",
        CityName: "Ahemdabad",
      },
      {
        Id: "8",
        Name: "sacadcds",
        City: "6",
        Gender: "0",
        Password: "Waqar@2024",
        Hobbies: "reading",
        PhoneNumber: "1234567890",
        Image: "image/2410260617min-vlcsnap-2023-07-05-19h29m08s357.png",
        CityName: "Ahemdabad",
      },
    ],
    Error: [{ Status: 1, Message: "6 user selected." }],
  };