# frozen_string_literal: true

Rails.application.config.default_root_passwd = '1234'

# Entity attributes configuration
Rails.application.config.entities = {

  User: {
    name: {
      type: :String,
      length: 2..16,
      required: true,
      caption: 'Username',
      editable: true,
      render: true,
      invisible: true
    },
    passphrase: {
      type: :String,
      length: 1..32,
      required: true,
      caption: 'Passphrase',
      editable: true,
      render: true,
      invisible: true
    },
    access_level: {
      type: :Scale,
      range: 11..44,
      step: 11,
      caption: 'Access level',
      editable: true,
      render: true,
      invisible: true
    }
  },

  Transaction: {
    common: {
      caption: 'Common information',
      order: 2,
      column_order: 1,

      attributes: {
        author: {
          type: :String,
          length: 2..16,
          required: false,
          caption: 'Author',
          editable: false,
          render: true,
          invisible: false
        },
        availability: {
          type: :Point,
          relation: %i[User access_level],
          required: true,
          caption: 'Availability level',
          editable: true,
          render: true,
          invisible: true
        },
        timestamp: {
          type: :DateTime,
          required: false,
          caption: 'Date',
          editable: true,
          render: true,
          invisible: false
        },
        purpose: {
          type: :String,
          length: 1..124,
          required: true,
          caption: 'Purpose',
          editable: true,
          render: true,
          invisible: true
        },
        comment: {
          type: :String,
          length: 1..124,
          required: false,
          caption: 'Comment',
          editable: true,
          render: true,
          invisible: true
        }
      }
    },

    origin: {
      caption: 'Origin storage',
      order: 1,
      column_order: 2,

      attributes: {
        storage: {
          type: :String,
          length: 1..64,
          required: true,
          caption: 'Storage name',
          editable: true,
          render: true,
          invisible: true
        },
        requisites: {
          type: :String,
          length: 1..64,
          required: true,
          caption: 'Requisites',
          editable: true,
          render: true,
          invisible: true
        },
        amount: {
          type: :Float,
          required: true,
          caption: 'Sent amount',
          editable: true,
          render: true,
          invisible: true
        },
        currency: {
          type: :String,
          length: 1..8,
          required: true,
          caption: 'Currency',
          editable: true,
          render: true,
          invisible: true
        },
        commission: {
          type: :Float,
          required: true,
          caption: 'Commission',
          editable: true,
          render: true,
          invisible: true
        }
      }
    },

    destination: {
      caption: 'Destination storage',
      order: 3,
      column_order: 3,

      attributes: {
        storage: {
          type: :String,
          length: 1..64,
          required: true,
          caption: 'Storage name',
          editable: true,
          render: true,
          invisible: true
        },
        requisites: {
          type: :String,
          length: 1..64,
          required: true,
          caption: 'Requisites',
          editable: true,
          render: true,
          invisible: true
        },
        amount: {
          type: :Float,
          required: true,
          caption: 'Received amount',
          editable: true,
          render: true,
          invisible: true
        },
        currency: {
          type: :String,
          length: 1..8,
          required: true,
          caption: 'Currency',
          editable: true,
          render: true,
          invisible: true
        },
        commission: {
          type: :Float,
          required: true,
          caption: 'Commission',
          editable: true,
          render: true,
          invisible: true
        }
      }
    }
  }
}

ENTITIES = Rails.configuration.entities

# User actions configuration
# Be available as Rails.configuration.abilities
Rails.application.config.abilities = {
  account_management: {
    availability: 33
  },
  tx_management: {
    availability: ENTITIES[:User][:access_level][:range].min
  }
}

# Timezones list
# Be available as Rails.configuration.timezones
Rails.application.config.timezones = [
  '-1200', '-1100', '-1030', '-1000', '-0930', '-0900', '-0830', '-0800',
  '-0700', '-0600', '-0500', '-0400', '-0330', '-0300', '-0200', '-0100',
  '+0000', '+0100', '+0200', '+0300', '+0330', '+0400', '+0430', '+0500',
  '+0530', '+0545', '+0600', '+0630', '+0700', '+0800', '+0845', '+0900',
  '+0930', '+1000', '+1030', '+1100', '+1200', '+1245', '+1300', '+1400'
]
