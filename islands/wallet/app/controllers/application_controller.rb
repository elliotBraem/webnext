# frozen_string_literal: true

# Standard application controller
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception # prepend: true
  before_action :reauthorize

  def reauthorize
    redirect_to login_path unless user_is_logged_in?
  end

  def crypt(string)
    Digest::SHA256.hexdigest(string)
  end

  def valid?(props)
    props.each do |prop|
      result = if prop[:str]
                 prop[:config][:length].cover? prop[:str].length
               elsif prop[:int]
                 is_point = (prop[:int].to_i % prop[:config][:step]).zero?
                 on_the_scale = prop[:config][:range].cover? prop[:int].to_i
                 is_point && on_the_scale
               else
                 false
               end
      return result unless result
    end
    true
  end

  def user_is_logged_in?
    !session[:user_id].nil? && User[session[:user_id]]
  end

  def enough_mana?(for_ability: :undefined)
    ability = if for_ability == :undefined
                case params[:controller].to_sym
                when :users
                  :account_management
                end
              else
                for_ability
              end

    ability_availability = Rails.configuration.abilities[ability][:availability]
    User[session[:user_id]].access_level >= ability_availability
  end

  def restrict_access
    unless enough_mana?
      render(
        file: File.join(Rails.root, 'public/403.html'),
        status: 403,
        layout: false
      )
    end
  end
end
