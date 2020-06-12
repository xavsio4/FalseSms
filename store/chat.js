import { DateTime } from "luxon";

/**
 * STATES
 */
export const state = () => ({
    messages: [],
    lrtoggle: false, //false is left and right toggle
    myself: {},
    participants: [

    ],
    chatTitle: '',
    placeholder: 'send your message',
    idp: 1
});

/**
 * MUTATIONS
 */
export const mutations = {

    setParticipants: (state, participants) => {
        state.participants = participants;
    },
    setMyself: (state, myself) => {
        state.myself = myself;
    },
    setMessages: (state, messages) => {
        messages.map(message => {
            if (typeof message.timestamp == 'object') {
                message.timestamp = DateTime.fromObject(message.timestamp).toISO();
            }
            if (!("myself" in message))
                message.myself = message.participantId === state.myself.id;
        });
        state.messages = messages;
    },
    setChatTitle: (state, title) => {
        state.chatTitle = title;
    },
    setPlaceholder: (state, placeholder) => {
        state.placeholder = placeholder;
    },
    ADD_TO_PARTICIPANT: (state, payload) => {
        state.participants.push({
            name: payload.name,
            id: payload.id,
            profilePicture: payload.profilePicture
        });
        state.idp++;
    },
    NEW_MESSAGE: (state, message) => {
        state.lrtoggle = !state.lrtoggle;
        message.side = (state.lrtoggle) ? 'l' : 'r';
        message.timestamp = message.timestamp.toISO();
        state.messages = [...state.messages, message];
    },
}; //mutations

/**
 * ACTIONS
 */
export const actions = {
    newMessage({ commit }, params) {
        commit('NEW_MESSAGE', params)
    },
    addParticipant({ commit }, params) {
        commit('ADD_TO_PARTICIPANT', params.newParticipant)
    },

    subCount({ commit }) {
        commit('SUB_TO_TOTAL')
    },

    setTitle({ commit }, e) {
        commit('SET_TITLE', e)
    }

};//actions

/**
 * GETTERS
 */
export const getters = {
    getParticipantById: (state) => (id) => {
        let curr_participant;
        state.participants.forEach(participant => {
            if (participant.id === id) {
                curr_participant = participant;
            }
        });
        return curr_participant;
    },
    messages: (state) => {
        let messages = [];
        state.messages.forEach(message => {
            let newMessage = { ...message };
            newMessage.timestamp = DateTime.fromISO(newMessage.timestamp);
            messages.push(newMessage);
        });
        return messages;
    },
    myself: (state) => {
        return state.myself;
    }
};
// /getters