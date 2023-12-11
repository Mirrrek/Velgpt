export type Serializable = boolean | number | string | null | { [key: string]: Serializable } | Serializable[];

export enum PacketType {
    SB_PING = 0x00,                         // { random: number }
    CB_PONG = 0x01,                         // { echo: number }

    SB_AUTHENTICATE = 0x10,                 // { subject: string, token: string }
    CB_AUTHENTICATED = 0x11,                // {}

    CB_UPDATE_USER_LIST = 0x20,             // { users: { name: string, group: string | null }[] }

    SB_ADD_TERM = 0x30,                     // { category: string, term: string }
    SB_REMOVE_TERM = 0x31,                  // { id: number  }

    CB_UPDATE_TERM_LIST = 0x40,             // { terms: { category: string, terms: { id: number, value: string }[] }[] }

    SB_REGISTER_GROUP = 0x50,               // { group: string }

    SB_CREATE_QUESTION = 0x60,              // { number: string, question: string }
    SB_ANSWER_QUESTION = 0x61,              // { id: number, answer: string }
    SB_REMOVE_QUESTION = 0x62,              // { id: number }

    CB_UPDATE_ANSWER_LIST = 0x70,           // ({ id: number, user: string, question: string | null, type: 'gpt', state: 'queued', request: string } | { id: number, user: string, question: string | null, type: 'gpt', state: 'generating', request: string, steps: ({ type: 'searching', content: string, link: string } | { type: 'fetching', content: string, link: string } | { type: 'done' })[] } | { id: number, user: string, question: string | null, answer: string | null, type: 'gpt', request: string, state: 'answered', steps: ({ type: 'searching', content: string, link: string } | { type: 'fetching', content: string, link: string } | { type: 'done' })[], response: string } | { id: number, user: string, question: string | null, answer: string, type: 'manual' })[]

    CB_ERROR_INVALID_PACKET = 0xf0,         // {}
    CB_ERROR_INVALID_STATE = 0xf1,          // {}
    CB_ERROR_INVALID_SUBJECT = 0xf3,        // {}
    CB_ERROR_AUTHENTICATION_FAILED = 0xf4,  // {}
    CB_ERROR_SESSION_EXISTS = 0xf5,         // {}
    CB_ERROR_INVALID_TERM = 0xf6,           // {}
    CB_ERROR_INVALID_GROUP = 0xf7,          // {}
    CB_ERROR_UNEXPECTED = 0xff,             // {}
}

export interface IPacket<T extends number, D extends { [key: string]: Serializable }> {
    code: T;
    data: D;
}

export type PingPacket = IPacket<PacketType.SB_PING, { random: number }>;
export type PongPacket = IPacket<PacketType.CB_PONG, { echo: number }>;

export type AuthenticatePacket = IPacket<PacketType.SB_AUTHENTICATE, { subject: string, token: string }>;
export type AuthenticatedPacket = IPacket<PacketType.CB_AUTHENTICATED, {}>;

export type UpdateUserListPacket = IPacket<PacketType.CB_UPDATE_USER_LIST, { users: { name: string, group: string | null }[] }>;

export type AddTermPacket = IPacket<PacketType.SB_ADD_TERM, { category: string, term: string }>;
export type RemoveTermPacket = IPacket<PacketType.SB_REMOVE_TERM, { id: number }>;

export type UpdateTermListPacket = IPacket<PacketType.CB_UPDATE_TERM_LIST, { terms: { category: string, terms: { id: number, value: string }[] }[] }>;

export type RegisterGroupPacket = IPacket<PacketType.SB_REGISTER_GROUP, { group: string }>;

export type CreateQuestionPacket = IPacket<PacketType.SB_CREATE_QUESTION, { number: string, question: string }>;
export type AnswerQuestionPacket = IPacket<PacketType.SB_ANSWER_QUESTION, { id: number, answer: string }>;
export type RemoveQuestionPacket = IPacket<PacketType.SB_REMOVE_QUESTION, { id: number }>;

export type UpdateAnswerListPacket = IPacket<PacketType.CB_UPDATE_ANSWER_LIST, { answers: ({ id: number, user: string, question: string | null, type: 'gpt', state: 'queued', request: string } | { id: number, user: string, question: string | null, type: 'gpt', state: 'generating', request: string, steps: ({ type: 'searching', content: string, link: string } | { type: 'fetching', content: string, link: string } | { type: 'done' })[] } | { id: number, user: string, question: string | null, answer: string | null, type: 'gpt', request: string, state: 'answered', steps: ({ type: 'searching', content: string, link: string } | { type: 'fetching', content: string, link: string } | { type: 'done' })[], response: string } | { id: number, user: string, question: string | null, answer: string, type: 'manual' })[] }>;

export type ErrorInvalidPacketPacket = IPacket<PacketType.CB_ERROR_INVALID_PACKET, {}>;
export type ErrorInvalidStatePacket = IPacket<PacketType.CB_ERROR_INVALID_STATE, {}>;
export type ErrorInvalidSubjectPacket = IPacket<PacketType.CB_ERROR_INVALID_SUBJECT, {}>;
export type ErrorAuthenticationFailedPacket = IPacket<PacketType.CB_ERROR_AUTHENTICATION_FAILED, {}>;
export type ErrorSessionExistsPacket = IPacket<PacketType.CB_ERROR_SESSION_EXISTS, {}>;
export type ErrorInvalidTermPacket = IPacket<PacketType.CB_ERROR_INVALID_TERM, {}>;
export type ErrorInvalidGroupPacket = IPacket<PacketType.CB_ERROR_INVALID_GROUP, {}>;
export type ErrorUnexpectedPacket = IPacket<PacketType.CB_ERROR_UNEXPECTED, {}>;
