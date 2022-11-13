# frozen_string_literal: true

# Users authorization management
class SessionsController < ApplicationController
  skip_before_action :reauthorize, only: %i[new create]

  def new
    redirect_to root_path if user_is_logged_in?
  end

  def create
    name = params[:user][:name]
    passphrase = params[:user][:passphrase]
    target_user = User.with(:name, name)

    if user_is_valid?(name, passphrase, target_user)
      session[:user_id] = target_user.id
      redirect_to root_path
    else
      # Unauthorized due to invalid credentials
      @error = 401
      render action: :new
    end
  end

  def destroy
    session[:user_id] = nil
    reset_session
    redirect_to login_url
  end

  private

  def user_is_valid?(name, passphrase, user)
    return false if name.blank? || passphrase.blank?

    accepted_props = [
      { str: name, config: ENTITIES[:User][:name] },
      { str: passphrase, config: ENTITIES[:User][:passphrase] }
    ]

    return false unless valid?(accepted_props)
    name == user.name && crypt(passphrase) == user.crypted_passphrase if user
  end
end
