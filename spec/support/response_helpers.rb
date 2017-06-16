module Requests
  module ResponseHelpers
    def json
      json = JSON.parse(response.body)
      json.respond_to?(:with_indifferent_access) ? json.with_indifferent_access : json
    end
  end
end
