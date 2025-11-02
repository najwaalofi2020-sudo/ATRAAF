
export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface MessagePart {
    text: string;
}

export interface ChatMessage {
  role: MessageRole;
  parts: MessagePart[];
}
