# frozen_string_literal: true

# Default settings redefining mechanism
class SettingsController < ApplicationController
  # Settings main screen
  def index; end

  # Redefine default or existing value
  def update; end

  # Return to default value
  def destroy; end
end
