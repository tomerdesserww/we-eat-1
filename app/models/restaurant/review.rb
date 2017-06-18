class Restaurant::Review < ApplicationRecord
  after_create :update_restaurant_rating

  belongs_to :restaurant

  validates :reviewer_name, :body, :rating, presence: true

  def update_restaurant_rating
    restaurant.update(rating: restaurant.reviews.average(:rating))
  end
end
