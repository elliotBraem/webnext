# frozen_string_literal: true

# Transaction entity model
class Transaction < Ohm::Model
  include Ohm::DataTypes

  attribute :common_timestamp, Type::Integer
  # Required powerlevel for transaction reading
  attribute :common_availability, Type::Integer
  attribute :common_purpose # Purpose of transaction
  attribute :common_comment # Optional comment

  attribute :origin_storage
  attribute :origin_requisites
  attribute :origin_amount, Type::Float
  attribute :origin_currency
  attribute :origin_commission, Type::Float

  attribute :destination_storage
  attribute :destination_requisites
  attribute :destination_amount, Type::Float
  attribute :destination_currency
  attribute :destination_commission, Type::Float

  reference :author, :User
  # collection :storages, :Storage
end
