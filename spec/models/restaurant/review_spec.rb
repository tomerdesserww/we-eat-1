require 'rails_helper'

RSpec.describe Restaurant::Review, type: :model do
  it 'should update the restaurant\s average review' do
    review = create(:restaurant_review)

    expect(Restaurant.find(review.restaurant.id).rating).to eq(review.rating)
  end
end
