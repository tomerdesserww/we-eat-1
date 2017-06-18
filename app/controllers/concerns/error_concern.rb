module ErrorConcern
  extend ActiveSupport::Concern

  GENERIC_ERROR_MESSAGE = I18n.t('error.generic.message')

  included do
    # Need to be organized from generic to specific errors
    rescue_from(Exception) do |e|
      puts "Unexpected error occurred #{e.inspect}"

      Rails.logger.error("Unexpected error occurred #{e.inspect}")

      render_error(redacted_message(e.message), :internal_server_error)
    end
    rescue_from(ActionController::InvalidAuthenticityToken) { |e| render_error(e.message, :forbidden) }
    rescue_from(ActionController::ParameterMissing) { |e| render_error(e.message, :bad_request, param: e.param) }
    rescue_from(ActionController::BadRequest)       { |e| render_error(e.message, :bad_request) }
    rescue_from(ActiveRecord::RecordInvalid)        { |e| render_error(e.message, :bad_request, errors: e.record.errors.full_messages) }
    rescue_from(ActiveRecord::RecordNotFound)       { |e| render_error(redacted_message(e.message, I18n.t('error.not_found.message')), :not_found) }
    rescue_from(ActiveRecord::StatementInvalid)     { |e| render_error(redacted_message(e.message), :bad_request) }

    def render_error(message, status, extra = {})
      render json: { message: message }.merge(extra), status: status
    end

    def redacted_message(message, redacted_message = GENERIC_ERROR_MESSAGE)
      if Rails.env.production?
        redacted_message
      else
        message
      end
    end
  end
end
