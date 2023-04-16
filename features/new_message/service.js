export const send = (message) =>
	core.adapters.gpt4.send(message).reply.onFulfilled((reply) =>
		core.services.memory.mutation(reply.parameters).onFulfilled(() =>
			core.services.gpt2
				/**
				 * Calls core.services.memory.query(message.parameters)
				 **/
				.reply(message)((reply) =>
				/**
				 * Reactively changes state of entities.chat.history.render,
				 * 	which has `service.state.history.messages` passed as state.messages.
				 *
				 * Every state change of entities.chat.history.render triggers
				 **/
				entities.chat.history_update(reply),
			),
		),
	);
