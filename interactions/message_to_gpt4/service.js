export const send = (message) =>
	core.adapter.gpt4.send(message).reply.onFulfilled((reply) =>
		core.service.memory.mutation(reply.parameters).onFulfilled(() =>
			core.service.gpt2
				/**
				 * Calls core.service.memory.query(message.parameters)
				 **/
				.reply(message)((reply) =>
				/**
				 * Reactively changes state of entity.chat.history.display,
				 * 	which has `service.state.history.messages` passed as state.messages.
				 *
				 * Every state change of entity.chat.history.display triggers its rerender
				 **/
				entity.chat.history_update(reply),
			),
		),
	);
