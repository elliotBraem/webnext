# frozen_string_literal: true

# Transactions records management
class TransactionsController < ApplicationController
  def index
    @user = User[session[:user_id]]
    @config = ENTITIES[:Transaction]

    @transactions = Transaction.all.to_a.reverse
  end

  def new
    @user = User[session[:user_id]]
    @error = params[:error]
  end

  # What the fuck is going on here
  def create
    @user = User[session[:user_id]]
    data = params[:transaction]
    tx = ENTITIES[:Transaction]
    attributes = {}

    tx.each_pair do |title, section|
      section[:attributes].each_pair do |field, config|
        if config[:editable]
          value = data["#{title}_#{field}".to_sym]

          if config[:required]
            return render action: :new if value.blank?
          elsif value.blank?
            next unless field == :timestamp
          end

          field_valid = case config[:type]

          when :String
            config[:length].cover? value.length

          when :Integer
            value = value
            true

          when :Float
            value = value.to_f
            true

          when :Point
            value = value.to_i
            cfg = ENTITIES.dig(*config[:relation])
            range = cfg[:range]
            step = cfg[:step]
            is_point = (value % step).zero?
            on_the_scale = range.cover? value

            is_point && on_the_scale

          when :DateTime
            timestamp = if data[:timestamp].blank?
                          Time.now
                        else
                          str = "#{data[:timestamp][0..-2]} #{data[:timezone]}"
                          Chronic.parse str
                        end
            value = timestamp.to_i

            Chronic.parse timestamp.to_s
          end

          attributes["#{title}_#{field}".to_sym] = value if field_valid

        else
          field_valid = true
          case field
          when :author
            attributes.update author: @user
          end
        end

        return redirect_to new_transaction_path error: 'fuck' unless field_valid
      end
    end

    Transaction.create(attributes)
    redirect_to transactions_path
  end

  def update; end

  def destroy; end
end
