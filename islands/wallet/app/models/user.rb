# frozen_string_literal: true

# User entity model
class User < Ohm::Model
  include Ohm::DataTypes

  attribute :name
  # User permissions level
  attribute :access_level, Type::Integer
  attribute :crypted_passphrase
  # Unique attributes
  unique    :name
  # Indexed attributes
  index     :name
  index     :access_level

  collection :transactions, :Transaction
end
