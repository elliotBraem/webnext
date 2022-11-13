# frozen_string_literal: true

def spawn_superuser
  passwd = Digest::SHA256.hexdigest(Rails.configuration.default_root_passwd)

  User.create(
    name: 'root',
    access_level: ENTITIES[:User][:access_level][:range].max,
    crypted_passphrase: passwd
  )
end
