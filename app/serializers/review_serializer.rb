class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :restaurant_id, :reviewer_name, :body, :rating
end