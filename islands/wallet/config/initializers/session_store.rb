# frozen_string_literal: true

Saeveski::Application.config.session_store(
  :redis_session_store,
  key: ENV['SECRET_KEY_BASE'],
  serializer: :json,
  redis: {
    expire_after: 7.days,
    key_prefix: 'saeveski:session:',
    url: 'redis://127.0.0.1:3100/2'
  }
)
