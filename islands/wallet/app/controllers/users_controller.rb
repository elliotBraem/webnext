# frozen_string_literal: true

# Account management controller
class UsersController < ApplicationController
  before_action :restrict_access

  def index
    @current_user = User[session[:user_id]]
    @users = User.all.to_a.reverse
  end

  def create
    last_id = Ohm.redis.call('GET', 'User:id').to_i

    User.create(
      name: "user_#{last_id + 1}",
      access_level: ENTITIES[:User][:access_level][:range].min,
      crypted_passphrase: SecureRandom.hex(8)
    )

    redirect_to users_path
  end

  # Existing user update action
  def update
    if params_is_valid
      user = params[:user]

      if user[:name] == 'root'
        user = user.merge(access_level: ENTITIES[:User][:access_level][:range].max)
      end

      User[params[:id]].update(
        name: user[:name],
        access_level: user[:access_level]
      )

      unless user[:passphrase].blank?
        User[params[:id]].update(
          crypted_passphrase: crypt(user[:passphrase])
        )
      end

    else
      p 'error handling'
    end

    redirect_to users_path
  end

  def destroy
    User[params[:id]].delete if enough_mana?
    redirect_to users_path
  end

  private

  # Params validator for user updating action
  def params_is_valid
    return false if params[:user].blank?

    user = ENTITIES[:User]

    props = [
      {
        str: params[:user][:name],
        config: user[:name]
      }
    ]

    unless params[:passphrase].blank?
      props.push(
        {
          str: params[:user][:passphrase],
          config: user[:passphrase]
        }
      )
    end

    unless params[:user][:name] == 'root'
      props.push(
        int: params[:user][:access_level],
        config: user[:access_level]
      )
    end

    valid?(props)
  end
end
