class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include ErrorConcern

  def index
    render inline: '', layout: 'application'
  end
end
