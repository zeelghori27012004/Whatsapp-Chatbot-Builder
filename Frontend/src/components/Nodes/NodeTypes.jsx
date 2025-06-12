import {
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
  TriggerUserMessage: TriggerUserMessage,
  TriggerNewChat: TriggerNewChat,
  ConditionKeyword: ConditionKeyword,
  ConditionVariable: ConditionVariable,
  ActionSendText: ActionSendText,
  ActionSendMedia: ActionSendMedia,
  ActionQuickReply: ActionQuickReply,
  ActionDelay: ActionDelay,
  ActionSetVariable: ActionSetVariable,
  ActionApiCall: ActionApiCall,
  ControlGoto: ControlGoto,
  ControlEndFlow: ControlEndFlow,
  ConditionInputAsk: InputAsk,
  ConditionAiGpt: AiGpt,
  ConditionDebugLog: DebugLog,
};

export default nodeTypes;
