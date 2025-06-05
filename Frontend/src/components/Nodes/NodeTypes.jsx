import FirstVisit from "./TriggerNodes/Firstvisit";
import VisitorReturnstoSite from "./TriggerNodes/Visitorreturnstosite";
import VisitorClicksOnChatIcon from "./TriggerNodes/Visitorclicksonchaticon";
import SendaMessage from "./ActionNodes/Sendamessage";
import AskaQuestion from "./ActionNodes/Askaquestion";
import ReturningVisitor from "./ConditionNodes/Returningvisitor";

const nodeTypes = {
  FirstVisitTrigger: FirstVisit,
  VisitorReturnToSiteTrigger: VisitorReturnstoSite,
  VisitorClicksOnChatIconTrigger: VisitorClicksOnChatIcon,
  SendaMessageAction: SendaMessage,
  AskaQuestionAction: AskaQuestion,
  ReturningVisitorCondition: ReturningVisitor,
};

export default nodeTypes;
