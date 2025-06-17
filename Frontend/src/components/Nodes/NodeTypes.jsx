import {
  ActionButtons,
  ActionApiCall,
  ActionDelay,
  ActionQuickReply,
  ActionSendMedia,
  ActionSendText,
  ActionSetVariable,
  AiGpt,
  ConditionKeyword,
  ConditionVariable,
  ControlEndFlow,
  ControlGoto,
  DebugLog,
  InputAsk,
  TriggerNewChat,
  TriggerUserMessage,
} from "./NodeWrapper";

const nodeTypes = {
  start: TriggerUserMessage,
  // TriggerNewChat: TriggerNewChat,
  keywordMatch: ConditionKeyword,
  // ConditionVariable: ConditionVariable,
  message: ActionSendText,
  buttons: ActionButtons,
  // ActionSendMedia: ActionSendMedia,
  // ActionQuickReply: ActionQuickReply,
  // ActionDelay: ActionDelay,
  // ActionSetVariable: ActionSetVariable,
  apiCall: ActionApiCall,
  // ControlGoto: ControlGoto,
  end: ControlEndFlow,
  // ConditionInputAsk: InputAsk,
  // ConditionAiGpt: AiGpt,
  // ConditionDebugLog: DebugLog,
};

export default nodeTypes;
