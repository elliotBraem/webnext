# frozen_string_literal: true

# Simple pages rendering
class PagesController < ApplicationController
  def index
    @user = User[session[:user_id]] if user_is_logged_in?
    @enough_mana_for_account_management =
      enough_mana? for_ability: :account_management
  end
end
