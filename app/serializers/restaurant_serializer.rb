class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :rating, :address, :accepts_10bis, :max_delivery_time_minutes
end
